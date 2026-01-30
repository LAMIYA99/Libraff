import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BookCardProps {
  id: number | string;
  image: string;
  title: string;
  price: number;
  discountPrice?: number;
}

const BookCard = ({
  id,
  image,
  title,
  price,
  discountPrice,
}: BookCardProps) => {
  return (
    <div className="mt-6">
      <Link
        href={`/shop/${id}`}
        className="group cursor-pointer relative transition-all duration-300 hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0),0_0_10px_rgba(0,0,0,0.25)] rounded-lg p-[15px] border border-gray-200 block"
      >
        <div className="relative aspect-3/5 mb-3 overflow-hidden rounded-lg bg-[#F6F6F8]">
          <Image
            src={image || ""}
            alt={title || ""}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
          />
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 duration-300 text-gray-400 hover:text-red-500 bg-white w-9 h-9 flex items-center justify-center rounded-full">
          <Heart size={20} />
        </div>
        <div className="flex gap-2 min-h-[87px] flex-col items-start">
          <h3 className="text-[14px] leading-[20px] font-nunito font-normal text-gray-800 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-nunito font-bold text-black">
              {(discountPrice || price)?.toFixed(2)} ₼
            </span>
            {discountPrice && (
              <span className="text-[14px] font-nunito font-normal text-gray-400 line-through">
                {price?.toFixed(2)} ₼
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
