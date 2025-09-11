'use client'

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-white text-gray-900">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            <AlertTriangle className="h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Đã có lỗi xảy ra</h1>
              <p className="mt-1 text-sm opacity-90">Xin lỗi vì sự bất tiện. Bạn có thể thử tải lại trang hoặc quay về trang chủ.</p>
              {process.env.NODE_ENV !== "production" && error?.digest && (
                <p className="mt-2 text-xs opacity-70">Mã lỗi: {error.digest}</p>
              )}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => reset()}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                >
                  <RotateCcw className="h-4 w-4" />
                  Thử lại
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
