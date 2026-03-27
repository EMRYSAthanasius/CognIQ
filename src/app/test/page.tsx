"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { EASY, MEDIUM, HARD } from "@/utils/questions";

// Cryptographically secure shuffle (from original AGENTS.md requirements)
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

export default function TestPage() {
  const router = useRouter();
  const [qs, setQs] = useState<any[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [chosen, setChosen] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [elapsed, setElapsed] = useState(0);
  const [isTestOver, setIsTestOver] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    // In the future this will be fetched from Supabase.
    // Using the original 60 questions from index.html combined into one array.
    const allQs = shuf(EASY).concat(shuf(MEDIUM)).concat(shuf(HARD));
    setQs(allQs);
  }, []);

  const startTimer = useCallback((maxSec: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(maxSec);
    setElapsed(0);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        setElapsed(e => e + 1);
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (qs.length > 0 && !isTestOver && chosen === null) {
      startTimer(qs[idx]?.fast ? 20 : 60);
    }
    return () => clearInterval(timerRef.current);
  }, [idx, qs, isTestOver, startTimer, chosen]);

  const pick = (optIdx: number) => {
    if (chosen !== null) return;
    clearInterval(timerRef.current);
    const q = qs[idx];
    const ok = optIdx === q.a;
    const t = Math.min(q.fast ? 20 : 60, elapsed);
    setAnswers(prev => [...prev, { c: q.c, p: q.p, ok, t, pts: ok ? q.p : 0, max: q.p }]);
    setChosen(optIdx);
  };

  const advQ = () => {
    if (idx + 1 >= qs.length) {
      setIsTestOver(true);
      // Storing answers in localStorage to pass to results page
      localStorage.setItem("testAnswers", JSON.stringify(answers));
      localStorage.setItem("testAge", "25"); // Hardcoded for now, normally taken from setup screen
      router.push("/results");
    } else {
      setChosen(null);
      setIdx(idx + 1);
    }
  };

  if (qs.length === 0) return <div>Loading assessment...</div>;

  const q = qs[idx];
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const timeStr = `${m}:${s < 10 ? "0" : ""}${s}`;

  return (
    <div id="s-test" className="scr on" style={{ background: "var(--cr)" }}>
      <div className="qstrip" id="qstrip">
        <div className="qsi">
          <span className="qtag" id="qtag" style={{ background: "var(--tl)", padding: "5px 12px", borderRadius: "100px", color: "#fff", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px" }}>{q.c}</span>
          <span className="qpt sans" id="qpt" style={{ fontSize: "12px", color: "#999" }}>Question {idx + 1} of {qs.length}</span>
          <div className={`qtmr ${timeLeft <= 15 ? 'warn' : ''}`} id="qtmr" style={{ display: "flex", gap: "6px", alignItems: "center", background: "var(--cr)", border: "1.5px solid var(--ln)", borderRadius: "100px", padding: "5px 14px", fontSize: "13px", fontWeight: "bold", color: "#666" }}>
            <span id="tnum">{timeStr}</span>
          </div>
        </div>
      </div>

      <div className="qbody" id="qbody" style={{ padding: "40px 24px 28px", minHeight: "calc(100vh - 110px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="qcw" id="qcw" style={{ width: "100%", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          {q.seq && <div className="qform" style={{ fontSize: "clamp(20px, 5vw, 34px)", fontWeight: "bold", color: "var(--or)", marginBottom: "24px", letterSpacing: "-.02em" }}>{q.seq}</div>}
          {q.memseq && <div className="memseq sans" style={{ fontSize: "clamp(18px, 4.5vw, 28px)", fontWeight: "bold", color: "var(--tl)", marginBottom: "20px", letterSpacing: "4px", padding: "20px", background: "var(--tllt)", borderRadius: "12px", border: "1.5px solid var(--tlmd)" }}>{q.memseq}</div>}

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
          <button className="bnext sans vis" id="bnext" onClick={advQ} style={{ background: "var(--tl)", color: "#fff", border: "none", borderRadius: "100px", padding: "15px 48px", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "9px", boxShadow: "0 4px 18px rgba(15, 44, 90, .25)", minWidth: "200px", justifyContent: "center" }}>
            {idx + 1 >= qs.length ? 'View Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
