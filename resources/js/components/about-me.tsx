import React from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/components/ui/card'


export default function AboutMe() {
  const { t } = useTranslation()
  return (
    <section id="about" className="py-20 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('about.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: t('about.frontendExpert'), desc: t('about.frontendDesc'), icon: '💻' },
            { title: t('about.backendSpecialist'), desc: t('about.backendDesc'), icon: '⚙️' },
            { title: t('about.cloudEnthusiast'), desc: t('about.cloudDesc'), icon: '☁️' }
          ].map((item, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-lg border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
