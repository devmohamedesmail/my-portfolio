import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HeroSection({isLoaded}:any) {
    const { t } = useTranslation()
  return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center z-10">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <p className="text-lg text-blue-400 mb-4">{t('hero.greeting')}</p>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
              <span className="block text-white mb-4">{t('hero.name')}</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                {t('hero.title')}
              </span>
            </h1>
          </div>
          
          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
              <br />
              <span className="text-blue-400">{t('hero.specialties')}</span>
            </p>
          </div>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {t('hero.viewProjects')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              {t('hero.contactMe')}
            </Button>
          </div>

          {/* Tech Stack Floating Icons */}
          <div className="mt-16 flex justify-center space-x-8">
            {['⚛️', '🎯', '🟢', '🗄️', '☁️', '🐳'].map((icon, index) => (
              <div 
                key={index}
                className={`text-4xl transform transition-all duration-1000 hover:scale-125 hover:rotate-12 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${700 + index * 100}ms` }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}
