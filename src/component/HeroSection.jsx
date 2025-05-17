import React from 'react'
import frame1 from '../assets/frames/34365421.png'
import frame2 from '../assets/frames/3436542.png'

function HeroSection() {
    return (
        <div className='absolute overflow-hidden top-0 left-0 -z-20 h-dvh w-dvw'>
            <img src={frame1} className='absolute top-0 left-0 -z-10 h-dvh bg-[#1c2f33]' />
            <img src={frame2} className='absolute top-0 left-0 -z-10 h-dvh'/>
        </div>
    )
}

export default HeroSection

//1c2f33