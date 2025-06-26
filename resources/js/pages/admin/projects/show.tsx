import { Head, Link, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
    Edit, 
    Trash2, 
    ExternalLink, 
    Github, 
    Globe,
    Calendar,
    Clock,
    Star,
    TrendingUp,
    Smartphone,
    Accessibility
} from 'lucide-react'

interface Project {
    id: number
    title: string
    slug: string
    description: string
    content: string
    demo_url: string
    github_url: string
    website_url: string
    image: string
    gallery: string[]
    icon: string
    technologies: string[]
    category: string
    status: string
    performance_score: number
    responsive_score: number
    accessibility_score: number
    start_date: string
    end_date: string
    duration_months: number
    featured: boolean
    priority: number
    is_published: boolean
    meta_title: string
    meta_description: string
    created_at: string
    updated_at: string
}

interface Props {
    project: Project
}

export default function ShowProject({ project }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('admin.projects.destroy', project.id))
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            case 'planned': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
            case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'web-app': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
            case 'mobile-app': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
            case 'desktop-app': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
            case 'api': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
            case 'library': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300'
            case 'tool': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300'
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 dark:text-green-400'
        if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
        return 'text-red-600 dark:text-red-400'
    }

    return (
        <AppLayout>
            <Head title={project.title} />
            
            <div className="space-y-6 px-1">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            {project.icon && <span className="text-2xl">{project.icon}</span>}
                            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                            {project.featured && (
                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                </Badge>
                            )}
                            {!project.is_published && (
                                <Badge variant="destructive">
                                    Draft
                                </Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.projects.edit', project.id)}>
                            <Button size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        </Link>
                        <Button size="sm" variant="destructive" onClick={handleDelete}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Content */}
                        {project.content && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="whitespace-pre-line">{project.content}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Technologies Used</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, index) => (
                                            <Badge key={index} variant="outline">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Links */}
                        {(project.demo_url || project.github_url || project.website_url) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Links</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {project.demo_url && (
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-muted-foreground" />
                                            <a 
                                                href={project.demo_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Live Demo
                                                <ExternalLink className="h-3 w-3 ml-1 inline" />
                                            </a>
                                        </div>
                                    )}
                                    {project.github_url && (
                                        <div className="flex items-center gap-2">
                                            <Github className="h-4 w-4 text-muted-foreground" />
                                            <a 
                                                href={project.github_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Source Code
                                                <ExternalLink className="h-3 w-3 ml-1 inline" />
                                            </a>
                                        </div>
                                    )}
                                    {project.website_url && (
                                        <div className="flex items-center gap-2">
                                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                            <a 
                                                href={project.website_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                Website
                                                <ExternalLink className="h-3 w-3 ml-1 inline" />
                                            </a>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Performance Scores */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Metrics</CardTitle>
                                <CardDescription>
                                    Project performance and quality scores
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <TrendingUp className="h-5 w-5 text-muted-foreground mr-1" />
                                            <span className="text-sm font-medium">Performance</span>
                                        </div>
                                        <div className={`text-2xl font-bold ${getScoreColor(project.performance_score)}`}>
                                            {project.performance_score}%
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Smartphone className="h-5 w-5 text-muted-foreground mr-1" />
                                            <span className="text-sm font-medium">Responsive</span>
                                        </div>
                                        <div className={`text-2xl font-bold ${getScoreColor(project.responsive_score)}`}>
                                            {project.responsive_score}%
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center mb-2">
                                            <Accessibility className="h-5 w-5 text-muted-foreground mr-1" />
                                            <span className="text-sm font-medium">Accessibility</span>
                                        </div>
                                        <div className={`text-2xl font-bold ${getScoreColor(project.accessibility_score)}`}>
                                            {project.accessibility_score}%
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Project Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Category</span>
                                    <div>
                                        <Badge className={getCategoryColor(project.category)}>
                                            {project.category.replace('-', ' ').toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                                    <div>
                                        <Badge className={getStatusColor(project.status)}>
                                            {project.status.replace('-', ' ').toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Priority</span>
                                    <div className="text-sm">{project.priority}</div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Slug</span>
                                    <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                        {project.slug}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        {(project.start_date || project.end_date || project.duration_months) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.start_date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm font-medium">Start Date</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {new Date(project.start_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {project.end_date && (
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm font-medium">End Date</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {new Date(project.end_date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {project.duration_months > 0 && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <div className="text-sm font-medium">Duration</div>
                                                <div className="text-sm text-muted-foreground">
                                                    {project.duration_months} month{project.duration_months !== 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* SEO */}
                        {(project.meta_title || project.meta_description) && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>SEO Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.meta_title && (
                                        <div className="space-y-2">
                                            <span className="text-sm font-medium text-muted-foreground">Meta Title</span>
                                            <div className="text-sm">{project.meta_title}</div>
                                        </div>
                                    )}
                                    {project.meta_description && (
                                        <div className="space-y-2">
                                            <span className="text-sm font-medium text-muted-foreground">Meta Description</span>
                                            <div className="text-sm text-muted-foreground">{project.meta_description}</div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        {/* Metadata */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Metadata</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Created</span>
                                    <div className="text-sm">
                                        {new Date(project.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-sm font-medium text-muted-foreground">Last Updated</span>
                                    <div className="text-sm">
                                        {new Date(project.updated_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}
