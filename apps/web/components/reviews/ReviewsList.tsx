'use client';
import { useState, useEffect } from 'react';
import StarRating from './StarRating';

interface Review {
  id: string;
  rating: number;
  author: string;
  content: string;
  createdAt: string;
  helpfulCount?: number;
  isHelpful?: boolean;
}

interface ReviewsListProps {
  productId: string;
  reviews?: Review[];
  averageRating?: number;
  totalReviews?: number;
}

export default function ReviewsList({ 
  productId, 
  reviews: initialReviews = [], 
  averageRating = 0,
  totalReviews = 0 
}: ReviewsListProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Mock function to load more reviews
  const loadMoreReviews = async () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    try {
      // Mock API call - replace with real endpoint
      const response = await fetch(`/api/reviews/${productId}?page=${page + 1}&limit=5`);
      const data = await response.json();
      
      if (data.reviews.length > 0) {
        setReviews(prev => [...prev, ...data.reviews]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string, isHelpful: boolean) => {
    try {
      // Mock API call - replace with real endpoint
      await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ helpful: isHelpful }),
      });
      
      // Update local state
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { 
              ...review, 
              helpfulCount: (review.helpfulCount || 0) + (isHelpful ? 1 : -1),
              isHelpful: isHelpful 
            }
          : review
      ));
    } catch (error) {
      console.error('Failed to mark review as helpful:', error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Ngày không xác định';
    }
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
        <p className="text-sm text-gray-500">Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      {(averageRating > 0 || totalReviews > 0) && (
        <div className="bg-gray-50 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
              <StarRating rating={averageRating} readonly size="sm" />
              <div className="text-sm text-gray-600 mt-1">
                {totalReviews} đánh giá
              </div>
            </div>
            
            {/* Rating breakdown could be added here */}
            <div className="flex-1">
              <div className="text-sm text-gray-600">
                Dựa trên {totalReviews} đánh giá từ khách hàng
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl border p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {review.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{review.author}</div>
                  <div className="text-sm text-gray-500">{formatDate(review.createdAt)}</div>
                </div>
              </div>
              <StarRating rating={review.rating} readonly size="sm" />
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{review.content}</p>
            
            {/* Helpful Actions */}
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500">Đánh giá này có hữu ích không?</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleHelpful(review.id, true)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
                    review.isHelpful === true
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 7v13m-3-4h-2m0-2h2m-2-2h2m2-3l-2 2 2 2" />
                  </svg>
                  Có {review.helpfulCount || 0}
                </button>
                <button
                  onClick={() => handleHelpful(review.id, false)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${
                    review.isHelpful === false
                      ? 'bg-red-50 border-red-200 text-red-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L15 17V4m-3 4H9m2 2H9m2 2H9m2-3l2-2-2-2" />
                  </svg>
                  Không
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMoreReviews}
            disabled={isLoading}
            className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Đang tải...
              </span>
            ) : (
              'Xem thêm đánh giá'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
