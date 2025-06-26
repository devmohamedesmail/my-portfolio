<?php

namespace App\Http\Controllers;

use App\Models\ProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProjectRequestController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'project_idea' => 'required|string|max:2000',
            ]);

            ProjectRequest::create($validated);

            return redirect()->back()->with('success', 'Project request submitted successfully!');

        } catch (ValidationException $e) {
            return redirect()->back()->withErrors($e->errors())->withInput();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred while submitting your request')->withInput();
        }
    }
}
