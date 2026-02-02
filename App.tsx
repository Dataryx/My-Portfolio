
// import React, { useEffect, useState, useMemo } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import Skills from './components/Skills';
// import Projects from './components/Projects';
// import AIProjectAdvisor from './components/AIProjectAdvisor';
// import Contact from './components/Contact';
// import { Briefcase, BookOpen, User, Download, Zap, Hash, Clock, Binary, ChevronRight, Package } from 'lucide-react';

// const App: React.FC = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   // Set up Scroll Progress, Observer and Mouse Tracking
//   useEffect(() => {
//     if (isLoading) return;

//     const handleMouseMove = (e: MouseEvent) => {
//       document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
//       document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
//     };

//     const handleScroll = () => {
//       const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
//       const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       const scrolled = (winScroll / height) * 100;
      
//       const progressBar = document.getElementById('scroll-progress');
//       const scrollBrick = document.getElementById('scroll-brick');
      
//       if (progressBar) progressBar.style.width = scrolled + "%";
//       if (scrollBrick) scrollBrick.style.left = scrolled + "%";
      
//       // Update global scroll variable for parallax effects
//       document.documentElement.style.setProperty('--scroll-percent', scrolled.toString());
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     window.addEventListener('scroll', handleScroll);

//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: '0px 0px -100px 0px'
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('in-view');
//         }
//       });
//     }, observerOptions);

//     const revealElements = document.querySelectorAll('.reveal, .reveal-snap, .reveal-left, .reveal-right, .stagger-container');
//     revealElements.forEach(el => observer.observe(el));

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('scroll', handleScroll);
//       observer.disconnect();
//     };
//   }, [isLoading]);

//   // Generate randomized background elements once
//   const backgroundElements = useMemo(() => {
//     const macroBricks = [
//       { color: '#D2122E', top: '-10%', left: '-10%', size: 'w-[40vw] h-[20vw]', delay: '0s', parallax: 'parallax-slow' },
//       { color: '#0055BF', top: '70%', left: '80%', size: 'w-[30vw] h-[50vw]', delay: '-10s', parallax: 'parallax-fast' },
//       { color: '#F7D117', top: '50%', left: '-20%', size: 'w-[50vw] h-[25vw]', delay: '-15s', parallax: 'parallax-invert' },
//     ];

//     const midBricks = [
//       { color: '#237841', top: '20%', left: '15%', size: 'w-32 h-16', delay: '-2s', parallax: 'parallax-fast' },
//       { color: '#D2122E', top: '80%', left: '10%', size: 'w-16 h-32', delay: '-8s', parallax: 'parallax-slow' },
//       { color: '#F7D117', top: '40%', left: '85%', size: 'w-24 h-24', delay: '-4s', parallax: 'parallax-invert' },
//       { color: '#0055BF', top: '10%', left: '75%', size: 'w-40 h-20', delay: '-12s', parallax: 'parallax-fast' },
//     ];

//     const tumblingBricks = Array.from({ length: 20 }).map((_, i) => ({
//       color: ['#D2122E', '#0055BF', '#F7D117', '#237841', '#E35500', '#009EE0'][i % 6],
//       left: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 20}s`,
//       duration: `${10 + Math.random() * 15}s`,
//       size: i % 3 === 0 ? 'w-12 h-6' : (i % 2 === 0 ? 'w-8 h-4' : 'w-4 h-4'),
//     }));

//     const floatingStuds = Array.from({ length: 30 }).map((_, i) => ({
//       color: ['#D2122E', '#0055BF', '#F7D117', '#237841', '#FFFFFF'][i % 5],
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       size: `${8 + Math.random() * 12}px`,
//       delay: `${Math.random() * -10}s`,
//       duration: `${5 + Math.random() * 5}s`,
//     }));

//     return { macroBricks, midBricks, tumblingBricks, floatingStuds };
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-[#0055BF] flex flex-col items-center justify-center z-[9999]">
//         <div className="flex gap-2 mb-8">
//           <div className="w-12 h-12 bg-[#D2122E] border-4 border-black rounded-lg animate-bounce"></div>
//           <div className="w-12 h-12 bg-[#F7D117] border-4 border-black rounded-lg animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//           <div className="w-12 h-12 bg-[#237841] border-4 border-black rounded-lg animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//         </div>
//         <h1 className="brick-font text-white text-4xl tracking-wider uppercase">Constructing Universe</h1>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen">
//       <Navbar />
      
//       {/* Dynamic Background Decor */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
//         {backgroundElements.macroBricks.map((b, i) => (
//           <div 
//             key={`macro-${i}`}
//             className={`absolute ${b.size} macro-brick border-4 border-black studs ${b.parallax}`}
//             style={{ backgroundColor: b.color, top: b.top, left: b.left, animationDelay: b.delay }}
//           />
//         ))}
//         {backgroundElements.floatingStuds.map((s, i) => (
//           <div 
//             key={`stud-${i}`}
//             className="floating-stud shadow-inner border border-black/5"
//             style={{ backgroundColor: s.color, top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.duration }}
//           />
//         ))}
//         {backgroundElements.tumblingBricks.map((b, i) => (
//           <div 
//             key={`tumble-${i}`}
//             className={`tumble-brick ${b.size} border-2 border-black/20 studs shadow-sm`}
//             style={{ backgroundColor: b.color, left: b.left, animationDelay: b.delay, animationDuration: b.duration, opacity: 0.15 }}
//           />
//         ))}
//         {backgroundElements.midBricks.map((b, i) => (
//           <div 
//             key={`mid-${i}`}
//             className={`absolute ${b.size} isometric-brick border-4 border-black studs opacity-10 shadow-2xl ${b.parallax}`}
//             style={{ backgroundColor: b.color, top: b.top, left: b.left, animationDelay: b.delay }}
//           />
//         ))}
//       </div>

//       <main className="max-w-7xl mx-auto px-6 pt-24 pb-24 space-y-20 lg:space-y-32">
//         <section id="hero" className="relative">
//           <Hero />
//         </section>

//         <section id="about" className="relative scroll-mt-24">
//           <div className="flex flex-col items-start mb-10 reveal-left">
//             <div className="bg-[#D2122E] text-white p-4 border-4 border-black rounded-tr-xl rounded-bl-xl studs shadow-[0_8px_0px_#900a1c]">
//                <h2 className="brick-font text-3xl md:text-5xl uppercase">The Creator</h2>
//             </div>
//           </div>
//           <div className="brick-card p-12 bg-white flex flex-col md:flex-row gap-12 items-center reveal-snap">
//             <div className="relative group shrink-0">
//               <div className="w-56 h-56 bg-yellow-400 border-8 border-black rounded-2xl studs-dark flex items-center justify-center overflow-hidden shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-105">
//                 <img 
//                   src="images/profile.jpg" 
//                   alt="Sumit Singh" 
//                   className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
//               </div>
//               <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 border-4 border-black rounded-full studs flex items-center justify-center text-white shadow-[4px_4px_0px_black] group-hover:rotate-12 transition-transform">
//                 <User size={32} />
//               </div>
//             </div>
//             <div className="space-y-6 flex-1">
//               <h3 className="brick-font text-4xl lg:text-5xl uppercase text-blue-600">Sumit Singh</h3>
//               <p className="text-xl font-bold uppercase tracking-tight text-black/70 leading-relaxed">
//                 I am a Data Engineer with hands-on experience in building scalable data pipelines, data warehouses, and real-time streaming systems. 
//                 I design and maintain high-performance data architectures using cloud platforms, distributed systems, and modern data stacks. 
//                 My expertise includes ETL/ELT pipelines, data modeling, workflow orchestration, and optimizing data systems for analytics, reporting, and machine learning use cases.
//               </p>
//               <div className="flex flex-wrap gap-4 pt-4">
//                 <div className="px-6 py-3 bg-black text-white brick-font text-sm uppercase shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">Data Engineer</div>
//                 <a 
//                   href="#" 
//                   className="px-6 py-3 bg-green-600 text-white brick-font text-sm uppercase border-4 border-black flex items-center gap-3 hover:bg-green-700 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none studs"
//                 >
//                   <Download size={20} /> Download Resume
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section id="skills" className="relative scroll-mt-24">
//           <div className="flex flex-col items-center mb-10 reveal">
//             <div className="bg-[#F7D117] text-black p-4 border-4 border-black rounded-t-xl studs shadow-[0_8px_0px_#bfa111]">
//                <h2 className="brick-font text-3xl md:text-5xl uppercase">The Component Library</h2>
//             </div>
//             <div className="w-full h-2 bg-black"></div>
//           </div>
//           <Skills />
//         </section>

//         <section id="projects" className="relative scroll-mt-24">
//           <div className="flex flex-col items-start mb-10 reveal-left">
//             <div className="bg-[#237841] text-white p-4 border-4 border-black rounded-tr-xl rounded-bl-xl studs shadow-[0_8px_0px_#17522b]">
//                <h2 className="brick-font text-3xl md:text-5xl uppercase">Master Build Sets</h2>
//             </div>
//           </div>
//           <Projects />
//         </section>

//         <section id="experience" className="relative scroll-mt-24">
//           <div className="flex flex-col items-center mb-10 reveal">
//             <div className="bg-[#009EE0] text-white p-4 border-4 border-black rounded-t-xl studs shadow-[0_8px_0px_#003a82]">
//                <h2 className="brick-font text-3xl md:text-5xl uppercase tracking-tighter">Construction History</h2>
//             </div>
//             <div className="w-full h-2 bg-black"></div>
//           </div>
//           <div className="space-y-6 stagger-container">
//             {[
//               { year: '2023-Present', role: 'Lead Architect', company: 'CloudBlocks Inc.' },
//               { year: '2021-2023', role: 'Structural Engineer', company: 'DataStructure Ltd.' },
//               { year: '2019-2021', role: 'Junior Builder', company: 'Foundation Startup' },
//             ].map((exp, i) => (
//               <div 
//                 key={i} 
//                 className="brick-card stagger-item bg-white p-6 border-l-[20px] border-l-[#009EE0] flex flex-col md:flex-row justify-between items-center gap-6"
//                 style={{ transitionDelay: `${i * 0.1}s` }}
//               >
//                 <div className="flex items-center gap-6">
//                   <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-lg studs">
//                     <Briefcase size={24} />
//                   </div>
//                   <div>
//                     <h4 className="brick-font text-xl uppercase">{exp.role}</h4>
//                     <p className="font-bold text-blue-600 uppercase text-xs">{exp.company}</p>
//                   </div>
//                 </div>
//                 <div className="brick-font text-lg text-black/20 italic">{exp.year}</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section id="blog" className="relative scroll-mt-24">
//           <div className="flex items-center gap-6 mb-8 reveal-left">
//              <div className="bg-[#E35500] text-white px-4 py-2 border-[3px] border-black studs shadow-[4px_4px_0px_black]">
//                <h2 className="brick-font text-xl uppercase tracking-tighter">Mini-Build Logs</h2>
//              </div>
//              <div className="flex-1 h-1 bg-black/10"></div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
//             {[
//               { 
//                 title: 'Building for Scalability', 
//                 color: '#D2122E', 
//                 image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
//                 serial: '75192-S',
//                 pieces: '2,450',
//                 complexity: 'Expert 18+',
//                 tags: ['Architecture', 'Cloud']
//               },
//               { 
//                 title: 'The Modular Mindset', 
//                 color: '#0055BF', 
//                 image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
//                 serial: '10255-M',
//                 pieces: '1,200',
//                 complexity: 'Adv. 12+',
//                 tags: ['React', 'Patterns']
//               },
//               { 
//                 title: 'React Assembly', 
//                 color: '#237841', 
//                 image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
//                 serial: '21323-R',
//                 pieces: '450',
//                 complexity: 'Starter 8+',
//                 tags: ['Frontend', 'UI']
//               }
//             ].map((post, i) => (
//               <div 
//                 key={i} 
//                 className="stagger-item group flex flex-col items-center"
//                 style={{ transitionDelay: `${i * 0.1}s` }}
//               >
//                 {/* Micro Brick Studs Header */}
//                 <div className="flex gap-1 mb-[-4px] relative z-20">
//                   {[...Array(4)].map((_, j) => (
//                     <div 
//                       key={j} 
//                       className="w-4 h-4 rounded-full border-2 border-black studs shadow-inner" 
//                       style={{ backgroundColor: post.color }}
//                     ></div>
//                   ))}
//                 </div>

//                 {/* Compact 3D Brick Card */}
//                 <div 
//                   className="w-full bg-white border-[3px] border-black p-3 flex flex-col relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[4px_10px_0px_rgba(0,0,0,0.1)]"
//                   style={{ 
//                     borderBottomWidth: '8px', 
//                     borderBottomColor: 'black',
//                   }}
//                 >
//                    {/* Mini Top Color Band */}
//                    <div 
//                     className="absolute top-0 left-0 w-full h-8 border-b-2 border-black studs-dark flex items-center px-3 justify-between"
//                     style={{ backgroundColor: post.color }}
//                    >
//                      <span className="brick-font text-white text-[8px] uppercase">Mini-Guide</span>
//                      <Binary size={12} className="text-white/30" />
//                    </div>

//                    {/* Compact Content Area */}
//                    <div className="mt-8 space-y-3">
//                       <div className="relative aspect-[16/9] border-2 border-black bg-gray-50 overflow-hidden">
//                          <img 
//                           src={post.image} 
//                           className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" 
//                          />
//                       </div>

//                       <div className="space-y-1">
//                         <div className="flex justify-between items-center text-[8px] font-black uppercase text-black/30">
//                            <div>{post.serial}</div>
//                            <div>{post.pieces} Pcs</div>
//                         </div>
//                         <h3 className="brick-font text-lg leading-tight uppercase text-black group-hover:text-blue-600 transition-colors">
//                           {post.title}
//                         </h3>
//                       </div>

//                       <div className="flex flex-wrap gap-1">
//                         {post.tags.map(t => (
//                           <span key={t} className="px-1.5 py-0.5 bg-gray-50 border border-black/10 text-[7px] font-bold uppercase">
//                             {t}
//                           </span>
//                         ))}
//                       </div>

//                       <button className="w-full mt-2 flex items-center justify-center gap-2 bg-black text-white py-1.5 border-2 border-black brick-font text-[9px] uppercase hover:bg-yellow-400 hover:text-black transition-all">
//                          Open <ChevronRight size={14} />
//                       </button>
//                    </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section id="ai" className="relative reveal-snap">
//           <AIProjectAdvisor />
//         </section>

//         <section id="contact" className="relative scroll-mt-24">
//           <div className="flex justify-center mb-10 reveal-snap">
//             <div className="bg-[#D2122E] text-white px-10 py-4 border-4 border-black rounded-full studs shadow-[0_8px_0px_#900a1c] transition-transform hover:scale-105 active:scale-95 cursor-pointer">
//                <h2 className="brick-font text-2xl md:text-4xl uppercase tracking-tighter">Click to Snap</h2>
//             </div>
//           </div>
//           <div className="reveal">
//             <Contact />
//           </div>
//         </section>

//         <footer className="mt-24 pt-16 border-t-8 border-black flex flex-col justify-center items-center gap-10 bg-white p-10 brick-card relative reveal">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
//             {[...Array(8)].map((_, i) => (
//               <div key={i} className="w-6 h-6 bg-yellow-400 border-2 border-black rounded-full studs-dark"></div>
//             ))}
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-[#D2122E] border-4 border-black rounded-lg studs flex items-center justify-center text-white brick-font shadow-[2px_2px_0px_black] text-xs">S</div>
//                 <h3 className="brick-font text-xl">SUMIT SINGH</h3>
//               </div>
//               <p className="max-w-xs font-medium text-black/60 uppercase text-[10px] tracking-wider leading-relaxed">
//                 Every line of code is a high-precision plastic element. Built with care, one block at a time.
//               </p>
//             </div>
            
//             <div className="grid grid-cols-2 gap-10">
//               <div className="space-y-3">
//                 <span className="brick-font text-sm text-blue-600 border-b-2 border-blue-600 pb-1">Navigation</span>
//                 <ul className="space-y-1.5 text-[10px] font-bold uppercase underline decoration-2 decoration-red-500 underline-offset-4">
//                   <li><a href="#hero" className="hover:text-red-500 transition-colors">Start Assembly</a></li>
//                   <li><a href="#about" className="hover:text-red-500 transition-colors">The Creator</a></li>
//                   <li><a href="#skills" className="hover:text-red-500 transition-colors">Part Inventory</a></li>
//                   <li><a href="#projects" className="hover:text-red-500 transition-colors">Finished Sets</a></li>
//                 </ul>
//               </div>
//               <div className="space-y-3">
//                 <span className="brick-font text-sm text-green-600 border-b-2 border-green-600 pb-1">Channels</span>
//                 <ul className="space-y-1.5 text-[10px] font-bold uppercase">
//                   <li><a href="#" className="hover:text-green-600 transition-colors flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span>GitHub</a></li>
//                   <li><a href="#" className="hover:text-green-600 transition-colors flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span>LinkedIn</a></li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="w-full pt-6 border-t-4 border-black flex justify-center">
//             <p className="brick-font text-[10px] opacity-50 uppercase tracking-widest text-center">
//               © 2026 Sumit Singh. All rights reserved.
//             </p>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AIProjectAdvisor from './components/AIProjectAdvisor';
import Contact from './components/Contact';
import { Briefcase, Download, Binary, ChevronRight, User } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Cursor physics refs
  const mousePos = useRef({ x: 0, y: 0 });
  const actualCursorPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const trailPositions = useRef(Array.from({ length: 4 }).map(() => ({ x: 0, y: 0 })));
  const isMagnetized = useRef(false);
  const magnetTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Set up Interactive Systems: cursor, particles, scroll progress, observer
  useEffect(() => {
    if (isLoading) return;

    const mainCursor = document.getElementById('cursor-main');
    const trails = document.querySelectorAll('.cursor-trail');
    const root = document.documentElement;

    const handleMouseMove = (e: MouseEvent) => {
      // velocity for rotation
      velocity.current = {
        x: e.clientX - mousePos.current.x,
        y: e.clientY - mousePos.current.y
      };

      mousePos.current = { x: e.clientX, y: e.clientY };
      root.style.setProperty('--mouse-x', `${e.clientX}px`);
      root.style.setProperty('--mouse-y', `${e.clientY}px`);

      // Magnet/snapping calculation (closest interactive element)
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, .brick-card, input, textarea, .group') as HTMLElement;

      if (interactiveEl) {
        const rect = interactiveEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < 80) {
          isMagnetized.current = true;
          magnetTarget.current = { x: centerX, y: centerY };
        } else {
          isMagnetized.current = false;
        }
      } else {
        isMagnetized.current = false;
      }

      const isInteractive = !!target.closest('button, a, .brick-card, input, textarea, .group');
      if (mainCursor) {
        mainCursor.style.backgroundColor = isInteractive ? 'var(--blue)' : 'var(--red)';
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Burst particles
      const colors = ['var(--red)', 'var(--blue)', 'var(--yellow)', 'var(--green)'];
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-particle';
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.backgroundColor = colors[i % colors.length];

        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 80;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const tr = Math.random() * 720;

        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--tr', `${tr}deg`);

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 600);
      }
    };

    const animateCursor = () => {
      // Use magnet target when magnetized
      const targetX = isMagnetized.current ? magnetTarget.current.x : mousePos.current.x;
      const targetY = isMagnetized.current ? magnetTarget.current.y : mousePos.current.y;

      actualCursorPos.current.x += (targetX - actualCursorPos.current.x) * 0.15;
      actualCursorPos.current.y += (targetY - actualCursorPos.current.y) * 0.15;

      if (mainCursor) {
        const rotX = Math.max(Math.min(velocity.current.y * 0.5, 15), -15);
        const rotY = Math.max(Math.min(velocity.current.x * -0.5, 15), -15);
        const scale = isMagnetized.current ? 1.6 : 1.0;

        mainCursor.style.transform = `translate(-50%, -50%) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;
        mainCursor.style.left = `${actualCursorPos.current.x}px`;
        mainCursor.style.top = `${actualCursorPos.current.y}px`;
      }

      // Trails with spring effect
      trailPositions.current.forEach((pos, i) => {
        const prev = i === 0 ? actualCursorPos.current : trailPositions.current[i - 1];
        const spring = 0.15 + (i * 0.05);
        pos.x += (prev.x - pos.x) * spring;
        pos.y += (prev.y - pos.y) * spring;

        const trailEl = trails[i] as HTMLElement;
        if (trailEl) {
          trailEl.style.left = `${pos.x}px`;
          trailEl.style.top = `${pos.y}px`;
          const wobble = Math.sin(Date.now() / 200 + i) * 2;
          trailEl.style.transform = `translate(-50%, -50%) translateY(${wobble}px)`;
        }
      });

      // velocity decay
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      requestAnimationFrame(animateCursor);
    };

    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;

      const progressBar = document.getElementById('scroll-progress');
      const scrollBrick = document.getElementById('scroll-brick');

      if (progressBar) progressBar.style.width = scrolled + '%';
      if (scrollBrick) scrollBrick.style.left = scrolled + '%';
      root.style.setProperty('--scroll-percent', scrolled.toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleClick);
    window.addEventListener('scroll', handleScroll);
    const cursorAnimFrame = requestAnimationFrame(animateCursor);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-snap, .reveal-left, .reveal-right, .stagger-container');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(cursorAnimFrame);
      observer.disconnect();
    };
  }, [isLoading]);

  // Generate randomized background elements once
  const backgroundElements = useMemo(() => {
    const macroBricks = [
      { color: '#D2122E', top: '-10%', left: '-10%', size: 'w-[40vw] h-[20vw]', delay: '0s', parallax: 'parallax-slow' },
      { color: '#0055BF', top: '70%', left: '80%', size: 'w-[30vw] h-[50vw]', delay: '-10s', parallax: 'parallax-fast' },
      { color: '#F7D117', top: '50%', left: '-20%', size: 'w-[50vw] h-[25vw]', delay: '-15s', parallax: 'parallax-invert' },
    ];

    const midBricks = [
      { color: '#237841', top: '20%', left: '15%', size: 'w-32 h-16', delay: '-2s', parallax: 'parallax-fast' },
      { color: '#D2122E', top: '80%', left: '10%', size: 'w-16 h-32', delay: '-8s', parallax: 'parallax-slow' },
      { color: '#F7D117', top: '40%', left: '85%', size: 'w-24 h-24', delay: '-4s', parallax: 'parallax-invert' },
      { color: '#0055BF', top: '10%', left: '75%', size: 'w-40 h-20', delay: '-12s', parallax: 'parallax-fast' },
    ];

    const tumblingBricks = Array.from({ length: 20 }).map((_, i) => ({
      color: ['#D2122E', '#0055BF', '#F7D117', '#237841', '#E35500', '#009EE0'][i % 6],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 20}s`,
      duration: `${10 + Math.random() * 15}s`,
      size: i % 3 === 0 ? 'w-12 h-6' : (i % 2 === 0 ? 'w-8 h-4' : 'w-4 h-4'),
    }));

    const floatingStuds = Array.from({ length: 30 }).map((_, i) => ({
      color: ['#D2122E', '#0055BF', '#F7D117', '#237841', '#FFFFFF'][i % 5],
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 12}px`,
      delay: `${Math.random() * -10}s`,
      duration: `${5 + Math.random() * 5}s`,
    }));

    return { macroBricks, midBricks, tumblingBricks, floatingStuds };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0055BF] flex flex-col items-center justify-center z-[9999]">
        <div className="flex gap-2 mb-8">
          <div className="w-12 h-12 bg-[#D2122E] border-4 border-black rounded-lg animate-bounce"></div>
          <div className="w-12 h-12 bg-[#F7D117] border-4 border-black rounded-lg animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-12 h-12 bg-[#237841] border-4 border-black rounded-lg animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <h1 className="brick-font text-white text-4xl tracking-wider uppercase">Constructing Universe</h1>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />

      {/* Scroll progress UI (updated by scroll handler) */}
      <div className="fixed top-4 right-6 z-[3000] flex items-center gap-2 pointer-events-none">
        <div id="scroll-progress-track" className="w-40 h-2 bg-black/10 rounded-full overflow-hidden">
          <div id="scroll-progress" className="h-full bg-black w-0" />
        </div>
        <div id="scroll-brick" className="w-4 h-4 bg-yellow-400 border-2 border-black rounded-full studs" style={{ position: 'relative', left: '0%' }} />
      </div>

      {/* Cursor elements */}
      <div id="cursor-main" className="fixed w-6 h-6 rounded-full pointer-events-none z-[4000] transform translate-[-50%] translate-y-[-50%] transition-transform will-change-transform" />
      {/* Four trail elements */}
      <div className="cursor-trail fixed w-4 h-4 rounded-full pointer-events-none z-[3999]" />
      <div className="cursor-trail fixed w-3 h-3 rounded-full pointer-events-none z-[3998]" />
      <div className="cursor-trail fixed w-2 h-2 rounded-full pointer-events-none z-[3997]" />
      <div className="cursor-trail fixed w-1.5 h-1.5 rounded-full pointer-events-none z-[3996]" />

      {/* Dynamic Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        {backgroundElements.macroBricks.map((b, i) => (
          <div
            key={`macro-${i}`}
            className={`absolute ${b.size} macro-brick border-4 border-black studs ${b.parallax}`}
            style={{ backgroundColor: b.color, top: b.top, left: b.left, animationDelay: b.delay }}
          />
        ))}
        {backgroundElements.floatingStuds.map((s, i) => (
          <div
            key={`stud-${i}`}
            className="floating-stud shadow-inner border border-black/5"
            style={{ backgroundColor: s.color, top: s.top, left: s.left, width: s.size, height: s.size, animationDelay: s.delay, animationDuration: s.duration }}
          />
        ))}
        {backgroundElements.tumblingBricks.map((b, i) => (
          <div
            key={`tumble-${i}`}
            className={`tumble-brick ${b.size} border-2 border-black/20 studs shadow-sm`}
            style={{ backgroundColor: b.color, left: b.left, animationDelay: b.delay, animationDuration: b.duration, opacity: 0.15 }}
          />
        ))}
        {backgroundElements.midBricks.map((b, i) => (
          <div
            key={`mid-${i}`}
            className={`absolute ${b.size} isometric-brick border-4 border-black studs opacity-10 shadow-2xl ${b.parallax}`}
            style={{ backgroundColor: b.color, top: b.top, left: b.left, animationDelay: b.delay }}
          />
        ))}
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-24 space-y-20 lg:space-y-32">
        <section id="hero" className="relative">
          <Hero />
        </section>

        <section id="about" className="relative scroll-mt-24">
          <div className="flex flex-col items-start mb-10 reveal-left">
            <div className="bg-[#D2122E] text-white p-4 border-4 border-black rounded-tr-xl rounded-bl-xl studs shadow-[0_8px_0px_#900a1c]">
              <h2 className="brick-font text-3xl md:text-5xl uppercase">The Creator</h2>
            </div>
          </div>
          <div className="brick-card p-12 bg-white flex flex-col md:flex-row gap-12 items-center reveal-snap">
            <div className="relative group shrink-0">
              <div className="w-56 h-56 bg-yellow-400 border-8 border-black rounded-2xl studs-dark flex items-center justify-center overflow-hidden shadow-[inset_0_4px_8px_rgba(0,0,0,0.2),8px_8px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-105">
                <img
                  src="images/profile.jpg"
                  alt="Sumit Singh"
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-600 border-4 border-black rounded-full studs flex items-center justify-center text-white shadow-[4px_4px_0px_black] group-hover:rotate-12 transition-transform">
                <User size={32} />
              </div>
            </div>
            <div className="space-y-6 flex-1">
              <h3 className="brick-font text-4xl lg:text-5xl uppercase text-blue-600">Sumit Singh</h3>
              <p className="text-xl font-bold uppercase tracking-tight text-black/70 leading-relaxed">
                I am a Data Engineer with hands-on experience in building scalable data pipelines, data warehouses, and real-time streaming systems.
                I design and maintain high-performance data architectures using cloud platforms, distributed systems, and modern data stacks.
                My expertise includes ETL/ELT pipelines, data modeling, workflow orchestration, and optimizing data systems for analytics, reporting, and machine learning use cases.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="px-6 py-3 bg-black text-white brick-font text-sm uppercase shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">Data Engineer</div>
                <a
                  href="#"
                  className="px-6 py-3 bg-green-600 text-white brick-font text-sm uppercase border-4 border-black flex items-center gap-3 hover:bg-green-700 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_black] active:translate-y-1 active:shadow-none studs"
                >
                  <Download size={20} /> Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="relative scroll-mt-24">
          <div className="flex flex-col items-center mb-10 reveal">
            <div className="bg-[#F7D117] text-black p-4 border-4 border-black rounded-t-xl studs shadow-[0_8px_0px_#bfa111]">
              <h2 className="brick-font text-3xl md:text-5xl uppercase">Data Engineering Core</h2>
            </div>
            <div className="w-full h-2 bg-black"></div>
          </div>
          <Skills />
        </section>

        <section id="projects" className="relative scroll-mt-24">
          <div className="flex flex-col items-start mb-10 reveal-left">
            <div className="bg-[#237841] text-white p-4 border-4 border-black rounded-tr-xl rounded-bl-xl studs shadow-[0_8px_0px_#17522b]">
              <h2 className="brick-font text-3xl md:text-5xl uppercase">Project Build Sets</h2>
            </div>
          </div>
          <Projects />
        </section>

        <section id="experience" className="relative scroll-mt-24">
          <div className="flex flex-col items-center mb-10 reveal">
            <div className="bg-[#009EE0] text-white p-4 border-4 border-black rounded-t-xl studs shadow-[0_8px_0px_#003a82]">
              <h2 className="brick-font text-3xl md:text-5xl uppercase tracking-tighter">Career Build Log</h2>
            </div>
            <div className="w-full h-2 bg-black"></div>
          </div>
          <div className="space-y-6 stagger-container">
            {[
              { year: '2023-2024', role: 'Data Engineer', company: 'YCO Solutions Pvt. Ltd.' },
              { year: '2021-2022', role: 'Associate Data Engineer', company: 'YCO Solutions Pvt. Ltd.' },
              { year: '2020-2020', role: 'Software Engineering Intern', company: 'LIS Nepal Pvt. Ltd.' },
            ].map((exp, i) => (
              <div
                key={i}
                className="brick-card stagger-item bg-white p-6 border-l-[20px] border-l-[#009EE0] flex flex-col md:flex-row justify-between items-center gap-6"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-black text-white flex items-center justify-center rounded-lg studs">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="brick-font text-xl uppercase">{exp.role}</h4>
                    <p className="font-bold text-blue-600 uppercase text-xs">{exp.company}</p>
                  </div>
                </div>
                <div className="brick-font text-lg text-black/20 italic">{exp.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="blog" className="relative scroll-mt-24">
          <div className="flex items-center gap-6 mb-8 reveal-left">
            <div className="bg-[#E35500] text-white px-4 py-2 border-[3px] border-black studs shadow-[4px_4px_0px_black]">
              <h2 className="brick-font text-xl uppercase tracking-tighter">Mini Blogs</h2>
            </div>
            <div className="flex-1 h-1 bg-black/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-container">
            {[
              {
                title: 'Building for Scalability',
                color: '#D2122E',
                image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
                serial: '75192-S',
                pieces: '2,450',
                complexity: 'Expert 18+',
                tags: ['Architecture', 'Cloud']
              },
              {
                title: 'The Modular Mindset',
                color: '#0055BF',
                image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400',
                serial: '10255-M',
                pieces: '1,200',
                complexity: 'Adv. 12+',
                tags: ['React', 'Patterns']
              },
              {
                title: 'React Assembly',
                color: '#237841',
                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=400',
                serial: '21323-R',
                pieces: '450',
                complexity: 'Starter 8+',
                tags: ['Frontend', 'UI']
              }
            ].map((post, i) => (
              <div
                key={i}
                className="stagger-item group flex flex-col items-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1 mb-[-4px] relative z-20">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="w-4 h-4 rounded-full border-2 border-black studs shadow-inner"
                      style={{ backgroundColor: post.color }}
                    />
                  ))}
                </div>

                <div
                  className="w-full bg-white border-[3px] border-black p-3 flex flex-col relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[4px_10px_0px_rgba(0,0,0,0.1)]"
                  style={{
                    borderBottomWidth: '8px',
                    borderBottomColor: 'black',
                  }}
                >
                  <div
                    className="absolute top-0 left-0 w-full h-8 border-b-2 border-black studs-dark flex items-center px-3 justify-between"
                    style={{ backgroundColor: post.color }}
                  >
                    <span className="brick-font text-white text-[8px] uppercase">Mini-Guide</span>
                    <Binary size={12} className="text-white/30" />
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="relative aspect-[16/9] border-2 border-black bg-gray-50 overflow-hidden">
                      <img
                        src={post.image}
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[8px] font-black uppercase text-black/30">
                        <div>{post.serial}</div>
                        <div>{post.pieces} Pcs</div>
                      </div>
                      <h3 className="brick-font text-lg leading-tight uppercase text-black group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {post.tags.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-gray-50 border border-black/10 text-[7px] font-bold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button className="w-full mt-2 flex items-center justify-center gap-2 bg-black text-white py-1.5 border-2 border-black brick-font text-[9px] uppercase hover:bg-yellow-400 hover:text-black transition-all">
                      Open <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* <section id="ai" className="relative reveal-snap">
          <AIProjectAdvisor />
        </section> */}

        <section id="contact" className="relative scroll-mt-24">
          <div className="flex justify-center mb-10 reveal-snap">
            <div className="bg-[#D2122E] text-white px-10 py-4 border-4 border-black rounded-full studs shadow-[0_8px_0px_#900a1c] transition-transform hover:scale-105 active:scale-95 cursor-pointer">
              <h2 className="brick-font text-2xl md:text-4xl uppercase tracking-tighter">Click to Snap</h2>
            </div>
          </div>
          <div className="reveal">
            <Contact />
          </div>
        </section>

        <footer className="mt-24 pt-16 border-t-8 border-black flex flex-col justify-center items-center gap-10 bg-white p-10 brick-card relative reveal">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-6 h-6 bg-yellow-400 border-2 border-black rounded-full studs-dark"></div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#D2122E] border-4 border-black rounded-lg studs flex items-center justify-center text-white brick-font shadow-[2px_2px_0px_black] text-xs">S</div>
                <h3 className="brick-font text-xl">SUMIT SINGH</h3>
              </div>
              <p className="max-w-xs font-medium text-black/60 uppercase text-[10px] tracking-wider leading-relaxed">
                Every line of code is a high-precision plastic element. Built with care, one block at a time.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-3">
                <span className="brick-font text-sm text-blue-600 border-b-2 border-blue-600 pb-1">Navigation</span>
                <ul className="space-y-1.5 text-[10px] font-bold uppercase underline decoration-2 decoration-red-500 underline-offset-4">
                  <li><a href="#hero" className="hover:text-red-500 transition-colors">Home</a></li>
                  <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
                  <li><a href="#skills" className="hover:text-red-500 transition-colors">Skills</a></li>
                  <li><a href="#projects" className="hover:text-red-500 transition-colors">Projects</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <span className="brick-font text-sm text-green-600 border-b-2 border-green-600 pb-1">Channels</span>
                <ul className="space-y-1.5 text-[10px] font-bold uppercase">
                  <li><a href="https://github.com/Dataryx" className="hover:text-green-600 transition-colors flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span>GitHub</a></li>
                  <li><a href="www.linkedin.com/in/sumitsingh43" className="hover:text-green-600 transition-colors flex items-center gap-2"><span className="w-2 h-2 bg-green-600 rounded-full"></span>LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full pt-6 border-t-4 border-black flex justify-center">
            <p className="brick-font text-[10px] opacity-50 uppercase tracking-widest text-center">
              © 2026 Sumit Singh. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
