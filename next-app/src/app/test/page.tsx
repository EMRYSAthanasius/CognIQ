"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

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
    // In a real app, we'd fetch questions from Supabase here.
    // For now, using placeholder mock data so the app runs.
    setQs([
      { c: "LA", p: 1, q: "What comes next?", seq: "3 6 12 24 48 ?", o: ["72", "96", "84", "100"], a: 1 },
      { c: "MA", p: 2, q: "What is 2 + 2?", o: ["3", "4", "5", "6"], a: 1 }
    ]);
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
      localStorage.setItem("testAge", "25"); // Placeholder age
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
          <span className="qtag" id="qtag">{q.c}</span>
          <span className="qpt sans" id="qpt">Question {idx + 1} of {qs.length}</span>
          <div className={`qtmr ${timeLeft <= 15 ? 'warn' : ''}`} id="qtmr">
            <span id="tnum">{timeStr}</span>
          </div>
        </div>
      </div>

      <div className="qbody" id="qbody">
        <div className="qcw" id="qcw">
          {q.seq && <div className="qform">{q.seq}</div>}
          <div className="qinst sans">{q.q}</div>
          <div className="opts" id="opts">
            {q.o.map((opt: string, i: number) => (
              <button
                key={i}
                className={`opt sans ${chosen === i ? 'ch' : ''}`}
                onClick={() => pick(i)}
                style={{ opacity: chosen !== null && chosen !== i ? 0.4 : 1, pointerEvents: chosen !== null ? 'none' : 'auto' }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="qfoot">
        {chosen !== null && (
          <button className="bnext sans vis" id="bnext" onClick={advQ}>
            {idx + 1 >= qs.length ? 'View Results →' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}
