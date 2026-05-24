import { useState, useEffect, useCallback } from 'react';
import { InputScreen } from './components/InputScreen';
import { Reader } from './components/Reader';
import { Controls } from './components/Controls';
import { processText, type RSVPToken } from './engine/text-processor';
import { useRSVPReader } from './engine/useRSVPReader';

function App() {
  const [mode, setMode] = useState<'input' | 'reading'>('input');
  const [tokens, setTokens] = useState<RSVPToken[]>([]);
  const [wpm, setWpm] = useState(400);
  const [fontSize, setFontSize] = useState(64); // Default 64px

  // Reader Hook
  const {
    token,
    currentIndex,
    totalTokens,
    isPlaying,
    progress,
    togglePlay,
    seekWord,
    setPlaying,
    reset
  } = useRSVPReader({
    tokens,
    wpm,
    onComplete: () => {
      // Optional: Auto-pause or show summary.
      // For now, let's just pause at the end.
    }
  });

  const handleStart = (text: string) => {
    const processed = processText(text);
    setTokens(processed);
    setMode('reading');
    // Small delay before auto-start or let user start?
    // Request implies "Iniciar Lectura" button so maybe auto-start.
    setTimeout(() => setPlaying(true), 500);
  };

  const handleExit = () => {
    setPlaying(false);
    setMode('input');
    reset();
  };

  const handleRestart = () => {
    reset();
    setPlaying(true);
  };

  const handleZoomIn = () => setFontSize(prev => Math.min(128, prev + 8));
  const handleZoomOut = () => setFontSize(prev => Math.max(24, prev - 8));

  // Keyboard Controls
  useEffect(() => {
    if (mode !== 'reading') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setWpm(prev => Math.min(1000, prev + 50));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setWpm(prev => Math.max(200, prev - 50));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekWord(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekWord(10);
          break;
        case 'Escape':
          e.preventDefault();
          // Toggle controls or exit? Let's just pause or toggle controls visibility
          // If paused, maybe exit? simpler: Pause.
          setPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, togglePlay, seekWord]);

  // Gestures / Touch (Basic)
  const handleTouchStart = useCallback(() => {
    if (mode === 'reading') {
      togglePlay();
    }
  }, [mode, togglePlay]);


  // Time Calculation
  const wordsLeft = totalTokens - currentIndex;
  const minutesLeft = wordsLeft / wpm;
  const secondsLeft = Math.floor(minutesLeft * 60);
  const timeLeftString = `${Math.floor(secondsLeft / 60)}:${(secondsLeft % 60).toString().padStart(2, '0')}`;

  return (
    <div
      className="min-h-screen bg-background text-primary overflow-hidden font-mono"
      onClick={mode === 'reading' ? handleTouchStart : undefined} // Simple tap to pause
    >
      {mode === 'input' && (
        <InputScreen onStart={handleStart} />
      )}

      {mode === 'reading' && (
        <>
          <Reader
            word={token?.clean || ''}
            style={{ fontSize: `${fontSize}px` }}
          />

          {/* Controls Overlay - Visible when paused or logic to auto-hide?
              Request says "Visible al Pausar". */}
          {!isPlaying && (
            <div onClick={(e) => e.stopPropagation()}>
              {/* Stop propagation so clicking controls doesn't toggle play */}
              <Controls
                wpm={wpm}
                setWpm={setWpm}
                progress={progress}
                totalTimeLeft={timeLeftString}
                onExit={handleExit}
                onRestart={handleRestart}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
