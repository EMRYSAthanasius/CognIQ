import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CognIQ — Adaptive Intelligence Assessment",
  description: "Rigorously calibrated to match clinical psychometric standards using a normalized bell curve distribution.",
};

import GlobalLayout from "@/components/GlobalLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
