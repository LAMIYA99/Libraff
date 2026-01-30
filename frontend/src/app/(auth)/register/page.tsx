"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronDown } from "lucide-react";

const RegisterPage = () => {
  return (
    <div className="bg-white font-nunito px-4 py-8 lg:px-20 lg:py-12">
      <div className="mb-12">
        <Link href="/">
          <div className="relative w-[150px] h-[40px]">
            <Image
              src="https://www.libraff.az/images/logos/1305/logo_b1x3-5c.png"
              alt="Libraff Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="max-w-[400px]">
          <h1 className="text-[32px] font-bold text-[#14151A] mb-8">
            Hesab yaradın
          </h1>

          <div className="flex flex-col gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 w-full py-3.5 border border-gray-300 rounded-full text-[15px] font-medium text-[#14151A] hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-4v-4H6v-2h4V7h4v4h4v2h-4v4z" />
              </svg>
              Loyallıq kartı ilə qeydiyyat
            </button>
            <button className="flex items-center justify-center gap-3 w-full py-3.5 border border-gray-300 rounded-full text-[15px] font-medium text-[#14151A] hover:bg-gray-50 transition-colors">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={18}
                height={18}
              />
              Google hesabı ilə daxil ol
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <span className="relative px-4 bg-white text-[14px] text-gray-400 font-medium italic">
              və ya
            </span>
          </div>

          <form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                Telefon <span className="text-[#ef3340]">*</span>
              </label>
              <div className="flex gap-2">
                <div className="flex-1 flex border border-gray-200 rounded-[12px] bg-white overflow-hidden focus-within:border-[#ef3340] transition-colors">
                  <div className="px-4 flex items-center text-gray-500 border-r border-gray-100 bg-gray-50">
                    +994
                  </div>
                  <input
                    type="tel"
                    className="flex-1 px-4 py-3 outline-none text-[15px]"
                    placeholder=" "
                  />
                </div>
                <div className="flex items-center gap-2 px-3 border border-gray-200 rounded-[12px] cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-[20px]">🇦🇿</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                E-poçt <span className="text-[#ef3340]">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors"
                placeholder=" "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                Şifrə <span className="text-[#ef3340]">*</span>
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors"
                placeholder=" "
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ef3340] text-white py-4 rounded-full text-[16px] font-extrabold hover:bg-[#d92c38] transition-all hover:shadow-lg active:scale-[0.98] mt-2"
            >
              Qeydiyyat
            </button>
          </form>

          <p className="mt-6 text-[14px] text-gray-600">
            Hesabınız var?{" "}
            <Link
              href="/login"
              className="text-[#ef3340] hover:underline font-bold"
            >
              Daxil ol
            </Link>
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="grid md:grid-cols-3 lg:grid-cols-1 gap-8">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#ef3340] shrink-0" />
              <div>
                <h3 className="text-[18px] font-bold text-[#14151A] mb-1">
                  Şəxsi kabinet
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Sifariş tarixçəsi, qaimələr, seçilmişlər siyahısı və
                  yazışmalar
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#ef3340] shrink-0" />
              <div>
                <h3 className="text-[18px] font-bold text-[#14151A] mb-1">
                  Sürətli alış-veriş
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Sifariş zamanı çatdırılma detalları avtomatik doldurulsun
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#ef3340] shrink-0" />
              <div>
                <h3 className="text-[18px] font-bold text-[#14151A] mb-1">
                  Endirimlər və xüsusi təkliflər
                </h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">
                  Hesabınızla sizə özəl kampaniyalardan xəbərdar olun
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full aspect-4/3 mt-auto">
            <Image
              src="/reading-illustration.png"
              alt="Reading Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
