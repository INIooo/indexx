import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Mail, Settings, Briefcase, Cpu, LucideIcon } from 'lucide-react';
import { TabType } from '../types';

interface HomeViewProps {
  onTabChange: (tab: TabType) => void;
}

export default function HomeView({ onTabChange }: HomeViewProps) {
  // Simulator for performance monitor
  const [coreLoadMs, setCoreLoadMs] = useState(0.42);
  const [barHeights, setBarHeights] = useState<number[]>([40, 60, 80, 100, 95, 50, 30, 20]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCoreLoadMs(parseFloat((Math.random() * 0.3 + 0.3).toFixed(2)));
      setBarHeights(prev => prev.map(() => Math.floor(Math.random() * 80 + 20)));
    }, 400);

    return () => clearInterval(timer);
  }, []);

  const bentoProjects = [
    {
      id: "project_03",
      code: "FEATURED_PROJECT",
      title: "GHOST_SHELL",
      desc: "AI-driven NPC behavior system using hierarchical task networks.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0VnIvDmmi3tXG5G1xeO10uGhYz91dUUoh9dkypDyVqzsp5ytG85_F5JgzXyPI_B2Ejy2J2OED3_56_FfpLsyl9Kk-IUtVQO16CcTaJiQwAY-H0yuYZu0IzApgWyxbtJXEq4phrfLpJRB1LGralyd9OsMx3xI71Zy8r7Wa9pCid4F3Z7z6FCpRav_hMfM7QO1PIUP9iap45fipClFQK3_mrUoRcVzAi_ow9pudCflj_FxJV5yuvU7ruPveiMv_l3v_gKiDsAyxP6U6",
      badgeClass: "bg-primary text-on-primary",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Decorative Mechanical Chassis */}
      <div className="relative border border-outline-variant/30 tactile-raised rounded-xl p-4 md:p-8 overflow-hidden hex-grid">
        {/* Aesthetic screws in corners */}
        <div className="screw-head top-4 left-4"></div>
        <div className="screw-head top-4 right-4"></div>
        <div className="screw-head bottom-4 left-4"></div>
        <div className="screw-head bottom-4 right-4"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          {/* Hero Identity Console */}
          <div className="lg:col-span-8 space-y-6">
            <div className="recessed-panel rounded-lg p-6 md:p-8 border border-outline-variant/20 relative overflow-hidden">
              <div className="scanline absolute inset-0 opacity-15"></div>

              <div className="flex items-center gap-3 mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary led-orange-glow"></span>
                </span>
                <span className="font-label text-xs font-bold text-primary tracking-widest">SYSTEM_ACTIVE</span>
              </div>

              <h1 className="font-sans text-5xl md:text-6xl font-bold text-on-surface tracking-tighter uppercase mb-4">
                Rohan Patil
              </h1>

              <div className="border-l-4 border-primary pl-4 mb-8">
                <p className="font-label text-xs md:text-sm font-bold uppercase tracking-wider text-on-surface-variant leading-none">
                  15 Years Old // C++ GDScript Specialist
                </p>
              </div>

              <p className="font-mono text-base md:text-lg text-on-surface/90 leading-relaxed max-w-3xl">
                "While you were following tutorials, I was breaking the compilers. 6 Years deep into C++, GDScript, and digital domination. I don't follow trends; I build the engines they run on."
              </p>
            </div>

            {/* Micro-Interaction Mechanical Switches / Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileTap={{ y: 2 }}
                onClick={() => onTabChange('PROJECTS')}
                className="tactile-raised px-8 py-4 rounded-lg flex items-center gap-3 border border-outline-variant/30 hover:border-primary/50 group transition-all text-label-caps cursor-pointer"
              >
                <Cpu className="w-5 h-5 text-primary group-hover:scale-105 transition-transform" />
                <span>VIEW_PROJECTS</span>
              </motion.button>

              <motion.button
                whileTap={{ y: 2 }}
                onClick={() => onTabChange('CONTACT')}
                className="recessed-panel hover:bg-surface-container-high px-8 py-4 rounded-lg flex items-center gap-3 border border-outline-variant/20 group transition-all text-label-caps cursor-pointer"
              >
                <Mail className="w-5 h-5 text-secondary group-hover:scale-105 transition-transform" />
                <span className="text-secondary">CONTACT_ME</span>
              </motion.button>
            </div>
          </div>

          {/* Core Secondary Display Widgets */}
          <div className="lg:col-span-4 space-y-6">
            {/* Performance Core Load Indicator Widget */}
            <div className="tactile-raised rounded-lg p-6 border border-outline-variant/30 relative">
              <div className="flex justify-between items-center mb-4 font-mono text-xs">
                <span className="text-on-surface-variant font-bold uppercase">ENGINE_CORE_LOAD</span>
                <span className="text-primary font-bold">{coreLoadMs}ms</span>
              </div>

              <div className="h-14 recessed-panel rounded flex items-center px-4 gap-1.5 overflow-hidden">
                {barHeights.map((height, i) => {
                  let opacityClass = "bg-primary/20";
                  if (height > 75) opacityClass = "bg-primary led-orange-glow";
                  else if (height > 50) opacityClass = "bg-primary/70";
                  else if (height > 30) opacityClass = "bg-primary/40";

                  return (
                    <motion.div
                      key={i}
                      animate={{ height: `${height}%` }}
                      transition={{ type: 'spring', damping: 15 }}
                      className={`h-10 w-2.5 rounded-sm transition-colors ${opacityClass}`}
                    ></motion.div>
                  );
                })}
              </div>
            </div>

            {/* Tech Stack CFG Terminal Widget */}
            <div className="recessed-panel rounded-lg p-6 border border-outline-variant/20 min-h-[260px] flex flex-col justify-between">
              <div>
                <h3 className="font-label text-xs font-bold text-on-surface mb-6 border-b border-outline-variant/45 pb-2">
                  TECH_STACK.CFG
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface/90 font-medium">C++ / VULKAN</span>
                    <span className="h-2 w-2 rounded-full bg-secondary-container led-glow-secondary"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface/90 font-medium font-mono">UNREAL ENGINE 5</span>
                    <span className="h-2 w-2 rounded-full bg-primary led-orange-glow"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface/90 font-medium font-mono">PYTHON / PYTORCH</span>
                    <span className="h-2 w-2 rounded-full bg-secondary-container led-glow-secondary"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface/90 font-medium font-mono">RUST / WASM</span>
                    <span className="h-2 w-2 rounded-full bg-primary led-glow-primary"></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 opacity-40">
                <div className="grid grid-cols-8 gap-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-1 bg-on-surface-variant rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {bentoProjects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              whileHover={{ y: -4 }}
              className="tactile-raised rounded-xl overflow-hidden group cursor-pointer border border-outline-variant/30 flex flex-col h-full md:col-start-2"
              onClick={() => onTabChange('PROJECTS')}
            >
              <div className="h-48 relative overflow-hidden bg-surface-container-lowest">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient shader */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent"></div>

                {/* Cyberpunk project index badge */}
                <span className={`absolute bottom-4 left-4 font-label text-[10px] font-bold px-2.5 py-1 uppercase tracking-wider rounded ${proj.badgeClass}`}>
                  {proj.code}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h4 className="font-sans text-xl font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors mb-2 uppercase">
                    {proj.title}
                  </h4>
                  <p className="font-mono text-xs text-on-surface-variant leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
