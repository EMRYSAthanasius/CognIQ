import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CognIQ — Adaptive Intelligence Assessment",
  description: "Rigorously calibrated to match clinical psychometric standards using a normalized bell curve distribution.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="hdr">
          <div className="hi">
            <div className="logo">
              <div className="lmark">IQ</div>
              <span className="lname">Cogn<em>IQ</em></span>
            </div>
            <div className="hdr-r" id="hdr-r"></div>
          </div>
        </header>
        <div className="pw" id="pw"><div className="pb" id="pb"></div></div>
        {children}
      </body>
    </html>
  );
}
