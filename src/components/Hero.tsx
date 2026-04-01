"use client";

import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section style={{
      padding: isMobile ? "140px 24px 80px" : "180px 48px 120px",
      width: "100%",
      backgroundColor: "#F9FAFB", // Slight off-white to make the hero pop
      display: "flex",
      justifyContent: "center",
      overflow: "hidden"
    }}>
      <div style={{
        maxWidth: "1280px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "64px" : "48px",
        alignItems: "center"
      }}>
        {/* Left Side: Typography & CTA */}
        <div style={{ textAlign: isMobile ? "center" : "left" }}>
          <h1 style={{
            fontSize: isMobile ? "48px" : "64px",
            fontWeight: "800",
            color: "#0F2C5A", // Deep Sapphire
            lineHeight: "1.1",
            marginBottom: "24px",
            letterSpacing: "-1.5px"
          }}>
            Measure Your Mind with <span style={{ color: "#2D6A7A" }}>Precision.</span>
          </h1>

          <p style={{
            fontSize: isMobile ? "18px" : "20px",
            color: "#1F2937", // Charcoal
            lineHeight: "1.6",
            marginBottom: "40px",
            fontWeight: "400",
            maxWidth: "600px",
            margin: isMobile ? "0 auto 40px" : "0 0 40px 0"
          }}>
            Join thousands of individuals globally taking the most accurate, algorithmically-generated cognitive assessment available. Standardized to clinical psychometric models.
          </p>

          <Link href="/assessment" style={{ textDecoration: "none" }}>
            <button style={{
              backgroundColor: "#2D6A7A", // Mint Teal
              color: "#FFFFFF",
              border: "none",
              padding: "18px 40px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(45, 106, 122, 0.4)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(45, 106, 122, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(45, 106, 122, 0.4)";
            }}
            >
              Test Your IQ
            </button>
          </Link>
        </div>

        {/* Right Side: Illustrative Visual */}
        <div style={{
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          alignItems: "center",
          position: "relative"
        }}>
          {/* Decorative background blobs/circles */}
          <div style={{
            position: "absolute",
            width: isMobile ? "300px" : "450px",
            height: isMobile ? "300px" : "450px",
            backgroundColor: "#F4F7F6", // Soft Seafoam
            borderRadius: "50%",
            zIndex: 0,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            filter: "blur(60px)",
            opacity: 0.8
          }}></div>

          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "32px",
            padding: isMobile ? "40px" : "64px",
            boxShadow: "0 25px 50px -12px rgba(15, 44, 90, 0.08)",
            border: "1px solid rgba(229, 231, 235, 0.5)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: isMobile ? "280px" : "400px",
            height: isMobile ? "280px" : "400px",
          }}>
            {/* Technical Schematic SVG */}
            <svg
              width={isMobile ? "160" : "240"}
              height={isMobile ? "160" : "240"}
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Thin connecting lines (Faint Slate Teal) */}
              <g stroke="#2D6A7A" strokeWidth="0.5" strokeOpacity="0.4">
                <line x1="20" y1="50" x2="50" y2="20" />
                <line x1="20" y1="50" x2="50" y2="80" />
                <line x1="50" y1="20" x2="80" y2="50" />
                <line x1="50" y1="80" x2="80" y2="50" />
                <line x1="50" y1="20" x2="50" y2="80" />
                <line x1="20" y1="50" x2="80" y2="50" />
                <line x1="35" y1="35" x2="65" y2="65" />
                <line x1="35" y1="65" x2="65" y2="35" />
              </g>

              {/* Data Nodes (Deep Sapphire) */}
              <g fill="#0F2C5A">
                <circle cx="20" cy="50" r="2.5" />
                <circle cx="50" cy="20" r="3.5" />
                <circle cx="80" cy="50" r="2.5" />
                <circle cx="50" cy="80" r="3.5" />
                <circle cx="50" cy="50" r="4.5" />
                <circle cx="35" cy="35" r="2" />
                <circle cx="65" cy="35" r="2" />
                <circle cx="35" cy="65" r="2" />
                <circle cx="65" cy="65" r="2" />
              </g>

              {/* Subtle outer connection ring */}
              <circle cx="50" cy="50" r="40" stroke="#2D6A7A" strokeWidth="0.25" strokeDasharray="2 2" />
            </svg>

            {/* Small decorative accent - Matte, no glow */}
            <div style={{
              position: "absolute",
              top: "-15px",
              right: "-15px",
              backgroundColor: "#2D6A7A",
              width: "30px",
              height: "30px",
              borderRadius: "4px",
              boxShadow: "0 4px 12px rgba(15, 44, 90, 0.1)"
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
