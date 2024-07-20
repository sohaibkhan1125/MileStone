'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const Head = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    console.log("Menu toggled. Current state:", !isMenuOpen);
  };

  return (
    <div className='mb-20 md:mb-20'>
      <nav className="bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center  justify-between w-full md:w-auto">
            <div>
              <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/logo1.png" className="h-[60px] md:h-[100px] " alt="Logo" />
              </a>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse md:hidden">
              <Link href={'/dashboard'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl hidden md:block'>Get Started</button>
              </Link>
              <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuOpen}>
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
              <Link href={'/'}>
                <li>
                  <p className="block py-2 px-3 text-white rounded md:bg-transparent " aria-current="page">Home</p>
                </li>
              </Link>
              <Link href={'/about'}>
                <li>
                  <p className="block py-2 px-3 text-white rounded">About Us</p>
                </li>
              </Link>
              <Link href={'/contact'}>
                <li>
                  <p className="block py-2 px-3 text-white rounded">Contact</p>
                </li>
              </Link>
              <Link href={'/privacy-policy'}>
                <li>
                  <p className="block py-2 px-3 text-white rounded">Privacy Policy</p>
                </li>
              </Link>
              <Link href={'/dashboard'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl block md:hidden mt-5'>Get Started</button>
              </Link>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse md:order-2">
            <Link href={'/dashboard'}>
              <button className='bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full'>Get Started</button>
            </Link>
            <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuOpen}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5 md:hidden" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Head;
