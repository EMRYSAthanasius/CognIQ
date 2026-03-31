"use client";

import HomeNav from "@/components/HomeNav";
import Link from "next/link";
import { Brain, Fingerprint, Activity } from "lucide-react";

export default function DetailedHomepage() {
  return (
    <div style={{ backgroundColor: "#FFFFFF", color: "#1F2937", minHeight: "100vh", fontFamily: "var(--font-geist-sans)", scrollBehavior: "smooth" }}>
      {/* A. Professional Header */}
      <HomeNav />

      {/* B. "The Frontier" Hero Section */}
      <section style={{
        padding: "100px 48px",
        textAlign: "left",
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
          <h1 style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#0F2C5A",
            lineHeight: "1.1",
            marginBottom: "24px",
            letterSpacing: "-1px"
          }}>
            Precision Psychometrics<br/>
            for the <span style={{ color: "#14E0C8" }}>Modern Mind.</span>
          </h1>

          <p style={{
            fontSize: "18px",
            color: "#4B5563",
            lineHeight: "1.8",
            marginBottom: "48px",
            fontWeight: "400"
          }}>
            Welcome to Cogn-IQ, an engineered digital environment dedicated to the rigorous measurement of fluid and crystallized intelligence. Our platform moves beyond traditional online assessments, utilizing advanced psychometric models and Item Response Theory to provide an adaptive, clinical-grade analysis of your unique cognitive profile. Every data point is calibrated for scientific accuracy, enabling individuals and organizations to securely map processing capacity against standardized global demographics.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            {/* Teal Filled Button */}
            <Link href="/assessment" style={{ textDecoration: "none" }}>
              <button style={{
                backgroundColor: "#14E0C8",
                color: "#FFFFFF",
                border: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(20, 224, 200, 0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Start Your Assessment
              </button>
            </Link>

            {/* Sapphire Filled Button */}
            <Link href="/assessment" style={{ textDecoration: "none" }}>
              <button style={{
                backgroundColor: "#0F2C5A",
                color: "#FFFFFF",
                border: "none",
                padding: "16px 32px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(15, 44, 90, 0.3)",
                transition: "transform 0.2s ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                Administer Test
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* C. "What is Cogn-IQ?" Section */}
      <section id="about" style={{ backgroundColor: "#F9FAFB", padding: "80px 48px", borderTop: "1px solid #E5E7EB", borderBottom: "1px solid #E5E7EB" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>

          {/* Detailed Content */}
          <div>
            <h2 style={{ fontSize: "14px", color: "#14E0C8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "16px" }}>The Science of Measurement</h2>
            <h3 style={{ fontSize: "36px", color: "#0F2C5A", fontWeight: "800", marginBottom: "24px", lineHeight: "1.2" }}>What is Cogn-IQ?</h3>
            <p style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.8" }}>
              Intelligence Quotient (IQ) is fundamentally not a static measure of acquired knowledge, but rather a dynamic evaluation of raw cognitive processing capacity, working memory, and fluid reasoning abilities. Cogn-IQ represents the culmination of algorithmic precision applied to behavioral psychometrics. We do not test what you know; we evaluate how efficiently you process novel, abstract information under cognitive load.<br/><br/>
              To achieve this clinical fidelity, our diagnostic architecture leverages a Gaussian distribution model, rigorously standardized to a mean baseline of 100 with a standard deviation (SD) of 15. This statistical alignment mirrors the gold standards of classical psychometric tools such as the WAIS (Wechsler Adult Intelligence Scale) and the Stanford-Binet intelligence scales.<br/><br/>
              Furthermore, the Cogn-IQ assessment engine is powered by a deeply engineered, proprietary pool of over 5,000 algorithmic questions. Through the use of Item Response Theory (IRT), the difficulty of the matrix actively calibrates in real-time to the test-taker's performance, eliminating ceiling effects and ensuring unparalleled measurement accuracy.
            </p>
          </div>

          {/* Conceptual Graphic */}
          <div style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            padding: "48px",
            boxShadow: "0 20px 40px rgba(15, 44, 90, 0.08)",
            border: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "1/1",
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Stylized background grid representing logic/matrices */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundSize: "40px 40px",
              backgroundImage: "linear-gradient(to right, #F3F4F6 1px, transparent 1px), linear-gradient(to bottom, #F3F4F6 1px, transparent 1px)",
              opacity: 0.5
            }}></div>

            {/* Abstract Brain/Logic Icon */}
            <Brain size={160} color="#14E0C8" style={{ filter: "drop-shadow(0px 8px 16px rgba(20, 224, 200, 0.4))", zIndex: 10 }} />
          </div>

        </div>
      </section>

      {/* D. "Assessment Pillars" Section */}
      <section id="methodology" style={{ padding: "100px 48px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px", maxWidth: "800px", margin: "0 auto 64px auto" }}>
          <h2 style={{ fontSize: "14px", color: "#14E0C8", textTransform: "uppercase", letterSpacing: "2px", fontWeight: "700", marginBottom: "16px" }}>Methodological Framework</h2>
          <h3 style={{ fontSize: "40px", color: "#0F2C5A", fontWeight: "800", lineHeight: "1.2" }}>Core Pillars of Cognitive Analysis</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px" }}>
          {/* Matrix Reasoning */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <Fingerprint size={24} />
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Matrix Reasoning</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              Our matrix reasoning module isolates and measures abstract, non-verbal logical processing. It relies heavily on pattern induction and deductive reasoning tasks that require the user to identify underlying rules within complex geometric sequences. By stripping away cultural and linguistic biases, this pillar provides the purest measurement of raw fluid intelligence (Gf), reflecting the brain's inherent capability to solve entirely novel problems without reliance on prior experiential knowledge.
            </p>
          </div>

          {/* Numerical Sequences */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <Activity size={24} />
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Numerical Sequences</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              The numerical logic domain evaluates quantitative pattern matching, arithmetic visualization, and working memory manipulation. Subjects are presented with sequentially progressing numeric matrices that demand the rapid generation and testing of mathematical hypotheses. This section tests not just calculation ability, but the architectural capacity to hold multi-step operations in mind, effectively acting as an index for quantitative fluid intuition and mental processing bandwidth.
            </p>
          </div>

          {/* Verbal Analogy */}
          <div style={{ padding: "32px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "0 10px 25px rgba(0,0,0,0.03)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "#0F2C5A", color: "#14E0C8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}>
              <span style={{ fontWeight: "700", fontSize: "18px" }}>Aa</span>
            </div>
            <h4 style={{ fontSize: "20px", color: "#0F2C5A", fontWeight: "700", marginBottom: "16px" }}>Verbal Analogy</h4>
            <p style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.7" }}>
              Linguistic pattern identification goes beyond simple vocabulary retention. The verbal analysis pillar constructs complex, multi-layered analogies that require the subject to decode abstract relationships between concepts. It measures processing speed and the efficiency of the mind's semantic network. By challenging the individual to recognize parallel categorical relationships under strict time constraints, we establish a robust metric for verbal-logical articulation and crystallized synthesis.
            </p>
          </div>
        </div>
      </section>

      {/* E. Call to Action Banner (Seafoam background #E0F8F5) */}
      <section style={{ backgroundColor: "#E0F8F5", padding: "80px 48px", textAlign: "center", borderTop: "1px solid #A7EBE1" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", color: "#0F2C5A", fontWeight: "800", marginBottom: "24px" }}>
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
              padding: "18px 40px",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(20, 224, 200, 0.4)",
              transition: "transform 0.2s ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
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
