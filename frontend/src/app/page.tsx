import BookSwiper from "@/components/features/homeBanner";
import SectionHeading from "@/components/shared/sectionHeading";
import LanguageFilter from "@/components/ui/languageFilter";
import BookCards from "@/components/shared/bookCards";

export default function Home() {
  return (
    <div className="">
      <BookSwiper />
      <div className="max-w-[1500px] mx-auto px-[20px] py-12">
        <SectionHeading title="Bugünün seçimləri" />
        <LanguageFilter />
        <div className="grid grid-cols-6 gap-1">
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
          <BookCards
            image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
            title="test"
            price={199.99}
            disCountPrice={99.99}
          />
        </div>
      </div>
    </div>
  );
}
