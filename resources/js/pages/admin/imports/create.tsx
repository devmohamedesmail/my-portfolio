import { FormEventHandler, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Archive, Upload, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthenticatedLayout from '@/layouts/app-layout';

export default function ImportsCreate() {
    const { t } = useTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: 'other',
        content: '',
        file: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/imports');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setData('file', file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setData('file', null);
    };

    const formatFileSize = (bytes: number) => {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <AuthenticatedLayout>
            <Head title={t('imports.create')} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/imports">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Archive className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t('imports.create')}</h1>
                            <p className="text-muted-foreground">{t('imports.createDescription')}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('imports.itemDetails')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">{t('imports.fields.title')} *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder={t('imports.placeholders.title')}
                                            className={errors.title ? 'border-destructive' : ''}
                                        />
                                        {errors.title && (
                                            <p className="text-sm text-destructive">{errors.title}</p>
                                        )}
                                    </div>

                                    {/* Type */}
                                    <div className="space-y-2">
                                        <Label htmlFor="type">{t('imports.fields.type')} *</Label>
                                        <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                            <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                                                <SelectValue placeholder={t('imports.placeholders.type')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="credential">{t('imports.types.credential')}</SelectItem>
                                                <SelectItem value="file">{t('imports.types.file')}</SelectItem>
                                                <SelectItem value="document">{t('imports.types.document')}</SelectItem>
                                                <SelectItem value="other">{t('imports.types.other')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && (
                                            <p className="text-sm text-destructive">{errors.type}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">{t('imports.fields.description')}</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder={t('imports.placeholders.description')}
                                        rows={3}
                                        className={errors.description ? 'border-destructive' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="space-y-2">
                                    <Label htmlFor="content">{t('imports.fields.content')}</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder={t('imports.placeholders.content')}
                                        rows={6}
                                        className={errors.content ? 'border-destructive' : ''}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        {t('imports.contentHelp')}
                                    </p>
                                    {errors.content && (
                                        <p className="text-sm text-destructive">{errors.content}</p>
                                    )}
                                </div>

                                {/* File Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="file">{t('imports.fields.file')}</Label>
                                    {!selectedFile ? (
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <div className="mt-2">
                                                <Label htmlFor="file" className="cursor-pointer">
                                                    <span className="text-sm font-medium text-primary hover:text-primary/80">
                                                        {t('imports.uploadFile')}
                                                    </span>
                                                    <Input
                                                        id="file"
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </Label>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {t('imports.uploadHelp')}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="border rounded-lg p-4 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 flex items-center justify-center bg-primary/10 rounded">
                                                        <Upload className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">{selectedFile.name}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {formatFileSize(selectedFile.size)} • {selectedFile.type}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={removeFile}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {errors.file && (
                                        <p className="text-sm text-destructive">{errors.file}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end space-x-2">
                                    <Button variant="outline" asChild>
                                        <Link href="/admin/imports">{t('common.cancel')}</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? t('common.saving') : t('common.save')}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
