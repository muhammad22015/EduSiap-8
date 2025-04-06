"use client";

import { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Home");

  const menuItems = [
    { name: "Home", icon: "🏠" },
    { name: "Explore", icon: "🌍" },
    { name: "Subscriptions", icon: "📺" },
    { name: "Library", icon: "📚" },
  ];

  return (
    <aside className="fixed top-14 left-0 w-16 md:w-56 h-full bg-[#FBC190] z-40 border-r text-black">
      <div className="flex flex-col py-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`flex items-center px-2 py-3 mx-1 rounded-lg hover:bg-gray-100 ${
              activeItem === item.name ? "bg-gray-100 font-medium" : ""
            }`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="text-xl mr-4">{item.icon}</span>
            <span className="hidden md:inline">{item.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}