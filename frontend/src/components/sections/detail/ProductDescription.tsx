"use client";
import { useState } from "react";

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState<"desc" | "features" | "reviews">(
    "desc",
  );

  return (
    <div className="w-full border-t">
      {/* Tabs Header */}
      <div className="flex items-center gap-10 px-6 md:px-12 border-b text-sm md:text-base font-medium">
        <button
          onClick={() => setActiveTab("desc")}
          className={`py-4 relative transition ${
            activeTab === "desc"
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Təsvir
          {activeTab === "desc" && (
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("features")}
          className={`py-4 relative transition ${
            activeTab === "features"
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Xüsusiyyəti
          {activeTab === "features" && (
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`py-4 relative flex items-center gap-2 transition ${
            activeTab === "reviews"
              ? "text-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          İstifadəçi rəyləri
          <span className="bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            5
          </span>
          {activeTab === "reviews" && (
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500" />
          )}
        </button>
      </div>

      {/* Tabs Content */}
      <div className="px-6 md:px-12 py-10">
        {activeTab === "desc" && <Description />}
        {activeTab === "features" && <Features />}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
}
