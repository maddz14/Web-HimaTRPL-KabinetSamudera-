export function WaveDivider({ flip = false, className = "" }) {
  return (
    <div
      className={`w-full pointer-events-none ${className}`}
      data-testid="wave-divider"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[100px]"
      >
        <path
          d="M0,64L60,58.7C120,53,240,43,360,53.3C480,64,600,96,720,96C840,96,960,64,1080,53.3C1200,43,1320,53,1380,58.7L1440,64L1440,120L0,120Z"
          fill="rgba(10,147,150,0.12)"
        />
        <path
          d="M0,80L60,74.7C120,69,240,59,360,69.3C480,80,600,112,720,112C840,112,960,80,1080,69.3C1200,59,1320,69,1380,74.7L1440,80L1440,120L0,120Z"
          fill="rgba(0,95,115,0.6)"
        />
        <path
          d="M0,96L60,90.7C120,85,240,75,360,85.3C480,96,600,120,720,120C840,120,960,96,1080,85.3C1200,75,1320,85,1380,90.7L1440,96L1440,120L0,120Z"
          fill="#001219"
        />
      </svg>
    </div>
  );
}
