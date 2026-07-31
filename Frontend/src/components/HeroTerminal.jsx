import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Code, CheckCircle, Copy, Sparkles } from '../Icons';

/* ─────────────────────────────────────────────────────
   Command sequence — each block types out, then reveals
   output lines one by one, then loops.
───────────────────────────────────────────────────── */
const BLOCKS = [
  {
    cmd: 'aignite --init',
    outputs: [
      { text: 'Initialising Aignite Club...', type: 'dim' },
      { text: '✓  Core modules loaded',       type: 'success' },
      { text: '✓  Neural engine online',      type: 'success' },
      { text: '✓  Ready.',                    type: 'accent' },
    ],
    pause: 2800,
  },
  {
    cmd: 'club --status',
    outputs: [
      { text: '  Members   →  25+  active', type: 'muted' },
      { text: '  Events    →   4+  hosted', type: 'muted' },
      { text: '  Founded   →  2025',        type: 'muted' },
      { text: '  Status    →  LIVE 🟢',     type: 'success' },
    ],
    pause: 2600,
  },
  {
    cmd: 'aignite --domains',
    outputs: [
      { text: '  [ML]   Machine Learning & Deep Learning', type: 'blue' },
      { text: '  [NLP]  Natural Language Processing',      type: 'purple' },
      { text: '  [WEB]  Web Development & Cloud',          type: 'cyan' },
      { text: '  [OPS]  MLOps & AI Infrastructure',        type: 'green' },
    ],
    pause: 2800,
  },
  {
    cmd: 'echo "We build. We ship. We learn."',
    outputs: [
      { text: 'We build. We ship. We learn.', type: 'banner' },
    ],
    pause: 3200,
  },
];

/* ── Site-matched token colours ── */
const OUTPUT_CLASS = {
  dim:     'text-[#4a6070]',
  muted:   'text-[#94a3b8]',
  success: 'text-[#34D399]',
  accent:  'text-[#22D3EE] font-semibold',
  blue:    'text-[#3B82F6]',
  purple:  'text-[#818CF8]',
  cyan:    'text-[#22D3EE]',
  green:   'text-[#34D399]',
  banner:  'text-[#e8f4f8] font-bold tracking-wide',
};

/* ── Editor code lines — syntax tokens matching site palette ── */
const CODE_LINES = [
  [{ t: 'const ',        c: 'kw'  }, { t: 'aigniteClub ', c: 'var' }, { t: '= {',       c: 'pt'  }],
  [{ t: '  name',        c: 'pr'  }, { t: ': ',           c: 'pt'  }, { t: "'Aignite Club'", c: 'st' }, { t: ',', c: 'pt' }],
  [{ t: '  tagline',     c: 'pr'  }, { t: ': ',           c: 'pt'  }, { t: "'Innovation Meets Intelligence'", c: 'st' }, { t: ',', c: 'pt' }],
  [{ t: '  founded',     c: 'pr'  }, { t: ': ',           c: 'pt'  }, { t: '2025',       c: 'nm' }, { t: ',', c: 'pt' }],
  [{ t: '  members',     c: 'pr'  }, { t: ': ',           c: 'pt'  }, { t: "'25+'",      c: 'st' }, { t: ',', c: 'pt' }],
  [{ t: '  domains',     c: 'pr'  }, { t: ': [',          c: 'pt'  }],
  [{ t: "    'ML & Deep Learning'", c: 'st' }, { t: ',',  c: 'pt'  }],
  [{ t: "    'NLP & GenAI'",        c: 'st' }, { t: ',',  c: 'pt'  }],
  [{ t: "    'Web Development'",    c: 'st' }, { t: ',',  c: 'pt'  }],
  [{ t: "    'MLOps'",              c: 'st' }],
  [{ t: '  ],',          c: 'pt'  }],
  [{ t: '  isFutureReady', c: 'pr'}, { t: ': ',           c: 'pt'  }, { t: '() => ', c: 'kw' }, { t: 'true', c: 'bl' }],
  [{ t: '};',            c: 'pt'  }],
];

/* Site palette mapped to editor tokens */
const TOK = {
  kw:  'text-[#ec4899] font-semibold',   // pink — keywords
  var: 'text-[#e8f4f8]',                  // near-white — identifiers
  pr:  'text-[#FBBF24]',                  // amber — property names (site uses #fbbf24)
  st:  'text-[#22D3EE]',                  // cyan — strings (site accent)
  pt:  'text-[#94a3b8]',                  // muted — punctuation
  nm:  'text-[#818CF8] font-bold',        // purple — numbers (site uses #818CF8)
  bl:  'text-[#34D399] font-medium',      // green — booleans (site uses #34D399)
};

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function HeroTerminal() {
  const [tab,          setTab]          = useState('terminal');
  const [copied,       setCopied]       = useState(false);
  const [booted,       setBooted]       = useState(false);
  const [blockIdx,     setBlockIdx]     = useState(0);
  const [typedCmd,     setTypedCmd]     = useState('');
  const [phase,        setPhase]        = useState('typing');   // typing | revealing | pausing
  const [revealCount,  setRevealCount]  = useState(0);
  const [history,      setHistory]      = useState([]);

  const bodyRef    = useRef(null);
  const mountedRef = useRef(true);

  /* cleanup */
  useEffect(() => () => { mountedRef.current = false; }, []);

  /* auto-scroll to bottom */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history, typedCmd, revealCount, booted]);

  /* boot delay */
  useEffect(() => {
    if (tab !== 'terminal') return;
    const t = setTimeout(() => { if (mountedRef.current) setBooted(true); }, 600);
    return () => clearTimeout(t);
  }, [tab]);

  /* typing state machine */
  useEffect(() => {
    if (tab !== 'terminal' || !booted) return;
    const block = BLOCKS[blockIdx];

    if (phase === 'typing') {
      if (typedCmd.length < block.cmd.length) {
        const t = setTimeout(() => {
          if (mountedRef.current) setTypedCmd(block.cmd.slice(0, typedCmd.length + 1));
        }, 36 + Math.random() * 26);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { if (mountedRef.current) setPhase('revealing'); }, 220);
      return () => clearTimeout(t);
    }

    if (phase === 'revealing') {
      if (revealCount < block.outputs.length) {
        const t = setTimeout(() => { if (mountedRef.current) setRevealCount(r => r + 1); }, 150);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => { if (mountedRef.current) setPhase('pausing'); }, 60);
      return () => clearTimeout(t);
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => {
        if (!mountedRef.current) return;
        setHistory(prev => [...prev.slice(-2), { cmd: block.cmd, outputs: block.outputs }]);
        setBlockIdx(i => (i + 1) % BLOCKS.length);
        setTypedCmd('');
        setRevealCount(0);
        setPhase('typing');
      }, block.pause ?? 2400);
      return () => clearTimeout(t);
    }
  }, [tab, booted, blockIdx, typedCmd, phase, revealCount]);

  /* copy raw code */
  const rawCode = CODE_LINES.map(l => l.map(t => t.t).join('')).join('\n');
  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* switch tabs — reset terminal */
  const switchTab = (t) => {
    setTab(t);
    if (t === 'terminal') {
      setBooted(false); setBlockIdx(0); setTypedCmd('');
      setRevealCount(0); setPhase('typing'); setHistory([]);
    }
  };

  return (
    <div className="w-full select-none font-mono">

      {/* ── Card shell — matches site's depth-card / domain-card styling ── */}
      <div
        className="relative rounded-2xl overflow-hidden flex flex-col lg:h-[480px]"
        style={{
          background: 'linear-gradient(145deg, #0d1829, #090f1d)',
          border: '1px solid rgba(0,212,255,0.10)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >

        {/* Subtle top accent line — matches domain-card */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(0,212,255,0.25), transparent)' }}
        />

        {/* ── Window chrome ── */}
        <div
          className="flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5"
          style={{
            background: 'rgba(5, 13, 26, 0.6)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          {/* Left: dots + tabs */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            {/* macOS traffic lights */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full inline-block" style={{ background: '#ff5f56' }} />
              <span className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full inline-block" style={{ background: '#ffbd2e' }} />
              <span className="w-2.5 h-2.5 sm:w-[11px] sm:h-[11px] rounded-full inline-block" style={{ background: '#27c93f' }} />
            </div>

            {/* Tab pills — styled like site's domain tag pills */}
            <div className="flex items-center gap-1 min-w-0">
              {[
                { id: 'terminal', Icon: Terminal, label: 'terminal' },
                { id: 'editor',   Icon: Code,     label: 'aignite.js' },
              ].map(({ id, Icon, label }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    onClick={() => switchTab(id)}
                    className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold transition-all duration-200 shrink-0"
                    style={active ? {
                      background: 'rgba(0,212,255,0.08)',
                      color: '#22D3EE',
                      border: '1px solid rgba(0,212,255,0.20)',
                    } : {
                      color: '#4a6070',
                      border: '1px solid transparent',
                    }}
                  >
                    <Icon size={11} />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: action badge */}
          {tab === 'editor' ? (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold transition-all duration-200 shrink-0 ml-1"
              style={copied ? {
                background: 'rgba(52,211,153,0.10)',
                color: '#34D399',
                border: '1px solid rgba(52,211,153,0.25)',
              } : {
                background: 'rgba(0,212,255,0.06)',
                color: '#4a6070',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {copied
                ? <><CheckCircle size={10} /><span>Copied</span></>
                : <><Copy size={10} /><span>Copy</span></>
              }
            </button>
          ) : (
            /* LIVE badge — matches site's emerald badge style */
            <div
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold tracking-wider sm:tracking-widest shrink-0 ml-1"
              style={{
                background: 'rgba(52,211,153,0.08)',
                color: '#34D399',
                border: '1px solid rgba(52,211,153,0.20)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: '#34D399', boxShadow: '0 0 6px #34D399', animation: 'htLiveDot 1.8s ease-in-out infinite' }}
              />
              LIVE
            </div>
          )}
        </div>

        {/* ══════════════ TERMINAL BODY ══════════════ */}
        {tab === 'terminal' ? (
          <div
            ref={bodyRef}
            className="overflow-y-auto overflow-x-hidden lg:flex-1"
            style={{
              minHeight: '200px',
              maxHeight: '260px',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(0,212,255,0.12) transparent',
            }}
          >
            {/* Boot header — matches site's monospace section labels */}
            {booted && (
              <div
                className="flex items-center gap-2 text-[10px] pb-2 mb-1"
                style={{ color: '#4a6070', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              >
                <span>Aignite CLI v2.5.0</span>
                <span style={{ color: '#1e293b' }}>·</span>
                <span>x86_64-bvdu-linux</span>
                <span style={{ color: '#1e293b' }}>·</span>
                <span style={{ color: 'rgba(0,212,255,0.4)' }}>Bash</span>
              </div>
            )}

            {!booted && (
              <div className="flex items-center gap-2 text-[10px] animate-pulse" style={{ color: '#4a6070' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,212,255,0.3)' }} />
                initialising...
              </div>
            )}

            {/* History — faded, matches site's opacity convention */}
            {booted && history.map((h, i) => (
              <div key={i} style={{ opacity: 0.28 }} className="flex flex-col gap-0.5">
                <Prompt cmd={h.cmd} done />
                {h.outputs.map((o, j) => (
                  <div key={j} className={`text-[11px] leading-[1.65] pl-1 ${OUTPUT_CLASS[o.type] || ''}`}>
                    {o.text}
                  </div>
                ))}
              </div>
            ))}

            {/* Active block */}
            {booted && (
              <div className="flex flex-col gap-0.5">
                <Prompt cmd={typedCmd} typing={phase === 'typing'} />

                {(phase === 'revealing' || phase === 'pausing') && (
                  <div className="flex flex-col gap-0.5">
                    {BLOCKS[blockIdx].outputs.slice(0, revealCount).map((o, idx) => (
                      <div
                        key={idx}
                        className={`text-[11px] leading-[1.65] pl-1 ${OUTPUT_CLASS[o.type] || ''}`}
                        style={{ animation: 'htReveal 0.2s ease both', animationDelay: `${idx * 30}ms` }}
                      >
                        {o.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Idle cursor while pausing */}
                {phase === 'pausing' && revealCount === BLOCKS[blockIdx].outputs.length && (
                  <Prompt cmd="" typing />
                )}
              </div>
            )}
          </div>
        ) : (
          /* ══════════════ EDITOR BODY ══════════════ */
          <div
            className="overflow-y-auto overflow-x-hidden lg:flex-1"
            style={{
              maxHeight: '248px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className="flex" style={{ padding: '12px 0' }}>

              {/* Line number gutter — site's muted colour */}
              <div
                className="flex flex-col shrink-0 text-right"
                style={{
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  borderRight: '1px solid rgba(255,255,255,0.04)',
                  minWidth: '36px',
                }}
              >
                {CODE_LINES.map((_, i) => (
                  <span
                    key={i}
                    className="text-[11px] leading-[1.75] select-none"
                    style={{ color: '#1e3a5c' }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>

              {/* Code */}
              <pre
                className="flex-1 overflow-x-auto"
                style={{ padding: '0 16px', fontSize: '11.5px', lineHeight: '1.75', margin: 0 }}
              >
                <code>
                  {CODE_LINES.map((line, i) => (
                    <div key={i} style={{ whiteSpace: 'nowrap' }}>
                      {line.map((tok, j) => (
                        <span key={j} className={TOK[tok.c] || 'text-[#94a3b8]'}>
                          {tok.t}
                        </span>
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            </div>

            {/* Status bar — matches site's footer utility bars */}
            <div
              className="flex items-center justify-between px-4 py-1.5 text-[10px]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.04)',
                color: '#4a6070',
              }}
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1" style={{ color: 'rgba(0,212,255,0.5)' }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  protected
                </span>
                <span>JavaScript</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-1" style={{ color: 'rgba(0,212,255,0.4)' }}>
                <Sparkles size={9} />
                <span>Aignite Core</span>
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes htLiveDot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        @keyframes htReveal {
          from { opacity: 0; transform: translateY(3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes htBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* ── Prompt row component ─────────────────────────── */
function Prompt({ cmd, typing = false, done = false }) {
  return (
    <div className="flex items-center gap-1.5 flex-nowrap" style={{ fontSize: '11px', lineHeight: '1.65' }}>
      {/* aignite@club:~$ — site palette: green, muted, blue, purple, muted */}
      <span style={{ color: '#34D399', fontWeight: 700 }}>aignite</span>
      <span style={{ color: '#1e3a5c' }}>@</span>
      <span style={{ color: '#3B82F6', fontWeight: 600 }}>club</span>
      <span style={{ color: '#1e3a5c' }}>:</span>
      <span style={{ color: '#818CF8' }}>~</span>
      <span style={{ color: '#4a6070', fontWeight: 700, marginRight: '2px' }}>$</span>
      <span style={{ color: '#e8f4f8', fontWeight: 500 }}>{cmd}</span>
      {typing && (
        <span
          style={{
            display: 'inline-block',
            width: '6px',
            height: '13px',
            background: '#00d4ff',
            borderRadius: '1px',
            marginLeft: '1px',
            boxShadow: '0 0 6px rgba(0,212,255,0.6)',
            animation: 'htBlink 1s step-end infinite',
          }}
        />
      )}
    </div>
  );
}
