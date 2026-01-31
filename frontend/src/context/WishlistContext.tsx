"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "@/services/api";

const WishlistContext = createContext<any>(null);

export const WishlistProvider = ({ children }: any) => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("libraff_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const fetchWishlist = async () => {
    if (!user) return;
    try {
      const data = await api.get("/wishlist");
      setWishlist(data);
    } catch (error) {
      console.error("fetch wishlist error", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const toggleWishlist = async (productId: string) => {
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      const response = await api.post(`/wishlist/${productId}`, {});
      toast.success(response.message);

      if (response.isWishlisted) {
        fetchWishlist();
      } else {
        setWishlist((prev) =>
          prev.filter((item) => (item.id || item._id) !== productId),
        );
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error occurred");
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => (item.id || item._id) === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        fetchWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
