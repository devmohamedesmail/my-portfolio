<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use App\Services\VisitorTrackingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitorController extends Controller
{
    protected $visitorTracker;

    public function __construct(VisitorTrackingService $visitorTracker)
    {
        $this->visitorTracker = $visitorTracker;
    }

    /**
     * Display visitor statistics and list
     */
    public function index(Request $request)
    {
        $visitors = Visitor::query()
            ->when($request->get('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('ip_address', 'like', "%{$search}%")
                      ->orWhere('country', 'like', "%{$search}%")
                      ->orWhere('city', 'like', "%{$search}%")
                      ->orWhere('browser', 'like', "%{$search}%");
                });
            })
            ->when($request->get('country'), function ($query, $country) {
                $query->where('country', $country);
            })
            ->orderBy('visited_at', 'desc')
            ->paginate(20);

        $stats = $this->visitorTracker->getVisitorStats();
        
        // Get countries for filter
        $countries = Visitor::whereNotNull('country')
            ->distinct()
            ->pluck('country')
            ->sort()
            ->values();

        return Inertia::render('admin/visitors/index', [
            'visitors' => $visitors,
            'stats' => $stats,
            'countries' => $countries,
            'filters' => [
                'search' => $request->get('search'),
                'country' => $request->get('country'),
            ]
        ]);
    }

    /**
     * Show visitor details
     */
    public function show(Visitor $visitor)
    {
        return Inertia::render('admin/visitors/show', [
            'visitor' => $visitor
        ]);
    }

    /**
     * Delete visitor record
     */
    public function destroy(Visitor $visitor)
    {
        $visitor->delete();
        
        return redirect()->route('admin.visitors.index')
            ->with('success', 'Visitor record deleted successfully!');
    }

    /**
     * Get visitor analytics data
     */
    public function analytics()
    {
        $data = [
            'daily_visitors' => Visitor::selectRaw('DATE(visited_at) as date, COUNT(DISTINCT ip_address) as unique_visitors, COUNT(*) as total_visits')
                ->whereBetween('visited_at', [now()->subDays(30), now()])
                ->groupBy('date')
                ->orderBy('date')
                ->get(),
            
            'top_countries' => Visitor::selectRaw('country, COUNT(DISTINCT ip_address) as unique_visitors')
                ->whereNotNull('country')
                ->groupBy('country')
                ->orderBy('unique_visitors', 'desc')
                ->limit(10)
                ->get(),
                
            'device_stats' => Visitor::selectRaw('device, COUNT(*) as count')
                ->whereNotNull('device')
                ->groupBy('device')
                ->get(),
                
            'browser_stats' => Visitor::selectRaw('browser, COUNT(*) as count')
                ->whereNotNull('browser')
                ->groupBy('browser')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get(),
        ];

        return response()->json($data);
    }
}
