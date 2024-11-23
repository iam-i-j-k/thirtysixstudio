import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import Canvas from './Canvas'
import data from './data'
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const App = () => {

  
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  useEffect(()=>{
    const locomotiveScroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      smoothMobile: true
    });
  },[]);

  useGSAP(()=>{
    document.addEventListener('mousemove', (e) => {
      gsap.to(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
        duration: 0.6,
      });
    });

    headingRef.current.addEventListener('click',(e)=>{
      setShowCanvas(!showCanvas);
      gsap.set(growingSpan.current,{
        top: e.clientY,
        left: e.clientX,
        scale: showCanvas ? window.innerWidth : 0,
      });

      gsap.to("body", {
        color: showCanvas ? "#fff" : "#000",
        duration: 0.5,
        ease: "power2.inOut",
      });

      gsap.to(growingSpan.current,{
        scale: showCanvas ? 1 : window.innerWidth,
        duration: 1.25,
        ease: "power2.inOut",
      });

      
    });
  },[showCanvas]);
  return (
    <>
      <span ref={growingSpan} className="growing block top-[-20px] left-[-20px] w-4 h-4 sm:w-5 sm:h-5 fixed rounded-full"></span>
      <div data-scroll-container> 
        
        <div className="w-full absolute h-screen text-white text-5xl">
      {showCanvas && data[0].map((item,index)=>(
            <Canvas key={index} details={item} />
          ))}
      

        </div>
        <div className='w-full relative h-screen'>
          <nav className="w-full p-2 sm:p-3 border-b border-[#00000080] z-50 tracking-tighter">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm sm:text-md font-light tracking-tight">Thirtysixstudio</div>
              <ul className="flex gap-4 sm:gap-8 text-sm sm:text-base mt-2 sm:mt-0">
                {["Home", "About", "Projects", "Contact"].map((link, index) => (
                  <li key={index} className="hover:text-yellow-500 cursor-pointer transition-colors">
                    <a data-scroll-to={`#${link.toLowerCase()}`} href={`#${link.toLowerCase()}`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div id="home" className='textcontainer w-full p-38 md:px-[25%] md:py-[45px]'>
            <div className='text w-full px-1 py-20 md:w-[45%] md:p-0'>

              <h3 className='text-3xl tracking-tight leading-[1.2]'>
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
              </h3>
              <p className='text-sm mt-5 font-lighter md:mt-10 md:w-[80%]'>
                We're a boutique production studio focused on design, motion, and cr
                eative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
              </p>
              <p className='text-md mt-10'>Scroll</p>
            </div>
          </div>
          
          <div className="w-full">
          
          <div className="w-full absolute pointer-events-none h-screen text-white text-5xl">
      
      {showCanvas && data[1].map((item,index)=>(
            <Canvas key={index}  details={item} />
          ))}

          </div>

            <h1
            ref={headingRef}
            className="text-5xl sm:text-7xl md:text-9xl w-full tracking-tight px-2">
              <span className='block w-full text-[20vw] leading-[0.8]'>Thirty</span>
              <span className='flex items-center gap-2 block w-full text-[20vw] leading-[0.8]'>six 
                {!showCanvas && <span className='rounded-full hover:bg-white transition-all ease-in-out duration-300 mt-4 sm:mt-6 md:mt-8 mx-4 sm:mx-6 md:mx-8'>
                  <img 
                    src="https://thirtysixstudio.com/peppers/pepperA/40.png" 
                    className="w-[80px] sm:w-[100px] md:w-[150px] h-auto" 
                    alt="Decorative pepper" 
                  />
                </span>}
              </span>
              <span className='block w-full text-[20vw] leading-[0.8]'>studio</span>
            </h1>
          </div>
          <div className="w-full absolute h-screen text-white text-5xl">
      
        {showCanvas && data[2].map((item,index)=>(
            <Canvas key={index}  details={item} />
          ))}

          </div>
          <div id="about" data-scroll-section className='w-full min-h-screen mt-16 sm:mt-32 p-4 sm:p-10'>
            <h2 className='text-3xl sm:text-5xl font-semibold'>
            OUR SERVICES
            </h2>
            <p className='text-lg sm:text-2xl leading-[1.8] sm:leading-[2] tracking-tight mt-4 sm:mt-5 mb-6 sm:mb-10 font-[300] md:mt-10 md:w-[80%] '>
              We're a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
              <br />
              We provide captivating design, interactive animations, advancedusability, reliablecode, and immaculate project coordination. Whether you need a campaign built from scratch or assistance at a specific phase, we’ve got you covered.
            </p>
            
            <img
              id='projects' 
              src="https://api.funkhaus.us/wp-content/uploads/2024/08/Hero-Image-1-808x540.jpg" 
              alt="" 
              className="w-screen h-screen object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App