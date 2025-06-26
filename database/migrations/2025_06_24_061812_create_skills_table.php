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
        Schema::create('skills', function (Blueprint $table) {
            $table->id();
           // Basic Information
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Visual Elements
            $table->longText('image')->nullable(); // URL to logo image
            $table->string('icon')->nullable(); // e.g., "⚛️"
            $table->string('color')->nullable(); // CSS color class or hex
            $table->string('background_gradient')->nullable(); // e.g., "from-blue-500 to-blue-600"
            
            // Skill Level & Progress
            $table->integer('level')->default(0); // 0-100 percentage
            $table->string('mastery_level')->default('beginner'); // beginner, intermediate, advanced, expert, master
            $table->integer('years_experience')->default(0); // Years of experience
            
            // Categorization
            $table->string('category')->default('frontend'); // frontend, backend, database, devops, mobile, etc.
            $table->string('type')->default('framework'); // language, framework, tool, library, etc.
            
            // Display & Management
            $table->boolean('featured')->default(false); // Show on homepage
            $table->integer('priority')->default(0); // Display order
            $table->boolean('active')->default(true); // Visibility
            
            // Additional Info
            $table->date('first_learned')->nullable(); // When you first learned it
            $table->date('last_used')->nullable(); // When you last used it
            $table->json('projects_used')->nullable(); // Array of project IDs where used
            $table->string('certification_url')->nullable(); // Link to certification if any
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skills');
    }
};
