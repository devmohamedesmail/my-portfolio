import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LanguageSwitcher from '@/components/LanguageSwitcher';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center p-6 ${isRTL ? 'rtl' : 'ltr'}`}>
            <Head title="Log in" />
            
            {/* Animated Background Elements */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Language Switcher */}
            <div className="fixed top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            {/* Main Content */}
            <div className="w-full max-w-md relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className={`text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        &lt;Dev /&gt;
                    </div>
                    <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <h1 className="text-3xl font-bold text-white mb-2">{t('auth.login.title')}</h1>
                        <p className="text-gray-300">{t('auth.login.subtitle')}</p>
                    </div>
                </div>

                {/* Status Message */}
                {status && (
                    <div className={`mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-center transform transition-all duration-1000 delay-400 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        {status}
                    </div>
                )}

                {/* Login Form Card */}
                <div className={`bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-20 blur-sm -z-10"></div>
                    
                    <form className="space-y-6" onSubmit={submit}>
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white font-medium">
                                {t('auth.login.email')}
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                    placeholder={t('auth.login.emailPlaceholder')}
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg px-4 py-3 w-full transition-all duration-300 hover:bg-white/15"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            <InputError message={errors.email} className="text-red-400" />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-white font-medium">
                                    {t('auth.login.password')}
                                </Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        tabIndex={5}
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300"
                                    >
                                        {t('auth.login.forgotPassword')}
                                    </TextLink>
                                )}
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    placeholder={t('auth.login.passwordPlaceholder')}
                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-lg px-4 py-3 w-full transition-all duration-300 hover:bg-white/15"
                                />
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                            <InputError message={errors.password} className="text-red-400" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="border-white/30 text-blue-400"
                            />
                            <Label htmlFor="remember" className="text-sm text-gray-300 cursor-pointer">
                                {t('auth.login.rememberMe')}
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-lg mt-6" 
                            tabIndex={4} 
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-5 w-5 animate-spin mr-2" />}
                            {processing ? t('auth.login.signingIn') : t('auth.login.signInButton')}
                        </Button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center mt-6 pt-6 border-t border-white/10">
                        <p className="text-gray-300">
                            {t('auth.login.noAccount')}{' '}
                            <TextLink 
                                href={route('register')} 
                                tabIndex={5}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                            >
                                {t('auth.login.createAccount')}
                            </TextLink>
                        </p>
                    </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
