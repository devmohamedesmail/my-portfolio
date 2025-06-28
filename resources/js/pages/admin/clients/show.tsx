import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, UserCheck, Phone, Mail, Calendar, DollarSign } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthenticatedLayout from '@/layouts/app-layout';

interface Client {
    id: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    service_start_date: string;
    service_end_date: string;
    budget: number;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    client: Client;
}

export default function ClientsShow({ client }: Props) {
    const { t } = useTranslation();

    const handleDelete = () => {
        if (confirm(t('common.confirmDelete'))) {
            router.delete(`/admin/clients/${client.id}`, {
                onSuccess: () => router.visit('/admin/clients'),
            });
        }
    };

    const getStatusBadge = (status: string) => {
        const statusMap = {
            active: { label: t('clients.status.active'), variant: 'default' as const },
            inactive: { label: t('clients.status.inactive'), variant: 'secondary' as const },
            completed: { label: t('clients.status.completed'), variant: 'outline' as const },
        };
        
        const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.active;
        return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
    };

    return (
        <AuthenticatedLayout>
            <Head title={`${client.name} - ${t('clients.title')}`} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col space-y-6 px-5">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/admin/clients">
                                    <ArrowLeft className="h-4 w-4" />
                                </Link>
                            </Button>
                            <UserCheck className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
                                <p className="text-muted-foreground">{t('clients.viewDetails')}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" asChild>
                                <Link href={`/admin/clients/${client.id}/edit`}>
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
                                    <CardTitle>{t('clients.basicInformation')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <UserCheck className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('clients.name')}</p>
                                                <p className="text-sm text-muted-foreground">{client.name}</p>
                                            </div>
                                        </div>
                                        
                                        {client.phone && (
                                            <div className="flex items-center space-x-3">
                                                <Phone className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">{t('clients.phone')}</p>
                                                    <p className="text-sm text-muted-foreground">{client.phone}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {client.email && (
                                            <div className="flex items-center space-x-3">
                                                <Mail className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">{t('clients.email')}</p>
                                                    <p className="text-sm text-muted-foreground">{client.email}</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        <div className="flex items-center space-x-3">
                                            <div className="h-5 w-5 flex items-center justify-center">
                                                {getStatusBadge(client.status)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{t('clients.status')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Service Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t('clients.serviceInformation')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium mb-1">{t('clients.service')}</p>
                                        <p className="text-sm text-muted-foreground">{client.service}</p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('clients.serviceStartDate')}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(client.service_start_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center space-x-3">
                                            <Calendar className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('clients.serviceEndDate')}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {new Date(client.service_end_date).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {client.budget && (
                                        <div className="flex items-center space-x-3">
                                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm font-medium">{t('clients.budget')}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    ${client.budget.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Description */}
                            {client.description && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{t('clients.description')}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                            {client.description}
                                        </p>
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
                                        <Link href={`/admin/clients/${client.id}/edit`}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            {t('common.edit')}
                                        </Link>
                                    </Button>
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
                                    <div>
                                        <p className="text-sm font-medium">{t('common.createdAt')}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(client.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{t('common.updatedAt')}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(client.updated_at).toLocaleString()}
                                        </p>
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
