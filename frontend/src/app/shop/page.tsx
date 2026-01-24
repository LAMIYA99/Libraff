import ShopSorting from "@/components/features/ShopSorting";
import Sidebar from "@/components/features/Sidebar";
import BookCard from "@/components/shared/BookCard";
import PaginationButtons from "@/components/ui/PaginationButtons";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Shop = () => {
  return (
    <div className="max-w-375 mx-auto px-5 py-12 flex flex-col gap-12">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <Sidebar />
        </div>
        <div className="col-span-9">
          <ShopSorting />
          <div className="grid grid-cols-4 gap-4">
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
            <BookCard
              image="https://www.libraff.az/images/thumbnails/400/600/from_1c/f8a032c0-5053-11eb-a4d2-503eaa128442_1_1759181531.jpg.webp"
              title="test"
              price={199.99}
              disCountPrice={99.99}
            />
          </div>
          <div className="flex items-center justify-between mt-10">
            <PaginationButtons title="Geri" prevIcon={<ArrowLeft size={15} />} />
            <div className="flex items-center justify-center gap-2">
              <PaginationButtons pageCount="1" />
              <PaginationButtons pageCount="2" />
              <PaginationButtons pageCount="3" />
              <PaginationButtons pageCount="4" />
              <PaginationButtons pageCount="5" />
              <PaginationButtons pageCount="6" />
            </div>
            <PaginationButtons title="İrəli" nextIcon={<ArrowRight size={15} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
