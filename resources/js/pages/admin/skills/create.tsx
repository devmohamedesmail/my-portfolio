import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbItem } from '@/types';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreateSkillProps {
    categories: Record<string, string>;
    types: Record<string, string>;
    masteryLevels: Record<string, string>;
}

export default function CreateSkill({ categories, types, masteryLevels }: CreateSkillProps) {
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('sidebar.dashboard'), href: '/dashboard' },
        { title: t('sidebar.skills'), href: '/admin/skills' },
        { title: t('adminSkills.createNewSkill'), href: '/admin/skills/create' },
    ];
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        icon: '',
        image: null as File | null,
        color: '#3B82F6',
        background_gradient: 'from-blue-400 to-blue-600',
        level: 0,
        mastery_level: 'beginner',
        years_experience: 0,
        category: 'frontend',
        type: 'framework',
        featured: false as boolean,
        priority: 5,
        active: true as boolean,
        first_learned: '',
        last_used: '',
        certification_url: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.skills.store'), {
            onSuccess: () => reset(),
            forceFormData: true,
        });
    };

    const gradientOptions = [
        { value: 'from-blue-400 to-blue-600', label: 'Blue', preview: 'bg-gradient-to-r from-blue-400 to-blue-600' },
        { value: 'from-purple-400 to-purple-600', label: 'Purple', preview: 'bg-gradient-to-r from-purple-400 to-purple-600' },
        { value: 'from-green-400 to-green-600', label: 'Green', preview: 'bg-gradient-to-r from-green-400 to-green-600' },
        { value: 'from-red-400 to-red-600', label: 'Red', preview: 'bg-gradient-to-r from-red-400 to-red-600' },
        { value: 'from-yellow-400 to-yellow-600', label: 'Yellow', preview: 'bg-gradient-to-r from-yellow-400 to-yellow-600' },
        { value: 'from-indigo-400 to-indigo-600', label: 'Indigo', preview: 'bg-gradient-to-r from-indigo-400 to-indigo-600' },
        { value: 'from-pink-400 to-pink-600', label: 'Pink', preview: 'bg-gradient-to-r from-pink-400 to-pink-600' },
        { value: 'from-cyan-400 to-cyan-600', label: 'Cyan', preview: 'bg-gradient-to-r from-cyan-400 to-cyan-600' },
        { value: 'from-orange-400 to-orange-600', label: 'Orange', preview: 'bg-gradient-to-r from-orange-400 to-orange-600' },
        { value: 'from-gray-400 to-gray-600', label: 'Gray', preview: 'bg-gradient-to-r from-gray-400 to-gray-600' },
    ];

    const emojiOptions = [
        '⚛️', '📘', '🎯', '🟢', '🗄️', '🐳', '📝', '☁️', '🎨', '🔧', '💻', '📱', '🌐', '🛡️', '🚀', '⚡', '🔥', '💎', '🎮', '📊'
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('skills.createNewSkill')} >


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

            <div className=" space-y-6 px-10 py-10">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('adminSkills.createNewSkill')}</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {t('adminSkills.addTechnicalSkill')}
                        </p>
                    </div>
                    <Link href={route('admin.skills.index')}>
                        <Button variant="outline" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            {t('adminSkills.backToSkills')}
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('adminSkills.basicInformation')}</CardTitle>
                            <CardDescription>
                                {t('adminSkills.basicInformationDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="name">{t('adminSkills.name')} *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder={t('adminSkills.namePlaceholder')}
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="category">{t('adminSkills.category')} *</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categories).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && (
                                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="description">{t('adminSkills.description')}</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder={t('adminSkills.descriptionPlaceholder')}
                                    rows={3}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Visual Elements */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('adminSkills.visualElements')}</CardTitle>
                            <CardDescription>
                                {t('adminSkills.visualElementsDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="icon">{t('adminSkills.icon')}</Label>
                                    <div className="space-y-2">
                                        <Input
                                            id="icon"
                                            type="text"
                                            value={data.icon}
                                            onChange={(e) => setData('icon', e.target.value)}
                                            placeholder={t('adminSkills.iconPlaceholder')}
                                            className={errors.icon ? 'border-red-500' : ''}
                                        />
                                        <div className="flex flex-wrap gap-1">
                                            {emojiOptions.map((emoji) => (
                                                <Button
                                                    key={emoji}
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setData('icon', emoji)}
                                                    className="text-lg p-2 w-10 h-10"
                                                >
                                                    {emoji}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    {errors.icon && (
                                        <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="color">{t('adminSkills.color')}</Label>
                                    <Input
                                        id="color"
                                        type="color"
                                        value={data.color}
                                        onChange={(e) => setData('color', e.target.value)}
                                        className="h-10"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="image">{t('adminSkills.imageUpload')}</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setData('image', file);
                                            }
                                        }}
                                        className={errors.image ? 'border-red-500' : ''}
                                    />
                                    {errors.image && (
                                        <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label>{t('adminSkills.backgroundGradient')}</Label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-2">
                                    {gradientOptions.map((gradient) => (
                                        <Button
                                            key={gradient.value}
                                            type="button"
                                            variant={data.background_gradient === gradient.value ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => setData('background_gradient', gradient.value)}
                                            className="relative overflow-hidden"
                                        >
                                            <div className={`absolute inset-0 ${gradient.preview} opacity-30`} />
                                            <span className="relative z-10">{gradient.label}</span>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Preview */}
                            <div>
                                <Label>{t('adminSkills.preview')}</Label>
                                <div className="mt-2 p-4 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-gradient-to-r ${data.background_gradient}`}
                                        >
                                            {data.icon || '🔧'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">{data.name || 'Skill Name'}</h3>
                                            <p className="text-sm text-gray-600">{categories[data.category]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Skill Level & Experience */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('adminSkills.skillLevelExperience')}</CardTitle>
                            <CardDescription>
                                {t('adminSkills.skillLevelExperienceDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="level">{t('adminSkills.proficiencyLevel')} *</Label>
                                    <Input
                                        id="level"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.level}
                                        onChange={(e) => setData('level', parseInt(e.target.value) || 0)}
                                        className={errors.level ? 'border-red-500' : ''}
                                    />
                                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full bg-gradient-to-r ${data.background_gradient}`}
                                            style={{ width: `${data.level}%` }}
                                        />
                                    </div>
                                    {errors.level && (
                                        <p className="text-red-500 text-sm mt-1">{errors.level}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="mastery_level">{t('adminSkills.masteryLevel')} *</Label>
                                    <Select value={data.mastery_level} onValueChange={(value) => setData('mastery_level', value)}>
                                        <SelectTrigger className={errors.mastery_level ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(masteryLevels).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.mastery_level && (
                                        <p className="text-red-500 text-sm mt-1">{errors.mastery_level}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="years_experience">{t('adminSkills.yearsExperience')} *</Label>
                                    <Input
                                        id="years_experience"
                                        type="number"
                                        min="0"
                                        max="50"
                                        value={data.years_experience}
                                        onChange={(e) => setData('years_experience', parseInt(e.target.value) || 0)}
                                        className={errors.years_experience ? 'border-red-500' : ''}
                                    />
                                    {errors.years_experience && (
                                        <p className="text-red-500 text-sm mt-1">{errors.years_experience}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('adminSkills.additionalSettings')}</CardTitle>
                            <CardDescription>
                                {t('adminSkills.additionalSettingsDesc')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="type">{t('adminSkills.type')} *</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(types).map(([key, label]) => (
                                                <SelectItem key={key} value={key}>{label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="priority">{t('adminSkills.priority')} *</Label>
                                    <Input
                                        id="priority"
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={data.priority}
                                        onChange={(e) => setData('priority', parseInt(e.target.value) || 0)}
                                        className={errors.priority ? 'border-red-500' : ''}
                                    />
                                    {errors.priority && (
                                        <p className="text-red-500 text-sm mt-1">{errors.priority}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="first_learned">{t('adminSkills.firstLearned')}</Label>
                                    <Input
                                        id="first_learned"
                                        type="date"
                                        value={data.first_learned}
                                        onChange={(e) => setData('first_learned', e.target.value)}
                                        className={errors.first_learned ? 'border-red-500' : ''}
                                    />
                                    {errors.first_learned && (
                                        <p className="text-red-500 text-sm mt-1">{errors.first_learned}</p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="last_used">{t('adminSkills.lastUsed')}</Label>
                                    <Input
                                        id="last_used"
                                        type="date"
                                        value={data.last_used}
                                        onChange={(e) => setData('last_used', e.target.value)}
                                        className={errors.last_used ? 'border-red-500' : ''}
                                    />
                                    {errors.last_used && (
                                        <p className="text-red-500 text-sm mt-1">{errors.last_used}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="certification_url">{t('adminSkills.certificationUrl')}</Label>
                                <Input
                                    id="certification_url"
                                    type="url"
                                    value={data.certification_url}
                                    onChange={(e) => setData('certification_url', e.target.value)}
                                    placeholder={t('adminSkills.certificationUrlPlaceholder')}
                                    className={errors.certification_url ? 'border-red-500' : ''}
                                />
                                {errors.certification_url && (
                                    <p className="text-red-500 text-sm mt-1">{errors.certification_url}</p>
                                )}
                            </div>

                            <Separator />

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="featured"
                                        checked={data.featured}
                                        onCheckedChange={(checked) => setData('featured', checked as boolean)}
                                    />
                                    <Label htmlFor="featured">{t('adminSkills.featuredHomepage')}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="active"
                                        checked={data.active}
                                        onCheckedChange={(checked) => setData('active', checked as boolean)}
                                    />
                                    <Label htmlFor="active">{t('adminSkills.activeVisible')}</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3">
                        <Link href={route('admin.skills.index')}>
                            <Button type="button" variant="outline">
                                <X className="w-4 h-4 mr-2" />
                                {t('adminSkills.cancel')}
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="w-4 h-4 mr-2" />
                            {processing ? t('adminSkills.creating') : t('adminSkills.createSkill')}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
