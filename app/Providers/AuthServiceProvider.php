<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // define a admin user role
        // returns true if user role is set to admin
        Gate::define('isAdmin', function($user) {
            return $user->role == User::ROLE_ADMIN;
        });
     
        // define a manager user role
        // returns true if user role is set to manager
        Gate::define('isManager', function($user) {
             return $user->role == User::ROLE_MANAGER;
        });
     
        // define a employee user role
        // returns true if user role is set to employee
        Gate::define('isEmployee', function($user) {
             return $user->role == User::ROLE_EMPLOYEE;
        });
    }
}
