
import React, { useRef } from 'react';
import { PROJECTS } from '../constants';
import { Github, ExternalLink, Package, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const getPieceCount = (title: string, desc: string) => (title.length + desc.length) * 8;

  return (
    <div className="relative group/section">
      {/* Scroll Navigation Controls */}
      <div className="absolute -top-14 right-0 flex gap-3 z-30">
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 bg-red-600 border-[3px] border-black rounded-lg flex items-center justify-center text-white studs shadow-[0_3px_0px_#900a1c] hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
          aria-label="Scroll Left"
        >
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 bg-blue-600 border-[3px] border-black rounded-lg flex items-center justify-center text-white studs shadow-[0_3px_0px_#003a82] hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
          aria-label="Scroll Right"
        >
          <ChevronRight size={24} strokeWidth={3} />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-4 -mx-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {PROJECTS.map((project, idx) => (
          <div key={project.id} className="min-w-[260px] md:min-w-[320px] snap-center group relative flex flex-col reveal-snap">
            
            {/* Box Header (Set Info Bar) */}
            <div className="bg-white border-[3px] border-black border-b-0 p-1.5 flex justify-between items-center rounded-t-lg z-20 shadow-[2px_0px_0px_black]">
               <div className="flex gap-1 items-center">
                  <div className="bg-red-600 text-white px-1 py-0.5 brick-font text-[7px] rounded border border-black">
                    AGES 18+
                  </div>
                  <div className="brick-font text-[7px] text-black/40">
                    KIT_{idx + 501}
                  </div>
               </div>
               <div className="flex gap-0.5">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full border border-black/20"></div>
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full border border-black/20"></div>
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full border border-black/20"></div>
               </div>
            </div>

            {/* Main Set Box */}
            <div className="relative flex-1 bg-white border-[3px] border-black p-3 shadow-[4px_4px_0px_black] group-hover:shadow-[6px_6px_0px_#F7D117] transition-all flex flex-col z-10">
              
              {/* Box Art Area */}
              <div className="relative aspect-video bg-gray-100 border-2 border-black overflow-hidden studs-dark mb-3">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Product Overlays */}
                <div className="absolute inset-0 pointer-events-none p-2 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <div className="bg-red-600 text-white border-2 border-black px-1.5 py-0.5 brick-font text-[7px] shadow-[2px_2px_0px_black] -rotate-3">
                      COLLECTOR
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="bg-black/80 text-white px-1.5 py-0.5 border border-white/20 backdrop-blur-sm flex flex-col items-center">
                      <span className="brick-font text-[6px] uppercase opacity-60 leading-none">Pcs</span>
                      <span className="brick-font text-xs leading-none">{getPieceCount(project.title, project.description)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Set Info Panel */}
              <div className="flex-1 flex flex-col">
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-gray-100 text-black/60 brick-font text-[6px] uppercase border border-black/10">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && <span className="text-[6px] font-bold text-black/30">+{project.tags.length - 3}</span>}
                </div>

                <h3 className="brick-font text-lg leading-tight uppercase text-black mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-[10px] font-bold uppercase tracking-tight leading-snug text-black/50 line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Footer Buttons */}
                <div className="mt-auto flex gap-2">
                  <a 
                    href={project.github} 
                    className="flex-1 bg-black text-white p-2 border-[2px] border-black brick-font text-[8px] flex items-center justify-center gap-1.5 hover:bg-red-600 transition-colors studs"
                  >
                    <Github size={12} /> REPO_SYNC
                  </a>
                  <a 
                    href={project.link} 
                    className="w-10 h-10 bg-yellow-400 border-[2px] border-black flex items-center justify-center hover:bg-white transition-all shadow-[2px_2px_0px_black] active:shadow-none"
                  >
                    <ExternalLink size={20} className="text-black" />
                  </a>
                </div>
              </div>

              {/* Decorative Corner Studs */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-red-600 border-2 border-black rounded-full z-30"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-600 border-2 border-black rounded-full z-30"></div>
            </div>

            {/* Warning Label */}
            <div className="mt-2 px-1 flex items-center gap-1.5 opacity-20 group-hover:opacity-100 transition-opacity">
               <Zap size={8} className="text-yellow-500" />
               <span className="brick-font text-[6px] uppercase tracking-widest text-black">Instruction valid. Logic assembly: 100% stable.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Extended Inventory Link */}
      <div className="flex flex-col items-center mt-2 reveal">
        <button className="flex items-center gap-2 bg-white border-[3px] border-black px-6 py-2 brick-font text-xs uppercase shadow-[0_4px_0px_black] hover:translate-y-1 hover:shadow-[0_2px_0px_black] transition-all group">
           <Package size={16} className="text-green-600 group-hover:rotate-12 transition-transform" />
           FULL_INVENTORY_SYNC
        </button>
      </div>
    </div>
  );
};

export default Projects;
