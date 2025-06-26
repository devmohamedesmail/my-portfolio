<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // For now, any authenticated user can access admin
        // You can modify this logic to check for admin role/permissions
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Add your admin role check here if you have user roles
        // Example: if (!auth()->user()->isAdmin()) { abort(403); }

        return $next($request);
    }
}
