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
import { useState, useRef, useEffect } from "react";
import AccountDropdown from "@/components/features/AccountDropdown";
import CartDropdown from "@/components/features/CartDropdown";
import LoginModal from "@/components/features/LoginModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { isCartOpen, setIsCartOpen, cart: cartItems } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchQuery(query);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="relative bg-white shadow-sm lg:shadow-none z-50">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-[20px]">
        {/* Mobile View */}
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
                    sizes="100px"
                  />
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="text-[#1e293b]"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                className="text-[#1e293b]"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingBag className="w-6 h-6" />
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSearch}
            className="relative border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden w-full rounded-[22px]"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Növbəti kitabınızı axtarın"
              className="w-full h-[44px] px-[16px] pr-[44px] bg-transparent text-[15px] shadow-none outline-none font-nunito placeholder:text-gray-500 text-[#14151A]"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-12 items-center py-4">
          <div className="col-span-3 w-[175px] relative h-[120px]">
            <Link href="/">
              <Image
                src="https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
                alt="logo"
                fill
                priority
                className="object-contain"
                sizes="175px"
              />
            </Link>
          </div>
          <div className="col-span-6">
            <div className="flex items-center gap-[22px]">
              <button className="gap-1 font-nunito text-[16px] border-0 flex items-center justify-center h-[44px] min-w-[140px] px-[15px] rounded-full bg-[#ef3340] text-white text-base font-bold cursor-pointer transition-colors duration-150 hover:bg-[#d92c38]">
                <Grid2x2 /> Kataloq
              </button>
              <form
                onSubmit={handleSearch}
                className="relative flex-1 border-2 border-[#cbd5e1] overflow-hidden rounded-[22px]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Növbəti kitabınızı axtarın"
                  className="w-full h-[44px] px-[12px] pr-[44px] bg-transparent text-base overflow-hidden text-ellipsis shadow-[0_0_0_1px_#f2f2f5] outline-none font-nunito"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  <Search />
                </button>
              </form>
            </div>
          </div>
          <div className="col-span-3 flex items-center justify-end gap-4">
            <button className="flex items-center gap-1 text-[#1e293b] font-medium text-sm hover:text-[#ef3340] transition-colors">
              AZ
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-md transition-all duration-200 ${
                  isAccountOpen
                    ? "bg-white shadow-sm ring-1 ring-gray-100"
                    : "bg-[#F4F6FC] hover:bg-[#E8EDFB]"
                } text-[#1e293b]`}
              >
                <User className="w-5 h-5 text-[#ef3340]" />
                Hesabım
                {isAccountOpen ? (
                  <ChevronDown className="w-4 h-4 rotate-180 transition-transform" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform" />
                )}
              </button>
              {isAccountOpen && (
                <AccountDropdown
                  onOpenLogin={() => {
                    setIsAccountOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                />
              )}
            </div>
            <button className="text-[#1e293b] hover:text-[#ef3340] transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`relative text-[#1e293b] hover:text-[#ef3340] transition-colors ${isCartOpen ? "text-[#ef3340]" : ""}`}
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ef3340] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {cartItems.length}
                  </span>
                )}
              </button>
              {isCartOpen && (
                <CartDropdown
                  items={cartItems}
                  onClose={() => setIsCartOpen(false)}
                />
              )}
            </div>
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
          <button
            onClick={() => {
              setIsMenuOpen(false);
              setIsLoginModalOpen(true);
            }}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#ef3340] text-white font-bold"
          >
            <User className="w-5 h-5" /> Daxil ol
          </button>
        </div>
      )}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenRegister={() => router.push("/register")}
      />
    </header>
  );
};

export default Header;
