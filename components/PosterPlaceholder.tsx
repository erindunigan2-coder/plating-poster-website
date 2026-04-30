// Glass-effect poster placeholder — mimics the dark edition design system aesthetic
// Used for all posters that don't yet have final artwork

type Props = {
  categoryTitle: string;
  processTitle: string;
  posterTitle: string;
  accentColor?: string;
  isMainSummary?: boolean;
};

export default function PosterPlaceholder({
  categoryTitle,
  processTitle,
  posterTitle,
  accentColor = "#E8A020",
  isMainSummary = false,
}: Props) {
  const bg = "#1A1F2E";
  const navy = "#0D1020";

  return (
    <svg
      viewBox="0 0 300 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ display: "block" }}
    >
      <defs>
        {/* Ambient orbs */}
        <radialGradient id={`orb1-${posterTitle}`} cx="20%" cy="10%" r="60%">
          <stop offset="0%" stopColor="#2EC4B6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2EC4B6" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`orb2-${posterTitle}`} cx="85%" cy="30%" r="55%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`orb3-${posterTitle}`} cx="50%" cy="85%" r="55%">
          <stop offset="0%" stopColor="#E05C5C" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#E05C5C" stopOpacity="0" />
        </radialGradient>
        {/* Radial mask for grid */}
        <radialGradient id={`gridmask-${posterTitle}`} cx="50%" cy="50%" r="50%">
          <stop offset="30%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`gridmaskm-${posterTitle}`}>
          <rect width="300" height="400" fill={`url(#gridmask-${posterTitle})`} />
        </mask>
        {/* Glass card gradient */}
        <linearGradient id={`glass-${posterTitle}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
        {/* Accent gradient for PP mark */}
        <linearGradient id={`ppmark-${posterTitle}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accentColor} />
          <stop offset="100%" stopColor="#2EC4B6" />
        </linearGradient>
      </defs>

      {/* Base background */}
      <rect width="300" height="400" fill={bg} />

      {/* Ambient orbs */}
      <rect width="300" height="400" fill={`url(#orb1-${posterTitle})`} />
      <rect width="300" height="400" fill={`url(#orb2-${posterTitle})`} />
      <rect width="300" height="400" fill={`url(#orb3-${posterTitle})`} />

      {/* Industrial grid */}
      <g mask={`url(#gridmaskm-${posterTitle})`} opacity="0.06">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 23} y1="0" x2={i * 23} y2="400" stroke="#F0EDE8" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 19 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 23} x2="300" y2={i * 23} stroke="#F0EDE8" strokeWidth="0.5" />
        ))}
      </g>

      {/* Accent top bar */}
      <rect x="16" y="16" width="36" height="3" rx="1.5" fill={accentColor} />

      {/* Eyebrow — category */}
      <text
        x="16"
        y="38"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="7"
        fill={accentColor}
        letterSpacing="1.5"
      >
        {categoryTitle.toUpperCase()}
      </text>

      {/* Main glass card */}
      <rect
        x="14"
        y="50"
        width="272"
        height="240"
        rx="10"
        fill="rgba(30,36,53,0.70)"
      />
      <rect
        x="14"
        y="50"
        width="272"
        height="240"
        rx="10"
        fill={`url(#glass-${posterTitle})`}
        stroke="rgba(255,255,255,0.09)"
        strokeWidth="1"
      />
      {/* Top highlight line */}
      <line x1="24" y1="51" x2="276" y2="51" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* Accent left edge strip */}
      <rect x="14" y="50" width="4" height="240" rx="2" fill={accentColor} opacity="0.7" />

      {/* Process title */}
      <text
        x="30"
        y="82"
        fontFamily="'Barlow Condensed', 'Barlow', sans-serif"
        fontSize="9"
        fontWeight="700"
        fill="#9098A8"
        letterSpacing="0.5"
      >
        {processTitle.toUpperCase()}
      </text>

      {/* Poster title — big */}
      {/* Poster title rendered as SVG text lines */}
      {posterTitle.split(" — ").map((part, pi) => (
        <text
          key={pi}
          x="22"
          y={108 + pi * 24}
          fontFamily="'Barlow Condensed', 'Barlow', sans-serif"
          fontSize="18"
          fontWeight="900"
          fill="#F0EDE8"
          letterSpacing="0.5"
        >
          {part.length > 18 ? part.slice(0, 18) + "…" : part}
        </text>
      ))}

      {/* Main summary badge */}
      {isMainSummary && (
        <g>
          <rect x="22" y="205" width="90" height="14" rx="7" fill={accentColor} opacity="0.18" stroke={accentColor} strokeOpacity="0.4" strokeWidth="0.8" />
          <text x="67" y="215.5" fontFamily="'Barlow Condensed', sans-serif" fontSize="7" fontWeight="700" fill={accentColor} textAnchor="middle" letterSpacing="0.8">
            MAIN SUMMARY
          </text>
        </g>
      )}

      {/* Coming soon label */}
      <g>
        <rect x="22" y={isMainSummary ? "223" : "210"} width="80" height="14" rx="7" fill="rgba(46,196,182,0.10)" stroke="rgba(46,196,182,0.25)" strokeWidth="0.8" />
        <text x="62" y={isMainSummary ? "233.5" : "220.5"} fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#2EC4B6" textAnchor="middle" letterSpacing="1">
          COMING SOON
        </text>
      </g>

      {/* Divider */}
      <line x1="22" y1="302" x2="278" y2="302" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Size options row */}
      <text x="16" y="320" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#6B7080" letterSpacing="0.5">
        18×24
      </text>
      <text x="70" y="320" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#6B7080" letterSpacing="0.5">
        24×36
      </text>
      <text x="124" y="320" fontFamily="'JetBrains Mono', monospace" fontSize="6.5" fill="#6B7080" letterSpacing="0.5">
        36×48
      </text>
      <text x="16" y="332" fontFamily="'JetBrains Mono', monospace" fontSize="6" fill="#3A4055" letterSpacing="0.5">
        EN  ·  ES  ·  DARK  ·  LIGHT
      </text>

      {/* Footer */}
      <rect x="0" y="356" width="300" height="44" fill={navy} />
      <line x1="0" y1="356" x2="300" y2="356" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* PP mark */}
      <rect x="16" y="366" width="20" height="20" rx="3" fill={`url(#ppmark-${posterTitle})`} />
      <text x="26" y="380" fontFamily="'Barlow Condensed', sans-serif" fontSize="9" fontWeight="900" fill="#0D1020" textAnchor="middle">
        PP
      </text>

      {/* Brand name in footer */}
      <text x="42" y="373" fontFamily="'Barlow Condensed', sans-serif" fontSize="8" fontWeight="800" fill="#F0EDE8" letterSpacing="1">
        PLATING POSTERS INC
      </text>
      <text x="42" y="383" fontFamily="'JetBrains Mono', monospace" fontSize="5.5" fill="#3A4055" letterSpacing="0.5">
        METAL FINISHING REFERENCE SERIES
      </text>
    </svg>
  );
}
