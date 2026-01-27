
import React, { useEffect, useState } from 'react';
import { ArrowDownCircle, Boxes, Hammer } from 'lucide-react';

const Hero: React.FC = () => {
  const [hasAssembled, setHasAssembled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasAssembled(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-8 space-y-10 z-10">
          <div className="flex items-center gap-4 reveal-left">
            <div className="bg-[#F7D117] border-4 border-black p-3 rounded-lg studs-dark shadow-[4px_4px_0px_#000] hover:rotate-12 transition-transform cursor-pointer">
               <Hammer size={24} className="text-black" />
            </div>
            <span className="brick-font text-blue-600 text-xl tracking-wider uppercase">Instruction No. 001</span>
          </div>

          <div className="relative">
            <h1 className="brick-font text-[10vw] lg:text-[7vw] leading-none text-black select-none drop-shadow-[6px_6px_0px_#D2122E]">
              <span className="block animate-word-drop" style={{ animationDelay: '0.2s' }}>BLOCKS</span>
              <span className="block animate-word-drop" style={{ animationDelay: '0.4s' }}>
                OF <span className="text-blue-600">LOGIC</span>
              </span>
              <span 
                className={`inline-block bg-[#237841] text-white px-4 rounded-xl studs shadow-[0_8px_0px_#17522b] mt-4 ${hasAssembled ? 'animate-jitter' : ''} animate-word-drop`} 
                style={{ animationDelay: '0.6s' }}
              >
                IN CODE.
              </span>
            </h1>
          </div>

          <div className="max-w-xl space-y-8 reveal">
            <p className="text-xl md:text-2xl font-bold uppercase tracking-tight leading-relaxed text-black/80 bg-white/60 p-6 border-l-8 border-yellow-400 backdrop-blur-sm">
              I am a <span className="text-red-600">Data Engineer</span> who designs and builds scalable, high-performance data pipelines using reliable, production-grade technologies.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={() => scrollToSection('contact')}
                className="btn-brick bg-red-600 text-white group"
              >
                START BUILDING <Boxes size={24} className="group-hover:scale-125 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="btn-brick bg-white text-black border-black hover:bg-gray-100"
              >
                VIEW MORE <ArrowDownCircle size={24} className="animate-bounce" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 relative hidden lg:block">
          {/* Animated Assembly Blocks */}
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`h-40 bg-[#D2122E] border-4 border-black rounded-xl studs shadow-[0_8px_0px_#900a1c] hover:scale-110 hover:-rotate-3 transition-all cursor-grab active:cursor-grabbing ${hasAssembled ? 'animate-brick-snap' : 'opacity-0'}`} 
              style={{ animationDelay: '0.8s' }}
            ></div>
            <div 
              className={`h-24 bg-[#F7D117] border-4 border-black rounded-xl studs-dark shadow-[0_8px_0px_#bfa111] mt-auto hover:scale-110 hover:rotate-3 transition-all cursor-grab active:cursor-grabbing ${hasAssembled ? 'animate-brick-snap' : 'opacity-0'}`} 
              style={{ animationDelay: '1.0s' }}
            ></div>
            <div 
              className={`h-32 bg-[#0055BF] border-4 border-black rounded-xl studs shadow-[0_8px_0px_#003a82] hover:scale-110 hover:-rotate-6 transition-all cursor-grab active:cursor-grabbing ${hasAssembled ? 'animate-brick-snap' : 'opacity-0'}`} 
              style={{ animationDelay: '1.2s' }}
            ></div>
            <div 
              className={`h-48 bg-[#237841] border-4 border-black rounded-xl studs shadow-[0_8px_0px_#17522b] -mt-12 hover:scale-110 hover:rotate-6 transition-all cursor-grab active:cursor-grabbing ${hasAssembled ? 'animate-brick-snap' : 'opacity-0'}`} 
              style={{ animationDelay: '1.4s' }}
            ></div>
          </div>
          
          <div className="absolute -bottom-20 -right-10 brick-font text-black/5 text-[15vw] pointer-events-none uppercase rotate-90 select-none">
            ENGINEER
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
