import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PageRenderer from "../../../components/cms/PageRenderer";
import { getPageBySlug } from "../../../lib/cms";

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  const title = page?.title ? `${page.title} | B-Audio` : "Trang";
  const canonical = `https://b-audio.vn/pages/${params.slug}`;
  return { title, alternates: { canonical } };
}

export default async function CmsPage({ params }: { params: PageParams }) {
  const page = await getPageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="font-heading text-h1 text-textWhite mb-6">{page.title}</h1>
      <PageRenderer sections={page.sections} />
    </main>
  );
}
