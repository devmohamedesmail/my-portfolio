import React from 'react'

export default function NavigationItems({ navItems, activeSection }: any) {
    return (
        <div className="hidden md:flex space-x-8">
            {navItems.map((item: any) => (
                <a
                    key={item.key}
                    href={`#${item.key}`}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-400 ${activeSection === item.key ? 'text-blue-400' : 'text-gray-300'
                        }`}
                >
                    {item.label}
                    {activeSection === item.key && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-100 transition-transform duration-300"></span>
                    )}
                </a>
            ))}
        </div>
    )
}
