"use client";

import { X } from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister?: () => void;
}

const LoginModal = ({ isOpen, onClose, onOpenRegister }: LoginModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center">
   
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-[500px] max-w-[95%] bg-white rounded-[24px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-[24px] font-bold text-[#14151A]">Daxil ol</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#8E93A1]" />
          </button>
        </div>

        <div className="p-10 flex flex-col pt-8">
          <button className="flex items-center justify-center gap-3 w-full py-4 bg-[#F2F2F2] hover:bg-[#E8E8E8] rounded-full text-[15px] font-medium text-[#14151A] transition-colors mb-8">
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-[18px] h-[18px]"
            />
            Google hesabı ilə daxil ol
          </button>

          <div className="relative flex items-center justify-center mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <span className="relative px-4 bg-white text-[14px] text-gray-400 italic">
              və ya
            </span>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                E-poçt <span className="text-[#ef3340]">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#ef3340] transition-colors text-[15px]"
                placeholder=" "
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-bold text-[#14151A]">
                  Şifrə <span className="text-[#ef3340]">*</span>
                </label>
                <Link
                  href="#"
                  className="text-[13px] text-[#ef3340] hover:underline font-medium"
                >
                  Şifrəni unutdum
                </Link>
              </div>
              <input
                type="password"
                className="w-full border border-gray-200 rounded-[12px] px-4 py-3.5 outline-none focus:border-[#ef3340] transition-colors text-[15px]"
                placeholder=" "
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ef3340] text-white py-4 mt-2 rounded-full text-[16px] font-extrabold shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98]"
            >
              Daxil ol
            </button>
          </form>

          <div className="mt-8 text-center text-[14px] text-gray-500">
            Hesabınız yoxdur?{" "}
            <button
              onClick={() => {
                onClose();
                onOpenRegister?.();
              }}
              className="text-[#ef3340] font-bold hover:underline"
            >
              Qeydiyyatdan keçin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
