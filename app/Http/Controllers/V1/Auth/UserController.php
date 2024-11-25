<?php

namespace App\Http\Controllers\V1\Auth;

use Carbon\Carbon;
use App\Helpers\Response;
use App\Http\Controllers\Controller;
use App\Models\V1\Auth\RefreshToken;
use App\Models\V1\Auth\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Registers a new user with the provided information.
     */
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6|max:255',
        ]);

        if ($validator->fails()) {
            return Response::client($validator->getMessageBag());
        }

        $data = [];
        foreach ((new User)->getFillable() as $value) {
            if ($request->has($value)) {
                $data[$value] = $value === "password" ? bcrypt($request->$value) : $request->$value;
            }
        }

        $user = new User($data);
        $user->save();

        return Response::success(['message' => "User created successfully."]);
    }

    /**
     * Refreshes the user's access and refresh tokens.
     */
    public function refresh(Request $request)
    {
        $refreshToken = $request->header('Refresh-Token');

        $tokenRecord = RefreshToken::where('id', $refreshToken)
            ->where('revoked', false)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$tokenRecord) {
            return Response::unauthorized(['message' => 'Invalid refresh token']);
        }

        // Revoke old tokens
        $user = $request->user();
        $user->tokens->each(function ($token) {
            $token->revoke();
        });

        // Create new access token
        $tokenResult = $user->createToken('Personal Access Token', [], Carbon::now()->addDay(1));

        // Generate new refresh token
        $newRefreshToken = Str::random(80);

        // Store new refresh token
        RefreshToken::create([
            'id' => $newRefreshToken,
            'access_token_id' => $tokenResult->token->id,
            'revoked' => false,
            'expires_at' => Carbon::now()->addDays(30),
        ]);

        // Revoke old refresh token
        $tokenRecord->update(['revoked' => true]);

        return response()->json([
            'status' => 200,
            'token_type' => 'Bearer',
            'access_token' => $tokenResult->accessToken,
            'refresh_token' => $newRefreshToken,
            'access_token_expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
            'refresh_token_expires_at' => Carbon::now()->addDays(30)->toDateTimeString(),
        ], 200);
    }

    /**
     * Login using Email ,
     * Login as Staff or Employee
     *
     * @param object<email,password,firebaseToken|null>|required $request
     *
     * @throws Validator
     * @throws Auth
     * @throws DB
     * @throws Carbon
     * @throws response
     *
     * @return object
     * */
    public function login(Request $request)
    {
        $required = "required";
        if ($request->phone || $request->email || $request->username):
            if ($request->email) :
                $data = $request->only('email', 'password');
            else:
                $data = $request->only('phone', 'password');
            endif;
            $required = "";
        endif;

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|max:255',
            'phone' => "$required|string|min:9|max:13",
            'email' => "$required|email|regex:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/",
        ]);

        if ($validator->fails()):
            return Response::client($validator->getMessageBag());
        endif;

        if (!Auth::attempt(
            array_merge($data, ['status' => true, 'is_deleted' => false])
        )) :
            return Response::unauthorized(['message' => "Invalid credentials"]);
        endif;

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token', [], Carbon::now()->addDay(1));

        // Generate refresh token
        $refreshToken = Str::random(80);

        // Store refresh token
        RefreshToken::create([
            'id' => $refreshToken,
            'access_token_id' => $tokenResult->token->id,
            'revoked' => false,
            'expires_at' => Carbon::now()->addDays(30),
        ]);

        return response()->json([
            'status' => 200,
            'token_type' => 'Bearer',
            'access_token' => $tokenResult->accessToken,
            'refresh_token' => $refreshToken,
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString(),
        ], 200);
    }

    /**
     * Get all users
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        session()->flush();

        return response::success([
            'message' => "Successfully logged out."
        ]);
    }


    /**
     * Get all users
     */
    public function getUsers()
    {
        return Response::renderList(new User());
    }
}
