import { CartItem } from "@/components/shared/Carditem";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { CircleCheckBig } from "lucide-react";

export default function CartPage() {
  return (
    <div className="max-w-375 mx-auto px-5 py-12 bg-white">
      <Breadcrumb />
      <h1 className="text-2xl md:text-3xl font-semibold mb-8">
        Səbətdə olanlar
      </h1>

      <div className="grid grid-cols-12 text-gray-500 text-sm border-b border-gray-300 pb-3 mb-6">
        <div className="col-span-6">Məhsul</div>
        <div className="col-span-2 text-center">Qiyməti</div>
        <div className="col-span-2 text-center">Say</div>
        <div className="col-span-2 text-right">Cəm (₼)</div>
      </div>

      <CartItem
        image="/book1.jpg"
        title="Bir şey"
        code="9789952540031"
        price={7.92}
        oldPrice={9.9}
      />

      <CartItem
        image="/book2.jpg"
        title="Düşüncənin Gücü"
        code="2270130146727"
        price={3.2}
        oldPrice={4.0}
      />

      <div className="border border-gray-300 rounded-2xl p-6 mt-10">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="Promokod"
              className="border border-gray-300 rounded-l-lg px-4 py-2 w-full md:w-64 outline-none"
            />
            <button className="bg-gray-200 px-4 rounded-r-lg font-medium">
              Tətbiq et
            </button>
          </div>

          <div className="text-right text-lg font-semibold">
            Cəm məbləğ (₼) <span className="ml-3 text-xl">11.12 ₼</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-10 bg-gray-50 p-6 rounded-2xl">
        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-full font-medium">
            Alış-verişə davam et
          </button>
          <button className="border-2 border-red-500 text-red-500 px-6 py-3 rounded-full font-medium">
            Səbəti təmizlə
          </button>
        </div>

        <button className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2">
          <CircleCheckBig /> Sifarişi təsdiqlə
        </button>
      </div>
    </div>
  );
}
