import {
  ChevronDown,
  Grid2x2,
  Heart,
  Search,
  ShoppingBag,
  User,
} from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="max-w-[1500px] mx-auto px-[20px]">
      <div className="grid grid-cols-12  items-center">
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
            <button
              className=" gap-1
              font-nunito
              text-[16px]
border-0
    flex items-center justify-center
    h-[44px] min-w-[140px] 
    px-[15px]
    rounded-full
    bg-[#ef3340]
    text-white text-base font-bold
    cursor-pointer
    transition-colors duration-150
    hover:bg-[#d92c38]
  "
            >
              <Grid2x2 /> Kataloq
            </button>
            <div className="relative border-2 border-[#cbd5e1] overflow-hidden w-full  rounded-[22px]">
              <input
                type="text"
                placeholder="Növbəti kitabınızı axtarın"
                className="
      w-full
      h-[44px]
      px-[12px] pr-[44px] 
      bg-transparent
      text-base
      overflow-hidden
      text-ellipsis
      shadow-[0_0_0_1px_#f2f2f5]
      outline-none
      font-nunito
    "
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
          <button className="flex items-center gap-2 px-4 py-2 rounded-full  bg-[#F4F6FC] text-[#1e293b] font-bold text-md  hover:text-[#ef3340] transition-colors">
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
      <nav className="flex items-center justify-between  py-4 bg-white">
        <ul className="flex space-x-6 font-medium text-gray-800">
          <li>
            <a href="#" className="hover:text-blue-600">
              Bestseller – Dekabr
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Endirimlər
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Müəlliflər
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-600">
              Klassiklər
            </a>
          </li>
        </ul>

        <ul className="flex space-x-4 text-sm text-gray-600">
          <li>
            <a href="#" className="hover:text-gray-800">
              Ödəniş və çatdırılma
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800">
              Tədbirlər
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800">
              Loyallıq Kartı
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-800">
              Əlaqə
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
