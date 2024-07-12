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
    <div>
      <nav className="bg-transparent border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className=''>
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse md:-mt-5">
              <img src="/logo.png" className="h-[150px]" alt="Logo" />
            </a>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse md:hidden">
              <Link href={'/dashboard'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg hidden md:block'>Get Started</button>
              </Link>
              <button onClick={toggleMenu} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded={isMenuOpen}>
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            </div>
          </div>
          <div className={`items-center justify-between w-full md:-mt-20 md:flex md:w-auto ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-user">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link href={'/'}>
                <li>
                  <p className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</p>
                </li>
              </Link>
              <Link href={'/about'}>
                <li>
                  <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</p>
                </li>
              </Link>
              <Link href={'/contact'}>
                <li>
                  <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</p>
                </li>
              </Link>
              <Link href={'/privacy-policy'}>
                <li>
                  <p className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Privacy Policy</p>
                </li>
              </Link>
              <Link href={'/dashboard'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg block md:hidden mt-5'>Get Started</button>
              </Link>
            </ul>
          </div>
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse md:order-2 md:-mt-20">
            <Link href={'/dashboard'}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>Get Started</button>
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
