import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MessageCircle } from 'lucide-react'

interface FloatingContactProps {
  className?: string
}

export default function FloatingContact({ className = '' }: FloatingContactProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 200
      setIsVisible(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const contactOptions = [
    {
      name: t('floatingContact.phone'),
      icon: <Phone className="w-6 h-6" />,
      href: 'tel:+971589107126',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      delay: '100ms'
    },
    {
      name: t('floatingContact.whatsapp'),
      icon: <MessageCircle className="w-6 h-6" />,
      href: 'https://wa.me/971589107126',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      delay: '200ms'
    },
    {
      name: t('floatingContact.email'),
      icon: <Mail className="w-6 h-6" />,
      href: 'mailto:dev.mohamed.esmail@gmail.com',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      delay: '300ms'
    }
  ]

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <div className={`transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
        {/* Contact Options */}
        <div className={`mb-4 space-y-3 transition-all duration-500 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}>
          {contactOptions.map((option, index) => (
            <div
              key={option.name}
              className={`transform transition-all duration-500 ${
                isOpen ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
              }`}
              style={{ transitionDelay: isOpen ? option.delay : '0ms' }}
            >
              <a
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-center w-14 h-14 bg-gradient-to-r ${option.color} ${option.hoverColor} rounded-full shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden float-contact-button`}
                title={option.name}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                
                {/* Icon */}
                <span className="text-2xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {option.icon}
                </span>
                
                {/* Ripple Effect */}
                <div className="absolute inset-0 rounded-full bg-white/30 transform scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                
                {/* Tooltip */}
                <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
                  {option.name}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Main Contact Button */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`group flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden float-main-button ${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`}
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 15}px`,
                    top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 15}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${2 + Math.random()}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Rotating Border */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin" style={{ animationDuration: '4s' }}></div>
            
            {/* Main Icon */}
            <span className={`text-3xl text-white relative z-10 transition-all duration-300 ${
              isOpen ? 'rotate-45' : 'rotate-0'
            }`}>
              {isOpen ? '✕' : '💬'}
            </span>
            
            {/* Pulse Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-ping opacity-30"></div>
          </button>

          {/* Status Indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse">
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping"></div>
          </div>

          {/* Floating Text */}
          <div className={`absolute bottom-full right-0 mb-4 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap shadow-lg ${
            isOpen || !isVisible ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
          }`}>
                        {t('floatingContact.connectText')} 🚀
            <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
