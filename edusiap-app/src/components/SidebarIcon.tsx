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
      router.push('/HomePage')
    }
  };


  return (
    <div
      className="sidebar-icon my-2 cursor-pointer"
      title={name}
      onClick={handleClick}
    >
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};
