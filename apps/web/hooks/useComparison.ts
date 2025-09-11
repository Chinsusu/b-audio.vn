'use client';
import { useState, useEffect } from 'react';
import { Comparison, ComparisonItem, comparisonManager } from '../lib/comparison';

export function useComparison() {
  const [comparison, setComparison] = useState<Comparison>({ items: [], itemCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize comparison from storage
    setComparison(comparisonManager.getComparison());
    setLoading(false);

    // Subscribe to comparison updates
    const unsubscribe = comparisonManager.subscribe((updatedComparison) => {
      setComparison(updatedComparison);
    });

    return unsubscribe;
  }, []);

  const addItem = (item: Omit<ComparisonItem, 'addedAt'>) => {
    try {
      return comparisonManager.addItem(item);
    } catch (error) {
      throw error; // Let the component handle the error (max items limit)
    }
  };

  const removeItem = (itemId: string) => {
    return comparisonManager.removeItem(itemId);
  };

  const toggleItem = (item: Omit<ComparisonItem, 'addedAt'>) => {
    try {
      return comparisonManager.toggleItem(item);
    } catch (error) {
      throw error; // Let the component handle the error
    }
  };

  const clearComparison = () => {
    comparisonManager.clearComparison();
  };

  const isInComparison = (itemId: string) => {
    return comparisonManager.isInComparison(itemId);
  };

  const canAddMore = () => {
    return comparisonManager.canAddMore();
  };

  const getMaxItems = () => {
    return comparisonManager.getMaxItems();
  };

  const shareComparison = () => {
    return comparisonManager.shareComparison();
  };

  return {
    comparison,
    loading,
    addItem,
    removeItem,
    toggleItem,
    clearComparison,
    isInComparison,
    canAddMore,
    getMaxItems,
    shareComparison,
  };
}
