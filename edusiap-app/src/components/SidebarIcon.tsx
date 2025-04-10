import React from 'react';

interface SidebarIconProps {
  name: string;
  svg: string;
}

export const SidebarIcon: React.FC<SidebarIconProps> = ({ name, svg }) => {
  return (
    <div className="flex relative flex-col justify-center items-center h-[71px] text-zinc-700 w-[65px]">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
      {name === 'Story Books' && (
        <div className="mt-1.5 text-xs text-center">{name}</div>
      )}
    </div>
  );
};