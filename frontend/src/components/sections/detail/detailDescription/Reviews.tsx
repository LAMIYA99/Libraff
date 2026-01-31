"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import api from "@/services/api";

const Reviews = ({
  bookId,
  reviews: initialReviews,
}: {
  bookId: string;
  reviews: any[];
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("libraff_user")
        : null;
    return saved ? JSON.parse(saved) : null;
  });

  const formik = useFormik({
    initialValues: {
      rating: 5,
      comment: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().min(1).max(5).required(),
      comment: Yup.string()
        .min(10, "Rəy ən az 10 simvol olmalıdır")
        .required("Rəy mütləqdir"),
    }),
    onSubmit: async (values) => {
      try {
        await api.post(`/books/${bookId}/reviews`, values);
        toast.success("Rəyiniz əlavə edildi!");
        setShowReviewForm(false);
        window.location.reload();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Xəta baş verdi");
      }
    },
  });

  return (
    <div className="w-full max-w-[100ch]">
      <div className="bg-gray-50 rounded-2xl p-8 text-center mb-10">
        <h3 className="text-xl md:text-2xl font-semibold">
          Məhsul haqqında rəy yazın
        </h3>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Fikirlərinizi digər istifadəçilərlə bölüşün
        </p>

        {!user ? (
          <div className="mt-6 p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-700 text-sm">
            Rəy yazmaq üçün daxil olmalısınız
          </div>
        ) : !showReviewForm ? (
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-6 bg-black text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition active:scale-95"
          >
            Rəy yaz
          </button>
        ) : (
          <form
            onSubmit={formik.handleSubmit}
            className="mt-8 text-left max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Reytinq
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => formik.setFieldValue("rating", star)}
                    className="transition-transform active:scale-110"
                  >
                    <Star
                      size={28}
                      fill={star <= formik.values.rating ? "#ef3340" : "none"}
                      color="#ef3340"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Rəyiniz
              </label>
              <textarea
                name="comment"
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.comment}
                className={`w-full border ${formik.touched.comment && formik.errors.comment ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-3 outline-none focus:border-[#ef3340] text-[15px] resize-none`}
                placeholder="Məhsul haqqında düşüncələrinizi yazın..."
              />
              {formik.touched.comment && formik.errors.comment && (
                <span className="text-red-500 text-xs mt-1 block">
                  {formik.errors.comment}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#ef3340] text-white py-3 rounded-full font-bold hover:bg-[#d92c38] transition active:scale-95"
              >
                Göndər
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 border border-gray-200 rounded-full font-bold hover:bg-gray-50 transition"
              >
                Ləğv et
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="space-y-6">
        {initialReviews?.length > 0 ? (
          initialReviews.map((review, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-[#14151A]">{review.name}</h4>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        fill={s <= review.rating ? "#ef3340" : "none"}
                        color="#ef3340"
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString("az-AZ")}
                </span>
              </div>
              <p className="text-gray-600 text-[15px] leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 mt-12 text-sm md:text-base">
            Hələki rəy yoxdur
          </p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
