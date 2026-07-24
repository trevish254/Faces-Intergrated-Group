import React from 'react';
import { Mail, Plus } from 'lucide-react';

const LogoSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none">
    <path d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z" fill="#321C04" />
  </svg>
);

const AboutSection: React.FC = () => {
  return (
    <section className="bg-[#F6E4CF] relative z-10 rounded-t-[25px] py-20 md:py-32 px-6">
      {/* Top Area */}
      <div className="max-w-3xl mx-auto flex flex-col items-center mb-24">
        <p className="text-[#321C04] text-base md:text-lg text-center leading-relaxed max-w-lg mb-8 font-medium">
          We craft tools that move with your rhythm, not over it. Designed for ease, presence, and flow.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-[#321C04] text-[#FFF9F2] rounded-full flex items-center pr-6 pl-2 py-2 gap-3 hover:bg-[#1F1003] transition-colors uppercase tracking-wide font-medium text-sm">
            <span className="bg-white rounded-full p-2 flex items-center justify-center">
              <Mail className="w-4 h-4 text-[#321C04]" />
            </span>
            Say hello
          </button>
          <button className="bg-[#D9C4AA] text-[#321C04] rounded-full flex items-center pr-6 pl-2 py-2 gap-3 hover:bg-[#CEBA9E] transition-colors uppercase tracking-wide font-medium text-sm">
            <span className="bg-white rounded-full p-2 flex items-center justify-center">
              <Plus className="w-4 h-4 text-[#321C04]" />
            </span>
            Stay informed
          </button>
        </div>
      </div>

      {/* Decorative Divider */}
      <div className="w-full flex items-center justify-center mb-24 max-w-6xl mx-auto">
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]"></div>
        <div className="flex-1 h-[2px] bg-[#D9C4AA] mx-2"></div>
        <div className="w-2 h-2 rounded-full bg-[#D9C4AA]"></div>
      </div>

      {/* Bottom Area */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left */}
        <div className="flex flex-col gap-4 shrink-0">
          <LogoSVG />
          <span className="text-xs uppercase tracking-widest font-semibold text-[#321C04]">
            Calm <br /> Amplified
          </span>
        </div>
        
        {/* Right */}
        <div>
          <p className="text-[#321C04] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.3] font-normal">
            We make AI tools and assistants. But, most importantly, we help you remember what gentle productivity looks like when software moves with you, not over you. We create systems that carry the cognitive weight, so you can attend to what truly counts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
