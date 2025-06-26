<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        $settings = Setting::all();
        
        return Inertia::render('admin/settings/index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string|max:500',
            'site_keywords' => 'required|string|max:500',
            'site_author' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'nullable|string|max:50',
            'social_github' => 'nullable|url|max:255',
            'social_linkedin' => 'nullable|url|max:255',
            'social_twitter' => 'nullable|url|max:255',
            'social_instagram' => 'nullable|url|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'favicon' => 'nullable|image|mimes:ico,png|max:1024',
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'required|string|max:500',
            'about_description' => 'required|string|max:1000',
            'meta_title' => 'required|string|max:60',
            'meta_description' => 'required|string|max:160',
            'analytics_code' => 'nullable|string',
            'maintenance_mode' => 'boolean',
            'allow_registration' => 'boolean',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('settings', 'public');
            $validated['logo'] = $logoPath;
        }

        // Handle favicon upload
        if ($request->hasFile('favicon')) {
            $faviconPath = $request->file('favicon')->store('settings', 'public');
            $validated['favicon'] = $faviconPath;
        }

        // Update or create settings
        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'Settings updated successfully!');
    }

    public function deleteLogo()
    {
        $logoSetting = Setting::where('key', 'logo')->first();
        
        if ($logoSetting && $logoSetting->value) {
            Storage::disk('public')->delete($logoSetting->value);
            $logoSetting->delete();
        }

        return redirect()->back()->with('success', 'Logo deleted successfully!');
    }

    public function deleteFavicon()
    {
        $faviconSetting = Setting::where('key', 'favicon')->first();
        
        if ($faviconSetting && $faviconSetting->value) {
            Storage::disk('public')->delete($faviconSetting->value);
            $faviconSetting->delete();
        }

        return redirect()->back()->with('success', 'Favicon deleted successfully!');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:settings,key',
            'value' => 'required|string',
            'type' => 'required|string|in:text,number,boolean,url,email,file',
            'description' => 'nullable|string|max:500'
        ]);

        Setting::create($validated);

        return redirect()->back()->with('success', 'Setting created successfully!');
    }

    public function edit(Setting $setting)
    {
        return response()->json($setting);
    }

    public function updateSetting(Request $request, Setting $setting)
    {
        $validated = $request->validate([
            'key' => 'required|string|max:255|unique:settings,key,' . $setting->id,
            'value' => 'required|string',
            'type' => 'required|string|in:text,number,boolean,url,email,file',
            'description' => 'nullable|string|max:500'
        ]);

        $setting->update($validated);

        return redirect()->back()->with('success', 'Setting updated successfully!');
    }

    public function destroy(Setting $setting)
    {
        $setting->delete();

        return redirect()->back()->with('success', 'Setting deleted successfully!');
    }

    public function copy(Setting $setting)
    {
        $newSetting = $setting->replicate();
        $newSetting->key = $setting->key . '_copy';
        $newSetting->save();

        return redirect()->back()->with('success', 'Setting copied successfully!');
    }
}
