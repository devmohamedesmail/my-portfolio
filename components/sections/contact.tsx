'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageCircle } from 'lucide-react';
import SocialIcons from '../social-icons';

export function ContactSection() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert(t('contact.success'));
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        { icon: Mail, label: t('contact.emailLabel'), value: 'me6222080@gmail.com', href: 'mailto:me6222080@gmail.com' },
        { icon: Phone, label: t('contact.phoneLabel'), value: '+971 58 910 7126', href: 'tel:+971589107126' },
        { icon: MessageCircle, label: t('contact.whatsappLabel'), value: '+971 58 910 7126', href: 'https://wa.me/+971589107126' },
        { icon: MapPin, label: t('contact.locationLabel'), value: 'Dubai, UAE', href: '#' },
    ];

    const socialLinks = [
        { icon: Github, label: t('contact.githubLabel'), href: 'https://github.com/devmohamedesmail' },
        { icon: Linkedin, label: t('contact.linkedinLabel'), href: 'https://www.linkedin.com/in/mohamed-esmail-bbb20431b/' },
    ];

    return (
        <section id="contact" className="py-20 px-4 bg-muted/30">
            <div className="container mx-auto">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {t('contact.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('contact.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">{t('contact.infoTitle')}</h3>
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={info.href}
                                                target={index === 2 ? '_blank' : undefined}
                                                rel={index === 2 ? 'noopener noreferrer' : undefined}
                                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-muted-foreground">{info.label}</p>
                                                    <p className="font-medium text-foreground">{info.value}</p>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </Card>

                            {/* Social Links */}
                            <Card className="p-6">
                                <h3 className="text-xl font-semibold mb-4">{t('contact.followTitle')}</h3>
                                <SocialIcons />
                            </Card>
                        </div>

                        {/* Contact Form */}
                        <Card className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Input
                                        name="name"
                                        placeholder={t('contact.name')}
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder={t('contact.email')}
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <Textarea
                                        name="message"
                                        placeholder={t('contact.message')}
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        t('contact.sending')
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            {t('contact.send')}
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
