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
    Code,
    Database,
    Cloud,
    Palette,
    TestTube,
    Smartphone,
    Settings as SettingsIcon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbItem } from '@/types';

interface Skill {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    color?: string;
    background_gradient?: string;
    level: number;
    mastery_level: string;
    years_experience: number;
    category: string;
    type: string;
    featured: boolean;
    priority: number;
    active: boolean;
    first_learned?: string;
    last_used?: string;
    certification_url?: string;
    created_at: string;
    updated_at: string;
}

interface SkillsPageProps {
    skills: {
        data: Skill[];
        links: any[];
        meta: any;
    };
    filters: {
        search?: string;
        category?: string;
        type?: string;
        featured?: boolean;
        active?: boolean;
    };
    categories: Record<string, string>;
    types: Record<string, string>;
    masteryLevels: Record<string, string>;
    [key: string]: unknown;
}

export default function SkillsIndex() {
    const { t } = useTranslation();
    const { skills, filters, categories, types, masteryLevels } = usePage<SkillsPageProps>().props;
    const [showFilters, setShowFilters] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('sidebar.dashboard'), href: '/dashboard' },
        { title: t('sidebar.skills'), href: '/admin/skills' },
    ];

    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || 'all',
        type: filters.type || 'all',
        featured: filters.featured || false,
        active: filters.active || false,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get(route('admin.skills.index'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleFilterChange = (field: string, value: any) => {
        setData(field as any, value);
        const newData = { ...data, [field]: value };
        get(route('admin.skills.index', newData), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleFeatured = (skill: Skill) => {
        router.post(route('admin.skills.toggle-featured', skill.id));
    };

    const toggleActive = (skill: Skill) => {
        router.post(route('admin.skills.toggle-active', skill.id));
    };

    const deleteSkill = (skill: Skill) => {
        if (confirm(t('adminSkills.deleteConfirmation'))) {
            router.delete(route('admin.skills.destroy', skill.id));
        }
    };

    const getCategoryIcon = (category: string) => {
        const icons = {
            frontend: <Code className="w-4 h-4" />,
            backend: <Database className="w-4 h-4" />,
            database: <Database className="w-4 h-4" />,
            devops: <Cloud className="w-4 h-4" />,
            design: <Palette className="w-4 h-4" />,
            testing: <TestTube className="w-4 h-4" />,
            mobile: <Smartphone className="w-4 h-4" />,
            other: <SettingsIcon className="w-4 h-4" />,
        };
        return icons[category as keyof typeof icons] || <SettingsIcon className="w-4 h-4" />;
    };

    const getMasteryColor = (level: string) => {
        const colors = {
            beginner: 'bg-gray-100 text-gray-800',
            intermediate: 'bg-blue-100 text-blue-800',
            advanced: 'bg-green-100 text-green-800',
            expert: 'bg-purple-100 text-purple-800',
            master: 'bg-yellow-100 text-yellow-800',
        };
        return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('adminSkills.pageTitle')} >
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

            <div className="space-y-6 px-10 py-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('adminSkills.pageTitle')}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('adminSkills.pageDescription')}
                        </p>
                    </div>
                    <Link href={route('admin.skills.create')}>
                        <Button className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            {t('adminSkills.addNewSkill')}
                        </Button>
                    </Link>
                </div>

                {/* Search and Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <CardTitle className="text-lg">{t('adminSkills.searchFilter')}</CardTitle>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2"
                            >
                                <Filter className="w-4 h-4" />
                                {t('adminSkills.filters')}
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="flex gap-2">
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    placeholder={t('adminSkills.searchPlaceholder')}
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <Label className="text-sm font-medium">{t('adminSkills.category')}</Label>
                                        <Select 
                                            value={data.category} 
                                            onValueChange={(value) => handleFilterChange('category', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">{t('adminSkills.allCategories')}</SelectItem>
                                                {Object.entries(categories).map(([key, label]) => (
                                                    <SelectItem key={key} value={key}>{label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-sm font-medium">{t('adminSkills.type')}</Label>
                                        <Select 
                                            value={data.type} 
                                            onValueChange={(value) => handleFilterChange('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">{t('adminSkills.allTypes')}</SelectItem>
                                                {Object.entries(types).map(([key, label]) => (
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
                                        <Label htmlFor="featured">{t('adminSkills.showFeatured')}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-6">
                                        <Switch
                                            id="active"
                                            checked={data.active}
                                            onCheckedChange={(checked) => handleFilterChange('active', checked)}
                                        />
                                        <Label htmlFor="active">{t('adminSkills.showActive')}</Label>
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Skills Grid */}
                {skills.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Code className="w-12 h-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {t('adminSkills.noSkills')}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                {Object.values(filters).some(Boolean) 
                                    ? t('adminSkills.noSkillsDescription')
                                    : t('adminSkills.noSkillsDescription')}
                            </p>
                            <Link href={route('admin.skills.create')}>
                                <Button>{t('adminSkills.addNewSkill')}</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {skills.data.map((skill) => (
                            <Card key={skill.id} className="relative group hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-r ${skill.background_gradient || 'from-gray-400 to-gray-600'}`}
                                            >
                                                {skill.icon || '🔧'}
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg line-clamp-1">{skill.name}</CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {getCategoryIcon(skill.category)}
                                                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                                        {categories[skill.category]}
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
                                                    <Link href={route('admin.skills.show', skill.id)}>
                                                        <Eye className="w-4 h-4 mr-2" />
                                                        {t('adminSkills.view')}
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('admin.skills.edit', skill.id)}>
                                                        <Edit className="w-4 h-4 mr-2" />
                                                        {t('adminSkills.edit')}
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleFeatured(skill)}>
                                                    <Star className={`w-4 h-4 mr-2 ${skill.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                                    {t('adminSkills.toggleFeatured')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toggleActive(skill)}>
                                                    {skill.active ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                                                    {t('adminSkills.toggleActive')}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    onClick={() => deleteSkill(skill)}
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    {t('adminSkills.delete')}
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {skill.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {skill.description}
                                        </p>
                                    )}

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{t('adminSkills.proficiencyLevel')}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${skill.background_gradient || 'from-blue-400 to-blue-600'}`}
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className={getMasteryColor(skill.mastery_level)}>
                                            {masteryLevels[skill.mastery_level]}
                                        </Badge>
                                        <Badge variant="outline">
                                            {skill.years_experience} year{skill.years_experience !== 1 ? 's' : ''}
                                        </Badge>
                                        <Badge variant="outline" className="capitalize">
                                            {types[skill.type]}
                                        </Badge>
                                    </div>

                                    {/* Status Indicators */}
                                    <div className="flex items-center gap-4 pt-2 border-t">
                                        <div className="flex items-center gap-1">
                                            <Star className={`w-4 h-4 ${skill.featured ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {skill.featured ? t('adminSkills.featured') : 'Regular'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {skill.active ? (
                                                <Eye className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <EyeOff className="w-4 h-4 text-gray-400" />
                                            )}
                                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                                {skill.active ? t('adminSkills.active') : t('adminSkills.inactive')}
                                            </span>
                                        </div>
                                        <div className="ml-auto">
                                            <span className="text-xs text-gray-400">
                                                {t('adminSkills.priority')}: {skill.priority}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {skills.meta && skills.meta.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {skills.links.map((link, index) => (
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
