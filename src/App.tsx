import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Settings, Sliders, Play, Share2, Shield, X, RefreshCw, Bot, Sparkles } from 'lucide-react';
import { TabType } from './types';
import HomeView from './components/HomeView';
import ProjectsView from './components/ProjectsView';
import LabView from './components/LabView';
import ContactView from './components/ContactView';
import CompilerRain from './components/CompilerRain';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('HOME');

  // Terminal, Chatbot, & Settings Overlay states
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const [isCompilerRainActive, setIsCompilerRainActive] = useState(false);
  const [headerClicks, setHeaderClicks] = useState(0);
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp: string }>>([
    { 
      text: "SYSTEM_CONNECTED. COGNITIVE COPROCESSOR V3.5 ONLINE.\n\n" +
            "I am Rohan's custom AI Representative. Ask me about custom Vulkan/OpenGL renderers, compiler breaking exploits, modern GDScript frameworks, 3D logic pipelines, or low-level performance hacks.\n\n" +
            "How can I assist your terminal transaction today?", 
      sender: 'bot', 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);

  const handleSendChatMessage = async (msgText: string) => {
    if (!msgText.trim()) return;

    const normalizedText = msgText.trim().toLowerCase();

    // /bypass command is a direct chatbot easter egg
    if (normalizedText === '/bypass') {
      const userMsg = {
        text: msgText,
        sender: 'user' as const,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [
        ...prev, 
        userMsg,
        {
          text: "BYPASS TOKEN ACCEPTED.\n\nENGAGING EXPERIMENTAL CORE COMPILER INTENDED CHASSIS RAID...",
          sender: 'bot' as const,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsChatTyping(true);
      setTimeout(() => {
        setIsChatTyping(false);
        setIsCompilerRainActive(true);
        setSecretUnlocked(true);
      }, 1000);
      return;
    }

    const userMsg = {
      text: msgText,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatTyping(true);

    try {
      const history = chatMessages.slice(-8).map(m => ({
        text: m.text,
        sender: m.sender
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText, history }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Coprocessor core transaction failed.");
      }

      const data = await res.json();
      
      setChatMessages(prev => [...prev, {
        text: data.reply,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      console.error(err);
      setChatMessages(prev => [...prev, {
        text: `CORE_ERROR: ${err.message || "Failed to route uplink through satellite node."}`,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatTyping(false);
    }
  };
  
  // Custom interactive setting parameters
  const [cpuThrottle, setCpuThrottle] = useState(10);
  const [hologramBrightness, setHologramBrightness] = useState(85);
  const [ledStability, setLedStability] = useState(100);

  // Shell Logs
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "BOOT: DEV_CORE_OS_V1.0 INITIALIZING...",
    "SYS_OK: ALL OPTICAL SUBSYSTEMS REPORTING GREEN",
    "NET_OK: ESTABLISHED MULTI-CHANNEL LINK WITH PORT 3000"
  ]);

  useEffect(() => {
    if (isTerminalOpen) {
      const logOptions = [
        "SYS_MONITOR: TEMP UNIT CORE AT 42C",
        "IO_STREAM: DETECTED SEAMLESS REACTION ON TACTILE KNOBS",
        "NET_ROUTING: OPTIMIZING LOCAL BENGALURU LATENCY CLUSTER...",
        "SYS_DIAG: SYNCHRONIZING WITH GITHUB AND LINKEDIN CLOUDS",
        "CPU_CYCLE: DISPATCHING CHASSIS CALIBRATING PULSES..."
      ];

      const interval = setInterval(() => {
        const randomLog = logOptions[Math.floor(Math.random() * logOptions.length)];
        setTerminalLogs(prev => [...prev.slice(-15), `[SYSTEM] ${randomLog}`]);
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isTerminalOpen]);

  const addTerminalCommand = (cmd: string) => {
    setTerminalLogs(prev => [...prev, `user_core@os:~$ ${cmd.toUpperCase()}`]);
    
    setTimeout(() => {
      const normalizedCmd = cmd.trim().toLowerCase();
      if (normalizedCmd === 'help') {
        setTerminalLogs(prev => [...prev, "AVAILABLE SYS_CMDS: HELP, SYS_PING, REBOOT, STATUS, SECRET, BREAK_COMPILER"]);
      } else if (normalizedCmd === 'sys_ping') {
        setTerminalLogs(prev => [...prev, "UPLINK CALIBRATION: PONG! RTT IS 12MS"]);
      } else if (normalizedCmd === 'status') {
        setTerminalLogs(prev => [...prev, `SYS_STATE: STABLE // CORE_FREQ: 4.8GHZ // LED_STABILITY: ${ledStability}%`]);
      } else if (normalizedCmd === 'reboot') {
        setTerminalLogs(prev => [...prev, "WARPING MEMORY SPACE CHASSIS...", "REBOOT SUCCESSFULLY COMPLETED."]);
      } else if (['hack', 'break', 'break_compiler', 'overclock', 'matrix', 'domination'].includes(normalizedCmd)) {
        setTerminalLogs(prev => [...prev, "SYS_ALERT: DE-SYNCHRONIZATION SEQUENCING CORES ENGAGED. LAUNCHING CHASSIS OVERRIDE..."]);
        setTimeout(() => {
          setIsCompilerRainActive(true);
          setSecretUnlocked(true);
        }, 1200);
      } else if (['secret', 'easter', 'egg', 'eggs'].includes(normalizedCmd)) {
        setTerminalLogs(prev => [
          ...prev, 
          "--- SECURITY INTERFACE BYPASS DECRYPTED ---",
          "EASTER_EGG_NODE_01: CLICK ON THE TOP 'DEV_CORE_OS_V1.0' BRAND LOGO 5 TIMES.",
          "EASTER_EGG_NODE_02: RUN CMD 'BREAK_COMPILER' TO ENGAGE MAXIMUM POWER SCREENAVER INTRUSION.",
          "EASTER_EGG_NODE_03: IN THE CHATBOT, ASK TO EXPLODE COMPILERS OR TYPE '/BYPASS'.",
          "-------------------------------------------"
        ]);
      } else {
        setTerminalLogs(prev => [...prev, "SYS_ERR: COMMAND SYLLABLE NOT RECOGNIZED. TYPE 'HELP' FOR ALL MATRIX INTEGRITY COMMANDS."]);
      }
    }, 400);
  };

  const handleLogoClick = () => {
    const nextClicks = headerClicks + 1;
    setHeaderClicks(nextClicks);
    if (nextClicks >= 5) {
      setIsCompilerRainActive(true);
      setTerminalLogs(prev => [...prev, "[OVERRIDE] HARDWARE EXPLOIT ENFORCE_SUCCESS: COGNITIVE OVERRIDE LAUNCHED."]);
      setHeaderClicks(0);
      setSecretUnlocked(true);
    } else {
      setTerminalLogs(prev => [...prev.slice(-15), `[SECURITY] BRAND EXPLOIT HANDSHAKE: ${nextClicks}/5. KEEP TAPPING DEV CORE BRAND.`]);
      setIsTerminalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-surface-custom text-on-surface flex flex-col font-mono relative overflow-x-hidden hex-grid select-none pb-12">
      {/* Absolute floating atmospheric backdrop layout glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-container/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* FIXED RETRO TOP HEADER NAVIGATION */}
      <header className="fixed top-0 w-full z-40 border-b-2 border-outline-variant bg-surface-container-high/90 backdrop-blur shadow-[0_4px_12px_rgba(0,0,0,0.55)]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          {/* Logo brand label */}
          <div 
            onClick={handleLogoClick}
            className="font-sans text-xl md:text-2xl font-bold text-primary tracking-tighter uppercase cursor-pointer select-none active:scale-95 transition-transform hover:brightness-110 flex items-center gap-1.5"
          >
            DEV_CORE_OS_V1.0
            {secretUnlocked && <Sparkles className="w-4 h-4 text-secondary-fixed animate-spin" />}
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex gap-8 items-center">
            {(['HOME', 'PROJECTS', 'LAB', 'CONTACT'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative font-label text-[10px] font-bold tracking-widest pb-1 transition-colors hover:text-on-surface cursor-pointer ${
                    isActive ? "text-primary active-glow" : "text-on-surface-variant"
                  }`}
                >
                  {tab}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded shadow-[0_0_8px_#ffb59c]"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick chassis adjustments triggers */}
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => {
                setIsChatOpen(!isChatOpen);
                setIsTerminalOpen(false);
                setIsSettingsOpen(false);
              }}
              title="Toggle Cognitive Coprocessor AI Chatbot"
              className={`p-2.5 rounded hover:bg-surface-container-highest active:translate-y-0.5 transition-all cursor-pointer ${
                isChatOpen ? 'text-primary bg-surface-dim border border-outline-variant/40 shadow-inner' : 'text-on-surface-variant'
              }`}
            >
              <Bot className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setIsTerminalOpen(!isTerminalOpen);
                setIsChatOpen(false);
                setIsSettingsOpen(false);
              }}
              title="Toggle Web Shell TerminalLogs"
              className={`p-2.5 rounded hover:bg-surface-container-highest active:translate-y-0.5 transition-all cursor-pointer ${
                isTerminalOpen ? 'text-primary bg-surface-dim border border-outline-variant/40 shadow-inner' : 'text-on-surface-variant'
              }`}
            >
              <Terminal className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setIsSettingsOpen(!isSettingsOpen);
                setIsTerminalOpen(false);
                setIsChatOpen(false);
              }}
              title="Toggle Hardware Settings Configs"
              className={`p-2.5 rounded hover:bg-surface-container-highest active:translate-y-0.5 transition-all cursor-pointer ${
                isSettingsOpen ? 'text-primary bg-surface-dim border border-outline-variant/40 shadow-inner' : 'text-on-surface-variant'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION SLAT */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-surface-container-high border-t border-outline-variant z-40 p-2 flex justify-around">
        {(['HOME', 'PROJECTS', 'LAB', 'CONTACT'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center p-2 font-label text-[9px] font-bold tracking-wider ${
                isActive ? "text-primary" : "text-on-surface-variant"
              }`}
            >
              <span>{tab}</span>
              {isActive && <span className="h-1 w-4 bg-primary rounded-full mt-1 shadow-[0_0_5px_#ffb59c]"></span>}
            </button>
          );
        })}
      </div>

      {/* MAIN RACK GRID CHASSIS FRAME */}
      <main className="flex-grow pt-28 pb-16 px-4 md:px-12 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === 'HOME' && (
            <motion.div key="home" className="w-full">
              <HomeView onTabChange={setActiveTab} />
            </motion.div>
          )}
          {activeTab === 'PROJECTS' && (
            <motion.div key="projects" className="w-full">
              <ProjectsView />
            </motion.div>
          )}
          {activeTab === 'LAB' && (
            <motion.div key="lab" className="w-full">
              <LabView />
            </motion.div>
          )}
          {activeTab === 'CONTACT' && (
            <motion.div key="contact" className="w-full">
              <ContactView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CHASSIS RETRO TERMINAL LOGS POPUP (Interactive Terminal widget) */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-6 w-96 bg-surface-container-lowest border-2 border-outline-variant/80 rounded-xl shadow-2xl overflow-hidden z-50 p-4 font-mono text-xs text-on-surface flex flex-col space-y-4"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
              <span className="font-label text-[10px] font-bold text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary led-orange-glow animate-pulse"></span>
                ACTIVE LOG TERMINAL_V1.0
              </span>
              <button onClick={() => setIsTerminalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-48 overflow-y-auto bg-black rounded p-3 text-[10px] leading-normal font-mono text-on-surface-variant/95 space-y-2.5 shadow-inner select-text scrollbar-hide">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="break-all capitalize">
                  {log}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-black rounded border border-outline-variant/40 px-3 py-1 text-[11px]">
              <span className="text-primary-container font-bold">$</span>
              <input 
                type="text" 
                placeholder="TYPE 'HELP', 'STATUS', 'SYS_PING'..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value;
                    if (val.trim()) {
                      addTerminalCommand(val.trim());
                      e.currentTarget.value = '';
                    }
                  }
                }}
                className="bg-transparent border-none outline-none focus:ring-0 text-primary w-full lowercase font-mono placeholders:text-outline-variant/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COGNITIVE COPROCESSOR AI CHATBOT DRAWER */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-16 right-6 w-[360px] md:w-[420px] bg-surface-container border-2 border-primary/50 rounded-xl shadow-2xl overflow-hidden z-50 p-4 font-mono text-xs text-on-surface flex flex-col h-[520px] shadow-[0_12px_32px_rgba(0,0,0,0.7)]"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-primary/30 pb-3">
              <span className="font-label text-[10px] font-bold text-primary flex items-center gap-2 font-sans">
                <Bot className="w-4 h-4 led-orange-glow" />
                COGNITIVE_COPROCESSOR_V3.5
              </span>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary led-orange-glow animate-pulse"></span>
                <button onClick={() => setIsChatOpen(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat History Messages Stream */}
            <div className="flex-grow overflow-y-auto bg-black/40 rounded p-3 mt-3 mb-3 space-y-4 select-text">
              {chatMessages.map((msg, idx) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div key={idx} className={`flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1`}>
                    <div className="flex items-center gap-2 text-[9px] font-bold text-on-surface-variant">
                      <span>{isBot ? 'BOT_COPROCESSOR' : 'USER_DOCK'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div 
                      className={`max-w-[85%] rounded px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                        isBot 
                          ? 'bg-surface-container-high border-l-2 border-primary text-on-surface font-mono' 
                          : 'bg-primary/20 border-r-2 border-primary text-primary font-mono'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                );
              })}
              
              {isChatTyping && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="text-[9px] font-bold text-primary animate-pulse flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary led-orange-glow animate-ping"></span>
                    <span>COPROCESSOR THREAD RUNNING...</span>
                  </div>
                  <div className="bg-surface-container-high border-l-2 border-primary/50 text-on-surface-variant font-mono rounded px-3 py-1.5 text-xs animate-pulse">
                    ⚡ COMPILER PROCESS STREAM SYNCING...
                  </div>
                </div>
              )}
            </div>

            {/* Text Input Terminal Console */}
            <div className="flex items-center gap-2 bg-black rounded border border-primary/40 px-3 py-2">
              <span className="text-primary font-bold">{`>>>`}</span>
              <input 
                type="text" 
                placeholder="PROMPT REPRESENTATIVE CORE..." 
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const val = e.currentTarget.value;
                    if (val.trim()) {
                      handleSendChatMessage(val.trim());
                      e.currentTarget.value = '';
                    }
                  }
                }}
                className="bg-transparent border-none outline-none focus:ring-0 text-on-surface text-xs w-full uppercase font-mono placeholder:text-outline-variant/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHASSIS HARDWARE SETTINGS ADJUSTER SLEEVE */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-20 right-6 w-80 bg-surface-container border-2 border-outline-variant rounded-xl shadow-2xl overflow-hidden z-50 p-5 space-y-6"
          >
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
              <span className="font-label text-[10px] font-bold text-secondary flex items-center gap-2 uppercase">
                <Sliders className="w-4 h-4" />
                SYSTEM_CFG_MODIFIERS
              </span>
              <button onClick={() => setIsSettingsOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Parameter range selector 1 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold text-on-surface-variant">CPU_THROTTLE_LOCK</span>
                  <span className="text-primary">{cpuThrottle}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={cpuThrottle} 
                  onChange={(e) => setCpuThrottle(parseInt(e.target.value))}
                  className="w-full accent-primary bg-surface-dim rounded cursor-pointer"
                />
              </div>

              {/* Parameter range selector 2 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold text-on-surface-variant">HOLOGRAM_GAIN</span>
                  <span className="text-secondary-fixed">{hologramBrightness}db</span>
                </div>
                <input 
                  type="range" 
                  min="20" 
                  max="100" 
                  value={hologramBrightness} 
                  onChange={(e) => setHologramBrightness(parseInt(e.target.value))}
                  className="w-full accent-secondary bg-surface-dim rounded cursor-pointer"
                />
              </div>

              {/* Parameter range selector 3 */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px]">
                  <span className="font-bold text-on-surface-variant">LED_STABILITY</span>
                  <span className="text-primary">{ledStability}%</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={ledStability} 
                  onChange={(e) => setLedStability(parseInt(e.target.value))}
                  className="w-full accent-primary bg-surface-dim rounded cursor-pointer"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setCpuThrottle(10);
                setHologramBrightness(85);
                setLedStability(100);
                setTerminalLogs(prev => [...prev, "[RESET] CONFIGURATION REVERTED TO OUT-OF-BOX INDUSTRIAL STOCK."]);
              }}
              className="w-full bg-surface-container-highest font-label text-[9px] font-bold py-2.5 rounded border border-outline-variant flex items-center justify-center gap-2 hover:bg-surface-bright active:translate-y-0.5"
            >
              <RefreshCw className="w-3" />
              RESTORE_HARDWARE_DEFAULTS
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPILER OVERRIDE MATRIX EASTER EGG SCREENSAVER */}
      <AnimatePresence>
        {isCompilerRainActive && (
          <CompilerRain onClose={() => setIsCompilerRainActive(false)} />
        )}
      </AnimatePresence>

      {/* CONTINUAL RETRO SOLID FOOTER METADATA PANEL */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface-container-lowest/90 backdrop-blur border-t-2 border-outline-variant z-30 py-3 block md:flex justify-between items-center px-6 md:px-12 gap-8 shadow-[0_-4px_12px_rgba(0,0,0,0.45)]">
        <div className="font-label text-[10px] font-bold text-on-surface-variant text-center md:text-left">
          SYSTEM_STABLE // REV_2024.04
        </div>

        {/* Port channels */}
        <div className="flex gap-6 justify-center py-2 md:py-0 font-mono text-[10px] uppercase font-semibold">
          <span className="text-on-surface-variant/40 hover:text-secondary-fixed transition-colors cursor-crosshair">ST-PORT_01</span>
          <span className="text-on-surface-variant/40 hover:text-secondary-fixed transition-colors cursor-crosshair">ST-PORT_02</span>
          <span className="text-on-surface-variant/40 hover:text-secondary-fixed transition-colors cursor-crosshair">ST-PORT_03</span>
        </div>

        <div className="flex items-center gap-2 justify-center md:justify-end">
          <span className="h-2 w-2 rounded-full bg-secondary-container led-glow-secondary"></span>
          <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-on-surface-variant/75">
            CONNECTION_SECURE
          </span>
        </div>
      </footer>
    </div>
  );
}
