"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResultsPage() {
  const router = useRouter();
  const [iq, setIq] = useState<number | null>(null);

  useEffect(() => {
    const answersRaw = localStorage.getItem("testAnswers");
    if (!answersRaw) {
      router.push("/");
      return;
    }
    try {
      const answers = JSON.parse(answersRaw);
      let raw = 0, mx = 0;
      answers.forEach((a: any) => {
        raw += a.pts;
        mx += a.max;
      });
      // Simplified mock calc
      const calcIQ = Math.max(60, Math.min(162, Math.round(100 + (raw / mx || 0) * 15)));
      setIq(calcIQ);
    } catch {
      router.push("/");
    }
  }, [router]);

  if (iq === null) return <div>Calculating results...</div>;

  return (
    <div id="s-results" className="scr on">
      <div className="rhero">
        <div className="rhi">
          <div className="rlb sans" id="rlb">Your IQ Result</div>
          <div className="rsco" id="rsco">{iq}</div>
          <div><span className="rcls sans" id="rcls">Score</span></div>
        </div>
      </div>
      <div className="rbody">
        <div className="rbi">
          <div className="racts">
            <button className="btn bout" onClick={() => router.push("/")}>&#8592; Home</button>
          </div>
          <div className="rdisc sans">For educational and entertainment purposes only.</div>
        </div>
      </div>
    </div>
  );
}
