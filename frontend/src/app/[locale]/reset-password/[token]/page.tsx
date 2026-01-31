"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import { Lock, CheckCircle } from "lucide-react";
import Link from "next/link";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Şifrə ən azı 6 simvoldan ibarət olmalıdır")
    .required("Şifrə mütləqdir"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Şifrələr uyğun gəlmir")
    .required("Şifrə təsdiqi mütləqdir"),
});

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = params.token as string;

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await api.post(`/auth/reset-password/${token}`, {
          password: values.password,
        });
        setIsSuccess(true);
        toast.success("Şifrə uğurla dəyişdirildi!");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ||
            "Token etibarsızdır və ya vaxtı keçib",
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-white px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Şifrə uğurla dəyişdirildi!
          </h1>
          <p className="text-gray-600 mb-8">
            Şifrəniz uğurla yeniləndi. İndi yeni şifrənizlə daxil ola
            bilərsiniz.
          </p>
          <Link
            href="/"
            className="inline-block w-full bg-[#ef3340] text-white py-4 rounded-full text-[16px] font-extrabold shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98]"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-[#ef3340]" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Yeni şifrə təyin edin
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm">
          Yeni şifrənizi daxil edin və təsdiqləyin
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#14151A]">
              Yeni şifrə <span className="text-[#ef3340]">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full border ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-[12px] px-4 py-3.5 outline-none focus:border-[#ef3340] transition-colors text-[15px]`}
              placeholder="••••••••"
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-500 text-xs">
                {formik.errors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-[#14151A]">
              Şifrə təsdiqi <span className="text-[#ef3340]">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`w-full border ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-200"
              } rounded-[12px] px-4 py-3.5 outline-none focus:border-[#ef3340] transition-colors text-[15px]`}
              placeholder="••••••••"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </span>
              )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#ef3340] text-white py-4 mt-2 rounded-full text-[16px] font-extrabold shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Yenilənir..." : "Şifrəni yenilə"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-[14px] text-gray-500 hover:text-gray-700 font-medium"
          >
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    </div>
  );
}
