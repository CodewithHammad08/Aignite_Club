import React, { useEffect, useState } from 'react';
import { Terminal, Shield, Sparkles } from '../Icons';

/* ─── Terminal content sequence ─── */
const TERMINAL_BLOCKS = [
  {
    cmd: 'whoami',
    outputs: ['aignite_builder'],
  },
  {
    cmd: 'club --status',
    outputs: [
      '25+ active members',
      '4+ events hosted',
      'est. 2025',
    ],
  },
  {
    cmd: 'echo "We build. We ship. We learn."',
    outputs: ['We build. We ship. We learn.'],
  },
  {
    cmd: 'aignite --domains',
    outputs: [
      '• Machine Learning & Deep Learning',
      '• Natural Language Processing & GenAI',
      '• Web Development & Scalable Apps',
      '• MLOps & AI Infrastructure',
    ],
  },
];

export default function HeroTerminal() {
  const [blockIdx, setBlockIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  const [revealedOutputCount, setRevealedOutputCount] = useState(0);
  const [isTypingCmd, setIsTypingCmd] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const currentBlock = TERMINAL_BLOCKS[blockIdx];
    const fullCmd = currentBlock.cmd;

    // Phase 1: Type out the command char by char
    if (isTypingCmd) {
      if (typedCmd.length < fullCmd.length) {
        const timeout = setTimeout(() => {
          setTypedCmd(fullCmd.slice(0, typedCmd.length + 1));
        }, 45 + Math.random() * 30);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing command -> wait slightly then show outputs
        const timeout = setTimeout(() => {
          setIsTypingCmd(false);
        }, 300);
        return () => clearTimeout(timeout);
      }
    }

    // Phase 2: Reveal output lines
    if (!isTypingCmd) {
      if (revealedOutputCount < currentBlock.outputs.length) {
        const timeout = setTimeout(() => {
          setRevealedOutputCount(prev => prev + 1);
        }, 180);
        return () => clearTimeout(timeout);
      } else {
        // All outputs shown for this block -> wait, push to history or cycle block
        const timeout = setTimeout(() => {
          // Push completed block to short history stack (keep last 2 blocks)
          setHistory(prev => [
            ...prev.slice(-1),
            { cmd: currentBlock.cmd, outputs: currentBlock.outputs }
          ]);
          // Advance to next block
          setBlockIdx(prev => (prev + 1) % TERMINAL_BLOCKS.length);
          setTypedCmd('');
          setRevealedOutputCount(0);
          setIsTypingCmd(true);
        }, 2600);
        return () => clearTimeout(timeout);
      }
    }
  }, [blockIdx, typedCmd, isTypingCmd, revealedOutputCount]);

  return (
    <div className="w-full max-w-xl mx-auto select-none font-mono">
      {/* Outer Terminal Window */}
      <div
        className="relative rounded-2xl overflow-hidden border border-cyan-500/25 bg-[#050d1a]/90 backdrop-blur-xl shadow-[0_0_50px_rgba(0,212,255,0.12)] transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_60px_rgba(0,212,255,0.2)]"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#081326] border-b border-cyan-500/15">
          {/* Traffic dots */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-[0_0_8px_rgba(255,95,86,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-[0_0_8px_rgba(255,189,46,0.5)]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-[0_0_8px_rgba(39,201,63,0.5)]" />
          </div>

          {/* Title */}
          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold tracking-wide">
            <Terminal size={14} className="text-cyan-400" />
            <span>aignite@bvdu: ~/club</span>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 min-h-[300px] sm:min-h-[340px] flex flex-col justify-between text-xs sm:text-sm leading-relaxed text-slate-200 bg-[#050d1a]/95 relative overflow-hidden">
          {/* Subtle grid & scanline */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.04),transparent_70%)] pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {/* System banner */}
            <div className="text-[11px] text-slate-500 pb-2 border-b border-white/5 flex items-center justify-between">
              <span>Aignite CLI v2.5.0 (x86_64-bvdu-linux)</span>
              <span className="text-cyan-400/80">Type `help` for info</span>
            </div>

            {/* History blocks */}
            {history.map((h, i) => (
              <div key={i} className="space-y-1.5 opacity-50 transition-opacity">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">$</span>
                  <span className="text-cyan-300 font-bold">{h.cmd}</span>
                </div>
                {h.outputs.map((out, j) => (
                  <div key={j} className="pl-4 text-slate-300 flex items-center gap-2">
                    <span className="text-cyan-500/70 font-bold">&gt;</span>
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Active typing block */}
            <div className="space-y-2">
              {/* Command Line */}
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-cyan-300 font-bold tracking-wide">{typedCmd}</span>
                {isTypingCmd && (
                  <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-0.5" />
                )}
              </div>

              {/* Outputs for Active Command */}
              {!isTypingCmd && (
                <div className="space-y-1.5 pl-4">
                  {TERMINAL_BLOCKS[blockIdx].outputs.slice(0, revealedOutputCount).map((out, idx) => (
                    <div
                      key={idx}
                      className="text-slate-200 flex items-center gap-2 animate-fade-in"
                    >
                      <span className="text-cyan-400 font-bold">&gt;</span>
                      <span className={out.includes('We build') ? 'text-cyan-300 font-extrabold' : 'text-slate-200'}>
                        {out}
                      </span>
                    </div>
                  ))}
                  {/* Blinking cursor at end of output reveal */}
                  {revealedOutputCount === TERMINAL_BLOCKS[blockIdx].outputs.length && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-[blink_1s_step-end_infinite]" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Terminal Footer Status */}
          <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 relative z-10 font-mono">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-cyan-400/90">
                <Shield size={11} /> protected
              </span>
              <span>UTF-8</span>
              <span>Bash</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Sparkles size={11} className="text-cyan-400" />
              <span>Aignite Core</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
