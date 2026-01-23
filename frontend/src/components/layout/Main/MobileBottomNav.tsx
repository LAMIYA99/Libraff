

import { Menu, Search, ShoppingBag, User, Phone } from "lucide-react";
import Link from "next/link";


const MobileBottomNav = () => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white z-100 border-t border-gray-100 pb-safe">
      <div className="grid grid-cols-5 h-[60px]">
        <button className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#ef3340]">
          <Menu className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-nunito">Menyu</span>
        </button>

        <button className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#ef3340]">
          <Search className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-nunito">Axtarış</span>
        </button>

        <Link
          href="/cart"
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#ef3340]"
        >
          <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-nunito">Səbət</span>
        </Link>

        <Link
          href="/profile"
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#ef3340]"
        >
          <User className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-nunito">Hesabım</span>
        </Link>

        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#ef3340]"
        >
          <Phone className="w-6 h-6" strokeWidth={1.5} />
          <span className="text-[10px] font-nunito">Əlaqə</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileBottomNav;
