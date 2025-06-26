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
  Globe,
  Search,
  Eye,
  Trash2,
  Calendar,
  Monitor,
  Smartphone,
  Tablet,
  Users,
  MapPin,
  Clock,
  Filter
} from 'lucide-react'

interface Visitor {
  id: number
  ip_address: string
  user_agent?: string
  country?: string
  city?: string
  browser?: string
  device?: string
  operating_system?: string
  referrer?: string
  visited_at: string
  created_at: string
}

interface VisitorStats {
  today_unique_visitors: number
  today_total_visits: number
  total_visitors: number
  total_visits: number
  latest_visitors: Visitor[]
}

interface Props {
  visitors: {
    data: Visitor[]
    links: any
    meta: any
  }
  stats: VisitorStats
  countries: string[]
  filters: {
    search?: string
    country?: string
  }
}

export default function VisitorsIndex({ visitors, stats, countries, filters }: Props) {
  const { t } = useTranslation()
  const [search, setSearch] = useState(filters.search || '')
  const [countryFilter, setCountryFilter] = useState(filters.country || 'all')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params: any = { search }
    if (countryFilter && countryFilter !== 'all') {
      params.country = countryFilter
    }
    router.get('/admin/visitors', params, { preserveState: true })
  }

  const handleDeleteVisitor = (visitorId: number) => {
    if (confirm('Are you sure you want to delete this visitor record?')) {
      router.delete(`/admin/visitors/${visitorId}`)
    }
  }

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />
      case 'tablet':
        return <Tablet className="h-4 w-4" />
      case 'desktop':
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
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

  return (
    <AppLayout>
      <Head title="Visitors Analytics" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Visitors Analytics</h1>
            <p className="text-muted-foreground">
              Track and analyze your website visitors
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today_unique_visitors}</div>
              <p className="text-xs text-muted-foreground">Unique visitors today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Visits</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.today_total_visits}</div>
              <p className="text-xs text-muted-foreground">Total page views today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_visitors}</div>
              <p className="text-xs text-muted-foreground">All-time unique visitors</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_visits}</div>
              <p className="text-xs text-muted-foreground">All-time page views</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Visitors
            </CardTitle>
            <CardDescription>Search and filter visitor records</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by IP, city, browser, or device..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" className="px-6">
                Apply Filter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Visitors Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Visitors</CardTitle>
            <CardDescription>
              Complete list of website visitors with their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {visitors.data.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visitor</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device & Browser</TableHead>
                      <TableHead>Visit Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visitors.data.map((visitor) => (
                      <TableRow key={visitor.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-mono text-sm font-medium">
                              {visitor.ip_address}
                            </div>
                            {visitor.referrer && (
                              <div className="text-xs text-muted-foreground truncate max-w-48">
                                From: {new URL(visitor.referrer).hostname}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div className="space-y-1">
                              <div className="text-sm">
                                {visitor.city && visitor.country 
                                  ? `${visitor.city}, ${visitor.country}`
                                  : visitor.country || 'Unknown'
                                }
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(visitor.device || '')}
                              <span className="text-sm">
                                {visitor.device || 'Unknown'}
                              </span>
                            </div>
                            {visitor.browser && (
                              <div className="text-xs text-muted-foreground">
                                {visitor.browser}
                              </div>
                            )}
                            {visitor.operating_system && (
                              <div className="text-xs text-muted-foreground">
                                {visitor.operating_system}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <div className="text-sm">
                              {formatDate(visitor.visited_at)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/visitors/${visitor.id}`}
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteVisitor(visitor.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No visitors found</h3>
                <p className="text-muted-foreground">
                  No visitor records match the current filter.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
