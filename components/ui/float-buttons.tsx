'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Phone, MessageCircle, X, Send, Linkedin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export default function FloatButtons() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isOpen) {
            gsap.to('.action-btn', {
                y: 0,
                opacity: 1,
                visibility: 'visible',
                stagger: 0.1,
                duration: 0.4,
                ease: 'back.out(1.7)',
            });
            gsap.to('.toggle-icon', {
                rotation: 45,
                duration: 0.3,
            });
        } else {
            gsap.to('.action-btn', {
                y: 20,
                opacity: 0,
                stagger: {
                    amount: 0.1,
                    from: 'end'
                },
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set('.action-btn', { visibility: 'hidden' });
                }
            });
            gsap.to('.toggle-icon', {
                rotation: 0,
                duration: 0.3,
            });
        }
    }, { dependencies: [isOpen], scope: containerRef });

    const actions = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/devmohamedesmail', // Replace with actual default if known or generic
            color: 'bg-black text-white hover:bg-gray-800',
            delay: 0.2
        },
        {
            icon: Send, // Using Send as a proxy for WhatsApp/Telegram feel
            label: 'WhatsApp',
            href: 'https://wa.me/+971589107126', // Replace with actual number
            color: 'bg-green-500 text-white hover:bg-green-600',
            delay: 0.1
        },
        {
            icon: Phone,
            label: 'Call Me',
            href: 'tel:+971589107126', // Replace with actual number
            color: 'bg-blue-500 text-white hover:bg-blue-600',
            delay: 0
        },
        {
            icon: Linkedin,
            label: ' LinkedIn ',
            href: 'https://www.linkedin.com/in/mohamed-esmail-bbb20431b/', // Replace with actual number
            color: 'bg-blue-500 text-white hover:bg-blue-600',
            delay: 0
        }
    ];

    return (
        <div ref={containerRef} className="fixed bottom-6 right-2 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 items-end mb-2 pointer-events-auto">
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className="action-btn flex items-center justify-center gap-3 opacity-0 invisible translate-y-4"
                    >
                        <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-medium shadow-sm border border-border">
                            {action.label}
                        </span>
                        <Button
                            size="icon"
                            className={cn(
                                "rounded-full shadow-lg h-12 w-12 transition-transform hover:scale-110",
                                action.color
                            )}
                            asChild
                        >
                            <a href={action.href} target="_blank" rel="noopener noreferrer">
                                <action.icon className="h-5 w-5" />
                            </a>
                        </Button>
                    </div>
                ))}
            </div>

            {/* Main Toggle Button */}
            <Button
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="pointer-events-auto h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 transition-all duration-300 z-50 group flex items-center justify-center"
            >
                <div className="relative flex items-center justify-center h-10 w-10 ">
                    <MessageCircle />
                </div>
            </Button>
        </div>
    );
}
