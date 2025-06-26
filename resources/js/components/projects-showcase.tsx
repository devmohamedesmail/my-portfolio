import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProjectsShowcase({ isLoaded }: any) {
    const { t } = useTranslation()
    return (
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
                { number: '50+', label: t('showcase.projectsCompleted'), icon: '🎯' },
                { number: '100%', label: t('showcase.clientSatisfaction'), icon: '⭐' },
                { number: '24/7', label: t('showcase.supportAvailable'), icon: '🚀' },
                { number: '5+', label: t('showcase.yearsExperience'), icon: '💼' }
            ].map((stat, index) => (
                <div
                    key={stat.label}
                    className={`text-center group hover:scale-105 transition-all duration-300 ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}
                    style={{ animationDelay: `${1000 + index * 200}ms` }}
                >
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
                        {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm uppercase tracking-wide">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    )
}
