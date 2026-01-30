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
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface OrderItem {
  bookTitle: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: OrderItem[];
  totalPrice: number;
  status: "Qəbul edildi" | "Gəzitdə" | "Tamamlandı" | "İptal edildi";
  createdAt: string;
}

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("Hamısı");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch Orders
  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["admin-orders"],
    queryFn: () => api.get("/orders"),
  });

  // Update Status Mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      api.patch(`/orders/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Status yeniləndi");
    },
    onError: () => toast.error("Xəta baş verdi"),
  });

  // Delete Order Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/orders/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast.success("Sifariş silindi");
      setDeleteConfirm(null);
    },
    onError: () => toast.error("Silinmə zamanı xəta baş verdi"),
  });

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "Hamısı" || order.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Qəbul edildi":
        return <Clock className="w-5 h-5" />;
      case "Gəzitdə":
        return <Truck className="w-5 h-5" />;
      case "Tamamlandı":
        return <CheckCircle2 className="w-5 h-5" />;
      case "İptal edildi":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Qəbul edildi":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Gəzitdə":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Tamamlandı":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "İptal edildi":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Sifarişlər</h1>
        <p className="text-muted-foreground">
          {orders.length} sifariş - {filteredOrders.length} göstərilən
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex gap-4 flex-col md:flex-row flex-1 focus-within:ring-0">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Müştəri, e-poçt və ya sifariş ID axtarın..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-md bg-card border border-border text-foreground outline-none"
          >
            <option value="Hamısı">Bütün Sifarişlər</option>
            <option value="Qəbul edildi">Qəbul edildi</option>
            <option value="Gəzitdə">Gəzitdə</option>
            <option value="Tamamlandı">Tamamlandı</option>
            <option value="İptal edildi">İptal edildi</option>
          </select>
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-card overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-secondary/50 transition-colors"
                onClick={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-foreground">
                        {order.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2 border ${getStatusColor(order.status)}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.createdAt}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                          Müştəri
                        </p>
                        <p className="text-foreground font-semibold">
                          {order.customerName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.customerEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                          Telefon
                        </p>
                        <p className="text-foreground font-semibold">
                          {order.customerPhone}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">
                          Ümumi Məbləğ
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          ₼{order.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-muted-foreground transition-transform ${expandedOrder === order.id ? "rotate-180" : ""}`}
                  />
                </div>
              </div>

              {expandedOrder === order.id && (
                <>
                  <div className="border-t border-border p-6 space-y-6 bg-secondary/30">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-2">
                        Çatdırılma Ünvanı
                      </p>
                      <div className="bg-background p-4 rounded-lg border border-border">
                        <p className="text-foreground font-semibold">
                          {order.address}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">
                        Sifariş Məhsulları ({order.items?.length || 0})
                      </p>
                      <div className="space-y-2">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                          >
                            <div>
                              <p className="text-foreground font-semibold">
                                {item.bookTitle}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} ədəd × ₼{item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-foreground font-bold">
                              ₼{(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">
                        Vəziyyəti Dəyiş
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {[
                          "Qəbul edildi",
                          "Gəzitdə",
                          "Tamamlandı",
                          "İptal edildi",
                        ].map((status) => (
                          <button
                            key={status}
                            disabled={statusMutation.isPending}
                            onClick={(e) => {
                              e.stopPropagation();
                              statusMutation.mutate({ id: order.id, status });
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                              order.status === status
                                ? `${getStatusColor(status)} border-2`
                                : "bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border p-6 flex gap-3 bg-background">
                    {deleteConfirm === order.id ? (
                      <>
                        <Button
                          onClick={() => deleteMutation.mutate(order.id)}
                          className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                          disabled={deleteMutation.isPending}
                        >
                          {deleteMutation.isPending
                            ? "Silinir..."
                            : "Bəli, Sil"}
                        </Button>
                        <Button
                          onClick={() => setDeleteConfirm(null)}
                          variant="outline"
                          className="flex-1"
                        >
                          Xeyr, Saxla
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setDeleteConfirm(order.id)}
                        className="flex-1 gap-2 border-destructive/50 hover:bg-destructive/10 text-destructive bg-destructive/5 border"
                      >
                        <Trash2 className="w-4 h-4" /> Sifariş Sil
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg p-12 text-center bg-card">
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Sifariş tapılmadı
          </h3>
          <p className="text-muted-foreground">
            Axtarış nəticəsinə uyğun sifariş yoxdur
          </p>
        </Card>
      )}
    </div>
  );
}
