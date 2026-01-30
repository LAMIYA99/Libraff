"use client";

import {
  ChevronDown,
  Grid2x2,
  Heart,
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow-sm lg:shadow-none z-50">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-[20px]">
        <div className="lg:hidden flex flex-col pb-4 pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[#1e293b]"
              >
                {isMenuOpen ? (
                  <X className="w-7 h-7" />
                ) : (
                  <Menu className="w-7 h-7" />
                )}
              </button>

              <div className="w-[100px] relative h-[30px]">
                <Link href="/">
                  <Image
                    src="https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
                    alt="logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-[#1e293b]">
                <User className="w-6 h-6" />
              </Link>
              <button className="text-[#1e293b]">
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden w-full rounded-[22px]">
            <input
              type="text"
              placeholder="Növbəti kitabınızı axtarın"
              className="w-full h-[44px] px-[16px] pr-[44px] bg-transparent text-[15px] shadow-none outline-none font-nunito placeholder:text-gray-500 text-[#14151A]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-12 items-center py-4">
          <div className="col-span-3 w-[175px] relative h-[120px]">
            <Image
              src="https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
              alt="logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <div className="col-span-6">
            <div className="flex items-center gap-[22px]">
              <button className="gap-1 font-nunito text-[16px] border-0 flex items-center justify-center h-[44px] min-w-[140px] px-[15px] rounded-full bg-[#ef3340] text-white text-base font-bold cursor-pointer transition-colors duration-150 hover:bg-[#d92c38]">
                <Grid2x2 /> Kataloq
              </button>
              <div className="relative border-2 border-[#cbd5e1] overflow-hidden w-full rounded-[22px]">
                <input
                  type="text"
                  placeholder="Növbəti kitabınızı axtarın"
                  className="w-full h-[44px] px-[12px] pr-[44px] bg-transparent text-base overflow-hidden text-ellipsis shadow-[0_0_0_1px_#f2f2f5] outline-none font-nunito"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-black" />
              </div>
            </div>
          </div>
          <div className="col-span-3 flex items-center justify-end gap-4">
            <button className="flex items-center gap-1 text-[#1e293b] font-medium text-sm hover:text-[#ef3340] transition-colors">
              AZ
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F4F6FC] text-[#1e293b] font-bold text-md hover:text-[#ef3340] transition-colors">
              <User className="w-4 h-4" />
              Hesabım
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="text-[#1e293b] hover:text-[#ef3340] transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="text-[#1e293b] hover:text-[#ef3340] transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-between py-4 bg-white border-t border-gray-100">
          <ul className="flex space-x-6 font-medium text-gray-800 font-nunito">
            <li>
              <Link href="#" className="hover:text-[#ef3340]">
                Bestseller – Dekabr
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ef3340]">
                Endirimlər
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ef3340]">
                Müəlliflər
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#ef3340]">
                Klassiklər
              </Link>
            </li>
          </ul>
          <ul className="flex space-x-4 text-sm text-gray-600 font-nunito">
            <li>
              <Link href="#" className="hover:text-gray-800">
                Ödəniş və çatdırılma
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-800">
                Tədbirlər
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-800">
                Loyallıq Kartı
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-800">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-800">
                Əlaqə
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-[80px] left-0 w-full bg-white shadow-md py-4 px-4 flex flex-col gap-4 font-nunito">
          <div className="flex flex-col gap-2">
            <Link
              href="#"
              className="text-lg font-bold text-gray-800 py-2 border-b border-gray-100"
            >
              Bestseller – Dekabr
            </Link>
            <Link
              href="#"
              className="text-lg font-bold text-gray-800 py-2 border-b border-gray-100"
            >
              Endirimlər
            </Link>
            <Link
              href="#"
              className="text-lg font-bold text-gray-800 py-2 border-b border-gray-100"
            >
              Müəlliflər
            </Link>
            <Link
              href="#"
              className="text-lg font-bold text-gray-800 py-2 border-b border-gray-100"
            >
              Klassiklər
            </Link>
          </div>
          <div className="flex flex-col gap-2 mt-4 text-sm text-gray-600">
            <Link href="#" className="py-1">
              Ödəniş və çatdırılma
            </Link>
            <Link href="#" className="py-1">
              Tədbirlər
            </Link>
            <Link href="#" className="py-1">
              Loyallıq Kartı
            </Link>
            <Link href="#" className="py-1">
              FAQ
            </Link>
            <Link href="#" className="py-1">
              Əlaqə
            </Link>
          </div>
          <Link
            href="/login"
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#ef3340] text-white font-bold"
          >
            <User className="w-5 h-5" /> Daxil ol
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
