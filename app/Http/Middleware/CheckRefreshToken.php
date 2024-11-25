<?php

namespace App\Http\Middleware;

use Closure;
use App\Helpers\Response;
use App\Models\V1\Auth\RefreshToken;
use Carbon\Carbon;

class CheckRefreshToken
{
    public function handle($request, Closure $next)
    {
        $refreshToken = $request->header('Refresh-Token');

        if (!$refreshToken) {
            return Response::unauthorized(['message' => 'Refresh token not provided']);
        }

        $token = RefreshToken::where('id', $refreshToken)
            ->where('revoked', false)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$token) {
            return Response::unauthorized(['message' => 'Invalid or expired refresh token']);
        }

        return $next($request);
    }
}
