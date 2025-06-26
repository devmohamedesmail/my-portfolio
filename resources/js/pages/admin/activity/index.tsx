import { Head, usePage } from '@inertiajs/react';
import { 
    Activity, 
    Clock, 
    User, 
    FileText, 
    Settings, 
    Eye,
    Edit,
    Plus,
    Trash2,
    Upload,
    Download,
    RefreshCw,
    Calendar
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Activity', href: '/admin/activity' },
];

interface ActivityLog {
    id: number;
    action: string;
    description: string;
    entity_type: string;
    entity_id?: number;
    user_id: number;
    user_name: string;
    user_avatar?: string;
    ip_address: string;
    user_agent: string;
    created_at: string;
    metadata?: Record<string, any>;
}

interface ActivityData {
    recentActivities: ActivityLog[];
    todayStats: {
        totalActions: number;
        uniqueUsers: number;
        skillsUpdated: number;
        projectsModified: number;
    };
    activityTypes: Record<string, number>;
    [key: string]: unknown;
}

export default function ActivityDashboard() {
    const activityData = usePage<ActivityData>().props;

    // Mock data - replace with real activity data
    const mockData = {
        recentActivities: [
            {
                id: 1,
                action: 'created',
                description: 'Created new skill: React.js',
                entity_type: 'skill',
                entity_id: 15,
                user_id: 1,
                user_name: 'John Doe',
                user_avatar: null,
                ip_address: '192.168.1.1',
                user_agent: 'Mozilla/5.0...',
                created_at: '2025-06-24T10:30:00Z',
                metadata: { skill_name: 'React.js', category: 'frontend' }
            },
            {
                id: 2,
                action: 'updated',
                description: 'Updated project: Portfolio Website',
                entity_type: 'project',
                entity_id: 3,
                user_id: 1,
                user_name: 'John Doe',
                user_avatar: null,
                ip_address: '192.168.1.1',
                user_agent: 'Mozilla/5.0...',
                created_at: '2025-06-24T09:15:00Z',
                metadata: { project_title: 'Portfolio Website', changes: ['description', 'technologies'] }
            },
            {
                id: 3,
                action: 'deleted',
                description: 'Deleted skill: jQuery',
                entity_type: 'skill',
                entity_id: null,
                user_id: 1,
                user_name: 'John Doe',
                user_avatar: null,
                ip_address: '192.168.1.1',
                user_agent: 'Mozilla/5.0...',
                created_at: '2025-06-24T08:45:00Z',
                metadata: { skill_name: 'jQuery' }
            },
            {
                id: 4,
                action: 'viewed',
                description: 'Viewed analytics dashboard',
                entity_type: 'dashboard',
                entity_id: null,
                user_id: 1,
                user_name: 'John Doe',
                user_avatar: null,
                ip_address: '192.168.1.1',
                user_agent: 'Mozilla/5.0...',
                created_at: '2025-06-24T08:30:00Z',
                metadata: { page: 'analytics' }
            },
            {
                id: 5,
                action: 'updated',
                description: 'Updated settings: Theme preferences',
                entity_type: 'setting',
                entity_id: 1,
                user_id: 1,
                user_name: 'John Doe',
                user_avatar: null,
                ip_address: '192.168.1.1',
                user_agent: 'Mozilla/5.0...',
                created_at: '2025-06-24T07:20:00Z',
                metadata: { setting_key: 'theme', old_value: 'light', new_value: 'dark' }
            },
        ],
        todayStats: {
            totalActions: 24,
            uniqueUsers: 3,
            skillsUpdated: 5,
            projectsModified: 2,
        },
        activityTypes: {
            created: 8,
            updated: 12,
            deleted: 2,
            viewed: 15,
            uploaded: 3,
            downloaded: 1,
        },
    };

    // Ensure we have complete data with proper fallbacks
    const data = {
        recentActivities: activityData.recentActivities || mockData.recentActivities,
        todayStats: activityData.todayStats || mockData.todayStats,
        activityTypes: activityData.activityTypes || mockData.activityTypes,
    };

    const getActionIcon = (action: string) => {
        const icons = {
            created: <Plus className="w-4 h-4 text-green-500" />,
            updated: <Edit className="w-4 h-4 text-blue-500" />,
            deleted: <Trash2 className="w-4 h-4 text-red-500" />,
            viewed: <Eye className="w-4 h-4 text-gray-500" />,
            uploaded: <Upload className="w-4 h-4 text-purple-500" />,
            downloaded: <Download className="w-4 h-4 text-indigo-500" />,
        };
        return icons[action as keyof typeof icons] || <Activity className="w-4 h-4 text-gray-500" />;
    };

    const getActionColor = (action: string) => {
        const colors = {
            created: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            deleted: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            viewed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
            uploaded: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
            downloaded: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
        };
        return colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Activity Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Dashboard</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                            Monitor all activities and changes in your portfolio
                        </p>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </Button>
                </div>

                {/* Today's Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.todayStats.totalActions}</div>
                            <p className="text-xs text-muted-foreground">Today</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                            <User className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.todayStats.uniqueUsers}</div>
                            <p className="text-xs text-muted-foreground">Unique users today</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Skills Updated</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.todayStats.skillsUpdated}</div>
                            <p className="text-xs text-muted-foreground">Skills modified today</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Projects Modified</CardTitle>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.todayStats.projectsModified}</div>
                            <p className="text-xs text-muted-foreground">Projects changed today</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activities */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Recent Activities
                            </CardTitle>
                            <CardDescription>Latest actions performed in your portfolio</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {data.recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={activity.user_avatar || undefined} />
                                            <AvatarFallback className="text-xs">
                                                {activity.user_name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                {getActionIcon(activity.action)}
                                                <span className="font-medium text-sm">{activity.user_name}</span>
                                                <Badge 
                                                    variant="secondary" 
                                                    className={`text-xs ${getActionColor(activity.action)}`}
                                                >
                                                    {activity.action}
                                                </Badge>
                                            </div>
                                            
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {activity.description}
                                            </p>
                                            
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {formatTimeAgo(activity.created_at)}
                                                </span>
                                                <span>{activity.ip_address}</span>
                                                {activity.entity_type && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {activity.entity_type}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Activity Types */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Activity Breakdown
                            </CardTitle>
                            <CardDescription>Actions by type today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {Object.entries(data.activityTypes).map(([action, count]) => (
                                    <div key={action} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {getActionIcon(action)}
                                            <span className="font-medium capitalize">{action}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold">{count}</span>
                                            <Badge 
                                                variant="secondary" 
                                                className={`text-xs ${getActionColor(action)}`}
                                            >
                                                {((count / data.todayStats.totalActions) * 100).toFixed(0)}%
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Activity Timeline */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="w-5 h-5" />
                            Activity Timeline
                        </CardTitle>
                        <CardDescription>Detailed timeline of all recent activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                            
                            <div className="space-y-6">
                                {data.recentActivities.map((activity, index) => (
                                    <div key={activity.id} className="relative flex items-start gap-6">
                                        {/* Timeline dot */}
                                        <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-full">
                                            {getActionIcon(activity.action)}
                                        </div>
                                        
                                        {/* Timeline content */}
                                        <div className="flex-1 pb-6">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-medium">{activity.user_name}</span>
                                                <Badge 
                                                    variant="secondary" 
                                                    className={`text-xs ${getActionColor(activity.action)}`}
                                                >
                                                    {activity.action}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(activity.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            
                                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                                {activity.description}
                                            </p>
                                            
                                            {activity.metadata && (
                                                <div className="text-xs text-gray-500 bg-gray-50 dark:bg-gray-800 rounded p-2">
                                                    <pre className="whitespace-pre-wrap">
                                                        {JSON.stringify(activity.metadata, null, 2)}
                                                    </pre>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
