'use client';
import { useState, useEffect } from 'react';
import { Wishlist, WishlistItem, wishlistManager } from '../lib/wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Wishlist>({ items: [], itemCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize wishlist from storage
    setWishlist(wishlistManager.getWishlist());
    setLoading(false);

    // Subscribe to wishlist updates
    const unsubscribe = wishlistManager.subscribe((updatedWishlist) => {
      setWishlist(updatedWishlist);
    });

    return unsubscribe;
  }, []);

  const addItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    wishlistManager.addItem(item);
  };

  const removeItem = (itemId: string) => {
    wishlistManager.removeItem(itemId);
  };

  const toggleItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    return wishlistManager.toggleItem(item);
  };

  const clearWishlist = () => {
    wishlistManager.clearWishlist();
  };

  const isInWishlist = (itemId: string) => {
    return wishlistManager.isInWishlist(itemId);
  };

  const shareWishlist = () => {
    return wishlistManager.shareWishlist();
  };

  return {
    wishlist,
    loading,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
    isInWishlist,
    shareWishlist,
  };
}
