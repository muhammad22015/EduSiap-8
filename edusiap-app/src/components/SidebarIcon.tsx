'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarIconProps {
  name: string;
  svg: string;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ name, svg }) => {
  const router = useRouter();

  const handleClick = () => {
    if (name === 'Story Books') {
      router.push('/pdfReader');
    }
    if (name == 'Home') {
      router.push('/')
    }
    if (name == 'User') {
      router.push('/Profile')
    }
  };


  return (
    <div
      className="sidebar-icon cursor-pointer"
      title={name}
      onClick={handleClick}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} className='flex items-center justify-evenly'></div>
      <span className='block relative -top-4 w-full text-center text-gray-700 font-bold text-lg'>{name}</span>
    </div>
  );
};
