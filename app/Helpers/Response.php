<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;

class Response
{
    // class reponse  success
    public static function success($result)
    {
        return response()->json(
            [
                'status' => 200,
                'success' => true,
                'result' => $result
            ],
            200
        );
    }


    // class reponse  client error
    public static function client($result)
    {
        return response()->json(
            [
                'status' => 400,
                'success' => false,
                'result' => $result
            ],
            400
        );
    }

    // class reponse unauthorized
    public static function unauthorized($result): object
    {
        return response()->json(
            [
                'status' => 401,
                'success' => false,
                'result' => $result
            ],
            401
        );
    }

    // class reponse  code  error
    public static function error($result)
    {

        return response()->json(
            [
                'status' => 500,
                'success' => false,
                'result' => $result
            ],
            500
        );
    }


    /**
     * Response Data from Laravel Pagination
     *
     * @param   int|required    $total
     * @param   array|required  $result
     * */
    public static function pagination($total = 0, $result = []): object
    {

        return response()->json(
            [
                'status' => 200,
                'success' => true,
                'total' => $total,
                'result' => $result
            ],
            200
        );
    }

    // class reponse  success
    public static function paginationApproval($total = 0, $result = []): object
    {

        return response()->json(
            [
                'status' => 200,
                'success' => true,
                'total' => $total,
                'result' => $result
            ],
            200
        );
    }

    // Render List for Data
    public static function renderList(Model $Model)
    {
        $request    = request();
        $query      = $Model::where(
            function ($query) use ($request) {

                //? TODO: Searching multi fields
                if ($request->searchFields && $request->search):
                    $searchFields = explode(",", $request->searchFields);
                    foreach ($searchFields as $key => $field):
                        if ($key == 0):
                            $query->where($field, 'ilike', "%$request->search%");
                        else:
                            $query->orWhere($field, 'ilike', "%$request->search%");
                        endif;
                    endforeach;
                elseif ($request->search):
                    $query->where("id", 'ilike', "%$request->search%");
                endif;
            }
        );

        //? TODO: Sorting multi fields
        if ($request->sortFields):
            $sortFields = explode(",", $request->sortFields);
            foreach ($sortFields as $field):
                $query->orderBy($field, strtoupper($request->sort ?? "asc"));
            endforeach;
        else:
            $query->orderBy('id', strtoupper($request->sort ?? "asc"));
        endif;

        //? TODO: Total Items
        $total  = $query->count();
        $result = $query->paginate($request->limit ?? 10);

        return self::laravelPagination($total, $result, (bool)$request->paginations);
    }

    /**
     * Generates a JSON response with the provided total and result data.
     *
     * @param int $total The total number of records.
     * @param mixed $result The data to be returned in the response.
     * @return \Illuminate\Http\JsonResponse A JSON response with the provided data.
     */
    public static function laravelPagination($total, $result, $withPagination = false): object
    {
        $result     = (object)$result->toArray();
        $data       = $result->data ?? (array)$result;
        $response   = [
            "status" => 200,
            'success' => true,
            "total" => $total,
            "result" => $data
        ];

        if ($withPagination) {
            $response = array_merge(
                $response,
                ["paginations" => self::generatePagination($result)]
            );
        }

        return response()->json($response, 200);
    }

    // Pagination Generator
    public static function generatePagination($paginator): array
    {
        $currentPage    = $paginator->current_page;
        $lastPage       = $paginator->last_page;
        $items          = [];
        if ($currentPage <= 3):
            for ($i = 1; $i <= min(4, $lastPage); $i++) {
                $items[] = ['title' => $i, 'disabled' => $i == $currentPage];
            }
            if ($lastPage > 4):
                $items[] = ['title' => '...', 'disabled' => true];
                $items[] = ['title' => $lastPage, 'disabled' => false];
            endif;
        elseif ($currentPage >= $lastPage - 2):
            $items[] = ['title' => 1, 'disabled' => false];
            $items[] = ['title' => '...', 'disabled' => true];
            for ($i = $lastPage - 3; $i <= $lastPage; $i++) {
                $items[] = ['title' => $i, 'disabled' => $i == $currentPage];
            }
        else:
            $items[] = ['title' => 1, 'disabled' => false];
            $items[] = ['title' => '...', 'disabled' => true];
            for ($i = $currentPage - 1; $i <= $currentPage + 1; $i++) {
                $items[] = ['title' => $i, 'disabled' => $i == $currentPage];
            }
            $items[] = ['title' => '...', 'disabled' => true];
            $items[] = ['title' => $lastPage, 'disabled' => false];
        endif;

        return [
            ['title' => 'Previous', 'disabled' => $currentPage == 1],
            ['items' => $items],
            ['title' => 'Next', 'disabled' => $currentPage == $lastPage],
        ];
    }
}
