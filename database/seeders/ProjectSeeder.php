<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'slug' => 'e-commerce-platform',
                'description' => 'A modern, full-featured e-commerce platform built with Laravel and React. Features include product management, shopping cart, payment integration, and admin dashboard.',
                'content' => 'This e-commerce platform demonstrates modern web development practices with a Laravel backend API and React frontend. The application includes user authentication, product catalog, shopping cart functionality, and payment processing.',
                'demo_url' => 'https://demo-ecommerce.example.com',
                'github_url' => 'https://github.com/mohamed/ecommerce-platform',
                'website_url' => 'https://ecommerce.example.com',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                'icon' => '🛒',
                'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Stripe API'],
                'category' => 'web-app',
                'status' => 'completed',
                'performance_score' => 95,
                'responsive_score' => 100,
                'accessibility_score' => 90,
                'start_date' => '2024-01-15',
                'end_date' => '2024-04-30',
                'duration_months' => 3,
                'featured' => true,
                'priority' => 1,
                'is_published' => true,
                'meta_title' => 'E-Commerce Platform - Full Stack Development',
                'meta_description' => 'Modern e-commerce platform built with Laravel and React',
            ],
            [
                'title' => 'Portfolio Website',
                'slug' => 'portfolio-website',
                'description' => 'A responsive portfolio website showcasing my projects and skills. Built with Laravel, Inertia.js, and React with a modern design and smooth animations.',
                'content' => 'This portfolio website serves as a showcase for my development projects and technical skills. It features a clean, modern design with smooth animations and is built using Laravel with Inertia.js for a seamless SPA experience.',
                'demo_url' => 'https://mohamed-portfolio.com',
                'github_url' => 'https://github.com/mohamed/portfolio',
                'website_url' => 'https://mohamed-portfolio.com',
                'image' => 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                'icon' => '💼',
                'technologies' => ['Laravel', 'Inertia.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                'category' => 'portfolio',
                'status' => 'completed',
                'performance_score' => 98,
                'responsive_score' => 100,
                'accessibility_score' => 95,
                'start_date' => '2024-05-01',
                'end_date' => '2024-06-15',
                'duration_months' => 1,
                'featured' => true,
                'priority' => 2,
                'is_published' => true,
                'meta_title' => 'Portfolio Website - Mohamed Esmail',
                'meta_description' => 'Professional portfolio showcasing full-stack development projects',
            ],
            [
                'title' => 'Task Management App',
                'slug' => 'task-management-app',
                'description' => 'A collaborative task management application with real-time updates, team collaboration features, and project tracking capabilities.',
                'content' => 'This task management application helps teams collaborate effectively with features like real-time updates, project boards, task assignments, and progress tracking. Built with modern technologies for optimal performance.',
                'demo_url' => 'https://taskapp-demo.example.com',
                'github_url' => 'https://github.com/mohamed/task-management',
                'image' => 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'gallery' => [
                    'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                ],
                'icon' => '✅',
                'technologies' => ['Vue.js', 'Node.js', 'Express', 'Socket.io', 'MongoDB', 'TailwindCSS'],
                'category' => 'web-app',
                'status' => 'in-progress',
                'performance_score' => 92,
                'responsive_score' => 98,
                'accessibility_score' => 88,
                'start_date' => '2024-06-01',
                'end_date' => null,
                'duration_months' => 2,
                'featured' => false,
                'priority' => 3,
                'is_published' => true,
                'meta_title' => 'Task Management App - Collaborative Tool',
                'meta_description' => 'Real-time collaborative task management application',
            ],
            [
                'title' => 'Weather Dashboard',
                'slug' => 'weather-dashboard',
                'description' => 'A beautiful weather dashboard with real-time data, forecasts, and interactive maps. Features location-based weather and customizable widgets.',
                'demo_url' => null,
                'github_url' => 'https://github.com/mohamed/weather-dashboard',
                'image' => null, // This will use fallback gradient
                'gallery' => null,
                'icon' => '🌤️',
                'technologies' => ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
                'category' => 'web-app',
                'status' => 'planned',
                'performance_score' => 0,
                'responsive_score' => 0,
                'accessibility_score' => 0,
                'start_date' => '2025-01-01',
                'end_date' => null,
                'duration_months' => 1,
                'featured' => false,
                'priority' => 4,
                'is_published' => false,
                'meta_title' => 'Weather Dashboard - Real-time Weather App',
                'meta_description' => 'Interactive weather dashboard with forecasts and maps',
            ],
        ];

        foreach ($projects as $project) {
            \App\Models\Project::create($project);
        }
    }
}
