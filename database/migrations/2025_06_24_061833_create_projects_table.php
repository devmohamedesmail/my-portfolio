<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
             // Basic Information
        $table->string('title');
        $table->string('slug')->unique();
        $table->text('description');
        $table->longText('content')->nullable();
        
        // URLs & Links
        $table->string('demo_url')->nullable();
        $table->string('github_url')->nullable();
        $table->string('website_url')->nullable();
        
        // Visual Elements
        $table->string('image')->nullable();
        $table->json('gallery')->nullable();
        $table->string('icon')->nullable();
        
        // Technical Details
        $table->json('technologies')->nullable();
        $table->string('category')->default('web-app');
        $table->enum('status', ['planned', 'in-progress', 'completed', 'archived'])->default('completed');
        
        // Metrics & Stats
        $table->integer('performance_score')->default(0);
        $table->integer('responsive_score')->default(0);
        $table->integer('accessibility_score')->default(0);
        
        // Timeline
        $table->date('start_date')->nullable();
        $table->date('end_date')->nullable();
        $table->integer('duration_months')->nullable();
        
        // Management
        $table->boolean('featured')->default(false);
        $table->integer('priority')->default(0);
        $table->boolean('is_published')->default(true);
        
        // SEO
        $table->string('meta_title')->nullable();
        $table->text('meta_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
