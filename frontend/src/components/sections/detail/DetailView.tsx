"use client";

import { Copy, Heart, MessageCircle, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import ProductDescription from "./detailDescription/ProductDescription";
import { useCart } from "@/context/CartContext";
import { Book } from "@/types/global";

interface DetailViewProps {
  product: Book | null;
}

const DetailView = ({ product }: DetailViewProps) => {
  const { addToCart } = useCart();

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ef3340]"></div>
      </div>
    );

  const discount = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100,
      )
    : 0;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 py-4 gap-[30px]">
        <div className="col-span-1 md:col-span-7 flex items-center justify-center w-full min-h-[400px] md:min-h-[600px] bg-[#f6f6f8] rounded-2xl overflow-hidden relative">
          <Image
            src={
              product.image ||
              "https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
            }
            alt={product.title}
            fill
            className="object-contain p-10 mix-blend-multiply"
            sizes="(max-width: 768px) 100vw, 58vw"
          />
        </div>
        <div className="col-span-1 md:col-span-5 flex flex-col pt-4">
          <div className="flex items-center gap-2 text-[#767676] text-[14px]">
            <span className="font-bold">Kod:</span>
            <Copy
              size={14}
              className="cursor-pointer hover:text-[#ef3340] transition-colors"
            />
            <span>{product.code}</span>
          </div>

          <h2 className="text-[32px] text-[#14151A] mt-6 font-bold leading-tight">
            {product.title}
          </h2>

          <div className="mt-2 group cursor-pointer inline-block">
            <span className="text-[#64748b] text-[16px] underline hover:text-[#ef3340] transition-colors">
              Hektor Qarsiya{" "}
            </span>
          </div>

          <ul className="mt-4 flex items-center gap-[10px]">
            <li className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  fill={s <= 4 ? "#ef3340" : "none"}
                  color="#ef3340"
                />
              ))}
              <span className="text-[14px] text-gray-500 ml-1">4.6</span>
            </li>
            <li className="text-gray-400 text-[14px]">•</li>
            <li className="text-[#ef3340] text-[14px] font-medium cursor-pointer hover:underline">
              Rəylər: 5
            </li>
          </ul>

          <div className="flex flex-col gap-1 py-8">
            <div className="flex items-center gap-4">
              <span className="text-[32px] font-bold text-[#14151A]">
                {(product.discountPrice || product.price).toFixed(2)} ₼
              </span>
              {product.discountPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-[18px] text-[#8E93A1] line-through font-medium">
                    {product.price.toFixed(2)} ₼
                  </span>
                  <span className="px-2 py-0.5 bg-[#ef3340] text-white rounded-md text-[12px] font-bold">
                    -{discount}%
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full py-4 bg-[#ef3340] text-white rounded-full font-bold flex items-center justify-center gap-2 mb-6 hover:bg-[#d92c38] transition-all active:scale-[0.98] shadow-lg shadow-red-500/20"
          >
            <ShoppingBag size={20} /> Səbətə əlavə et
          </button>

          <div className="flex flex-col gap-6 text-[#64748b]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <button className="flex items-center gap-2 hover:text-[#ef3340] transition-colors font-medium">
                <Heart size={20} /> Seçilmişlər
              </button>
              <button className="flex items-center gap-2 hover:text-[#ef3340] transition-colors font-medium">
                <MessageCircle size={20} /> Dəstək
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-[#14151A] text-[18px]">
                Çatdırılma haqqında
              </h4>
              <ul className="space-y-4 text-[14px]">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} />
                  </div>
                  <span>
                    Mağazadan təhvil alma —{" "}
                    <span className="font-bold text-[#14151A]">pulsuz</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                    <ShoppingBag size={16} /> {/* Truck icon would be better */}
                  </div>
                  <span>
                    Kuryer ilə — operator təsdiqindən sonra 24 saat ərzində. 30
                    AZN və yuxarı sifarişlərdə —{" "}
                    <span className="font-bold text-[#14151A]">pulsuz</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProductDescription product={product} />
    </div>
  );
};

export default DetailView;
