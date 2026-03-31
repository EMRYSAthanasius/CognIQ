"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStart = () => {
    router.push("/setup");
  };

  return (
    <div id="s-home" className="scr on">
      {/* Header with hamburger menu */}
      <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px 24px', position: 'absolute', top: 0, right: 0, width: '100%', zIndex: 10 }}>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px', color: '#0F2C5A' }}
          >
            <Menu size={28} />
          </button>

          {menuOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid var(--cr3)', width: '150px', overflow: 'hidden' }}>
              <button
                onClick={() => router.push("/login")}
                style={{ width: '100%', padding: '12px 16px', background: 'transparent', border: 'none', textAlign: 'left', cursor: 'pointer', fontSize: '15px', fontWeight: 500, color: '#1F2937' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--cr2)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="hero">
        <div className="htag">&#9733; Accurate &amp; Standardised</div>
        <h1 style={{ color: "#0F2C5A" }}>
          Clinical-Grade<br />
          <span className="ac" style={{ color: "#0F2C5A" }}>Cognitive Assessment</span>
        </h1>
        <p className="hero-p sans" style={{ color: "#1F2937" }}>
          Measure your fluid intelligence with precision. Our assessment is engineered using psychometric standards to provide an accurate, data-driven analysis of your cognitive profile.
        </p>
        <div className="hstats">
          <div className="hs">
            <div className="hsn">100</div>
            <div className="hsl">Mean IQ</div>
          </div>
          <div className="hs">
            <div className="hsn">15</div>
            <div className="hsl">Std Deviation</div>
          </div>
          <div className="hs">
            <div className="hsn">5000+</div>
            <div className="hsl">Data Points</div>
          </div>
          <div className="hs">
            <div className="hsn">7</div>
            <div className="hsl">Cognitive Domains</div>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", margin: "0 auto 48px", maxWidth: "700px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--cr)", padding: "10px 16px", borderRadius: "100px", border: "1px solid var(--ln)", fontFamily: "-apple-system,sans-serif", fontSize: "13px", fontWeight: "600", color: "var(--tl)" }}>
            <div style={{ color: "var(--or)" }}>✓</div> 5,000+ Question Pool
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--cr)", padding: "10px 16px", borderRadius: "100px", border: "1px solid var(--ln)", fontFamily: "-apple-system,sans-serif", fontSize: "13px", fontWeight: "600", color: "var(--tl)" }}>
            <div style={{ color: "var(--or)" }}>✓</div> Instant Analytical Reporting
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "var(--cr)", padding: "10px 16px", borderRadius: "100px", border: "1px solid var(--ln)", fontFamily: "-apple-system,sans-serif", fontSize: "13px", fontWeight: "600", color: "var(--tl)" }}>
            <div style={{ color: "var(--or)" }}>✓</div> Mensa-Standard Matrix Reasoning
          </div>
        </div>

        {/* Start Assessment Button */}
        <div style={{ maxWidth: "400px", margin: "0 auto 48px", textAlign: "center" }}>
          <button className="btn bor bfw" style={{ fontSize: "18px", padding: "18px 32px", borderRadius: "8px", fontWeight: "600", boxShadow: "0 6px 16px rgba(20, 224, 200, 0.25)" }} onClick={handleStart}>
            Start Assessment &#8594;
          </button>
        </div>
      </div>

      <div className="tbar" style={{ background: "var(--cr)" }}>
        <div className="tin" style={{ flexDirection: "column", alignItems: "center", textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontSize: "28px", marginBottom: "16px", color: "#0F2C5A" }}>Our Methodology</h2>
          <p className="sans" style={{ fontSize: "16px", color: "#1F2937", maxWidth: "700px", lineHeight: "1.7" }}>
            Cogn-IQ utilizes Item Response Theory (IRT) and a vast pool of over 5,000 unique problems to ensure no two assessments are identical. Our algorithm adapts to your performance in real-time, narrowing down your IQ range with increasing precision as you progress.<br /><br />
            Unlike standard online quizzes, our scoring is mapped to a Gaussian Distribution (Bell Curve) with a mean of 100 and a standard deviation of 15 (SD=15), the global standard for professional IQ testing.
          </p>
        </div>
      </div>

      <div className="dsec" style={{ background: "#FFFFFF" }}>
        <div className="din">
          <div className="seye sans" style={{ color: "#14E0C8" }}>Assessment Pillars</div>
          <h2 className="stit" style={{ color: "#0F2C5A" }}>What This Test Measures</h2>
          <div className="dcards-new" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            <div className="dc" style={{ background: "var(--cr)", border: "1px solid var(--cr3)" }}>
              <div className="dcb" style={{ background: "var(--tl)" }}></div>
              <div className="dcn" style={{ color: "#0F2C5A" }}>Matrix Reasoning</div>
              <div className="dcd" style={{ color: "#1F2937" }}>Non-verbal visual patterns that measure your ability to identify rules and abstract relationships.</div>
            </div>
            <div className="dc" style={{ background: "var(--cr)", border: "1px solid var(--cr3)" }}>
              <div className="dcb" style={{ background: "#2563A8" }}></div>
              <div className="dcn" style={{ color: "#0F2C5A" }}>Quantitative Logic</div>
              <div className="dcd" style={{ color: "#1F2937" }}>Numerical sequences and arithmetic reasoning designed to test fluid mathematical intuition.</div>
            </div>
            <div className="dc" style={{ background: "var(--cr)", border: "1px solid var(--cr3)" }}>
              <div className="dcb" style={{ background: "#C47C20" }}></div>
              <div className="dcn" style={{ color: "#0F2C5A" }}>Verbal Analysis</div>
              <div className="dcd" style={{ color: "#1F2937" }}>Evaluates your capacity to process complex linguistic relationships and analogies.</div>
            </div>
            <div className="dc" style={{ background: "var(--cr)", border: "1px solid var(--cr3)" }}>
              <div className="dcb" style={{ background: "#7B3FA0" }}></div>
              <div className="dcn" style={{ color: "#0F2C5A" }}>Spatial Visualization</div>
              <div className="dcd" style={{ color: "#1F2937" }}>Measures 3D mental rotation and the ability to manipulate objects in a virtual space.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="tbar" style={{ padding: "40px 24px" }}>
        <div className="tin" style={{ maxWidth: "800px", textAlign: "center", flexDirection: "column", gap: "16px" }}>
          <h3 style={{ fontSize: "20px" }}>Scientific Basis</h3>
          <p className="sans" style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
            Scores are calculated utilizing a normalized bell curve distribution with a standard deviation (SD) of 15. Your result positions you accurately against global demographic percentiles, ensuring a rigorously precise and clinical-grade IQ estimation.
          </p>
        </div>
      </div>
    </div>
  );
}
