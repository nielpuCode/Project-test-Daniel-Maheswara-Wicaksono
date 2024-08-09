"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-orange-500 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Suitmedia Logo"
            width={120}
            height={120} 
            className="w-[120px] h-[50px] md:w-[150px] md:h-[70px]"
          />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="text-white hover:text-gray-200 focus:outline-none font-extrabold"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu */}
        <ul className={`flex-col md:flex-row space-y-8 md:space-y-0 md:flex md:space-x-8 text-white text-sm font-medium ${isOpen ? 'absolute bg-orange-500 w-full text-center top-14 left-0 rounded-b-xl' : 'hidden'} md:flex`}>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0 border-">
            <a href="#">Work</a>
          </li>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0">
            <a href="#">About</a>
          </li>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0">
            <a href="#">Services</a>
          </li>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0 relative">
            <a href="#" className="active-link">Ideas</a>
            {/* <div className="absolute left-0 bottom-[-10px] h-[3px] w-full bg-white"></div> */}
          </li>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0">
            <a href="#">Careers</a>
          </li>
          <li className="hover:underline hover:text-gray-200 transition py-3 sm:-py-0 border-0">
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
