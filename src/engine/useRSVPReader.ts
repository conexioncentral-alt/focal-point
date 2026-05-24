import { useState, useEffect, useRef, useCallback } from 'react';
import type { RSVPToken } from './text-processor';

interface UseRSVPReaderProps {
    tokens: RSVPToken[];
    wpm: number;
    onComplete?: () => void;
}

export const useRSVPReader = ({ tokens, wpm, onComplete }: UseRSVPReaderProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Refs for timing accuracy
    const lastFrameTime = useRef<number>(0);
    const elapsedInWord = useRef<number>(0);
    const requestRef = useRef<number | null>(null);

    // Current token derived from index
    const currentToken = tokens[currentIndex] || null;

    const animate = useCallback((time: number) => {
        if (!isPlaying || currentIndex >= tokens.length) {
            if (currentIndex >= tokens.length && isPlaying) {
                setIsPlaying(false);
                onComplete?.();
            }
            return;
        }

        if (lastFrameTime.current === 0) {
            lastFrameTime.current = time;
        }

        const delta = time - lastFrameTime.current;
        lastFrameTime.current = time;

        // Calculate duration for current word
        // Base duration in ms = 60000 / WPM
        // Weighted duration = Base * multiplier
        const baseDuration = 60000 / wpm;
        const weightedDuration = baseDuration * (tokens[currentIndex]?.delayMultiplier || 1);

        elapsedInWord.current += delta;

        if (elapsedInWord.current >= weightedDuration) {
            // Move to next word
            const overrun = elapsedInWord.current - weightedDuration;
            // Cap overrun to prevent skipping multiple words if lag spike occurs, 
            // but keep some to maintain average speed.
            elapsedInWord.current = Math.min(overrun, baseDuration);

            setCurrentIndex(prev => {
                const next = prev + 1;
                if (next >= tokens.length) {
                    return prev; // Will be handled by next frame check or effect
                }
                return next;
            });
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [isPlaying, currentIndex, tokens, wpm, onComplete]);

    useEffect(() => {
        if (isPlaying) {
            lastFrameTime.current = 0; // Reset on start/resume
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            lastFrameTime.current = 0;
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isPlaying, animate]);

    // Reset logic if tokens change significantly? 
    // For now assume tokens are stable during a session or handled by parent.

    const togglePlay = useCallback(() => setIsPlaying(p => !p), []);

    const seekWord = useCallback((delta: number) => {
        setCurrentIndex(prev => {
            const newIndex = Math.max(0, Math.min(tokens.length - 1, prev + delta));
            elapsedInWord.current = 0; // Reset timing for the new word
            return newIndex;
        });
    }, [tokens.length]);

    const setProgress = useCallback((percentage: number) => {
        const index = Math.floor((percentage / 100) * tokens.length);
        setCurrentIndex(Math.max(0, Math.min(tokens.length - 1, index)));
        elapsedInWord.current = 0;
    }, [tokens.length]);

    const reset = useCallback(() => {
        setIsPlaying(false);
        setCurrentIndex(0);
        elapsedInWord.current = 0;
    }, []);

    return {
        token: currentToken,
        currentIndex,
        totalTokens: tokens.length,
        isPlaying,
        progress: tokens.length > 0 ? (currentIndex / tokens.length) * 100 : 0,
        togglePlay,
        seekWord,
        setProgress,
        reset,
        setPlaying: setIsPlaying
    };
};
