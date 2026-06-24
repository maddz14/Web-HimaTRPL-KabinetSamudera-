import "./TopMarquee.css";

const ITEMS = [
  "⚓ KABINET SAMUDERA",
  "✦ BERLAYAR BERSAMA",
  "🚀 MENUJU INOVASI",
  "⭐ IKUTI KAMI!",
  "⚓ HIMAPRODI TRPL",
  "🎓 POLITEKNIK CWE",
];

export function TopMarquee() {
  // Duplicate 2x for seamless loop with translateX(-50%)
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="running-text-wrapper" data-testid="top-marquee">
      <div className="running-text-track">
        {doubled.map((text, i) => (
          <span key={i}>{text}</span>
        ))}
      </div>
    </div>
  );
}
