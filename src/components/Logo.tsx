import React from 'react';

export const DEFAULT_LOGO_URL = "/Rise_and_Connect_Community_Logo.png";


interface LogoProps {
  companyName: string;
  logoUrl?: string;
  variant?: 'compact' | 'full';
}

// The supplied artwork is purple on a solid white square. On our dark surfaces we invert it
// to a white mark and use screen blending so the (now black) background drops out entirely —
// leaving a transparent-background logo without needing a separate asset.
const knockoutStyle: React.CSSProperties = {
  filter: 'grayscale(1) invert(1) contrast(1.6) brightness(1.15)',
  mixBlendMode: 'screen'
};

export function Logo({ companyName, logoUrl, variant = 'compact' }: LogoProps) {
  const src = logoUrl || DEFAULT_LOGO_URL;

  if (variant === 'full') {
    return <span className="flex items-center gap-3">
      <img src={src} alt="" aria-hidden="true" style={knockoutStyle} className="-ml-3 h-24 w-24 shrink-0 object-contain" />
      <span className="font-display text-2xl font-extrabold tracking-tight text-white">{companyName}</span>
    </span>;
  }

  return (
    <span className="flex items-center gap-2">
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={knockoutStyle}
        className="h-14 w-14 shrink-0 scale-125 object-contain" />
      
      <span className="font-display text-lg font-extrabold tracking-tight text-white">{companyName}</span>
    </span>);

}
