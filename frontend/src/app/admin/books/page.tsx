"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import Image from "next/image";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  X,
  Upload,
  Loader2,
  Filter,
} from "lucide-react";

export default function BooksPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    status: "Aktiv",
  });
  const [isUploading, setIsUploading] = useState(false);

  const { data: books = [], isLoading } = useQuery<any>({
    queryKey: ["admin-books"],
    queryFn: () => api.get("/books"),
  });

  const bookMutation = useMutation({
    mutationFn: (data: any) => {
      if (editingBook) return api.put(`/books/${editingBook.id}`, data);
      return api.post("/books", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] } as any);
      toast.success(editingBook ? "Kitab yeniləndi" : "Kitab əlavə edildi");
      closeModal();
    },
    onError: () => toast.error("Xəta baş verdi"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: any) => api.delete(`/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] } as any);
      toast.success("Kitab silindi");
    },
  });

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const data = new FormData();
    data.append("image", file);
    try {
      const res: any = await api.post("/upload", data);
      setFormData({ ...formData, image: res.url });
    } catch (error) {
      toast.error("Yükləmə xətası");
    } finally {
      setIsUploading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({ status: "Aktiv" });
  };

  const openModal = (book?: any) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({ status: "Aktiv" });
    }
    setIsModalOpen(true);
  };

  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book: any) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  if (isLoading)
    return (
      <div className="p-10 text-center text-sm text-gray-500">Yüklənir...</div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kitablar</h1>
          <p className="text-sm text-gray-500">
            Kataloqdakı kitabların siyahısı
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Kitab
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-3 mb-6 flex items-center gap-4 shadow-sm">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Axtarış..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg text-sm outline-none focus:ring-1 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
          <Filter size={18} /> Filtr
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book: any) => (
          <div
            key={book.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="aspect-4/5 relative bg-gray-50">
              {book.image ? (
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50">
                  <Plus size={32} />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => openModal(book)}
                  className="p-2 bg-white shadow rounded-lg text-gray-600 hover:text-red-600"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm("Silmək istəyirsiniz?"))
                      deleteMutation.mutate(book.id);
                  }}
                  className="p-2 bg-white shadow rounded-lg text-gray-600 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1">
                  {book.title}
                </h3>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    book.status === "Aktiv"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {book.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">{book.author}</p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-sm font-bold text-gray-900">
                  ₼{book.price}
                </span>
                <span className="text-[10px] text-gray-400">
                  Stok: {book.stock}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">
                {editingBook ? "Redaktə et" : "Yeni Kitab"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-20 h-24 bg-gray-50 border rounded-lg relative overflow-hidden flex items-center justify-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload size={20} className="text-gray-300" />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                      <Loader2
                        className="animate-spin text-red-500"
                        size={16}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    className="w-full text-xs p-2 border border-gray-200 rounded-lg outline-none focus:border-red-500"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="Şəkil URL"
                  />
                  <label className="block w-full text-center py-1.5 border border-gray-200 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-50">
                    Fayl yüklə
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
              <input
                placeholder="Kitabın adı"
                className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Müəllif"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                  value={formData.author || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />
                <select
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none"
                  value={formData.category || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Kateqoriya</option>
                  <option value="Bədii">Bədii</option>
                  <option value="Roman">Roman</option>
                  <option value="Elmi">Elmi</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Qiymət"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Stok"
                  className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                  value={formData.stock || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm text-gray-500"
              >
                Ləğv et
              </button>
              <button
                onClick={() => bookMutation.mutate(formData)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm"
              >
                Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
