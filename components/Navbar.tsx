
import React, { useState, useEffect } from 'react';
import { Menu, Plus, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#hero', color: 'bg-[#0055BF]' },
    { name: 'About', href: '#about', color: 'bg-[#D2122E]' },
    { name: 'Skills', href: '#skills', color: 'bg-[#F7D117]', text: 'text-black' },
    { name: 'Projects', href: '#projects', color: 'bg-[#237841]' },
    { name: 'Experience', href: '#experience', color: 'bg-[#009EE0]' },
    { name: 'Blog', href: '#blog', color: 'bg-[#E35500]' },
    { name: 'Contact', href: '#contact', color: 'bg-[#D2122E]' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'pt-0' : 'pt-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between bg-white border-4 border-black rounded-xl overflow-hidden shadow-[0_6px_0px_rgba(0,0,0,1)]`}>
          <div className="flex items-center gap-2 p-4 bg-[#D2122E] text-white border-r-4 border-black studs shrink-0">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-red-600">
               <Plus size={20} strokeWidth={4} />
            </div>
            <span className="brick-font text-2xl tracking-tighter hidden sm:inline">BUILDER.</span>
          </div>

          <div className="hidden lg:flex flex-1 items-stretch">
            {menuItems.map(item => (
              <a 
                key={item.name} 
                href={item.href} 
                className={`flex-1 flex items-center justify-center py-4 px-2 brick-font text-[10px] xl:text-xs uppercase tracking-widest border-r-4 border-black last:border-r-0 transition-all hover:translate-y-1 ${item.color} ${item.text || 'text-white'} studs shadow-inner`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="lg:hidden p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 bg-white border-4 border-black rounded-xl overflow-hidden shadow-[0_6px_0px_rgba(0,0,0,1)] flex flex-col">
            {menuItems.map(item => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsMenuOpen(false)}
                className={`p-4 brick-font text-sm uppercase tracking-widest border-b-4 border-black last:border-b-0 ${item.color} ${item.text || 'text-white'} studs`}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
