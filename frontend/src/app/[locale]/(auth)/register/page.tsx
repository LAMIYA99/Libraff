"use client";

import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { CheckCircle2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import authService from "@/services/authService";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Ad mütləqdir"),
  lastName: Yup.string().required("Soyad mütləqdir"),
  email: Yup.string()
    .email("Düzgün e-poçt ünvanı daxil edin")
    .required("E-poçt mütləqdir"),
  password: Yup.string()
    .min(6, "Şifrə ən az 6 simvoldan ibarət olmalıdır")
    .required("Şifrə mütləqdir"),
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        console.log("Google token received", tokenResponse.access_token);
        const data = await api.post("/auth/google", {
          token: tokenResponse.access_token,
        });
        console.log("Google login success", data);
        login(data);
        toast.success("Hesabınız yaradıldı!");
        window.location.href = "/";
      } catch (error: any) {
        console.error("Google login error details:", error);
        toast.error(
          error.response?.data?.message ||
            "Google ilə giriş baş tutmadı: " + error.message,
        );
      } finally {
        setIsLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login failed", errorResponse);
      toast.error("Google ilə giriş ləğv edildi və ya xəta baş verdi");
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const data = await authService.register(values);
        login(data);
        toast.success("Hesabınız yaradıldı!");
        window.location.href = "/";
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Xəta baş verdi");
      } finally {
        setIsLoading(false);
      }
    },
  });

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
        <div className="max-w-[500px] w-full">
          <h1 className="text-[32px] font-bold text-[#14151A] mb-8">
            Hesab yaradın
          </h1>

          <div className="flex flex-col gap-4 mb-8">
            <button
              onClick={() => handleGoogleLogin()}
              className="flex items-center justify-center gap-3 w-full py-3.5 border border-gray-300 rounded-full text-[15px] font-medium text-[#14151A] hover:bg-gray-50 transition-colors"
            >
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

          <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#14151A]">
                  Ad <span className="text-[#ef3340]">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className={`w-full border ${formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors`}
                  placeholder=" "
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-bold text-[#14151A]">
                  Soyad <span className="text-[#ef3340]">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className={`w-full border ${formik.touched.lastName && formik.errors.lastName ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors`}
                  placeholder=" "
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                E-poçt <span className="text-[#ef3340]">*</span>
              </label>
              <input
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full border ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors`}
                placeholder=" "
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-500 text-xs">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-bold text-[#14151A]">
                Şifrə <span className="text-[#ef3340]">*</span>
              </label>
              <input
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full border ${formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors`}
                placeholder=" "
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-500 text-xs">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#ef3340] text-white py-4 rounded-full text-[16px] font-extrabold hover:bg-[#d92c38] transition-all hover:shadow-lg active:scale-[0.98] mt-2 disabled:opacity-70"
            >
              {isLoading ? "Yüklənir..." : "Qeydiyyat"}
            </button>
          </form>

          <p className="mt-6 text-[14px] text-gray-600">
            Hesabınız var?{" "}
            <Link href="/" className="text-[#ef3340] hover:underline font-bold">
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
