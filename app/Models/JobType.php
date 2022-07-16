<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class JobType extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'slug',
        'name',
    ];

    public function jobHistories() {
        return $this->hasMany(JobHistory::class);
    }

    /**
     * Interact with the slug
     *
     * @param string  $value
     * @return Attribute
     */
    protected function slug(): Attribute
    {
        return Attribute::make(
            // get: fn ($value) => ($value),
            set: fn ($value) => str_replace(' ', '_', strtolower($value)),
        );
    }
}
