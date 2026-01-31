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
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<any>(null);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    code: "",
    title: "",
    price: 0,
    discountPrice: 0,
    image: "",
    description: "",
    category: "",
    features: {
      binding: "",
      language: "",
      author: "",
      publisher: "",
      pageCount: 0,
      age: "",
    },
    status: "Aktiv",
  });
  const [isUploading, setIsUploading] = useState(false);

  const { data: books = [], isLoading } = useQuery<any>({
    queryKey: ["admin-books"],
    queryFn: () => api.get("/books"),
  });

  const bookMutation = useMutation({
    mutationFn: (data: any) => {
      const id = editingBook?._id || editingBook?.id;
      if (editingBook) return api.put(`/books/${id}`, data);
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
    setFormData({
      code: "",
      title: "",
      price: 0,
      discountPrice: 0,
      image: "",
      description: "",
      category: "",
      features: {
        binding: "",
        language: "",
        author: "",
        publisher: "",
        pageCount: 0,
        age: "",
      },
      status: "Aktiv",
    });
  };

  const openModal = (book?: any) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({
        code: "",
        title: "",
        price: 0,
        discountPrice: 0,
        image: "",
        description: "",
        category: "",
        features: {
          binding: "",
          language: "",
          author: "",
          publisher: "",
          pageCount: 0,
          age: "",
        },
        status: "Aktiv",
      });
    }
    setIsModalOpen(true);
  };

  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book: any) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.features?.author
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()),
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
            key={book._id || book.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
          >
            <div className="aspect-4/5 relative bg-gray-50">
              {book.image &&
              (book.image.startsWith("http") ||
                book.image.startsWith("https")) ? (
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
                    setDeleteConfirmationId(book._id || book.id);
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
              <p className="text-xs text-gray-500 mb-3">
                {book.features?.author}
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 line-through">
                    ₼{book.price}
                  </span>
                  <span className="text-sm font-bold text-red-600">
                    ₼{book.discountPrice}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">{book.code}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-y-auto max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
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

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-32 h-44 bg-gray-50 border rounded-lg relative overflow-hidden flex items-center justify-center">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload size={32} className="text-gray-300" />
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                        <Loader2
                          className="animate-spin text-red-500"
                          size={24}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        Kitab Kodu
                      </label>
                      <input
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                        value={formData.code || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase">
                        Şəkil URL
                      </label>
                      <input
                        className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                        value={formData.image || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                      <label className="mt-2 block w-full text-center py-1.5 border border-gray-200 rounded-lg text-xs font-bold cursor-pointer hover:bg-gray-50">
                        Və ya fayl yüklə
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Kitabın adı
                  </label>
                  <input
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Təsvir
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Qiymət
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Endirimli Qiymət
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500"
                      value={formData.discountPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          discountPrice: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-gray-900 border-b pb-2 text-sm uppercase tracking-wider">
                  Texniki Özəlliklər
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Müəllif
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 shadow-sm"
                      value={formData.features.author}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            author: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Nəşriyyat
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 shadow-sm"
                      value={formData.features.publisher}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            publisher: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Cild
                    </label>
                    <select
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none shadow-sm"
                      value={formData.features.binding}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            binding: e.target.value,
                          },
                        })
                      }
                    >
                      <option value="">Seçin</option>
                      <option value="Sərt">Sərt</option>
                      <option value="Yumşaq">Yumşaq</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Dil
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 shadow-sm"
                      value={formData.features.language}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            language: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Səhifə Sayı
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 shadow-sm"
                      value={formData.features.pageCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            pageCount: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase">
                      Yaş
                    </label>
                    <input
                      className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-500 shadow-sm"
                      value={formData.features.age}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          features: {
                            ...formData.features,
                            age: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Kateqoriya
                  </label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none shadow-sm"
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Kateqoriya Seçin</option>
                    <option value="Bədii ədəbiyyat">Bədii ədəbiyyat</option>
                    <option value="Qeyri-bədii ədəbiyyat">
                      Qeyri-bədii ədəbiyyat
                    </option>
                    <option value="Dedektiv">Dedektiv</option>
                    <option value="Romanlar">Romanlar</option>
                    <option value="Elmi">Elmi</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase">
                    Status
                  </label>
                  <select
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm outline-none shadow-sm"
                    value={formData.status || "Aktiv"}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Aktiv">Aktiv</option>
                    <option value="Deaktiv">Deaktiv</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t flex justify-end gap-2 sticky bottom-0 z-10">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-sm text-gray-500 font-bold hover:text-gray-900"
              >
                Ləğv et
              </button>
              <button
                onClick={() => bookMutation.mutate(formData)}
                className="bg-red-600 text-white px-10 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-red-700 transition-all"
              >
                Yadda saxla
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmationId && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-[24px] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 mx-auto">
              <Trash2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
              Kitabı silmək?
            </h2>
            <p className="text-sm text-gray-500 text-center mb-8">
              Bu əməliyyat geri qaytarıla bilməz. Kitab kataloqdan tamamilə
              silinəcək.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteConfirmationId(null)}
                className="px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Xeyr, ləğv et
              </button>
              <button
                onClick={() => {
                  deleteMutation.mutate(deleteConfirmationId);
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
