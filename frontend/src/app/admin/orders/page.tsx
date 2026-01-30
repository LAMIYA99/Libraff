"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import { Search, Trash2, ChevronDown, ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Hamısı");
  const [openId, setOpenId] = useState<any>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<any>(null);

  const { data: orders = [], isLoading } = useQuery<any>({
    queryKey: ["admin-orders"],
    queryFn: () => api.get("/orders"),
  });

  const updateStatus = useMutation({
    mutationFn: (data: any) =>
      api.patch(`/orders/${data.id || data._id}`, { status: data.status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] } as any);
      toast.success("Status yeniləndi");
    },
  });

  const deleteOrder = useMutation({
    mutationFn: (id: any) => api.delete(`/orders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] } as any);
      toast.success("Sifariş silindi");
    },
  });

  const filtered = Array.isArray(orders)
    ? orders.filter((o: any) => {
        const id = o._id || o.id;
        const isMatched =
          o.customerName.toLowerCase().includes(search.toLowerCase()) ||
          id.toLowerCase().includes(search.toLowerCase());
        const isStatus = status === "Hamısı" || o.status === status;
        return isMatched && isStatus;
      })
    : [];

  if (isLoading)
    return (
      <div className="p-10 text-center text-sm text-gray-400">Yüklənir...</div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sifarişlər</h1>
        <p className="text-sm text-gray-500">
          Gələn sifarişlərin idarə olunması
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-3 mb-6 flex gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            placeholder="Axtarş..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm outline-none focus:ring-1 focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 bg-gray-50 border-0 rounded-lg text-sm font-medium outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Hamısı">Bütün Statuslar</option>
          <option value="Qəbul edildi">Qəbul edildi</option>
          <option value="Gəzitdə">Gəzitdə</option>
          <option value="Tamamlandı">Tamamlandı</option>
          <option value="İptal edildi">İptal edildi</option>
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((item: any) => {
          const itemId = item._id || item.id;
          return (
            <div
              key={itemId}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <div
                className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-all"
                onClick={() => setOpenId(openId === itemId ? null : itemId)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">
                      #{itemId.slice(-5)} - {item.customerName}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-bold">
                      {item.createdAt}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                      item.status === "Tamamlandı"
                        ? "bg-green-100 text-green-700"
                        : item.status === "İptal edildi"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    ₼{item.totalPrice}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-all ${openId === item.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {openId === item.id && (
                <div className="p-6 border-t border-gray-50 bg-gray-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Müştəri
                      </p>
                      <p className="text-sm">
                        <b>Email:</b> {item.customerEmail}
                      </p>
                      <p className="text-sm">
                        <b>Telefon:</b> {item.customerPhone}
                      </p>
                      <p className="text-sm">
                        <b>Ünvan:</b> {item.address}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-gray-400 uppercase">
                        Məhsullar
                      </p>
                      {item.items.map((book: any, i: any) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>
                            {book.bookTitle} x{book.quantity}
                          </span>
                          <span className="font-bold">₼{book.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex gap-2">
                      {[
                        "Qəbul edildi",
                        "Gəzitdə",
                        "Tamamlandı",
                        "İptal edildi",
                      ].map((st) => (
                        <button
                          key={st}
                          onClick={() =>
                            updateStatus.mutate({ id: itemId, status: st })
                          }
                          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                            item.status === st
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setDeleteConfirmationId(itemId);
                      }}
                      className="text-red-600 text-[10px] font-bold uppercase hover:underline"
                    >
                      Sifarişi sil
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modern Delete Confirmation Modal */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[24px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 mx-auto">
              <Trash2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              Sifarişi silmək?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              Bu əməliyyat geri qaytarıla bilməz. Sifariş sistemdən tamamilə
              silinəcək.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Xeyr, saxla
              </button>
              <button
                onClick={() => {
                  deleteOrder.mutate(deleteConfirmationId);
                  setDeleteConfirmationId(null);
                }}
                className="px-4 py-3 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-lg shadow-red-600/20 transition-all active:scale-95"
              >
                Bəli, sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
