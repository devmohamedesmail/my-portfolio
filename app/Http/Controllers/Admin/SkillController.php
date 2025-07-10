<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Skill;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;
use Cloudinary\Cloudinary;

class SkillController extends Controller
{
    public function index(Request $request)
    {
        $query = Skill::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
        }

        // Category filter
        if ($request->filled('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Type filter
        if ($request->filled('type') && $request->type !== 'all') {
            $query->byType($request->type);
        }

        // Featured filter
        if ($request->filled('featured')) {
            $query->featured();
        }

        // Active filter
        if ($request->filled('active')) {
            $query->active();
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'priority');
        $sortDirection = $request->get('sort_direction', 'desc');
        
        if ($sortBy === 'priority') {
            $query->ordered();
        } else {
            $query->orderBy($sortBy, $sortDirection);
        }

        $skills = $query->paginate(12)->withQueryString();

        return Inertia::render('admin/skills/index', [
            'skills' => $skills,
            'filters' => $request->only(['search', 'category', 'type', 'featured', 'active']),
            'categories' => Skill::getCategories(),
            'types' => Skill::getTypes(),
            'masteryLevels' => Skill::getMasteryLevels(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/skills/create', [
            'categories' => Skill::getCategories(),
            'types' => Skill::getTypes(),
            'masteryLevels' => Skill::getMasteryLevels(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:skills',
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:10',
            'image' => 'nullable|image|max:2048', // 2MB max
            'color' => 'nullable|string|max:7',
            'background_gradient' => 'nullable|string|max:255',
            'level' => 'required|integer|min:0|max:100',
            'mastery_level' => ['required', Rule::in(array_keys(Skill::getMasteryLevels()))],
            'years_experience' => 'required|integer|min:0|max:50',
            'category' => ['required', Rule::in(array_keys(Skill::getCategories()))],
            'type' => ['required', Rule::in(array_keys(Skill::getTypes()))],
            'featured' => 'boolean',
            'priority' => 'required|integer|min:0|max:100',
            'active' => 'boolean',
            'first_learned' => 'nullable|date',
            'last_used' => 'nullable|date',
            'certification_url' => 'nullable|url',
        ]);

        // Upload image to cloudinary
        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $uploaded = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder' => 'skills',
            ]);

            $validated['image'] = $uploaded['secure_url'];
        }

        Skill::create($validated);

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill created successfully.');
    }

    public function show(Skill $skill)
    {
        return Inertia::render('admin/skills/show', [
            'skill' => $skill,
        ]);
    }

    public function edit(Skill $skill)
    {
        return Inertia::render('admin/skills/edit', [
            'skill' => $skill,
            'categories' => Skill::getCategories(),
            'types' => Skill::getTypes(),
            'masteryLevels' => Skill::getMasteryLevels(),
        ]);
    }

    public function update(Request $request, Skill $skill)
    { 
        
        
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('skills')->ignore($skill->id)],
            'description' => 'nullable|string',
            'icon' => 'nullable|string|max:10',
            'image' => 'nullable|image|max:2048', // 2MB max
            'color' => 'nullable|string|max:7',
            'background_gradient' => 'nullable|string|max:255',
            'level' => 'required|integer|min:0|max:100',
            'mastery_level' => ['required', Rule::in(array_keys(Skill::getMasteryLevels()))],
            'years_experience' => 'required|integer|min:0|max:50',
            'category' => ['required', Rule::in(array_keys(Skill::getCategories()))],
            'type' => ['required', Rule::in(array_keys(Skill::getTypes()))],
            'featured' => 'boolean',
            'priority' => 'required|integer|min:0|max:100',
            'active' => 'boolean',
            'first_learned' => 'nullable|date',
            'last_used' => 'nullable|date',            
            'certification_url' => 'nullable|url',
        ]);

        // Convert boolean strings to actual booleans
        $validated['featured'] = filter_var($request->input('featured'), FILTER_VALIDATE_BOOLEAN);
        $validated['active'] = filter_var($request->input('active'), FILTER_VALIDATE_BOOLEAN);

        // Upload image to cloudinary
        if ($request->hasFile('image')) {
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $uploaded = $cloudinary->uploadApi()->upload($request->file('image')->getRealPath(), [
                'folder' => 'skills',
            ]);

            $validated['image'] = $uploaded['secure_url'];
        }

        $skill->update($validated);

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')
            ->with('success', 'Skill deleted successfully.');
    }

    public function toggleFeatured(Skill $skill)
    {
        $skill->update(['featured' => !$skill->featured]);

        return redirect()->back()
            ->with('success', 'Skill featured status updated.');
    }

    public function toggleActive(Skill $skill)
    {
        $skill->update(['active' => !$skill->active]);

        return redirect()->back()
            ->with('success', 'Skill active status updated.');
    }
}
