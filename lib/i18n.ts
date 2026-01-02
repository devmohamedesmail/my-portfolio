import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                about: 'About',
                skills: 'Skills',
                projects: 'Projects',
                experience: 'Experience',
                contact: 'Contact',
            },
            hero: {
                greeting: 'Hi, I\'m',
                role: 'Full Stack Developer',
                description: 'I build exceptional digital experiences that combine beautiful design with powerful functionality.',
                cta: 'View My Work',
                contact: 'Get In Touch',
            },
            about: {
                title: 'About Me',
                subtitle: 'Get to know me better',
                description: 'I\'m a passionate full-stack developer with expertise in building modern web applications. I love turning complex problems into simple, beautiful, and intuitive solutions.',
                yearsExp: 'Years Experience',
                projectsCompleted: 'Projects Completed',
                happyClients: 'Happy Clients',
                awardsWon: 'Awards Won',
            },
            skills: {
                title: 'Skills & Expertise',
                subtitle: 'Technologies I work with',
                frontend: 'Frontend',
                backend: 'Backend',
                database: 'Database',
                tools: 'Tools & Others',

            },
            projects: {
                title: 'Featured Projects',
                subtitle: 'Some of my recent work',
                viewProject: 'View Project',
                sourceCode: 'Source Code',
                liveUrl: 'Live URL',
                githubUrl: 'GitHub URL',
                categories: {
                    all: "All",
                    frontend: "Frontend",
                    backend: "Backend",
                    database: "Database",
                    tools: "Tools & Others",
                    mobile: "Mobile",
                    web: "Web",
                }
            },
            experience: {
                title: 'Work Experience',
                subtitle: 'My professional journey',
                present: 'Present',
            },
            contact: {
                title: 'Get In Touch',
                subtitle: 'Let\'s work together',
                name: 'Your Name',
                email: 'Your Email',
                message: 'Your Message',
                send: 'Send Message',
                sending: 'Sending...',
                success: 'Message sent successfully!',
                error: 'Failed to send message. Please try again.',
                infoTitle: 'Contact Information',
                followTitle: 'Follow Me',
                emailLabel: 'Email',
                phoneLabel: 'Phone',
                locationLabel: 'Location',
                githubLabel: 'GitHub',
                linkedinLabel: 'LinkedIn',
                whatsappLabel: 'WhatsApp',
            },
            footer: {
                rights: 'All rights reserved.',
                builtWith: 'Built with',
            },
        },
    },
    ar: {
        translation: {
            nav: {
                home: 'الرئيسية',
                about: 'عني',
                skills: 'المهارات',
                projects: 'المشاريع',
                experience: 'الخبرة',
                contact: 'تواصل',
            },
            hero: {
                greeting: 'مرحباً، أنا',
                role: 'مطور ويب متكامل',
                description: 'أقوم ببناء تجارب رقمية استثنائية تجمع بين التصميم الجميل والوظائف القوية.',
                cta: 'شاهد أعمالي',
                contact: 'تواصل معي',
            },
            about: {
                title: 'عني',
                subtitle: 'تعرف علي أكثر',
                description: 'أنا مطور ويب متكامل شغوف بخبرة في بناء تطبيقات الويب الحديثة. أحب تحويل المشاكل المعقدة إلى حلول بسيطة وجميلة وبديهية.',
                yearsExp: 'سنوات خبرة',
                projectsCompleted: 'مشروع مكتمل',
                happyClients: 'عميل سعيد',
                awardsWon: 'جائزة',
            },
            skills: {
                title: 'المهارات والخبرات',
                subtitle: 'التقنيات التي أعمل بها',
                frontend: 'الواجهة الأمامية',
                backend: 'الواجهة الخلفية',
                database: 'قواعد البيانات',
                tools: 'الأدوات وأخرى',
            },
            projects: {
                title: 'المشاريع المميزة',
                subtitle: 'بعض من أعمالي الحديثة',
                viewProject: 'عرض المشروع',
                sourceCode: 'الكود المصدري',
                liveUrl: 'رابط المعاينة',
                githubUrl: 'رابط GitHub',
                categories: {
                    all: 'الكل',
                    frontend: 'الواجهة الأمامية',
                    backend: 'الواجهة الخلفية',
                    database: 'قواعد البيانات',
                    tools: 'الأدوات وأخرى',
                    mobile: 'تطبيقات الموبايل',
                    web: 'تطبيقات الويب',
                }
            },
            experience: {
                title: 'الخبرة العملية',
                subtitle: 'رحلتي المهنية',
                present: 'الحالي',
            },
            contact: {
                title: 'تواصل معي',
                subtitle: 'لنعمل معاً',
                name: 'اسمك',
                email: 'بريدك الإلكتروني',
                message: 'رسالتك',
                send: 'إرسال الرسالة',
                sending: 'جاري الإرسال...',
                success: 'تم إرسال الرسالة بنجاح!',
                error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
                infoTitle: 'معلومات الاتصال',
                followTitle: 'تابعني',
                emailLabel: 'البريد الإلكتروني',
                phoneLabel: 'الهاتف',
                locationLabel: 'الموقع',
                githubLabel: 'جيت هب',
                linkedinLabel: 'لينكد إن',
                whatsappLabel: 'واتساب',
            },
            footer: {
                rights: 'جميع الحقوق محفوظة.',
                builtWith: 'تم البناء باستخدام',
            },
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
