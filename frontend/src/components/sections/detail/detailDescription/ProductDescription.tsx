"use client";
import { useState } from "react";
import Description from "./Description";
import Features from "./Features";
import Reviews from "./Reviews";
import { Book } from "@/types/global";

interface ProductDescriptionProps {
  product: Book;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  const [activeTab, setActiveTab] = useState<"desc" | "features" | "reviews">(
    "desc",
  );

  return (
    <div className="w-full flex items-center justify-center flex-col mt-10">
      <div className="gap-8 md:gap-24 lg:gap-[16rem] px-6 md:px-12 border-b-2 border-[#eee] w-full flex items-center justify-center text-[18px] md:text-[20.8px] font-medium">
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
            {product.numReviews || 0}
          </span>
          {activeTab === "reviews" && (
            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-red-500" />
          )}
        </button>
      </div>

      <div className="px-6 md:px-12 py-10 w-full max-w-4xl">
        {activeTab === "desc" && <Description text={product.description} />}
        {activeTab === "features" && <Features features={product.features} />}
        {activeTab === "reviews" && <Reviews />}
      </div>
    </div>
  );
}
