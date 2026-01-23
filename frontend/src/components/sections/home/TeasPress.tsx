import BookCards from "@/components/shared/BookCard";
import SectionHeading from "@/components/shared/SectionHeading";

const TeasPress = () => {
  return (
    <section>
      <SectionHeading title="TEAS Press" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <BookCards
          image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
          title="test"
          price={199.99}
          disCountPrice={99.99}
        />
        <BookCards
          image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
          title="test"
          price={199.99}
          disCountPrice={99.99}
        />
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
