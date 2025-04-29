// components/Header.tsx
"use client";
import React, { useState } from 'react';
import { SearchBar } from './SearchBar';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  initialSearch?: string;
}

export const Header: React.FC<HeaderProps> = ({ initialSearch = '' }) => {
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    const isHomepage = pathname === '/HomePage';
    const url = `/HomePage${query ? `?q=${encodeURIComponent(query)}` : ''}`;
    
    if (isHomepage) {
      // Replace instead of push to avoid adding to history stack
      router.replace(url, { scroll: false });
    } else {
      router.push(url);
    }
  };

  return (
    <header className="fixed top-0 left-[97px] right-0 z-50 bg-white shadow-sm px-4 sm:px-20 flex justify-between items-center h-[101px]">
      <h1 className="text-3xl text-black font-bold">Logo</h1>
      
      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
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
        <div className="rounded-xl h-[69px] w-[69px] object-cover border-2 border-gray-200 overflow-hidden cursor-pointer">
          {/* Replace with your actual profile image */}
          <img 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/80479b3752c51b9cbb466836e9396b3b4d62b33e" 
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Dropdown Menu */}
        {isProfileHovered && (
          <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
            <Link href="/profile" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                My Profile
            </Link>
            <Link href="/settings" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Settings
            </Link>
            <Link href="/logout" passHref className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};