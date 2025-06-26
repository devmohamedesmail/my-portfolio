import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProjectRequestModal from './project-request-modal'

export default function ContactSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+971589107126'; // Remove spaces and format for WhatsApp
    const message = encodeURIComponent('Hello! I\'m interested in discussing a project with you.');
    const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
     <section id="contact" className="py-20 px-6 bg-black/20 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            {t('contact.subtitle')}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: '📧', title: t('contact.email'), value: t('contact.emailValue'), color: 'from-blue-400 to-blue-600' },
              { icon: '📱', title: t('contact.phone'), value: t('contact.phoneValue'), color: 'from-green-400 to-green-600' },
              { icon: '📍', title: t('contact.location'), value: t('contact.locationValue'), color: 'from-purple-400 to-purple-600' }
            ].map((contact, index) => (
              <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-full flex items-center justify-center mx-auto mb-4 text-2xl`}>
                    {contact.icon}
                  </div>
                  <h3 className="font-bold text-white mb-2">{contact.title}</h3>
                  <p className="text-gray-300">{contact.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {t('contact.startProject')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleWhatsAppClick}
              className="border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white px-8 py-3 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              💬 {t('contact.whatsapp')}
            </Button>
          </div>

          <ProjectRequestModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        </div>
      </section>
  )
}
