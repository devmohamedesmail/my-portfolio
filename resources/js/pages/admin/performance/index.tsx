import { Head, usePage } from '@inertiajs/react';
import { 
    Zap, 
    Gauge, 
    Monitor, 
    Smartphone, 
    Globe, 
    Clock,
    Activity,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Performance', href: '/admin/performance' },
];

interface PerformanceData {
    lighthouse: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    webVitals: {
        lcp: number;
        fid: number;
        cls: number;
        fcp: number;
        ttfb: number;
    };
    pageLoadTimes: Array<{
        page: string;
        loadTime: number;
        status: 'good' | 'needs-improvement' | 'poor';
    }>;
    recommendations: Array<{
        category: string;
        message: string;
        impact: 'high' | 'medium' | 'low';
        status: 'resolved' | 'pending' | 'ignored';
    }>;
    [key: string]: unknown;
}

export default function Performance() {
    const performanceData = usePage<PerformanceData>().props;

    // Mock data - replace with real performance data
    const mockData = {
        lighthouse: {
            performance: 94,
            accessibility: 98,
            bestPractices: 92,
            seo: 96,
        },
        webVitals: {
            lcp: 1.2, // Largest Contentful Paint (seconds)
            fid: 45,  // First Input Delay (milliseconds)
            cls: 0.05, // Cumulative Layout Shift
            fcp: 0.8,  // First Contentful Paint (seconds)
            ttfb: 0.3, // Time to First Byte (seconds)
        },
        pageLoadTimes: [
            { page: '/', loadTime: 1.2, status: 'good' as const },
            { page: '/projects', loadTime: 1.8, status: 'good' as const },
            { page: '/about', loadTime: 2.1, status: 'needs-improvement' as const },
            { page: '/skills', loadTime: 1.5, status: 'good' as const },
            { page: '/contact', loadTime: 3.2, status: 'poor' as const },
        ],
        recommendations: [
            {
                category: 'Images',
                message: 'Optimize images for better performance',
                impact: 'high' as const,
                status: 'pending' as const,
            },
            {
                category: 'JavaScript',
                message: 'Remove unused JavaScript',
                impact: 'medium' as const,
                status: 'resolved' as const,
            },
            {
                category: 'CSS',
                message: 'Minify CSS files',
                impact: 'low' as const,
                status: 'resolved' as const,
            },
            {
                category: 'Caching',
                message: 'Implement browser caching',
                impact: 'high' as const,
                status: 'pending' as const,
            },
        ],
    };

    const data = performanceData.lighthouse ? performanceData : mockData;

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 dark:text-green-400';
        if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    const getScoreBg = (score: number) => {
        if (score >= 90) return 'bg-green-100 dark:bg-green-900/20';
        if (score >= 50) return 'bg-yellow-100 dark:bg-yellow-900/20';
        return 'bg-red-100 dark:bg-red-900/20';
    };

    const getVitalStatus = (vital: string, value: number) => {
        const thresholds = {
            lcp: { good: 2.5, poor: 4.0 },
            fid: { good: 100, poor: 300 },
            cls: { good: 0.1, poor: 0.25 },
            fcp: { good: 1.8, poor: 3.0 },
            ttfb: { good: 0.8, poor: 1.8 },
        };

        const threshold = thresholds[vital as keyof typeof thresholds];
        if (!threshold) return 'good';

        if (value <= threshold.good) return 'good';
        if (value <= threshold.poor) return 'needs-improvement';
        return 'poor';
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'good':
                return <CheckCircle className="w-4 h-4 text-green-500" />;
            case 'needs-improvement':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
            case 'poor':
                return <XCircle className="w-4 h-4 text-red-500" />;
            default:
                return <Clock className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Performance Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Monitor your portfolio's performance metrics and optimization opportunities
                        </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Run New Audit
                    </Button>
                </div>

                {/* Lighthouse Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Performance</CardTitle>
                            <Zap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${getScoreColor(data.lighthouse.performance)}`}>
                                {data.lighthouse.performance}
                            </div>
                            <div className="mt-2">
                                <Progress value={data.lighthouse.performance} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Accessibility</CardTitle>
                            <Monitor className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${getScoreColor(data.lighthouse.accessibility)}`}>
                                {data.lighthouse.accessibility}
                            </div>
                            <div className="mt-2">
                                <Progress value={data.lighthouse.accessibility} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Best Practices</CardTitle>
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${getScoreColor(data.lighthouse.bestPractices)}`}>
                                {data.lighthouse.bestPractices}
                            </div>
                            <div className="mt-2">
                                <Progress value={data.lighthouse.bestPractices} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">SEO</CardTitle>
                            <Globe className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${getScoreColor(data.lighthouse.seo)}`}>
                                {data.lighthouse.seo}
                            </div>
                            <div className="mt-2">
                                <Progress value={data.lighthouse.seo} className="h-2" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Core Web Vitals */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="w-5 h-5" />
                                Core Web Vitals
                            </CardTitle>
                            <CardDescription>Key user experience metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Largest Contentful Paint</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">LCP</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(getVitalStatus('lcp', data.webVitals.lcp))}
                                        <span className="font-mono">{data.webVitals.lcp}s</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">First Input Delay</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">FID</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(getVitalStatus('fid', data.webVitals.fid))}
                                        <span className="font-mono">{data.webVitals.fid}ms</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Cumulative Layout Shift</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">CLS</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(getVitalStatus('cls', data.webVitals.cls))}
                                        <span className="font-mono">{data.webVitals.cls}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">First Contentful Paint</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">FCP</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(getVitalStatus('fcp', data.webVitals.fcp))}
                                        <span className="font-mono">{data.webVitals.fcp}s</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">Time to First Byte</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">TTFB</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(getVitalStatus('ttfb', data.webVitals.ttfb))}
                                        <span className="font-mono">{data.webVitals.ttfb}s</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Page Load Times */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Page Load Times
                            </CardTitle>
                            <CardDescription>Individual page performance</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.pageLoadTimes.map((page, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{page.page}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Load time: {page.loadTime}s
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(page.status)}
                                            <Badge 
                                                variant={page.status === 'good' ? 'default' : 
                                                        page.status === 'needs-improvement' ? 'secondary' : 'destructive'}
                                            >
                                                {page.status === 'needs-improvement' ? 'Needs Work' : 
                                                 page.status.charAt(0).toUpperCase() + page.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recommendations */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Performance Recommendations
                        </CardTitle>
                        <CardDescription>Opportunities to improve your site's performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recommendations.map((rec, index) => (
                                <Alert key={index} className={
                                    rec.status === 'resolved' ? 'border-green-200 bg-green-50 dark:bg-green-900/20' :
                                    rec.status === 'pending' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20' :
                                    'border-gray-200 bg-gray-50 dark:bg-gray-900/20'
                                }>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {rec.status === 'resolved' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                                            ) : rec.status === 'pending' ? (
                                                <Clock className="w-5 h-5 text-yellow-500 mt-0.5" />
                                            ) : (
                                                <XCircle className="w-5 h-5 text-gray-500 mt-0.5" />
                                            )}
                                            <div>
                                                <div className="font-medium">{rec.category}</div>
                                                <AlertDescription className="mt-1">
                                                    {rec.message}
                                                </AlertDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge 
                                                variant={rec.impact === 'high' ? 'destructive' : 
                                                        rec.impact === 'medium' ? 'default' : 'secondary'}
                                            >
                                                {rec.impact} impact
                                            </Badge>
                                            <Badge 
                                                variant={rec.status === 'resolved' ? 'default' : 'outline'}
                                            >
                                                {rec.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </Alert>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Performance Summary */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gauge className="w-5 h-5" />
                            Performance Summary
                        </CardTitle>
                        <CardDescription>Overall performance assessment</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-2">
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                                <div className="font-medium">Overall Score</div>
                                <div className="text-2xl font-bold text-green-600">Excellent</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">95/100 average</div>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-2">
                                    <Smartphone className="w-8 h-8 text-blue-600" />
                                </div>
                                <div className="font-medium">Mobile Performance</div>
                                <div className="text-2xl font-bold text-blue-600">Good</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">92/100 average</div>
                            </div>
                            
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-2">
                                    <Monitor className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="font-medium">Desktop Performance</div>
                                <div className="text-2xl font-bold text-purple-600">Excellent</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">98/100 average</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
