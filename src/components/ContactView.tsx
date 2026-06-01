import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Terminal, AtSign, Network, CheckCircle, Info, Instagram } from 'lucide-react';

export default function ContactView() {
  const [senderId, setSenderId] = useState('');
  const [returnAddress, setReturnAddress] = useState('');
  const [subject, setSubject] = useState('PROJECT_INQUIRY');
  const [message, setMessage] = useState('');

  // Form submit state & logs
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionCompleted, setTransmissionCompleted] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState<string[]>([]);

  const handleTransmission = (e: FormEvent) => {
    e.preventDefault();
    if (!senderId || !returnAddress || !message) return;

    setIsTransmitting(true);
    setTransmissionLogs([]);

    const logs = [
      "SYN_SENT: INITIAL PORT CONNECTION HANDSHAKE STARTED...",
      "ACK_RECV: SECURE PORT 1083 IDENTIFIED",
      "CIPHER_INIT: INJECTING 256-BIT ROTATING RSA ENCRYPTION PAYLOAD...",
      "DATA_PACKET: STREAMING MULTI-PART CONTENT BLOCKS...",
      "TRANS_OK: TRANSMISSION SECURED. DESTINATION VERIFIED."
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTransmissionLogs(prev => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setIsTransmitting(false);
            setTransmissionCompleted(true);
          }, 800);
        }
      }, (index + 1) * 600);
    });
  };

  const resetForm = () => {
    setSenderId('');
    setReturnAddress('');
    setSubject('PROJECT_INQUIRY');
    setMessage('');
    setTransmissionCompleted(false);
    setTransmissionLogs([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6"
    >
      {/* Schematic Header Unit */}
      <div className="relative p-6 md:p-8 bg-surface-container border border-outline-variant rounded-lg chassis-bevel metal-texture">
        {/* LED matrix dots decoration */}
        <div className="absolute top-4 left-4 flex gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-error led-orange-glow animate-pulse"></span>
          <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
          <span className="w-2 h-2 rounded-full bg-surface-container-highest"></span>
        </div>

        <div className="absolute top-4 right-4 flex gap-4 font-mono text-xs opacity-50 z-10">
          <span className="font-bold">COM_STATUS: IDLE</span>
        </div>

        <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary uppercase tracking-widest mt-3">
          INITIATE_CONTACT
        </h1>
        <p className="font-mono text-xs text-on-surface-variant max-w-3xl leading-relaxed mt-2 uppercase tracking-wide">
          ESTABLISHING SECURE CONNECTION TO ROHAN P. // COMMUNICATION_ARRAY_VER_4.2.0 // BYPASSING STANDARD PROTOCOLS...
        </p>

        {/* Screw head vectors */}
        <div className="screw-head top-2 left-2 opacity-30"></div>
        <div className="screw-head top-2 right-2 opacity-30"></div>
        <div className="screw-head bottom-2 left-2 opacity-30"></div>
        <div className="screw-head bottom-2 right-2 opacity-30"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form Panel */}
        <div className="md:col-span-8 bg-surface-container-low border border-outline-variant p-6 md:p-8 rounded-lg relative shadow-2xl metal-texture">
          {/* Accent decoration ribbon */}
          <div className="absolute top-0 right-10 bg-outline-variant h-1.5 w-24"></div>

          <AnimatePresence mode="wait">
            {isTransmitting ? (
              <motion.div
                key="transmitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 flex flex-col justify-center bg-surface-dim p-6 rounded-lg border border-outline-variant shadow-inner font-mono text-xs space-y-4 overflow-y-auto"
              >
                <div className="flex items-center gap-3 text-primary uppercase font-bold text-sm border-b border-outline-variant/30 pb-3">
                  <span className="w-2 h-2 rounded-full bg-primary led-orange-glow animate-ping"></span>
                  <span>EXECUTING CRYPTO PAYLOAD TRANSMISSION...</span>
                </div>
                <div className="space-y-3 pt-2">
                  {transmissionLogs.map((log, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className="text-on-surface/90 flex gap-2"
                    >
                      <span className="text-primary-container">&gt;&gt;</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : transmissionCompleted ? (
              <motion.div
                key="completed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="p-4 bg-primary/10 rounded-full border border-primary/30">
                  <CheckCircle className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="font-sans text-2xl font-bold text-on-surface uppercase mb-1">
                    TRANSMISSION EXECUTED
                  </h3>
                  <p className="font-mono text-xs text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    The cryptographic message payload was securely packeted and routed to Rohan's portfolio server. Shaking hands complete.
                  </p>
                </div>

                <motion.button
                  whileTap={{ y: 2 }}
                  onClick={resetForm}
                  className="bg-primary-container text-on-primary-container font-label text-[10px] font-bold uppercase tracking-wider px-6 py-3 rounded cursor-pointer shadow-md hover:brightness-110"
                >
                  TRANSMIT_NEW_PAYLOAD
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleTransmission}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Sender ID */}
                  <div className="space-y-2">
                    <label className="font-label text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">
                      SENDER_ID
                    </label>
                    <div className="bg-surface-dim p-1 border-b-2 border-outline-variant focus-within:border-primary transition-colors rounded">
                      <input
                        required
                        type="text"
                        placeholder="ENTER_NAME..."
                        value={senderId}
                        onChange={(e) => setSenderId(e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 font-mono text-xs py-2 px-3 text-primary placeholder:text-outline-variant/65 uppercase tracking-wide"
                      />
                    </div>
                  </div>

                  {/* Return Address */}
                  <div className="space-y-2">
                    <label className="font-label text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">
                      RETURN_ADDRESS
                    </label>
                    <div className="bg-surface-dim p-1 border-b-2 border-outline-variant focus-within:border-primary transition-colors rounded">
                      <input
                        required
                        type="email"
                        placeholder="ENTER_EMAIL..."
                        value={returnAddress}
                        onChange={(e) => setReturnAddress(e.target.value)}
                        className="w-full bg-transparent border-none outline-none focus:ring-0 font-mono text-xs py-2 px-3 text-primary placeholder:text-outline-variant/65 uppercase tracking-wide"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Selection */}
                <div className="space-y-2">
                  <label className="font-label text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">
                    COMMUNICATION_SUBJECT
                  </label>
                  <div className="bg-surface-dim p-1 border-b-2 border-outline-variant focus-within:border-primary transition-colors rounded">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-transparent border-none outline-none focus:ring-0 font-mono text-xs py-2 px-3 text-primary cursor-pointer uppercase tracking-wide"
                    >
                      <option value="PROJECT_INQUIRY">PROJECT_INQUIRY</option>
                      <option value="SYSTEM_COLLABORATION">SYSTEM_COLLABORATION</option>
                      <option value="HARDWARE_CONSULTATION">HARDWARE_CONSULTATION</option>
                      <option value="GENERAL_PING">GENERAL_PING</option>
                    </select>
                  </div>
                </div>

                {/* Encrypted payload */}
                <div className="space-y-2">
                  <label className="font-label text-[10px] font-bold text-on-surface-variant block uppercase tracking-wider">
                    ENCRYPTED_MESSAGE_PAYLOAD
                  </label>
                  <div className="bg-surface-dim p-4 border-b-2 border-outline-variant focus-within:border-primary transition-colors rounded h-40">
                    <textarea
                      required
                      placeholder="INPUT_DATA_STREAM..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full h-full bg-transparent border-none outline-none resize-none focus:ring-0 font-mono text-xs text-primary placeholder:text-outline-variant/65 uppercase tracking-wide"
                    ></textarea>
                  </div>
                </div>

                {/* Trigger buttons */}
                <div className="pt-4 flex justify-end">
                  <motion.button
                    whileTap={{ y: 2 }}
                    type="submit"
                    className="bg-primary-container hover:brightness-110 active:brightness-90 text-on-primary-container font-label text-[10px] font-bold px-8 py-4 rounded flex items-center gap-3 uppercase cursor-pointer tracking-wider shadow-lg shadow-primary-container/20"
                  >
                    <Send className="w-4 h-4" />
                    EXECUTE_TRANSMISSION
                  </motion.button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Aesthetic orange wire highlight on the left margin */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-24 bg-primary led-orange-glow"></div>
        </div>

        {/* Right Info list */}
        <div className="md:col-span-4 space-y-6">
          <div className="bg-surface-container border border-outline-variant p-6 rounded-lg relative overflow-hidden shadow-2xl metal-texture">
            {/* Visual concentric vector frame rings */}
            <div className="absolute -right-12 -top-12 w-32 h-32 border-8 border-outline-variant/15 opacity-20 rounded-full"></div>

            <h2 className="font-label text-xs font-bold text-on-surface-variant border-b border-outline-variant pb-2 mb-6 uppercase tracking-widest">
              CONNECTIVITY_NODES
            </h2>

            <div className="space-y-6">
              {/* GitHub Node */}
              <a
                href="https://github.com"
                target="_blank"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-surface-dim border border-outline-variant flex items-center justify-center p-1 group-hover:border-primary transition-all">
                  <Terminal className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="font-label text-[10px] font-bold text-on-surface-variant">NODE_01</div>
                  <div className="font-mono text-xs text-primary font-bold uppercase">GITHUB_REPOS</div>
                </div>
              </a>

              {/* LinkedIn Node */}
              <a
                href="https://linkedin.com"
                target="_blank"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-surface-dim border border-outline-variant flex items-center justify-center p-1 group-hover:border-primary transition-all">
                  <Network className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="font-label text-[10px] font-bold text-on-surface-variant">NODE_02</div>
                  <div className="font-mono text-xs text-primary font-bold uppercase">LINKEDIN_CORE</div>
                </div>
              </a>

              {/* Email Node */}
              <a
                href="mailto:patilrohan50009@gmail.com"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-surface-dim border border-outline-variant flex items-center justify-center p-1 group-hover:border-primary transition-all">
                  <AtSign className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="font-label text-[10px] font-bold text-on-surface-variant">NODE_03</div>
                  <div className="font-mono text-xs text-primary font-bold uppercase">DIRECT_UPLINK</div>
                </div>
              </a>

              {/* Instagram Node */}
              <a
                href="https://www.instagram.com/rohan_2_core/?__pwa=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-surface-dim border border-outline-variant flex items-center justify-center p-1 group-hover:border-primary transition-all">
                  <Instagram className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <div className="font-label text-[10px] font-bold text-on-surface-variant">NODE_04</div>
                  <div className="font-mono text-xs text-primary font-bold uppercase">INSTAGRAM_FEED</div>
                </div>
              </a>
            </div>

            {/* Micro latency specs */}
            <div className="mt-8 p-3 bg-surface-dim rounded border border-outline-variant opacity-60 font-mono text-[10px] leading-relaxed">
              LATENCY: 12ms<br />
              UPLINK_STRENGTH: 98.4%<br />
              SECURE_KEY: RO-PAN-001X
            </div>
          </div>

          {/* Location cable visual asset container */}
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded text-center relative overflow-hidden shadow-xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAvLbmyl0upPwp7_TPhbEvt9KqxbvSASoc1RA-PQyvgyz2dija6n7-NJ-qoo8t96QrYJ4B2-pdnm_HcLH9h2Ee91Xv_riXRj3GJxuUtqRoZqoIoEpcvnavXY1YIFR2-jv7WzX-_Uob_0fISvul9b2h2fn_wW2ekgxAH79zSSH7VDo524Dj8HWIaoONtgbtn08FnwOeQBKrJcYNHZ81aRSSsR54JGoFNFTMBGlKcbK0XbJCrYRKeIvSIyz8IyzPVuQIQMY9nHtrdQTu"
              alt="Server cabling schematic blueprint"
              className="w-full h-32 object-cover opacity-60 rounded border border-outline-variant/65 grayscale hover:grayscale-0 transition-all pointer-events-none"
              referrerPolicy="no-referrer"
            />
            <div className="font-label text-[10px] text-outline-variant font-bold uppercase tracking-wider mt-3">
              SYSTEM_LOCATION: BENGALURU_IN
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
