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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, UserCheck } from 'lucide-react';
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
    status: 'active' | 'inactive' | 'completed';
    created_at: string;
    updated_at: string;
}

interface Props {
    clients: {
        data: Client[];
        links: any[];
        meta: any;
    };
}

export default function ClientsIndex({ clients }: Props) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id: number) => {
        if (confirm(t('common.confirmDelete'))) {
            router.delete(`/admin/clients/${id}`);
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

    const filteredClients = clients.data.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title={t('clients.title')} />

            <div className="container mx-auto py-6 px-5">
                <div className="flex flex-col space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <UserCheck className="h-8 w-8 text-primary" />
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">{t('clients.title')}</h1>
                                <p className="text-muted-foreground">{t('clients.description-page')}</p>
                            </div>
                        </div>
                        <Button asChild>
                            <Link href="/admin/clients/create">
                                <Plus className="mr-2 h-4 w-4" />
                                {t('clients.addNew')}
                            </Link>
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center space-x-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder={t('clients.searchPlaceholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="max-w-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Clients Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('clients.list')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('clients.name')}</TableHead>
                                        <TableHead>{t('clients.contact')}</TableHead>
                                        <TableHead>{t('clients.service')}</TableHead>
                                        <TableHead>{t('clients.duration')}</TableHead>
                                        <TableHead>{t('clients.budget')}</TableHead>
                                        <TableHead>{t('clients.status')}</TableHead>
                                        <TableHead className="text-right">{t('common.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredClients.map((client) => (
                                        <TableRow key={client.id}>
                                            <TableCell className="font-medium">{client.name}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    {client.email && (
                                                        <div className="text-sm">{client.email}</div>
                                                    )}
                                                    {client.phone && (
                                                        <div className="text-sm text-muted-foreground">{client.phone}</div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{client.service}</TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    {new Date(client.service_start_date).toLocaleDateString()} - {new Date(client.service_end_date).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {client.budget ? `$${client.budget.toLocaleString()}` : '-'}
                                            </TableCell>
                                            <TableCell>{getStatusBadge(client.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/clients/${client.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                {t('common.view')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/clients/${client.id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                {t('common.edit')}
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-destructive"
                                                            onClick={() => handleDelete(client.id)}
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
