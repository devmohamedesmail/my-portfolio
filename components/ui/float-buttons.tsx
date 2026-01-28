'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Github,
    Phone,
    MessageCircle,
    Send,
    Linkedin,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cn } from '@/lib/utils';

export default function FloatButtons() {
    const [isOpen, setIsOpen] = useState(false);
    const actionsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (isOpen) {
                gsap.to('.action-btn', {
                    y: 0,
                    opacity: 1,
                    visibility: 'visible',
                    stagger: 0.1,
                    duration: 0.4,
                    ease: 'back.out(1.7)',
                });
            } else {
                gsap.to('.action-btn', {
                    y: 20,
                    opacity: 0,
                    stagger: { amount: 0.1, from: 'end' },
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        gsap.set('.action-btn', { visibility: 'hidden' });
                    },
                });
            }
        },
        { dependencies: [isOpen], scope: actionsRef }
    );

    const actions = [
        {
            icon: Github,
            label: 'GitHub',
            href: 'https://github.com/devmohamedesmail',
            color: 'bg-black text-white hover:bg-gray-800',
        },
        {
            icon: Send,
            label: 'WhatsApp',
            href: 'https://wa.me/971589107126',
            color: 'bg-green-500 text-white hover:bg-green-600',
        },
        {
            icon: Phone,
            label: 'Call Me',
            href: 'tel:+971589107126',
            color: 'bg-blue-500 text-white hover:bg-blue-600',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            href: 'https://www.linkedin.com/in/mohamed-esmail-bbb20431b/',
            color: 'bg-[#0A66C2] text-white hover:bg-[#004182]',
        },
    ];

    return (
        <>
            {/* ACTION BUTTONS */}
            <div
                ref={actionsRef}
                className="fixed bottom-24 right-2 z-40 flex flex-col items-end gap-3 pointer-events-none"
            >
                <div className="flex flex-col gap-3 items-end pointer-events-auto">
                    {actions.map((action, index) => (
                        <div
                            key={index}
                            className="action-btn flex items-center gap-3 opacity-0 invisible translate-y-4"
                        >
                            <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-sm shadow border">
                                {action.label}
                            </span>

                            <Button
                                size="icon"
                                className={cn(
                                    'rounded-full h-12 w-12 shadow-lg hover:scale-110 transition',
                                    action.color
                                )}
                                asChild
                            >
                                <a
                                    href={action.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <action.icon className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* MAIN FLOAT BUTTON */}
            <Button
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="
                    fixed bottom-6 right-2
                    h-14 w-14
                    rounded-full
                    shadow-xl
                    bg-primary
                    hover:bg-primary/90
                    z-50
                    flex items-center justify-center
                "
            >
                <MessageCircle className="h-6 w-6" />
            </Button>
        </>
    );
}
