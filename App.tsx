import React from 'react';
import { ComfyNode } from './components/ComfyNode';

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center justify-center bg-[#121212]">
      {/* Background Grid Pattern (Simulating ComfyUI Canvas) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Background Dots for extra texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
            backgroundImage: 'radial-gradient(#555 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
      />

      <div className="z-10 relative transform scale-100 md:scale-110 transition-transform duration-500 ease-out animate-in fade-in zoom-in-95">
        <ComfyNode />
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-4 right-4 z-20 bg-black/40 backdrop-blur-sm p-3 rounded text-white/40 text-[10px] font-mono border border-white/5">
        <p>Small0 Quick Translator v1.0</p>
        <p>Powered by Google Gemini 2.5</p>
      </div>
    </div>
  );
};

export default App;