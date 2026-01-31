"use client";
import ShopSorting from "@/components/features/ShopSorting";
import Sidebar from "@/components/features/Sidebar";
import BookCard from "@/components/shared/BookCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PaginationButtons from "@/components/ui/PaginationButtons";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types/global";
import api from "@/services/api";
import { useSearchParams } from "next/navigation";
import { LucideArrowLeft, LucideArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const Shop = () => {
  const t = useTranslations("Shop");
  const tCommon = useTranslations("Common");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const language = searchParams.get("language") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const inStock = searchParams.get("inStock") || "";
  const sort = searchParams.get("sort") || "";
  const limit = searchParams.get("limit") || "16";

  const queryParams = new URLSearchParams();
  if (search) queryParams.set("search", search);
  if (category) queryParams.set("category", category);
  if (language) queryParams.set("language", language);
  if (minPrice) queryParams.set("minPrice", minPrice);
  if (maxPrice) queryParams.set("maxPrice", maxPrice);
  if (inStock) queryParams.set("inStock", inStock);
  if (sort) queryParams.set("sort", sort);
  if (limit) queryParams.set("limit", limit);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["shop-books", queryParams.toString()],
    queryFn: () => api.get(`/books?${queryParams.toString()}`),
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ef3340]"></div>
      </div>
    );

  return (
    <div className="max-w-[1500px] mx-auto px-5 py-12 flex flex-col gap-12">
      <Breadcrumb />
      <div className="grid grid-cols-12 gap-8">
        <div className="hidden lg:block col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-12 lg:col-span-9">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#14151A]">
              {search ? t("search_results", { query: search }) : t("all_books")}
            </h1>
            <p className="text-gray-500 mt-1">
              {t("items_found", { count: books.length })}
            </p>
          </div>

          <ShopSorting />

          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id || (book as any)._id}
                  id={book.id || (book as any)._id}
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
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-gray-500 text-lg">{t("no_books")}</p>
              <button
                onClick={() => (window.location.href = "/shop")}
                className="mt-4 text-[#ef3340] font-bold hover:underline"
              >
                {t("view_all")}
              </button>
            </div>
          )}

          {books.length > 0 && (
            <div className="flex items-center justify-between mt-10">
              <PaginationButtons
                title={tCommon("back")}
                prevIcon={<LucideArrowLeft size={15} />}
              />
              <div className="hidden sm:flex items-center justify-center gap-2">
                <PaginationButtons pageCount="1" />
                <PaginationButtons pageCount="2" />
                <PaginationButtons pageCount="3" />
                <PaginationButtons pageCount="4" />
                <PaginationButtons pageCount="5" />
                <PaginationButtons pageCount="6" />
              </div>
              <PaginationButtons
                title={tCommon("next")}
                nextIcon={<LucideArrowRight size={15} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
