<?php

use App\Helpers\Response;
use App\Http\Controllers\V1\Auth\UserController;
use App\Http\Controllers\V1\PostContentsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/**
 * Register user
*/
Route::post('signup', [UserController::class, 'signup']);
Route::post('login', [UserController::class, 'login']);

/**
 * Unauthorized callback
*/
Route::get('info', function() {
    return Response::unauthorized(["message" => "Unauthorized."]);
})->name('info');


Route::group([
    "middleware" => ['auth:api', 'token.verify'],
], function () {

    /**
     * Unauthorized callback
    */
    Route::get('users', [UserController::class, 'getUsers']);
    Route::post('logout', [UserController::class, 'logout']);
    // Route::post('refresh', [UserController::class, 'refresh']);

    /**
     * Posts
    */
    Route::group(['prefix' => 'posts' ], function () {
        Route::post('/store', [PostContentsController::class, 'store']);
        Route::get('/{id?}', [PostContentsController::class, 'all']);
        Route::put('/{id?}', [PostContentsController::class, 'update']);
        Route::delete('/{id?}', [PostContentsController::class, 'delete']);
        Route::patch('/{id?}', [PostContentsController::class, 'restore']);
    });
});


Route::post('refresh', [UserController::class, 'refresh'])->middleware([
    'auth:api',
    'check.refresh.token'
]);
