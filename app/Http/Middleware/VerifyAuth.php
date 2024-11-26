<?php

namespace App\Http\Middleware;

use App\Helpers\Response;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class VerifyAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $request->user()->tokens()->each(function ($token,$key) use ($user, $request) {

            /**
             * Checks if the current user's access token is valid and not expired.
             * If the token is revoked or expired, returns a JSON response with an error message and the user's ID.
             */
            Session::put('userId', $user->ma_user_id);
            if ($token->revoked || $token->expires_at < Carbon::now()):
                Response::unauthorized([
                    'id'=>  $user->id,
                    'message'=> 'Token expired. Please login again.',
                ]);
            endif;

        });

        return $next($request);
    }
}
