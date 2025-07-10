<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreImportRequest;
use App\Http\Requests\UpdateImportRequest;
use App\Models\Import;
use Cloudinary\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $imports = Import::orderByDesc('created_at')->paginate(20);
        return inertia('admin/imports/index', [
            'imports' => $imports,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/imports/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImportRequest $request)
    {
        $validated = $request->validated();

        // Handle file upload to Cloudinary
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $uploaded = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => 'imports',
                'resource_type' => 'auto', // Handles all file types
            ]);

            $validated['file_path'] = $uploaded['secure_url'];
            $validated['file_name'] = $file->getClientOriginalName();
            $validated['file_type'] = $file->getClientMimeType();
            $validated['file_size'] = $file->getSize();
        }

        Import::create($validated);

        return redirect()->route('admin.imports.index')->with('success', __('Import created successfully.'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Import $import)
    {
        return inertia('admin/imports/show', [
            'import' => $import,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Import $import)
    {
        return inertia('admin/imports/edit', [
            'import' => $import,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImportRequest $request, Import $import)
    {
        $validated = $request->validated();

        // Handle file upload to Cloudinary
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            
            $cloudinary = new Cloudinary([
                'cloud' => [
                    'cloud_name' => env('CLOUDINARY_CLOUD_NAME'),
                    'api_key' => env('CLOUDINARY_API_KEY'),
                    'api_secret' => env('CLOUDINARY_API_SECRET'),
                ],
            ]);

            $uploaded = $cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => 'imports',
                'resource_type' => 'auto', // Handles all file types
            ]);

            $validated['file_path'] = $uploaded['secure_url'];
            $validated['file_name'] = $file->getClientOriginalName();
            $validated['file_type'] = $file->getClientMimeType();
            $validated['file_size'] = $file->getSize();
        }

        $import->update($validated);

        return redirect()->route('admin.imports.index')->with('success', __('Import updated successfully.'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Import $import)
    {
        $import->delete();
        return redirect()->route('admin.imports.index')->with('success', __('Import deleted successfully.'));
    }
}
