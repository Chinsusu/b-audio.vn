'use client';
import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

export default function ViewItem({ item }: { item: any }) {
  useEffect(() => {
    if (item) analytics.view_item(item);
  }, [item]);
  return null;
}
