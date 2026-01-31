"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import api from "@/services/api";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Düzgün e-poçt ünvanı daxil edin")
    .required("E-poçt mütləqdir"),
});

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await api.post("/auth/forgot-password", values);
        setEmailSent(true);
        toast.success("Şifrə sıfırlama linki e-poçtunuza göndərildi!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Xəta baş verdi");
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setEmailSent(false);
    formik.resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      <div className="relative w-[500px] max-w-[95%] bg-white rounded-[24px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        <div className="px-8 py-6 flex items-center justify-between border-b border-gray-50">
          <h2 className="text-[24px] font-bold text-[#14151A]">
            Şifrəni unutdum
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-[#8E93A1]" />
          </button>
        </div>

        <div className="p-10 flex flex-col pt-8">
          {emailSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Email göndərildi!
              </h3>
              <p className="text-gray-600 mb-6">
                Şifrə sıfırlama linki e-poçt ünvanınıza göndərildi. Zəhmət
                olmasa e-poçtunuzu yoxlayın.
              </p>
              <button
                onClick={handleClose}
                className="w-full bg-[#ef3340] text-white py-4 rounded-full text-[16px] font-extrabold shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98]"
              >
                Bağla
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-[15px] mb-8">
                E-poçt ünvanınızı daxil edin və şifrə sıfırlama linki
                göndərəcəyik.
              </p>

              <form
                className="flex flex-col gap-6"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-bold text-[#14151A]">
                    E-poçt <span className="text-[#ef3340]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={`w-full border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-[12px] px-4 py-3.5 outline-none focus:border-[#ef3340] transition-colors text-[15px]`}
                    placeholder="nümunə@mail.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-xs">
                      {formik.errors.email}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#ef3340] text-white py-4 mt-2 rounded-full text-[16px] font-extrabold shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Göndərilir..." : "Sıfırlama linki göndər"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={handleClose}
                  className="text-[14px] text-gray-500 hover:text-gray-700 font-medium"
                >
                  Geri qayıt
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
