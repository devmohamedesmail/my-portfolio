import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Settings, Globe, BarChart3, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
    const { t } = useTranslation();
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('dashboard.title'),
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('dashboard.title')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {/* Quick Admin Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Link
                        href={route('admin.settings.index')}
                        className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center gap-3">
                            <Settings className="h-8 w-8" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('dashboard.settings')}</h3>
                                <p className="text-blue-100 text-sm">{t('dashboard.settingsDesc')}</p>
                            </div>
                        </div>
                    </Link>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Globe className="h-8 w-8" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('dashboard.website')}</h3>
                                <p className="text-green-100 text-sm">{t('dashboard.websiteDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <BarChart3 className="h-8 w-8" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('dashboard.analytics')}</h3>
                                <p className="text-purple-100 text-sm">{t('dashboard.analyticsDesc')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                        <div className="flex items-center gap-3">
                            <Users className="h-8 w-8" />
                            <div>
                                <h3 className="font-semibold text-lg">{t('dashboard.projects')}</h3>
                                <p className="text-orange-100 text-sm">{t('dashboard.projectsDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
        </AppLayout>
    );
}
