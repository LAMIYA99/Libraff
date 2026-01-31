"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const LANGUAGES = ["AZE", "AZE/ENG", "AZE/RUS", "ENG", "RUS", "TUR"];

export default function Sidebar() {
  const t = useTranslations("Sidebar");
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const langs = searchParams.get("language")?.split(",") || [];
    setSelectedLangs(langs.filter(Boolean));
    setInStock(searchParams.get("inStock") === "true");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setCategory(searchParams.get("category") || "");
  }, [searchParams]);

  const updateFilters = (
    newFilters: Record<string, string | string[] | boolean | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0) ||
        value === false
      ) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`/shop?${params.toString()}`);
  };

  const handleLangToggle = (lang: string) => {
    const updated = selectedLangs.includes(lang)
      ? selectedLangs.filter((l) => l !== lang)
      : [...selectedLangs, lang];
    setSelectedLangs(updated);
    updateFilters({ language: updated });
  };

  const handleCategoryClick = (cat: string) => {
    const newCat = category === cat ? "" : cat;
    setCategory(newCat);
    updateFilters({ category: newCat });
  };

  return (
    <div className="w-full lg:w-[300px] space-y-4">
      <div className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
        <h3 className="mb-4 font-bold text-[#14151A] font-nunito flex items-center justify-between">
          {t("categories")}
        </h3>

        <ul className="space-y-3 text-[14px] text-gray-600 font-nunito">
          <li
            onClick={() => handleCategoryClick("Aksiya")}
            className={`cursor-pointer hover:text-[#ef3340] transition-colors ${category === "Aksiya" ? "text-[#ef3340] font-bold" : ""}`}
          >
            Aksiya
          </li>
          <li
            onClick={() => handleCategoryClick("Dəftərxana")}
            className={`cursor-pointer hover:text-[#ef3340] transition-colors ${category === "Dəftərxana" ? "text-[#ef3340] font-bold" : ""}`}
          >
            Dəftərxana
          </li>

          <li className="relative font-bold text-[#14151A] pt-2">
            <span className="absolute -left-5 top-3 h-5 w-1 rounded bg-[#ef3340]" />
            {t("books")}
          </li>

          <ul className="ml-4 mt-2 space-y-3">
            {[
              "Bədii ədəbiyyat",
              "Qeyri-bədii ədəbiyyat",
              "Bədii uşaq ədəbiyyatı",
              "Qeyri-bədii uşaq ədəbiyyatı",
            ].map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`cursor-pointer hover:text-[#ef3340] transition-colors ${category === cat ? "text-[#ef3340] font-bold" : ""}`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 p-5 space-y-6 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h3 className="font-bold text-[#14151A] font-nunito">
            {t("filters")}
          </h3>
          <button
            onClick={() => router.push("/shop")}
            className="text-[12px] text-gray-400 hover:text-[#ef3340] transition-colors"
          >
            {t("reset")}
          </button>
        </div>

        <div>
          <h4 className="mb-3 font-bold text-[15px] text-[#14151A] font-nunito">
            {t("language")}
          </h4>
          <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {LANGUAGES.map((lang) => (
              <label
                key={lang}
                className="flex cursor-pointer items-center gap-3 group"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedLangs.includes(lang)}
                    onChange={() => handleLangToggle(lang)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:border-[#ef3340] checked:bg-[#ef3340]"
                  />
                  <svg
                    className="absolute left-1 top-1 h-3 w-3 fill-white opacity-0 transition-opacity peer-checked:opacity-100"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
                <span className="text-[14px] text-gray-600 group-hover:text-black transition-colors">
                  {lang}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr className="border-gray-100" />

        <div>
          <h4 className="mb-3 font-bold text-[15px] text-[#14151A] font-nunito">
            {t("stock")}
          </h4>
          <label className="flex cursor-pointer items-center gap-3 group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => {
                  setInStock(e.target.checked);
                  updateFilters({ inStock: e.target.checked });
                }}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:border-[#ef3340] checked:bg-[#ef3340]"
              />
              <svg
                className="absolute left-1 top-1 h-3 w-3 fill-white opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </div>
            <span className="text-[14px] text-gray-600 group-hover:text-black transition-colors">
              {t("in_stock")}
            </span>
          </label>
        </div>

        <hr className="border-gray-100" />

        <div>
          <h4 className="mb-4 font-bold text-[15px] text-[#14151A] font-nunito">
            {t("price")}
          </h4>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onBlur={() => updateFilters({ minPrice })}
                placeholder="Min"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ef3340] transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">
                ₼
              </span>
            </div>
            <span className="text-gray-300">—</span>
            <div className="relative flex-1">
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onBlur={() => updateFilters({ maxPrice })}
                placeholder="Max"
                className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#ef3340] transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-gray-400">
                ₼
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
