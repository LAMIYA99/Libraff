"use client";

import DetailView from "@/components/sections/detail/DetailView";
import Breadcrumb from "@/components/ui/Breadcrumb";
import api from "@/services/api";
import { Book } from "@/types/global";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Book | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/books/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 lg:px-[20px] py-12">
      <Breadcrumb title={product?.title} />
      <div className="mt-8">
        <DetailView product={product} />
      </div>
    </div>
  );
}
