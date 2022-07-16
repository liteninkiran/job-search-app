<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\JobType;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        JobType::create([
            'slug' => 'permanent',
            'name' => 'Permanent',
        ]);

        JobType::create([
            'slug' => 'contract',
            'name' => 'Contract',
        ]);

    }
}
