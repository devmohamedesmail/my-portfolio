import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  MessageSquare,
  Search,
  MoreVertical,
  Eye,
  Mail,
  Phone,
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter
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
  requests?: {
    data?: ProjectRequest[]
    links?: any
    meta?: any
  }
  filters?: {
    search?: string
    status?: string
  }
}

export default function RequestsIndex({ requests, filters }: Props) {
  const { t } = useTranslation()
  const [search, setSearch] = useState(filters?.search || '')
  const [statusFilter, setStatusFilter] = useState(filters?.status || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.get('/admin/requests', { search, status: statusFilter }, { preserveState: true })
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
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <AppLayout>
      <Head title={t('requests.title')} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('requests.title')}</h1>
            <p className="text-muted-foreground">
              {t('requests.subtitle')}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('requests.stats.total')}</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{requests?.meta?.total || requests?.data?.length || 0}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('requests.stats.pending')}</CardTitle>
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests?.data?.filter(r => r.status === 'pending').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('requests.stats.inProgress')}</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests?.data?.filter(r => r.status === 'in_progress').length || 0}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{t('requests.stats.completed')}</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requests?.data?.filter(r => r.status === 'completed').length || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('requests.filters.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="search" className="text-sm font-medium">
                  {t('requests.filters.search')}
                </label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t('requests.filters.searchPlaceholder')}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="w-48">
                <label htmlFor="status" className="text-sm font-medium">
                  {t('requests.filters.status')}
                </label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">{t('requests.filters.allStatuses')}</option>
                  <option value="pending">{t('requests.status.pending')}</option>
                  <option value="contacted">{t('requests.status.contacted')}</option>
                  <option value="in_progress">{t('requests.status.inProgress')}</option>
                  <option value="completed">{t('requests.status.completed')}</option>
                  <option value="cancelled">{t('requests.status.cancelled')}</option>
                </select>
              </div>

              <Button type="submit">
                <Filter className="h-4 w-4 mr-2" />
                {t('requests.filters.apply')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>{t('requests.table.title')}</CardTitle>
            <CardDescription>
              {t('requests.table.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(requests?.data?.length || 0) > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('requests.table.client')}</TableHead>
                      <TableHead>{t('requests.table.contact')}</TableHead>
                      <TableHead>{t('requests.table.project')}</TableHead>
                      <TableHead>{t('requests.table.status')}</TableHead>
                      <TableHead>{t('requests.table.date')}</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(requests?.data || []).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{request.name}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{request.email}</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              <span>{request.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            <p className="text-sm text-muted-foreground">
                              {truncateText(request.project_idea)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(request.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(request.created_at)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/requests/${request.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t('requests.actions.view')}
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">{t('requests.empty.title')}</h3>
                <p className="text-muted-foreground">{t('requests.empty.description')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
