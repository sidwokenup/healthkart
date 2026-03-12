"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  dosage: string;
  quantity: number;
  image: string;
}

interface InstantOrderItem {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  dosage: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  instantOrderItem: InstantOrderItem | null;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, delta: number) => void;
  clearCart: () => void;
  setInstantOrder: (item: InstantOrderItem) => void;
  clearInstantOrder: () => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [instantOrderItem, setInstantOrderItem] = useState<InstantOrderItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    openDrawer();
  };

  const removeFromCart = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.slug === slug) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const setInstantOrder = (item: InstantOrderItem) => {
    setInstantOrderItem(item);
  };

  const clearInstantOrder = () => {
    setInstantOrderItem(null);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        instantOrderItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setInstantOrder,
        clearInstantOrder,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        cartCount,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
