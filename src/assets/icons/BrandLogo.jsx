export function BrandLogo({ size = 'md', showWordmark = true, lightText = false }) {
  const sizes = {
    sm: { icon: 'w-9 h-7', title: 'text-[11px]', sub: 'text-[9px]', divider: 'h-6' },
    md: { icon: 'w-11 h-8', title: 'text-xs', sub: 'text-[10px]', divider: 'h-7' },
    lg: { icon: 'w-20 h-14', title: 'text-lg', sub: 'text-xs', divider: 'h-12' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {/* RIC Roofline Emblem */}
      <svg
        viewBox="0 0 120 76"
        className={`${s.icon} shrink-0`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="R Interiors Corp Logo"
      >
        {/* Outer Roofline */}
        <path
          d="M12 31L60 8L108 31"
          stroke="#A71912"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner Roofline */}
        <path
          d="M26 32L60 16L94 32"
          stroke="#A71912"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* RIC Letters */}
        <text
          x="60"
          y="64"
          textAnchor="middle"
          fill={lightText ? '#FFFFFF' : '#737373'}
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="34"
          letterSpacing="-1.5"
        >
          RIC
        </text>
      </svg>

      {showWordmark && (
        <>
          <span
            className={`w-[1.5px] ${s.divider} ${
              lightText ? 'bg-white/30' : 'bg-[#A71912]/40'
            } rounded-full`}
          />
          <div className="flex flex-col leading-tight text-left">
            <span
              className={`${s.title} font-extrabold tracking-wide uppercase ${
                lightText ? 'text-white' : 'text-[#171717]'
              }`}
            >
              R. Interiors
            </span>
            <span
              className={`${s.sub} font-bold tracking-[0.18em] uppercase ${
                lightText ? 'text-white/80' : 'text-[#525252]'
              }`}
            >
              Corp
            </span>
          </div>
        </>
      )}
    </div>
  );
}
