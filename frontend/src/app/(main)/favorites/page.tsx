"use client";

import Link from "next/link";

const FavoritesPage = () => {
  return (
    <div className="max-w-[1500px] mx-auto px-4 lg:px-[20px] py-10 font-nunito bg-white min-h-[60vh]">
      <h1 className="text-[24px] font-bold text-[#14151A] mb-8">
        Əlavə edilmişlər
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-4/3 bg-[#F8F9FA] rounded-[12px] flex items-center justify-center border border-gray-100/50"
          >
            <span className="text-[#B1B5C3] text-[18px] font-medium">Boş</span>
          </div>
        ))}
      </div>

      <div className="bg-[#F8F9FA] p-6 rounded-[20px] flex items-center">
        <Link
          href="/"
          className="bg-[#14151A] text-white px-8 py-3 rounded-full text-[15px] font-extrabold hover:bg-black transition-all hover:shadow-lg active:scale-95"
        >
          Alış-verişə davam et
        </Link>
      </div>
    </div>
  );
};

export default FavoritesPage;
