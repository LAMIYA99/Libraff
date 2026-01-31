"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import { Order } from "@/types/global";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["admin-orders-recent"],
    queryFn: () => api.get("/orders"),
  });



  if (isLoading)
    return (
      <div className="p-10 text-center text-sm text-gray-500">Yüklənir...</div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Sistemə ümumi nəzər</p>
      </div>

 

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
     
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Son Sifarişlər</h3>
            <Link
              href="/admin/orders"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Hamısı <ChevronRight size={14} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-600">
                    Müştəri
                  </th>
                  <th className="px-6 py-3 text-right font-semibold text-gray-600">
                    Məbləğ
                  </th>
                  <th className="px-6 py-3 text-center font-semibold text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id || order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      #{(order._id || order.id || "").toString().slice(-5)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customerName}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ₼{order.totalPrice}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === "Tamamlandı"
                            ? "bg-green-100 text-green-700"
                            : order.status === "İptal edildi"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

       
      </div>
    </div>
  );
}
