import LanguageFilter from "@/components/features/LanguageFilter";
import BookCard from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/SectionHeading";

const TodayChoicesSection = () => {
  return (
    <div>
      <SectionHeading title="Bugünün seçimləri" />
      <LanguageFilter />
      <div className="grid grid-cols-6 gap-1">
        <BookCard
          image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
          title="test"
          price={199.99}
          disCountPrice={99.99}
        />
        <BookCard
          image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
          title="test"
          price={199.99}
          disCountPrice={99.99}
        />
        <BookCard
          image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
          title="test"
          price={199.99}
          disCountPrice={99.99}
        />
      </div>
    </div>
  );
};

export default TodayChoicesSection;
