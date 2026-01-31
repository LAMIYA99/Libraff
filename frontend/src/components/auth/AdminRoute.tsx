"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ef3340] border-t-transparent"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return <>{children}</>;
}
