function CompassRose() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="compassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#E8DCC4", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#C4B8A0", stopOpacity: 0.6 }} />
        </linearGradient>
      </defs>
      <polygon points="50,5 53,45 50,50 47,45" fill="url(#compassGradient)" />
      <polygon points="50,95 47,55 50,50 53,55" fill="url(#compassGradient)" opacity="0.8" />
      <polygon points="95,50 55,53 50,50 55,47" fill="url(#compassGradient)" opacity="0.8" />
      <polygon points="5,50 45,47 50,50 45,53" fill="url(#compassGradient)" opacity="0.8" />
      <polygon points="82,18 54,46 50,50 52,48" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="18,18 46,46 50,50 48,48" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="82,82 54,54 50,50 52,52" fill="url(#compassGradient)" opacity="0.5" />
      <polygon points="18,82 46,54 50,50 48,52" fill="url(#compassGradient)" opacity="0.5" />
      <circle cx="50" cy="50" r="4" fill="url(#compassGradient)" />
      <circle cx="50" cy="50" r="8" fill="none" stroke="url(#compassGradient)" strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

export function CompassDivider() {
  return (
    <div className="compass-divider">
      <CompassRose />
    </div>
  );
}
