<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;
use Validator;

class ApiAuthController extends Controller
{
	/**
 	 * Login Api
 	 *
 	 * @param $request
 	 * @return \Illuminate\Http\Response
 	 */
 	public function login(Request $request)
    {
    	$validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:10'
        ]);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return response()->json(['error' => $messages], 400);
        }

        $input = $request->only('email', 'password');
        $jwtToken = null;
 
        if (!$jwtToken = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], Response::HTTP_FORBIDDEN);
        }
 		$aUser = JWTAuth::user();
        return response()->json([
            'success' 	=> true,
            'token' 	=> $jwtToken,
            'user'		=> $aUser
        ],Response::HTTP_OK);
    }
 	
 	/**
 	 * Logout Api
 	 *
 	 * @param $request
 	 * @return \Illuminate\Http\Response
 	 */
    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
 
        try {
            JWTAuth::invalidate($request->token);
 
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ],Response::HTTP_OK);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], Response::HTTP_FORBIDDEN);
        }
    }
}
