import React, { useState } from 'react';
import { Play, Copy, Languages, RefreshCw, Box, Key, Lock, CheckCircle2, Info, X, Terminal, Code, Check } from 'lucide-react';
import { CheckpointType, NodeState } from '../types';
import { CHECKPOINTS, DEFAULT_PROMPT, NODE_HEADER_COLOR, NODE_BODY_COLOR, INPUT_BG_COLOR, TEXT_COLOR } from '../constants';
import { translatePrompt } from '../services/geminiService';
import { Toggle } from './Toggle';

export const ComfyNode: React.FC = () => {
  const [state, setState] = useState<NodeState>({
    prompt: DEFAULT_PROMPT,
    output: "",
    isProcessing: false,
    checkpoint: CheckpointType.SDXL,
    intelligenceMode: true,
  });

  const [showHelp, setShowHelp] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleTranslate = async () => {
    setState(prev => ({ ...prev, isProcessing: true, error: undefined }));
    try {
      const translated = await translatePrompt(state.prompt, state.checkpoint, state.intelligenceMode);
      setState(prev => ({ ...prev, output: translated, isProcessing: false }));
    } catch (err) {
      setState(prev => ({ ...prev, error: "Processing failed", isProcessing: false }));
    }
  };

  const copyToClipboard = () => {
    if (state.output) {
      navigator.clipboard.writeText(state.output);
    }
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(pythonCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const pythonCode = `
# This code is available in the __init__.py file in this repository.

import os
import google.generativeai as genai

class Small0Translator:
    # ... implementation details ...
    pass
`.trim();

  return (
    <div className={`w-[400px] md:w-[500px] rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-neutral-700 font-sans overflow-hidden flex flex-col relative`}>
      
      {/* Node Header */}
      <div className={`${NODE_HEADER_COLOR} h-10 px-4 flex items-center justify-between border-b border-neutral-700`}>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" title="Active"></span>
            <span className="font-bold text-sm text-white tracking-wide">Small0 Quick Translator</span>
        </div>
        <div className="flex gap-2 items-center">
             <div className="w-px h-3 bg-white/20"></div>
             <button 
               onClick={() => setShowHelp(true)}
               className="text-white/50 hover:text-white transition-colors"
               title="Installation & Help"
             >
               <Info size={14} />
             </button>
        </div>
      </div>

      {/* Node Body */}
      <div className={`${NODE_BODY_COLOR} p-4 flex flex-col gap-4 relative`}>
        
        {/* Input Section (Simulating Input Slot) */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
             <label className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                <Languages size={12} /> Input Prompt (English)
             </label>
             <button 
                onClick={() => setState(s => ({...s, prompt: ''}))}
                className="text-[10px] text-neutral-500 hover:text-red-400 transition-colors"
             >
                Clear
             </button>
          </div>
          <textarea
            className={`w-full h-24 ${INPUT_BG_COLOR} ${TEXT_COLOR} text-xs p-3 rounded border border-neutral-700 focus:border-neutral-500 focus:outline-none resize-none font-mono leading-relaxed`}
            value={state.prompt}
            onChange={(e) => setState(s => ({ ...s, prompt: e.target.value }))}
            placeholder="Enter prompt here..."
          />
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-3 bg-black/20 p-3 rounded border border-white/5">
            
            {/* API Key Status (Visual Only) */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                    <Key size={12} /> Gemini API Key
                </label>
                <div className="relative group">
                    <input
                        type="password"
                        value="••••••••••••••••••••••••••••" 
                        disabled
                        readOnly
                        className={`w-full ${INPUT_BG_COLOR} ${TEXT_COLOR} text-xs px-2 py-1.5 rounded border border-green-900/50 focus:border-green-500 outline-none cursor-not-allowed opacity-75`}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span className="text-[9px] text-green-500 font-bold tracking-wider">SAVED</span>
                        <Lock size={10} className="text-green-500" />
                        <CheckCircle2 size={10} className="text-green-500" />
                    </div>
                </div>
            </div>

            <div className="h-px bg-white/5 my-0.5"></div>

            {/* Checkpoint Selector */}
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                    <Box size={12} /> Target Checkpoint
                </label>
                <select
                    value={state.checkpoint}
                    onChange={(e) => setState(s => ({ ...s, checkpoint: e.target.value as CheckpointType }))}
                    className={`w-full ${INPUT_BG_COLOR} ${TEXT_COLOR} text-xs px-2 py-1.5 rounded border border-neutral-700 focus:border-neutral-500 outline-none cursor-pointer`}
                >
                    {CHECKPOINTS.map(cp => (
                        <option key={cp.value} value={cp.value}>{cp.label}</option>
                    ))}
                </select>
            </div>

            {/* Intelligence Mode Toggle */}
            <Toggle 
                label="INTELLIGENCE MODE (Optimize for Model)" 
                checked={state.intelligenceMode}
                onChange={(val) => setState(s => ({ ...s, intelligenceMode: val }))}
            />
            {state.intelligenceMode && (
                <div className="text-[10px] text-cyan-600/80 px-1 italic">
                    * Gemini will restructure your prompt for {state.checkpoint} while translating.
                </div>
            )}
        </div>

        {/* Action Button */}
        <button
            onClick={handleTranslate}
            disabled={state.isProcessing}
            className={`w-full py-2 rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all
                ${state.isProcessing 
                    ? 'bg-neutral-700 text-neutral-500 cursor-not-allowed' 
                    : 'bg-[#35515e] hover:bg-[#436474] text-white hover:shadow-lg active:translate-y-0.5'}`}
        >
            {state.isProcessing ? (
                <><RefreshCw className="animate-spin" size={14} /> Processing...</>
            ) : (
                <><Play size={14} fill="currentColor" /> Queue Prompt</>
            )}
        </button>

        {/* Output Section (Simulating Output Slot) */}
        <div className="flex flex-col gap-1 mt-2">
            <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-neutral-400 uppercase flex items-center gap-1">
                    <Languages size={12} /> Output (Chinese)
                </label>
                {state.output && (
                    <button 
                        onClick={copyToClipboard} 
                        className="flex items-center gap-1 text-[10px] text-green-500 hover:text-green-400 transition-colors"
                    >
                        <Copy size={10} /> Copy
                    </button>
                )}
            </div>
          <div className={`w-full min-h-[80px] ${INPUT_BG_COLOR} ${TEXT_COLOR} text-xs p-3 rounded border border-neutral-700 font-mono leading-relaxed relative group`}>
             {state.output ? state.output : <span className="text-neutral-600 italic">Waiting for translation...</span>}
             {state.error && <div className="absolute inset-0 bg-red-900/20 flex items-center justify-center text-red-400 text-xs">{state.error}</div>}
          </div>
        </div>

        {/* Decorative connectors simulation */}
        <div className="absolute -left-3 top-20 w-3 h-3 rounded-full bg-neutral-600 border-2 border-neutral-800"></div>
        <div className="absolute -right-3 top-[380px] w-3 h-3 rounded-full bg-neutral-600 border-2 border-neutral-800"></div>

        {/* Help Modal */}
        {showHelp && (
            <div className="absolute inset-0 z-50 bg-[#121212]/95 flex flex-col text-gray-300 font-mono text-xs p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                    <div className="flex items-center gap-2 text-white font-bold">
                        <Terminal size={14} />
                        <span>INSTALLATION</span>
                    </div>
                    <button onClick={() => setShowHelp(false)} className="hover:text-white"><X size={16} /></button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="text-white font-bold mb-1">1. Push to Git</h3>
                        <p className="opacity-80">This project already contains <code className="text-green-400">__init__.py</code> and <code className="text-green-400">requirements.txt</code>.</p>
                        <p className="opacity-80 mt-1">Push all files in this directory to your GitHub repository.</p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-1">2. Install in ComfyUI</h3>
                        <p className="opacity-80">Use <strong>ComfyUI Manager</strong> -> <strong>Install via Git URL</strong> and paste your repo link:</p>
                        <p className="opacity-80 mt-2 text-cyan-400 break-all">https://github.com/bigbosshoggy/small0-quick-translator</p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-1">3. API Key</h3>
                        <p className="opacity-80">Enter your Gemini API Key directly into the <code className="text-yellow-400">api_key</code> widget on the node.</p>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
