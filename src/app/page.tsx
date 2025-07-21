"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { PersonalizedFeed } from "@/components/PersonalizedFeed";
import { FavoritesSection } from "@/components/FavoritesSection";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeView, setActiveView] = useState("feed");

  const renderContent = () => {
    // We wrap the component in a key-ed div for AnimatePresence to track it
    switch (activeView) {
      case "feed":
        return (
          <div key="feed">
            <PersonalizedFeed />
          </div>
        );
      case "favorites":
        return (
          <div key="favorites">
            <FavoritesSection />
          </div>
        );
      case "trending":
        return (
          <div key="trending" className="p-10">
            Trending Section Coming Soon!
          </div>
        );
      default:
        return (
          <div key="feed">
            <PersonalizedFeed />
          </div>
        );
    }
  };
  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </main>
    </div>
  );
}
