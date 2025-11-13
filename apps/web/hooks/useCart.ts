"use client";
import { useEffect, useState } from "react";

import { Cart, CartItem, cartManager } from "../lib/cart";

export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize cart from storage
    setCart(cartManager.getCart());
    setLoading(false);

    // Subscribe to cart updates
    const unsubscribe = cartManager.subscribe((updatedCart) => {
      setCart(updatedCart);
    });

    return unsubscribe;
  }, []);

  const addItem = (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    cartManager.addItem(item, quantity);
  };

  const removeItem = (itemId: string) => {
    cartManager.removeItem(itemId);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    cartManager.updateQuantity(itemId, quantity);
  };

  const clearCart = () => {
    cartManager.clearCart();
  };

  const isInCart = (itemId: string) => {
    return cartManager.isInCart(itemId);
  };

  const getItemQuantity = (itemId: string) => {
    return cartManager.getItemQuantity(itemId);
  };

  return {
    cart,
    loading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  };
}
