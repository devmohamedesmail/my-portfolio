import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, Archive, Download, FileText, Key, File, Calendar, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthenticatedLayout from '@/layouts/app-layout';

interface Import {
    id: number;
    title: string;
    description: string;
    type: string;
    content: string;
    file_path: string;
    file_name: string;
    file_type: string;
    file_size: number;
    metadata: any;
    created_at: string;
    updated_at: string;
}

interface Props {
    import: Import;
}

export default function ImportsShow({ import: importItem }: Props) {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (confirm(t('common.confirmDelete'))) {
            router.delete(`/admin/imports/${importItem.id}`, {
                onSuccess: () => router.visit('/admin/imports'),
            });
        }
    };

    const getTypeBadge = (type: string) => {
        const typeMap = {
            credential: { label: t('imports.types.credential'), variant: 'default' as const, icon: Key },
            file: { label: t('imports.types.file'), variant: 'secondary' as const, icon: File },
            document: { label: t('imports.types.document'), variant: 'outline' as const, icon: FileText },
            other: { label: t('imports.types.other'), variant: 'secondary' as const, icon: Archive },
        };
        
        const typeInfo = typeMap[type as keyof typeof typeMap] || typeMap.other;
        const IconComponent = typeInfo.icon;
        
        return (
            <Badge variant={typeInfo.variant} className="flex items-center gap-1">
                <IconComponent className="h-3 w-3" />
                {typeInfo.label}
            </Badge>
        );
    };

    const formatFileSize = (bytes: number) => {
        if (!bytes) return '-';
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${importItem.title} - ${t('imports.title')}`} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/imports">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Archive className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{importItem.title}</h1>
                                <p className="text-muted-foreground">{t('imports.viewDetails')}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" asChild>
                                <Link href={`/admin/imports/${importItem.id}/edit`}>
                                    <Edit className="mr-2 h-4 w-4" />
                                    {t('common.edit')}
                                </Link>
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t('common.delete')}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Information */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('imports.basicInformation')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Archive className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('imports.fields.title')}</p>
                                                <p className="text-sm text-muted-foreground">{importItem.title}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <div className="h-5 w-5 flex items-center justify-center">
                                                {getTypeBadge(importItem.type)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{t('imports.fields.type')}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {importItem.description && (
                                        <div>
                                            <p className="text-sm font-medium mb-1">{t('imports.fields.description')}</p>
                                            <p className="text-sm text-muted-foreground">{importItem.description}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Content */}
                            {importItem.content && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('imports.fields.content')}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                                                {importItem.content}
                                            </pre>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* File Information */}
                            {importItem.file_path && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('imports.fileInformation')}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 rounded">
                                                    <File className="h-6 w-6 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{importItem.file_name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatFileSize(importItem.file_size)} • {importItem.file_type}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={importItem.file_path} target="_blank" rel="noopener noreferrer">
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        {t('common.view')}
                                                    </a>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <a href={importItem.file_path} download>
                                                        <Download className="mr-2 h-4 w-4" />
                                                        {t('common.download')}
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('common.quickActions')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/admin/imports/${importItem.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            {t('common.edit')}
                                        </Link>
                                    </Button>
                                    {importItem.file_path && (
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={importItem.file_path} download>
                                                <Download className="mr-2 h-4 w-4" />
                                                {t('common.download')}
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="destructive" className="w-full" onClick={handleDelete}>
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        {t('common.delete')}
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Metadata */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('common.metadata')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('common.createdAt')}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(importItem.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{t('common.updatedAt')}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(importItem.updated_at).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
