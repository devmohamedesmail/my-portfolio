import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit, Star, Eye, EyeOff, Trash2, ExternalLink, Calendar, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
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

interface ShowSkillProps {
    skill: Skill;
}

export default function ShowSkill({ skill }: ShowSkillProps) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('sidebar.dashboard'), href: '/dashboard' },
        { title: t('sidebar.skills'), href: '/admin/skills' },
        { title: skill.name, href: route('admin.skills.show', skill.id) },
    ];

    const toggleFeatured = () => {
        router.post(route('admin.skills.toggle-featured', skill.id));
    };

    const toggleActive = () => {
        router.post(route('admin.skills.toggle-active', skill.id));
    };

    const deleteSkill = () => {
        if (confirm(t('adminSkills.deleteConfirmation'))) {
            router.delete(route('admin.skills.destroy', skill.id), {
                onSuccess: () => router.visit(route('admin.skills.index')),
            });
        }
    };

    const getMasteryColor = (level: string) => {
        const colors = {
            beginner: 'bg-gray-100 text-gray-800 border-gray-300',
            intermediate: 'bg-blue-100 text-blue-800 border-blue-300',
            advanced: 'bg-green-100 text-green-800 border-green-300',
            expert: 'bg-purple-100 text-purple-800 border-purple-300',
            master: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        };
        return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return t('adminSkills.notSpecified');
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={skill.name} >
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

            <div className=" space-y-6 p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div 
                            className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl bg-gradient-to-r ${skill.background_gradient || 'from-gray-400 to-gray-600'}`}
                        >
                            {skill.icon || '🔧'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{skill.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1 capitalize">
                                {skill.category.replace('_', ' ')} • {skill.type.replace('_', ' ')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={route('admin.skills.index')}>
                            <Button variant="outline" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                {t('adminSkills.backToSkills')}
                            </Button>
                        </Link>
                        <Link href={route('admin.skills.edit', skill.id)}>
                            <Button className="flex items-center gap-2">
                                <Edit className="w-4 h-4" />
                                {t('adminSkills.edit')}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Status Alerts */}
                {!skill.active && (
                    <Alert className="border-orange-200 bg-orange-50">
                        <EyeOff className="h-4 w-4" />
                        <AlertDescription>
                            {t('adminSkills.inactiveWarning')}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Description */}
                        {skill.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminSkills.description')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {skill.description}
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Proficiency */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('adminSkills.proficiencyExperience')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Progress Bar */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">{t('adminSkills.level')}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full bg-gradient-to-r ${skill.background_gradient || 'from-blue-400 to-blue-600'}`}
                                            style={{ width: `${skill.level}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {skill.years_experience}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {t('adminSkills.yearsOfExperience')}
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {skill.level}%
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {t('adminSkills.proficiencyLevel')}
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {skill.priority}
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {t('adminSkills.priority')}
                                        </div>
                                    </div>
                                </div>

                                {/* Mastery Level */}
                                <div>
                                    <Label className="text-sm font-medium mb-2 block">{t('adminSkills.masteryLevel')}</Label>
                                    <Badge className={`${getMasteryColor(skill.mastery_level)} text-base px-3 py-1`}>
                                        {skill.mastery_level.charAt(0).toUpperCase() + skill.mastery_level.slice(1)}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Dates & Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('adminSkills.dates')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-green-500" />
                                        <div>
                                            <div className="text-sm font-medium">{t('adminSkills.firstLearned')}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(skill.first_learned)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <div className="text-sm font-medium">{t('adminSkills.lastUsed')}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {formatDate(skill.last_used)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Certification */}
                        {skill.certification_url && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('adminSkills.certification')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <a
                                        href={skill.certification_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {t('adminSkills.viewCertificate')}
                                    </a>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('adminSkills.quickActions')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleFeatured}
                                    className="w-full justify-start"
                                >
                                    <Star className={`w-4 h-4 mr-2 ${skill.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                                    {skill.featured ? t('adminSkills.removeFeatured') : t('adminSkills.addFeatured')}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={toggleActive}
                                    className="w-full justify-start"
                                >
                                    {skill.active ? (
                                        <>
                                            <EyeOff className="w-4 h-4 mr-2" />
                                            {t('adminSkills.deactivate')}
                                        </>
                                    ) : (
                                        <>
                                            <Eye className="w-4 h-4 mr-2" />
                                            {t('adminSkills.activate')}
                                        </>
                                    )}
                                </Button>
                                <Separator />
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={deleteSkill}
                                    className="w-full justify-start"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    {t('adminSkills.deleteSkill')}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Status Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('adminSkills.managementOptions')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{t('adminSkills.featured')}</span>
                                    <Badge variant={skill.featured ? 'default' : 'secondary'}>
                                        {skill.featured ? t('common.yes') : t('common.no')}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{t('adminSkills.active')}</span>
                                    <Badge variant={skill.active ? 'default' : 'secondary'}>
                                        {skill.active ? t('common.yes') : t('common.no')}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{t('adminSkills.category')}</span>
                                    <Badge variant="outline" className="capitalize">
                                        {skill.category.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{t('adminSkills.type')}</span>
                                    <Badge variant="outline" className="capitalize">
                                        {skill.type.replace('_', ' ')}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Meta Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{t('common.metadata')}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div>
                                    <span className="font-medium">{t('common.createdAt')}:</span>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        {formatDate(skill.created_at)}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium">{t('common.updatedAt')}:</span>
                                    <div className="text-gray-600 dark:text-gray-400">
                                        {formatDate(skill.updated_at)}
                                    </div>
                                </div>
                                <div>
                                    <span className="font-medium">Slug:</span>
                                    <div className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                                        {skill.slug}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Helper component for labels
function Label({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    return <label className={`text-sm font-medium ${className}`}>{children}</label>;
}
