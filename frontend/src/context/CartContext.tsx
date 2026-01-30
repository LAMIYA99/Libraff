"use client";
import api from "@/services/api";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const data = await api.get("/cart");
          setCart(data || []);
        } catch (err) {
          console.error("Cart fetch error:", err);
        }
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const syncWithBackend = async () => {
      const token = localStorage.getItem("userToken");
      if (token && cart.length >= 0 && !isSyncing) {
        try {
          setIsSyncing(true);
          await api.post("/cart/sync", { cartItems: cart });
        } catch (err) {
          console.error("Cart sync error:", err);
        } finally {
          setIsSyncing(false);
        }
      }
    };

    const timeout = setTimeout(syncWithBackend, 500);
    return () => clearTimeout(timeout);
  }, [cart]);

  const addToCart = (product: any) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      toast.error("Please login to add items to cart!");
      return;
    }

    setCart((prevCart) => {
      const isExist = prevCart.find(
        (item) => item.id === product.id || item.productId === product.id,
      );
      if (isExist) {
        return prevCart.map((item) =>
          item.id === product.id || item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prevCart,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: any) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id && item.productId !== id),
    );
  };

  const updateQuantity = (id: any, amount: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id || item.productId === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    const price =
      typeof item.price === "string"
        ? parseFloat(item.price.replace("$", ""))
        : item.price;
    return total + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
