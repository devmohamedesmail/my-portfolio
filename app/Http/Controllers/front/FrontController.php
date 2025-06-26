<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Skill;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\VisitorTrackingService;
use App\Mail\VisitorNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class FrontController extends Controller
{
    protected $visitorTracker;

    public function __construct(VisitorTrackingService $visitorTracker)
    {
        $this->visitorTracker = $visitorTracker;
    }

    //index
    public function index(Request $request)
    {
        try {
            // Track the visitor
            $trackingResult = $this->visitorTracker->trackVisitor($request);
            
            // If this is a new visitor, send email notification
            if ($trackingResult['is_new_visitor']) {
                $this->sendVisitorNotification($trackingResult);
            }
        } catch (\Exception $e) {
            // Log the error but don't break the page load
            Log::error('Visitor tracking failed: ' . $e->getMessage());
        }

        $skills = Skill::all(); 
        $projects = Project::where('is_published', true)->get();
        
        return Inertia::render('front/index', [
            'skills' => $skills,
            'projects' => $projects,
        ]);
    }

    /**
     * Send visitor notification email
     */
    private function sendVisitorNotification(array $trackingResult)
    {
        try {
            // Get visitor statistics
            $visitorStats = $this->visitorTracker->getVisitorStats();
            
            // Get email from environment or config
            $notificationEmail = config('mail.notification_email', env('MAIL_NOTIFICATION_EMAIL', 'dev.mohamed.esmail@gmail.com'));
            
            // Send the notification email
            Mail::to($notificationEmail)->send(
                new VisitorNotification($trackingResult['visitor_data'], $visitorStats)
            );
            
            Log::info('Visitor notification email sent successfully', [
                'visitor_ip' => $trackingResult['visitor_data']['ip_address'],
                'visitor_country' => $trackingResult['visitor_data']['country'],
                'email_sent_to' => $notificationEmail
            ]);
            
        } catch (\Exception $e) {
            Log::error('Failed to send visitor notification email: ' . $e->getMessage(), [
                'visitor_data' => $trackingResult['visitor_data'] ?? null
            ]);
        }
    }
}
