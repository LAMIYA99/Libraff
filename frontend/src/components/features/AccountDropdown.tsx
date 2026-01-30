"use client";

import Link from "next/link";
import { Play } from "lucide-react";

interface AccountDropdownProps {
  onOpenLogin?: () => void;
}

const AccountDropdown = ({ onOpenLogin }: AccountDropdownProps) => {
  return (
    <div className="absolute right-0 top-[calc(100%+12px)] w-[320px] bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 font-nunito border border-gray-100/50 animate-in fade-in zoom-in-95 duration-200">
      <div className="absolute top-[-6px] right-[48px] w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>

      <div className="p-6 flex flex-col gap-4">
        <Link
          href="/orders"
          className="text-[#14151A] text-[16px] font-semibold hover:text-[#ef3340] transition-colors"
        >
          Sifarişlər
        </Link>
        <Link
          href="/returns"
          className="text-[#14151A] text-[16px] font-semibold hover:text-[#ef3340] transition-colors"
        >
          Qaytarma sorğuları
        </Link>
        <Link
          href="/favorites"
          className="text-[#14151A] text-[16px] font-semibold hover:text-[#ef3340] transition-colors"
        >
          Seçilmişlər
        </Link>
      </div>

      <div className="bg-[#F8F9FA] p-6 pt-5">
        <label className="text-[#8E93A1] text-[14px] font-medium mb-3 block">
          Sifarişi izləmək
        </label>
        <div className="flex bg-white border border-[#E2E8F0] rounded-[14px] overflow-hidden mb-6 focus-within:border-[#ef3340] transition-all duration-200">
          <input
            type="text"
            placeholder="Sifariş nömrəsi/E-poçt"
            className="flex-1 px-4 py-3 text-[14px] outline-none placeholder:text-[#B1B5C3] text-[#14151A]"
          />
          <button className="px-4 border-l border-[#E2E8F0] text-[#B1B5C3] hover:text-[#ef3340] group transition-colors">
            <Play
              fill="currentColor"
              className="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
            />
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onOpenLogin}
            className="flex-1 bg-[#14151A] text-white text-center py-3.5 rounded-full text-[15px] font-extrabold hover:bg-black transition-all hover:shadow-lg active:scale-95 cursor-pointer"
          >
            Daxil ol
          </button>
          <Link
            href="/register"
            className="flex-1 bg-[#ef3340] text-white text-center py-3.5 rounded-full text-[15px] font-extrabold hover:bg-[#d92c38] transition-all hover:shadow-lg active:scale-95"
          >
            Qeydiyyat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
