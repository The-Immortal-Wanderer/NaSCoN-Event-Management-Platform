import React from "react";

// Example logo SVG (replace with your actual logo)
function NasconLogo() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="#FFC72C" />
      <path d="M32 12 L52 52 L12 52 Z" fill="#4E2A84" />
    </svg>
  );
}

function HeroSection() {
  return (
    <header className="w-full max-w-5xl mx-auto px-4 pt-12 pb-8 text-center">
      <div className="flex justify-center mb-4">
        <NasconLogo />
      </div>
      <h1 className="text-4xl md:text-6xl font-fraunces font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 drop-shadow-glow">
        NaSCon Event Platform
      </h1>
      <p className="mt-4 text-lg md:text-2xl font-inter text-gray-800 max-w-2xl mx-auto">
        <span className="font-semibold text-amber-600">Digital Elegance</span> meets <span className="font-semibold text-teal-700">Cultural Roots</span>.<br />
        Experience a platform that celebrates innovation and tradition.
      </p>
    </header>
  );
}

function ColorPalette() {
  const colors = [
    { name: "Deep Purple", hex: "#4E2A84" },
    { name: "Gold/Amber", hex: "#FFC72C" },
    { name: "Teal", hex: "#009688" },
    { name: "Coral", hex: "#FF7F50" },
    { name: "Off-white", hex: "#FAF9F6" },
    { name: "Success", hex: "#2E7D32" },
    { name: "Info", hex: "#0288D1" },
    { name: "Warning", hex: "#FF9800" },
    { name: "Error", hex: "#C62828" },
  ];
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-fraunces font-bold text-purple-900 mb-4">Color System</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colors.map((c) => (
          <div key={c.hex} className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border-2 border-white shadow" style={{ background: c.hex }} />
            <span className="mt-2 text-sm font-inter text-gray-800">{c.name}</span>
            <span className="text-xs font-ibm-mono text-gray-500">{c.hex}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-fraunces font-bold text-purple-900 mb-4">Typography</h2>
      <div className="space-y-4">
        <div>
          <span className="font-fraunces text-3xl text-purple-900">Fraunces Headline</span>
          <span className="ml-2 text-sm font-ibm-mono text-gray-500">"Fraunces"</span>
        </div>
        <div>
          <span className="font-inter text-lg text-gray-800">Inter body text for maximum readability and clarity.</span>
          <span className="ml-2 text-sm font-ibm-mono text-gray-500">"Inter"</span>
        </div>
        <div>
          <span className="font-ibm-mono text-base text-teal-700">IBM Plex Mono for technical accents and data.</span>
          <span className="ml-2 text-sm font-ibm-mono text-gray-500">"IBM Plex Mono"</span>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2 text-purple-900">Responsive Modular Scale</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-ibm-mono text-gray-700">
          <div><span className="font-bold">xs</span>: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)</div>
          <div><span className="font-bold">sm</span>: clamp(0.875rem, 0.8rem + 0.375vw, 1rem)</div>
          <div><span className="font-bold">base</span>: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)</div>
          <div><span className="font-bold">md</span>: clamp(1.125rem, 1rem + 0.625vw, 1.25rem)</div>
          <div><span className="font-bold">lg</span>: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)</div>
          <div><span className="font-bold">xl</span>: clamp(1.5rem, 1.3rem + 1vw, 2rem)</div>
          <div><span className="font-bold">2xl</span>: clamp(1.875rem, 1.6rem + 1.375vw, 2.5rem)</div>
          <div><span className="font-bold">3xl</span>: clamp(2.25rem, 1.9rem + 1.75vw, 3rem)</div>
          <div><span className="font-bold">4xl</span>: clamp(2.75rem, 2.3rem + 2.25vw, 3.75rem)</div>
        </div>
      </div>
    </section>
  );
}

function CardSystemSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-fraunces font-bold text-purple-900 mb-4">Card System</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl shadow p-6">
          <h3 className="font-fraunces text-lg text-purple-900 mb-2">Ambient Card</h3>
          <p className="font-inter text-gray-700 text-sm">Minimal styling, subtle background for informational content.</p>
        </div>
        <div className="bg-white/60 backdrop-blur-lg border-2 border-amber-200 rounded-xl shadow-lg p-6 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 to-teal-300 rounded-t-xl opacity-60" />
          <h3 className="font-fraunces text-lg text-purple-900 mb-2">Feature Card</h3>
          <p className="font-inter text-gray-700 text-sm">Medium prominence with distinguishing visual elements.</p>
        </div>
        <div className="bg-gradient-to-br from-amber-200 via-white to-teal-100 border-2 border-purple-300 rounded-xl shadow-2xl p-6 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-amber-200 rounded-full blur-2xl opacity-40" />
          <h3 className="font-fraunces text-lg text-purple-900 mb-2">Hero Card</h3>
          <p className="font-inter text-gray-700 text-sm">Maximum visual impact with custom illustrations, animations, and interactions.</p>
        </div>
      </div>
    </section>
  );
}

function ButtonSystemSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-fraunces font-bold text-purple-900 mb-4">Button Hierarchy</h2>
      <div className="flex flex-wrap gap-4 items-end">
        <button className="bg-gradient-to-r from-purple-900 to-amber-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition-all animate-pulse">
          Primary Action
        </button>
        <button className="border-2 border-purple-900 text-purple-900 font-bold px-6 py-2 rounded-lg hover:bg-purple-900 hover:text-white transition-all">
          Secondary Action
        </button>
        <button className="bg-transparent text-purple-900 underline font-bold px-4 py-2 rounded hover:text-amber-400 transition-all">
          Tertiary Action
        </button>
        <button className="bg-white text-purple-900 p-2 rounded-full shadow hover:bg-amber-200 transition-all" title="Info">
          <span className="font-ibm-mono text-lg">i</span>
        </button>
      </div>
    </section>
  );
}

function SpacingSystemSection() {
  const spaces = [
    { name: "3xs", px: 4 },
    { name: "2xs", px: 8 },
    { name: "xs", px: 12 },
    { name: "sm", px: 16 },
    { name: "md", px: 24 },
    { name: "lg", px: 32 },
    { name: "xl", px: 48 },
    { name: "2xl", px: 64 },
    { name: "3xl", px: 96 },
    { name: "4xl", px: 128 },
  ];
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-fraunces font-bold text-purple-900 mb-4">Spacing Scale</h2>
      <div className="flex flex-wrap gap-4 items-end">
        {spaces.map((s) => (
          <div key={s.name} className="flex flex-col items-center">
            <div className="bg-amber-300 rounded" style={{ width: `${s.px}px`, height: "16px" }} />
            <span className="mt-1 text-xs font-ibm-mono text-gray-700">{s.name} ({s.px}px)</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF9F6] via-[#FFC72C]/10 to-[#4E2A84]/10 font-inter">
      <HeroSection />
      <ColorPalette />
      <TypographySection />
      <SpacingSystemSection />
      <CardSystemSection />
      <ButtonSystemSection />
      <footer className="mt-12 mb-4 text-center text-purple-900 text-sm opacity-70 font-ibm-mono">
        &copy; {new Date().getFullYear()} NaSCon Event Platform &mdash; Digital Elegance with Cultural Roots
      </footer>
    </div>
  );
}

export default App;