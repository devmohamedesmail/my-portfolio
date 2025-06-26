<?php

namespace App\Services;

use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Jenssegers\Agent\Agent;

class VisitorTrackingService
{
    protected $agent;

    public function __construct()
    {
        $this->agent = new Agent();
    }

    /**
     * Track a visitor and get their information
     */
    public function trackVisitor(Request $request): array
    {
        $ipAddress = $this->getClientIP($request);
        
        // Get location data from a free IP geolocation service
        $locationData = $this->getLocationData($ipAddress);
        
        // Parse user agent for device info
        $this->agent->setUserAgent($request->header('User-Agent'));
        
        $visitorData = [
            'ip_address' => $ipAddress,
            'user_agent' => $request->header('User-Agent'),
            'country' => $locationData['country'] ?? null,
            'city' => $locationData['city'] ?? null,
            'browser' => $this->agent->browser() . ' ' . $this->agent->version($this->agent->browser()),
            'device' => $this->getDeviceType(),
            'operating_system' => $this->agent->platform() . ' ' . $this->agent->version($this->agent->platform()),
            'referrer' => $request->header('Referer'),
            'location_data' => $locationData,
            'visited_at' => now(),
        ];

        // Check if this IP visited recently (to avoid spam)
        if (!Visitor::hasRecentVisit($ipAddress)) {
            // Store visitor data
            $visitor = Visitor::create($visitorData);
            
            return [
                'visitor' => $visitor,
                'is_new_visitor' => true,
                'visitor_data' => $visitorData
            ];
        }

        return [
            'visitor' => null,
            'is_new_visitor' => false,
            'visitor_data' => $visitorData
        ];
    }

    /**
     * Get the real client IP address
     */
    private function getClientIP(Request $request): string
    {
        $ipKeys = [
            'HTTP_CF_CONNECTING_IP',     // Cloudflare
            'HTTP_CLIENT_IP',            // Proxy
            'HTTP_X_FORWARDED_FOR',      // Load balancer/proxy
            'HTTP_X_FORWARDED',          // Proxy
            'HTTP_X_CLUSTER_CLIENT_IP',  // Cluster
            'HTTP_FORWARDED_FOR',        // Proxy
            'HTTP_FORWARDED',            // Proxy
            'REMOTE_ADDR'                // Standard
        ];

        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                $ip = $_SERVER[$key];
                if (strpos($ip, ',') !== false) {
                    $ip = explode(',', $ip)[0];
                }
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }

        return $request->ip() ?? '127.0.0.1';
    }

    /**
     * Get location data from IP address using free service
     */
    private function getLocationData(string $ipAddress): array
    {
        try {
            // Skip location lookup for local/private IPs
            if ($ipAddress === '127.0.0.1' || $ipAddress === '::1' || 
                !filter_var($ipAddress, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return [
                    'country' => 'Local',
                    'city' => 'Local',
                    'region' => 'Local',
                    'timezone' => 'UTC'
                ];
            }

            // Using ip-api.com (free service with 1000 requests per month)
            $response = Http::timeout(5)->get("http://ip-api.com/json/{$ipAddress}");
            
            if ($response->successful()) {
                $data = $response->json();
                
                if ($data['status'] === 'success') {
                    return [
                        'country' => $data['country'] ?? null,
                        'country_code' => $data['countryCode'] ?? null,
                        'region' => $data['regionName'] ?? null,
                        'city' => $data['city'] ?? null,
                        'timezone' => $data['timezone'] ?? null,
                        'isp' => $data['isp'] ?? null,
                        'latitude' => $data['lat'] ?? null,
                        'longitude' => $data['lon'] ?? null,
                    ];
                }
            }
        } catch (\Exception $e) {
            Log::warning('Failed to get location data for IP: ' . $ipAddress, [
                'error' => $e->getMessage()
            ]);
        }

        return [
            'country' => 'Unknown',
            'city' => 'Unknown'
        ];
    }

    /**
     * Get device type
     */
    private function getDeviceType(): string
    {
        if ($this->agent->isTablet()) {
            return 'Tablet';
        } elseif ($this->agent->isMobile()) {
            return 'Mobile';
        } elseif ($this->agent->isDesktop()) {
            return 'Desktop';
        }

        return 'Unknown';
    }

    /**
     * Get visitor statistics
     */
    public function getVisitorStats(): array
    {
        return [
            'today_unique_visitors' => Visitor::getTodayUniqueVisitors(),
            'today_total_visits' => Visitor::getTodayVisits(),
            'total_visitors' => Visitor::distinct('ip_address')->count(),
            'total_visits' => Visitor::count(),
            'latest_visitors' => Visitor::with([])
                ->orderBy('visited_at', 'desc')
                ->limit(10)
                ->get()
        ];
    }
}
