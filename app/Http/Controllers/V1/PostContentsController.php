<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Helpers\Response;
use App\Models\V1\PostContentDetails;
use App\Models\V1\PostContents;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Exception;

class PostContentsController extends Controller
{
    /**
     * Retrieves a list of post contents, or a single post content by ID.
     *
     * @param int|null $id The ID of the post content to retrieve, or null to retrieve all post contents.
     */
    public function all($id = null)
    {
        return $id ? self::get($id): Response::renderList(new PostContents());
    }


    /**
     * Retrieves a single post content by its ID.
     *
     * @param int|null $id The ID of the post content to retrieve.
     */
    public function get($id = null)
    {
        if (!PostContents::where("id", "like", $id)->exists()):
            return Response::client(["message" => "Not found the post!"]);;
        endif;

        $post = PostContents::join('post_content_details', 'post_contents.id', '=', 'post_content_details.post_id')
            ->where('post_contents.id', $id)
            ->where('post_contents.status', true)
            ->where('post_contents.is_deleted', false)
            ->first();
        $post->value = json_decode($post->value, true);
        return Response::success($post);
    }

    /**
     * Stores a new post content in the database.
     *
     * This method validates the incoming request data, creates a new post content record, and then creates the associated post content details record.
     * @var $request->title  required, must be string
     * @var $request->slug  required, must be string, must be unique in post_contents table
     * @var $request->type  required, must be string
     * @var $request->blocks  required, must be string, must be valid JSON
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'title' => 'required|string',
            'slug' => 'required|string|unique:post_contents,slug',
            'type' => 'required|string',
            'blocks' => 'required|string|json',
        ]);

        if ($validated->fails()):
            return Response::client($validated->errors());
        endif;

        DB::beginTransaction();

        try {

            $uuid = Str::uuid()->toString();

            // Create main post content record
            PostContents::create([
                'id' => $uuid,
                'title' => $request->title,
                'slug' => $request->slug,
                'type' => $request->type,
            ]);

            // Create post content details records
            PostContentDetails::create([
                'id' => Str::uuid()->toString(),
                'post_id' => $uuid,
                'value' => json_decode($request->blocks)
            ]);

            DB::commit();

            return Response::success([
                'id' => $uuid,
                'message' => 'Content created successfully'
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::error($e->getMessage());
        }
    }

    /**
     * Updates an existing post content in the database.
     *
     * @param string $id The ID of the post content to update.
     * @var $request->title  must be string
     * @var $request->slug  must be string, must be unique in post_contents table
     * @var $request->type  must be string
     * @var $request->blocks  must be string, must be valid JSON
     */
    public function update(Request $request, $id)
    {
        $request->merge(['blocks' => str_replace('\\"', '"', $request->blocks)]);
        $post = PostContents::where("id", "like", $id)->where('status', true)->where('is_deleted', false)->first();
        if (!$post) {
            return Response::client(["message" => "Not found the post!"]);
        }

        $validated = Validator::make($request->all(), [
            'title' => 'string',
            'slug' => 'string|unique:post_contents,slug,' . $id . ',id',
            'type' => 'string',
            'blocks' => 'string|json',
        ]);

        if ($validated->fails()) {
            return Response::client($validated->errors());
        }

        DB::beginTransaction();

        try {
            // Update main post content with only provided fields
            $updateData = [];
            if ($request->has('title')) $updateData['title'] = $request->title;
            if ($request->has('slug')) $updateData['slug'] = $request->slug;
            if ($request->has('type')) $updateData['type'] = $request->type;

            if (!empty($updateData)) {
                PostContents::where('id', $id)->update($updateData);
            }

            // Update post content details only if blocks are provided
            if ($request->has('blocks')) {
                PostContentDetails::where('post_id', $id)->update([
                    'value' => json_decode(str_replace('\\"', '"', $request->blocks), true)
                ]);
            }

            DB::commit();
            return Response::success([
                'id' => $id,
                'message' => 'Content updated successfully'
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::error($e->getMessage());
        }
    }

    /**
     * Soft deletes a post content by updating status and is_deleted fields
     *
     * @param string $id The ID of the post content to delete
     */
    public function delete($id)
    {
        $post = PostContents::where("id", "like", $id)->where('status', true)->where('is_deleted', false)->first();
        if (!$post) {
            return Response::client(["message" => "Not found the post!"]);
        }

        DB::beginTransaction();
        try {
            PostContents::where('id', $id)->update([
                'status' => false,
                'is_deleted' => true
            ]);

            PostContentDetails::where('post_id', $id)->update([
                'status' => false,
                'is_deleted' => true
            ]);

            DB::commit();
            return Response::success([
                'id' => $id,
                'message' => 'Content deleted successfully'
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::error($e->getMessage());
        }
    }

    /**
     * Restores a soft-deleted post content
     *
     * @param string $id The ID of the post content to restore
     */
    public function restore($id)
    {
        $post = PostContents::where("id", "like", $id)->where('status', false)->where('is_deleted', true)->first();
        if (!$post) {
            return Response::client(["message" => "Not found the deleted post!"]);
        }

        DB::beginTransaction();
        try {
            PostContents::where('id', $id)->update([
                'status' => true,
                'is_deleted' => false
            ]);

            PostContentDetails::where('post_id', $id)->update([
                'status' => true,
                'is_deleted' => false
            ]);

            DB::commit();
            return Response::success([
                'id' => $id,
                'message' => 'Content restored successfully'
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            return Response::error($e->getMessage());
        }
    }

}