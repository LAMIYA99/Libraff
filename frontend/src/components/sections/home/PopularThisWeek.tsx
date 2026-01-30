import BookCard from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/SectionHeading";

const PopularThisWeek = () => {
  return (
    <section>
      <SectionHeading
        title="Həftənin ən çox baxılanları"
        highlight="baxılanları"
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
    </section>
  );
};

export default PopularThisWeek;
