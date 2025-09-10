'use client';
import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function ViewItemList({ items }: { items: any[] }) {
  useEffect(() => {
    if (items?.length) analytics.view_item_list(items, 'products');
  }, [items]);
  return null;
}
