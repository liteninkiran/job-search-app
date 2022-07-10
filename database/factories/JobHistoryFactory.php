<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\JobType;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\job_history>
 */
class JobHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $end = $this->faker->numberBetween(1, 30);
        $start = $this->faker->numberBetween($end, 40);

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'company_name' => $this->faker->company(),
            'job_title' => $this->faker->jobTitle(),
            'description' => $this->faker->realText(500),
            'job_type_id' => JobType::inRandomOrder()->first()->id,
            'start_salary' => $this->faker->randomNumber(5),
            'end_salary' => $this->faker->randomNumber(5),
            'start_date' => Carbon::now()->subYears($start),
            'end_date' => Carbon::now()->subYears($end),
        ];
    }
}
