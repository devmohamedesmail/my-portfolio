import React from 'react'

export default function Footer() {
  return (
     <footer className="py-8 px-6 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2025 Full-Stack Developer. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
  )
}
