import { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    Plus,
    Search,
    Filter,
    Star,
    Eye,
    EyeOff,
    Edit,
    Trash2,
    MoreVertical,
    Globe,
    Github,
    ExternalLink,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    Pause,
    Archive,
    FolderOpen
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbItem } from '@/types';
import { useTranslation } from 'react-i18next';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Projects', href: '/admin/projects' },
];

interface Project {
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
}

interface ProjectsPageProps {
    projects: {
        data: Project[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        category?: string;
        status?: string;
        featured?: boolean;
        is_published?: boolean;
    };
    categories: Record<string, string>;
    statuses: Record<string, string>;
    [key: string]: unknown;
}

export default function ProjectsIndex() {
    const { projects, filters, categories, statuses } = usePage<ProjectsPageProps>().props;
    const [showFilters, setShowFilters] = useState(false);
    const { t } = useTranslation();
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || 'all',
        status: filters.status || 'all',
        featured: filters.featured || false,
        is_published: filters.is_published || false,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('admin.projects.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleFilterChange = (field: string, value: any) => {
        setData(field as any, value);
        const newData = { ...data, [field]: value };
        get(route('admin.projects.index', newData), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleFeatured = (project: Project) => {
        router.post(route('admin.projects.toggle-featured', project.id));
    };

    const togglePublished = (project: Project) => {
        router.post(route('admin.projects.toggle-published', project.id));
    };

    const deleteProject = (project: Project) => {
        if (confirm(t('adminProjects.deleteConfirmation'))) {
            router.delete(route('admin.projects.destroy', project.id));
        }
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            planned: <Clock className="w-4 h-4 text-gray-500" />,
            'in-progress': <Pause className="w-4 h-4 text-blue-500" />,
            completed: <CheckCircle className="w-4 h-4 text-green-500" />,
            archived: <Archive className="w-4 h-4 text-gray-400" />,
        };
        return icons[status as keyof typeof icons] || <Clock className="w-4 h-4" />;
    };

    const getStatusColor = (status: string) => {
        const colors = {
            planned: 'bg-gray-100 text-gray-800',
            'in-progress': 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            archived: 'bg-gray-100 text-gray-600',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getCategoryColor = (category: string) => {
        const colors = {
            'web-app': 'bg-purple-100 text-purple-800',
            'mobile-app': 'bg-indigo-100 text-indigo-800',
            'desktop-app': 'bg-cyan-100 text-cyan-800',
            'api': 'bg-orange-100 text-orange-800',
            'library': 'bg-pink-100 text-pink-800',
            'tool': 'bg-emerald-100 text-emerald-800',
            'other': 'bg-gray-100 text-gray-800',
        };
        return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('adminProjects.pageTitle')} >
                <title>{t('meta.title')}</title>
                <meta name="description" content={t('meta.description')} />
                <meta name="keywords" content={t('meta.keywords')} />
                <meta httpEquiv="Content-Language" content="ar" />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Mohamed Esmail" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="subject" content={t('meta.subject')} />
                <meta property="og:title" content={t('meta.title')} />
                <meta property="og:description" content={t('meta.description')} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://yourwebsite.com" />
                <meta property="og:image" content="https://yourwebsite.com/images/preview.jpg" />
                <meta property="og:locale" content="ar_AR" />

                {/* تحسينات تويتر */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={t('meta.title')} />
                <meta name="twitter:description" content={t('meta.description')} />
                <meta name="twitter:image" content="https://yourwebsite.com/images/preview.jpg" />
                <link rel="icon" href="https://res.cloudinary.com/dkcoe5fam/image/upload/v1751560468/Esmail_4bdb513f9a.png" />
                <link rel="apple-touch-icon" href="https://res.cloudinary.com/dkcoe5fam/image/upload/v1751560468/Esmail_4bdb513f9a.png" />
                <link rel="manifest" href="https://res.cloudinary.com/dkcoe5fam/image/upload/v1751560468/Esmail_4bdb513f9a.png" />

            </Head>

            <div className="space-y-6 p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('adminProjects.pageTitle')}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('adminProjects.pageDescription')}
                        </p>
                    </div>
                    <Link href={route('admin.projects.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            {t('adminProjects.addNewProject')}
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <CardTitle className="text-lg">{t('adminProjects.searchFilter')}</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                {t('adminProjects.filters')}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder={t('adminProjects.searchPlaceholder')}
                                    value={data.search}
                                    onChange={(e) => setData('search', e.target.value)}
                                />
                            </div>
                            <Button type="submit" disabled={processing}>
                                <Search className="w-4 h-4" />
                            </Button>
                        </form>

                        {/* Filters */}
                        {showFilters && (
                            <>
                                <Separator />
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">{t('adminProjects.category')}</Label>
                                        <Select
                                            value={data.category}
                                            onValueChange={(value) => handleFilterChange('category', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">{t('adminProjects.allCategories')}</SelectItem>
                                                {Object.entries(categories).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">{t('adminProjects.status')}</Label>
                                        <Select
                                            value={data.status}
                                            onValueChange={(value) => handleFilterChange('status', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">{t('adminProjects.allStatuses')}</SelectItem>
                                                {Object.entries(statuses).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="featured"
                                            checked={data.featured}
                                            onCheckedChange={(checked) => handleFilterChange('featured', checked)}
                                        />
                                        <Label htmlFor="featured">{t('adminProjects.featuredOnly')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => handleFilterChange('is_published', checked)}
                                        />
                                        <Label htmlFor="published">{t('adminProjects.publishedOnly')}</Label>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Projects Grid */}
                {projects.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FolderOpen className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('adminProjects.noProjectsFound')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                {Object.values(filters).some(Boolean)
                                    ? t('adminProjects.noProjectsDescription')
                                    : t('adminProjects.getStartedMessage')}
                            </p>
                            <Link href={route('admin.projects.create')}>
                                <Button>{t('adminProjects.addNewProject')}</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {projects.data.map((project) => (
                            <Card key={project.id} className="relative group hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                                {project.title.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {getStatusIcon(project.status)}
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                        {statuses[project.status]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.projects.show', project.id)}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        {t('adminProjects.view')}
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.projects.edit', project.id)}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        {t('adminProjects.edit')}
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleFeatured(project)}>
                                                    <Star className={`w-4 h-4 mr-2 ${project.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                                    {project.featured ? t('adminProjects.unfeature') : t('adminProjects.feature')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => togglePublished(project)}>
                                                    {project.is_published ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                                    {project.is_published ? t('adminProjects.unpublish') : t('adminProjects.publish')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => deleteProject(project)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    {t('adminProjects.delete')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* Performance Scores */}
                                    <div className="grid grid-cols-3 gap-2 text-center">
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{t('adminProjects.performance')}</div>
                                            <div className="text-sm font-semibold">{project.performance_score}/100</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{t('adminProjects.responsive')}</div>
                                            <div className="text-sm font-semibold">{project.responsive_score}/100</div>
                                        </div>
                                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2">
                                            <div className="text-xs text-gray-600 dark:text-gray-400">{t('adminProjects.accessibility')}</div>
                                            <div className="text-sm font-semibold">{project.accessibility_score}/100</div>
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 3).map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{project.technologies.length - 3} more
                                                </Badge>
                                            )}
                                        </div>
                                    )}

                                    {/* Status and Category Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className={getStatusColor(project.status)}>
                                            {statuses[project.status]}
                                        </Badge>
                                        <Badge variant="outline" className={getCategoryColor(project.category)}>
                                            {categories[project.category]}
                                        </Badge>
                                    </div>

                                    {/* Links */}
                                    <div className="flex items-center gap-2">
                                        {project.demo_url && (
                                            <Button size="sm" variant="outline" asChild>
                                                <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                                    <Globe className="w-3 h-3 mr-1" />
                                                    {t('adminProjects.liveDemo')}
                                                </a>
                                            </Button>
                                        )}
                                        {project.github_url && (
                                            <Button size="sm" variant="outline" asChild>
                                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-3 h-3 mr-1" />
                                                    {t('adminProjects.sourceCode')}
                                                </a>
                                            </Button>
                                        )}
                                        {project.website_url && (
                                            <Button size="sm" variant="outline" asChild>
                                                <a href={project.website_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-3 h-3 mr-1" />
                                                    {t('adminProjects.website')}
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    {/* Status Indicators */}
                                    <div className="flex items-center gap-4 pt-2 border-t">
                                        <div className="flex items-center gap-1">
                                            <Star className={`w-4 h-4 ${project.featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {project.featured ? t('adminProjects.featured') : t('adminProjects.regular')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {project.is_published ? (
                                                <Eye className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <EyeOff className="w-4 h-4 text-gray-400" />
                                            )}
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {project.is_published ? t('adminProjects.published') : t('adminProjects.draft')}
                                            </span>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="text-xs text-gray-400">
                                                {t('adminProjects.priority')}: {project.priority}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {projects.meta && projects.meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {projects.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url);
                                    }
                                }}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
