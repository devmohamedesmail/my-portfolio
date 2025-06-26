import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function SkillItem({ skill, index, isLoaded }: any) {
    return (
        <div
            key={skill.name}
            className={`skill-card group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:from-white/10 hover:to-white/15 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${isLoaded ? 'animate-fade-in-scale' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 -z-10"></div>

            {/* Skill Icon with Animation */}
            <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${skill.background_gradient} text-white text-3xl font-bold mb-4 skill-pulse group-hover:skill-rotate transition-all duration-300`}>
                    {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {skill.name}
                </h3>
            </div>

            {/* Circular Progress */}
            <div className="flex justify-center mb-4">
                <div className="circular-progress">
                    <svg width="80" height="80">
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            className="circle-bg"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="36"
                            className={`circle-progress skill-glow`}
                            stroke={`url(#gradient-${index})`}
                            strokeDasharray={`${skill.level * 2.26} 226`}
                            style={{ animationDelay: `${index * 200}ms` }}
                        />
                        {/* Gradient Definitions */}
                        <defs>
                            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                        <span className="text-2xl font-bold text-white mr-4 mt-4">{skill.level}%</span>
                    </div>
                </div>
            </div>

            {/* Skill Level Badge */}
            <div className="text-center">
                <Badge
                    className={`${skill.level >= 90 ? 'mastery-master' :
                        skill.level >= 80 ? 'mastery-expert' :
                            skill.level >= 70 ? 'mastery-advanced' :
                                skill.level >= 60 ? 'mastery-intermediate' : 'mastery-beginner'
                        } text-white px-3 py-1 text-sm font-medium`}
                >
                    {skill.level >= 90 ? 'Master' :
                        skill.level >= 80 ? 'Expert' :
                            skill.level >= 70 ? 'Advanced' :
                                skill.level >= 60 ? 'Intermediate' : 'Beginner'}
                </Badge>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    )
}
