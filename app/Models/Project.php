<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'demo_url',
        'github_url',
        'website_url',
        'image',
        'gallery',
        'icon',
        'technologies',
        'category',
        'status',
        'performance_score',
        'responsive_score',
        'accessibility_score',
        'start_date',
        'end_date',
        'duration_months',
        'featured',
        'priority',
        'is_published',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'gallery' => 'array',
        'technologies' => 'array',
        'featured' => 'boolean',
        'is_published' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'performance_score' => 'integer',
        'responsive_score' => 'integer',
        'accessibility_score' => 'integer',
        'priority' => 'integer',
        'duration_months' => 'integer',
    ];
}
