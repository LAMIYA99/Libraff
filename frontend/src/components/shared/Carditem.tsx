import Image from "next/image";
import { X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface Props {
  id: any;
  image: string;
  title: string;
  price: number;
  quantity: number;
}

export function CartItem({ id, image, title, price, quantity }: Props) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="grid grid-cols-12 items-center py-6 border-b border-gray-300">
      <div className="col-span-6 flex gap-4">
        <Image
          src={
            image || "https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
          }
          alt={title}
          width={80}
          height={110}
          className="object-cover rounded"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-red-600">{title}</h3>
            <X
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => removeFromCart(id)}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">ID: {id}</p>
          <span className="inline-block mt-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
            Məhsul
          </span>
        </div>
      </div>

      <div className="col-span-2 text-center">
        <span className="font-medium">{price.toFixed(2)} ₼</span>
      </div>

      <div className="col-span-2 flex justify-center items-center gap-2">
        <button
          onClick={() => updateQuantity(id, -1)}
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          -
        </button>
        <span className="w-8 text-center">{quantity}</span>
        <button
          onClick={() => updateQuantity(id, 1)}
          className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
        >
          +
        </button>
      </div>

      <div className="col-span-2 text-right font-semibold">
        {(price * quantity).toFixed(2)} ₼
      </div>
    </div>
  );
}
