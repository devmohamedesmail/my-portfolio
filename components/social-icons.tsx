import React from 'react'
import { Facebook, Github, Linkedin, Twitter ,MessageCircle} from 'lucide-react'


export default function SocialIcons() {
    const items = [
        { icon: <Github size={20} />, name: 'Github' , link: 'https://github.com/devmohamedesmail?tab=repositories' },
        { icon: <Facebook size={20} />, name: 'Facebook' , link : 'https://www.facebook.com/profile.php?id=61574655568778' },
        { icon: <MessageCircle size={20} />, name: 'Whatsapp' , link : 'https://wa.me/+971589107126' },
        { icon: <Linkedin size={20} />, name: 'Linkedin' , link : 'https://www.linkedin.com/in/mohamed-esmail-bbb20431b/' },
    ]
    return (
        <div className='flex items-center justify-center gap-4'>

            {items.map((item) => (
                <a href={item.link} key={item.name} className='icon-container flex items-center gap-2 hover:cursor-pointer hover:text-primary bg-primary/10 p-2 rounded-full px-4'>
                     <span className='text-xs icon-text'>{item.name}</span>
                     {item.icon}
                </a>
            ))} 
        </div>
    )
}
