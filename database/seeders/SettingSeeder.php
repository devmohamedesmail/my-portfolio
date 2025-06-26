<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultSettings = [
            // Site Information
            'site_name' => [
                'value' => 'Developer Portfolio',
                'type' => 'text',
                'description' => 'The name of your website'
            ],
            'site_description' => [
                'value' => 'Professional full-stack developer specializing in modern web technologies',
                'type' => 'textarea',
                'description' => 'Brief description of your website'
            ],
            'site_keywords' => [
                'value' => 'developer, portfolio, web development, full-stack, react, laravel',
                'type' => 'text',
                'description' => 'SEO keywords separated by commas'
            ],
            'site_author' => [
                'value' => 'Your Name',
                'type' => 'text',
                'description' => 'Author name for the website'
            ],

            // Contact Information
            'contact_email' => [
                'value' => 'contact@yourwebsite.com',
                'type' => 'email',
                'description' => 'Primary contact email'
            ],
            'contact_phone' => [
                'value' => '+1234567890',
                'type' => 'text',
                'description' => 'Contact phone number'
            ],

            // Social Media
            'social_github' => [
                'value' => 'https://github.com/yourusername',
                'type' => 'url',
                'description' => 'GitHub profile URL'
            ],
            'social_linkedin' => [
                'value' => 'https://linkedin.com/in/yourusername',
                'type' => 'url',
                'description' => 'LinkedIn profile URL'
            ],
            'social_twitter' => [
                'value' => 'https://twitter.com/yourusername',
                'type' => 'url',
                'description' => 'Twitter profile URL'
            ],
            'social_instagram' => [
                'value' => 'https://instagram.com/yourusername',
                'type' => 'url',
                'description' => 'Instagram profile URL'
            ],

            // Hero Section
            'hero_title' => [
                'value' => 'Full-Stack Developer',
                'type' => 'text',
                'description' => 'Main title in hero section'
            ],
            'hero_subtitle' => [
                'value' => 'Creating exceptional digital experiences with cutting-edge technologies',
                'type' => 'textarea',
                'description' => 'Subtitle in hero section'
            ],

            // About Section
            'about_description' => [
                'value' => 'Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through clean, efficient code.',
                'type' => 'textarea',
                'description' => 'About section description'
            ],

            // SEO Meta
            'meta_title' => [
                'value' => 'Professional Developer Portfolio',
                'type' => 'text',
                'description' => 'Meta title for SEO (max 60 characters)'
            ],
            'meta_description' => [
                'value' => 'Professional full-stack developer portfolio showcasing modern web development projects and skills.',
                'type' => 'textarea',
                'description' => 'Meta description for SEO (max 160 characters)'
            ],

            // Analytics & Scripts
            'analytics_code' => [
                'value' => '',
                'type' => 'textarea',
                'description' => 'Google Analytics or other tracking codes'
            ],

            // System Settings
            'maintenance_mode' => [
                'value' => '0',
                'type' => 'boolean',
                'description' => 'Enable maintenance mode'
            ],
            'allow_registration' => [
                'value' => '1',
                'type' => 'boolean',
                'description' => 'Allow new user registrations'
            ],
        ];

        foreach ($defaultSettings as $key => $setting) {
            Setting::updateOrCreate(
                ['key' => $key],
                [
                    'value' => $setting['value'],
                    'type' => $setting['type'],
                    'description' => $setting['description']
                ]
            );
        }
    }
}
