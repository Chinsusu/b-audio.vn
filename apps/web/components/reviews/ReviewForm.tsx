"use client";
import { useState } from "react";

import StarRating from "./StarRating";

interface ReviewFormProps {
  productId: string;
  productTitle: string;
  onReviewSubmitted?: (review: any) => void;
}

export default function ReviewForm({
  productId,
  productTitle,
  onReviewSubmitted,
}: ReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!author.trim()) {
      setError("Vui lòng nhập tên của bạn");
      return;
    }

    if (!content.trim()) {
      setError("Vui lòng nhập nội dung đánh giá");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Mock API call - replace with real API endpoint
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          author: author.trim(),
          content: content.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Không thể gửi đánh giá");
      }

      const newReview = await response.json();

      // Reset form
      setRating(0);
      setAuthor("");
      setContent("");
      setIsOpen(false);

      // Notify parent component
      onReviewSubmitted?.(newReview);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-2xl bg-espresso px-4 py-2 text-ivory hover:bg-espresso/90 transition-colors focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
        Viết đánh giá
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-cloud bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-heading-sm font-semibold">
          Đánh giá "{productTitle}"
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-gray-600 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá sản phẩm *
          </label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="lg"
            showValue={true}
          />
        </div>

        {/* Author */}
        <div>
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tên của bạn *
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full rounded-2xl border border-cloud px-3 py-2 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2"
            placeholder="Nhập tên hiển thị"
            maxLength={50}
          />
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nội dung đánh giá *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-cloud px-3 py-2 focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2 resize-none"
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            maxLength={500}
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/500 ký tự
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm bg-red-50 rounded-2xl p-3">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-2xl border border-cloud py-2 text-gray-700 hover:bg-cloud transition-colors focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2"
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="flex-1 rounded-2xl bg-espresso py-2 text-ivory hover:bg-espresso/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-espresso focus:ring-offset-2"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Đang gửi...
              </span>
            ) : (
              "Gửi đánh giá"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
