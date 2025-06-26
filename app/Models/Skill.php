<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Skill extends Model
{
    /** @use HasFactory<\Database\Factories\SkillFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'icon',
        'image',
        'color',
        'background_gradient',
        'level',
        'mastery_level',
        'years_experience',
        'category',
        'type',
        'featured',
        'priority',
        'active',
        'first_learned',
        'last_used',
        'projects_used',
        'certification_url',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'active' => 'boolean',
        'first_learned' => 'date',
        'last_used' => 'date',
        'projects_used' => 'array',
    ];

    // Automatically generate slug when name is set
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($skill) {
            if (empty($skill->slug)) {
                $skill->slug = Str::slug($skill->name);
            }
        });

        static::updating(function ($skill) {
            if ($skill->isDirty('name') && empty($skill->slug)) {
                $skill->slug = Str::slug($skill->name);
            }
        });
    }

    // Scope for active skills
    public function scopeActive($query)
    {
        return $query->where('active', true);
    }

    // Scope for featured skills
    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    // Scope for ordering by priority
    public function scopeOrdered($query)
    {
        return $query->orderBy('priority', 'desc')->orderBy('name');
    }

    // Scope for filtering by category
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    // Scope for filtering by type
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    // Get available categories
    public static function getCategories()
    {
        return [
            'frontend' => 'Frontend',
            'backend' => 'Backend',
            'database' => 'Database',
            'devops' => 'DevOps',
            'mobile' => 'Mobile',
            'design' => 'Design',
            'testing' => 'Testing',
            'other' => 'Other',
        ];
    }

    // Get available types
    public static function getTypes()
    {
        return [
            'language' => 'Programming Language',
            'framework' => 'Framework',
            'library' => 'Library',
            'tool' => 'Tool',
            'platform' => 'Platform',
            'service' => 'Service',
        ];
    }

    // Get available mastery levels
    public static function getMasteryLevels()
    {
        return [
            'beginner' => 'Beginner',
            'intermediate' => 'Intermediate',
            'advanced' => 'Advanced',
            'expert' => 'Expert',
            'master' => 'Master',
        ];
    }
}
