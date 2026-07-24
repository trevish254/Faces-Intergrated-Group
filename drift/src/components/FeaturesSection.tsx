import React, { useEffect, useState, useRef } from 'react';

const features = [
  {
    id: 'feature-1',
    title: 'Built for ease, not urgency',
    description: 'Drift strips away the noise that makes organizing feel draining. Every surface is made to be soft, quiet, and intuitive so you can move forward, not get stuck decoding.',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_102608_5fa1187d-9ac6-44fb-82ab-54376200abc0.mp4'
  },
  {
    id: 'feature-2',
    title: 'The gentlest way to start',
    description: 'Beginning your day should feel natural, not daunting. Drift eases you into motion with subtle cues and a quiet view of what deserves your energy right now.',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260625_174131_395bc785-bb21-4e65-abf6-27c56f0764b6.mp4'
  },
  {
    id: 'feature-3',
    title: 'Deep, undivided focus',
    description: 'No interruptions, no clutter. Drift holds you in the present task with a stripped-back layout that softens all else until you are truly ready to shift.',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4'
  }
];

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none" className="mb-6">
    <path d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" fill="rgba(255,255,255,0.8)" />
  </svg>
);

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Observer for active state
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveFeature(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observer for reveal animation
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) {
        activeObserver.observe(ref);
        revealObserver.observe(ref);
      }
    });

    return () => {
      activeObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const scrollToFeature = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="features" className="relative px-5 md:px-10 lg:px-16 py-20 md:py-40 lg:py-48">
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 w-full h-full object-cover -z-10 bg-center bg-cover"
        style={{ backgroundImage: `url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260709_082449_46df5cc4-ad98-4541-9236-a2659c1478a4.png&w=1920&q=85')` }}
      ></div>

      <div className="lg:grid lg:grid-cols-[400px_1fr] xl:grid-cols-[460px_1fr] gap-24 xl:gap-48 relative">
        
        {/* Left Column - Sticky */}
        <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-32 mb-16 lg:mb-0">
          <div>
            <h2 className="text-white text-2xl sm:text-3xl lg:text-[46px] leading-[1.2] font-normal mb-12">
              Software that flows with your mind, not over it
            </h2>
            
            {/* Feature Nav (Desktop) */}
            <div className="hidden lg:flex flex-col items-start gap-4">
              {features.map(feature => (
                <button
                  key={`nav-${feature.id}`}
                  onClick={() => scrollToFeature(feature.id)}
                  className={`text-left px-6 py-4 rounded-2xl transition-all duration-300 font-medium text-lg ${
                    activeFeature === feature.id 
                      ? 'bg-black/20 text-white shadow-sm' 
                      : 'text-white/40 hover:text-white/70 hover:bg-black/10'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom CTA (Desktop) */}
          <div className="hidden lg:flex flex-col items-start gap-6 mt-12">
            <p className="text-white/80 font-medium max-w-xs">
              No noise. No complicated systems. Just your day, gently sorted.
            </p>
            <button className="bg-white text-black text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors">
              Start for free
            </button>
          </div>
        </div>

        {/* Right Column - Scrolling Cards */}
        <div className="flex flex-col gap-16 lg:gap-32 pb-32">
          {features.map((feature, index) => {
            const isRevealed = revealed[feature.id];
            
            return (
              <div 
                key={feature.id}
                id={feature.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className={`bg-black/20 backdrop-blur-sm rounded-3xl p-6 md:p-10 transition-all duration-700 ease-out transform ${
                  isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
                }`}
              >
                <LogoSVG />
                <h3 className="text-white text-xl md:text-2xl font-medium mb-6">{feature.title}</h3>
                <video 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full aspect-video rounded-2xl overflow-hidden bg-black/30 mb-6 object-cover"
                  src={feature.video}
                />
                <p className="text-white/60 font-medium text-sm md:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
