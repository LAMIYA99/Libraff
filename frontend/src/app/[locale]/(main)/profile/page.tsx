"use client";

import { useAuth } from "@/context/AuthContext";
import {
  User,
  Mail,
  Shield,
  LogOut,
  Package,
  ChevronRight,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export default function ProfilePage() {
  const { user, logout, isAdmin } = useAuth();

  const { data: orders = [], isLoading: ordersLoading } = useQuery<any[]>({
    queryKey: ["my-orders"],
    queryFn: () => api.get("/orders/myorders"),
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Zəhmət olmasa daxil olun
        </h1>
        <Link
          href="/"
          className="bg-[#ef3340] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d92c38] transition-all"
        >
          Ana Səhifə
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
 
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm h-fit sticky top-24">
            <div className="w-24 h-24 bg-red-50 rounded-2xl flex items-center justify-center text-[#ef3340] mb-6">
              <User size={48} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500 text-sm mb-6">{user.email}</p>

            <div className="space-y-2">
              <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-red-50 text-[#ef3340] font-bold text-sm">
                <User size={18} /> Mənim Profilim
              </button>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-gray-50 text-[#ef3340] font-bold text-sm transition-colors"
                >
                  <Shield size={18} /> Admin Panel
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 text-red-600 font-bold text-sm transition-colors mt-4"
              >
                <LogOut size={18} /> Çıxış
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8 border-b border-gray-50 pb-4">
              Şəxsi Məlumatlar
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                  Ad
                </label>
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-900 font-medium">
                  {user.firstName}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                  Soyad
                </label>
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-900 font-medium">
                  {user.lastName}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                  E-poçt Ünvanı
                </label>
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-900 font-medium flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  {user.email}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider text-[10px]">
                  Hesab Növü
                </label>
                <div className="p-4 bg-gray-50 rounded-2xl text-gray-900 font-medium flex items-center gap-3">
                  <Shield size={16} className="text-gray-400" />
                  {isAdmin ? "Adminstrator" : "İstifadəçi"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Package size={24} className="text-[#ef3340]" /> Sifarişlərim
              </h2>
              <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">
                {orders.length} Sifariş
              </span>
            </div>

            {ordersLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-50 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <Package size={32} />
                </div>
                <p className="text-gray-500 font-medium">
                  Hələ heç bir sifarişiniz yoxdur.
                </p>
                <Link
                  href="/shop"
                  className="text-[#ef3340] text-sm font-bold mt-2 inline-block hover:underline"
                >
                  Alış-verişə başla
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div
                    key={order._id || order.id}
                    className="group border border-gray-100 rounded-2xl p-5 hover:border-[#ef3340]/30 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-[#ef3340] transition-colors">
                          <Package size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            Sifariş #
                            {(order._id || order.id || "").toString().slice(-6)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-[11px] text-gray-500 font-medium">
                              {new Date(order.createdAt).toLocaleDateString(
                                "az-AZ",
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Məbləğ
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            ₼{order.totalPrice}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Status
                          </p>
                          <span
                            className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                              order.status === "Tamamlandı"
                                ? "bg-green-100 text-green-700"
                                : order.status === "İmtina edildi"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <ChevronRight
                          size={20}
                          className="text-gray-300 group-hover:text-[#ef3340] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        
        </div>
      </div>
    </div>
  );
}
