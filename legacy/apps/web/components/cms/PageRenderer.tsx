import type { Section } from "../../lib/cms";

export default function PageRenderer({ sections = [] as Section[] }) {
  const byOrder = [...sections].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-10">
      {byOrder.map((s, idx) => (
        <section
          key={idx}
          className="rounded-2xl border border-darkGrey bg-darkGrey/40 p-6"
        >
          {s.title && (
            <h2 className="font-heading text-h3 text-textWhite mb-3">
              {s.title}
            </h2>
          )}
          {s.subtitle && <p className="text-textGrey mb-3">{s.subtitle}</p>}
          {s.body && (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: s.body }}
            />
          )}

          {/* Generic renderers for common kinds */}
          {Array.isArray(s.items) &&
            s.items.length > 0 &&
            s.kind !== "specs" &&
            s.kind !== "faq" && (
              <ul className="list-disc pl-6 space-y-1 text-textGrey">
                {s.items.map((it: any, i: number) => (
                  <li key={i}>
                    {typeof it === "string" ? (
                      it
                    ) : it.title ? (
                      <>
                        <span className="text-textWhite font-medium">
                          {it.title}
                        </span>
                        {it.text ? (
                          <span className="text-textGrey"> — {it.text}</span>
                        ) : null}
                      </>
                    ) : (
                      JSON.stringify(it)
                    )}
                  </li>
                ))}
              </ul>
            )}

          {/* Specs grid */}
          {s.kind === "specs" && s.items && (
            <div className="grid md:grid-cols-2 gap-4 text-textGrey">
              {Object.entries(s.items).map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border border-darkGrey p-4 bg-darkGrey/30"
                >
                  <div className="text-textWhite font-medium mb-1 uppercase tracking-wide text-microcopy">
                    {k}
                  </div>
                  {Array.isArray(v) ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {v.map((line: any, i: number) => (
                        <li key={i}>
                          {typeof line === "string"
                            ? line
                            : `${line.part || ""} ${line.spec || ""}`}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div>{String(v)}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* FAQ block */}
          {s.kind === "faq" && Array.isArray(s.items) && (
            <div className="divide-y divide-darkGrey/70 border border-darkGrey rounded-2xl bg-darkGrey/30">
              {s.items.map((qa: any, i: number) => (
                <div key={i} className="p-4">
                  <div className="font-heading text-h4 text-textWhite">
                    {qa.q}
                  </div>
                  <div className="text-textGrey mt-1">{qa.a}</div>
                </div>
              ))}
            </div>
          )}

          {/* Video */}
          {s.kind === "video" && s.video_url && (
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src={s.video_url.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={s.title || "Video"}
              />
            </div>
          )}

          {/* CTA */}
          {s.cta_label && s.cta_href && (
            <div className="mt-4">
              <a href={s.cta_href} className="btn-primary inline-flex">
                {s.cta_label}
              </a>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
