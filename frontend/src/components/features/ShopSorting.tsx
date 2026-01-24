import { ChevronDown } from "lucide-react";

const ShopSorting = () => {
  return (
    <div className="flex items-center gap-5">
      <h2 className="flex items-center gap-2 leading-[36px] text-[#767676] text-[14px] font-nunito font-normal">
        Çeşidlə:
        <span className="flex items-center gap-1 text-[#ef3340] cursor-pointer">
          Əvvəlcə populyar olanlar <ChevronDown size={13} />
        </span>
      </h2>
      <h2 className="flex items-center gap-2 leading-[36px] text-[#767676] text-[14px] font-nunito font-normal">
        Göstər:
        <span className="flex items-center gap-1 text-[#ef3340] cursor-pointer">
          16 <ChevronDown size={13} />
        </span>
      </h2>
    </div>
  );
};

export default ShopSorting;
