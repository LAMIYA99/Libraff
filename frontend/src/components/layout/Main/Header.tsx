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
  LogOut,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import CartDropdown from "@/components/features/CartDropdown";
import LoginModal from "@/components/features/LoginModal";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname, Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTranslations, useLocale } from "next-intl";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const t = useTranslations("Header");
  const tCommon = useTranslations("Common");
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { isCartOpen, setIsCartOpen, cart: cartItems } = useCart();
  const { wishlist } = useWishlist();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isAdmin } = useAuth();
  const accountRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedUser = localStorage.getItem("libraff_user");
    if (storedUser && !user) {
      try {
      } catch (e) {
        console.error("Header localstorage parse error", e);
      }
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    setIsAccountOpen(false);
  };

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchQuery(query);

    const showLogin = searchParams.get("login");
    if (showLogin === "true" && !user) {
      setIsLoginModalOpen(true);
    }
  }, [searchParams, user]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const handleLanguageChange = (newLocale: "az" | "en") => {
    router.replace(pathname, { locale: newLocale });
    setIsLangOpen(false);
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
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                <Link href="/" className="relative block w-full h-full">
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
                onClick={() =>
                  user
                    ? setIsAccountOpen(!isAccountOpen)
                    : setIsLoginModalOpen(true)
                }
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
              placeholder={t("search_placeholder")}
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

        <div className="hidden lg:grid grid-cols-12 items-center py-4">
          <div className="col-span-3 w-[175px] relative h-[120px]">
            <Link href="/" className="relative block w-full h-full">
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
              <button className="gap-2 font-nunito text-[16px] border-0 flex items-center justify-center h-[44px] min-w-[140px] px-[20px] rounded-full bg-[#ef3340] text-white text-base font-bold cursor-pointer transition-colors duration-150 hover:bg-[#d92c38]">
                <Grid2x2 size={20} /> {t("catalog")}
              </button>
              <form
                onSubmit={handleSearch}
                className="relative flex-1 border-2 border-[#cbd5e1] overflow-hidden rounded-[22px]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("search_placeholder")}
                  className="w-full h-[44px] px-[12px] pr-[44px] bg-transparent text-base shadow-[0_0_0_1px_#f2f2f5] outline-none font-nunito"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
                >
                  <Search size={22} />
                </button>
              </form>
            </div>
          </div>
          <div className="col-span-3 flex items-center justify-end gap-6">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-[#1e293b] font-bold text-sm hover:text-[#ef3340] transition-colors uppercase"
              >
                <Globe size={18} className="text-[#ef3340]" />
                {locale}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                  <button
                    onClick={() => handleLanguageChange("az")}
                    className={`w-full text-left px-4 py-2 text-sm font-nunito hover:bg-gray-50 ${locale === "az" ? "text-[#ef3340] font-bold" : "text-gray-600"}`}
                  >
                    Azerbaijani
                  </button>
                  <button
                    onClick={() => handleLanguageChange("en")}
                    className={`w-full text-left px-4 py-2 text-sm font-nunito hover:bg-gray-50 ${locale === "en" ? "text-[#ef3340] font-bold" : "text-gray-600"}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={accountRef}>
              <button
                onClick={() =>
                  user
                    ? setIsAccountOpen(!isAccountOpen)
                    : setIsLoginModalOpen(true)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-md transition-all duration-200 ${isAccountOpen ? "bg-white shadow-sm ring-1 ring-gray-100" : "bg-[#F4F6FC] hover:bg-[#E8EDFB]"} text-[#1e293b]`}
              >
                <User className="w-5 h-5 text-[#ef3340]" />
                {user ? `${user.firstName}` : t("account")}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isAccountOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-gray-50 mb-1">
                    <p className="text-xs text-gray-400">Logged in as:</p>
                    <p className="text-sm font-bold text-[#14151A] truncate">
                      {user?.email}
                    </p>
                  </div>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-[#ef3340] font-bold hover:bg-gray-50 transition-colors"
                    >
                      <Grid2x2 size={16} /> Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User size={16} /> {t("account")}
                  </Link>
                  <Link
                    href="/favorites"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Heart size={16} /> {t("favorites")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} /> {t("logout")}
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/favorites"
              className="relative text-[#1e293b] hover:text-[#ef3340] transition-colors"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ef3340] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

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
          <ul className="flex space-x-6 font-bold text-gray-800 font-nunito text-[15px]">
            {["bestseller", "discounts", "authors", "classics"].map((key) => (
              <li key={key}>
                <Link
                  href="#"
                  className="hover:text-[#ef3340] transition-colors"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex space-x-6 text-[13px] text-gray-500 font-nunito font-medium">
            {[
              "payment_shipping",
              "events",
              "loyalty_card",
              "faq",
              "contact",
            ].map((key) => (
              <li key={key}>
                <Link
                  href="#"
                  className="hover:text-[#ef3340] transition-colors"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-white z-60 py-6 px-5 flex flex-col gap-6 font-nunito animate-in slide-in-from-left duration-300">
          <div className="flex flex-col gap-1">
            {["bestseller", "discounts", "authors", "classics"].map((key) => (
              <Link
                key={key}
                href="#"
                className="text-xl font-bold text-gray-800 py-3 border-b border-gray-50"
              >
                {t(key)}
              </Link>
            ))}
          </div>

          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleLanguageChange("az")}
              className={`flex-1 py-3 rounded-xl border ${locale === "az" ? "border-[#ef3340] text-[#ef3340] bg-red-50 font-bold" : "border-gray-100 text-gray-500"}`}
            >
              AZE
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`flex-1 py-3 rounded-xl border ${locale === "en" ? "border-[#ef3340] text-[#ef3340] bg-red-50 font-bold" : "border-gray-100 text-gray-500"}`}
            >
              ENG
            </button>
          </div>

          <div className="flex flex-col gap-3 text-[14px] text-gray-500 mt-2">
            {[
              "payment_shipping",
              "events",
              "loyalty_card",
              "faq",
              "contact",
            ].map((key) => (
              <Link key={key} href="#" className="py-1 hover:text-[#ef3340]">
                {t(key)}
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              user ? handleLogout() : setIsLoginModalOpen(true);
            }}
            className="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[#ef3340] text-white font-bold shadow-lg shadow-red-500/20"
          >
            {user ? <LogOut size={20} /> : <User size={20} />}
            {user ? t("logout") : t("login")}
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
