
import React, { useState, useEffect } from 'react';
import { Loader2, Zap, PackageOpen, Download, HelpCircle, HardHat, RotateCcw, Box, Save, Trash2, LayoutGrid } from 'lucide-react';
import { getProjectRecommendation } from '../services/geminiService';
import { AIRecommendation } from '../types';

const AIProjectAdvisor: React.FC = () => {
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [savedBuilds, setSavedBuilds] = useState<AIRecommendation[]>([]);

  // Load saved builds from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('brick_saved_builds');
    if (saved) {
      try {
        setSavedBuilds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved builds", e);
      }
    }
  }, []);

  // Save builds to local storage when state changes
  useEffect(() => {
    localStorage.setItem('brick_saved_builds', JSON.stringify(savedBuilds));
  }, [savedBuilds]);

  const handleGenerate = async () => {
    if (!interest.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getProjectRecommendation(interest);
      setRecommendation(result);
    } catch (err) { 
      console.error(err);
      setError("Uplink failed. Check your piece connection.");
    } finally { 
      setLoading(false); 
    }
  };

  const handleSave = () => {
    if (recommendation && !savedBuilds.some(b => b.projectName === recommendation.projectName)) {
      setSavedBuilds([recommendation, ...savedBuilds]);
    }
  };

  const handleRemove = (name: string) => {
    setSavedBuilds(savedBuilds.filter(b => b.projectName !== name));
  };

  const handleReset = () => {
    setRecommendation(null);
    setInterest('');
    setError(null);
  };

  const pieceCount = (rec: AIRecommendation) => 
    (rec.projectName.length * rec.techStack.length * 7).toString();

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-red-600 border-8 border-black flex items-center justify-center text-white rounded-2xl studs shadow-[4px_4px_0px_black]">
                <HardHat size={32} />
              </div>
              <h2 className="brick-font text-3xl leading-none uppercase">MASTER_ <br/><span className="text-blue-600">INSTRUCT.</span></h2>
            </div>
            <p className="text-lg font-bold uppercase tracking-tight text-black/70">
              Define your building <span className="text-red-600 italic underline decoration-4 underline-offset-4">theme</span> to generate custom instructions.
            </p>
          </div>

          <div className="brick-card p-8 space-y-6 bg-white studs-dark">
            <div className="space-y-3">
               <label className="brick-font text-[10px] tracking-widest text-red-600">Theme Keywords</label>
               <input 
                  type="text"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  placeholder="e.g. medieval logistics"
                  className="w-full bg-gray-100 border-4 border-black p-5 brick-font text-base outline-none focus:bg-yellow-50 focus:border-blue-600 transition-all placeholder:text-black/10 uppercase"
                  disabled={loading}
                />
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading || !interest.trim()}
              className="btn-brick w-full py-6 text-xl bg-red-600 text-white group"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                <>
                  GENERATE SET 
                  <PackageOpen size={20} className="inline ml-3 group-hover:scale-125 transition-transform" fill="currentColor" />
                </>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-100 border-2 border-red-600 text-red-600 brick-font text-[10px] text-center uppercase animate-pulse">
                {error}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 brick-card p-10 min-h-[500px] flex flex-col relative overflow-hidden bg-white border-yellow-400 border-[10px] shadow-[12px_12px_0px_black] transition-all duration-500 hover:shadow-[20px_20px_0px_rgba(0,0,0,0.1)]">
          {!recommendation && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-20">
              <HelpCircle size={100} strokeWidth={1} className="animate-bounce" />
              <p className="brick-font text-2xl uppercase tracking-widest italic">Waiting for Input...</p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              <div className="flex gap-3">
                 <div className="w-8 h-8 bg-red-600 border-4 border-black animate-bounce"></div>
                 <div className="w-8 h-8 bg-blue-600 border-4 border-black animate-bounce delay-75"></div>
                 <div className="w-8 h-8 bg-yellow-400 border-4 border-black animate-bounce delay-150"></div>
              </div>
              <p className="brick-font text-xl uppercase tracking-widest animate-pulse">Assembling Parts...</p>
            </div>
          )}

          {recommendation && !loading && (
            <div className="relative z-10 space-y-8 animate-[slide-in-up_0.5s_ease-out] text-left h-full flex flex-col">
              <div className="flex justify-between items-start">
                <div className="space-y-3 border-l-8 border-red-600 pl-6">
                  <span className="brick-font text-[10px] text-blue-600 tracking-[0.4em] flex items-center gap-2">
                    <Zap size={12} fill="currentColor" /> MODEL_READY
                  </span>
                  <h3 className="brick-font text-4xl md:text-5xl leading-tight uppercase text-black">
                    {recommendation.projectName}
                  </h3>
                </div>
                <div className="bg-black text-white p-2 border-4 border-black studs flex flex-col items-center shrink-0">
                   <span className="brick-font text-[8px]">PIECES</span>
                   <span className="brick-font text-lg">{pieceCount(recommendation)}</span>
                </div>
              </div>
              
              <p className="text-xl font-black uppercase tracking-tight leading-relaxed text-black/70 italic border-y-4 border-black/5 py-4">
                "{recommendation.description}"
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                 <div className="space-y-3">
                    <p className="brick-font text-[10px] text-red-600 tracking-widest flex items-center gap-2">
                      <Box size={12} /> COMPONENT LIST
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                       {recommendation.techStack.map(t => (
                         <span key={t} className="px-2.5 py-0.5 bg-gray-100 text-black font-bold text-[9px] uppercase border-2 border-black hover:bg-yellow-400 transition-colors">
                           {t}
                         </span>
                       ))}
                    </div>
                 </div>
                 <div className="space-y-3 text-right">
                    <p className="brick-font text-[10px] text-blue-600 tracking-widest uppercase">Expertise Level</p>
                    <div className="inline-block px-5 py-1.5 bg-blue-600 text-white border-4 border-black brick-font text-2xl italic">
                      {recommendation.difficulty}
                    </div>
                 </div>
              </div>

              <div className="pt-6 flex flex-wrap gap-4 justify-between items-center border-t-4 border-black mt-auto">
                 <div className="flex gap-4">
                   <button 
                      onClick={handleReset}
                      className="flex items-center gap-2 brick-font text-[10px] uppercase hover:text-blue-600 transition-all group"
                    >
                      <RotateCcw size={16} className="group-hover:rotate-[-180deg] transition-transform duration-500" /> NEW BUILD
                   </button>
                   <button 
                      onClick={handleSave}
                      className="flex items-center gap-2 brick-font text-[10px] uppercase hover:text-green-600 transition-all group"
                    >
                      <Save size={16} className="group-hover:scale-110 transition-transform" /> SAVE TO COLLECTION
                   </button>
                 </div>
                 <button className="btn-brick bg-yellow-400 text-black py-2.5 px-5 text-xs">
                    <Download size={16} /> INSTRUCTIONS
                 </button>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-[-20px] right-[-10px] opacity-[0.03] brick-font text-[12vw] select-none pointer-events-none uppercase rotate-[-5deg]">
            BRICK_AI
          </div>
        </div>
      </div>

      {/* Saved Collection Section */}
      {savedBuilds.length > 0 && (
        <div className="space-y-8 animate-[slide-in-up_0.6s_ease-out]">
          <div className="flex items-center gap-3">
            <LayoutGrid size={24} className="text-blue-600" />
            <h3 className="brick-font text-2xl uppercase tracking-tighter">Your Build Collection</h3>
            <div className="h-1 flex-1 bg-black/10 rounded-full"></div>
            <span className="brick-font text-[10px] opacity-30">{savedBuilds.length} SETS SAVED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBuilds.map((build, idx) => (
              <div 
                key={build.projectName} 
                className="brick-card bg-white p-6 space-y-4 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0px_#F7D117] border-l-[10px] border-l-blue-600"
              >
                <div className="flex justify-between items-start">
                  <div className="px-2 py-0.5 bg-black text-white brick-font text-[8px] uppercase">
                    SET_{1000 + idx}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleRemove(build.projectName); }}
                    className="text-black/20 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <h4 className="brick-font text-lg uppercase group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
                  {build.projectName}
                </h4>

                <div className="flex flex-wrap gap-1">
                  {build.techStack.slice(0, 3).map(t => (
                    <span key={t} className="text-[8px] font-bold uppercase text-black/40 px-1.5 py-0.5 bg-gray-100 rounded">
                      {t}
                    </span>
                  ))}
                  {build.techStack.length > 3 && <span className="text-[8px] font-bold text-black/40">+{build.techStack.length - 3}</span>}
                </div>

                <div className="pt-3 border-t-2 border-black/5 flex justify-between items-center">
                  <span className="brick-font text-[9px] opacity-40 uppercase">PCS: {pieceCount(build)}</span>
                  <div className="w-6 h-6 bg-yellow-400 border-2 border-black rounded-full studs-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProjectAdvisor;
