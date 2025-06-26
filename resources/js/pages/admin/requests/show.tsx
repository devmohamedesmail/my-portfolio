import React, { useState } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  MessageSquare,
  ExternalLink
} from 'lucide-react'

interface ProjectRequest {
  id: number
  name: string
  email: string
  phone: string
  project_idea: string
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

interface Props {
  request: ProjectRequest
}

export default function RequestShow({ request }: Props) {
  const { t } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)

  const { data, setData, patch, processing, errors } = useForm({
    status: request.status,
    notes: request.notes || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    patch(`/admin/requests/${request.id}`, {
      onSuccess: () => {
        setIsEditing(false)
      },
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: AlertCircle, text: t('requests.status.pending') },
      contacted: { variant: 'default' as const, icon: Mail, text: t('requests.status.contacted') },
      in_progress: { variant: 'default' as const, icon: Clock, text: t('requests.status.inProgress') },
      completed: { variant: 'default' as const, icon: CheckCircle, text: t('requests.status.completed') },
      cancelled: { variant: 'destructive' as const, icon: XCircle, text: t('requests.status.cancelled') },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <AppLayout>
      <Head title={`${t('requests.show.title')} - ${request.name}`} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/requests">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('common.back')}
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {t('requests.show.title')} #{request.id}
            </h1>
            <p className="text-muted-foreground">
              {t('requests.show.subtitle', { name: request.name })}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('requests.show.clientInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.form.name')}
                </Label>
                <p className="text-lg font-medium">{request.name}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.form.email')}
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`mailto:${request.email}`}
                    className="text-primary hover:underline"
                  >
                    {request.email}
                  </a>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.form.phone')}
                </Label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={`tel:${request.phone}`}
                    className="text-primary hover:underline"
                  >
                    {request.phone}
                  </a>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.show.submittedAt')}
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(request.created_at)}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.show.lastUpdated')}
                </Label>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(request.updated_at)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                {t('requests.show.projectInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.form.projectIdea')}
                </Label>
                <div className="mt-2 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {request.project_idea}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  {t('requests.show.currentStatus')}
                </Label>
                <div className="mt-2">
                  {getStatusBadge(request.status)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{t('requests.show.management')}</CardTitle>
                <CardDescription>
                  {t('requests.show.managementDescription')}
                </CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
                disabled={processing}
              >
                {isEditing ? t('common.cancel') : t('common.edit')}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="status">{t('requests.form.status')}</Label>
                  <Select value={data.status} onValueChange={(value: any) => setData('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">{t('requests.status.pending')}</SelectItem>
                      <SelectItem value="contacted">{t('requests.status.contacted')}</SelectItem>
                      <SelectItem value="in_progress">{t('requests.status.inProgress')}</SelectItem>
                      <SelectItem value="completed">{t('requests.status.completed')}</SelectItem>
                      <SelectItem value="cancelled">{t('requests.status.cancelled')}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="notes">{t('requests.form.notes')}</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder={t('requests.form.notesPlaceholder')}
                    className="mt-1 min-h-[100px]"
                  />
                  {errors.notes && (
                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                  )}
                </div>

                <Button type="submit" disabled={processing}>
                  <Save className="h-4 w-4 mr-2" />
                  {processing ? t('common.saving') : t('common.save')}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    {t('requests.form.status')}
                  </Label>
                  <div className="mt-2">
                    {getStatusBadge(request.status)}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    {t('requests.form.notes')}
                  </Label>
                  <div className="mt-2 p-4 bg-muted/50 rounded-lg min-h-[100px]">
                    {request.notes ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {request.notes}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        {t('requests.show.noNotes')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
