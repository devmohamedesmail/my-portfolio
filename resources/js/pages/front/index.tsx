import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import FloatingContact from '@/components/FloatingContact'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SkillsSection from '@/components/skills-section'
import HeroSection from '@/components/hero-section'
import Logo from '@/components/logo'
import NavigationItems from '@/components/navigation-items'
import ProjectsSection from '@/components/projects-section'
import ContactSection from '@/components/contact-section'
import AboutMe from '@/components/about-me'
import Footer from '@/components/footer'
import { Head } from '@inertiajs/react'

export default function Home({ skills, projects }: any) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { t, i18n } = useTranslation()

  const isRTL = i18n.language === 'ar'

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const scrollPos = window.scrollY + 100

      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { key: 'hero', label: t('nav.home') },
    { key: 'about', label: t('nav.about') },
    { key: 'skills', label: t('nav.skills') },
    { key: 'projects', label: t('nav.projects') },
    { key: 'contact', label: t('nav.contact') }
  ]

  return (
  <>
  <Head title="HOME" />
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <NavigationItems navItems={navItems} activeSection={activeSection} />
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href="https://wa.me/971589107126?text=Hello! I'm interested in discussing a project with you."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
              >
                <Button
                  variant="outline"
                  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all duration-500 relative z-10 px-6 py-2 rounded-full bg-transparent backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
                    </svg>
                    <span className="font-medium">Contact Me</span>
                  </div>
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full -z-10"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-green-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -z-20"></div>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection isLoaded={isLoaded} />

      {/* About Section */}
      <AboutMe />

      {/* Skills Section */}
      <SkillsSection skills={skills} isLoaded={isLoaded} />


      {/* Projects Section */}
      <ProjectsSection projects={projects} isLoaded={isLoaded} />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />

      {/* Floating Contact Buttons */}
      <FloatingContact />
    </div>
  
  </>
  )
}
