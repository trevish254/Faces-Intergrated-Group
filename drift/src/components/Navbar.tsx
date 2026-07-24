import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
      {/* Floating Pill */}
      <div className="bg-white rounded-full shadow-lg flex items-center justify-between px-6 py-3 w-64 md:w-80">
        <span className="text-lg font-bold tracking-tight text-black">Drift.</span>
        
        {/* Animated Hamburger */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="relative w-6 h-6 flex flex-col justify-center items-center group focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-[2px] bg-black transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]" style={{ transform: isOpen ? 'rotate(45deg) translate(2px, 2px)' : 'translateY(-3px)' }} />
          <div className="w-5 h-[2px] bg-black transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]" style={{ transform: isOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'translateY(3px)' }} />
        </button>
      </div>

      {/* Dropdown Menu */}
      <div 
        className={`mt-4 bg-white rounded-2xl shadow-xl w-64 md:w-80 overflow-hidden transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
        }`}
      >
        <ul className="flex flex-col py-2">
          {['Features', 'Drift AI', 'FAQ'].map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(' ', '-')}`} className="block px-6 py-3 text-sm font-medium text-black hover:bg-gray-50 transition-colors">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
