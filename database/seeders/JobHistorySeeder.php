<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobHistory;
use App\Models\JobType;
use App\Models\User;

class JobHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        foreach($users as $user) {
            JobHistory::factory(5)->create([
                'user_id' => $user->id
            ]);
        }

        // JobType::factory(250)->create();
    }
}
