import { Head, usePage } from '@inertiajs/react';
import { 
    Users, 
    Eye, 
    Globe, 
    TrendingUp, 
    Calendar,
    BarChart3,
    PieChart,
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Analytics', href: '/admin/analytics' },
];

interface AnalyticsData {
    totalVisitors: number;
    pageViews: number;
    uniqueVisitors: number;
    bounceRate: number;
    avgSessionDuration: string;
    topPages: Array<{
        path: string;
        views: number;
        change: number;
    }>;
    trafficSources: Array<{
        source: string;
        visitors: number;
        percentage: number;
    }>;
    deviceBreakdown: Array<{
        device: string;
        users: number;
        percentage: number;
    }>;
    monthlyStats: Array<{
        month: string;
        visitors: number;
        pageViews: number;
    }>;
    [key: string]: unknown;
}

export default function Analytics() {
    const analyticsData = usePage<AnalyticsData>().props;

    // Mock data - replace with real data from your analytics service
    const mockData = {
        totalVisitors: 12543,
        pageViews: 28967,
        uniqueVisitors: 8432,
        bounceRate: 42.3,
        avgSessionDuration: '2m 34s',
        topPages: [
            { path: '/', views: 8234, change: 12.3 },
            { path: '/projects', views: 5421, change: -2.1 },
            { path: '/about', views: 3876, change: 8.7 },
            { path: '/skills', views: 2543, change: 15.2 },
            { path: '/contact', views: 1876, change: -5.4 },
        ],
        trafficSources: [
            { source: 'Direct', visitors: 4521, percentage: 36.0 },
            { source: 'Google', visitors: 3876, percentage: 30.9 },
            { source: 'GitHub', visitors: 2134, percentage: 17.0 },
            { source: 'LinkedIn', visitors: 1543, percentage: 12.3 },
            { source: 'Twitter', visitors: 469, percentage: 3.8 },
        ],
        deviceBreakdown: [
            { device: 'Desktop', users: 7526, percentage: 60.0 },
            { device: 'Mobile', users: 3761, percentage: 30.0 },
            { device: 'Tablet', users: 1256, percentage: 10.0 },
        ],
        monthlyStats: [
            { month: 'Jan', visitors: 8234, pageViews: 18456 },
            { month: 'Feb', visitors: 9876, pageViews: 21234 },
            { month: 'Mar', visitors: 11234, pageViews: 24567 },
            { month: 'Apr', visitors: 10987, pageViews: 23789 },
            { month: 'May', visitors: 12543, pageViews: 28967 },
        ],
    };

    const data = analyticsData.totalVisitors ? analyticsData : mockData;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Analytics Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Monitor your portfolio performance and visitor insights
                        </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh Data
                    </Button>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.totalVisitors.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                +12.3% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.pageViews.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                +8.7% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.uniqueVisitors.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" />
                                +15.2% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.bounceRate}%</div>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <ArrowDownRight className="w-3 h-3 mr-1 text-red-500" />
                                -2.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Pages */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5" />
                                Top Pages
                            </CardTitle>
                            <CardDescription>Most visited pages this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.topPages.map((page, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="font-medium">{page.path}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {page.views.toLocaleString()} views
                                            </div>
                                        </div>
                                        <Badge 
                                            variant={page.change > 0 ? "default" : "secondary"}
                                            className={page.change > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                                        >
                                            {page.change > 0 ? '+' : ''}{page.change}%
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Traffic Sources */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="w-5 h-5" />
                                Traffic Sources
                            </CardTitle>
                            <CardDescription>Where your visitors come from</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.trafficSources.map((source, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{source.source}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {source.visitors.toLocaleString()} ({source.percentage}%)
                                            </span>
                                        </div>
                                        <Progress value={source.percentage} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Device Breakdown */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Device Breakdown</CardTitle>
                            <CardDescription>Visitor device preferences</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.deviceBreakdown.map((device, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{device.device}</span>
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {device.users.toLocaleString()} ({device.percentage}%)
                                            </span>
                                        </div>
                                        <Progress value={device.percentage} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Session Duration */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Session Insights
                            </CardTitle>
                            <CardDescription>User engagement metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        {data.avgSessionDuration}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Average Session Duration
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-bold">2.3</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Pages/Session</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">73%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Return Rate</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Monthly Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Trends</CardTitle>
                        <CardDescription>Visitor and page view trends over the last 5 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-5 gap-4">
                            {data.monthlyStats.map((stat, index) => (
                                <div key={index} className="text-center space-y-2">
                                    <div className="font-medium text-sm">{stat.month}</div>
                                    <div className="space-y-1">
                                        <div className="text-xl font-bold">{stat.visitors.toLocaleString()}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">visitors</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-sm font-medium">{stat.pageViews.toLocaleString()}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">page views</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
