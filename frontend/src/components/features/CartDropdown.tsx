"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { CartItem } from "@/types/global";

interface CartDropdownProps {
  items?: CartItem[];
  onClose: () => void;
}

const CartDropdown = ({ items = [], onClose }: CartDropdownProps) => {
  const isEmpty = items.length === 0;
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="absolute right-0 top-[calc(100%+12px)] w-[360px] bg-white rounded-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.12)] overflow-hidden z-50 font-nunito border border-gray-100/50 animate-in fade-in zoom-in-95 duration-200">
      <div className="absolute top-[-6px] right-[24px] w-3 h-3 bg-white rotate-45 border-t border-l border-gray-100"></div>

      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
        <h3 className="text-[#14151A] text-[16px] font-bold">
          Səbətdəki məhsullar:
        </h3>
        <button
          onClick={onClose}
          className="text-[#8E93A1] hover:text-[#14151A] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="min-h-[160px] max-h-[400px] overflow-y-auto">
        {isEmpty ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <p className="text-[#14151A] text-[16px]">Səbət boşdur</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={`flex gap-4 p-6 ${index !== items.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                <div className="relative w-[60px] h-[80px] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-sm"
                  />
                </div>
                <div className="flex flex-col gap-1 pr-2">
                  <Link
                    href={`/product/${item.id}`}
                    className="text-[#ef3340] text-[15px] font-medium leading-tight hover:underline line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <span className="text-[#14151A] text-[14px]">
                    {item.quantity} x {item.price.toFixed(2)} ₼
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#F8F9FA] p-6">
        {!isEmpty && (
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#14151A] text-[15px]">Cəmi:</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#8E93A1] text-[14px]">
                {totalQuantity} əd. qiymət
              </span>
              <span className="text-[#14151A] text-[16px] font-bold">
                {totalPrice.toFixed(2)} ₼
              </span>
            </div>
          </div>
        )}
        <Link
          href="/cart"
          className="flex items-center justify-center w-full py-4 rounded-full border-2 border-[#ef3340] text-[#14151A] text-[18px] font-bold hover:bg-[#ef3340]/5 transition-all active:scale-[0.98]"
        >
          Səbət
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
