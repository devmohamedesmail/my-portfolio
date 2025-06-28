<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /** @use HasFactory<\Database\Factories\ClientFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'phone',
        'email',
        'service',
        'service_start_date',
        'service_end_date',
        'budget',
        'description',
        'status',
    ];

    protected $casts = [
        'service_start_date' => 'date',
        'service_end_date' => 'date',
        'budget' => 'decimal:2',
    ];
}
