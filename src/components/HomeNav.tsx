"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 48px",
      backgroundColor: scrolled ? "#0F2C5A" : "transparent",
      position: "fixed",
      width: "100%",
      top: 0,
      zIndex: 50,
      fontFamily: "var(--font-geist-sans)",
      transition: "background-color 0.3s ease",
      borderBottom: scrolled ? "none" : "1px solid rgba(229, 231, 235, 0.2)",
    }}>
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        {/* Minimalist Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            backgroundColor: scrolled ? "#FFFFFF" : "#0F2C5A",
            color: scrolled ? "#0F2C5A" : "#FFFFFF",
            fontWeight: "700",
            fontSize: "14px",
            padding: "4px 8px",
            borderRadius: "4px",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
          }}>
            IQ
          </div>
          <span style={{
            color: scrolled ? "#FFFFFF" : "#0F2C5A",
            fontWeight: "700",
            fontSize: "20px",
            letterSpacing: "-0.5px",
            transition: "color 0.3s ease",
          }}>
            Cogn<span style={{ fontWeight: "300", color: scrolled ? "#A7EBE1" : "#6B7280" }}>IQ</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href="#science" style={{ color: scrolled ? "#FFFFFF" : "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500", transition: "color 0.3s ease" }}>Science</Link>
          <Link href="#methodology" style={{ color: scrolled ? "#FFFFFF" : "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500", transition: "color 0.3s ease" }}>Methodology</Link>
          <Link href="#about" style={{ color: scrolled ? "#FFFFFF" : "#1F2937", textDecoration: "none", fontSize: "15px", fontWeight: "500", transition: "color 0.3s ease" }}>About</Link>

          {/* Login Button (Ghost Sapphire turning Solid Teal on Hover) */}
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button style={{
              backgroundColor: "transparent",
              color: scrolled ? "#FFFFFF" : "#0F2C5A",
              border: `1.5px solid ${scrolled ? "#FFFFFF" : "#0F2C5A"}`,
              padding: "8px 20px",
              borderRadius: "6px",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2D6A7A";
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.borderColor = "#2D6A7A";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = scrolled ? "#FFFFFF" : "#0F2C5A";
              e.currentTarget.style.borderColor = scrolled ? "#FFFFFF" : "#0F2C5A";
            }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
