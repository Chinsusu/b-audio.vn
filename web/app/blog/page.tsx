import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | B-Audio",
  description: "Chia sẻ về loa DIY, tuning và các dự án thực tế của B-Audio.",
};

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="font-heading text-h2 text-neutral-100 uppercase tracking-tight">
          Blog B-Audio
        </h1>
        <p className="text-sm text-neutral-300 max-w-2xl">
          Mục blog sẽ tổng hợp bài viết về kinh nghiệm làm loa DIY, cách tuning
          cho từng không gian, case study dự án thực tế và các mẹo sử dụng
          thiết bị âm thanh.
        </p>
        <p className="text-sm text-neutral-500">
          Nội dung chi tiết sẽ được cập nhật dần trong các đợt sau.
        </p>
      </section>
    </div>
  );
}

