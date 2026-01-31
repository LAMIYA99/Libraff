"use client";

import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { useTranslations } from "next-intl";

const SORT_OPTIONS = [
  { label_key: "popular", value: "popular" },
  { label_key: "newest", value: "newest" },
  { label_key: "price_low", value: "price-low" },
  { label_key: "price_high", value: "price-high" },
  { label_key: "rating_sort", value: "rating" },
];

const LIMIT_OPTIONS = [12, 16, 24, 32, 48];

const ShopSorting = () => {
  const t = useTranslations("Shop");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isLimitOpen, setIsLimitOpen] = useState(false);

  const currentSort = searchParams.get("sort") || "newest";
  const currentLimit = searchParams.get("limit") || "16";
  const currentSortLabel = t(
    SORT_OPTIONS.find((opt) => opt.value === currentSort)?.label_key ||
      "newest",
  );

  const handleUpdateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest" && key === "sort") {
      params.delete(key);
    } else if (value === "16" && key === "limit") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
    setIsSortOpen(false);
    setIsLimitOpen(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8 bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
      <div className="flex items-center gap-3 relative">
        <span className="text-[#767676] text-[14px] font-nunito">
          {t("sort")}:
        </span>
        <button
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsLimitOpen(false);
          }}
          className="flex items-center gap-1.5 text-[#ef3340] cursor-pointer font-bold text-[14px] hover:opacity-80 transition-all"
        >
          {currentSortLabel}{" "}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isSortOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleUpdateParam("sort", opt.value)}
                className={`w-full text-left px-4 py-2.5 text-[14px] font-nunito transition-colors hover:bg-gray-50 ${currentSort === opt.value ? "text-[#ef3340] font-bold" : "text-gray-600"}`}
              >
                {t(opt.label_key)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 relative">
        <span className="text-[#767676] text-[14px] font-nunito">
          {t("show")}:
        </span>
        <button
          onClick={() => {
            setIsLimitOpen(!isLimitOpen);
            setIsSortOpen(false);
          }}
          className="flex items-center gap-1.5 text-[#ef3340] cursor-pointer font-bold text-[14px] hover:opacity-80 transition-all"
        >
          {currentLimit}{" "}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isLimitOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isLimitOpen && (
          <div className="absolute top-full left-0 mt-2 w-24 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 animate-in fade-in slide-in-from-top-2">
            {LIMIT_OPTIONS.map((limit) => (
              <button
                key={limit}
                onClick={() => handleUpdateParam("limit", limit.toString())}
                className={`w-full text-center px-4 py-2.5 text-[14px] font-nunito transition-colors hover:bg-gray-50 ${currentLimit === limit.toString() ? "text-[#ef3340] font-bold" : "text-gray-600"}`}
              >
                {limit}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopSorting;
