"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HomeNav() {
  const pathname = usePathname();

  // If we're not on the root page, we might just want a simple nav or not show this detailed one,
  // but for now, we'll return a professional nav designed primarily for the new homepage.
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 48px",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid #E5E7EB",
      position: "sticky",
      top: 0,
      zIndex: 50,
      fontFamily: "var(--font-geist-sans)"
    }}>
      {/* Minimalist Logo (Sapphire) */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{
          backgroundColor: "#0F2C5A",
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: "14px",
          padding: "4px 8px",
          borderRadius: "4px",
          letterSpacing: "0.5px"
        }}>
          IQ
        </div>
        <span style={{
          color: "#0F2C5A",
          fontWeight: "700",
          fontSize: "20px",
          letterSpacing: "-0.5px"
        }}>
          Cogn<span style={{ fontWeight: "300", color: "#6B7280" }}>IQ</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <Link href="#science" style={{ color: "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>Science</Link>
        <Link href="#methodology" style={{ color: "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>Methodology</Link>
        <Link href="#about" style={{ color: "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500" }}>About</Link>

        {/* Login Button (Teal Outline) */}
        <Link href="/login" style={{ textDecoration: "none" }}>
          <button style={{
            backgroundColor: "transparent",
            color: "#14E0C8",
            border: "1.5px solid #14E0C8",
            padding: "8px 20px",
            borderRadius: "6px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#14E0C8";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#14E0C8";
          }}
          >
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
