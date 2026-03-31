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
            Measure Your Mind with <span style={{ color: "#14E0C8" }}>Precision.</span>
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
              backgroundColor: "#14E0C8", // Mint Teal
              color: "#FFFFFF",
              border: "none",
              padding: "18px 40px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(20, 224, 200, 0.4)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(20, 224, 200, 0.5)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(20, 224, 200, 0.4)";
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
            backgroundColor: "#E0F8F5", // Soft Seafoam
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
            boxShadow: "0 25px 50px -12px rgba(15, 44, 90, 0.15)",
            border: "1px solid rgba(229, 231, 235, 0.5)",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            width: isMobile ? "280px" : "400px",
            height: isMobile ? "280px" : "400px",
          }}>
            <BrainCircuit size={isMobile ? 140 : 200} color="#0F2C5A" strokeWidth={1.5} />
            {/* Small decorative accent */}
            <div style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              backgroundColor: "#14E0C8",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              boxShadow: "0 8px 16px rgba(20, 224, 200, 0.4)"
            }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
