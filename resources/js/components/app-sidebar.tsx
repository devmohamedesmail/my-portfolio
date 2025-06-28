import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { LanguageToggle } from '@/components/language-toggle';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Settings, 
    Code, 
    Briefcase, 
    BarChart3,
    Activity,
    Zap,
    Layers,
    MessageSquare,
    Users,
    UserCheck,
    Archive
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './logo';

export default function AppSidebar() {
    const { t } = useTranslation();
    
    const mainNavItems: NavItem[] = [
        {
            title: t('sidebar.dashboard'),
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    const managementItems: NavItem[] = [
        {
            title: t('sidebar.skills'),
            href: '/admin/skills',
            icon: Code,
        },
        {
            title: t('sidebar.projects'),
            href: '/admin/projects',
            icon: Briefcase,
        },
        {
            title: t('sidebar.clients'),
            href: '/admin/clients',
            icon: UserCheck,
        },
        {
            title: t('sidebar.requests'),
            href: '/admin/requests',
            icon: MessageSquare,
        },
        {
            title: t('sidebar.imports'),
            href: '/admin/imports',
            icon: Archive,
        },
    ];

    const analyticsItems: NavItem[] = [
        {
            title: t('sidebar.analytics'),
            href: '/admin/analytics',
            icon: BarChart3,
        },
        {
            title: t('sidebar.performance'),
            href: '/admin/performance',
            icon: Zap,
        },
        {
            title: t('sidebar.activity'),
            href: '/admin/activity',
            icon: Activity,
        },
        {
            title: t('sidebar.visitors'),
            href: '/admin/visitors',
            icon: Users,
        },
    ];

    const systemItems: NavItem[] = [
        {
            title: t('sidebar.settings'),
            href: '/admin/settings',
            icon: Settings,
        },
    ];

    return (
        <Sidebar 
            collapsible="icon" 
            variant="inset" 
            className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <SidebarHeader className="border-b">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            asChild 
                            className="group"
                        >
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <Layers className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Portfolio</span>
                                    <span className="text-xs text-muted-foreground">Admin Panel</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="flex flex-col gap-0">
                {/* Main Dashboard */}
                <div className="px-3 py-2">
                    <h4 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        {t('sidebar.dashboard')}
                    </h4>
                    <NavMain items={mainNavItems} />
                </div>

                {/* Content Management */}
                <div className="px-3 py-2">
                    <h4 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        {t('sidebar.contentManagement')}
                    </h4>
                    <NavMain items={managementItems} />
                </div>

                {/* Analytics & Monitoring */}
                <div className="px-3 py-2">
                    <h4 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        {t('sidebar.analyticsMonitoring')}
                    </h4>
                    <NavMain items={analyticsItems} />
                </div>

                {/* System */}
                <div className="px-3 py-2">
                    <h4 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                        {t('sidebar.system')}
                    </h4>
                    <NavMain items={systemItems} />
                </div>
            </SidebarContent>

            <SidebarFooter className="border-t p-1">
                <div className="p-2">
                    <LanguageToggle />
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
