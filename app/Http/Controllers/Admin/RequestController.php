<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProjectRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        $status = $request->get('status');

        $requests = ProjectRequest::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('project_idea', 'like', "%{$search}%");
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('admin/requests/index', [
            'requests' => $requests,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProjectRequest $request)
    {
        return Inertia::render('admin/requests/show', [
            'request' => $request,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $updateRequest, ProjectRequest $request)
    {
        $validated = $updateRequest->validate([
            'status' => 'required|in:pending,contacted,in_progress,completed,cancelled',
            'notes' => 'nullable|string|max:2000',
        ]);

        $request->update($validated);

        return redirect()->back()->with('success', 'Request updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectRequest $request)
    {
        $request->delete();

        return redirect()->route('admin.requests.index')->with('success', 'Request deleted successfully!');
    }
}
