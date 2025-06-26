import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AdminLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save } from 'lucide-react'
import { Link } from '@inertiajs/react'

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
}

interface EditProjectProps {
    project: Project
    categories: Record<string, string>
    statuses: Record<string, string>
}

export default function EditProject({ project, categories, statuses }: EditProjectProps) {
    const { t } = useTranslation();
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        slug: project.slug || '',
        description: project.description || '',
        content: project.content || '',
        demo_url: project.demo_url || '',
        github_url: project.github_url || '',
        website_url: project.website_url || '',
        image: project.image || '',
        gallery: project.gallery || [],
        icon: project.icon || '',
        technologies: project.technologies || [],
        category: project.category || 'web-app',
        status: project.status || 'completed',
        performance_score: project.performance_score || 0,
        responsive_score: project.responsive_score || 0,
        accessibility_score: project.accessibility_score || 0,
        start_date: project.start_date || '',
        end_date: project.end_date || '',
        duration_months: project.duration_months || 0,
        featured: project.featured as boolean,
        priority: project.priority || 0,
        is_published: project.is_published as boolean,
        meta_title: project.meta_title || '',
        meta_description: project.meta_description || '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(route('admin.projects.update', project.id))
    }

    const generateSlug = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
        setData('slug', slug)
    }

    const handleTitleChange = (value: string) => {
        setData('title', value)
        if (!data.slug) {
            generateSlug(value)
        }
    }

    const addTechnology = (tech: string) => {
        if (tech && !data.technologies.includes(tech)) {
            setData('technologies', [...data.technologies, tech])
        }
    }

    const removeTechnology = (index: number) => {
        setData('technologies', data.technologies.filter((_, i) => i !== index))
    }

    return (
        <AdminLayout>
            <Head title={`${t('adminProjects.editProject')}: ${project.title}`} />
            
            <div className="space-y-6 px-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route('admin.projects.index')}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            {t('adminProjects.backToProjects')}
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t('adminProjects.editProject')}</h1>
                            <p className="text-muted-foreground">{t('adminProjects.pageDescription')}</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.basicInformation')}</CardTitle>
                                    <CardDescription>
                                        {t('adminProjects.basicInformationDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">{t('adminProjects.title')} *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => handleTitleChange(e.target.value)}
                                            placeholder={t('adminProjects.titlePlaceholder')}
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="slug">{t('adminProjects.slug')} *</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder={t('adminProjects.slugPlaceholder')}
                                            className={errors.slug ? 'border-red-500' : ''}
                                        />
                                        {errors.slug && (
                                            <p className="text-sm text-red-500 mt-1">{errors.slug}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">{t('adminProjects.description')} *</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder={t('adminProjects.descriptionPlaceholder')}
                                            rows={3}
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        {errors.description && (
                                            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="content">{t('adminProjects.content')}</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder={t('adminProjects.contentPlaceholder')}
                                            rows={10}
                                            className={errors.content ? 'border-red-500' : ''}
                                        />
                                        {errors.content && (
                                            <p className="text-sm text-red-500 mt-1">{errors.content}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* URLs & Links */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.urlsLinks')}</CardTitle>
                                    <CardDescription>
                                        {t('adminProjects.urlsLinksDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="demo_url">{t('adminProjects.demoUrl')}</Label>
                                        <Input
                                            id="demo_url"
                                            type="url"
                                            value={data.demo_url}
                                            onChange={(e) => setData('demo_url', e.target.value)}
                                            placeholder={t('adminProjects.demoUrlPlaceholder')}
                                            className={errors.demo_url ? 'border-red-500' : ''}
                                        />
                                        {errors.demo_url && (
                                            <p className="text-sm text-red-500 mt-1">{errors.demo_url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="github_url">{t('adminProjects.githubUrl')}</Label>
                                        <Input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder={t('adminProjects.githubUrlPlaceholder')}
                                            className={errors.github_url ? 'border-red-500' : ''}
                                        />
                                        {errors.github_url && (
                                            <p className="text-sm text-red-500 mt-1">{errors.github_url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="website_url">{t('adminProjects.websiteUrl')}</Label>
                                        <Input
                                            id="website_url"
                                            type="url"
                                            value={data.website_url}
                                            onChange={(e) => setData('website_url', e.target.value)}
                                            placeholder={t('adminProjects.websiteUrlPlaceholder')}
                                            className={errors.website_url ? 'border-red-500' : ''}
                                        />
                                        {errors.website_url && (
                                            <p className="text-sm text-red-500 mt-1">{errors.website_url}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Technologies */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.technologies')}</CardTitle>
                                    <CardDescription>
                                        {t('adminProjects.technologiesDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>{t('adminProjects.addTechnology')}</Label>
                                        <div className="flex space-x-2">
                                            <Input
                                                placeholder={t('adminProjects.addTechnologyPlaceholder')}
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault()
                                                        addTechnology(e.currentTarget.value)
                                                        e.currentTarget.value = ''
                                                    }
                                                }}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={(e) => {
                                                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                                    addTechnology(input.value)
                                                    input.value = ''
                                                }}
                                            >
                                                {t('adminProjects.add')}
                                            </Button>
                                        </div>
                                    </div>

                                    {data.technologies.length > 0 && (
                                        <div>
                                            <Label>{t('adminProjects.technologies')}</Label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {data.technologies.map((tech, index) => (
                                                    <span
                                                        key={index}
                                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                                    >
                                                        {tech}
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTechnology(index)}
                                                            className="ml-1 text-primary/60 hover:text-primary"
                                                        >
                                                            {t('adminProjects.remove')}
                                                        </button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Settings */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.projectSettings')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>{t('adminProjects.category')} *</Label>
                                        <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                                <SelectValue placeholder={t('adminProjects.categoryPlaceholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(categories).map(([value, label]) => (
                                                    <SelectItem key={value} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.category && (
                                            <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>{t('adminProjects.status')} *</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                <SelectValue placeholder={t('adminProjects.statusPlaceholder')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Object.entries(statuses).map(([value, label]) => (
                                                    <SelectItem key={value} value={value}>
                                                        {label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-red-500 mt-1">{errors.status}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="priority">{t('adminProjects.priority')}</Label>
                                        <Input
                                            id="priority"
                                            type="number"
                                            min="0"
                                            value={data.priority}
                                            onChange={(e) => setData('priority', parseInt(e.target.value) || 0)}
                                            className={errors.priority ? 'border-red-500' : ''}
                                        />
                                        {errors.priority && (
                                            <p className="text-sm text-red-500 mt-1">{errors.priority}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="featured"
                                            checked={data.featured}
                                            onCheckedChange={(checked) => setData('featured', !!checked)}
                                        />
                                        <Label htmlFor="featured">{t('adminProjects.featuredProject')}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', !!checked)}
                                        />
                                        <Label htmlFor="is_published">{t('adminProjects.published')}</Label>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Visual Elements */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.visualElements')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="image">{t('adminProjects.featuredImageUrl')}</Label>
                                        <Input
                                            id="image"
                                            type="url"
                                            value={data.image}
                                            onChange={(e) => setData('image', e.target.value)}
                                            placeholder={t('adminProjects.featuredImagePlaceholder')}
                                            className={errors.image ? 'border-red-500' : ''}
                                        />
                                        {errors.image && (
                                            <p className="text-sm text-red-500 mt-1">{errors.image}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="icon">{t('adminProjects.iconUrl')}</Label>
                                        <Input
                                            id="icon"
                                            type="url"
                                            value={data.icon}
                                            onChange={(e) => setData('icon', e.target.value)}
                                            placeholder={t('adminProjects.iconUrlPlaceholder')}
                                            className={errors.icon ? 'border-red-500' : ''}
                                        />
                                        {errors.icon && (
                                            <p className="text-sm text-red-500 mt-1">{errors.icon}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Performance Scores */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.performanceScores')}</CardTitle>
                                    <CardDescription>
                                        {t('adminProjects.performanceScoresDesc')}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="performance_score">{t('adminProjects.performanceScore')}</Label>
                                        <Input
                                            id="performance_score"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.performance_score}
                                            onChange={(e) => setData('performance_score', parseInt(e.target.value) || 0)}
                                            className={errors.performance_score ? 'border-red-500' : ''}
                                        />
                                        {errors.performance_score && (
                                            <p className="text-sm text-red-500 mt-1">{errors.performance_score}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="responsive_score">{t('adminProjects.responsiveScore')}</Label>
                                        <Input
                                            id="responsive_score"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.responsive_score}
                                            onChange={(e) => setData('responsive_score', parseInt(e.target.value) || 0)}
                                            className={errors.responsive_score ? 'border-red-500' : ''}
                                        />
                                        {errors.responsive_score && (
                                            <p className="text-sm text-red-500 mt-1">{errors.responsive_score}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="accessibility_score">{t('adminProjects.accessibilityScore')}</Label>
                                        <Input
                                            id="accessibility_score"
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={data.accessibility_score}
                                            onChange={(e) => setData('accessibility_score', parseInt(e.target.value) || 0)}
                                            className={errors.accessibility_score ? 'border-red-500' : ''}
                                        />
                                        {errors.accessibility_score && (
                                            <p className="text-sm text-red-500 mt-1">{errors.accessibility_score}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.timeline')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="start_date">{t('adminProjects.startDate')}</Label>
                                        <Input
                                            id="start_date"
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                            className={errors.start_date ? 'border-red-500' : ''}
                                        />
                                        {errors.start_date && (
                                            <p className="text-sm text-red-500 mt-1">{errors.start_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="end_date">{t('adminProjects.endDate')}</Label>
                                        <Input
                                            id="end_date"
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                            className={errors.end_date ? 'border-red-500' : ''}
                                        />
                                        {errors.end_date && (
                                            <p className="text-sm text-red-500 mt-1">{errors.end_date}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="duration_months">{t('adminProjects.durationMonths')}</Label>
                                        <Input
                                            id="duration_months"
                                            type="number"
                                            min="0"
                                            value={data.duration_months}
                                            onChange={(e) => setData('duration_months', parseInt(e.target.value) || 0)}
                                            className={errors.duration_months ? 'border-red-500' : ''}
                                        />
                                        {errors.duration_months && (
                                            <p className="text-sm text-red-500 mt-1">{errors.duration_months}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* SEO */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminProjects.seo')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="meta_title">{t('adminProjects.metaTitle')}</Label>
                                        <Input
                                            id="meta_title"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            placeholder={t('adminProjects.metaTitlePlaceholder')}
                                            className={errors.meta_title ? 'border-red-500' : ''}
                                        />
                                        {errors.meta_title && (
                                            <p className="text-sm text-red-500 mt-1">{errors.meta_title}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="meta_description">{t('adminProjects.metaDescription')}</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder={t('adminProjects.metaDescriptionPlaceholder')}
                                            rows={3}
                                            className={errors.meta_description ? 'border-red-500' : ''}
                                        />
                                        {errors.meta_description && (
                                            <p className="text-sm text-red-500 mt-1">{errors.meta_description}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                        <Link
                            href={route('admin.projects.index')}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {t('adminProjects.cancel')}
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {processing ? t('adminProjects.updating') : t('adminProjects.update')}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
