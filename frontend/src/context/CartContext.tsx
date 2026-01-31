"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

const CartContext = createContext<any>(null);

export const CartProvider = ({ children }: any) => {
  const t = useTranslations("Product");
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("libraff_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("cart parse error", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("libraff_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      toast.success(t("qty_updated"));
    } else {
      toast.success(t("added_to_cart"));
    }

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: any) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: any, amount: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      }),
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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
