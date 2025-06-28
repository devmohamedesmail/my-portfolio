import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Archive, Download, FileText, Key, File } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthenticatedLayout from '@/layouts/app-layout';

interface Import {
    id: number;
    title: string;
    description: string;
    type: 'credential' | 'file' | 'document' | 'other';
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
    imports: {
        data: Import[];
        links: any[];
        meta: any;
    };
}

export default function ImportsIndex({ imports }: Props) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm(t('common.confirmDelete'))) {
            router.delete(`/admin/imports/${id}`);
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

    const filteredImports = imports.data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title={t('imports.title')} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Archive className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{t('imports.title')}</h1>
                                <p className="text-muted-foreground">{t('imports.description')}</p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/admin/imports/create">
                                <Plus className="mr-2 h-4 w-4" />
                                {t('imports.addNew')}
                            </Link>
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t('imports.searchPlaceholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Imports Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('imports.list')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('imports.fields.title')}</TableHead>
                                        <TableHead>{t('imports.fields.type')}</TableHead>
                                        <TableHead>{t('imports.fields.file')}</TableHead>
                                        <TableHead>{t('imports.fields.size')}</TableHead>
                                        <TableHead>{t('common.createdAt')}</TableHead>
                                        <TableHead className="text-right">{t('common.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredImports.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{item.title}</div>
                                                    {item.description && (
                                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getTypeBadge(item.type)}</TableCell>
                                            <TableCell>
                                                {item.file_name ? (
                                                    <div className="space-y-1">
                                                        <div className="text-sm font-medium">{item.file_name}</div>
                                                        {item.file_type && (
                                                            <div className="text-xs text-muted-foreground">{item.file_type}</div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-muted-foreground">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>{formatFileSize(item.file_size)}</TableCell>
                                            <TableCell>
                                                {new Date(item.created_at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/imports/${item.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('common.view')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/imports/${item.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                {t('common.edit')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        {item.file_path && (
                                                            <DropdownMenuItem asChild>
                                                                <a href={`/storage/${item.file_path}`} download>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    {t('common.download')}
                                                                </a>
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDelete(item.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            {t('common.delete')}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
