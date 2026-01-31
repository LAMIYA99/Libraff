"use client";

import LanguageFilter from "@/components/features/LanguageFilter";
import BookCard from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/sectionHeading";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Loader2 } from "lucide-react";
import { Book } from "@/types/global";

const TodayChoicesSection = () => {
  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["today-choices"],
    queryFn: () => api.get("/books?limit=6"),
  });

  return (
    <div>
      <SectionHeading title="Bugünün seçimləri" />
      <LanguageFilter />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-h-[300px]">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : books.length > 0 ? (
          books.map((book: any) => (
            <BookCard
              key={book.id || book._id}
              id={book.id || book._id}
              image={
                book.image ||
                "https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
              }
              title={book.title}
              price={book.price}
              discountPrice={book.discountPrice}
              rating={book.rating}
              numReviews={book.numReviews}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            Kitab tapılmadı
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayChoicesSection;
