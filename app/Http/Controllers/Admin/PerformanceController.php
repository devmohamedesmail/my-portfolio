<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PerformanceController extends Controller
{
    public function index()
    {
        // In a real application, you would fetch performance data from lighthouse/PageSpeed APIs
        // For now, we'll return mock data that will be used if no real data is available
        
        return Inertia::render('admin/performance/index', [
            // You can add real performance data here when available
            'lighthouse' => null, // This will trigger the component to use mock data
        ]);
    }
}
