"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOCK_POOL } from "@/data/mockPool";
import { usePillarTimer } from "@/hooks/useTimer";

// Cryptographically secure shuffle
function shuf(a: any[]) {
  let b = a.slice();
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    for (let i = b.length - 1; i > 0; i--) {
      const randomBuffer = new Uint32Array(1);
      window.crypto.getRandomValues(randomBuffer);
      let j = randomBuffer[0] % (i + 1);
      let t = b[i];
      b[i] = b[j];
      b[j] = t;
    }
  } else {
    for (let i = b.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let t = b[i];
      b[i] = b[j];
      b[j] = t;
    }
  }
  return b;
}

function generateTestSession() {
  const SESSION_LENGTH = 60;
  const categories = ["LA", "MA", "PS", "VR", "WM", "SP", "SR"];
  const qsPerCategory = Math.ceil(SESSION_LENGTH / categories.length);

  let sessionQs: any[] = [];

  for (const cat of categories) {
    const catQs = MOCK_POOL.filter(q => q.category === cat);
    const shuffledCatQs = shuf(catQs).slice(0, qsPerCategory);
    sessionQs = sessionQs.concat(shuffledCatQs);
  }

  // Trim to exactly 60 questions and shuffle the whole session
  return shuf(sessionQs).slice(0, SESSION_LENGTH);
}

export default function QuizEngine() {
  const router = useRouter();
  const [qs, setQs] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [isTestOver, setIsTestOver] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    setQs(generateTestSession());
  }, []);


  const { timeLeft, elapsed, formattedTime, startTimer, stopTimer } = usePillarTimer({
    category: qs[idx]?.category || "LA",
    onTimeUp: () => {
      // We read latest states in advanceQuestion by relying on functional state updates where possible,
      // but chosen and qs/idx are closed over here. By the time this runs, it uses the current closure.
      // A better way is using a ref or just setting chosen to "timeout".
      // But we can just use the regular logic and ensure the hook invokes the *latest* callback.
      if (chosen === null) {
        const q = qs[idx];
        if (q) {
          setAnswers(prev => [...prev, { c: q.category, p: q.difficulty, ok: false, t: q.timerOverride, pts: 0, max: q.difficulty }]);
          advanceQuestion();
        }
      }
    }
  });

  useEffect(() => {
    if (qs.length > 0 && !isTestOver && chosen === null && !isCalculating) {
      startTimer();
    }
  }, [idx, qs, isTestOver, startTimer, chosen, isCalculating]);

  const pick = (optIdx: number) => {
    if (chosen !== null) return;
    stopTimer();
    const q = qs[idx];
    const ok = optIdx === q.a;
    const t = Math.min(q.timerOverride, elapsed);
    setAnswers(prev => [...prev, { c: q.category, p: q.difficulty, ok, t, pts: ok ? q.difficulty : 0, max: q.difficulty }]);
    setChosen(optIdx);
  };

  const advanceQuestion = () => {
    if (idx + 1 >= qs.length) {
      setIsTestOver(true);
      setIsCalculating(true);
      setAnswers(latestAnswers => {
        localStorage.setItem("testAnswers", JSON.stringify(latestAnswers));
        return latestAnswers;
      });

      // Simulate calculation transition
      setTimeout(() => {
        router.push("/results");
      }, 3000);
    } else {
      setChosen(null);
      setIdx(prev => prev + 1);
    }
  };

  if (qs.length === 0) return <div>Loading assessment...</div>;

  if (isCalculating) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "var(--bg)", color: "#0F2C5A" }}>
        <div style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Calculating Analytical Profile...</div>
        <div className="spinner" style={{ width: "40px", height: "40px", border: "4px solid #E2E8F0", borderTop: "4px solid #0F2C5A", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const q = qs[idx];

  return (
    <div id="s-test" className="scr on" style={{ background: "var(--cr)" }}>
      <div className="qstrip" id="qstrip">
        <div className="qsi">
          <span className="qtag" id="qtag" style={{ background: "var(--tl)", padding: "5px 12px", borderRadius: "100px", color: "#fff", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px" }}>{q.category}</span>
          <span className="qpt sans" id="qpt" style={{ fontSize: "12px", color: "#999" }}>Question {idx + 1} of {qs.length}</span>
          <div className={`qtmr ${timeLeft <= 15 ? 'warn' : ''}`} id="qtmr" style={{ display: "flex", gap: "6px", alignItems: "center", background: "var(--cr)", border: "1.5px solid var(--ln)", borderRadius: "100px", padding: "5px 14px", fontSize: "13px", fontWeight: "bold", color: "#666" }}>
            <span id="tnum">{formattedTime}</span>
          </div>
        </div>
      </div>

      <div className="qbody" id="qbody" style={{ padding: "40px 24px 28px", minHeight: "calc(100vh - 110px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="qcw" id="qcw" style={{ width: "100%", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>

          {/* Visual Diagrams Renderer */}
          {q.diagramData && q.diagramData.type === 'matrix' && q.diagramData.m && (
            <div className="qmat" style={{ display: "grid", gridTemplateColumns: `repeat(${q.diagramData.m[0].length}, 1fr)`, gap: "8px", margin: "0 auto 28px", maxWidth: "400px" }}>
              {q.diagramData.m.map((row: any[], rIdx: number) => (
                row.map((cell: any, cIdx: number) => (
                  <div key={`${rIdx}-${cIdx}`} style={{
                    background: "#fff", border: "2px solid var(--ln)", borderRadius: "8px", padding: "16px",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", color: "#1F2937",
                    minHeight: "60px"
                  }}>
                    {cell === "?" ? <span style={{ color: "var(--or)" }}>?</span> : cell}
                  </div>
                ))
              ))}
            </div>
          )}

          {q.diagramData && q.diagramData.type === 'svg' && q.diagramData.svgKey && (
            <div style={{ marginBottom: "28px", display: "flex", justifyContent: "center" }}>
              <img src={`/images/${q.diagramData.svgKey}.svg`} alt="Question reference" style={{ maxWidth: "100%", maxHeight: "200px" }} />
            </div>
          )}

          {q.diagramData && q.diagramData.type === 'memory' && q.diagramData.memseq && (
            <div className="memseq sans" style={{ fontSize: "clamp(18px, 4.5vw, 28px)", fontWeight: "bold", color: "var(--tl)", marginBottom: "20px", letterSpacing: "4px", padding: "20px", background: "var(--tllt)", borderRadius: "12px", border: "1.5px solid var(--tlmd)" }}>{q.diagramData.memseq}</div>
          )}

          <div className="qinst sans" style={{ fontSize: "clamp(15px, 2.8vw, 19px)", fontWeight: "bold", color: "#1F2937", marginBottom: "28px", lineHeight: "1.6" }}>{q.q}</div>

          <div className="opts" id="opts" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "8px" }}>
            {q.o.map((opt: string, i: number) => (
              <button
                key={i}
                className={`opt sans ${chosen === i ? 'ch' : ''}`}
                onClick={() => pick(i)}
                style={{
                  background: chosen === i ? "var(--tllt)" : "#fff",
                  border: chosen === i ? "2px solid var(--tl)" : "2px solid var(--ln)",
                  borderRadius: "12px", padding: "18px 14px", fontSize: "15px", fontWeight: chosen === i ? "bold" : "500",
                  color: "#1F2937", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: chosen !== null && chosen !== i ? 0.4 : 1, pointerEvents: chosen !== null ? 'none' : 'auto'
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="qfoot" style={{ background: "var(--cr)", padding: "0 24px 48px", display: "flex", justifyContent: "center" }}>
        {chosen !== null && (
          <button className="bnext sans vis" id="bnext" onClick={advanceQuestion} style={{ background: "var(--tl)", color: "#fff", border: "none", borderRadius: "100px", padding: "15px 48px", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "9px", boxShadow: "0 4px 18px rgba(15, 44, 90, .25)", minWidth: "200px", justifyContent: "center" }}>
            {idx + 1 >= qs.length ? 'Submit Assessment →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}