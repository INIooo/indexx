// State variables
let activeTab = 'HOME';
let isTerminalOpen = false;
let isSettingsOpen = false;
let isChatOpen = false;
let isCompilerRainActive = false;
let headerClicks = 0;
let secretUnlocked = false;

// Slider States (init with defaults)
let cpuThrottle = 10;
let hologramBrightness = 85;
let ledStability = 100;

// Chatbot messages history
let chatMessages = [
  {
    text: "SYSTEM_CONNECTED. COGNITIVE COPROCESSOR V3.5 ONLINE.\n\n" +
          "I am Rohan's custom AI Representative. Ask me about custom Vulkan/OpenGL renderers, compiler breaking exploits, modern GDScript frameworks, 3D logic pipelines, or low-level performance hacks.\n\n" +
          "How can I assist your terminal transaction today?",
    sender: 'bot',
    timestamp: getCurrentTime()
  }
];

// Terminal logs
let terminalLogs = [
  "BOOT: 021211 INITIALIZING...",
  "SYS_OK: ALL OPTICAL SUBSYSTEMS REPORTING GREEN",
  "NET_OK: ESTABLISHED MULTI-CHANNEL LINK WITH PORT 3000"
];

// VU meters states
let vuLevels = {
  godot: 95,
  unity: 88,
  blender: 75,
  kotlin: 92,
  python: 80
};
let vuManualOverride = {
  godot: false,
  unity: false,
  blender: false,
  kotlin: false,
  python: false
};

// DOM ready initialization
window.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSettings();
  initTerminal();
  initChat();
  initContactForm();
  initVUMeters();
  initDailyStatus();
  startGlobalSimulators();
});

// Helper for formatted time
function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ----------------------------------------------------
// TAB NAVIGATION
// ----------------------------------------------------
function initNavigation() {
  const tabs = ['HOME', 'PROJECTS', 'LAB', 'CONTACT'];
  
  // Header Desktop Nav Buttons
  tabs.forEach(tab => {
    const btn = document.getElementById(`nav-btn-${tab.toLowerCase()}`);
    if (btn) {
      btn.addEventListener('click', () => switchTab(tab));
    }
  });

  // Mobile Bottom Nav Buttons
  tabs.forEach(tab => {
    const btn = document.getElementById(`mobile-nav-btn-${tab.toLowerCase()}`);
    if (btn) {
      btn.addEventListener('click', () => switchTab(tab));
    }
  });

  // Home Page Bento Button Redirects
  const btnProjRedirect = document.getElementById('bento-btn-projects');
  if (btnProjRedirect) {
    btnProjRedirect.addEventListener('click', () => switchTab('PROJECTS'));
  }
  const btnContactRedirect = document.getElementById('bento-btn-contact');
  if (btnContactRedirect) {
    btnContactRedirect.addEventListener('click', () => switchTab('CONTACT'));
  }

  // Developer Logo clicks easter egg trigger
  const logo = document.getElementById('header-logo');
  if (logo) {
    logo.addEventListener('click', () => {
      headerClicks++;
      if (headerClicks >= 5) {
        triggerCompilerRain();
        addTerminalLog("[OVERRIDE] HARDWARE EXPLOIT ENFORCE_SUCCESS: COGNITIVE OVERRIDE LAUNCHED.");
        headerClicks = 0;
        unlockSecret();
      } else {
        addTerminalLog(`[SECURITY] BRAND EXPLOIT HANDSHAKE: ${headerClicks}/5. KEEP TAPPING DEV CORE BRAND.`);
        openTerminalPopup();
      }
    });
  }
}

function switchTab(tab) {
  activeTab = tab;
  
  // Update desktop classes
  document.querySelectorAll('nav button').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`nav-btn-${tab.toLowerCase()}`);
  if (activeBtn) activeBtn.classList.add('active');

  // Update mobile classes
  document.querySelectorAll('.md\\:hidden button').forEach(btn => {
    btn.classList.remove('text-primary');
    btn.classList.add('text-on-surface-variant');
    const indicator = btn.querySelector('.h-1');
    if (indicator) indicator.classList.add('hidden');
  });
  const activeMobileBtn = document.getElementById(`mobile-nav-btn-${tab.toLowerCase()}`);
  if (activeMobileBtn) {
    activeMobileBtn.classList.add('text-primary');
    activeMobileBtn.classList.remove('text-on-surface-variant');
    const indicator = activeMobileBtn.querySelector('.h-1');
    if (indicator) indicator.classList.remove('hidden');
  }

  // Show/hide view content containers
  document.querySelectorAll('.tab-content').forEach(view => {
    view.classList.remove('active');
  });
  const activeView = document.getElementById(`view-${tab.toLowerCase()}`);
  if (activeView) activeView.classList.add('active');
}

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------
function initSettings() {
  const btnToggle = document.getElementById('tool-btn-settings');
  const popup = document.getElementById('settings-popup');
  const btnClose = document.getElementById('settings-close');

  btnToggle.addEventListener('click', () => {
    isSettingsOpen = !isSettingsOpen;
    if (isSettingsOpen) {
      isTerminalOpen = false;
      isChatOpen = false;
      syncPopupsState();
    }
    btnToggle.classList.toggle('active', isSettingsOpen);
    popup.classList.toggle('open', isSettingsOpen);
  });

  btnClose.addEventListener('click', () => {
    isSettingsOpen = false;
    btnToggle.classList.remove('active');
    popup.classList.remove('open');
  });

  // Slider inputs mapping
  const sliderCpu = document.getElementById('slider-cpu');
  const labelCpu = document.getElementById('label-cpu');
  sliderCpu.addEventListener('input', (e) => {
    cpuThrottle = parseInt(e.target.value);
    labelCpu.textContent = `${cpuThrottle}%`;
    document.documentElement.style.setProperty('--cpu-throttle', `${cpuThrottle}%`);
  });

  const sliderHolo = document.getElementById('slider-holo');
  const labelHolo = document.getElementById('label-holo');
  sliderHolo.addEventListener('input', (e) => {
    hologramBrightness = parseInt(e.target.value);
    labelHolo.textContent = `${hologramBrightness}db`;
    document.documentElement.style.setProperty('--hologram-brightness', hologramBrightness / 100);
  });

  const sliderLed = document.getElementById('slider-led');
  const labelLed = document.getElementById('label-led');
  sliderLed.addEventListener('input', (e) => {
    ledStability = parseInt(e.target.value);
    labelLed.textContent = `${ledStability}%`;
    document.documentElement.style.setProperty('--led-stability', ledStability / 100);
  });

  const btnReset = document.getElementById('settings-reset-btn');
  btnReset.addEventListener('click', () => {
    cpuThrottle = 10;
    hologramBrightness = 85;
    ledStability = 100;
    
    sliderCpu.value = 10;
    labelCpu.textContent = '10%';
    document.documentElement.style.setProperty('--cpu-throttle', '10%');

    sliderHolo.value = 85;
    labelHolo.textContent = '85db';
    document.documentElement.style.setProperty('--hologram-brightness', '0.85');

    sliderLed.value = 100;
    labelLed.textContent = '100%';
    document.documentElement.style.setProperty('--led-stability', '1');

    addTerminalLog("[RESET] CONFIGURATION REVERTED TO OUT-OF-BOX INDUSTRIAL STOCK.");
  });
}

function syncPopupsState() {
  document.getElementById('tool-btn-settings').classList.toggle('active', isSettingsOpen);
  document.getElementById('settings-popup').classList.toggle('open', isSettingsOpen);

  document.getElementById('tool-btn-terminal').classList.toggle('active', isTerminalOpen);
  document.getElementById('terminal-popup').classList.toggle('open', isTerminalOpen);

  document.getElementById('tool-btn-chat').classList.toggle('active', isChatOpen);
  document.getElementById('chat-popup').classList.toggle('open', isChatOpen);
}

// ----------------------------------------------------
// TERMINAL LOG PANEL
// ----------------------------------------------------
function initTerminal() {
  const btnToggle = document.getElementById('tool-btn-terminal');
  const popup = document.getElementById('terminal-popup');
  const btnClose = document.getElementById('terminal-close');
  const terminalInput = document.getElementById('terminal-console-input');

  btnToggle.addEventListener('click', () => {
    isTerminalOpen = !isTerminalOpen;
    if (isTerminalOpen) {
      isSettingsOpen = false;
      isChatOpen = false;
      syncPopupsState();
      setTimeout(() => terminalInput.focus(), 50);
    }
    btnToggle.classList.toggle('active', isTerminalOpen);
    popup.classList.toggle('open', isTerminalOpen);
  });

  btnClose.addEventListener('click', () => {
    isTerminalOpen = false;
    btnToggle.classList.remove('active');
    popup.classList.remove('open');
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value.trim();
      if (val) {
        executeTerminalCommand(val);
        terminalInput.value = '';
      }
    }
  });

  renderTerminalLogs();
}

function openTerminalPopup() {
  isTerminalOpen = true;
  isSettingsOpen = false;
  isChatOpen = false;
  syncPopupsState();
}

function addTerminalLog(log) {
  terminalLogs.push(log);
  if (terminalLogs.length > 20) {
    terminalLogs.shift();
  }
  renderTerminalLogs();
}

function renderTerminalLogs() {
  const container = document.getElementById('terminal-logs-stream');
  if (!container) return;
  container.innerHTML = terminalLogs.map(log => `<div class="break-all capitalize">${log}</div>`).join('');
  container.scrollTop = container.scrollHeight;
}

function executeTerminalCommand(cmd) {
  addTerminalLog(`user_core@os:~$ ${cmd.toUpperCase()}`);
  
  setTimeout(() => {
    const normalizedCmd = cmd.trim().toLowerCase();
    if (normalizedCmd === 'help') {
      addTerminalLog("AVAILABLE SYS_CMDS: HELP, SYS_PING, REBOOT, STATUS, SECRET, BREAK_COMPILER");
    } else if (normalizedCmd === 'sys_ping') {
      addTerminalLog("UPLINK CALIBRATION: PONG! RTT IS 12MS");
    } else if (normalizedCmd === 'status') {
      addTerminalLog(`SYS_STATE: STABLE // CORE_FREQ: 4.8GHZ // LED_STABILITY: ${ledStability}%`);
    } else if (normalizedCmd === 'reboot') {
      addTerminalLog("WARPING MEMORY SPACE CHASSIS...");
      addTerminalLog("REBOOT SUCCESSFULLY COMPLETED.");
    } else if (['hack', 'break', 'break_compiler', 'overclock', 'matrix', 'domination'].includes(normalizedCmd)) {
      addTerminalLog("SYS_ALERT: DE-SYNCHRONIZATION SEQUENCING CORES ENGAGED. LAUNCHING CHASSIS OVERRIDE...");
      setTimeout(() => {
        triggerCompilerRain();
      }, 1200);
    } else if (['secret', 'easter', 'egg', 'eggs'].includes(normalizedCmd)) {
      addTerminalLog("--- SECURITY INTERFACE BYPASS DECRYPTED ---");
      addTerminalLog("EASTER_EGG_NODE_01: CLICK ON THE TOP '021211' BRAND LOGO 5 TIMES.");
      addTerminalLog("EASTER_EGG_NODE_02: RUN CMD 'BREAK_COMPILER' TO ENGAGE MAXIMUM POWER SCREENAVER INTRUSION.");
      addTerminalLog("EASTER_EGG_NODE_03: IN THE CHATBOT, ASK TO EXPLODE COMPILERS OR TYPE '/BYPASS'.");
      addTerminalLog("-------------------------------------------");
    } else {
      addTerminalLog("SYS_ERR: COMMAND SYLLABLE NOT RECOGNIZED. TYPE 'HELP' FOR ALL MATRIX INTEGRITY COMMANDS.");
    }
  }, 400);
}

// ----------------------------------------------------
// COGNITIVE COPROCESSOR (CHATBOT)
// ----------------------------------------------------
function initChat() {
  const btnToggle = document.getElementById('tool-btn-chat');
  const popup = document.getElementById('chat-popup');
  const btnClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-console-input');

  btnToggle.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
      isSettingsOpen = false;
      isTerminalOpen = false;
      syncPopupsState();
      setTimeout(() => chatInput.focus(), 50);
    }
    btnToggle.classList.toggle('active', isChatOpen);
    popup.classList.toggle('open', isChatOpen);
  });

  btnClose.addEventListener('click', () => {
    isChatOpen = false;
    btnToggle.classList.remove('active');
    popup.classList.remove('open');
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = chatInput.value.trim();
      if (val) {
        sendChatMessage(val);
        chatInput.value = '';
      }
    }
  });

  renderChatMessages();
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages-stream');
  if (!container) return;

  container.innerHTML = chatMessages.map(msg => {
    const isBot = msg.sender === 'bot';
    return `
      <div class="flex flex-col ${isBot ? 'items-start' : 'items-end'} space-y-1">
        <div class="flex items-center gap-2 text-[9px] font-bold text-on-surface-variant">
          <span>${isBot ? 'BOT_COPROCESSOR' : 'USER_DOCK'}</span>
          <span>•</span>
          <span>${msg.timestamp}</span>
        </div>
        <div class="msg-bubble ${isBot ? 'msg-bot' : 'msg-user'}">${msg.text}</div>
      </div>
    `;
  }).join('');
  
  container.scrollTop = container.scrollHeight;
}

async function sendChatMessage(text) {
  // Easter egg bypass command
  const normalizedText = text.trim().toLowerCase();
  if (normalizedText === '/bypass') {
    chatMessages.push({ text, sender: 'user', timestamp: getCurrentTime() });
    chatMessages.push({
      text: "BYPASS TOKEN ACCEPTED.\n\nENGAGING EXPERIMENTAL CORE COMPILER INTENDED CHASSIS RAID...",
      sender: 'bot',
      timestamp: getCurrentTime()
    });
    renderChatMessages();
    showChatTyping(true);
    setTimeout(() => {
      showChatTyping(false);
      triggerCompilerRain();
      unlockSecret();
    }, 1000);
    return;
  }

  // Add user message to history
  chatMessages.push({ text, sender: 'user', timestamp: getCurrentTime() });
  renderChatMessages();

  // Show typing loader
  showChatTyping(true);

  try {
    // format history mapping for API payload
    const history = chatMessages.slice(-8).map(m => ({
      text: m.text,
      sender: m.sender
    }));

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Coprocessor core transaction failed.");
    }

    const data = await res.json();
    chatMessages.push({
      text: data.reply,
      sender: 'bot',
      timestamp: getCurrentTime()
    });
  } catch (err) {
    console.error(err);
    chatMessages.push({
      text: `CORE_ERROR: ${err.message || "Failed to route uplink through satellite node."}\n\n[OFFLINE FALLBACK]: Direct uplink is currently unavailable (no active server). Connect with Rohan Patil via Instagram @rohan_2_core or LinkedIn!`,
      sender: 'bot',
      timestamp: getCurrentTime()
    });
  } finally {
    showChatTyping(false);
    renderChatMessages();
  }
}

function showChatTyping(show) {
  const typingIndicator = document.getElementById('chat-typing-indicator');
  if (typingIndicator) {
    typingIndicator.style.display = show ? 'block' : 'none';
  }
  const stream = document.getElementById('chat-messages-stream');
  if (stream) stream.scrollTop = stream.scrollHeight;
}

// ----------------------------------------------------
// CONTACT FORM
// ----------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contact-chassis-form');
  const transmissionLoader = document.getElementById('transmission-loader');
  const transmissionSuccess = document.getElementById('transmission-success');
  const streamLogs = document.getElementById('transmission-stream-logs');
  const btnReset = document.getElementById('transmission-new-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const sender = document.getElementById('form-sender').value.trim();
    const address = document.getElementById('form-address').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!sender || !address || !message) return;

    // Show logs loading simulation
    form.style.display = 'none';
    transmissionLoader.style.display = 'block';
    streamLogs.innerHTML = '';

    const logs = [
      "SYN_SENT: INITIAL PORT CONNECTION HANDSHAKE STARTED...",
      "ACK_RECV: SECURE PORT 1083 IDENTIFIED",
      "CIPHER_INIT: INJECTING 256-BIT ROTATING RSA ENCRYPTION PAYLOAD...",
      "DATA_PACKET: STREAMING MULTI-PART CONTENT BLOCKS...",
      "TRANS_OK: TRANSMISSION SECURED. DESTINATION VERIFIED."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        const div = document.createElement('div');
        div.className = 'text-on-surface/90 flex gap-2';
        div.innerHTML = `<span class="text-primary-container">&gt;&gt;</span> <span>${log}</span>`;
        streamLogs.appendChild(div);
        streamLogs.scrollTop = streamLogs.scrollHeight;

        if (index === logs.length - 1) {
          setTimeout(() => {
            transmissionLoader.style.display = 'none';
            transmissionSuccess.style.display = 'flex';
          }, 800);
        }
      }, (index + 1) * 600);
    });
  });

  btnReset.addEventListener('click', () => {
    form.reset();
    transmissionSuccess.style.display = 'none';
    form.style.display = 'flex';
  });
}

// ----------------------------------------------------
// VU METERS
// ----------------------------------------------------
function initVUMeters() {
  const techs = ['godot', 'unity', 'blender', 'kotlin', 'python'];
  
  techs.forEach(tech => {
    const range = document.getElementById(`vu-range-${tech}`);
    const bar = document.getElementById(`vu-bar-${tech}`);
    const label = document.getElementById(`vu-label-${tech}`);

    if (range && bar && label) {
      range.addEventListener('input', (e) => {
        vuManualOverride[tech] = true;
        vuLevels[tech] = parseInt(e.target.value);
        bar.style.height = `${vuLevels[tech]}%`;
        label.textContent = `${vuLevels[tech]}% PWR`;
      });
    }
  });
}

// ----------------------------------------------------
// CANVAS MATRIX SCREENSAVER
// ----------------------------------------------------
let matrixAnimId;
function triggerCompilerRain() {
  isCompilerRainActive = true;
  const overlay = document.getElementById('screensaver');
  overlay.classList.add('open');

  const canvas = document.getElementById('screensaver-canvas');
  const ctx = canvas.getContext('2d');

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const columns = Math.floor(canvas.width / 16);
  const drops = Array(columns).fill(1);
  const characters = "01010101C++VULKANGDSCRIPTHACKBREAKCOMPILERROHAN15PRODIGYDOMINATION";

  const draw = () => {
    ctx.fillStyle = 'rgba(10, 12, 16, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '11px Courier New';

    for (let i = 0; i < drops.length; i++) {
      if (Math.random() > 0.98) {
        ctx.fillStyle = '#ffb59c';
      } else if (Math.random() > 0.8) {
        ctx.fillStyle = '#00f4fe';
      } else {
        ctx.fillStyle = '#ff6e40';
      }

      const char = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(char, i * 16, drops[i] * 16);

      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    matrixAnimId = requestAnimationFrame(draw);
  };

  matrixAnimId = requestAnimationFrame(draw);

  // Screensaver close trigger
  const btnClose = document.getElementById('screensaver-close');
  btnClose.onclick = () => {
    isCompilerRainActive = false;
    overlay.classList.remove('open');
    cancelAnimationFrame(matrixAnimId);
    window.removeEventListener('resize', resizeCanvas);
  };

  // simulated compiler override logs stream
  const compilerLogsStream = document.getElementById('screensaver-logs-stream');
  compilerLogsStream.innerHTML = '';
  const initialLogs = [
    "INITIALIZING BYPASS CHAIN...",
    "HOOKING C++ STD::COMPILER ENGINE...",
    "GDSCRIPT VM CORE HIJACKED: SUCCESS",
    "DEVIATING PHYSICS BOUNDS: VOLUMETRIC COLLIDER OVERFLOW",
    "BYPASSING TRIAL HANDSHAKES..."
  ];

  initialLogs.forEach(log => {
    const div = document.createElement('div');
    div.textContent = `⚡ ${log}`;
    compilerLogsStream.appendChild(div);
  });

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
    if (!isCompilerRainActive) {
      clearInterval(logInterval);
      return;
    }
    const div = document.createElement('div');
    div.textContent = `⚡ [CORE_SYS] ${diagnosticPool[Math.floor(Math.random() * diagnosticPool.length)]}`;
    compilerLogsStream.appendChild(div);
    if (compilerLogsStream.childNodes.length > 12) {
      compilerLogsStream.removeChild(compilerLogsStream.firstChild);
    }
    compilerLogsStream.scrollTop = compilerLogsStream.scrollHeight;
  }, 450);
}

// ----------------------------------------------------
// SIMULATION AUTOMATION
// ----------------------------------------------------
function startGlobalSimulators() {
  // Fluctuate VU Levels
  setInterval(() => {
    const techs = ['godot', 'unity', 'blender', 'kotlin', 'python'];
    techs.forEach(tech => {
      if (!vuManualOverride[tech]) {
        let max = tech === 'blender' ? 90 : tech === 'python' ? 95 : 100;
        let min = tech === 'godot' ? 85 : tech === 'unity' ? 80 : tech === 'blender' ? 68 : tech === 'kotlin' ? 82 : 72;
        let delta = tech === 'unity' || tech === 'kotlin' ? 2 : 1;

        let change = Math.random() > 0.5 ? delta : -delta;
        vuLevels[tech] = Math.min(max, Math.max(min, vuLevels[tech] + change));

        const bar = document.getElementById(`vu-bar-${tech}`);
        const label = document.getElementById(`vu-label-${tech}`);
        const range = document.getElementById(`vu-range-${tech}`);

        if (bar && label && range) {
          bar.style.height = `${vuLevels[tech]}%`;
          label.textContent = `${vuLevels[tech]}% PWR`;
          range.value = vuLevels[tech];
        }
      }
    });
  }, 1500);

  // Core Load simulator on Home page
  const labelLoad = document.getElementById('bento-core-load-val');
  const barContainer = document.getElementById('bento-core-load-bars');
  if (labelLoad && barContainer) {
    setInterval(() => {
      const load = parseFloat((Math.random() * 0.3 + 0.3).toFixed(2));
      labelLoad.textContent = `${load}ms`;

      const bars = barContainer.querySelectorAll('div');
      bars.forEach(bar => {
        const heightVal = Math.floor(Math.random() * 80 + 20);
        bar.style.height = `${heightVal}%`;
        
        // update colors dynamically
        bar.className = 'w-2.5 rounded-sm transition-all duration-300';
        if (heightVal > 75) {
          bar.classList.add('bg-primary', 'led-orange-glow');
        } else if (heightVal > 50) {
          bar.classList.add('bg-primary/70');
        } else if (heightVal > 30) {
          bar.classList.add('bg-primary/40');
        } else {
          bar.classList.add('bg-primary/20');
        }
      });
    }, 400);
  }

  // Simulated Terminal background logs logs
  setInterval(() => {
    if (isTerminalOpen) {
      const logOptions = [
        "SYS_MONITOR: TEMP UNIT CORE AT 42C",
        "IO_STREAM: DETECTED SEAMLESS REACTION ON TACTILE KNOBS",
        "NET_ROUTING: OPTIMIZING LOCAL BENGALURU LATENCY CLUSTER...",
        "SYS_DIAG: SYNCHRONIZING WITH GITHUB AND LINKEDIN CLOUDS",
        "CPU_CYCLE: DISPATCHING CHASSIS CALIBRATING PULSES..."
      ];
      const randomLog = logOptions[Math.floor(Math.random() * logOptions.length)];
      addTerminalLog(`[SYSTEM] ${randomLog}`);
    }
  }, 2500);
}

function unlockSecret() {
  secretUnlocked = true;
  const logo = document.getElementById('header-logo');
  if (logo) {
    // Add sparkles icon or similar glow dynamically
    logo.classList.add('active-glow');
  }
}

// ----------------------------------------------------
// DAILY HINGLISH STATUS SYSTEM
// ----------------------------------------------------
const dailyStatuses = [
  "Kehti sasta Christopher Nolan",
  "Da Vinci ki basement mein lock",
  "Coding in my sleep, debugging in my nightmares",
  "C++ compiler has more mood swings than my crush",
  "Trying to fix bugs that I wrote 5 minutes ago",
  "10th class ki math, Godot physics engine ke bharose",
  "Error line 420: Brain.exe not responding",
  "Daadi bolti hai Google ka CEO banega, main semicolon dhund raha hu",
  "Sasta hacker: Pentagon bypass ho na ho, WiFi bypass zaroor hoga",
  "System crash ho gaya aur career bhi",
  "Making games because real life has bad graphics",
  "100% bugs, 0% documentation, 200% confidence",
  "Hogwarts letter didn't arrive, so I became a programmer",
  "Writing spaghetti code like a true Italian chef",
  "Keyboard warrior from India, defeated by a missing bracket",
  "Git commit message: 'Please work, mummy kasam'",
  "I am the reason my CPU is crying at 95 degrees",
  "Crying in Unity's garbage collector",
  "Kehti, 'tum game banate ho ya hamare feelings ke sath khelte ho?'",
  "8GB RAM mein Unreal Engine chalane ka ghamand hai",
  "Professional overthinker, part-time coder",
  "Trying to compile my life, getting 404 errors",
  "Daadi ka phone fix kiya, now I'm the family IT specialist",
  "Life is a game, and I'm stuck on the loading screen",
  "9th standard marksheet is temporarily deprecated",
  "Blender cube delete karne ka scene hi alag hai",
  "Running on caffeine, hope, and unstable electricity",
  "Board exams are coming, but side projects are calling",
  "C++ pointer se jyada clear toh mera future hai",
  "Converting single-player life to local co-op (Need Player 2)",
  "Sasta Tony Stark in a middle-class garage",
  "Error 418: I am a teapot, let me brew some chai",
  "Trying to find the 'any' key on my keyboard",
  "Ctrl + Z can't fix my life decisions",
  "Coding logic is solid, math teacher disagrees",
  "Debugging in production because I like living on the edge",
  "PC specs dictate my happiness index",
  "My code compiles, time to buy a lottery ticket",
  "Working on a game engine that will never see the light of day",
  "Kehti, 'You care about Godot nodes more than me'",
  "Living in India, sleeping in Eastern Standard Time",
  "Game development is 10% coding, 90% screaming at the console",
  "System.out.println('Zindagi barbad')",
  "Stack Overflow is my legal guardian",
  "Sarcasm level: Compiling with warnings as errors",
  "Designing boss fights while losing to 10th grade physics",
  "Local compiler breaker, global disappointment",
  "C++ compiler: 'Are you sure about this?' Me: 'No, but run it'",
  "Debugging is like solving a murder where you are the killer",
  "Game physics: gravity is just a suggestion",
  "Laptop heating up, saving money on room heaters",
  "Kehti sasta Hideo Kojima, but without the budget",
  "Writing code to solve problems created by my code",
  "My social skills are like Internet Explorer",
  "Code run ho gaya, ab chalo mandir chalte hain",
  "Life dynamic template argument ki tarah unstable hai",
  "High ping in conversations, low latency in code",
  "Board exams are temporary, github commits are permanent",
  "Running my life on a single-core thread",
  "My PC fans sound like a Boeing 747 taking off",
  "Game development is my therapy, though it causes the stress",
  "Sasta Sherlock Holmes, tracing memory leaks",
  "Infinite loops: Because exit conditions are for losers",
  "Searching for bugs like moms search for lost keys",
  "Godot signal connection se jyada stable connectivity chahiye",
  "Semicolon was found guilty of first-degree compiler murder",
  "Coding in dark mode because light attracts bugs",
  "Converting tea into complex algorithm bugs",
  "Living in 3D viewport, rendering issues in 2D life",
  "Kehti, 'Tumhari life mein variables bohot change hote hain'",
  "If at first you don't succeed, comment it out",
  "Homework load speed: 0.1 kbps. Side project load speed: 10 Gbps",
  "14-year-old developer, 40-year-old back pain",
  "Trying to optimize my life, getting memory overflow",
  "Learning C++ was my character development arc",
  "Designing open-world games while locked in a 10x10 room",
  "Sasta matrix agent, stuck in Chalisgaon simulation",
  "My script runs, my life crawls",
  "AI will replace me? Bro, my code doesn't even run yet",
  "Keyboard keys fading faster than my hopes of getting sleep",
  "I put the 'error' in 'trial and error'",
  "My codebase is like a house of cards on a windy day",
  "Unity editor crashing: My daily meditation routine",
  "Sasta Elon Musk, rocket launcher banaya par Blender mein",
  "When in doubt, restart the editor",
  "C++ templates: where sanity goes to die",
  "Living life in windowed mode",
  "I don't need sleep, I need answers to my compiler errors",
  "My code is clean, it's the runtime that's dirty",
  "Chasing bugs like tourists chase auto-rickshaws in Mumbai",
  "Godot node hierarchy is cleaner than my room",
  "Making retro games because my PC can't run modern ones",
  "Kehti, 'Tum developer ho toh mera dimaag debug kar do'",
  "Compiling code: The best excuse to do absolutely nothing",
  "Brain cells: 404 not found while reading compiler logs",
  "Designing high-speed gameplay with a low-spec brain",
  "Sasta cyber security expert (saves passwords in plain text)",
  "Game designer: Because real world rules are boring",
  "Typing speed: 120 WPM, thinking speed: 2 WPM",
  "Terminal prompt: user_core@021211:~$ Zindagi_Khatam --force"
];

function initDailyStatus() {
  const badge = document.getElementById('daily-status-badge');
  if (badge) {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const index = Math.abs(dayOfYear) % dailyStatuses.length;
    badge.textContent = `STATUS: ${dailyStatuses[index].toUpperCase()}`;
  }
}
