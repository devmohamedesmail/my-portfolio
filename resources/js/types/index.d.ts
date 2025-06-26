import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    content?: string;
    demo_url?: string;
    github_url?: string;
    website_url?: string;
    image?: string;
    gallery?: string[];
    icon?: string;
    technologies?: string[];
    category: string;
    status: 'planned' | 'in-progress' | 'completed' | 'archived';
    performance_score: number;
    responsive_score: number;
    accessibility_score: number;
    start_date?: string;
    end_date?: string;
    duration_months?: number;
    featured: boolean;
    priority: number;
    is_published: boolean;
    meta_title?: string;
    meta_description?: string;
    created_at: string;
    updated_at: string;
    gradient?: string; // For fallback styling
    [key: string]: unknown;
}

export interface Skill {
    id: number;
    name: string;
    slug: string;
    description?: string;
    proficiency: number;
    category: string;
    icon?: string;
    color?: string;
    years_of_experience?: number;
    is_primary: boolean;
    is_published: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
