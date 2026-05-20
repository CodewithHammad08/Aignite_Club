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
import hammadFace from '../assets/hammad-face.png';
import hammadBody from '../assets/hammad-body.png';

// ─── Monospace font stack used throughout the stats panel ───
const MONO = '"JetBrains Mono", "Fira Code", monospace';

// ─── Real Aignite Tech Team data — swap photo_face / photo_body when photos are ready ───
const members = [
  {
    id: '03',
    name: 'Prathamesh Khaire',
    initials: 'PK',
    role: 'HEAD · TECH',
    position: 'FULL STACK',
    tagline: 'Crafting pixel-perfect web experiences',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/prathamesh-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/prathamesh-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Web Dev' },
      { label: 'STACK',    value: 'React' },
      { label: 'PROJECTS', value: '15' },
    ],
  },
  {
    id: '04',
    name: 'Parth',
    initials: 'PA',
    role: 'CO-HEAD · TECH',
    position: 'DEVELOPER',
    tagline: 'Scaling servers and securing deployments',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/parth-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/parth-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'DevOps' },
      { label: 'STACK',    value: 'Node' },
      { label: 'PROJECTS', value: '10' },
    ],
  },
  {
    id: '05',
    name: 'Hammad Dalvi',
    initials: 'HD',
    role: 'MEMBER · TECH',
    position: 'FULL STACK',
    tagline: 'Bridging the gap between design and code',
    photo_face: hammadFace,
    photo_body: hammadBody,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Web Dev' },
      { label: 'STACK',    value: 'React' },
      { label: 'PROJECTS', value: '8' },
    ],
  },
  {
    id: '06',
    name: 'Ramanan D.',
    initials: 'RD',
    role: 'MEMBER · TECH',
    position: 'BACKEND',
    tagline: 'Optimizing databases and microservices',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/ramanan-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/ramanan-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Backend' },
      { label: 'STACK',    value: 'Python' },
      { label: 'PROJECTS', value: '9' },
    ],
  },
  {
    id: '07',
    name: 'Ushank Shirke',
    initials: 'US',
    role: 'MEMBER · TECH',
    position: 'APP DEV',
    tagline: 'Building beautiful cross-platform apps',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/ushank-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/ushank-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Mobile' },
      { label: 'STACK',    value: 'Flutter' },
      { label: 'PROJECTS', value: '4' },
    ],
  },
  {
    id: '08',
    name: 'Soham',
    initials: 'SH',
    role: 'MEMBER · TECH',
    position: 'DEVELOPER',
    tagline: 'Transforming logic into interactive web designs',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/soham-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/soham-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Web Dev' },
      { label: 'STACK',    value: 'JS' },
      { label: 'PROJECTS', value: '6' },
    ],
  },
  {
    id: '09',
    name: 'Manogya',
    initials: 'MG',
    role: 'MEMBER · TECH',
    position: 'AI ENGINEER',
    tagline: 'Training neural networks to solve problems',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/manogya-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/manogya-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'AI/ML' },
      { label: 'STACK',    value: 'PyTorch' },
      { label: 'PROJECTS', value: '4' },
    ],
  },
  {
    id: '10',
    name: 'Tejas Gunjal',
    initials: 'TG',
    role: 'MEMBER · TECH',
    position: 'FRONTEND',
    tagline: 'Designing interactive and responsive UIs',
    photo_face: null, // SWAP WITH REAL PHOTO — /public/team/tejas-face.jpg
    photo_body: null, // SWAP WITH REAL PHOTO — /public/team/tejas-body.jpg
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'UI/UX' },
      { label: 'STACK',    value: 'Vue' },
      { label: 'PROJECTS', value: '7' },
    ],
  },
];

export function TeamCard({ member, heightClass = "h-[340px]" }) {
  const domainStat   = member.stats.find(s => s.label === 'DOMAIN');
  const stackStat    = member.stats.find(s => s.label === 'STACK');
  const projectsStat = member.stats.find(s => s.label === 'PROJECTS');

  // Determine badge text for heads / co-heads (like the VC badge in SRH layout)
  let badgeText = null;
  if (member.role.includes('HEAD')) {
    badgeText = member.role.includes('CO-HEAD') ? 'CH' : 'H';
  }

  return (
    /**
     * OUTER CARD WRAPPER
     * ─ `group` enables group-hover CSS on children
     * ─ overflow-hidden + rounded-xl clips the sliding panel at the card edges
     *   (no need to round only the top of the panel — the clip handles it)
     */
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${heightClass}`}
      style={{
        background: '#0d1526',
        border: '1px solid rgba(0, 212, 255, 0.10)',
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
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
        )}
      </div>

      {/* ══════════════════════════════════════════════
           DEFAULT CARD FACE  (visible before hover)
         ══════════════════════════════════════════════ */}

      {member.photo_face ? (
        <>
          {/* LAYER 1 — Zoomed out face photo (uses object-contain to fit without cropping) */}
          <img
            src={member.photo_face}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ objectPosition: 'center center' }}
          />

          {/* Gradient overlay: fades bottom to dark so name text is readable.
              Top stays transparent so the face shows through naturally. */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, #0d1526 28%, rgba(13,21,38,0.4) 60%, transparent 100%)',
            }}
          />
        </>
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
          style={{
            fontSize: 44,
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
          className="text-xs sm:text-sm md:text-lg font-black uppercase text-white tracking-wide leading-none truncate w-full"
          style={{
            fontFamily: '"Arial Black", Arial, sans-serif',
          }}
          title={member.name}
        >
          {member.name}
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
           • Do NOT put onMouseEnter here — use group-hover only
         ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-20 rounded-xl translate-y-full group-hover:translate-y-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.32,0,0.12,1)]"
        style={{ background: '#ffffff' }}
      >

        {/* RIGHT COLUMN — Full-body standing photo (takes up right 40%) */}
        {member.photo_body ? (
          <div
            className="absolute right-0 top-0 bottom-0"
            style={{ width: '40%', overflow: 'hidden' }}
          >
            {/* SWAP WITH REAL PHOTO — see naming convention above */}
            <img
              src={member.photo_body}
              alt={`${member.name} full body`}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'top center' }}
            />
            {/* Very light gradient overlay to blend into the white card body */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 8%, rgba(255, 255, 255, 0.4) 28%, rgba(255, 255, 255, 0) 55%)',
              }}
            />
          </div>
        ) : null}

        {/* LEFT COLUMN — Stats & Metadata content (floated above the photo, left 60% width) */}
        <div
          className="absolute left-0 top-0 bottom-0 flex flex-col justify-between"
          style={{ width: member.photo_body ? '60%' : '100%', zIndex: 10 }}
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

            {/* Row 2 Stats: Projects (moved to next row) */}
            {projectsStat && (
              <div
                className="mt-2 md:mt-4 border-b border-black/5 pb-2 md:pb-3.5"
              >
                <div className="text-[8.5px] md:text-[10px] font-mono text-black/40 uppercase tracking-wider mb-0.5" style={{ fontFamily: MONO }}>
                  {projectsStat.label}
                </div>
                <div className="text-[11.5px] sm:text-sm md:text-lg font-black font-mono text-black/90" style={{ fontFamily: MONO }}>
                  {projectsStat.value}
                </div>
              </div>
            )}

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
                className="text-[11px] sm:text-sm md:text-base font-black font-display text-black/95 uppercase leading-none truncate w-full"
                style={{
                  fontFamily: '"Arial Black", Arial, sans-serif',
                  letterSpacing: '0.3px',
                }}
                title={member.name}
              >
                {member.name}
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
  const heads       = members.filter(m => m.role.includes('HEAD'));
  const coreMembers = members.filter(m => !m.role.includes('HEAD'));

  return <TeamSection list={members} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Reusable TeamSection component for all departments
// ─────────────────────────────────────────────────────────────────────────────
function TeamSection({ list }) {
  const heads       = list.filter(m => m.role.includes('HEAD'));
  const coreMembers = list.filter(m => !m.role.includes('HEAD'));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>

      {/* ── Row 1: Heads (exactly 2 cards per row) ── */}
      <div className="grid grid-cols-2 gap-3">
        {heads.map(member => (
          <TeamCard key={member.id} member={member} heightClass="h-[300px] md:h-[440px]" />
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {coreMembers.map(member => (
          <TeamCard key={member.id} member={member} heightClass="h-[270px] md:h-[380px]" />
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
    name: 'Event Head',
    initials: 'EH',
    role: 'HEAD · EVENTS',
    position: 'ORGANIZER',
    tagline: 'Orchestrating high-impact campus tech experiences',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Operations' },
      { label: 'STACK',    value: 'Planning' },
      { label: 'EVENTS',   value: '12+' },
    ],
  },
  {
    id: '11',
    name: 'Event Co-Head',
    initials: 'ECH',
    role: 'CO-HEAD · EVENTS',
    position: 'COORDINATOR',
    tagline: 'Connecting logistics and community partnerships',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Logistics' },
      { label: 'STACK',    value: 'Execution' },
      { label: 'EVENTS',   value: '8+' },
    ],
  },
  {
    id: '12',
    name: 'Member 1',
    initials: 'M1',
    role: 'MEMBER · EVENTS',
    position: 'COORDINATOR',
    tagline: 'Bridging event conceptualization and delivery',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Coordination' },
      { label: 'STACK',    value: 'Operations' },
      { label: 'EVENTS',   value: '4' },
    ],
  },
  {
    id: '13',
    name: 'Member 2',
    initials: 'M2',
    role: 'MEMBER · EVENTS',
    position: 'LOGISTICS',
    tagline: 'Securing the backbone resources of Aignite events',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Resource Mgmt' },
      { label: 'STACK',    value: 'Planning' },
      { label: 'EVENTS',   value: '5' },
    ],
  },
  {
    id: '14',
    name: 'Member 3',
    initials: 'M3',
    role: 'MEMBER · EVENTS',
    position: 'COORDINATOR',
    tagline: 'Supervising volunteer workforces during bootcamps',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Management' },
      { label: 'STACK',    value: 'Leadership' },
      { label: 'EVENTS',   value: '3' },
    ],
  },
  {
    id: '15',
    name: 'Member 4',
    initials: 'M4',
    role: 'MEMBER · EVENTS',
    position: 'OUTREACH',
    tagline: 'Connecting with participants and external speakers',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Outreach' },
      { label: 'STACK',    value: 'Relations' },
      { label: 'EVENTS',   value: '4' },
    ],
  },
  {
    id: '16',
    name: 'Member 5',
    initials: 'M5',
    role: 'MEMBER · EVENTS',
    position: 'COORDINATOR',
    tagline: 'Managing registration systems and feedback loops',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Databases' },
      { label: 'STACK',    value: 'Analysis' },
      { label: 'EVENTS',   value: '3' },
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
    id: '17',
    name: 'PR Head',
    initials: 'PH',
    role: 'HEAD · PR',
    position: 'PUBLIC RELATIONS',
    tagline: 'Elevating the public identity of Aignite globally',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Publicity' },
      { label: 'STACK',    value: 'Strategy' },
      { label: 'CAMPAIGNS',value: '6+' },
    ],
  },
  {
    id: '18',
    name: 'PR Co-Head',
    initials: 'PCH',
    role: 'CO-HEAD · PR',
    position: 'PUBLIC RELATIONS',
    tagline: 'Forging deep industry alliances and sponsorships',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Partnership' },
      { label: 'STACK',    value: 'Outreach' },
      { label: 'CAMPAIGNS',value: '5+' },
    ],
  },
  {
    id: '19',
    name: 'Member 1',
    initials: 'M1',
    role: 'MEMBER · PR',
    position: 'OUTREACH',
    tagline: 'Pitching events to prospective club collaborators',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Outreach' },
      { label: 'STACK',    value: 'Negotiation' },
      { label: 'CAMPAIGNS',value: '3' },
    ],
  },
  {
    id: '20',
    name: 'Member 2',
    initials: 'M2',
    role: 'MEMBER · PR',
    position: 'PARTNERSHIPS',
    tagline: 'Nurturing long-term external club relations',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Relations' },
      { label: 'STACK',    value: 'Management' },
      { label: 'CAMPAIGNS',value: '2' },
    ],
  },
  {
    id: '21',
    name: 'Member 3',
    initials: 'M3',
    role: 'MEMBER · PR',
    position: 'SPONSORSHIPS',
    tagline: 'Drafting pitches and securing financial sponsorships',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Finance' },
      { label: 'STACK',    value: 'Sales' },
      { label: 'CAMPAIGNS',value: '4' },
    ],
  },
  {
    id: '22',
    name: 'Member 4',
    initials: 'M4',
    role: 'MEMBER · PR',
    position: 'COMMUNICATIONS',
    tagline: 'Coordinating club press releases and newsletters',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Press' },
      { label: 'STACK',    value: 'Writing' },
      { label: 'CAMPAIGNS',value: '3' },
    ],
  },
  {
    id: '23',
    name: 'Member 5',
    initials: 'M5',
    role: 'MEMBER · PR',
    position: 'SOCIAL MEDIA',
    tagline: 'Expanding our online footprint on Instagram and LinkedIn',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Socials' },
      { label: 'STACK',    value: 'SEO' },
      { label: 'CAMPAIGNS',value: '5' },
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
    id: '24',
    name: 'Design Head',
    initials: 'DH',
    role: 'HEAD · DESIGN',
    position: 'DESIGNER',
    tagline: 'Curating the overall visual brand guidelines of Aignite',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'UI/UX' },
      { label: 'STACK',    value: 'Figma' },
      { label: 'DESIGNS',  value: '30+' },
    ],
  },
  {
    id: '25',
    name: 'Design Co-Head',
    initials: 'DCH',
    role: 'CO-HEAD · DESIGN',
    position: 'DESIGNER',
    tagline: 'Overseeing UI prototyping and production graphic assets',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Graphics' },
      { label: 'STACK',    value: 'Illustrator' },
      { label: 'DESIGNS',  value: '24+' },
    ],
  },
  {
    id: '26',
    name: 'Member 1',
    initials: 'M1',
    role: 'MEMBER · DESIGN',
    position: 'UI/UX',
    tagline: 'Designing web dashboards and interactive prototypes',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'UI/UX' },
      { label: 'STACK',    value: 'Figma' },
      { label: 'DESIGNS',  value: '10' },
    ],
  },
  {
    id: '27',
    name: 'Member 2',
    initials: 'M2',
    role: 'MEMBER · DESIGN',
    position: 'GRAPHICS',
    tagline: 'Designing Instagram posts and event promotional posters',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Graphics' },
      { label: 'STACK',    value: 'Photoshop' },
      { label: 'DESIGNS',  value: '12' },
    ],
  },
  {
    id: '28',
    name: 'Member 3',
    initials: 'M3',
    role: 'MEMBER · DESIGN',
    position: 'MOTION',
    tagline: 'Animating 2D/3D promotional videos and loops',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Motion' },
      { label: 'STACK',    value: 'AfterEffects' },
      { label: 'DESIGNS',  value: '6' },
    ],
  },
  {
    id: '29',
    name: 'Member 4',
    initials: 'M4',
    role: 'MEMBER · DESIGN',
    position: 'BRAND',
    tagline: 'Developing brand merchandise templates and logos',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Merch' },
      { label: 'STACK',    value: 'InDesign' },
      { label: 'DESIGNS',  value: '8' },
    ],
  },
  {
    id: '30',
    name: 'Member 5',
    initials: 'M5',
    role: 'MEMBER · DESIGN',
    position: 'ILLUSTRATION',
    tagline: 'Creating custom digital illustrations for web graphics',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Artwork' },
      { label: 'STACK',    value: 'Procreate' },
      { label: 'DESIGNS',  value: '9' },
    ],
  },
  {
    id: '31',
    name: 'Member 6',
    initials: 'M6',
    role: 'MEMBER · DESIGN',
    position: 'VISUAL',
    tagline: 'Perfecting layout colors and typography across banners',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Banners' },
      { label: 'STACK',    value: 'Figma' },
      { label: 'DESIGNS',  value: '7' },
    ],
  },
];

export function DesignTeam() {
  return <TeamSection list={designMembers} />;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Content Department Data & Component
// ─────────────────────────────────────────────────────────────────────────────
export const contentMembers = [
  {
    id: '32',
    name: 'Content Head',
    initials: 'CH',
    role: 'HEAD · CONTENT',
    position: 'CONTENT WRITER',
    tagline: 'Shaping the narrative voice and media files of Aignite',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Media' },
      { label: 'STACK',    value: 'Editing' },
      { label: 'PROJECTS', value: '18+' },
    ],
  },
  {
    id: '33',
    name: 'Content Co-Head',
    initials: 'CCH',
    role: 'CO-HEAD · CONTENT',
    position: 'CONTENT WRITER',
    tagline: 'Proofreading blog articles and video scripting outlines',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Copywrite' },
      { label: 'STACK',    value: 'Scripting' },
      { label: 'PROJECTS', value: '14+' },
    ],
  },
  {
    id: '34',
    name: 'Member 1',
    initials: 'M1',
    role: 'MEMBER · CONTENT',
    position: 'PHOTOGRAPHY',
    tagline: 'Taking professional headshots and coverage of key meetups',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Photo' },
      { label: 'STACK',    value: 'Lightroom' },
      { label: 'PROJECTS', value: '6' },
    ],
  },
  {
    id: '35',
    name: 'Member 2',
    initials: 'M2',
    role: 'MEMBER · CONTENT',
    position: 'VIDEOGRAPHY',
    tagline: 'Recording high-definition highlights of club workshops',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Video' },
      { label: 'STACK',    value: 'Premiere' },
      { label: 'PROJECTS', value: '8' },
    ],
  },
  {
    id: '36',
    name: 'Member 3',
    initials: 'M3',
    role: 'MEMBER · CONTENT',
    position: 'COPYWRITER',
    tagline: 'Drafting catchy taglines for landing pages and flyers',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Copy' },
      { label: 'STACK',    value: 'Creative' },
      { label: 'PROJECTS', value: '10' },
    ],
  },
  {
    id: '37',
    name: 'Member 4',
    initials: 'M4',
    role: 'MEMBER · CONTENT',
    position: 'STRATEGY',
    tagline: 'Planning content release calendars and post captions',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Strategy' },
      { label: 'STACK',    value: 'Planning' },
      { label: 'PROJECTS', value: '9' },
    ],
  },
  {
    id: '38',
    name: 'Member 5',
    initials: 'M5',
    role: 'MEMBER · CONTENT',
    position: 'REELS',
    tagline: 'Editing fast-paced tech reels and viral vertical content',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Reels' },
      { label: 'STACK',    value: 'CapCut' },
      { label: 'PROJECTS', value: '12' },
    ],
  },
  {
    id: '39',
    name: 'Member 6',
    initials: 'M6',
    role: 'MEMBER · CONTENT',
    position: 'BLOGS',
    tagline: 'Authoring deep-dive technical articles about modern AI',
    photo_face: null,
    photo_body: null,
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    stats: [
      { label: 'DOMAIN',   value: 'Technical' },
      { label: 'STACK',    value: 'Markdown' },
      { label: 'PROJECTS', value: '7' },
    ],
  },
];

export function ContentTeam() {
  return <TeamSection list={contentMembers} />;
}
