import React from 'react'

export default function Logo() {
    return (
        <div className="flex items-center space-x-3 group">
            {/* Logo Icon */}
            <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-110 group-hover:shadow-purple-500/40 animate-pulse-slow">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300 animate-shimmer">
                        <span className="text-white font-bold text-lg group-hover:animate-bounce animate-glow">ME</span>
                    </div>
                </div>
                {/* Enhanced accent dot */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping group-hover:animate-pulse"></div>
                {/* Enhanced secondary accent */}
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce delay-75 opacity-70 group-hover:animate-ping"></div>
                {/* New rotating accent */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-purple-300/30 rounded-full animate-spin-slow opacity-60"></div>
            </div>

            {/* Text Logo */}
            <div className="flex flex-col">
                <div className="flex items-center space-x-1 group/text">
                    <span className="text-xl font-bold bg-gradient-to-r from-slate-600 to-slate-400 dark:from-white dark:to-gray-100 bg-clip-text text-transparent transform group-hover/text:scale-110 transition-all duration-500 animate-fade-in hover:animate-text-shimmer">
                        Mohamed
                    </span>
                    <span className="text-xl font-light bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent transform group-hover/text:scale-110 transition-all duration-500 delay-100 animate-fade-in hover:animate-text-shimmer">
                        Esmail
                    </span>
                </div>
            </div>

            {/* Enhanced floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-8 w-1 h-1 bg-blue-400 rounded-full animate-float opacity-60"></div>
                <div className="absolute bottom-3 right-4 w-1 h-1 bg-purple-400 rounded-full animate-float delay-200 opacity-40"></div>
                <div className="absolute top-6 right-2 w-0.5 h-0.5 bg-pink-400 rounded-full animate-float delay-500 opacity-50"></div>
                <div className="absolute top-1 left-12 w-0.5 h-0.5 bg-emerald-400 rounded-full animate-float delay-700 opacity-30"></div>
                <div className="absolute bottom-1 left-6 w-1 h-1 bg-cyan-400 rounded-full animate-float delay-1000 opacity-40"></div>
                <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-float delay-300 opacity-60"></div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.3;
                    }
                    50% {
                        transform: translateY(-10px) translateX(5px);
                        opacity: 0.8;
                    }
                }

                @keyframes text-shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }

                @keyframes glow {
                    0%, 100% {
                        text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(147, 51, 234, 0.4);
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }

                @keyframes pulse-slow {
                    0%, 100% {
                        transform: scale(1) rotate(3deg);
                    }
                    50% {
                        transform: scale(1.05) rotate(3deg);
                    }
                }

                @keyframes spin-slow {
                    from {
                        transform: translate(-50%, -50%) rotate(0deg);
                    }
                    to {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out forwards;
                }
                
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-text-shimmer {
                    background-size: 200% auto;
                    animation: text-shimmer 2s linear infinite;
                }

                .animate-glow {
                    animation: glow 2s ease-in-out infinite;
                }

                .animate-shimmer {
                    background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%);
                    background-size: 200% 100%;
                    animation: shimmer 2s ease-in-out infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 3s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
                }
            `}</style>
        </div>
    )
}
