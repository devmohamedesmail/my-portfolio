'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';

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
        { icon: Mail, label: 'Email', value: 'contact@example.com', href: 'mailto:contact@example.com' },
        { icon: Phone, label: 'Phone', value: '+1 234 567 8900', href: 'tel:+12345678900' },
        { icon: MapPin, label: 'Location', value: 'San Francisco, CA', href: '#' },
    ];

    const socialLinks = [
        { icon: Github, label: 'GitHub', href: 'https://github.com' },
        { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
        { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
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
                                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                <div className="space-y-4">
                                    {contactInfo.map((info, index) => {
                                        const Icon = info.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={info.href}
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
                                <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                                                aria-label={social.label}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </a>
                                        );
                                    })}
                                </div>
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
