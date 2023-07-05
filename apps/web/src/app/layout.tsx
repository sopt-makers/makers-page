import "./global.css";

import { ReactNode } from "react";

export const runtime = "edge";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
