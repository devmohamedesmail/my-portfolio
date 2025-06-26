import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card'
import { useTranslation } from 'react-i18next'

export default function SkillsShowcase() {
    const { t } = useTranslation()
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Programming Languages */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                <CardHeader className="text-center mb-6">
                    <CardTitle className="text-2xl font-bold text-white mb-2">{t('skills.programmingLanguages')}</CardTitle>
                    <CardDescription className="text-gray-300">{t('skills.programmingDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { name: 'JavaScript/TypeScript', level: 95, years: '5+' },
                            { name: 'PHP', level: 90, years: '4+' },
                            { name: 'Python', level: 80, years: '3+' },
                            { name: 'Java', level: 75, years: '2+' }
                        ].map((lang, index) => (
                            <div key={lang.name} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300">
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-white">{lang.name}</span>
                                        <span className="text-sm text-gray-400">{lang.years} {t('skills.experience.years')}</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className="h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full skill-progress"
                                            style={{
                                                width: `${lang.level}%`,
                                                animationDelay: `${index * 300}ms`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Tools & Frameworks */}
            <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8 hover:bg-white/10 transition-all duration-300">
                <CardHeader className="text-center mb-6">
                    <CardTitle className="text-2xl font-bold text-white mb-2">{t('skills.toolsFrameworks')}</CardTitle>
                    <CardDescription className="text-gray-300">{t('skills.toolsDesc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            'React', 'Laravel', 'Vue.js', 'Node.js',
                            'Docker', 'AWS', 'Git', 'PostgreSQL',
                            'Redis', 'Nginx', 'Linux', 'VS Code'
                        ].map((tool, index) => (
                            <div
                                key={tool}
                                className={`flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 transform hover:scale-105 skill-bounce`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <span className="text-white font-medium text-sm">{tool}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
