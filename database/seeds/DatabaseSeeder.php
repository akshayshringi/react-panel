<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        // truncate all the records if exists
        User::truncate();

        $users = array(
            ['role' => User::ROLE_ADMIN, 'first_name' => 'admin', 'last_name' => 'admin', 'email' => 'admin@admin.admin', 'password' => Hash::make('secret')],
            ['role' => User::ROLE_MANAGER, 'first_name' => 'manager', 'last_name' => 'admin', 'email' => 'manager@admin.admin', 'password' => Hash::make('secret')],
            ['role' => User::ROLE_EMPLOYEE, 'first_name' => 'employee', 'last_name' => 'admin', 'email' => 'employee@admin.admin', 'password' => Hash::make('secret')],
        );

        foreach ($users as $user)
        {
            User::create($user);
        }

        Model::reguard();
    }
}
