import { useState, useEffect, useCallback, useRef } from 'react';

interface UseTimerProps {
    category: string;
    onTimeUp: () => void;
}

export function usePillarTimer({ category, onTimeUp }: UseTimerProps) {
    const defaultTime = category === 'SP' ? 20 : 60;
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [elapsed, setElapsed] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const onTimeUpRef = useRef(onTimeUp);

    // Keep the ref updated with the latest callback
    useEffect(() => {
        onTimeUpRef.current = onTimeUp;
    }, [onTimeUp]);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        const maxTime = category === 'SP' ? 20 : 60;
        setTimeLeft(maxTime);
        setElapsed(0);

        timerRef.current = setInterval(() => {
            setElapsed(e => e + 1);
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    onTimeUpRef.current();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [category]);

    const stopTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const formattedTime = `${m}:${s < 10 ? "0" : ""}${s}`;

    return {
        timeLeft,
        elapsed,
        formattedTime,
        startTimer,
        stopTimer
    };
}
