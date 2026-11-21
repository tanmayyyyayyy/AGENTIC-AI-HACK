import React from 'react';

interface PivotLogoProps {
  size?: number;
  style?: React.CSSProperties;
}

export const PivotLogoMark: React.FC<PivotLogoProps> = ({ size = 30, style = {} }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: 'rotate(-6deg)',
      flexShrink: 0,
      filter: 'drop-shadow(0 0 8px rgba(216, 255, 104, 0.25))',
      ...style
    }}
    aria-hidden="true"
  >
    <rect
      x="1.5"
      y="1.5"
      width="29"
      height="29"
      rx="9"
      stroke="#d8ff68"
      strokeWidth="1.8"
      strokeOpacity="0.85"
      fill="rgba(216, 255, 104, 0.08)"
    />
    <rect x="7.5" y="15.5" width="3.5" height="9" rx="1.75" fill="#d8ff68" />
    <rect x="14.25" y="8" width="3.5" height="16.5" rx="1.75" fill="#d8ff68" />
    <rect x="21" y="12" width="3.5" height="12.5" rx="1.75" fill="#d8ff68" />
  </svg>
);

export default PivotLogoMark;
