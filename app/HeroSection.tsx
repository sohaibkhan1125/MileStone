import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    
      <section className="bg-[#232222] md:mx-3 rounded-[5px] md:px-20 text-white -mt-20">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl leading-tight md:leading-lose mb-4 text-4xl font-extrabold tracking-tight  md:text-5xl xl:text-6xl dark:text-white">Convert<span className='text-primary'> YouTube</span> to <span className='text-blue-500'>MP3/MP4</span></h1>
            <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl ">Paste your video URL and get result quickly.</p>
            <Link href={'/dashboard'}>
            <button  className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center bg-red-500 hover:bg-red-700 text-white rounded-xl bg-primary-700 ">
                Get started
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            </Link>
            <Link href={'/contact'}>
            <button  className="inline-flex items-center  rounded-xl hover:text-black justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300  hover:bg-gray-100 ">
                Contact
            </button> 
            </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image src="/hero.png" width={400} height={300} alt="mockup"/>
        </div>                
    </div>
</section>
    
  )
}

export default HeroSection
