"use client";

import BookCard from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Book } from "@/types/global";

const MostSearched = () => {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["most-searched"],
    queryFn: () => api.get("/books?limit=6"),
  });

  if (isLoading) return null;

  return (
    <section>
      <SectionHeading title="Ən çox axtarılanlar" highlight="axtarılanlar" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
    </section>
  );
};

export default MostSearched;
