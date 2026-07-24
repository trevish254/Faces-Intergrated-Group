import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden mb-[-25px] flex flex-col justify-end pb-12 md:pb-16 px-4">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260711_090308_1dd0cea7-f9ba-4db4-8147-c7d746061c9e.mp4"
      />
      
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center animate-fade-in-down">
        {/* Heading */}
        <h1 className="text-center text-white tracking-tight leading-[1.1] text-5xl sm:text-7xl md:text-8xl lg:text-[96px] font-normal mb-6">
          <span className="block">Own your time</span>
          <span className="block">
            without <em className="not-italic" style={{ fontFamily: "'Instrument Serif', serif", fontStyle: 'italic' }}>the stress</em>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/80 text-sm md:text-base font-medium max-w-[420px] text-center mb-10">
          Drift is a calm, ADHD-friendly planner that turns scattered ideas into a clear path
        </p>

        {/* CTA Bar */}
        <div className="bg-black/25 backdrop-blur-md rounded-xl flex flex-row items-center pl-4 md:pl-6 pr-1 py-1 gap-4">
          <span className="text-white font-medium text-sm hidden sm:block">
            <span className="hidden md:inline">No noise. No complicated systems. Just your day, gently sorted.</span>
            <span className="md:hidden">No noise. Just your day, gently sorted.</span>
          </span>
          <span className="text-white font-medium text-sm sm:hidden">
            No noise. Just your day, gently sorted.
          </span>
          <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors shrink-0">
            Start for free
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
