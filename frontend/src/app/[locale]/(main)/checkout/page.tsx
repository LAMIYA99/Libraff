"use client";

import { useCart } from "@/context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { ChevronDown, MapPin, Trash2, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import { useTranslations } from "next-intl";

const CheckoutPage = () => {
  const t = useTranslations("Checkout");
  const { cart, removeFromCart, clearCart } = useCart();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const checkoutSchema = Yup.object().shape({
    fullName: Yup.string().required(t("full_name") + " is required"),
    phone: Yup.string().required(t("phone") + " is required"),
    email: Yup.string().email("Invalid email"),
    city: Yup.string().required(t("city") + " is required"),
    district: Yup.string().required(t("district") + " is required"),
    address: Yup.string().required(t("address") + " is required"),
    postalCode: Yup.string(),
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("libraff_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const subtotal = cart.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 4.9;
  const discount = cart.reduce((acc: number, item: any) => {
    if (item.discountPrice) {
      return acc + (item.price - item.discountPrice) * item.quantity;
    }
    return acc;
  }, 0);
  const total = subtotal + deliveryFee - discount;

  const formik = useFormik({
    initialValues: {
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      phone: "",
      email: user?.email || "",
      city: "Bakı",
      district: "Yasamal",
      address: "",
      postalCode: "",
    },
    enableReinitialize: true,
    validationSchema: checkoutSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const orderData = {
          customerName: values.fullName,
          customerEmail: values.email || "no-email@libraff.az",
          customerPhone: values.phone,
          address: `${values.city}, ${values.district}, ${values.address} ${values.postalCode ? `(Post: ${values.postalCode})` : ""}`,
          items: cart.map((item: any) => ({
            bookId: item.id,
            bookTitle: item.title,
            quantity: item.quantity,
            price: item.discountPrice || item.price,
          })),
          totalPrice: total,
        };

        await api.post("/orders", orderData);
        toast.success(t("order_success"));
        clearCart();
        router.push("/");
      } catch (error: any) {
        toast.error(error.response?.data?.message || t("order_failed"));
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">{t("cart_empty")}</h1>
        <Link href="/shop" className="text-[#ef3340] font-bold hover:underline">
          {t("return")}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen py-10">
      <div className="max-w-[1500px] mx-auto px-4 lg:px-[20px]">
        <h1 className="text-[32px] font-bold text-[#14151A] mb-8">
          {t("checkout")}
        </h1>

        {!user && (
          <p className="text-[14px] text-gray-500 mb-10">
            {t("have_account")}{" "}
            <button className="text-[#ef3340] font-bold hover:underline">
              {t("login")}
            </button>
          </p>
        )}

        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
            <section className="bg-white rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[18px] font-bold text-gray-400">
                  1
                </div>
                <h2 className="text-[22px] font-bold text-[#14151A]">
                  {t("personal_info")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-400">
                    {t("full_name")} <span className="text-[#ef3340]">*</span>
                  </label>
                  <input
                    name="fullName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                    className={`w-full border ${formik.touched.fullName && formik.errors.fullName ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors`}
                    placeholder=" "
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-400">
                    {t("phone")} <span className="text-[#ef3340]">*</span>
                  </label>
                  <div className="flex border border-gray-200 rounded-[12px] overflow-hidden focus-within:border-[#ef3340] transition-colors">
                    <input
                      name="phone"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                      className="flex-1 px-4 py-3 outline-none"
                      placeholder=" "
                    />
                    <div className="flex items-center gap-2 px-3 bg-gray-50 border-l border-gray-100">
                      <span className="text-[18px]">🇦🇿</span>
                      <ChevronDown size={14} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-400">
                    {t("email")}
                  </label>
                  <input
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full border border-gray-200 rounded-[12px] px-4 py-3 outline-none focus:border-[#ef3340] transition-colors"
                    placeholder=" "
                  />
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[18px] font-bold text-gray-400">
                  2
                </div>
                <h2 className="text-[22px] font-bold text-[#14151A]">
                  {t("shipping_details")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="relative">
                  <select
                    name="city"
                    onChange={formik.handleChange}
                    value={formik.values.city}
                    className="w-full appearance-none border border-gray-200 rounded-[12px] px-4 py-4 outline-none focus:border-[#ef3340] transition-colors bg-white font-medium"
                  >
                    <option>Bakı</option>
                    <option>Sumqayıt</option>
                    <option>Gəncə</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
                <div className="relative">
                  <select
                    name="district"
                    onChange={formik.handleChange}
                    value={formik.values.district}
                    className="w-full appearance-none border border-gray-200 rounded-[12px] px-4 py-4 outline-none focus:border-[#ef3340] transition-colors bg-white font-medium"
                  >
                    <option>Yasamal</option>
                    <option>Sabail</option>
                    <option>Nasimi</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
                <div className="relative">
                  <select
                    disabled
                    className="w-full appearance-none border border-gray-200 rounded-[12px] px-4 py-4 outline-none transition-colors bg-gray-50 text-gray-500 font-medium"
                  >
                    <option>Azerbaijan</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="md:col-span-3">
                  <label className="text-[13px] font-bold text-gray-400 mb-2 block">
                    {t("address")}
                  </label>
                  <input
                    name="address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.address}
                    className={`w-full border ${formik.touched.address && formik.errors.address ? "border-red-500" : "border-gray-200"} rounded-[12px] px-4 py-4 outline-none focus:border-[#ef3340]`}
                    placeholder="Street, house and apartment number"
                  />
                </div>
                <div>
                  <label className="text-[13px] font-bold text-gray-400 mb-2 block">
                    {t("post_code")}
                  </label>
                  <input
                    name="postalCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.postalCode}
                    className="w-full border border-gray-200 rounded-[12px] px-4 py-4 outline-none focus:border-[#ef3340]"
                    placeholder=" "
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-[14px] font-bold text-[#14151A]">
                  {t("shipping_type")}
                </label>
                <div className="border-2 border-[#1e293b] rounded-[16px] p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                        <MapPin size={24} />
                      </div>
                      <span className="text-[18px] font-bold text-[#14151A]">
                        {t("shipping")} — 4.90 ₼
                      </span>
                    </div>
                    <div className="w-6 h-6 rounded-full border-[6px] border-[#1e293b] bg-white"></div>
                  </div>

                  <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[14px] text-[#14151A] mb-4">
                      {t("order_desc")}
                    </h4>
                    <ul className="text-[13px] text-gray-600 space-y-3 list-disc pl-4">
                      <li>{t("order_rule1")}</li>
                      <li>{t("order_rule2")}</li>
                      <li>{t("order_rule3")}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 sticky top-24">
            <div className="bg-white rounded-[24px] p-8 shadow-sm">
              <h3 className="text-[22px] font-bold text-[#14151A] mb-8">
                {t("order_summary")}
              </h3>

              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500">{t("items")}:</span>
                  <span className="font-bold">{cart.length}</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500">{t("amount")}:</span>
                  <span className="font-bold">{subtotal.toFixed(2)} ₼</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500">{t("shipping")}:</span>
                  <span className="font-bold text-gray-800">
                    {deliveryFee.toFixed(2)} ₼
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-bold text-[#ef3340]">
                      -{discount.toFixed(2)} ₼
                    </span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100 mb-8">
                <span className="text-[18px] font-bold text-[#14151A]">
                  {t("total")}
                </span>
                <span className="text-[24px] font-black text-[#14151A]">
                  {total.toFixed(2)} ₼
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl mb-8">
                <span className="text-[14px] text-gray-500">
                  {t("promo_code")}
                </span>
                <button className="text-[14px] text-[#ef3340] font-bold hover:underline">
                  Add
                </button>
              </div>

              <button
                onClick={() => formik.handleSubmit()}
                disabled={isLoading}
                className="w-full bg-[#ef3340] text-white py-5 rounded-full text-[16px] font-black shadow-[0_10px_20px_-5px_rgba(239,51,64,0.3)] hover:bg-[#d92c38] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading
                  ? t("processing")
                  : `${t("confirm_order")} ( ${total.toFixed(2)} ₼ )`}
              </button>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[18px] font-bold text-[#14151A]">
                  {t("items")}
                </h3>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-[14px] text-[#ef3340] font-bold hover:underline"
                >
                  <Edit2 size={16} /> Edit
                </Link>
              </div>

              <div className="flex flex-col gap-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item: any, index: number) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-4 group relative"
                  >
                    <div className="relative w-[70px] h-[100px] shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="70px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] font-bold text-[#ef3340] line-clamp-2 leading-relaxed mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-gray-400 mb-3">
                        Code: {item.id}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-400">Price</span>
                          <span className="font-bold">
                            {(item.discountPrice || item.price).toFixed(2)} ₼
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-400">Qty</span>
                          <span className="font-bold">{item.quantity}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="font-bold">
                            {(
                              (item.discountPrice || item.price) * item.quantity
                            ).toFixed(2)}{" "}
                            ₼
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#ef3340] shadow-sm transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
