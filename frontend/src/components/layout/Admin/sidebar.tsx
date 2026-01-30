"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  Bell,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Kitablar", href: "/admin/books", icon: BookOpen },
    { name: "Sifarişlər", href: "/admin/orders", icon: ShoppingCart },
  ];

  return (
    <div
      className={`h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 relative ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6 mb-4">
        <Link href="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg text-gray-900 tracking-tight whitespace-nowrap">
              LIBRAFF <span className="text-gray-400 font-normal">ADMIN</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <div className="px-3 flex-1">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon
                  size={20}
                  className={
                    isActive
                      ? "text-red-600"
                      : "text-gray-400 group-hover:text-gray-900"
                  }
                />
                {!isCollapsed && (
                  <span className="text-sm font-medium">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-50 mt-auto">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-red-600 transition-all group">
          <LogOut size={20} className="group-hover:text-red-600" />
          {!isCollapsed && <span className="text-sm font-medium">Çıxış</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-600 shadow-sm z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </div>
  );
}
