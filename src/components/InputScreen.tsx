import React, { useState } from 'react';
import { BookOpen, Atom, Cpu, Play, ClipboardCopy, FileText } from 'lucide-react';

interface InputScreenProps {
  onStart: (text: string) => void;
}

interface Template {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  description: string;
  content: string;
}

export const InputScreen: React.FC<InputScreenProps> = ({ onStart }) => {
  const [text, setText] = useState('');

  // 3 Rich Template Options (Science, Literature, Technology)
  const templates: Template[] = [
    {
      id: 'science',
      category: 'Ciencia / Astrofísica',
      title: 'Horizonte de Sucesos',
      icon: <Atom className="w-5 h-5 text-accent-cyan" />,
      description: 'Conceptos fundamentales de agujeros negros y espacio-tiempo.',
      content: 'Un agujero negro es una región del espacio-tiempo donde la gravedad es tan fuerte que nada, ni siquiera la luz, puede escapar de ella. La teoría de la relatividad general de Einstein predice que una masa lo suficientemente compacta puede deformar el espacio-tiempo para formar uno. A su alrededor hay una superficie llamada horizonte de sucesos, que marca el punto de no retorno.'
    },
    {
      id: 'literature',
      category: 'Literatura Clásica',
      title: 'Don Quijote de la Mancha',
      icon: <BookOpen className="w-5 h-5 text-accent" />,
      description: 'El célebre fragmento de inicio de la obra de Miguel de Cervantes.',
      content: 'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda.'
    },
    {
      id: 'tech',
      category: 'Tecnología / Futuro',
      title: 'Inteligencia Artificial',
      icon: <Cpu className="w-5 h-5 text-accent-cyan" />,
      description: 'Reflexión sobre el futuro y el desarrollo ético de la IA.',
      content: 'La inteligencia artificial está transformando rápidamente el mundo moderno. Desde el procesamiento del lenguaje natural hasta los sistemas de conducción autónoma, estas tecnologías redefinen la relación humana con las máquinas. El desafío futuro radica no solo en potenciar sus capacidades algorítmicas, sino en asegurar un desarrollo ético y equitativo para toda la humanidad.'
    }
  ];

  const handleStartReading = () => {
    if (text.trim().length === 0) return;
    onStart(text);
  };

  const handleLoadTemplate = (content: string) => {
    setText(content);
  };

  const handleQuickStartTemplate = (content: string) => {
    onStart(content);
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col gap-10 min-h-screen justify-center anime-fade-in">
      
      {/* Header section */}
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary flex items-center justify-center gap-3">
          FOCAL<span className="text-accent">POINT</span>
        </h1>
        <p className="text-sm md:text-base text-primary/60 max-w-lg mx-auto font-sans">
          Entrena tu mente con RSVP (Presentación Visual Serial Rápida). Lee más rápido enfocando tu atención en un solo punto.
        </p>
      </div>

      {/* Main Text Editor / Area */}
      <div className="flex flex-col gap-4 bg-subtle/30 border border-subtle rounded-xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex justify-between items-center text-xs font-bold text-primary/75">
          <span className="uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-accent-cyan" />
            Texto a leer
          </span>
          <span className="font-mono">{wordCount} palabras / {text.length} caracteres</span>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega tu propio artículo, libro o ensayo aquí, o selecciona una plantilla de abajo para comenzar..."
          className="w-full h-48 bg-background/50 border border-subtle/60 rounded-lg p-4 font-mono text-sm text-primary focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan resize-none transition-colors"
        />

        <div className="flex justify-between items-center gap-4 flex-wrap">
          <p className="text-xs text-primary/45 hidden sm:block">
            El texto se procesará palabra por palabra alineando el punto óptimo de reconocimiento (ORP).
          </p>
          
          {/* Start Reading Button (High Contrast Accent) */}
          <button
            onClick={handleStartReading}
            disabled={text.trim().length === 0}
            className={`h-12 px-8 flex items-center justify-center gap-2 font-black rounded-lg uppercase tracking-wider text-xs shadow-md transition-all ${
              text.trim().length > 0
                ? 'bg-accent text-background border-2 border-accent hover:bg-transparent hover:text-accent hover:scale-[1.03] active:scale-95 cursor-pointer'
                : 'bg-primary/20 text-primary/40 border-2 border-primary/10 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 stroke-[3px]" />
            Iniciar Lectura
          </button>
        </div>
      </div>

      {/* Text Templates Section */}
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-bold text-primary/75 uppercase tracking-wider text-center sm:text-left">
          Plantillas de Ejemplo (Prueba Rápida)
        </h3>
        
        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              className="bg-subtle/20 border border-subtle/40 rounded-xl p-5 hover:border-primary/30 flex flex-col justify-between gap-4 transition-all hover:translate-y-[-2px] shadow-lg"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-background/50 border border-subtle rounded-lg">
                    {tpl.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-accent tracking-wider font-sans">{tpl.category}</span>
                    <h4 className="text-sm font-black text-primary tracking-tight">{tpl.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-primary/65 leading-relaxed font-sans mt-1">
                  {tpl.description}
                </p>
              </div>

              {/* Template Buttons (High Contrast Actions) */}
              <div className="flex gap-2">
                {/* Load into editor button */}
                <button
                  onClick={() => handleLoadTemplate(tpl.content)}
                  className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-background text-primary border border-primary hover:border-accent hover:text-accent rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95"
                  title="Cargar texto en la caja superior"
                >
                  <ClipboardCopy className="w-3.5 h-3.5" />
                  Cargar
                </button>

                {/* Quick Start button */}
                <button
                  onClick={() => handleQuickStartTemplate(tpl.content)}
                  className="flex-1 h-9 flex items-center justify-center gap-1.5 bg-primary text-background border border-primary hover:bg-accent-cyan hover:border-accent-cyan rounded-lg text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 shadow-md"
                  title="Iniciar lectura directamente"
                >
                  <Play className="w-3 h-3 stroke-[3px]" />
                  Lectura ⚡
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
