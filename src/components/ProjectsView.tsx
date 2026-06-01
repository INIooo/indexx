import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Terminal, MousePointerClick, ShieldCheck, ChevronRight, Binary } from 'lucide-react';
import { DeployedModule } from '../types';

export default function ProjectsView() {
  const [filter, setFilter] = useState<'ALL_UNITS' | 'GAMES' | 'ENGINES' | 'UTILITIES'>('ALL_UNITS');

  const modules: DeployedModule[] = [
    {
      id: "my_guilty",
      num: "01 // GAME_ENGINE_BETA",
      category: "GAMES",
      tags: [],
      title: "My Guilty",
      description: "3D psychological narrative exploring deterministic recursion and guilt processing.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb75jDC0FDkvsXIuOXipBRHj4P2wr7rWMjSXmH3D0KGYd77Vg7aMMN2ogKb93chFQ1kd05EV5qKxfQwj8aUl-HlE5HEYBiG5bheuFCgErWHNeku7a57W1wNODlovR5MpBcafw3tyjUhFw8JPR-ZB9eCQbPuL9jH2Qip8WWHb8PphlKKhfb28GYzDfCA97fLvYX9BV6ydZbJLPJ3AtQG5HkHw0A45ph5dF0nX7JSUwjP0GHwHolYjcTexZ2R4_7EOA0QKp0WRa8L4Sq",
      ledStatus: ["orange", "orange", "dim"],
    },
    {
      id: "arpp2",
      num: "CORE_V2.0",
      category: "ENGINES",
      tags: [],
      title: "ARPP2",
      description: "Custom raytraced game engine optimized for low-latency hardware clusters and real-time volumetric lighting.",
      cpuEff: "88%",
      ledStatus: ["teal", "dim"],
    },
    {
      id: "iris_cam",
      num: "REC_SURVEILLANCE",
      category: "UTILITIES",
      tags: [],
      title: "Iris Cam",
      description: "AI pose tracking and biometric analysis system for real-time skeletal visualization.",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoOIAau6fD3H1GiKGHwx_B6WrqrchU9mvpf2xnBJCmcwUXpsxhOBFbSRnnwqIX1j4iPku8xNff52KNZrBuoD-SPBL1ypTAVfG4S8UQmWI2d1EbOp0Duwy4Ag_yFbcsoCdFApSB8E6knlx2FrbH7vmyr-EDZFAR_YWhsP6FVrbtM4yKZ20jNQNYv0DLIMP9dcdtT030EB_6N5ElKgc4cDbgeTDO_v4ovLBEXHXFhfNlI2aB1cdTF7OWHBt-QaWACTb7qISd_gGE2VIl",
      ledStatus: ["teal"],
    },
    {
      id: "s6_clicker",
      num: "WIN_X64 // MACOS_ARM",
      category: "UTILITIES",
      tags: ["WIN_X64", "MACOS_ARM"],
      title: "S6 Clicker",
      description: "Desktop utility suite for high-precision workflow automation and platform bridging.",
      ledStatus: [],
    },
    {
      id: "smart_waste",
      num: "HW-774-B // 94.2%",
      category: "UTILITIES",
      tags: [],
      title: "Smart Waste",
      description: "Custom hardware prototype for automated waste classification and neural-network based sorting.",
      modelId: "HW-774-B",
      accuracy: "94.2%",
      ledStatus: ["orange", "dim"],
    }
  ];

  const filteredModules = filter === 'ALL_UNITS' 
    ? modules 
    : modules.filter(m => m.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Tab Filter & Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-outline-variant/30">
        <div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-on-surface tracking-tighter uppercase mb-2">
            Deployed Modules
          </h1>
          <p className="font-mono text-xs font-bold text-on-surface-variant/70 uppercase tracking-widest">
            S_ID: ROHAN_P // STATUS: ONLINE // PROJECTS_ACTIVE: 05
          </p>
        </div>

        {/* Industrial Toggle Controls */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-surface-container-lowest rounded-lg border-2 border-outline-variant industrial-slot self-start md:self-end">
          {(['ALL_UNITS', 'GAMES', 'ENGINES', 'UTILITIES'] as const).map((cfg) => {
            const isActive = filter === cfg;
            return (
              <motion.button
                key={cfg}
                whileTap={{ y: 2 }}
                onClick={() => setFilter(cfg)}
                className={`px-4 py-2 font-label text-[10px] font-bold rounded uppercase transition-colors tracking-wider cursor-pointer ${
                  isActive 
                    ? "bg-primary text-on-primary shadow-md shadow-primary/20" 
                    : "text-on-surface-variant hover:bg-surface-container-highest"
                }`}
              >
                {cfg}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredModules.map((module) => {
            const isFullWidth = module.id === 'my_guilty';
            const colSpan = isFullWidth ? 'md:col-span-8' : 'md:col-span-4';

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, type: 'spring', damping: 20 }}
                key={module.id}
                className={`${colSpan} p-1 bg-surface-container-lowest rounded-xl industrial-slot flex `}
              >
                <div className="relative w-full bg-surface-container-high rounded-lg border border-outline-variant/60 overflow-hidden flex flex-col justify-between group">
                  {/* Bolt layout decorations */}
                  <div className="screw-head top-2.5 left-2.5"></div>
                  <div className="screw-head top-2.5 right-2.5"></div>
                  <div className="screw-head bottom-2.5 left-2.5"></div>
                  <div className="screw-head bottom-2.5 right-2.5"></div>

                  {/* Render based on project structure (Text-based card vs Image-based card) */}
                  {module.image ? (
                    <div className="flex flex-col h-full justify-between">
                      <div className="h-48 relative overflow-hidden bg-surface-dim">
                        <img
                          src={module.image}
                          alt={module.title}
                          className="w-full h-full object-cover opacity-65 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-container-high to-transparent"></div>
                        <div className="absolute inset-0 scanline opacity-10"></div>
                      </div>

                      <div className="p-6 pt-4 relative flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-primary tracking-widest block uppercase mb-1">
                            {module.num}
                          </span>
                          <h3 className="font-sans text-2xl font-bold text-on-surface uppercase mb-2">
                            {module.title}
                          </h3>
                          <p className="font-mono text-xs text-on-surface-variant leading-relaxed max-w-md">
                            {module.description}
                          </p>
                        </div>

                        {/* Interactive LED Status lights */}
                        <div className="flex gap-1.5 self-end">
                          {module.ledStatus.map((led, i) => (
                            <span 
                              key={i} 
                              className={`h-2.5 w-2.5 rounded-full ${
                                led === 'orange' ? 'bg-primary led-orange-glow' : 
                                led === 'teal' ? 'bg-secondary-container led-glow-secondary' : 
                                'bg-surface-container-highest'
                              }`}
                            ></span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 h-full flex flex-col justify-between relative">
                      {/* Accent highlight bar for module 5 */}
                      {module.id === 'smart_waste' && (
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-primary-container"></div>
                      )}

                      <div>
                        <div className="flex justify-between items-start mb-6 pt-2">
                          <div className="p-3 bg-surface-dim rounded border border-outline-variant/65 shadow-inner">
                            {module.id === 'arpp2' ? (
                              <Cpu className="w-8 h-8 text-primary" />
                            ) : module.id === 's6_clicker' ? (
                              <MousePointerClick className="w-8 h-8 text-on-surface-variant group-hover:text-primary transition-colors" />
                            ) : (
                              <Binary className="w-8 h-8 text-primary" />
                            )}
                          </div>

                          <span className="font-mono text-[10px] tracking-wider px-2 py-1 bg-surface-container-highest border border-outline-variant/50 rounded font-bold">
                            {module.id === 'arpp2' ? 'CORE_V2.0' : 'ACTIVE_NODE'}
                          </span>
                        </div>

                        <h3 className="font-sans text-2xl font-bold uppercase text-on-surface mb-2">
                          {module.title}
                        </h3>
                        <p className="font-mono text-xs text-on-surface-variant leading-relaxed mb-6">
                          {module.description}
                        </p>
                      </div>

                      {/* Render Stats components */}
                      {module.id === 'arpp2' && (
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="flex-grow h-2.5 bg-surface-dim rounded overflow-hidden shadow-inner border border-outline-variant/30">
                              <div className="h-full bg-secondary-container rounded-r shadow-[0_0_8px_#00f4fe]" style={{ width: '88%' }}></div>
                            </div>
                            <span className="font-mono text-xs text-secondary-container font-mono font-bold tracking-tight">88% CPU_EFF</span>
                          </div>

                          <div className="flex gap-1.5 pt-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-secondary-container led-glow-secondary"></span>
                            <span className="h-2.5 w-2.5 rounded-full bg-surface-container-highest"></span>
                          </div>
                        </div>
                      )}

                      {module.id === 's6_clicker' && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {module.tags.map((tag, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-surface-dim border border-outline-variant/60 rounded font-mono text-[10px] text-primary uppercase font-bold tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {module.id === 'smart_waste' && (
                        <div className="grid grid-cols-2 gap-3 mt-auto">
                          <div className="p-3 bg-surface-dim border border-outline-variant/50 rounded flex flex-col justify-between">
                            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Model_ID</span>
                            <span className="font-label text-xs text-primary font-bold">{module.modelId}</span>
                          </div>
                          <div className="p-3 bg-surface-dim border border-outline-variant/50 rounded flex flex-col justify-between">
                            <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider mb-1">Accuracy</span>
                            <span className="font-label text-xs text-secondary-fixed-dim font-bold">{module.accuracy}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
