import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

export default function Test() {
    useGSAP(() => {
        gsap.from("#red-box", {
            x: -300,
            repeat: -1,
            yoyo: true,
            rotate: 360,
            duration: 10,
            ease: "power1.inOut"
        })
    }, [])


    useGSAP(() => {
        gsap.fromTo("#blue-box", {
            borderRadius: "0px",
        }, {
            x: -300,
            repeat: -1,
            yoyo: true,
            rotate: 360,
            duration: 2,
            ease: "power1.inOut",
            borderRadius: "100%"
        })
    }, [])


    // time line
    const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true
    })

    useGSAP(() => {
        timeline.to("#yellow-box", {
            x: -200,
            duration: 3,
            ease: "power1.inOut",
            borderRadius: "50%"
        })

        timeline.to("#yellow-box", {
            backgroundColor: "red",
            duration: 3,
            ease: "power1.inOut",
            x: -300,
        })
        timeline.to("#yellow-box", {
            backgroundColor: "red",
            duration: 3,
            ease: "power1.inOut",
            x: -300,
            scale: 4
        })
    }, [])

    // stagger
    useGSAP(() => {
        gsap.to(".stagger-box", {
            y: 200,
            repeat: -1,
            yoyo: true,
            stagger: 0.5,
            duration: 3,
            ease: "power1.inOut",
        })
    })


    return (
        <div className=''>
            <div className='w-12 h-12 bg-red-500 ' id="red-box"></div>
            <div className='w-12 h-12 bg-blue-500 ' id="blue-box"></div>
            <div className='w-12 h-12 bg-yellow-500 ' id="yellow-box"></div>

            <div className='flex gap-3'>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
                <div className='w-12 h-12 bg-green-500 stagger-box'></div>
            </div>
        </div>
    )
}
