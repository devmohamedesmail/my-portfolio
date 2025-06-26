import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/types'

interface ProjectItemProps {
  project: Project;
  isLoaded: boolean;
  index: number;
}

export default function ProjectItem({ project, isLoaded, index }: ProjectItemProps) {
  const { t } = useTranslation()
  
  const truncateDescription = (text: string, wordLimit: number = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  return (
    <div
      key={project.title}
      className={`group relative transform transition-all duration-700 hover:scale-105 ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Project Card */}
      <Card className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border-0 overflow-hidden rounded-3xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 relative">
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-gray-900/95 to-gray-800/95 -z-10"></div>

        {/* Project Image/Preview */}
        <div className={`relative h-64 overflow-hidden`}>
          {/* Project Image */}
          {project.image ? (
            <div className="relative w-full h-full">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:from-black/40 transition-all duration-500"></div>
            </div>
          ) : (
            // Fallback gradient background with animated elements
            <div className={`w-full h-full bg-gradient-to-br ${project.gradient || 'from-blue-600 to-purple-600'}`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-lg rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
                <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white rounded-full animate-ping"></div>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>
            </div>
          )}

          {/* Project Preview Content - Always visible */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              {!project.image && (
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mb-4 mx-auto backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">🚀</span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 drop-shadow-lg">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Creative Action Buttons - Always Visible */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="grid grid-cols-2 gap-2">
              {/* Primary Action Button */}
              {(project.demo_url || project.website_url) ? (
                <a
                  href={project.demo_url || project.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden"
                >
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white border-0 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative z-10"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                      {t('projects.buttons.liveDemo')}
                    </span>
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </Button>
                </a>
              ) : (
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 border-0 font-semibold cursor-not-allowed"
                  disabled
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    {t('projects.buttons.comingSoon')}
                  </span>
                </Button>
              )}

              {/* Secondary Action Button */}
              {project.github_url ? (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:text-white font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      {t('projects.buttons.github')}
                    </span>
                  </Button>
                </a>
              ) : (
                <a
                  href="https://wa.me/971589107126?text=Hi! I'm interested in learning more about your projects and services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative overflow-hidden"
                >
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-2 border-green-400/50 text-green-300 hover:bg-green-500/20 hover:border-green-400 hover:text-white font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515"/>
                      </svg>
                      Contact
                    </span>
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {truncateDescription(project.description, 20)}
              </p>
            </div>
            <div className="ml-4 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <span className="text-2xl">⭐</span>
            </div>
          </div>

          {/* Tech Stack with Enhanced Styling */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies && project.technologies.length > 0 ? 
                project.technologies.map((tech: string, techIndex: number) => (
                  <Badge
                    key={tech}
                    className={`bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-110 transition-all duration-300 px-3 py-1 text-sm font-medium animate-fade-in-scale`}
                    style={{ animationDelay: `${(index * 200) + (techIndex * 100)}ms` }}
                  >
                    {tech}
                  </Badge>
                )) : (
                  <Badge className="bg-gradient-to-r from-gray-500/20 to-gray-500/20 text-gray-300 border-gray-500/30 px-3 py-1 text-sm font-medium">
                    No technologies specified
                  </Badge>
                )
              }
            </div>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="text-2xl font-bold text-blue-400">{project.performance_score || 98}%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Performance</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="text-2xl font-bold text-green-400">{project.responsive_score || 100}%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Responsive</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
              <div className="text-2xl font-bold text-purple-400">{project.accessibility_score || 95}%</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">Accessibility</div>
            </div>
          </div>

          {/* Project Timeline */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${
                project.status === 'completed' ? 'bg-green-400' :
                project.status === 'in-progress' ? 'bg-yellow-400' :
                project.status === 'planned' ? 'bg-blue-400' :
                'bg-gray-400'
              }`}></span>
              <span className="capitalize">{project.status === 'in-progress' ? 'In Progress' : project.status}</span>
              {project.end_date && (
                <span>
                  • Completed {new Date(project.end_date).getFullYear()}
                </span>
              )}
            </div>
            {project.duration_months && (
              <div className="flex items-center space-x-1">
                <span>Duration: {project.duration_months} month{project.duration_months !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>
        </div>

        {/* Glowing Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </Card>

      {/* Floating Elements Around Card */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
    </div>
  )
}
