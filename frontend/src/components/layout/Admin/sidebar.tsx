"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  LogOut,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const routes = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      name: "Kitablar",
      href: "/admin/books",
      icon: BookOpen,
      active: pathname === "/admin/books",
    },
    {
      name: "Sifarişlər",
      href: "/admin/orders",
      icon: ShoppingCart,
      active: pathname === "/admin/orders",
    },
  ];

  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        className,
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sm">Libraff</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        {routes.map((route) => {
          const Icon = route.icon;
          return (
            <Link key={route.href} href={route.href}>
              <Button
                variant={route.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  route.active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span>{route.name}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Çıxış</span>}
        </Button>
      </div>
    </div>
  );
}
