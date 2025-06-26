import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import AppLayout from '@/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ArrowLeft,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  User,
  Globe2,
  Link as LinkIcon,
  Calendar,
  Info
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

interface Props {
  visitor: Visitor
}

export default function VisitorShow({ visitor }: Props) {
  const { t } = useTranslation()

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="h-5 w-5 text-blue-600" />
      case 'tablet':
        return <Tablet className="h-5 w-5 text-green-600" />
      case 'desktop':
        return <Monitor className="h-5 w-5 text-purple-600" />
      default:
        return <Monitor className="h-5 w-5 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getLocationDisplay = () => {
    if (visitor.city && visitor.country) {
      return `${visitor.city}, ${visitor.country}`
    } else if (visitor.country) {
      return visitor.country
    } else if (visitor.city) {
      return visitor.city
    }
    return t('visitors.show.noData')
  }

  return (
    <AppLayout>
      <Head title={t('visitors.show.title')} />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Link
                href="/admin/visitors"
                className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('common.back')}
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {t('visitors.show.title')}
            </h1>
            <p className="text-gray-600 mt-1">
              {t('visitors.show.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('visitors.show.visitorInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.ipAddress')}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                      {visitor.ip_address}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.visitedAt')}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {formatDate(visitor.visited_at)}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.createdAt')}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {formatDate(visitor.created_at)}
                    </span>
                  </div>
                </div>

                {visitor.referrer && (
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('visitors.show.fields.referrer')}
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-blue-600 break-all">
                        {visitor.referrer}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Location Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t('visitors.show.locationInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.country')}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <Globe2 className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {visitor.country || t('visitors.show.noData')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.city')}
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {visitor.city || t('visitors.show.noData')}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location Summary
                  </label>
                  <div className="mt-1">
                    <Badge variant="outline" className="text-sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      {getLocationDisplay()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                {t('visitors.show.technicalInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('visitors.show.fields.device')}
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      {getDeviceIcon(visitor.device || '')}
                      <span className="text-sm capitalize">
                        {visitor.device || t('visitors.show.noData')}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('visitors.show.fields.browser')}
                    </label>
                    <div className="mt-1">
                      <Badge variant="secondary" className="text-sm">
                        {visitor.browser || t('visitors.show.noData')}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      {t('visitors.show.fields.operatingSystem')}
                    </label>
                    <div className="mt-1">
                      <Badge variant="outline" className="text-sm">
                        {visitor.operating_system || t('visitors.show.noData')}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    {t('visitors.show.fields.userAgent')}
                  </label>
                  <div className="mt-1">
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      <code className="text-xs text-gray-700 break-all">
                        {visitor.user_agent || t('visitors.show.noData')}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Visitor ID: #{visitor.id}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/admin/visitors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('common.back')}
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
