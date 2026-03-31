"use client";

import { usePathname } from "next/navigation";

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <>
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
    </>
  );
}