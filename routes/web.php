<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\front\FrontController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\AnalyticsController;
use App\Http\Controllers\Admin\PerformanceController;
use App\Http\Controllers\Admin\RequestController;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\ProjectRequestController;

// Route::get('/', function () {
//     return Inertia::render('front/index');
// })->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        
        $role = auth()->user()->role;
        if ($role === 'admin') {
            return Inertia::render('dashboard');
        } elseif ($role === 'user') {
            return redirect()->route('front.index');
        } else {
            return redirect()->route('front.index'); // Default to front index for other roles
        }
    })->name('dashboard');
    
    // Admin Routes
    Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
        // Settings Routes
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::post('/settings', [SettingsController::class, 'store'])->name('settings.store');
        Route::get('/settings/{setting}/edit', [SettingsController::class, 'edit'])->name('settings.edit');
        Route::put('/settings/{setting}', [SettingsController::class, 'updateSetting'])->name('settings.update');
        Route::delete('/settings/{setting}', [SettingsController::class, 'destroy'])->name('settings.destroy');
        Route::post('/settings/{setting}/copy', [SettingsController::class, 'copy'])->name('settings.copy');
        Route::delete('/settings/logo', [SettingsController::class, 'deleteLogo'])->name('settings.delete-logo');
        Route::delete('/settings/favicon', [SettingsController::class, 'deleteFavicon'])->name('settings.delete-favicon');
        
        // Skills Routes
        Route::resource('skills', SkillController::class);
        Route::post('skills/{skill}/toggle-featured', [SkillController::class, 'toggleFeatured'])->name('skills.toggle-featured');
        Route::post('skills/{skill}/toggle-active', [SkillController::class, 'toggleActive'])->name('skills.toggle-active');
        
        // Projects Routes
        Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::get('projects/create', [ProjectController::class, 'create'])->name('projects.create');
        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::get('projects/{project}', [ProjectController::class, 'show'])->name('projects.show');
        Route::get('projects/{project}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
        Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');
        Route::post('projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('projects.toggle-featured');
        Route::post('projects/{project}/toggle-published', [ProjectController::class, 'togglePublished'])->name('projects.toggle-published');
        
        // Project Requests Routes
        Route::get('requests', [RequestController::class, 'index'])->name('requests.index');
        Route::get('requests/{request}', [RequestController::class, 'show'])->name('requests.show');
        Route::patch('requests/{request}', [RequestController::class, 'update'])->name('requests.update');
        Route::delete('requests/{request}', [RequestController::class, 'destroy'])->name('requests.destroy');
        
        // Visitor Routes
        Route::get('visitors', [VisitorController::class, 'index'])->name('visitors.index');
        Route::get('visitors/{visitor}', [VisitorController::class, 'show'])->name('visitors.show');
        Route::delete('visitors/{visitor}', [VisitorController::class, 'destroy'])->name('visitors.destroy');
        Route::get('visitors-analytics', [VisitorController::class, 'analytics'])->name('visitors.analytics');
        
       
        // Analytics Routes
        Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics.index');
        
        // Performance Routes
        Route::get('performance', [PerformanceController::class, 'index'])->name('performance.index');
        
        // Activity Routes
        Route::get('activity', [ActivityController::class, 'index'])->name('activity.index');
        
        // Clients Routes
        Route::resource('clients', \App\Http\Controllers\ClientController::class);
        
        // Imports Routes
        Route::resource('imports', \App\Http\Controllers\ImportController::class);
    });
});




Route::controller(FrontController::class)->group(function () {
    Route::get('/', 'index')->name('front.index');
   
});

// Project request route (public)
Route::post('/project-requests', [ProjectRequestController::class, 'store'])->name('project-requests.store');




require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
