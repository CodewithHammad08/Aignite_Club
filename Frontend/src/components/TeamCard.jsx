// TeamCard.jsx — SRH-inspired IPL player card for Aignite · Tech Team
//
// INTERACTION:  On hover, a white stats panel slides up from the bottom
//               (translateY(100%) → translateY(0)).  NO flip, NO fade.
//               Pure CSS via Tailwind group / group-hover on the card wrapper.
//               Mouse-leave → slides back down.
//
// IMAGE NAMING: /public/team/{firstname}-face.jpg  → close-up bust shot
//               /public/team/{firstname}-body.jpg  → full body standing shot
//               Drop real photos in /public/team/ and swap the null values below.

import React from 'react';
import { Linkedin, Github } from '../Icons';
// ─── Monospace font stack used throughout the stats panel ───
const MONO = '"JetBrains Mono", "Fira Code", monospace';

// ─── Cloudinary Optimization Helper ───
const optimizeCloudinaryUrl = (url, width = 900) => {
  if (!url || typeof url !== 'string') return url;
  if (!url.includes('cloudinary.com')) return url;
  return url.replace('/image/upload/', `/image/upload/f_auto,q_100,w_${width}/`);
};

// ─── Real Aignite Tech Team data — swap photo_face / photo_body when photos are ready ───
const members = [
  {
    id: '03',
    name: 'Prathamesh Khaire',
    initials: 'PK',
    role: 'HEAD · TECH',
    position: 'FULL STACK',
    tagline: 'Architecting robust and scalable backend systems.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787236041/ChatGPT_Image_Aug_20_2026_07_48_11_PM-no-bg_jgyhlq.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787236041/ChatGPT_Image_Aug_20_2026_07_48_11_PM-no-bg_jgyhlq.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/prathamesh-khaire/',
    stats: [
      { label: 'DOMAIN', value: 'Backend Dev' },
      { label: 'STACK', value: 'MERN' },
    ],
  },
  {
    id: '04',
    name: 'Parth Kumar Jat',
    initials: 'PJ',
    role: 'CO-HEAD · TECH',
    position: 'DEVELOPER',
    tagline: 'Bridging the gap between hardware and intuitive interfaces.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232634/parth-no-bg_janw05.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/parth-kumar-jat-35b537224/',
    stats: [
      { label: 'DOMAIN', value: 'IOT' },
      { label: 'STACK', value: 'Frontend' },
    ],
  },
  {
    id: '05',
    name: 'Hammad Dalvi',
    initials: 'HD',
    role: 'MEMBER · TECH',
    position: 'FULL STACK',
    tagline: 'Bridging the gap between design and code',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779968193/hammad_bkfode.png',
    photo_body: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779968335/hammad-hover_thhncg.png',
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/hammad-dalvi08',
    stats: [
      { label: 'DOMAIN', value: 'Web Dev' },
      { label: 'STACK', value: 'MERN' },
      { label: 'PROJECTS', value: '8' },
    ],
  },
  {
    id: '07',
    name: 'Ushank Rajeshshirke',
    initials: 'UR',
    role: 'MEMBER · TECH',
    position: 'APP DEV',
    tagline: 'Ensuring flawless technical execution at every event.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232742/ushank-no-bg_ibwx7s.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'EVENT OPS' },
      { label: 'STACK', value: 'Tech Setup' },
    ],
  },
  {
    id: '08',
    name: 'Soham Ramane',
    initials: 'SR',
    role: 'MEMBER · TECH',
    position: 'DEVELOPER',
    tagline: 'Building immersive and interactive experiences for attendees.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232796/soham-no-bg_eadice.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/soham-ramane-269b8b2a4/',
    stats: [
      { label: 'DOMAIN', value: 'EVENT TECH' },
      { label: 'STACK', value: 'Interactive Experiences' },
    ],
  },
  {
    id: '09',
    name: 'Tejas Gunjal',
    initials: 'TG',
    role: 'MEMBER · TECH',
    position: 'FRONTEND',
    tagline: 'Designing stunning interfaces with pixel-perfect frontend execution.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787235092/ChatGPT_Image_Aug_20_2026_07_39_17_PM-no-bg_wqe2ww.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779964120/a8b0d3cd7fec415bbaee98bbee0325da_wsgqnc.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/tejas-gunjal-b64794321',
    stats: [
      { label: 'DOMAIN', value: 'UI/UX' },
      { label: 'STACK', value: 'Frontend' },
    ],
  },
  {
    id: '10',
    name: 'Manognya',
    initials: 'MG',
    role: 'MEMBER · TECH',
    position: 'AI ENGINEER',
    tagline: 'Powering engaging presentations and seamless event connectivity.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232640/manogyaa-no-bg_biuzpv.png',
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://www.linkedin.com/in/manognya-donakonda-5908b1376/',
    stats: [
      { label: 'DOMAIN', value: 'EVENT OPS' },
      { label: 'STACK', value: 'PPT & Connectivity' },
    ],
  },
];

export function TeamCard({ member, heightClass = "h-[340px]", facing = 'right' }) {
  const [clicked, setClicked] = React.useState(false);
  const [imgLoaded, setImgLoaded] = React.useState(false);

  const domainStat = member.stats.find(s => s.label === 'DOMAIN');
  const stackStat = member.stats.find(s => s.label === 'STACK' || s.label === 'FOCUS');
  const projectsStat = member.stats.find(s => s.label === 'PROJECTS');

  // Determine badge text for heads / co-heads (like the VC badge in SRH layout)
  let badgeText = null;
  if (member.role.includes('HEAD')) {
    badgeText = member.role.includes('CO-HEAD') ? 'CH' : 'H';
  }

  const isHead = member.role.includes('HEAD') || member.role.includes('PRESIDENT') || member.role.includes('VICE PRESIDENT');

  return (
    /**
     * OUTER CARD WRAPPER
     * ─ `group` enables group-hover CSS on children
     * ─ overflow-hidden + rounded-xl clips the sliding panel at the card edges
     *   (no need to round only the top of the panel — the clip handles it)
     */
    <div
      onClick={() => setClicked(c => !c)}
      onMouseLeave={() => setClicked(false)}
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${heightClass}`}
      style={{
        background: '#0d1526',
        border: '1px solid rgba(0, 212, 255, 0.10)',
        /* Promote to own composited layer — prevents neighbouring repaints */
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >

      {/* Social Links (Always visible in top-right corner, z-30) */}
      <div
        className="absolute top-2.5 right-2.5 md:top-3.5 md:right-3.5 flex items-center gap-1 md:gap-1.5"
        style={{ zIndex: 30 }}
      >
        {member.github && (
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:!text-[#00d4ff] group-hover:text-black/40 group-hover:hover:!text-black transition-colors duration-200 p-1 md:p-1.5 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:!text-[#00d4ff] group-hover:text-black/40 group-hover:hover:!text-[#0077b5] transition-colors duration-200 p-1 md:p-1.5 rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <svg className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>

      {/* ══════════════════════════════════════════════
           DEFAULT CARD FACE  (visible before hover)
         ══════════════════════════════════════════════ */}

      {member.photo_face ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 6 }}>
          {/* LAYER A — Ambient glow behind the subject */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 75% 80% at 50% 40%, rgba(0,212,255,0.07) 0%, rgba(13,21,38,0.6) 55%, #0d1526 100%)',
            }}
          />

          {/* LAYER B — Portrait image */}
          {/* Shimmer skeleton shown while image is loading */}
          {!imgLoaded && (
            <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(90deg, #0d1526 0%, #152035 40%, #1a2a45 50%, #152035 60%, #0d1526 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.6s infinite',
              }} />
            </div>
          )}
          <img
            src={optimizeCloudinaryUrl(member.photo_face, 500)}
            alt={member.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            className={`absolute inset-0 w-full object-contain transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'} ${isHead ? 'h-[78%] top-[11%] md:h-full md:top-0' : 'h-full'}`}
            style={{
              objectPosition: 'center center',
              filter: 'brightness(0.96) contrast(1.05)',
              zIndex: 3,
            }}
          />

          {/* LAYER C — Radial vignette + bottom/side fades on TOP of image */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 85% 85% at 50% 40%, transparent 35%, rgba(13,21,38,0.55) 70%, #0d1526 100%),
                linear-gradient(to top,  #0d1526 22%, rgba(13,21,38,0.5) 52%, transparent 80%),
                linear-gradient(to right, rgba(13,21,38,0.7) 0%, transparent 28%),
                linear-gradient(to left,  rgba(13,21,38,0.7) 0%, transparent 28%),
                linear-gradient(to bottom, rgba(13,21,38,0.5) 0%, transparent 20%)
              `,
            }}
          />
        </div>
      ) : (
        /* FALLBACK — initials circle when photo_face is null */
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 88,
              height: 88,
              background: '#0a1828',
              border: '2px solid rgba(0, 212, 255, 0.25)',
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#00d4ff',
                userSelect: 'none',
              }}
            >
              {member.initials}
            </span>
          </div>
        </div>
      )}

      {/* LAYER 2 — Jersey-number & badge (top-left, just like VC badge in SRH layout) */}
      <div
        className="absolute select-none pointer-events-none flex items-center gap-1.5"
        style={{
          top: 14,
          left: 14,
          zIndex: 5,
        }}
      >
        {badgeText && (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: '#00d4ff',
              border: '1.5px solid #ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 8,
              fontWeight: 900,
              color: '#0d1526',
              fontFamily: MONO,
              lineHeight: 1,
            }}
          >
            {badgeText}
          </div>
        )}
        <div
          className="text-[26px] md:text-[44px]"
          style={{
            fontWeight: 900,
            fontFamily: '"Arial Black", Arial, sans-serif',
            color: '#ffffff',
            lineHeight: 0.9,
            letterSpacing: '-1.5px',
          }}
        >
          {member.id}
        </div>
      </div>

      {/* LAYER 3 — Stacked Bottom label (resolves horizontal name/id collision on mobile) */}
      <div
        className="absolute left-0 right-0 bottom-0 p-3 pb-4 md:p-5 md:pb-6 z-10 text-left"
      >
        <div
          className="text-[9px] md:text-xs font-mono text-[#00d4ff] mb-0.5"
          style={{ fontFamily: MONO }}
        >
          #{member.id}
        </div>
        <div
          className="text-xs sm:text-sm md:text-lg font-black uppercase text-white tracking-wide leading-none truncate w-full flex items-center gap-2"
          style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
          }}
          title={member.name}
        >
          <a
            href={member.linkedin && member.linkedin !== '#' ? member.linkedin : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-[#00d4ff] transition-colors truncate ${!member.linkedin || member.linkedin === '#' ? 'pointer-events-none' : ''}`}
          >
            {member.name}
          </a>
          
          <div className="flex gap-1.5 items-center flex-shrink-0">
            {member.linkedin && member.linkedin !== '#' ? (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:text-[#00d4ff] hover:opacity-100 transition-all">
                <Linkedin size={14} />
              </a>
            ) : (
              <div className="opacity-30 pointer-events-none"><Linkedin size={14} /></div>
            )}
            {(member.role.includes('TECH') || member.role.includes('PRESIDENT')) && (
              member.github && member.github !== '#' ? (
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="opacity-70 hover:text-white hover:opacity-100 transition-all">
                  <Github size={14} />
                </a>
              ) : (
                <div className="opacity-30 pointer-events-none"><Github size={14} /></div>
              )
            )}
          </div>
        </div>
        <div
          className="text-[8px] md:text-[10px] font-mono uppercase text-white/60 mt-1"
          style={{ fontFamily: MONO }}
        >
          {member.position || 'MEMBER'}
        </div>
      </div>


      {/* ══════════════════════════════════════════════
           SLIDE-UP WHITE PANEL  (appears on hover)

           • translate-y-full  → starts hidden below card
           • group-hover:translate-y-0  → slides up to cover card
           • transition-transform + duration-[420ms] + custom ease
           • facing='right' → person looks right → photo on LEFT, stats on RIGHT
           • facing='left'  → person looks left  → photo on RIGHT, stats on LEFT
         ══════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 z-20 rounded-xl transition-transform duration-[420ms] ease-[cubic-bezier(0.32,0,0.12,1)] ${clicked ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}
        style={{
          background: '#ffffff',
          willChange: 'transform',
        }}
      >
        {/* PHOTO COLUMN — shows photo_face, positioned by `facing` prop */}
        {member.photo_face && (
          <div
            className="absolute top-0 bottom-0"
            style={{
              width: '42%',
              overflow: 'hidden',
              [facing === 'right' ? 'left' : 'right']: 0,
            }}
          >
            <img
              src={(() => {
                const url = member.photo_hover || member.photo_body || member.photo_face;
                if (!url || typeof url !== 'string') return url;
                if (!url.includes('cloudinary.com')) return url;
                return url.replace('/image/upload/', '/image/upload/f_auto,q_100,w_800/');
              })()}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center top', imageRendering: 'auto' }}
            />
            {/* Fade edge toward the stats side */}
            <div
              className="absolute inset-0"
              style={{
                background: facing === 'right'
                  ? 'linear-gradient(to right, rgba(255,255,255,0) 68%, rgba(255,255,255,0.6) 88%, rgba(255,255,255,1) 100%)'
                  : 'linear-gradient(to left,  rgba(255,255,255,0) 68%, rgba(255,255,255,0.6) 88%, rgba(255,255,255,1) 100%)',
              }}
            />
          </div>
        )}

        {/* STATS COLUMN — positioned opposite the photo */}
        <div
          className="absolute top-0 bottom-0 flex flex-col justify-between"
          style={{
            width: member.photo_face ? '58%' : '100%',
            [facing === 'right' ? 'right' : 'left']: 0,
            zIndex: 10,
          }}
        >

          {/* ── TOP SECTION ── */}
          <div className="p-3 pt-3.5 md:p-5 md:pt-6">

            {/* Large jersey number — faint watermark */}
            <div
              className="text-4xl md:text-7xl font-black font-display leading-[0.8] mb-0.5 md:mb-1 text-black/5 select-none pointer-events-none"
              style={{ fontFamily: '"Arial Black", Arial, sans-serif' }}
            >
              {member.id}
            </div>

            {/* Row 1 Stats: Domain & Stack */}
            <div
              className="grid grid-cols-2 gap-2 md:gap-4 border-t border-black/5 pt-1 md:pt-2"
            >
              {domainStat && (
                <div>
                  <div className="text-[8.5px] md:text-[10px] font-mono text-black/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: MONO }}>
                    {domainStat.label}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-black font-mono text-black/90 uppercase truncate" style={{ fontFamily: MONO }}>
                    {domainStat.value}
                  </div>
                </div>
              )}
              {stackStat && (
                <div>
                  <div className="text-[8.5px] md:text-[10px] font-mono text-black/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: MONO }}>
                    {stackStat.label}
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-black font-mono text-black/90 uppercase truncate" style={{ fontFamily: MONO }}>
                    {stackStat.value}
                  </div>
                </div>
              )}
            </div>


            {/* Tagline */}
            {member.tagline && (
              <div
                className="text-[9.5px] md:text-[12px] leading-snug text-black/60 mt-2 md:mt-4 font-medium italic font-mono line-clamp-2"
                style={{ fontFamily: MONO }}
              >
                "{member.tagline}"
              </div>
            )}

          </div>

          {/* ── BOTTOM BAR ── */}
          <div
            className="flex items-end justify-start p-3 pb-4 md:p-5 border-t border-black/5"
          >
            {/* Left aligned: member number + name + role */}
            <div style={{ textAlign: 'left', width: '100%', minWidth: 0 }}>
              <div
                className="text-[8px] md:text-[10px] font-mono text-black/30 mb-0.5"
                style={{ fontFamily: MONO }}
              >
                #{member.id}
              </div>
              <div
                className="text-[11px] sm:text-sm md:text-base font-black font-display text-black/95 uppercase leading-none truncate w-full flex items-center gap-1.5"
                style={{
                  fontFamily: '"Arial Black", Arial, sans-serif',
                  letterSpacing: '0.3px',
                }}
                title={member.name}
              >
                <a
                  href={member.linkedin && member.linkedin !== '#' ? member.linkedin : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hover:text-[#0077b5] transition-colors truncate ${!member.linkedin || member.linkedin === '#' ? 'pointer-events-none' : ''}`}
                >
                  {member.name}
                </a>

                <div className="flex gap-1.5 items-center flex-shrink-0">
                  {member.linkedin && member.linkedin !== '#' ? (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0077b5] opacity-80 hover:opacity-100 transition-all">
                      <Linkedin size={14} />
                    </a>
                  ) : (
                    <div className="text-black/30 pointer-events-none"><Linkedin size={14} /></div>
                  )}
                  {(member.role.includes('TECH') || member.role.includes('PRESIDENT')) && (
                    member.github && member.github !== '#' ? (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black hover:opacity-100 transition-all">
                        <Github size={14} />
                      </a>
                    ) : (
                      <div className="text-black/20 pointer-events-none"><Github size={14} /></div>
                    )
                  )}
                </div>
              </div>
              <div
                className="text-[8px] md:text-[10px] text-black/50 tracking-wider mt-1 font-mono uppercase truncate"
                style={{ fontFamily: MONO }}
              >
                {member.role}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
//  TechTeam  (default export) — two-row layout matching the spec
//
//  Row 1 "Heads"        → members whose role contains "HEAD"
//                         min-width 220px, flex 1, height 440px
//  Row 2 "Core Members" → remaining members
//                         min-width 180px, flex 1, height 380px
// ─────────────────────────────────────────────────────────────────────────────
export default function TechTeam() {
  const heads = members.filter(m => m.role.includes('HEAD'));
  const coreMembers = members.filter(m => !m.role.includes('HEAD'));

  return <TeamSection list={members} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Reusable TeamSection component for all departments
// ─────────────────────────────────────────────────────────────────────────────
function TeamSection({ list }) {
  const heads = list.filter(m => m.role.includes('HEAD'));
  const coreMembers = list.filter(m => !m.role.includes('HEAD'));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Row 1: Heads (exactly 2 cards per row) ── */}
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        {heads.map((member, i) => (
          <TeamCard
            key={member.id}
            member={member}
            heightClass="h-[220px] md:h-[440px]"
            facing={i % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>

      {/* ── "CORE MEMBERS" divider label ── */}
      <div
        style={{
          fontSize: 10,
          fontFamily: MONO,
          letterSpacing: '2px',
          color: 'rgba(0, 212, 255, 0.4)',
          margin: '24px 0 10px',
          textTransform: 'uppercase',
        }}
      >
        Core Members
      </div>

      {/* ── Row 2: Core Members (2 cards per row on mobile, 3 cards on desktop) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {coreMembers.map((member, i) => (
          <TeamCard
            key={member.id}
            member={member}
            heightClass="h-[220px] md:h-[440px]"
            facing={i % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Events Department Data & Component
// ─────────────────────────────────────────────────────────────────────────────
export const eventMembers = [
  {
    id: '10',
    name: 'Prince Kumar',
    initials: 'PK',
    role: 'HEAD · EVENT TEAM',
    position: 'ORGANIZER',
    tagline: 'Turning ideas into well-planned experiences, from first draft to final execution.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962686/42fa127ca8414cbab33ab74c25da9b46_uoltja.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232631/prince-no-bg_hmicpq.png',
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/prince-kumar-879247322/',
    stats: [
      { label: 'DOMAIN', value: 'MANAGEMENT' },
      { label: 'FOCUS', value: 'PLANNING' },
    ],
  },
  {
    id: '11',
    name: 'Disha Shetty',
    initials: 'DS',
    role: 'CO-HEAD · EVENT TEAM',
    position: 'COORDINATOR',
    tagline: 'Keeping people, plans, and every part of the event moving together.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962707/1c5ba42423a740308e5168749a1fb46a_o7thkb.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232629/disha-no-bg_eu0kpf.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'MANAGEMENT' },
      { label: 'FOCUS', value: 'COORDINATION' },
    ],
  },
  {
    id: '12',
    name: 'Aditya',
    initials: 'AD',
    role: 'COORDINATOR · EVENT TEAM',
    position: 'COORDINATOR',
    tagline: 'Bringing teams together and keeping every part of the plan on track.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962712/542229ec34274109bc4965f7bafb859e_t1otk9.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779965116/ChatGPT_Image_May_28__2026__04_13_32_PM-removebg-preview_rov5rr.png',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'COORDINATION' },
    ],
  },
  {
    id: '13',
    name: 'Jasn Rathore',
    initials: 'JR',
    role: 'EVENT PLANNING · EVENT TEAM',
    position: 'EVENT PLANNING',
    tagline: 'Making sure the details behind every event are ready when they matter.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962702/3591387ea6df4e94ab8a816dc742559d_my2c40.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779964114/c6e15e6d2fcb42d79d662321b5430f09_juzlrm.png',
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/jasn-rathore-884644256/',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'EXECUTION' },
    ],
  },
  {
    id: '14',
    name: 'Parth Sonawane',
    initials: 'PS',
    role: 'COORDINATOR · EVENT TEAM',
    position: 'COORDINATOR',
    tagline: 'Helping turn the plan into a smooth experience on the ground.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787234319/69005e85331641c29adf5aa94580735a_mjlwah-no-bg_lxnqv3.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787234319/69005e85331641c29adf5aa94580735a_mjlwah-no-bg_lxnqv3.png',
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/parth-sonawane-989098322/',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'EXECUTION' },
    ],
  },
  {
    id: '15',
    name: 'Bhoomika Salian',
    initials: 'BS',
    role: 'COORDINATOR · EVENT TEAM',
    position: 'COORDINATOR',
    tagline: 'Streamlining workflows and ensuring flawless operational execution.',
    photo_face: null,
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'WORKFLOW' },
    ],
  },
];

export function EventTeam() {
  return <TeamSection list={eventMembers} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  PR Department Data & Component
// ─────────────────────────────────────────────────────────────────────────────
export const prMembers = [
  {
    id: '18',
    name: 'Gunjan Kharat',
    initials: 'GK',
    role: 'HEAD · PR TEAM',
    position: 'PUBLIC RELATIONS',
    tagline: 'Building the buzz before the event and bringing the energy to the stage.',
    photo_face: null,
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/gunjan-kharat-244097322/',
    stats: [
      { label: 'DOMAIN', value: 'Promotion' },
      { label: 'FOCUS', value: 'Social Media & Anchoring' },
    ],
  },
  {
    id: '19',
    name: 'Ujjwal Bansode',
    initials: 'UB',
    role: 'OUTREACH · PR TEAM',
    position: 'OUTREACH',
    tagline: 'Connecting AIgnite with students and turning announcements into participation.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779903807/Ujjwal_xj1uu2.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'Promotion' },
      { label: 'FOCUS', value: 'Student Outreach' },
    ],
  },
  {
    id: '20',
    name: 'Yusuf Mukadam',
    initials: 'YM',
    role: 'PARTNERSHIPS · PR TEAM',
    position: 'PARTNERSHIPS',
    tagline: 'Forging deep industry alliances and driving external collaborations.',
    photo_face: null,
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/yusuf-mukadam-77b481376/',
    stats: [
      { label: 'DOMAIN', value: 'Public Relations' },
      { label: 'FOCUS', value: 'External Coordination' },
    ],
  },
];

export function PRTeam() {
  return <TeamSection list={prMembers} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Design Department Data & Component
// ─────────────────────────────────────────────────────────────────────────────
export const designMembers = [
  {
    id: '25',
    name: 'Aniket Mishra',
    initials: 'AM',
    role: 'HEAD · DESIGN TEAM',
    position: 'DESIGN HEAD',
    tagline: 'Turning ideas into visuals that people remember.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787229479/Aniket_y1w5uw.png',
    photo_body: null,
    linkedin: 'https://www.linkedin.com/in/aniketmishra3535/',
    stats: [
      { label: 'DOMAIN', value: 'VISUAL DESIGN' },
      { label: 'FOCUS', value: 'BRANDING & EVENT DESIGN' },
    ],
  },
  {
    id: '26',
    name: 'Shubham Singh',
    initials: 'SS',
    role: 'DESIGNER · DESIGN TEAM',
    position: 'DESIGNER',
    tagline: 'Designing experiences that make technology easier to engage with.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787234358/7e3385ac4fd944259204cc814a27d8b6_syhbda-no-bg_nokuvn.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787234358/7e3385ac4fd944259204cc814a27d8b6_syhbda-no-bg_nokuvn.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'VISUAL DESIGN' },
      { label: 'FOCUS', value: 'CREATIVE DESIGN' },
    ],
  },
];

export function DesignTeam() {
  return <TeamSection list={designMembers} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Content Department Data & Component
// ─────────────────────────────────────────────────────────────────────────────
// Social Media Team members
export const contentMembers = [
  {
    id: '32',
    name: 'Tanvi Utekar',
    initials: 'TU',
    role: 'HEAD · SOCIAL MEDIA TEAM',
    position: 'SOCIAL MEDIA LEAD',
    tagline: 'Keeping AIgnite connected, visible, and active beyond the classroom.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779902365/Tanvi_rusbiy.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232634/tanvi-no-bg_qqjlgr.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'SOCIAL MEDIA' },
      { label: 'FOCUS', value: 'CONTENT & PLATFORM MANAGEMENT' },
    ],
  },
  {
    id: '33',
    name: 'Moiz Usmani',
    initials: 'MU',
    role: 'CONTENT CREATOR · SOCIAL MEDIA TEAM',
    position: 'CONTENT CREATOR',
    tagline: 'Capturing the moments that bring AIgnite to life.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962700/450672edf15f408da194cf7bd845f99d_njcf86.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232629/moiz-no-bg_tp7o57.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'DIGITAL CONTENT' },
      { label: 'FOCUS', value: 'VIDEO & EVENT COVERAGE' },
    ],
  },
  {
    id: '34',
    name: 'Yash Gosavi',
    initials: 'YG',
    role: 'CONTENT CREATOR · SOCIAL MEDIA TEAM',
    position: 'CONTENT CREATOR',
    tagline: 'Turning moments from every event into content worth watching.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962687/f4ac26cb62634d8f8252f7a7c4b3603f_esdd1n.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232636/yash_gosavi-no-bg_rgzoqz.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'DIGITAL CONTENT' },
      { label: 'FOCUS', value: 'REELS & VIDEO PRODUCTION' },
    ],
  },
  {
    id: '35',
    name: 'Kunal Dhumal',
    initials: 'KD',
    role: 'MEMBER · SOCIAL MEDIA',
    position: 'VIDEOGRAPHY',
    tagline: 'Recording high-definition event highlights and coverage',
    photo_face: null,
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'Video' },
      { label: 'STACK', value: 'Premiere' },
      { label: 'PROJECTS', value: '8' },
    ],
  },
];

// Discipline Team members
export const disciplineMembers = [
  {
    id: '37',
    name: 'Amay Rathor',
    initials: 'AR',
    role: 'MEMBER · DISCIPLINE TEAM',
    position: 'DISCIPLINE LEAD',
    tagline: 'Keeping every event organized, respectful, and running smoothly.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962708/230af789c1d04843ab21a90041b3869c_esgmtd.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232628/amey-no-bg_rricp5.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'DECORUM & COORDINATION' },
    ],
  },
  {
    id: '38',
    name: 'Sai Hadke',
    initials: 'SH',
    role: 'MEMBER · DISCIPLINE TEAM',
    position: 'DISCIPLINE COORDINATOR',
    tagline: 'Creating an environment where everyone can learn, participate, and enjoy.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1779962689/6a33da7d07904ca4a18bff568ae0194f_shovcr.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787232629/IMG_8520-no-bg_y1tenn.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'EVENT OPERATIONS' },
      { label: 'FOCUS', value: 'AUDIENCE COORDINATION' },
    ],
  },
  {
    id: '39',
    name: 'Umar Ansari',
    initials: 'UA',
    role: 'MEMBER · DISCIPLINE TEAM',
    position: 'DISCIPLINE COORDINATOR',
    tagline: 'Making sure everything stays on track, from the first session to the last.',
    photo_face: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787235090/ChatGPT_Image_Aug_20_2026_07_38_01_PM-no-bg_kpm5jk.png',
    photo_hover: 'https://res.cloudinary.com/dnd7yjtig/image/upload/v1787235090/ChatGPT_Image_Aug_20_2026_07_38_01_PM-no-bg_kpm5jk.png',
    photo_body: null,
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN', value: 'OPERATIONS' },
      { label: 'FOCUS', value: 'ON-GROUND MANAGEMENT' },
    ],
  },
];

export function ContentTeam() {
  return <TeamSection list={contentMembers} />;
}

export function DisciplineTeam() {
  return <TeamSection list={disciplineMembers} />;
}
