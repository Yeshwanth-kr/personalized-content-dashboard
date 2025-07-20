"use client";

import React from "react";

const Icon = ({ className }: { className: string }) => (
  <div className={`w-5 h-5 rounded-sm ${className}`} />
);

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
}) => {
  const navItems = [
    { id: "feed", label: "My Feed", iconColor: "bg-blue-500" },
    { id: "trending", label: "Trending", iconColor: "bg-red-500" },
    { id: "favorites", label: "Favorites", iconColor: "bg-yellow-500" },
  ];

  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-6 flex-shrink-0 flex-col h-full hidden md:flex">
      <h1 className="text-2xl font-bold text-blue-600 mb-10">ContentDeck</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.id} className="mb-4">
              <button
                onClick={() => setActiveView(item.id)}
                className={`flex items-center w-full text-left p-2 rounded-lg transition-colors duration-200 
                  ${
                    activeView === item.id
                      ? "text-gray-900 dark:text-gray-100 font-semibold bg-blue-100 dark:bg-gray-800"
                      : "text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-800"
                  }`}
              >
                <Icon className={item.iconColor} />
                <span className="ml-4">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
