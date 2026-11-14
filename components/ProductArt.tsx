'use client';
import { useId } from 'react';
import type { Category, Style, Tone } from '@/lib/data';

const METAL: Record<Tone, [string, string, string]> = {
  gold: ['#F7E3A8', '#C9A24E', '#8B6A2B'], rose: ['#F9D9CA', '#D99C86', '#9B5E4C'],
  silver: ['#FFFFFF', '#C9CDD2', '#7C8187'], oxidised: ['#BDBAB0', '#706E67', '#3B3A36'],
};
const GEM: Record<Style, [string, string]> = {
  kundan: ['#C2263F', '#2F9E78'], pearl: ['#FBF6EE', '#E6D9C6'], oxidised: ['#7C8F7A', '#566656'],
  'gold-plated': ['#F4D88A', '#D9AC4B'], 'american-diamond': ['#F4FAFF', '#BFD9F2'], minimal: ['#F8EBC0', '#E4C877'], traditional: ['#9E1F3F', '#1F7A5C'],
};
const BG = ['#F1E7DA', '#E7D6C3', '#F1E7DA', '#3A1721'];
type P = number[][];
const bez = (p: P, t: number) => { const u = 1 - t; return [u*u*u*p[0][0] + 3*u*u*t*p[1][0] + 3*u*t*t*p[2][0] + t*t*t*p[3][0], u*u*u*p[0][1] + 3*u*u*t*p[1][1] + 3*u*t*t*p[2][1] + t*t*t*p[3][1]]; };
const pts = (p: P, n: number) => Array.from({ length: n + 1 }, (_, i) => bez(p, i / n));

interface Props { category: Category; style: Style; tone: Tone; view?: number; bare?: boolean; className?: string }
export default function ProductArt({ category, style, tone, view = 0, bare, className = '' }: Props) {
  const id = useId().replace(/:/g, '');
  const m = `url(#m${id})`; const pearlFill = `url(#p${id})`;
  const [g1, g2] = GEM[style]; const [mh, , md] = METAL[tone];
  const gem = (x: number, y: number, r: number, c = g1, k?: string | number) => (
    <g key={k}><circle cx={x} cy={y} r={r} fill={c} stroke={md} strokeWidth={Math.max(r * 0.28, 0.8)} /><circle cx={x - r * 0.3} cy={y - r * 0.35} r={r * 0.32} fill="#fff" opacity=".7" /></g>
  );
  const pearl = (x: number, y: number, r: number, k?: string | number) => (
    <g key={k}><circle cx={x} cy={y} r={r} fill={pearlFill} stroke="#CDBFA9" strokeWidth=".6" /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.25} fill="#fff" opacity=".9" /></g>
  );
  const accent = (x: number, y: number, r: number, k?: string | number) => (style === 'pearl' ? pearl(x, y, r, k) : gem(x, y, r, g1, k));

  const drop = (x: number, y: number, s = 1) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -6 q-7 -12 0 -20" fill="none" stroke={m} strokeWidth="2.5" />
      <circle cx="0" cy="4" r="7" fill={m} />{gem(0, 4, 3.4, g2)}
      {style === 'minimal' ? <path d="M0 14 L7 40 L0 62 L-7 40Z" fill={m} />
        : <path d="M0 14 C-20 36 -17 66 0 86 C17 66 20 36 0 14Z" fill={m} />}
      {style !== 'minimal' && accent(0, 48, 10)}
      {style === 'oxidised' && [-10, 0, 10].map((dx, i) => <circle key={i} cx={dx} cy={92 + (i === 1 ? 6 : 0)} r="3" fill={m} />)}
      {style === 'pearl' && pearl(0, 96, 8)}
      {(style === 'kundan' || style === 'traditional') && [-12, 0, 12].map((dx, i) => <g key={i}>{pearl(dx, 96 + (i === 1 ? 7 : 0), 4.2, i)}</g>)}
      {style === 'american-diamond' && gem(0, 96, 5, g1)}
    </g>
  );
  const earrings = () => <>{drop(64, 62)}{drop(136, 62)}</>;

  const NP = [[30, 45], [38, 190], [162, 190], [170, 45]];
  const necklace = () => (
    <g>
      {style !== 'pearl' && <path d="M30 45 C38 190 162 190 170 45" fill="none" stroke={m} strokeWidth="2.6" />}
      {style === 'pearl' && pts(NP, 18).map(([x, y], i) => pearl(x, y, 6.6, i))}
      {style === 'minimal' && <path d="M40 45 C48 215 152 215 160 45" fill="none" stroke={m} strokeWidth="2" />}
      {(style === 'kundan' || style === 'traditional' || style === 'oxidised') && (
        <>
          <path d="M36 52 C44 205 156 205 164 52" fill="none" stroke={m} strokeWidth="2" />
          {pts(NP, 12).map(([x, y], i) => (i % 2 ? gem(x, y + 4, 4.4, i % 4 === 1 ? g1 : g2, i) : <circle key={i} cx={x} cy={y + 4} r="3.2" fill={m} />))}
        </>
      )}
      {style === 'american-diamond' && pts(NP, 14).map(([x, y], i) => gem(x, y, 3.4, g1, i))}
      <path d="M100 150 L116 172 L100 206 L84 172Z" fill={m} />{accent(100, 173, style === 'minimal' ? 6 : 11)}
      {(style === 'kundan' || style === 'traditional') && <>{pearl(88, 212, 4.5)}{pearl(100, 218, 4.5)}{pearl(112, 212, 4.5)}</>}
    </g>
  );

  const ring = () => (
    <g>
      <ellipse cx="100" cy="158" rx="50" ry="54" fill="none" stroke={m} strokeWidth="11" />
      <ellipse cx="100" cy="158" rx="50" ry="54" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".4" transform="translate(-2 -2)" />
      <path d="M78 98 L122 98 L113 112 L87 112Z" fill={m} />
      {style === 'pearl' ? pearl(100, 88, 20) : <>
        <polygon points="100,66 120,82 100,106 80,82" fill={g1} stroke={md} strokeWidth="2.5" />
        <polygon points="100,66 110,80 100,86 90,80" fill="#fff" opacity=".55" />
        {(style === 'kundan' || style === 'traditional') && <>{gem(72, 100, 6, g2)}{gem(128, 100, 6, g2)}</>}
        {style === 'american-diamond' && <>{gem(76, 104, 3.5)}{gem(124, 104, 3.5)}</>}
      </>}
    </g>
  );

  const bangle = () => (
    <g>
      {[0, 1, 2].map((i) => {
        const cy = 92 + i * 38; return (
          <g key={i}>
            <ellipse cx="100" cy={cy} rx="72" ry="26" fill="none" stroke={m} strokeWidth={style === 'minimal' ? 6 : 10} />
            {style !== 'minimal' && Array.from({ length: 9 }, (_, k) => { const a = Math.PI / 2 + (k - 4) * 0.27; return accent(100 + 72 * Math.cos(a), cy + 26 * Math.sin(a), 3.6, `${i}-${k}`); })}
          </g>
        );
      })}
    </g>
  );

  const bracelet = () => (
    <g>
      <ellipse cx="100" cy="128" rx="74" ry="46" fill="none" stroke={m} strokeWidth={style === 'pearl' || style === 'american-diamond' ? 0 : 3.5} />
      {(style === 'pearl' || style === 'american-diamond') && Array.from({ length: 22 }, (_, k) => { const a = (k / 22) * Math.PI * 2; const x = 100 + 74 * Math.cos(a), y = 128 + 46 * Math.sin(a); return style === 'pearl' ? pearl(x, y, 6.4, k) : <g key={k}>{gem(x, y, 5.4, g1)}</g>; })}
      {style !== 'pearl' && style !== 'american-diamond' && [[-40, 166], [0, 176], [40, 166]].map(([dx, y], i) => (<g key={i}><path d={`M${100 + dx} ${y - 4} L${100 + dx} ${y + 8}`} stroke={m} strokeWidth="2" />{gem(100 + dx, y + 14, 6.5, i === 1 ? g1 : g2, i)}</g>))}
      <rect x="92" y="76" width="16" height="9" rx="3" fill={m} />
    </g>
  );

  const sets = () => (
    <g>
      <g transform="translate(20 -4) scale(.8)">{necklace()}</g>
      <g transform="translate(0 150) scale(.62)">{drop(70, 20)}{drop(130, 20)}</g>
    </g>
  );

  const MP = [[48, 30], [54, 172], [146, 172], [152, 30]];
  const mangalsutra = () => (
    <g>
      {[0, 7].map((o) => pts(MP.map(([x, y]) => [x + (o ? (x < 100 ? 8 : -8) : 0), y + o * 1.3]), 26).map(([x, y], i) => (
        <circle key={`${o}-${i}`} cx={x} cy={y} r={o ? 3.3 : 3.8} fill={i % 6 === 3 ? m : '#17120F'} />
      )))}
      <path d="M100 140 L100 158" stroke={m} strokeWidth="3" />
      <path d="M100 156 C78 172 82 204 100 224 C118 204 122 172 100 156Z" fill={m} />
      {style === 'american-diamond' ? <>{gem(100, 184, 10)}{gem(100, 207, 5)}</> : <>{gem(100, 186, 10, style === 'minimal' ? g2 : g1)}</>}
    </g>
  );

  const art = { earrings, necklaces: necklace, rings: ring, bangles: bangle, bracelets: bracelet, sets, mangalsutra }[category]();
  const tf = [
    '', 'translate(200 0) scale(-1 1) translate(100 125) scale(.94) translate(-100 -125)',
    'translate(100 110) scale(1.7) translate(-100 -118)', 'translate(100 125) scale(1.04) rotate(-4) translate(-100 -125)',
  ][view] ?? '';

  return (
    <svg viewBox="0 0 200 250" className={`h-full w-full ${className}`} role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`m${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={mh} /><stop offset=".5" stopColor={METAL[tone][1]} /><stop offset="1" stopColor={md} /></linearGradient>
        <radialGradient id={`p${id}`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fff" /><stop offset=".6" stopColor="#F4EBDD" /><stop offset="1" stopColor="#D9C9B0" /></radialGradient>
        <radialGradient id={`b${id}`} cx=".5" cy=".42" r=".7"><stop offset="0" stopColor="#fff" stopOpacity={view === 3 ? 0.12 : 0.55} /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      {!bare && <rect width="200" height="250" fill={BG[view] ?? BG[0]} />}
      {!bare && <rect width="200" height="250" fill={`url(#b${id})`} />}
      <g transform={tf}><ellipse cx="100" cy="238" rx="56" ry="4" fill="#000" opacity={bare ? 0 : 0.07} />{art}</g>
    </svg>
  );
}
