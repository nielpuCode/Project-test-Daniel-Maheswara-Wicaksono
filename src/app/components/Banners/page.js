"use client"

import Image from 'next/image';
import { useEffect, useState } from 'react';
import SimpleParallax from "simple-parallax-js";

export default function ParallaxBanner() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="md:mt-14 relative border-0 max-w-screen min-h-screen" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%, 0 100%)'}}>
      <div className="absolute inset-0 max-w-screen border-0" style={{ transform: `translateY(${offset * 0.5}px)` }}>
        <SimpleParallax scale={1.2} overflow="true">
          <Image 
            src="/banner.png" 
            alt="Banner background" 
            layout="fill" 
            objectFit="cover" 
            quality={100}
          />
        </SimpleParallax>
      </div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-70 z-5"></div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
        <h1 className="text-6xl mb-2">Ideas</h1>
        <p className="text-2xl">Where all our great things begin</p>
      </div>
    </div>
  );
}
