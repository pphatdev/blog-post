<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::pattern('page', '[a-zA-Z0-9-/]+');
Route::get('{page?}', function($page = "")
{
    // If the route is not for demo
    if (!preg_match("/demo/i", $page)):

        if (preg_match("/fetch/i", $page)):
            // return (new Data)->fetchData();

            return "return fetchData endpoint";
        else:
            return view('index', compact('page'));
        endif;

    else:
        $componentsView = str_replace('/', '.', $page);

        // if current route is can demo
        if (View::exists($componentsView)):
            return view($componentsView);
        else :
            return view('error', ['title' => 'Not Found Page']);
        endif;
    endif;
});
