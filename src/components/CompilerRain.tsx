import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { X, Cpu, Binary, ShieldAlert, Terminal } from 'lucide-react';

interface CompilerRainProps {
  onClose: () => void;
}

export default function CompilerRain({ onClose }: CompilerRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [compilerLines, setCompilerLines] = useState<string[]>([
    "INITIALIZING BYPASS CHAIN...",
    "HOOKING C++ STD::COMPILER ENGINE...",
    "GDSCRIPT VM CORE HIJACKED: SUCCESS",
    "DEVIATING PHYSICS BOUNDS: VOLUMETRIC COLLIDER OVERFLOW",
    "BYPASSING TRIAL HANDSHAKES..."
  ]);

  // Append new diagnostic lines at rapid fire speeds for matrix terminal feel
  useEffect(() => {
    const diagnosticPool = [
      "OVERCLOCKING CLUSTERS: 124.9% POTENCY",
      "VULKAN PIPELINE: DETACHING GRAPHICS BARRIERS",
      "OPENGL FRAMEBUFFER_UNBOUND_STATE EXOTIC EXPLOIT",
      "BREAKER STREAM: SEGFAULT DELIBERATELY RECTIFIED",
      "STACK CRASH PREEMPTED VIA STATIC HOOKS",
      "C++ COMPILER ERROR BYPASSED: TEMPLATE EXPANSION RECURSION INJECTED",
      "OPTIMIZATION LEVEL -O3 LOCKED & RE-COMPILING",
      "DOMINATION CONSTANT: ROHAN_CORE = TRUE",
      "DUMPING STACK SYMBOLS: 0xDEADBEEF // 0xCAFEBABE",
      "TREND_FOLLOWING: DISABLE_CONSTANT_FOR_CREATIVE_ARCHITECTS",
      "HARDWARE LOCKS DEACTIVATED"
    ];

    const logInterval = setInterval(() => {
      setCompilerLines(prev => {
        const next = [...prev, `[CORE_SYS] ${diagnosticPool[Math.floor(Math.random() * diagnosticPool.length)]}`];
        if (next.length > 12) next.shift();
        return next;
      });
    }, 450);

    return () => clearInterval(logInterval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters we will rain down (mix of binary, compiler words, GDScript/C++ statements)
    const columns = Math.floor(canvas.width / 16);
    const drops: number[] = Array(columns).fill(1);

    const characters = "01010101C++VULKANGDSCRIPTHACKBREAKCOMPILERROHAN15PRODIGYDOMINATION";

    const draw = () => {
      // translucent background to leave trailing effect
      ctx.fillStyle = 'rgba(10, 12, 16, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ff6e40'; // Primary brand theme or bright cyberpunk hyper orange
      ctx.font = '11px Courier New';

      for (let i = 0; i < drops.length; i++) {
        // Randomly choose green/orange/teal Matrix vibes
        if (Math.random() > 0.98) {
          ctx.fillStyle = '#ffb59c'; // Bright glow
        } else if (Math.random() > 0.8) {
          ctx.fillStyle = '#00f4fe'; // Cyan secondary
        } else {
          ctx.fillStyle = '#ff6e40'; // Core accent orange
        }

        const char = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(char, i * 16, drops[i] * 16);

        // Reset drop position or increment downwards
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col items-center justify-center font-mono">
      {/* Background Matrix Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full opacity-60 pointer-events-none" />

      {/* Retrospect Scanlines overlay */}
      <div className="absolute inset-0 scanline opacity-30 pointer-events-none"></div>

      {/* Retro mainframe floating box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -30 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-2xl bg-[#0e1014] border-2 border-primary border-double rounded-xl p-6 md:p-8 shadow-[0_0_50px_rgba(255,110,64,0.3)] metal-texture m-4"
      >
        {/* Screw decor in corners */}
        <div className="screw-head top-3 left-3 opacity-60"></div>
        <div className="screw-head top-3 right-3 opacity-60"></div>
        <div className="screw-head bottom-3 left-3 opacity-60"></div>
        <div className="screw-head bottom-3 right-3 opacity-60"></div>

        {/* Flashing danger header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b-2 border-primary/40 pb-4 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary animate-pulse">
              <ShieldAlert className="w-8 h-8 text-primary blinking-glow" />
            </div>
            <div>
              <h2 className="font-sans text-xl font-bold tracking-wider text-primary uppercase">
                COMPILER INTEGRITY OVERRIDE
              </h2>
              <p className="text-[10px] text-on-surface-variant/70 tracking-widest uppercase">
                BYPASS_LOCK_STATE: DEACTIVATED // SYSTEM_HACK_OK
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary/20 hover:bg-primary hover:text-on-primary transition-all text-primary font-label text-[10px] font-bold uppercase tracking-wider rounded border border-primary/50 cursor-pointer self-stretch md:self-auto flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" /> RE-ENGAGE DEFAULTS
          </button>
        </div>

        {/* Secret Manifest read out */}
        <div className="space-y-6">
          <div className="p-4 bg-black/80 rounded border border-primary/30 shadow-inner">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-3 border-b border-primary/25 pb-1">
              <Terminal className="w-4 h-4" />
              <span>OVERCLOCKING REPORT // ARCHITECT: ROHAN PATIL</span>
            </div>
            <p className="text-sm text-on-surface leading-relaxed uppercase">
              "While you were following tutorials, I was breaking the compilers. 6 Years deep into C++, GDScript, and digital domination. I don't follow trends; I build the engines they run on."
            </p>
          </div>

          {/* Rapid compilation diagnostic panel */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant">
              <span>EXPLOSIVE INTEGRATION OVERRIDE PROGRESS:</span>
              <span className="text-secondary-fixed animate-pulse">OPTIMIZED (99.9%)</span>
            </div>
            <div className="h-2 bg-black rounded overflow-hidden border border-primary/20">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "99.9%" }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary-container rounded-r"
              ></motion.div>
            </div>
          </div>

          {/* Terminal stream console readout */}
          <div className="bg-black text-[10px] p-4 rounded h-36 font-mono text-primary/80 overflow-y-auto space-y-1.5 shadow-inner leading-normal select-text scrollbar-hide border border-primary/10">
            {compilerLines.map((log, idx) => (
              <div key={idx} className="capitalize">
                ⚡ {log}
              </div>
            ))}
          </div>
        </div>

        {/* Secret specs footer */}
        <div className="mt-6 pt-4 border-t border-primary/25 flex flex-col sm:flex-row justify-between items-center text-[9px] text-[#ffb59c] gap-2 font-mono uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span>ROHAN_CORE_V1.5 // LOCK: BYPASSED</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Binary className="w-3.5 h-3.5 text-secondary-container" />
            <span>EXPLOIT PATHWAY: SOLID HANDSHAKE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
