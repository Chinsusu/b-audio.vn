import type { ReactNode } from "react";

import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6">
      <Header />
      {children}
    </div>
  );
}
