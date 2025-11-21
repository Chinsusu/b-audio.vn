import type { Metadata } from "next";

import PageRenderer from "../../components/cms/PageRenderer";
import { getPageBySlug } from "../../lib/cms";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp | B-Audio",
  alternates: { canonical: "https://b-audio.vn/faq" },
};

export default async function FAQPage() {
  const page = await getPageBySlug("faq");
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-heading text-h1 text-textWhite mb-6">
        {page?.title || "Câu hỏi thường gặp"}
      </h1>
      {page ? (
        <PageRenderer sections={page.sections} />
      ) : (
        <div className="text-textGrey">Nội dung đang cập nhật.</div>
      )}
    </main>
  );
}
