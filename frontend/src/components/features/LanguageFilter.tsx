"use client";
import { useState } from "react";

interface LanguageFilterProps {
  activeLang: string;
  onLanguageChange: (lang: string) => void;
}

const LanguageFilter = ({
  activeLang,
  onLanguageChange,
}: LanguageFilterProps) => {
  const langs = [
    { name: "Azərbaycan", value: "AZE" },
    { name: "Rusca", value: "RUS" },
    { name: "Türkcə", value: "TUR" },
  ];

  return (
    <div>
      <ul className="flex items-center gap-3 flex-wrap">
        {langs.map((lang, index) => (
          <li
            onClick={() => onLanguageChange(lang.value)}
            key={index}
            className={
              activeLang === lang.value
                ? "active text-black border-b-2 border-[#ef3340] py-1 cursor-pointer duration-300 text-[18px] leading-[36px] font-nunito font-normal"
                : " text-gray-400 hover:border-b-2 hover:border-gray-400 border-b-2 border-transparent py-1 cursor-pointer duration-300 text-[18px] leading-[36px] font-nunito font-normal"
            }
          >
            {lang.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageFilter;
