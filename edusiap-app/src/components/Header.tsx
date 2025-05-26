// components/Header.tsx
"use client";
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

interface HeaderProps {
  initialSearch?: string;
}

export const Header: React.FC<HeaderProps> = ({ initialSearch = '' }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    const isHomepage = pathname === '/';
    const url = `/${query ? `?q=${encodeURIComponent(query)}` : ''}`;
    
    if (isHomepage) {
      // Replace instead of push to avoid adding to history stack
      router.replace(url, { scroll: false });
    } else {
      router.push(url);
    }
  };

  return (
    <header className="fixed top-0 left-[120px] right-0 z-50 bg-white  px-4 sm:px-20 flex justify-between items-center h-[101px] max-sm:bg-transparent max-sm:left-[50px] max-sm:top-3 max-sm:w-full">
      {/* <h1 className="text-3xl text-black font-bold max-xl:hidden">Logo</h1> */}
      <div className='max-xl:hidden'>
        <Link href="/" passHref>
            <Image 
              src="/3-removebg-preview.png" 
              alt="logo" 
              width={170} 
              height={170} 
              className="w-[170px] h-auto cursor-pointer" // Added cursor-pointer
            />
        </Link>
      </div>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 max-sm:max-w-3/4 max-sm:left-3/7">
        <SearchBar 
          onSearch={handleSearch}
          initialValue={initialSearch}
        />
      </div>
      
      {/* Profile Section with Dropdown */}
      <div 
        className="relative"
        onMouseEnter={() => setIsProfileHovered(true)}
        onMouseLeave={() => setIsProfileHovered(false)}
      >
        <div className="rounded-xl h-[69px] w-[69px] object-cover border-2 border-gray-200 overflow-hidden cursor-pointer max-xl:hidden">
          {/* Replace with your actual profile image */}
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80479b3752c51b9cbb466836e9396b3b4d62b33e" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Dropdown Menu */}
        {isProfileHovered && (
          <div className="absolute flex flex-col gap-1 right-0 w-48 rounded-md py-1 z-50">
            <Link href="/profile" passHref className="block px-4 py-2 text-sm bg-white border rounded-lg border-orange-400 text-gray-700 transition-colors hover:scale-105 hover:bg-orange-300 duration-200">
                My Profile
            </Link>
            {/* <Link href="/settings" passHref className="block px-4 py-2 text-sm bg-white border rounded-lg border-orange-400 text-gray-700 transition-colors hover:scale-105 hover:bg-orange-300 duration-200">
                Settings
            </Link> */}
            <Link href="/logout" passHref className="block px-4 py-2 text-sm bg-white border rounded-lg border-orange-400 text-gray-700 transition-colors hover:scale-105 hover:bg-orange-300 duration-200">
                Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};