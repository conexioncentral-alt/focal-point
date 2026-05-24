import React from 'react';
import { RotateCcw, X, ZoomIn, ZoomOut, Plus, Minus, Gauge } from 'lucide-react';

interface ControlsProps {
  wpm: number;
  setWpm: (wpm: number) => void;
  progress: number;
  totalTimeLeft: string;
  onExit: () => void;
  onRestart: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  wpm,
  setWpm,
  progress,
  totalTimeLeft,
  onExit,
  onRestart,
  onZoomIn,
  onZoomOut
}) => {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-md flex flex-col justify-end items-center p-8 transition-opacity duration-300">
      
      {/* Paused Overlay Announcement */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
        <h2 className="text-2xl font-bold tracking-widest text-accent-cyan animate-pulse uppercase mb-2">Lectura Pausada</h2>
        <p className="text-xs text-primary/60">Presiona [Espacio] o toca arriba para reanudar</p>
      </div>

      {/* Main Control Panel Card */}
      <div className="w-full max-w-2xl bg-subtle border-2 border-primary/20 rounded-xl p-6 shadow-2xl flex flex-col gap-6 animate-slide-up z-20">
        
        {/* Progress Bar & Time Left */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-primary/80">
            <span className="uppercase tracking-wider">Progreso</span>
            <span className="font-mono">{Math.round(progress)}% — Restan {totalTimeLeft}</span>
          </div>
          {/* Progress Bar Container */}
          <div className="w-full h-3 bg-background rounded-full overflow-hidden border border-subtle">
            <div 
              className="h-full bg-accent-cyan transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Adjustments row: Speed (WPM) and Font Size (Zoom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* WPM Control */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-primary/80 uppercase tracking-wider flex items-center gap-2">
              <Gauge className="w-4 h-4 text-accent" />
              Velocidad de Lectura
            </label>
            <div className="flex items-center gap-3">
              {/* Decrease WPM Button */}
              <button 
                onClick={() => setWpm(Math.max(200, wpm - 50))}
                className="w-10 h-10 flex items-center justify-center bg-primary text-background border-2 border-primary rounded-lg font-black hover:bg-accent-cyan hover:border-accent-cyan hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none"
                title="Reducir velocidad"
              >
                <Minus className="w-5 h-5 stroke-[3px]" />
              </button>
              
              {/* Display WPM / Slider */}
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-mono text-accent">{wpm} <span className="text-sm text-primary/60 font-normal">WPM</span></span>
                <input 
                  type="range" 
                  min="200" 
                  max="1000" 
                  step="50" 
                  value={wpm} 
                  onChange={(e) => setWpm(Number(e.target.value))}
                  className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-accent mt-2 focus:outline-none"
                />
              </div>

              {/* Increase WPM Button */}
              <button 
                onClick={() => setWpm(Math.min(1000, wpm + 50))}
                className="w-10 h-10 flex items-center justify-center bg-primary text-background border-2 border-primary rounded-lg font-black hover:bg-accent-cyan hover:border-accent-cyan hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none"
                title="Aumentar velocidad"
              >
                <Plus className="w-5 h-5 stroke-[3px]" />
              </button>
            </div>
          </div>

          {/* Font Size Zoom Control */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-primary/80 uppercase tracking-wider">
              Tamaño de Letra
            </label>
            <div className="flex justify-center gap-4">
              {/* Zoom Out Button */}
              <button 
                onClick={onZoomOut}
                className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary text-background border-2 border-primary rounded-lg font-bold hover:bg-accent-cyan hover:border-accent-cyan hover:scale-[1.02] active:scale-95 transition-all shadow-md focus:outline-none"
              >
                <ZoomOut className="w-5 h-5 stroke-[3px]" />
                <span className="uppercase text-xs tracking-wider">Reducir</span>
              </button>

              {/* Zoom In Button */}
              <button 
                onClick={onZoomIn}
                className="flex-1 h-12 flex items-center justify-center gap-2 bg-primary text-background border-2 border-primary rounded-lg font-bold hover:bg-accent-cyan hover:border-accent-cyan hover:scale-[1.02] active:scale-95 transition-all shadow-md focus:outline-none"
              >
                <ZoomIn className="w-5 h-5 stroke-[3px]" />
                <span className="uppercase text-xs tracking-wider">Aumentar</span>
              </button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-primary/10"></div>

        {/* Actions row: Exit, Restart, Resume Instructions */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          {/* Exit Button */}
          <button 
            onClick={onExit}
            className="flex-1 h-12 flex items-center justify-center gap-2 bg-background text-primary border-2 border-primary hover:border-accent hover:text-accent font-bold rounded-lg uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-md focus:outline-none"
          >
            <X className="w-4 h-4 stroke-[2.5px]" />
            Salir al Panel
          </button>

          {/* Restart Button */}
          <button 
            onClick={onRestart}
            className="flex-1 h-12 flex items-center justify-center gap-2 bg-accent text-background border-2 border-accent hover:bg-transparent hover:text-accent font-black rounded-lg uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-md focus:outline-none"
          >
            <RotateCcw className="w-4 h-4 stroke-[3px]" />
            Reiniciar
          </button>
        </div>

      </div>
    </div>
  );
};
