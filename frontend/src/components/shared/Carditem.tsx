import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  image: string;
  title: string;
  code: string;
  price: number;
  oldPrice: number;
}

export function CartItem({ image, title, code, price, oldPrice }: Props) {
  return (
    <div className="grid grid-cols-12 items-center py-6 border-b border-gray-300">
      <div className="col-span-6 flex gap-4">
        <Image
          src={image}
          alt={title}
          width={80}
          height={110}
          className="object-cover rounded"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-red-600">{title}</h3>
            <X size={16} className="text-red-500 cursor-pointer" />
          </div>
          <p className="text-sm text-gray-500 mt-1">Kod: {code}</p>
          <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
            Endirim
          </span>
        </div>
      </div>

      <div className="col-span-2 text-center">
        <span className="line-through text-gray-400 mr-2">
          {oldPrice.toFixed(2)} ₼
        </span>
        <span className="font-medium">{price.toFixed(2)} ₼</span>
      </div>

      <div className="col-span-2 flex justify-center">
        <input
          type="number"
          defaultValue={1}
          className="w-16 border border-gray-300 outline-0 rounded-lg text-center py-1"
        />
      </div>

      <div className="col-span-2 text-right font-semibold">
        {(price * 1).toFixed(2)} ₼
      </div>
    </div>
  );
}
