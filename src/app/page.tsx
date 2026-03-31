"use client";

import HomeNav from "@/components/HomeNav";
import Hero from "@/components/Hero";
import Link from "next/link";
import { Brain, Fingerprint, Activity, Globe, Users, Target, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function DetailedHomepage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#1F2937", minHeight: "100vh", fontFamily: "var(--font-geist-sans)", scrollBehavior: "smooth" }}>
      {/* A. Professional Header */}
      <HomeNav />

      {/* B. The New BRGHT-Style Hero Section */}
      <Hero />

      {/* C. Features Section (Horizontal Cards) */}
      <section id="features" style={{ padding: isMobile ? "80px 24px" : "120px 48px", backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
             <h2 style={{ fontSize: "14px", color: "#14E0C8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "16px" }}>The Standard</h2>
             <h3 style={{ fontSize: isMobile ? "32px" : "40px", color: "#0F2C5A", fontWeight: "800", lineHeight: "1.2" }}>Why Cogn-IQ?</h3>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
            gap: "32px"
          }}>
            {/* Feature 1 */}
            <div style={{ backgroundColor: "#E0F8F5", padding: "32px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ backgroundColor: "#FFFFFF", padding: "12px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <Target color="#0F2C5A" size={28} />
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#0F2C5A", marginBottom: "12px" }}>Precision Accuracy</h4>
              <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.6" }}>Calibrated to clinical SD=15 standard deviations to ensure results map flawlessly to established intelligence demographics.</p>
            </div>
            {/* Feature 2 */}
            <div style={{ backgroundColor: "#E0F8F5", padding: "32px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ backgroundColor: "#FFFFFF", padding: "12px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <ShieldCheck color="#0F2C5A" size={28} />
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#0F2C5A", marginBottom: "12px" }}>Culture Fair</h4>
              <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.6" }}>Matrix reasoning isolates raw fluid intelligence, removing bias from language, education level, and cultural background.</p>
            </div>
            {/* Feature 3 */}
            <div style={{ backgroundColor: "#E0F8F5", padding: "32px", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ backgroundColor: "#FFFFFF", padding: "12px", borderRadius: "12px", marginBottom: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                <Zap color="#0F2C5A" size={28} />
              </div>
              <h4 style={{ fontSize: "20px", fontWeight: "700", color: "#0F2C5A", marginBottom: "12px" }}>Adaptive Engine</h4>
              <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.6" }}>A proprietary bank of 5,000+ questions dynamically adjusts difficulty to rapidly find your exact cognitive threshold.</p>
            </div>
          </div>
        </div>
      </section>

      {/* D. Data Comparisons (Global & Peer) */}
      <section id="science" style={{ padding: isMobile ? "80px 24px" : "120px 48px", backgroundColor: "#F9FAFB" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "64px", alignItems: "center" }}>

          {/* Left: Global Comparison Data Vis */}
          <div>
             <h2 style={{ fontSize: "14px", color: "#14E0C8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "16px" }}>Demographic Analysis</h2>
             <h3 style={{ fontSize: isMobile ? "32px" : "40px", color: "#0F2C5A", fontWeight: "800", marginBottom: "24px", lineHeight: "1.2" }}>Contextualize Your Intellect Globally.</h3>
             <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.8", marginBottom: "32px" }}>
               Our statistical engine maps your raw score against thousands of verified assessments globally. See exactly where your cognitive processing speed and fluid reasoning rank on the world stage.
             </p>

             {/* Data List (Mockup of BRGHT style global comp) */}
             <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
               {/* UK */}
               <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                 <span style={{ fontSize: "24px" }}>🇬🇧</span>
                 <div style={{ flex: 1 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#0F2C5A" }}>
                     <span>United Kingdom</span>
                     <span>99.1 Avg</span>
                   </div>
                   <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "4px" }}>
                     <div style={{ width: "78%", height: "100%", backgroundColor: "#0F2C5A", borderRadius: "4px" }}></div>
                   </div>
                 </div>
               </div>
               {/* USA */}
               <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                 <span style={{ fontSize: "24px" }}>🇺🇸</span>
                 <div style={{ flex: 1 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#0F2C5A" }}>
                     <span>United States</span>
                     <span>97.4 Avg</span>
                   </div>
                   <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "4px" }}>
                     <div style={{ width: "70%", height: "100%", backgroundColor: "#14E0C8", borderRadius: "4px" }}></div>
                   </div>
                 </div>
               </div>
               {/* JP */}
               <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                 <span style={{ fontSize: "24px" }}>🇯🇵</span>
                 <div style={{ flex: 1 }}>
                   <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#0F2C5A" }}>
                     <span>Japan</span>
                     <span>105.2 Avg</span>
                   </div>
                   <div style={{ width: "100%", height: "8px", backgroundColor: "#E5E7EB", borderRadius: "4px" }}>
                     <div style={{ width: "92%", height: "100%", backgroundColor: "#0F2C5A", borderRadius: "4px" }}></div>
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* Right: Peer Comparison Graphic */}
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            padding: "48px",
            boxShadow: "0 20px 40px rgba(15, 44, 90, 0.08)",
            border: "1px solid #E5E7EB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: isMobile ? "auto" : "1/1"
          }}>
            <Users size={80} color="#14E0C8" style={{ marginBottom: "24px" }} />
            <h4 style={{ fontSize: "24px", color: "#0F2C5A", fontWeight: "800", marginBottom: "16px", textAlign: "center" }}>Peer Benchmarking</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.6", textAlign: "center", marginBottom: "32px" }}>
              Your results are parsed into percentiles, placing you accurately within the standard bell curve of the general population.
            </p>
            <div style={{ width: "100%", height: "120px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px" }}>
               <div style={{ width: "16%", height: "20%", backgroundColor: "#E0F8F5", borderRadius: "4px 4px 0 0" }}></div>
               <div style={{ width: "16%", height: "50%", backgroundColor: "#A7EBE1", borderRadius: "4px 4px 0 0" }}></div>
               <div style={{ width: "16%", height: "100%", backgroundColor: "#14E0C8", borderRadius: "4px 4px 0 0", position: "relative" }}>
                 <div style={{ position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#0F2C5A", color: "#FFF", fontSize: "12px", fontWeight: "700", padding: "4px 8px", borderRadius: "4px" }}>YOU</div>
               </div>
               <div style={{ width: "16%", height: "50%", backgroundColor: "#A7EBE1", borderRadius: "4px 4px 0 0" }}></div>
               <div style={{ width: "16%", height: "20%", backgroundColor: "#E0F8F5", borderRadius: "4px 4px 0 0" }}></div>
            </div>
          </div>

        </div>
      </section>

      {/* E. "Assessment Pillars" Section (Realigned to grid) */}
      <section id="methodology" style={{ padding: isMobile ? "80px 24px" : "120px 48px", maxWidth: "1280px", margin: "0 auto", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ textAlign: "center", marginBottom: "64px", maxWidth: "800px", margin: "0 auto 64px auto" }}>
          <h2 style={{ fontSize: "14px", color: "#14E0C8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "16px" }}>Methodological Framework</h2>
          <h3 style={{ fontSize: isMobile ? "32px" : "40px", color: "#0F2C5A", fontWeight: "800", lineHeight: "1.2" }}>Core Pillars of Cognitive Analysis</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "40px" }}>
          {/* Matrix Reasoning */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <Fingerprint size={24} />
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Matrix Reasoning</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              Our matrix reasoning module isolates and measures abstract, non-verbal logical processing. It relies heavily on pattern induction and deductive reasoning tasks that require the user to identify underlying rules within complex geometric sequences.
            </p>
          </div>

          {/* Numerical Sequences */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <Activity size={24} />
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Numerical Sequences</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              The numerical logic domain evaluates quantitative pattern matching, arithmetic visualization, and working memory manipulation. Subjects are presented with sequentially progressing numeric matrices that demand rapid generation of mathematical hypotheses.
            </p>
          </div>

          {/* Verbal Analogy */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <span style={{ fontWeight: "700", fontSize: "18px" }}>Aa</span>
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Verbal Analogy</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              Linguistic pattern identification goes beyond simple vocabulary retention. The verbal analysis pillar constructs complex, multi-layered analogies that require the subject to decode abstract relationships between concepts under strict time constraints.
            </p>
          </div>
        </div>
      </section>

      {/* F. Call to Action Banner (Seafoam background #E0F8F5) */}
      <section style={{ backgroundColor: "#E0F8F5", padding: isMobile ? "80px 24px" : "120px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: isMobile ? "32px" : "48px", color: "#0F2C5A", fontWeight: "800", marginBottom: "24px", letterSpacing: "-1px" }}>
            Explore your cognitive boundaries today.
          </h2>
          <p style={{ fontSize: "18px", color: "#1F2937", lineHeight: "1.6", marginBottom: "40px" }}>
            Whether for clinical self-discovery, academic benchmarking, or professional institutional screening, Cogn-IQ provides the definitive metric for human intelligence. Step into the frontier of psychometrics.
          </p>

          <Link href="/assessment" style={{ textDecoration: "none" }}>
            <button style={{
              backgroundColor: "#14E0C8",
              color: "#FFFFFF",
              border: "none",
              padding: "18px 48px",
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
              Begin Assessment
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#0F2C5A", color: "#FFFFFF", padding: "40px 48px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#9CA3AF" }}>
          &copy; {new Date().getFullYear()} Cogn-IQ Psychometrics. Standardized Cognitive Measurement.<br/>
          Standard Deviation (SD) = 15 | Mean IQ Baseline = 100
        </p>
      </footer>
    </div>
  );
}
