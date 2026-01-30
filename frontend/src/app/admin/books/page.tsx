"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  X,
  AlertCircle,
  Check,
  Loader2,
} from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  status: "Aktiv" | "Qeyri-aktiv";
  isbn?: string;
  publisher?: string;
  year?: number;
  coverColor?: string;
}

export default function BooksPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState<Partial<Book>>({
    status: "Aktiv",
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { data: books = [], isLoading } = useQuery<Book[]>({
    queryKey: ["admin-books"],
    queryFn: () => api.get("/books"),

  });

  const bookMutation = useMutation({
    mutationFn: (newBook: Partial<Book>) => {
      if (editingBook) {
        return api.put(`/books/${editingBook.id}`, newBook);
      }
      return api.post("/books", newBook);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast.success(editingBook ? "Kitab yeniləndi" : "Kitab əlavə edildi");
      handleCloseModal();
    },
    onError: () => {
      toast.error("Xəta baş verdi");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/books/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast.success("Kitab silindi");
      setDeleteConfirm(null);
    },
    onError: () => {
      toast.error("Silinmə zamanı xəta baş verdi");
    },
  });

  const filteredBooks = books.filter(
    (book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleOpenModal = (book?: Book) => {
    if (book) {
      setEditingBook(book);
      setFormData(book);
    } else {
      setEditingBook(null);
      setFormData({ status: "Aktiv" });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "stock" || name === "year"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSaveBook = () => {
    if (!formData.title || !formData.author || !formData.price) {
      toast.error("Zəhmət olmasa bütün məcburi sahələri doldurun");
      return;
    }
    bookMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Kitablar</h1>
          <p className="text-muted-foreground">
            {books.length} kitab - {filteredBooks.length} göstərilən
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Kitab adı və ya müəllif axtarın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
          <Button
            onClick={() => handleOpenModal()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 w-full md:w-auto"
          >
            <Plus className="w-5 h-5" />
            Yeni Kitab
          </Button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="group">
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-card">
                  <div
                    className={`h-56 bg-linear-to-br ${book.coverColor || "from-gray-600 to-gray-400"} relative overflow-hidden flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 text-center px-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-3">
                        {book.title}
                      </h3>
                      <p className="text-white/80 text-sm">{book.author}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                          {book.category}
                        </p>
                        <p className="text-lg font-bold text-foreground mt-1">
                          ₼{book.price.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
                          book.status === "Aktiv"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {book.status === "Aktiv" ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <AlertCircle className="w-3 h-3" />
                        )}
                        {book.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Ehtiyyat:</span>
                      <span className="font-semibold text-foreground">
                        {book.stock} ədəd
                      </span>
                    </div>

                    <div className="flex gap-2 pt-3 border-t border-border">
                      <Button
                        onClick={() => handleOpenModal(book)}
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 border-border hover:bg-secondary"
                      >
                        <Edit className="w-4 h-4" />
                        Redaktə
                      </Button>
                      {deleteConfirm === book.id ? (
                        <div className="flex-1 flex gap-2">
                          <Button
                            onClick={() => deleteMutation.mutate(book.id)}
                            size="sm"
                            className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                            disabled={deleteMutation.isPending}
                          >
                            Bəli
                          </Button>
                          <Button
                            onClick={() => setDeleteConfirm(null)}
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            Xeyr
                          </Button>
                        </div>
                      ) : (
                        <Button
                          onClick={() => setDeleteConfirm(book.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-2 border-destructive/50 hover:bg-destructive/10 text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                          Sil
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-0 shadow-lg p-12 text-center bg-card">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Kitab tapılmadı
            </h3>
            <p className="text-muted-foreground mb-6">
              "{searchTerm}" ilə əlaqəli kitab yoxdur
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
              }}
              variant="outline"
            >
              Axtarışı Təmizlə
            </Button>
          </Card>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg border-0 shadow-2xl bg-card max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
              <h2 className="text-2xl font-bold text-foreground">
                {editingBook ? "Kitab Redaktə Et" : "Yeni Kitab Əlavə Et"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Kitab Adı *
                </label>
                <Input
                  name="title"
                  placeholder="Kitabın adını daxil edin"
                  value={formData.title || ""}
                  onChange={handleInputChange}
                  className="bg-secondary border-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Müəllif *
                  </label>
                  <Input
                    name="author"
                    placeholder="Müəllifin adı"
                    value={formData.author || ""}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Kateqoriya
                  </label>
                  <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Seçin</option>
                    <option value="Bədii ədəbiyyat">Bədii ədəbiyyat</option>
                    <option value="Romanlar">Romanlar</option>
                    <option value="Elmi ədəbiyyat">Elmi ədəbiyyat</option>
                    <option value="Uşaq ədəbiyyatı">Uşaq ədəbiyyatı</option>
                    <option value="Biznes">Biznes</option>
                    <option value="Tarix">Tarix</option>
                    <option value="Digər">Digər</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Qiymət (₼) *
                  </label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    step="0.01"
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Ehtiyyat (ədəd)
                  </label>
                  <Input
                    name="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock || ""}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    ISBN
                  </label>
                  <Input
                    name="isbn"
                    placeholder="978-..."
                    value={formData.isbn || ""}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nəşriyyat
                  </label>
                  <Input
                    name="publisher"
                    placeholder="Nəşriyyat adı"
                    value={formData.publisher || ""}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nəşr Tarixi
                  </label>
                  <Input
                    name="year"
                    type="number"
                    placeholder="2024"
                    value={formData.year || ""}
                    onChange={handleInputChange}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status || "Aktiv"}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Aktiv">Aktiv</option>
                    <option value="Qeyri-aktiv">Qeyri-aktiv</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border flex gap-3 sticky bottom-0 bg-card">
              <Button
                onClick={handleCloseModal}
                variant="outline"
                className="flex-1 border-border bg-transparent"
              >
                Ləğv Et
              </Button>
              <Button
                onClick={handleSaveBook}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={bookMutation.isPending}
              >
                {bookMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                {editingBook ? "Yenilə" : "Əlavə Et"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
