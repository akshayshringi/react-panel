<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use JWTAuth;
use Illuminate\Support\Facades\Hash;
use Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            $aUser = JWTAuth::user();

            $aUsers = User::where('id','<>',$aUser->id)->where('role','<>',User::ROLE_ADMIN)->get();
            return response()->json([
                'success'   => true,
                'details'   => $aUsers
            ], Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Token',
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $token = JWTAuth::getToken();

            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'dob' => 'required|string',
                'email' => 'required|email|unique:users',
                'role'  => 'required|integer',
                'password' => 'required|string|min:6|max:10'
            ]);

            if ($validator->fails()) {
                $messages = $validator->messages();
                return response()->json([
                    'success' => false,
                    'message' => 'All fields are required.',
                    'error' => $messages,
                ], Response::HTTP_FORBIDDEN);
            }

            $request->password = Hash::make($request->password);
            $aUser = User::create($request->only('first_name','last_name','role','dob','password','email'));
            if(!$aUser){
                return response()->json([
                    'success' => false,
                    'message' => 'Error while saving user.',
                ], Response::HTTP_FORBIDDEN);    
            }
            return response()->json([
                'success' => true,
                'message' => 'User saved successfully.',
            ], Response::HTTP_OK);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Token',
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        try {
            $token = JWTAuth::getToken();
            
            return response()->json([
                'success'   => true,
                'detail'   => $user,
            ], Response::HTTP_OK);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Token',
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        try {
            $token = JWTAuth::getToken();

            $validator = Validator::make($request->all(), [
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'dob' => 'required|string',
                'role'  => 'required|integer',
                'email' => 'required|email|unique:users,email, '.$user->id,
            ]);

            if ($validator->fails()) {
                $messages = $validator->messages();
                return response()->json([
                    'success' => false,
                    'message' => 'All fields are required.',
                ], Response::HTTP_FORBIDDEN);
            }

            $request->password = Hash::make($request->password);
            $aUser = $user->update($request->only('first_name','last_name','role','dob','password','email'));
            if(!$aUser){
                return response()->json([
                    'success' => false,
                    'message' => 'Error while updating user.',
                ], Response::HTTP_FORBIDDEN);    
            }
            return response()->json([
                'success' => true,
                'message' => 'User updated successfully.',
            ], Response::HTTP_OK);
            
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Token',
            ], Response::HTTP_FORBIDDEN);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            $token = JWTAuth::getToken();

            if($user->delete()){
                return response()->json([
                    'success' => true,
                    'message' => 'User deleted successfully.',
                ], Response::HTTP_OK);
            }
            return response()->json([
                    'success' => false,
                    'message' => 'coudnt delete user.',
                ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Token',
            ], Response::HTTP_FORBIDDEN);
        }
        
    }
}
