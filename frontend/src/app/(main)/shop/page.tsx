"use client";
import ShopSorting from "@/components/features/ShopSorting";
import Sidebar from "@/components/features/Sidebar";
import BookCard from "@/components/shared/BookCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PaginationButtons from "@/components/ui/PaginationButtons";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/types/global";
import api from "@/services/api";
import { useSearchParams } from "next/navigation";

const Shop = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["shop-books", search],
    queryFn: () => api.get(`/books${search ? `?search=${search}` : ""}`),
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
              {search
                ? `"${search}" üçün axtarış nəticələri`
                : "Bütün kitablar"}
            </h1>
            <p className="text-gray-500 mt-1">{books.length} məhsul tapıldı</p>
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
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-3xl">
              <p className="text-gray-500 text-lg">Heç bir kitab tapılmadı.</p>
              <button
                onClick={() => (window.location.href = "/shop")}
                className="mt-4 text-[#ef3340] font-bold hover:underline"
              >
                Bütün kitablara bax
              </button>
            </div>
          )}

          {books.length > 0 && (
            <div className="flex items-center justify-between mt-10">
              <PaginationButtons
                title="Geri"
                prevIcon={<ArrowLeft size={15} />}
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
                title="İrəli"
                nextIcon={<ArrowRight size={15} />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
