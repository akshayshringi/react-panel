<?php

use Illuminate\Http\Request;

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

Route::prefix('v1')->group(function () {
	Route::post('login', 'Auth\ApiAuthController@login');
 
	Route::group(['middleware' => 'jwt.auth'], function () {
		Route::get('logout', 'Auth\ApiAuthController@logout');
		Route::get('refresh-token', 'Auth\ApiAuthController@refreshToken');
		Route::resource('user','UsersController');
	});
});