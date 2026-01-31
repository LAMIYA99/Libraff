"use client";

import BookCard from "@/components/shared/BookCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { useWishlist } from "@/context/WishlistContext";
import { Link } from "@/i18n/routing";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";

const FavoritesPage = () => {
  const { wishlist } = useWishlist();
  const t = useTranslations("Favorites");

  return (
    <div className="max-w-[1500px] mx-auto px-5 py-12">
      <Breadcrumb />

      <div className="mt-10 mb-8 border-b border-gray-100 pb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#ef3340]">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-[32px] font-bold text-[#14151A]">
              {t("title")}
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {t("items_count", { count: wishlist.length })}
            </p>
          </div>
        </div>
        <Link
          href="/shop"
          className="text-sm font-bold text-[#ef3340] hover:underline"
        >
          {t("return")}
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((book: any) => (
            <BookCard
              key={book.id || book._id}
              id={book.id || book._id}
              image={book.image}
              title={book.title}
              price={book.price}
              discountPrice={book.discountPrice}
              rating={book.rating}
              numReviews={book.numReviews}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-gray-50/50 rounded-[32px] border-2 border-dashed border-gray-100">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 mb-6">
            <Heart size={40} />
          </div>
          <h2 className="text-[20px] font-bold text-[#14151A] mb-2">
            {t("empty")}
          </h2>
          <p className="text-gray-500 mb-8 text-center max-w-[300px]">
            {t("empty_desc")}
          </p>
          <Link
            href="/shop"
            className="px-8 py-4 bg-[#ef3340] text-white rounded-full font-bold shadow-lg shadow-red-500/20 hover:bg-[#d92c38] transition-all"
          >
            {t("start_shopping")}
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
