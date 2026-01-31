"use client";

import BookCard from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Book } from "@/types/global";

const TeasPress = () => {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["teas-press-books"],
    queryFn: () => api.get("/books?limit=6"),
  });

  if (isLoading) return null;

  return (
    <section>
      <SectionHeading title="TEAS Press" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {books?.slice(0, 6).map((book) => (
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
      <div className="flex justify-center mt-10">
        <button className="px-10 py-2.5 border-2 border-[#ef3340] rounded-full text-[#14151A] font-nunito font-semibold hover:bg-[#ef3340] hover:text-white transition-all duration-300">
          Daha çox göstər
        </button>
      </div>
    </section>
  );
};

export default TeasPress;
