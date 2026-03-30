"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { calcIQ, clsIQ, pct } from "@/utils/iqCalc";

export default function ResultsPage() {
  const router = useRouter();
  const [resultData, setResultData] = useState<{ iq: number, cl: string, p: number, catPcts: Record<string, number> } | null>(null);

  useEffect(() => {
    const answersRaw = localStorage.getItem("testAnswers");
    const ageRaw = localStorage.getItem("testAge");
    if (!answersRaw) {
      router.push("/");
      return;
    }
    try {
      const answers = JSON.parse(answersRaw);
      const age = parseInt(ageRaw || "25", 10);
      let raw = 0, mx = 0, tt = 0;
      answers.forEach((a: any) => {
        raw += a.pts;
        mx += a.max;
        tt += a.t;
      });

      const iq = calcIQ(raw, mx, age);
      const cl = clsIQ(iq);
      const p = pct(iq);

      const CATS = ["LA","MA","PS","VR","WM","SP","SR"];
      const catPcts: Record<string, number> = {};
      CATS.forEach(cat => {
        let cpraw = 0, cpmx = 0;
        answers.filter((a: any) => a.c === cat).forEach((a: any) => {
          cpraw += a.pts;
          cpmx += a.max;
        });
        catPcts[cat] = cpmx ? Math.round((cpraw / cpmx) * 100) : 0;
      });

      setResultData({ iq, cl, p, catPcts });
    } catch {
      router.push("/");
    }
  }, [router]);

  if (!resultData) return <div>Calculating results...</div>;

  return (
    <div id="s-results" className="scr on">
      <div className="rhero" style={{ background: "var(--tl)", color: "#fff", textAlign: "center", padding: "52px 24px 44px" }}>
        <div className="rhi" style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div className="rlb sans" id="rlb" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: "12px" }}>Your IQ Result</div>
          <div className="rsco" id="rsco" style={{ fontSize: "clamp(88px, 21vw, 124px)", fontWeight: "700", lineHeight: "1", color: "#fff", letterSpacing: "-.05em", textShadow: "0 4px 24px rgba(0,0,0,.18)" }}>{resultData.iq}</div>
          <div><span className="rcls sans" id="rcls" style={{ display: "inline-block", fontSize: "clamp(14px, 4vw, 20px)", fontWeight: "700", background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.3)", borderRadius: "100px", padding: "8px 22px", marginTop: "14px", color: "#fff" }}>{resultData.cl}</span></div>
          <div className="rpct sans" id="rpct" style={{ fontSize: "14px", color: "rgba(255,255,255,.65)", marginTop: "8px" }}>Top {100 - resultData.p}% of the population • {resultData.p}th percentile</div>
        </div>
      </div>
      <div className="rbody" style={{ background: "var(--cr)", padding: "36px 24px 72px" }}>
        <div className="rbi" style={{ maxWidth: "640px", margin: "0 auto" }}>

          <div className="rcard" style={{ background: "#fff", borderRadius: "14px", padding: "26px", marginBottom: "14px", border: "1px solid var(--cr3)", boxShadow: "0 2px 12px rgba(15,44,90,.08)" }}>
            <div className="rct sans" style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "18px", paddingBottom: "10px", borderBottom: "1px solid var(--cr3)" }}>Scale Positioning</div>
            <div className="gbar" style={{ height: "9px", borderRadius: "5px", position: "relative", margin: "18px 0 10px", background: "linear-gradient(90deg,#EF4444 0%,#F97316 20%,#EAB308 42%,#22C55E 62%,#3B82F6 80%,#8B5CF6 100%)" }}>
              <div className="gpin" id="gpin" style={{ left: `${Math.max(2, Math.min(98, ((resultData.iq - 60) / (162 - 60)) * 100))}%`, position: "absolute", top: "50%", transform: "translate(-50%, -50%)", width: "22px", height: "22px", borderRadius: "50%", background: "#fff", border: "3px solid var(--tl)", boxShadow: "0 2px 10px rgba(28,112,112,.28)", transition: "left 1.5s cubic-bezier(.34,1.56,.64,1)" }}></div>
            </div>
            <div className="glbs sans" style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", color: "#aaa" }}>
              <span>Below Avg 70</span><span>Average 100</span><span>Above 115</span><span>Superior 130+</span>
            </div>
          </div>

          <div className="dom-grid" id="dom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "14px" }}>
            {Object.entries(resultData.catPcts).map(([cat, pct]) => (
              <div key={cat} className="dom-card" style={{ background: "#fff", border: "1px solid var(--cr3)", borderRadius: "12px", padding: "16px 18px", boxShadow: "var(--sh)" }}>
                <div className="dom-card-top" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div className="dom-card-name" style={{ fontFamily: "system-ui, sans-serif", fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1.2px", color: "#666" }}>{cat}</div>
                  <div className="dom-card-pct" style={{ fontSize: "28px", fontWeight: "700", lineHeight: "1" }}>{pct}%</div>
                </div>
                <div className="dom-track" style={{ height: "5px", background: "var(--cr2)", borderRadius: "3px", overflow: "hidden" }}>
                  <div className="dom-fill" style={{ height: "100%", borderRadius: "3px", width: `${pct}%`, backgroundColor: pct >= 80 ? "var(--tl)" : pct >= 50 ? "#3B82F6" : "#F59E0B" }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="racts" style={{ display: "flex", gap: "10px", marginTop: "22px", flexDirection: "column" }}>
            <button className="btn bout" onClick={() => router.push("/")} style={{ background: "#fff", color: "var(--tl)", border: "2px solid var(--tl)", padding: "14px 34px", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center" }}>&#8592; Retake Assessment</button>
          </div>
          <div className="rdisc sans" style={{ fontSize: "11px", color: "#bbb", textAlign: "center", lineHeight: "1.8", marginTop: "20px" }}>For educational and entertainment purposes only. For a clinically certified score consult a licensed psychologist.</div>
        </div>
      </div>
    </div>
  );
}
