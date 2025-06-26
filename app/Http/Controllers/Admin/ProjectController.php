<?php

namespace App\Http\Controllers\Admin;

use App\Models\Project;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by featured
        if ($request->boolean('featured')) {
            $query->where('featured', true);
        }

        // Filter by published
        if ($request->boolean('is_published')) {
            $query->where('is_published', true);
        }

        $projects = $query->orderBy('priority', 'desc')
                         ->orderBy('created_at', 'desc')
                         ->paginate(12)
                         ->withQueryString();

        return Inertia::render('admin/projects/index', [
            'projects' => $projects,
            'filters' => $request->only(['search', 'category', 'status', 'featured', 'is_published']),
            'categories' => [
                'web-app' => 'Web Application',
                'mobile-app' => 'Mobile Application', 
                'desktop-app' => 'Desktop Application',
                'api' => 'API/Backend',
                'library' => 'Library/Package',
                'tool' => 'Tool/Utility',
                'other' => 'Other',
            ],
            'statuses' => [
                'planned' => 'Planned',
                'in-progress' => 'In Progress',
                'completed' => 'Completed',
                'archived' => 'Archived',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create', [
            'categories' => [
                'web-app' => 'Web Application',
                'mobile-app' => 'Mobile Application', 
                'desktop-app' => 'Desktop Application',
                'api' => 'API/Backend',
                'library' => 'Library/Package',
                'tool' => 'Tool/Utility',
                'other' => 'Other',
            ],
            'statuses' => [
                'planned' => 'Planned',
                'in-progress' => 'In Progress',
                'completed' => 'Completed',
                'archived' => 'Archived',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects',
            'description' => 'required|string',
            'content' => 'nullable|string',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'website_url' => 'nullable|url',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'icon' => 'nullable|string',
            'technologies' => 'nullable|array',
            'category' => 'required|in:web-app,mobile-app,desktop-app,api,library,tool,other',
            'status' => 'required|in:planned,in-progress,completed,archived',
            'performance_score' => 'nullable|integer|min:0|max:100',
            'responsive_score' => 'nullable|integer|min:0|max:100',
            'accessibility_score' => 'nullable|integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'duration_months' => 'nullable|integer|min:0',
            'featured' => 'boolean',
            'priority' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        Project::create($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully.');
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project,
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project,
            'categories' => [
                'web-app' => 'Web Application',
                'mobile-app' => 'Mobile Application', 
                'desktop-app' => 'Desktop Application',
                'api' => 'API/Backend',
                'library' => 'Library/Package',
                'tool' => 'Tool/Utility',
                'other' => 'Other',
            ],
            'statuses' => [
                'planned' => 'Planned',
                'in-progress' => 'In Progress',
                'completed' => 'Completed',
                'archived' => 'Archived',
            ],
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,' . $project->id,
            'description' => 'required|string',
            'content' => 'nullable|string',
            'demo_url' => 'nullable|url',
            'github_url' => 'nullable|url',
            'website_url' => 'nullable|url',
            'image' => 'nullable|string',
            'gallery' => 'nullable|array',
            'icon' => 'nullable|string',
            'technologies' => 'nullable|array',
            'category' => 'required|in:web-app,mobile-app,desktop-app,api,library,tool,other',
            'status' => 'required|in:planned,in-progress,completed,archived',
            'performance_score' => 'nullable|integer|min:0|max:100',
            'responsive_score' => 'nullable|integer|min:0|max:100',
            'accessibility_score' => 'nullable|integer|min:0|max:100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'duration_months' => 'nullable|integer|min:0',
            'featured' => 'boolean',
            'priority' => 'nullable|integer|min:0',
            'is_published' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully.');
    }

    public function toggleFeatured(Project $project)
    {
        $project->update(['featured' => !$project->featured]);
        return back();
    }

    public function togglePublished(Project $project)
    {
        $project->update(['is_published' => !$project->is_published]);
        return back();
    }
}
