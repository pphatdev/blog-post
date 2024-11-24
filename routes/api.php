<?php

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

Route::group([
    'prefix' => env('APP_VERSION', 'v1')
], function () {

    // Posts
    Route::group(['prefix' => 'posts' ], function () {
        Route::post('/store', [PostContentsController::class, 'store']);
        Route::get('/{id?}', [PostContentsController::class, 'all']);
        Route::put('/{id?}', [PostContentsController::class, 'update']);
        Route::delete('/{id?}', [PostContentsController::class, 'delete']);
        Route::patch('/{id?}', [PostContentsController::class, 'restore']);
    });
});