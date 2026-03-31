"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [edu, setEdu] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStart = () => {
    if (!name.trim() || !age.trim() || !edu) {
      setErrorMsg("Please fill in your name, age, and qualifications to continue.");
      return;
    }

    localStorage.setItem("testName", name.trim());
    localStorage.setItem("testAge", age.trim());
    localStorage.setItem("testEdu", edu.trim());

    router.push("/test");
  };

  return (
    <div id="s-setup" className="scr on" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg)" }}>
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

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", paddingTop: "80px" }}>
        {/* Profile Form */}
        <div style={{ width: "100%", maxWidth: "400px", textAlign: "left", background: "#fff", padding: "32px 24px", borderRadius: "16px", boxShadow: "0 8px 32px rgba(15, 44, 90, 0.08)", border: "1px solid var(--cr3)" }}>
          <h3 style={{ fontSize: "22px", marginBottom: "24px", color: "#0F2C5A", textAlign: "center", fontWeight: "700" }}>Enter Details to Begin</h3>

          {errorMsg && (
            <div style={{ color: '#B83232', backgroundColor: '#FEF5F5', border: '1px solid #F5A8A8', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '14px', fontWeight: 500 }}>
              {errorMsg}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label className="fl" style={{ color: '#1F2937', fontWeight: "600", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>Name *</label>
              <input className="fi" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Doe" style={{ padding: "12px 16px", fontSize: "15px" }} />
            </div>
            <div>
              <label className="fl" style={{ color: '#1F2937', fontWeight: "600", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>Age *</label>
              <input className="fi" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 25" min="1" max="120" style={{ padding: "12px 16px", fontSize: "15px" }} />
            </div>
            <div>
              <label className="fl" style={{ color: '#1F2937', fontWeight: "600", fontSize: "13px", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>Highest Qualification *</label>
              <select className="fi" value={edu} onChange={(e) => setEdu(e.target.value)} style={{ backgroundColor: "#fff", padding: "12px 16px", fontSize: "15px" }}>
                <option value="">Select Qualification</option>
                <option value="highschool">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="doctorate">Doctorate (PhD)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button className="btn bor bfw" style={{ fontSize: "16px", padding: "16px 24px", marginTop: "12px", borderRadius: "8px", fontWeight: "600", boxShadow: "0 4px 12px rgba(20, 224, 200, 0.2)" }} onClick={handleStart}>
              Start Assessment &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}