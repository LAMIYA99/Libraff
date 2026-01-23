"use client";
import { useState } from "react";

const LanguageFilter = () => {
  const [activeLang, setActiveLang] = useState("Azərbaycan");
  const langs = [
    { name: "Azərbaycan" },
    { name: "Rusca" },
    { name: "Türkcə" },
  ];
  return (
    <div>
      <ul className="flex items-center gap-3">
        {langs.map((lang, index) => (
          <li
            onClick={() => setActiveLang(lang.name)}
            key={index}
            className={
              activeLang === lang.name
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
