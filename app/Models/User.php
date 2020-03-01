<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    const ROLE_ADMIN = 1;
    const ROLE_MANAGER = 2;
    const ROLE_EMPLOYEE = 3;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'role', 'name', 'email', 'password','first_name','last_name','dob'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The additonal attribute added in object
     *
     * @var array
     */
    protected $appends = [
        'role_name',
    ];

    /**
     * User Set method to bcrypt password
     *
     * @return mixed
     */
    public function setPasswordAttribute($value){
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * User Set method to bcrypt password
     *
     * @return mixed
     */
    public function getRoleNameAttribute($value){
        $roleName = '';
        switch ($this->role) {
            case self::ROLE_MANAGER:
                $roleName = 'Manager';
                break;
            case self::ROLE_EMPLOYEE:
                $roleName = 'Employee';
                break;

            case self::ROLE_ADMIN:
            default:
                $roleName = 'Admin';
                break;
        }
        return $roleName;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
 
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
