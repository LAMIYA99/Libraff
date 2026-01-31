"use client";

import { Sidebar } from "@/components/layout/Admin/sidebar";
import AdminRoute from "@/components/auth/AdminRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-background transition-all duration-300">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}
