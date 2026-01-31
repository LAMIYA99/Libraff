"use client";

import { Heart, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useTranslations } from "next-intl";

interface BookCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
  rating?: number;
  numReviews?: number;
}

const BookCard = ({
  id,
  image,
  title,
  price,
  discountPrice,
  rating = 0,
  numReviews = 0,
}: BookCardProps) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const t = useTranslations("Product");

  const isFavorite = isInWishlist(id);

  const discount = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, image, title, price, discountPrice });
  };

  return (
    <Link
      href={`/shop/${id}`}
      className="group bg-white rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-gray-100 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative aspect-3/4 mb-4 bg-[#f8f9fa] rounded-xl overflow-hidden flex items-center justify-center p-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-contain p-4 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[#ef3340] text-white text-[11px] font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 p-2.5 rounded-full shadow-sm transition-all duration-300 ${
            isFavorite
              ? "bg-[#ef3340] text-white"
              : "bg-white text-gray-400 hover:text-[#ef3340] hover:scale-110"
          }`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-white/90 to-transparent">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#ef3340] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#d92c38] transition-colors shadow-lg shadow-red-500/20"
          >
            <ShoppingBag size={18} /> {t("add_to_cart")}
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={12}
                fill={s <= Math.round(rating) ? "#ef3340" : "none"}
                color="#ef3340"
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">({numReviews})</span>
        </div>

        <h3 className="text-[14px] font-bold text-[#14151A] mb-2 line-clamp-2 leading-snug group-hover:text-[#ef3340] transition-colors">
          {title}
        </h3>

        <div className="mt-auto flex items-center gap-2">
          <span className="text-[18px] font-black text-[#14151A]">
            {(discountPrice || price).toFixed(2)} ₼
          </span>
          {discountPrice && (
            <span className="text-[13px] text-gray-400 line-through">
              {price.toFixed(2)} ₼
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
