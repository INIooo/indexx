import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Activity, Cog, Binary } from 'lucide-react';

export default function LabView() {
  const [godotLvl, setGodotLvl] = useState(95);
  const [unityLvl, setUnityLvl] = useState(88);
  const [blenderLvl, setBlenderLvl] = useState(75);
  const [kotlinLvl, setKotlinLvl] = useState(92);
  const [pythonLvl, setPythonLvl] = useState(80);

  // Auto-fluctuate VU levels slightly to feel dynamic
  useEffect(() => {
    const interval = setInterval(() => {
      setGodotLvl(prev => Math.min(100, Math.max(85, prev + (Math.random() > 0.5 ? 1 : -1))));
      setUnityLvl(prev => Math.min(100, Math.max(80, prev + (Math.random() > 0.5 ? 2 : -2))));
      setBlenderLvl(prev => Math.min(90, Math.max(68, prev + (Math.random() > 0.5 ? 1 : -1))));
      setKotlinLvl(prev => Math.min(100, Math.max(82, prev + (Math.random() > 0.5 ? 2 : -2))));
      setPythonLvl(prev => Math.min(95, Math.max(72, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const downloadManifesto = () => {
    // Generate a beautiful, authentic manifesto string
    const manifestoText = `===========================================
OBSIDIAN PROTOCOL // SYSTEM CORE MANIFESTO 
===========================================
[ARCHITECT STATE: OPTIMAL]
[LOCATION: VIRTUAL_ENV_01]

Bridging the gap between digital physics and creative architecture.
We create, we refine, we execute at low-latency.

Primary Directives:
1. IMPECCABLE HARDWARE-SOFTWARE INTEGRATION
2. GRAPHICS ENGINE COMPILER LATENCY UNDER 1MS
3. GENERATIVE PROCEDURAL FRAMEWORKS AT MASSIVE GRAPH SCALE
4. RETAIN TACTILE DESIGN INTEGRITY ACROSS ALL MODULAR NODES

- ROHAN P. // SYSTEM_CORE_ARCHITECT
===========================================`;
    const blob = new Blob([manifestoText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'DUMP_MANIFESTO.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left CRT Terminal Bio Panel */}
        <section className="lg:col-span-8 bg-surface-container-low border border-outline-variant p-6 rounded-lg relative overflow-hidden flex flex-col justify-between shadow-2xl metal-texture">
          {/* Aesthetic screw corners */}
          <div className="absolute top-3 left-3 opacity-20 font-mono text-[10px]">*</div>
          <div className="absolute top-3 right-3 opacity-20 font-mono text-[10px]">*</div>
          <div className="absolute bottom-3 left-3 opacity-20 font-mono text-[10px]">*</div>
          <div className="absolute bottom-3 right-3 opacity-20 font-mono text-[10px]">*</div>

          <div>
            <h2 className="font-label text-xs font-bold text-primary-fixed-dim mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container led-orange-glow animate-pulse"></span>
              CORE_IDENTITY_MODULE
            </h2>

            <div className="relative bg-surface-container-lowest rounded-xl p-8 border-[12px] border-surface-container shadow-inner min-h-[380px] overflow-hidden group">
              {/* Retro glass scanline refraction overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>
              <div className="absolute inset-0 scanline opacity-20"></div>

              <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                <div>
                  <h3 className="font-sans text-4xl md:text-5xl font-bold text-primary mb-3 leading-tight tracking-tight font-sans">
                    Rohan Patil
                  </h3>
                  <span className="text-secondary-fixed font-mono text-sm tracking-widest font-bold block uppercase border-b-2 border-outline-variant/30 pb-4">
                    [ COMPILER_BREAKER_15 ]
                  </span>
                </div>

                <p className="font-mono text-sm md:text-base text-on-surface-variant max-w-2xl border-l-2 border-primary-container pl-6 py-2 leading-relaxed">
                  While you were following tutorials, I was breaking the compilers. 6 Years deep into C++, GDScript, and digital domination. I don't follow trends; I build the engines they run on.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.button
                    whileTap={{ y: 2 }}
                    onClick={downloadManifesto}
                    className="bg-primary-container hover:brightness-110 text-on-primary-container px-6 py-3 font-label text-[10px] font-bold tracking-wider rounded flex items-center gap-2 cursor-pointer shadow-md shadow-primary-container/20"
                  >
                    <Download className="w-4 h-4" />
                    DUMP_MANIFESTO.PDF
                  </motion.button>
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="border border-outline-variant hover:border-primary/50 text-on-surface-variant px-6 py-3 font-label text-[10px] font-bold tracking-wider rounded flex items-center gap-2 transition-all cursor-pointer bg-surface-container-low"
                  >
                    <Binary className="w-4 h-4" />
                    VIEW_REPOSITORY
                  </a>
                </div>
              </div>

              {/* Decorative Logic Circuit Design Background */}
              <div className="absolute bottom-4 right-4 opacity-5 pointer-events-none select-none text-[10px] font-mono leading-none">
                <pre className="text-primary-container">
                  {`01010101 01101110 01101001 01110100 01111001
01100111 01101111 01100100 01101111 01110100
01100010 01101100 01100101 01101110 01100100`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Right Stats Panel */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg flex-1 relative flex flex-col justify-between shadow-2xl metal-texture">
            <div>
              <h2 className="font-label text-xs font-bold text-on-surface-variant mb-6 flex justify-between items-center border-b border-outline-variant/30 pb-3">
                <span>SYSTEM_UPTIME</span>
                <Activity className="w-4 h-4 text-on-secondary-fixed-variant animate-pulse" />
              </h2>

              <div className="space-y-6">
                {/* Stat block 1 */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-on-surface-variant/70 tracking-wider">ACTIVE_PROJECTS</span>
                  <div className="flex bg-surface-container-lowest p-2 rounded border border-outline-variant/60 items-center gap-1 shadow-inner">
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-primary-container rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-primary-container rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-primary-container rounded shadow-inner">5</span>
                    <span className="w-6 h-12 flex items-center justify-center font-sans text-xl font-bold text-primary">+</span>
                  </div>
                </div>

                {/* Stat block 2 */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-on-surface-variant/70 tracking-wider">ENGINES_DEPLOYED</span>
                  <div className="flex bg-surface-container-lowest p-2 rounded border border-outline-variant/60 items-center gap-1 shadow-inner">
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-secondary-fixed-dim rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-secondary-fixed-dim rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-secondary-fixed-dim rounded shadow-inner">4</span>
                    <span className="w-6 h-12 flex items-center justify-center font-sans text-xl font-bold text-secondary">+</span>
                  </div>
                </div>

                {/* Stat block 3 */}
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-on-surface-variant/70 tracking-wider">EXP_CYCLE_COUNT</span>
                  <div className="flex bg-surface-container-lowest p-2 rounded border border-outline-variant/60 items-center gap-1 shadow-inner">
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-on-surface rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-on-surface rounded shadow-inner">0</span>
                    <span className="bg-surface-container-highest w-8 h-12 flex items-center justify-center font-sans text-2xl font-bold text-on-surface rounded shadow-inner">3</span>
                    <span className="w-6 h-12 flex items-center justify-center font-sans text-xl font-bold text-on-surface-variant">+</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Screw Highlights */}
            <div className="flex justify-center gap-6 opacity-30 pt-4 border-t border-outline-variant/25">
              <div className="w-4 h-4 rounded-full bg-black shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-4 bg-white/20 rotate-45 rounded-full"></div>
              </div>
              <div className="w-4 h-4 rounded-full bg-black shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-4 bg-white/20 -rotate-45 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Tech VU Meters Section */}
      <section className="bg-surface-container-high border border-outline-variant p-6 rounded-lg relative overflow-hidden shadow-2xl metal-texture">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="font-sans text-2xl font-bold text-on-surface tracking-tight uppercase">
            POWER_LEVEL_DIAGNOSTICS
          </h2>

          <div className="flex items-center gap-4 bg-surface-container-lowest py-2 px-4 rounded border border-outline-variant industrial-slot">
            <span className="font-label text-[10px] font-bold text-error tracking-wider uppercase">ERR: NONE</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary led-orange-glow"></span>
            </span>
          </div>
        </div>

        {/* Meters grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {/* Godot */}
          <div className="flex flex-col items-center gap-4 bg-surface-container-low p-6 rounded border border-outline-variant/50 industrial-slot group">
            <span className="font-label text-[10px] font-bold text-on-surface-variant group-hover:text-primary transition-colors tracking-widest">GODOT</span>
            <div className="h-60 w-10 bg-black rounded-sm p-1 shadow-inner relative flex items-end border border-outline-variant/30">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={godotLvl} 
                onChange={(e) => setGodotLvl(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize z-30" 
              />
              <motion.div 
                animate={{ height: `${godotLvl}%` }}
                className="vu-meter-bar w-full rounded-sm"
              ></motion.div>
              {/* Overlapping matrix indicators */}
              <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-px w-full bg-white"></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-primary font-bold">{godotLvl}% PWR</span>
          </div>

          {/* Unity */}
          <div className="flex flex-col items-center gap-4 bg-surface-container-low p-6 rounded border border-outline-variant/50 industrial-slot group">
            <span className="font-label text-[10px] font-bold text-on-surface-variant group-hover:text-primary transition-colors tracking-widest">UNITY</span>
            <div className="h-60 w-10 bg-black rounded-sm p-1 shadow-inner relative flex items-end border border-outline-variant/30">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={unityLvl} 
                onChange={(e) => setUnityLvl(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize z-30" 
              />
              <motion.div 
                animate={{ height: `${unityLvl}%` }}
                className="vu-meter-bar w-full rounded-sm"
              ></motion.div>
              <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-px w-full bg-white"></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-primary font-bold">{unityLvl}% PWR</span>
          </div>

          {/* Blender */}
          <div className="flex flex-col items-center gap-4 bg-surface-container-low p-6 rounded border border-outline-variant/50 industrial-slot group">
            <span className="font-label text-[10px] font-bold text-on-surface-variant group-hover:text-primary transition-colors tracking-widest">BLENDER</span>
            <div className="h-60 w-10 bg-black rounded-sm p-1 shadow-inner relative flex items-end border border-outline-variant/30">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={blenderLvl} 
                onChange={(e) => setBlenderLvl(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize z-30" 
              />
              <motion.div 
                animate={{ height: `${blenderLvl}%` }}
                className="vu-meter-bar w-full rounded-sm"
              ></motion.div>
              <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-px w-full bg-white"></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-primary font-bold">{blenderLvl}% PWR</span>
          </div>

          {/* Kotlin */}
          <div className="flex flex-col items-center gap-4 bg-surface-container-low p-6 rounded border border-outline-variant/50 industrial-slot group">
            <span className="font-label text-[10px] font-bold text-on-surface-variant group-hover:text-primary transition-colors tracking-widest">KOTLIN</span>
            <div className="h-60 w-10 bg-black rounded-sm p-1 shadow-inner relative flex items-end border border-outline-variant/30">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={kotlinLvl} 
                onChange={(e) => setKotlinLvl(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize z-30" 
              />
              <motion.div 
                animate={{ height: `${kotlinLvl}%` }}
                className="vu-meter-bar w-full rounded-sm"
              ></motion.div>
              <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-px w-full bg-white"></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-primary font-bold">{kotlinLvl}% PWR</span>
          </div>

          {/* Python */}
          <div className="flex flex-col items-center gap-4 bg-surface-container-low p-6 rounded border border-outline-variant/50 industrial-slot group">
            <span className="font-label text-[10px] font-bold text-on-surface-variant group-hover:text-primary transition-colors tracking-widest">PYTHON</span>
            <div className="h-60 w-10 bg-black rounded-sm p-1 shadow-inner relative flex items-end border border-outline-variant/30">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={pythonLvl} 
                onChange={(e) => setPythonLvl(parseInt(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-row-resize z-30" 
              />
              <motion.div 
                animate={{ height: `${pythonLvl}%` }}
                className="vu-meter-bar w-full rounded-sm"
              ></motion.div>
              <div className="absolute inset-x-0 h-full flex flex-col justify-between py-2 pointer-events-none opacity-20">
                {[...Array(6)].map((_, idx) => (
                  <div key={idx} className="h-px w-full bg-white"></div>
                ))}
              </div>
            </div>
            <span className="font-mono text-xs text-primary font-bold">{pythonLvl}% PWR</span>
          </div>
        </div>
      </section>

      {/* Schematic Circuit Info Bar */}
      <section className="w-full bg-surface-container-lowest border-2 border-outline-variant p-6 rounded-lg industrial-slot metal-texture">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide py-1 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="font-label text-[9px] font-bold text-on-surface-variant">SERIAL:</span>
            <span className="text-secondary-fixed font-bold">RP-00-112358-1321</span>
          </div>
          <div className="hidden md:block h-4 w-px bg-outline-variant/40"></div>

          <div className="flex items-center gap-2">
            <span className="font-label text-[9px] font-bold text-on-surface-variant">LOC:</span>
            <span className="text-secondary-fixed font-bold">VIRTUAL_ENV_01</span>
          </div>
          <div className="hidden md:block h-4 w-px bg-outline-variant/40"></div>

          <div className="flex items-center gap-2">
            <span className="font-label text-[9px] font-bold text-on-surface-variant">STATUS:</span>
            <motion.span 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-primary font-bold"
            >
              OPTIMAL
            </motion.span>
          </div>

          <div className="flex-grow"></div>
          <div className="flex gap-2 self-end">
            <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
            <span className="w-2 h-2 rounded-full bg-primary led-orange-glow animate-pulse"></span>
            <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
