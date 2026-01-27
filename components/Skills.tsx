
import { Code2, Server, Terminal, Settings } from 'lucide-react';
import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const categories = [
    { name: 'Data Ingestion', icon: Code2, color: 'bg-[#D2122E]', textColor: 'text-white' },
    { name: 'Data Platforms', icon: Server, color: 'bg-[#0055BF]', textColor: 'text-white' },
    { name: 'Data Orchestration', icon: Terminal, color: 'bg-[#237841]', textColor: 'text-white' },
    { name: 'Data Tools', icon: Settings, color: 'bg-[#F7D117]', textColor: 'text-black' }
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-container">
      {categories.map((cat, idx) => (
        <div 
          key={cat.name} 
          className={`brick-card stagger-item ${cat.color} ${cat.textColor} p-8 flex flex-col justify-between h-[450px] studs shadow-[6px_6px_0px_black] hover:shadow-[10px_10px_0px_black] transition-all`}
          style={{ transitionDelay: `${idx * 0.1}s` }}
        >
          {/* Main content container shifted upwards with negative margin and tighter spacing */}
          <div className="space-y-4 -mt-2">
            <div className="flex justify-between items-start">
              <div className={`w-14 h-14 ${cat.textColor === 'text-white' ? 'bg-white/20 border-white/20' : 'bg-black/10 border-black/10'} border-4 rounded-lg flex items-center justify-center`}>
                <cat.icon size={28} />
              </div>
              {/* Unit label shifted up slightly by alignment */}
              <div className="brick-font text-xs opacity-40 uppercase tracking-widest pt-1">UNIT_{idx + 1}</div>
            </div>

            <div className="space-y-1">
              <h3 className="brick-font text-xl xl:text-2xl tracking-tighter uppercase leading-tight">{cat.name}</h3>
              <div className={`w-12 h-1 rounded-full ${cat.textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'}`}></div>
            </div>
            
            <div className="space-y-5">
              {SKILLS.filter(s => s.category === cat.name).map(skill => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex justify-between items-end font-black text-[10px] uppercase tracking-widest opacity-90">
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className={`h-5 ${cat.textColor === 'text-white' ? 'bg-black/20' : 'bg-black/10'} border-2 border-black/10 relative rounded-sm overflow-hidden`}>
                    <div 
                      className={`absolute inset-y-0 left-0 ${cat.textColor === 'text-white' ? 'bg-white' : 'bg-black'} build-up studs`}
                      style={{ '--final-width': `${skill.level}%` } as React.CSSProperties}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 flex items-center gap-2">
             {[...Array(6)].map((_, i) => (
               <div key={i} className={`w-3 h-3 ${cat.textColor === 'text-white' ? 'bg-black/10' : 'bg-white/30'} rounded-full`}></div>
             ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
