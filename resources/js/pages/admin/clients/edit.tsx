import { FormEventHandler } from 'react';
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
import { ArrowLeft, UserCheck } from 'lucide-react';
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
}

interface Props {
    client: Client;
}

export default function ClientsEdit({ client }: Props) {
    const { t } = useTranslation();
    
    const { data, setData, put, processing, errors } = useForm({
        name: client.name || '',
        phone: client.phone || '',
        email: client.email || '',
        service: client.service || '',
        service_start_date: client.service_start_date || '',
        service_end_date: client.service_end_date || '',
        budget: client.budget?.toString() || '',
        description: client.description || '',
        status: client.status || 'active',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/clients/${client.id}`);
    };

    return (
        <AuthenticatedLayout>
            <Head title={t('clients.edit')} />

            <div className="container mx-auto py-6">
                <div className="flex flex-col space-y-6 px-5">
                    {/* Header */}
                    <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/clients">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <UserCheck className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{t('clients.edit')}</h1>
                            <p className="text-muted-foreground">{t('clients.editDescription')}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('clients.clientDetails')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t('clients.name')} *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder={t('clients.name')}
                                            className={errors.name ? 'border-destructive' : ''}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-destructive">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">{t('clients.phone')}</Label>
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder={t('clients.phone')}
                                            className={errors.phone ? 'border-destructive' : ''}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-destructive">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t('clients.email')}</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder={t('clients.email')}
                                            className={errors.email ? 'border-destructive' : ''}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-destructive">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Service */}
                                    <div className="space-y-2">
                                        <Label htmlFor="service">{t('clients.service')} *</Label>
                                        <Input
                                            id="service"
                                            value={data.service}
                                            onChange={(e) => setData('service', e.target.value)}
                                            placeholder={t('clients.service')}
                                            className={errors.service ? 'border-destructive' : ''}
                                        />
                                        {errors.service && (
                                            <p className="text-sm text-destructive">{errors.service}</p>
                                        )}
                                    </div>

                                    {/* Service Start Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="service_start_date">{t('clients.serviceStartDate')} *</Label>
                                        <Input
                                            id="service_start_date"
                                            type="date"
                                            value={data.service_start_date}
                                            onChange={(e) => setData('service_start_date', e.target.value)}
                                            className={errors.service_start_date ? 'border-destructive' : ''}
                                        />
                                        {errors.service_start_date && (
                                            <p className="text-sm text-destructive">{errors.service_start_date}</p>
                                        )}
                                    </div>

                                    {/* Service End Date */}
                                    <div className="space-y-2">
                                        <Label htmlFor="service_end_date">{t('clients.serviceEndDate')} *</Label>
                                        <Input
                                            id="service_end_date"
                                            type="date"
                                            value={data.service_end_date}
                                            onChange={(e) => setData('service_end_date', e.target.value)}
                                            className={errors.service_end_date ? 'border-destructive' : ''}
                                        />
                                        {errors.service_end_date && (
                                            <p className="text-sm text-destructive">{errors.service_end_date}</p>
                                        )}
                                    </div>

                                    {/* Budget */}
                                    <div className="space-y-2">
                                        <Label htmlFor="budget">{t('clients.budget')}</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            step="0.01"
                                            value={data.budget}
                                            onChange={(e) => setData('budget', e.target.value)}
                                            placeholder={t('clients.placeholders.budget')}
                                            className={errors.budget ? 'border-destructive' : ''}
                                        />
                                        {errors.budget && (
                                            <p className="text-sm text-destructive">{errors.budget}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status">{t('clients.fields.status')}</Label>
                                        <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                            <SelectTrigger className={errors.status ? 'border-destructive' : ''}>
                                                <SelectValue placeholder={t('clients.placeholders.status')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">{t('clients.active')}</SelectItem>
                                                <SelectItem value="inactive">{t('clients.inactive')}</SelectItem>
                                                <SelectItem value="completed">{t('clients.completed')}</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && (
                                            <p className="text-sm text-destructive">{errors.status}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">{t('clients.description')}</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder={t('clients.description')}
                                        rows={4}
                                        className={errors.description ? 'border-destructive' : ''}
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-destructive">{errors.description}</p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end space-x-2">
                                    <Button variant="outline" asChild>
                                        <Link href="/admin/clients">{t('common.cancel')}</Link>
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? t('common.updating') : t('common.update')}
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
