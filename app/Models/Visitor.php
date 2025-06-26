<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'country',
        'city',
        'browser',
        'device',
        'operating_system',
        'referrer',
        'location_data',
        'visited_at',
    ];

    protected $casts = [
        'location_data' => 'array',
        'visited_at' => 'datetime',
    ];

    /**
     * Check if this IP has visited recently (within the last 24 hours)
     */
    public static function hasRecentVisit($ipAddress)
    {
        return self::where('ip_address', $ipAddress)
            ->where('visited_at', '>=', now()->subDay())
            ->exists();
    }

    /**
     * Get unique visitors count for today
     */
    public static function getTodayUniqueVisitors()
    {
        return self::whereDate('visited_at', today())
            ->distinct('ip_address')
            ->count();
    }

    /**
     * Get total visits count for today
     */
    public static function getTodayVisits()
    {
        return self::whereDate('visited_at', today())->count();
    }
}
