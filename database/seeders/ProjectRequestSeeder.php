<?php

namespace Database\Seeders;

use App\Models\ProjectRequest;
use Illuminate\Database\Seeder;

class ProjectRequestSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $requests = [
            [
                'name' => 'John Smith',
                'email' => 'john.smith@example.com',
                'phone' => '+1-555-123-4567',
                'project_idea' => 'I need a modern e-commerce website for my clothing store. The site should have user registration, product catalog, shopping cart, and payment integration with Stripe. I also want an admin panel to manage products and orders.',
                'status' => 'pending',
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah.j@techstartup.com',
                'phone' => '+1-555-987-6543',
                'project_idea' => 'We need a web application for project management similar to Trello but with advanced analytics. The app should support teams, real-time collaboration, file uploads, and detailed reporting dashboards.',
                'status' => 'contacted',
                'notes' => 'Initial call scheduled for tomorrow. Very interested in starting soon.',
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(1),
            ],
            [
                'name' => 'Ahmed Al-Rashid',
                'email' => 'ahmed@businesscorp.ae',
                'phone' => '+971-50-123-4567',
                'project_idea' => 'Looking to develop a mobile-first web application for our logistics company. Need features for tracking shipments, managing drivers, customer notifications, and integration with our existing ERP system.',
                'status' => 'in_progress',
                'notes' => 'Project started. Weekly check-ins scheduled every Friday.',
                'created_at' => now()->subDays(15),
                'updated_at' => now()->subDays(3),
            ],
            [
                'name' => 'Emily Chen',
                'email' => 'emily.chen@restaurant.com',
                'phone' => '+1-555-246-8135',
                'project_idea' => 'Restaurant website with online ordering system. Customers should be able to browse menu, customize orders, schedule pickup/delivery, and make payments online. Also need admin panel for menu management.',
                'status' => 'completed',
                'notes' => 'Project completed successfully. Client very satisfied with the result.',
                'created_at' => now()->subDays(30),
                'updated_at' => now()->subDays(7),
            ],
            [
                'name' => 'Mohammed Hassan',
                'email' => 'm.hassan@gmail.com',
                'phone' => '+971-56-789-0123',
                'project_idea' => 'Personal portfolio website for my photography business. Need elegant gallery with lightbox, client testimonials, contact form, and blog section. Should be fully responsive and fast loading.',
                'status' => 'cancelled',
                'notes' => 'Client decided to postpone the project due to budget constraints.',
                'created_at' => now()->subDays(10),
                'updated_at' => now()->subDays(5),
            ],
        ];

        foreach ($requests as $request) {
            ProjectRequest::create($request);
        }
    }
}
