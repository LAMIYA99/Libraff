import { Copy, Heart, MessageCircle, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import ProductDescription from "./ProductDescription";

const DetailView = () => {
  return (
    <div className="grid grid-cols-12 py-4 gap-[30px]">
      <div className="col-span-7 flex items-center justify-center w-full min-h-[600px] bg-[#f6f6f8] rounded-md overflow-hidden">
        <Image
          src="https://www.libraff.az/images/thumbnails/600/600/from_1c/da6bc7ae-4cb1-11ee-a51a-503eaa120fc7_1_1759181846.jpg.webp"
          alt="Product Image"
          width={600}
          height={600}
          className="object-cover mix-blend-multiply"
        />
      </div>
      <div className="col-span-5">
        <h3 className="text-[#767676] text-[14px] font-nunito font-normal flex items-center gap-2">
          Kod:
          <Copy size={15} /> <span>9789952540116</span>
        </h3>
        <h2 className="leading-[1.2] text-[32px] text-[#1e293b] mb-[5px] mt-[30px] font-nunito font-medium">
          İkiqay
        </h2>
        <span className="text-[#64748b] text-[16px] underline font-nunito font-normal hover:text-red-500 duration-200 cursor-pointer">
          Hektor Qarsiya
        </span>
        <ul className="mt-[12px] flex items-center gap-[10px]">
          <li className="flex items-center gap-1">
            <Star size={18} color="#CC0D00" fill="#CC0D00" />
            <Star size={18} color="#CC0D00" fill="#CC0D00" />
            <Star size={18} color="#CC0D00" fill="#CC0D00" />
            <Star size={18} color="#CC0D00" fill="#CC0D00" />
            <Star size={18} color="#CC0D00" fill="#CC0D00" />
            <span className="text-[14px] text-gray-500 font-nunito">4.6</span>
          </li>
          <li className="text-[#ef3340] text-[14px] font-normal font-nunito">
            Rəylər: 5
          </li>
          <li className="text-[#ef3340] text-[14px] font-normal font-nunito underline cursor-pointer">
            Rəy yaz
          </li>
        </ul>
        <div className="flex items-start flex-col gap-1 py-[30px]">
          <span className="text-[28px] font-nunito font-bold leading-[1] tracking-[-0.02em] text-[#0f172a]">
            8.72₼
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[18px] text-[#767676] font-nunito line-through font-medium ">
              10.90 ₼
            </span>{" "}
            <button className="px-[6px] py-[2px] bg-[#ee2d39] text-white rounded-sm  text-[12px]">
              -20%
            </button>
          </div>
        </div>
        <button className="w-full py-4 bg-[#ee2d39] text-white rounded-[35px] font-nunito font-semibold flex items-center justify-center gap-2 mb-4 hover:bg-[#d32b2f] duration-200">
          <ShoppingBag size={20} /> Səbətə əlavə et
        </button>

        <div className="flex flex-col gap-3 text-[#64748b] text-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={18} /> Seçilmiş
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle size={18} /> Sizə necə kömək edə bilərik?
            </div>
          </div>

          <div className="mt-2 flex items-start flex-col gap-2    ">
            <h4 className="font-nunito font-bold text-[#1e293b] text-[18px] mb-1">
              Çatdırılma haqqında
            </h4>
            <p className="text-[#64748b] text-sm">
              Bakı şəhəri üçün təxminı müddət və qiymətlər:
            </p>
            <ul className="text-[#64748b] text-sm mt-1 space-y-1 flex items-start flex-col gap-2">
              <li className="flex items-center gap-1">
                <svg
                  style={{ verticalAlign: "sub" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="18"
                  height="18"
                  fill="#475569"
                >
                  <path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z"></path>
                </svg>{" "}
                Mağazadan təhvil alma —{" "}
                <span className="font-semibold">pulsuz</span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  style={{ verticalAlign: "sub" }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width="18"
                  height="18"
                  fill="#475569"
                >
                  <path d="M112 0C85.5 0 64 21.5 64 48l0 48L16 96c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 208 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 160l-16 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l16 0 176 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 224l-48 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l48 0 144 0c8.8 0 16 7.2 16 16s-7.2 16-16 16L64 288l0 128c0 53 43 96 96 96s96-43 96-96l128 0c0 53 43 96 96 96s96-43 96-96l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64 0-32 0-18.7c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7L416 96l0-48c0-26.5-21.5-48-48-48L112 0zM544 237.3l0 18.7-128 0 0-96 50.7 0L544 237.3zM160 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96zm272 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z"></path>
                </svg>{" "}
                <h2>
                  Kuryer ilə — operator təsdiqindən sonra 24 saat ərzində. 30
                  AZN və yuxarı sifarişlərdə — pulsuz.
                </h2>
              </li>
              <li className="flex items-center gap-1 border-t border-dotted w-full py-4">
                Bölgələrə çatdırılma{" "}
                <span className="font-semibold">3-5 iş günü</span> ərzində
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ProductDescription />
    </div>
  );
};

export default DetailView;
