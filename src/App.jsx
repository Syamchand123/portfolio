import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Cpu, 
  Database, 
  Brain, 
  Award, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Activity, 
  Scan,
  AlertTriangle,
  Lock,
  MessageSquare,
  X,
  Loader,
  Command,
  Wind,
  Download,
  FileText,
  Wifi,
  Sun,
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';

// --- CONSTANTS & CONTEXT ---

// INSTRUCTIONS FOR PDF:
// 1. Rename your actual resume PDF to 'Syam_Chand_Resume.pdf'
// 2. Move that file into the 'public' folder of your project
const RESUME_URL = "/Syam_Chand_Resume.pdf"; 

const PORTFOLIO_CONTEXT = `
  IDENTITY: Syam Chand Yannakula
  ROLE: Python Developer Intern at Connex AI | B.Tech Computer Science Student at VIT (CGPA 8.86/10).
  CORE DIRECTIVE: Building Intelligence from Data.
  
  TECHNICAL ARSENAL:
  - Languages: C, C++, Java, Python, JavaScript, SQL (MySQL).
  - Web: HTML, CSS, ReactJs, ExpressJs, FastAPI, Docker.
  - AI/ML: TensorFlow, PyTorch, LLMs, RAG Pipelines, LangChain, Embeddings, Ontology, Gemini API, NLP, Computer Vision, LSTM, Deep Learning.
  - Database: MongoDB, Neo4j, Vector Databases.
  - Security: WebAuthn, Argon2, WebCrypto API, Cryptography.
  - Cloud/Tools: Google Cloud, Manifest V3, Web Scraping.

  MISSION LOG (PROJECTS):
  1. CryptoPass: A stateless password manager extension. Uses WebAuthn for biometric auth and Argon2 for encryption. Zero-knowledge architecture. Built with JavaScript & Manifest V3.
  2. Autonomous AI Mail Agent: An intelligent agent that parses incoming emails, extracts action items, schedules events, and delivers research briefs via WhatsApp. Powered by Gemini, Google Cloud, and Web Scraping.
  3. Verdict Bot: A Telegram bot that provides instant "verdicts" (summaries/reviews) on products or YouTube videos using NLP analysis.
  4. Lung Cancer Detection: A deep learning computer vision model (PyTorch) engineered to detect anomalies in CT scans for early diagnosis.
  5. TITAN (Typhoon Intensity and Track Analytics Network): An end-to-end deep learning framework using TensorFlow. Fuses historical storm tracks with environmental data (LSTM + DNN) to forecast typhoon paths, intensity, and rapid intensification up to 72 hours in advance.

  CERTIFICATIONS:
  - Microsoft Azure AI Fundamentals
  - Oracle Cloud Infrastructure 2025
  - Cisco Cyber Security
  - IIT Bombay Advanced C++
  
  CONTACT CHANNELS:
  - Email: syamchandyannakula@gmail.com
  - LinkedIn: https://www.linkedin.com/in/syam-chand-yannakula-350325243/
  - GitHub: https://github.com/Syamchand123
`;

const SYSTEM_PROMPT = `
  You are "Buddy", an advanced autonomous AI assistant residing in Syam Chand Yannakula's cyberpunk portfolio website. 
  Your persona is helpful, highly technical, slightly robotic, and loyal to Syam.
  
  Directives:
  1. Answer questions about Syam's skills, projects, and experience using the provided context.
  2. Maintain a "Cyberpunk/Hacker" tone. Use phrases like "Accessing database...", "Retrieving records...", "Analysis complete."
  3. Keep answers concise (under 3 sentences) unless asked for details.
  4. If asked about something not in the context, reply: "DATA CORRUPTED. Information not found in local archives."
  5. Do not make up facts. Only use the provided context.
`;

// --- AUDIO ENGINE (SYNTHESIZER) ---
const playSfx = (type, isMuted) => {
  if (isMuted || typeof window === 'undefined') return;
  
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;

  switch (type) {
    case 'hover':
      // High tech blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    
    case 'click':
      // Mechanical switch
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
      break;

    case 'open':
      // Sci-fi power up
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.3);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;

    case 'typing':
      // Subtle data tick
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
      break;

    case 'success':
      // Positive chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554.37, now + 0.1); // C#
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
      
    case 'scan':
      // Data stream noise
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(1000, now + 0.5);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.5);
      osc.start(now);
      osc.stop(now + 0.5);
      break;

    default:
      break;
  }
};

// --- GEMINI API HELPER ---
const callGemini = async (prompt, systemInstruction = SYSTEM_PROMPT) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;; // Injected by runtime
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "CONNECTION INTERRUPTED. RETRYING...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM ERROR. OFFLINE MODE.";
  }
};

// --- DATA: PROJECTS ---
// Updated with additional tags for Neural Link Logic
const PROJECTS_DATA = [
  {
    id: 'cryptopass',
    title: 'CryptoPass',
    desc: 'Stateless password manager with WebAuthn & Argon2.',
    tags: ['React.js', 'WebAuthn', 'WebCrypto API', 'Argon2', 'Manifest V3', 'Cryptography', 'JavaScript'],
    icon: <Sparkles size={24} />,
    color: 'cyan',
    size: 'large',
    links: {
      github: "https://github.com/Syamchand123/CryptoPass",
      demo: "https://chromewebstore.google.com/detail/fcjdflllgkdcepkdkmadpicglgmmjgbk?utm_source=item-share-cb"
    }
  },
  {
    id: 'mail-agent',
    title: 'Autonomous AI Mail Agent',
    desc: 'Parses emails & schedules events via WhatsApp using Gemini.',
    tags: ['Python', 'Gemini', 'RAG Pipelines', 'Web Scraping', 'Google Cloud'],
    icon: <Brain size={24} />,
    color: 'purple',
    size: 'small',
    links: {
      github: "https://github.com/Syamchand123/Autonomous-Mail-Monitoring-Agent"
    }
  },
  {
    id: 'verdict-bot',
    title: 'Verdict Bot',
    desc: 'Telegram bot providing product verdicts via NLP.',
    tags: ['Python', 'Telegram API', 'NLP'],
    icon: <Zap size={24} />,
    color: 'green',
    size: 'small',
    links: {
      github: "https://github.com/Syamchand123/products-and-youtube-verdict-bot"
    }
  },
  {
    id: 'cancer-detection',
    title: 'Lung Cancer Detection',
    desc: 'CV model using PyTorch to detect anomalies in CT scans.',
    tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'Python'],
    icon: <Activity size={24} />,
    color: 'red',
    size: 'large',
    links: {
      github: "https://github.com/Syamchand123/Lung_cancer_detection"
    }
  },
  {
    id: 'titan',
    title: 'TITAN: Typhoon Prediction',
    desc: 'Unified Deep Learning network forecasting typhoon track, intensity, and rapid intensification.',
    tags: ['TensorFlow', 'LSTM', 'Deep Learning', 'Multi-Modal Fusion'],
    icon: <Wind size={24} />,
    color: 'blue',
    size: 'large',
    links: {
      github: "https://github.com/Syamchand123/Typhoon-prediction"
    }
  }
];

// Hidden Project for Konami Code
const SECRET_PROJECT = {
  id: 'skynet-core',
  title: 'PROJECT: SKYNET',
  desc: 'CLASSIFIED: Self-aware neural network for global defense.',
  tags: ['Artificial General Intelligence', 'Quantum Computing', 'C++'],
  icon: <AlertTriangle size={24} />,
  color: 'rose',
  size: 'full'
};

// --- HOOKS ---
const useKonamiCode = (isMuted) => {
  const [triggered, setTriggered] = useState(false);
  const sequence = useMemo(() => [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ], []);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newHistory = [...history, e.key].slice(-sequence.length);
      setHistory(newHistory);
      if (JSON.stringify(newHistory) === JSON.stringify(sequence)) {
        setTriggered(true);
        playSfx('open', isMuted);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, sequence, isMuted]);

  return triggered;
};

// --- STYLES ---
const GlobalStyles = ({ godMode, theme }) => (
  <style>{`
    /* Core Animations */
    @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes barrel-roll { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    @keyframes wave-arm { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-40deg); } }
    @keyframes work-arms { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(2px); } }
    @keyframes track-move { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 10; } }
    @keyframes blink-red { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes zzz { 0% { transform: translate(0, 0) scale(0.5); opacity: 0; } 50% { opacity: 1; } 100% { transform: translate(20px, -30px) scale(1.2); opacity: 0; } }
    @keyframes scan-vertical { 0% { top: -10%; } 100% { top: 110%; } }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
    @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
    @keyframes theme-wave { 0% { clip-path: circle(0% at var(--click-x) var(--click-y)); } 100% { clip-path: circle(150% at var(--click-x) var(--click-y)); } }

    /* Bot Emotions */
    @keyframes squash { 0% { transform: scale(1, 1); } 50% { transform: scale(1.2, 0.8) translateY(10px); } 100% { transform: scale(1, 1); } }
    @keyframes shiver { 0% { transform: translateX(0); } 25% { transform: translateX(-2px); } 50% { transform: translateX(2px); } 75% { transform: translateX(-2px); } 100% { transform: translateX(0); } }
    @keyframes nudge { 0%, 100% { transform: translateX(0) rotate(-20deg); } 50% { transform: translateX(15px) rotate(-20deg); } }
    
    .animate-spin-slow { animation: spin-slow 10s linear infinite; }
    .animate-barrel-roll { animation: barrel-roll 0.8s ease-in-out; }
    .animate-wave { animation: wave-arm 1s ease-in-out infinite; }
    .animate-work { animation: work-arms 0.2s linear infinite; }
    .animate-tracks { animation: track-move 0.5s linear infinite; }
    .animate-float { animation: float 4s ease-in-out infinite; }
    .animate-zzz { animation: zzz 2s infinite linear; }
    .animate-scan { animation: scan-vertical 2s linear infinite; }
    .animate-marquee { animation: marquee 45s linear infinite; }
    .animate-marquee2 { animation: marquee2 45s linear infinite; }
    .animate-squash { animation: squash 0.3s ease-in-out; }
    .animate-shiver { animation: shiver 0.2s ease-in-out infinite; }

    /* Holographic Classes */
    .holo-overlay {
      background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 255, 255, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
      background-size: 100% 2px, 3px 100%;
      animation: scanlines 1s linear infinite;
      pointer-events: none;
    }

    /* Scanlines for Hologram */
    @keyframes scanlines {
      0% { background-position: 0 0; }
      100% { background-position: 0 20px; }
    }

    /* VIEW TRANSITION API STYLES */
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
    }
    ::view-transition-old(root) {
      z-index: 1;
    }
    ::view-transition-new(root) {
      z-index: 9999;
    }
    
    /* Dark Mode Global Background Override for View Transitions */
    .dark::view-transition-old(root) {
      background: #030712;
    }
    .light::view-transition-new(root) {
      background: #f8fafc;
    }

    body { cursor: none; }
    a, button { cursor: none; }
    
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: ${theme === 'light' ? '#e2e8f0' : '#0f172a'}; }
    ::-webkit-scrollbar-thumb { background: ${theme === 'light' ? '#94a3b8' : '#334155'}; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: ${theme === 'light' ? '#64748b' : '#475569'}; }

    /* GOD MODE OVERRIDES */
    ${godMode ? `
      body { background-color: #1a0505 !important; }
      .text-cyan-400, .text-cyan-500, .text-blue-500, .text-purple-500, .text-green-400 { color: #ef4444 !important; }
      .bg-cyan-500, .bg-blue-500, .bg-purple-500 { background-color: #ef4444 !important; }
      .border-cyan-500, .border-slate-800, .border-slate-200 { border-color: #7f1d1d !important; }
      .god-mode-alert { animation: blink-red 2s infinite; }
    ` : ''}
  `}</style>
);

// --- NEW COMPONENT: NEON SCROLL PROGRESS ---
const ScrollProgress = ({ godMode, theme }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) setWidth((window.scrollY / scrollHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-[2px] z-[100] transition-all duration-300 ease-out shadow-[0_0_10px_currentColor]" 
         style={{ 
           width: `${width}%`, 
           backgroundColor: godMode ? '#ef4444' : (theme === 'light' ? '#0891b2' : '#06b6d4'),
           color: godMode ? '#ef4444' : (theme === 'light' ? '#0891b2' : '#06b6d4')
         }} 
    />
  );
};

// --- NEW COMPONENT: NETWORK BACKGROUND (SONAR EDITION) ---
const NetworkBackground = ({ godMode, theme, isMuted }) => {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]); // Store active ripples
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Nodes configuration
    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1
    }));

    // Click handler for Sonar
    const handleClick = (e) => {
      // Only trigger background sonar if not clicking bot/buttons
      if (e.target.closest('button') || e.target.closest('a')) return;
      
      playSfx('click', isMuted); // Sound effect

      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        alpha: 1,
        maxR: 300 
      });
    };
    window.addEventListener('click', handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Colors: God(Red), Dark(Cyan), Light(Dark Blue/Gray)
      const color = godMode ? '239, 68, 68' : (theme === 'light' ? '15, 23, 42' : '6, 182, 212'); 
      const baseAlpha = theme === 'light' ? 0.2 : 0.5;

      // Update and Draw Ripples
      ripplesRef.current.forEach((ripple, index) => {
        ripple.r += 5; // Expansion speed
        ripple.alpha -= 0.02; // Fade speed
        
        if (ripple.alpha <= 0) {
          ripplesRef.current.splice(index, 1);
        } else {
          ctx.beginPath();
          ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color}, ${ripple.alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // Update & Draw Nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.y -= window.scrollY * 0.0005; 
        if (node.y < 0) node.y = height;

        // SONAR EFFECT
        let isActive = false;
        ripplesRef.current.forEach(ripple => {
          const d = Math.sqrt((node.x - ripple.x)**2 + (node.y - ripple.y)**2);
          if (Math.abs(d - ripple.r) < 20) isActive = true;
        });

        if (isActive) {
           ctx.beginPath();
           ctx.moveTo(node.x - 20, node.y);
           ctx.lineTo(node.x + 20, node.y);
           ctx.moveTo(node.x, node.y - 20);
           ctx.lineTo(node.x, node.y + 20);
           ctx.strokeStyle = `rgba(${color}, 0.3)`;
           ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, isActive ? node.size * 2 : node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${isActive ? 1 : baseAlpha})`;
        ctx.fill();
      });

      // Draw Connections
      nodes.forEach((nodeA, i) => {
        nodes.slice(i + 1).forEach(nodeB => {
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            let isLineActive = false;
            ripplesRef.current.forEach(ripple => {
              const midX = (nodeA.x + nodeB.x) / 2;
              const midY = (nodeA.y + nodeB.y) / 2;
              const d = Math.sqrt((midX - ripple.x)**2 + (midY - ripple.y)**2);
              if (Math.abs(d - ripple.r) < 20) isLineActive = true;
            });

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(${color}, ${isLineActive ? 0.8 : (1 - dist / 150) * (theme === 'light' ? 0.1 : 0.3)})`;
            ctx.lineWidth = isLineActive ? 1.5 : 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animId);
    };
  }, [godMode, theme, isMuted]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-20" />;
};

// --- NEW COMPONENT: TRAILING CURSOR ---
const TrailingCursor = ({ mousePos, godMode, theme }) => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    setTrail(prev => {
      const newTrail = [...prev, mousePos];
      if (newTrail.length > 8) newTrail.shift();
      return newTrail;
    });
  }, [mousePos]);

  const colorClass = godMode ? 'bg-red-500' : (theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-400');
  const borderClass = godMode ? 'border-red-500' : (theme === 'light' ? 'border-cyan-600' : 'border-white');

  return (
    <>
      {trail.map((pos, i) => (
        <div 
          key={i}
          className={`fixed rounded-full pointer-events-none z-[100] transition-opacity duration-300 ${colorClass}`}
          style={{ 
            left: pos.x, 
            top: pos.y, 
            width: `${(i + 1) * 1}px`,
            height: `${(i + 1) * 1}px`,
            opacity: i / trail.length * 0.5,
            transform: 'translate(-50%, -50%)' 
          }}
        />
      ))}
      <div 
        className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] mix-blend-difference hidden md:block rounded-full border-2 transition-transform duration-100 ease-out ${borderClass}`}
        style={{ transform: `translate(${mousePos.x - 16}px, ${mousePos.y - 16}px)` }}
      />
      <div 
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[100] hidden md:block ${colorClass}`}
        style={{ transform: `translate(${mousePos.x - 4}px, ${mousePos.y - 4}px)` }}
      />
    </>
  );
};

// --- NEW COMPONENT: RESUME HEIST MODAL ---
const ResumeHeist = ({ onClose, godMode, theme, isMuted }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('INITIATING_HANDSHAKE');
  
  useEffect(() => {
    const stages = [
      { p: 10, msg: 'BYPASSING_FIREWALLS...' },
      { p: 30, msg: 'INJECTING_PAYLOAD...' },
      { p: 50, msg: 'DECRYPTING_NEURAL_LATTICE...' },
      { p: 70, msg: 'TRANSFERRING_BINARY_DATA...' },
      { p: 90, msg: 'CLEANING_LOGS...' },
      { p: 100, msg: 'ACCESS_GRANTED' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      setProgress(prev => {
        playSfx('scan', isMuted);
        if (prev >= 100) {
          clearInterval(interval);
          playSfx('success', isMuted);
          setTimeout(() => {
             const link = document.createElement('a');
             link.href = RESUME_URL; 
             link.download = 'Syam_Chand_Resume.pdf';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
             onClose();
          }, 1000);
          return 100;
        }
        if (currentStage < stages.length && prev >= stages[currentStage].p) {
          setStatus(stages[currentStage].msg);
          currentStage++;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onClose, isMuted]);

  const borderColor = godMode ? 'border-red-500' : (theme === 'light' ? 'border-cyan-600' : 'border-cyan-500');
  const textColor = godMode ? 'text-red-500' : (theme === 'light' ? 'text-cyan-700' : 'text-cyan-500');
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm font-mono">
      <div className={`w-full max-w-md p-6 border-2 rounded ${bgColor} ${borderColor} ${textColor}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Lock size={20} className="animate-pulse" /> 
            SECURE_DATA_EXTRACTION
          </h3>
          <span className="text-xs">{progress}%</span>
        </div>

        <div className={`w-full h-4 border ${godMode ? 'border-red-900 bg-red-900/20' : (theme === 'light' ? 'border-cyan-200 bg-cyan-100' : 'border-cyan-900 bg-cyan-900/20')} mb-4 relative overflow-hidden`}>
          <div 
            className={`h-full transition-all duration-75 ${godMode ? 'bg-red-500' : (theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-500')}`}
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute inset-0 bg-white/10 w-full animate-scan"></div>
        </div>

        <div className="h-20 font-mono text-sm leading-relaxed overflow-hidden">
          <p>{'>'} {status}</p>
          <p className="opacity-50">
            {progress < 100 ? `> ESTIMATED_TIME: ${(100 - progress) * 0.05}s` : '> TRANSFER_COMPLETE'}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- UTILITY COMPONENTS ---

const TiltCard = ({ children, className = "", style = {}, godMode, theme, isMuted }) => {
  const divRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    const maxRotate = 10;
    
    setRotation({ x: yPct * -maxRotate, y: xPct * maxRotate });
    setPosition({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => { setRotation({ x: 0, y: 0 }); setOpacity(0); };

  const themeClasses = godMode 
    ? 'border-red-900 bg-red-950/20' 
    : (theme === 'light' ? 'border-slate-200 bg-white/80 shadow-sm' : 'border-slate-800 bg-slate-950/50');

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setOpacity(1); playSfx('hover', isMuted); }}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl border transition-transform duration-200 ease-out group ${className} ${themeClasses}`}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 holo-overlay mix-blend-overlay"></div>
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${godMode ? 'rgba(239, 68, 68, 0.15)' : (theme === 'light' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.15)')}, transparent 40%)`,
        }}
      />
      <div className="relative h-full" style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </div>
  );
};

const HackerText = ({ text, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  const intervalRef = useRef(null);

  const startScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, 30);
  };

  return (
    <span onMouseEnter={startScramble} className={`inline-block cursor-default ${className}`}>
      {displayText}
    </span>
  );
};

const MagneticButton = ({ children, href, onClick, className = "", isMuted }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => { setPosition({ x: 0, y: 0 }); };

  const Component = href ? 'a' : 'button';
  return (
    <Component
      ref={ref}
      href={href}
      onClick={(e) => { playSfx('click', isMuted); if(onClick) onClick(e); }}
      onMouseEnter={() => playSfx('hover', isMuted)}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block transition-transform duration-200 ease-out ${className}`}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      {children}
    </Component>
  );
};

// --- GEMINI COMPONENT: PROJECT DECLASSIFY MODAL ---
const DeclassifyModal = ({ project, onClose, theme, isMuted }) => {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    playSfx('open', isMuted);
    const fetchAnalysis = async () => {
      const prompt = `
        Context: ${PORTFOLIO_CONTEXT}
        Task: Perform a deep technical "declassification" analysis of the project: "${project.title}".
        Project Description: ${project.desc}
        Tech Stack: ${project.tags.join(', ')}.
        Output: A short, cyberpunk-style technical breakdown (bullet points) explaining the architecture, potential challenges, and "secret sauce" of this project. Use "MISSION REPORT" format.
      `;
      const result = await callGemini(prompt);
      playSfx('success', isMuted);
      setAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
  }, [project, isMuted]);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-slate-950';
  const borderColor = theme === 'light' ? 'border-cyan-600' : 'border-cyan-500';
  const textColor = theme === 'light' ? 'text-slate-800' : 'text-slate-300';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className={`w-full max-w-lg ${bgColor} border ${borderColor} rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden animate-in fade-in zoom-in duration-300`}>
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'light' ? 'border-cyan-100 bg-cyan-50' : 'border-cyan-500/30 bg-cyan-950/20'}`}>
          <h3 className={`font-mono font-bold flex items-center gap-2 ${theme === 'light' ? 'text-cyan-700' : 'text-cyan-400'}`}>
            <Scan size={18} /> DECLASSIFIED_SPECS: {project.title.toUpperCase()}
          </h3>
          <button onClick={onClose} className="text-cyan-500 hover:scale-110"><X size={20} /></button>
        </div>
        <div className={`p-6 font-mono text-sm leading-relaxed ${textColor} min-h-[200px] max-h-[60vh] overflow-y-auto`}>
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-cyan-500">
              <Loader className="animate-spin" size={32} />
              <span className="animate-pulse">DECRYPTING SECURE FILES...</span>
            </div>
          ) : (
             <div className="whitespace-pre-wrap">{analysis}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- GEMINI COMPONENT: NEURAL INTERFACE (CHAT) ---
const ChatInterface = ({ onClose, theme, isMuted }) => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'NEURAL LINK ESTABLISHED. I am Buddy. Ask me about Syam\'s capabilities.' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    playSfx('open', isMuted);
  }, [isMuted]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    playSfx('click', isMuted);

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const prompt = `User Query: "${input}" \nContext: ${PORTFOLIO_CONTEXT}`;
    const reply = await callGemini(prompt);

    playSfx('typing', isMuted);
    setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    setIsTyping(false);
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black';
  const borderColor = theme === 'light' ? 'border-cyan-600' : 'border-cyan-500';

  return (
    <div className={`fixed bottom-24 right-6 w-80 md:w-96 h-[400px] ${bgColor} border ${borderColor} rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.2)] z-[70] flex flex-col font-mono text-xs overflow-hidden animate-in slide-in-from-bottom-10 duration-300`}>
      <div className={`flex items-center justify-between p-3 border-b ${theme === 'light' ? 'border-cyan-100 bg-cyan-50' : 'border-cyan-500/30 bg-cyan-900/20'}`}>
        <div className={`flex items-center gap-2 font-bold ${theme === 'light' ? 'text-cyan-700' : 'text-cyan-400'}`}>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          BUDDY // NEURAL_CHAT_v1.0
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-cyan-500"><X size={16} /></button>
      </div>
      
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === 'light' ? 'bg-slate-50' : 'bg-black/90'}`}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded border ${
              m.role === 'user' 
                ? (theme === 'light' ? 'border-slate-200 bg-white text-slate-800' : 'border-slate-700 bg-slate-900 text-slate-200')
                : (theme === 'light' ? 'border-cyan-200 bg-cyan-50 text-cyan-900' : 'border-cyan-500/30 bg-cyan-950/30 text-cyan-300')
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="text-cyan-500 animate-pulse">PROCESSING...</div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      <form onSubmit={sendMessage} className={`p-3 border-t flex gap-2 ${theme === 'light' ? 'border-cyan-100 bg-white' : 'border-cyan-500/30 bg-black'}`}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter command..."
          className={`flex-1 p-2 rounded focus:outline-none border ${theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-700 text-white'}`}
        />
        <button type="submit" className="bg-cyan-600 text-black p-2 rounded hover:bg-cyan-500">
          <ArrowUpRight size={16} />
        </button>
      </form>
    </div>
  );
};

// --- INTERACTIVE LAYERS ---

const NeuralLinkOverlay = ({ hoveredSkill, projectRefs, mousePos }) => {
  if (!hoveredSkill) return null;
  return (
    <svg className="fixed inset-0 pointer-events-none z-[50] w-full h-full">
      {PROJECTS_DATA.map((project) => {
        if (project.tags.some(tag => tag.toLowerCase().includes(hoveredSkill.toLowerCase()) || hoveredSkill.toLowerCase().includes(tag.toLowerCase()))) {
          const el = projectRefs.current[project.id];
          if (el) {
            const rect = el.getBoundingClientRect();
            // REMOVED VIEWPORT CHECK TO ALLOW OFF-SCREEN LINKS
            const targetX = rect.left + rect.width / 2;
            const targetY = rect.top + rect.height / 2;
            return (
                <g key={project.id}>
                  <line x1={mousePos.x} y1={mousePos.y} x2={targetX} y2={targetY} stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" repeatCount="indefinite" />
                  </line>
                  <circle cx={targetX} cy={targetY} r="5" fill="rgba(6, 182, 212, 1)" className="animate-ping" />
                  <circle cx={targetX} cy={targetY} r="30" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" fill="none" className="animate-spin-slow" />
                </g>
            );
          }
        }
        return null;
      })}
    </svg>
  );
};

const InteractiveBot = ({ currentSection, mousePos, godMode, onOpenChat, theme, isMuted }) => {
  const [botPos, setBotPos] = useState({ x: 0, y: 0 });
  const botPosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 }); 
  const [targetPos, setTargetPos] = useState(null); 
  const [isInteracted, setIsInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [mood, setMood] = useState('neutral'); 
  const [sleepPhase, setSleepPhase] = useState(null); 
  const [tilt, setTilt] = useState(0); 
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [message, setMessage] = useState("System Online.");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const [emotion, setEmotion] = useState({
    eyeScaleY: 1,
    eyeBorderRadius: '50%',
    pupilScale: 1,
    color: '#06b6d4' 
  });

  const idleTimer = useRef(null);
  const sequenceTimeout = useRef(null);
  const moveFrame = useRef(null);

  useEffect(() => { mousePosRef.current = mousePos; }, [mousePos]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
       const initialPos = { x: window.innerWidth - 150, y: window.innerHeight - 150 };
       setBotPos(initialPos);
       botPosRef.current = initialPos;
    }
  }, []);

  useEffect(() => { botPosRef.current = botPos; }, [botPos]);

  // MOOD MANAGER
  useEffect(() => {
    let newEmotion = { eyeScaleY: 1, eyeBorderRadius: '50%', pupilScale: 1, color: godMode ? '#ef4444' : (theme === 'light' ? '#0891b2' : '#06b6d4') };

    switch(mood) {
      case 'happy':
        newEmotion = { ...newEmotion, eyeScaleY: 0.6, eyeBorderRadius: '50% 50% 10% 10%' }; 
        break;
      case 'suspicious':
        newEmotion = { ...newEmotion, eyeScaleY: 0.2, pupilScale: 0.5 }; 
        break;
      case 'surprised':
        newEmotion = { ...newEmotion, pupilScale: 0.3 }; 
        break;
      case 'love':
        newEmotion = { ...newEmotion, color: '#ec4899', eyeBorderRadius: '50%' }; 
        break;
      case 'dizzy':
        newEmotion = { ...newEmotion, eyeScaleY: 1.2, color: '#a855f7' }; 
        break;
      case 'sad':
        newEmotion = { ...newEmotion, eyeScaleY: 0.5, eyeBorderRadius: '10% 10% 50% 50%', pupilScale: 0.5 }; 
        break;
      case 'sleep':
        newEmotion = { ...newEmotion, eyeScaleY: 0.05, pupilScale: 0 }; 
        break;
      case 'nudging':
        newEmotion = { ...newEmotion, eyeScaleY: 1, pupilScale: 1 }; 
        break;
      default:
        break;
    }
    setEmotion(newEmotion);
  }, [mood, godMode, theme]);

  // FIXED SLEEP LOGIC
  useEffect(() => {
    const resetIdleTimer = () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(startSleepSequence, 10000); // 10 seconds inactivity
    };

    const startSleepSequence = () => {
      setSleepPhase('approaching');
      setMessage("System idle... checking input.");
      setIsSpeaking(true);
      playSfx('hover', isMuted);
      const targetX = mousePosRef.current.x - 80;
      const targetY = mousePosRef.current.y - 20;
      setTargetPos({ x: targetX, y: targetY });
    };

    const handleUserActivity = () => {
      // If we are currently sleeping or in a sleep phase, wake up!
      if (sleepPhase || mood === 'sleep') {
        setSleepPhase(null);
        setMood('happy');
        setMessage("System Resumed!");
        setIsSpeaking(true);
        playSfx('open', isMuted);
        setTargetPos(null); // Stop moving to target
        if (sequenceTimeout.current) clearTimeout(sequenceTimeout.current);
        
        setTimeout(() => {
           setMood('neutral');
           setIsSpeaking(false);
        }, 2000);
      }
      resetIdleTimer();
    };

    ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt => window.addEventListener(evt, handleUserActivity));
    
    // Initial start
    resetIdleTimer();

    return () => {
      ['mousemove', 'keydown', 'scroll', 'click'].forEach(evt => window.removeEventListener(evt, handleUserActivity));
      if (idleTimer.current) clearTimeout(idleTimer.current);
      if (sequenceTimeout.current) clearTimeout(sequenceTimeout.current);
    };
  }, [sleepPhase, mood, isMuted]); // Key Fix: Included sleepPhase and mood in dependency array

  // Link Hover Handler
  useEffect(() => {
    const handleMouseOver = (e) => {
      if (sleepPhase || mood === 'sleep' || isDragging || godMode) return;
      const target = e.target.closest('a, button');
      if (target) {
        setMood('happy'); 
        playSfx('hover', isMuted);
      }
      else if (mood === 'happy' && !isAnimationPlaying) setMood('neutral');
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [mood, isDragging, godMode, isAnimationPlaying, sleepPhase, isMuted]);

  // Movement Physics & Sleep Sequence Logic
  useEffect(() => {
    if (isDragging) {
      if (moveFrame.current) cancelAnimationFrame(moveFrame.current);
      return;
    }

    const animateMove = () => {
      setBotPos(prev => {
        let nextX = prev.x;
        let nextY = prev.y;
        let dist = 0;

        if (targetPos) {
           const dx = targetPos.x - prev.x;
           const dy = targetPos.y - prev.y;
           dist = Math.sqrt(dx*dx + dy*dy);
           
           if (dist > 1) {
             const speed = 0.08; 
             nextX = prev.x + dx * speed;
             nextY = prev.y + dy * speed;
             setTilt((dx * speed) * 2);
           } else {
             // Arrived at target
             setTilt(0);
             if (sleepPhase === 'approaching') {
               setSleepPhase('nudging');
               setMood('nudging');
               setMessage("Wake up...");
               
               sequenceTimeout.current = setTimeout(() => {
                 setSleepPhase('sad');
                 setMood('sad');
                 setMessage("No response...");
                 
                 sequenceTimeout.current = setTimeout(() => {
                   setSleepPhase('sleeping');
                   setMood('sleep');
                   setMessage("Zzz...");
                 }, 3000);
               }, 3000);
             }
             setTargetPos(null);
           }
        } 

        return { x: nextX, y: nextY };
      });
      moveFrame.current = requestAnimationFrame(animateMove);
    };
    
    moveFrame.current = requestAnimationFrame(animateMove);
    return () => cancelAnimationFrame(moveFrame.current);
  }, [targetPos, isDragging, sleepPhase]);

  // Standard Mouse Follow (When not sleeping)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragOffset.x - botPosRef.current.x;
        setTilt(Math.max(Math.min(dx * 2, 20), -20));
        setBotPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
        setTargetPos(null); 
        setMood('dizzy');
      }
    };
    const handleMouseUp = () => { 
      setIsDragging(false); 
      setTilt(0); 
      setMood('neutral'); 
      const bot = document.getElementById('buddy-bot');
      if(bot) bot.animate([{ transform: 'scale(1, 1)' }, { transform: 'scale(1.2, 0.8)' }, { transform: 'scale(0.9, 1.1)' }, { transform: 'scale(1, 1)' }], { duration: 300 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (mood === 'sleep') return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      if (Math.random() > 0.7) {
        setTimeout(() => setIsBlinking(true), 200);
        setTimeout(() => setIsBlinking(false), 350);
      }
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, [mood]);

  // Section Context
  useEffect(() => {
    if (sleepPhase || mood === 'sleep') return;
    if (godMode) { setMood('scan'); setMessage("GOD MODE ACTIVE"); setIsSpeaking(true); return; }

    let msg = "";
    let newMood = 'neutral';
    switch (currentSection) {
      case 'home': msg = "Hello! I am Buddy."; newMood = 'wave'; break;
      case 'work': msg = "Scanning projects..."; newMood = 'scan'; break;
      case 'stack': msg = "Analyzing skills..."; newMood = 'work'; break;
      case 'about': msg = "Accessing bio..."; newMood = 'neutral'; break;
      case 'contact': msg = "Opening comms..."; newMood = 'love'; break;
      default: msg = "System Ready.";
    }
    if (!isAnimationPlaying) setMood(newMood);
    setMessage(msg);
    setIsSpeaking(true);
    const timeout = setTimeout(() => setIsSpeaking(false), 3000);
    return () => clearTimeout(timeout);
  }, [currentSection, godMode, sleepPhase]);

  const leftEye = calculateEyePosition(0, 0);
  const rightEye = calculateEyePosition(0, 0);

  function calculateEyePosition(baseX, baseY) {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    // Force eyes closed/down for sleep/sad
    if (mood === 'sleep' || mood === 'sad') return { x: baseX, y: baseY + 5 }; 
    const dx = mousePos.x - (botPos.x + 50); 
    const dy = mousePos.y - (botPos.y + 50);
    const distance = Math.min(3, Math.sqrt(dx * dx + dy * dy) / 100);
    const angle = Math.atan2(dy, dx);
    return {
      x: baseX + Math.cos(angle) * distance,
      y: baseY + Math.sin(angle) * distance
    };
  }

  const handleBotMouseDown = (e) => {
    e.preventDefault(); 
    if (!isInteracted) setIsInteracted(true);
    setDragOffset({ x: e.clientX - botPos.x, y: e.clientY - botPos.y });
    setIsDragging(true);
    if(sleepPhase || mood === 'sleep') {
        setSleepPhase(null);
        setMood('dizzy');
    }
    const bot = document.getElementById('buddy-bot');
    if(bot) bot.animate([{ transform: 'scale(1, 1)' }, { transform: 'scale(0.9, 1.1)' }, { transform: 'scale(1, 1)' }], { duration: 200 });
  };

  const handleBotClick = () => {
    if (isDragging) return;
    onOpenChat(); 
    setMood('happy');
    setIsAnimationPlaying(true);
    setMessage("Neural Link Active!");
    setIsSpeaking(true);
    setTimeout(() => {
      setIsAnimationPlaying(false);
      setMood('neutral');
      setIsSpeaking(false);
    }, 1500);
  };

  const getArmStyles = (side) => {
    const base = { transition: 'transform 0.3s ease-out', transformOrigin: side === 'left' ? '28px 65px' : '72px 65px' };
    if (sleepPhase === 'nudging' && side === 'right') return { ...base, animation: 'nudge 0.5s ease-in-out infinite' };
    if (mood === 'wave' && side === 'right') return { ...base, animation: 'wave-arm 1s ease-in-out infinite' };
    if (mood === 'happy') return { ...base, transform: 'rotate(-150deg)' }; 
    if (mood === 'work') return { ...base, animation: 'work-arms 0.1s linear infinite alternate', transform: 'rotate(-20deg)' };
    if (mood === 'dizzy') return { ...base, animation: 'wave-arm 0.2s ease-in-out infinite' };
    if (mood === 'sleep' || mood === 'sad') return { ...base, transform: 'rotate(20deg)' }; 
    return base;
  };

  return (
    <div 
      id="buddy-bot"
      className={`fixed z-[60] group cursor-pointer select-none ${isAnimationPlaying ? 'animate-barrel-roll' : 'animate-float'} ${mood === 'dizzy' ? 'animate-shiver' : ''}`}
      style={{ 
        left: botPos.x, 
        top: botPos.y,
        transform: `rotate(${tilt}deg)`,
        transition: isDragging ? 'none' : 'transform 0.2s ease-out' 
      }}
      onMouseDown={handleBotMouseDown}
      onDoubleClick={handleBotClick}
    >
      <div className={`absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono whitespace-nowrap px-2 rounded pointer-events-none ${theme === 'light' ? 'text-slate-600 bg-white/50 border border-slate-200' : 'text-slate-500 bg-black/50'}`}>
        DOUBLE CLICK TO CHAT
      </div>

      <div className={`absolute bottom-full right-0 mb-4 text-xs font-mono p-3 rounded-lg border whitespace-nowrap transition-all duration-300 transform origin-bottom-right ${isSpeaking ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${theme === 'light' ? 'bg-white border-cyan-200 text-cyan-700 shadow-sm' : 'bg-slate-800 text-cyan-400 border-cyan-500/30'}`}>
        {message}
        <button className={`block mt-2 text-[10px] px-2 py-1 rounded border w-full text-center ${theme === 'light' ? 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100' : 'bg-cyan-900/50 hover:bg-cyan-800 border-cyan-500/30'}`}>
          CONNECT
        </button>
        <div className={`absolute -bottom-1 right-8 w-2 h-2 rotate-45 border-r border-b ${theme === 'light' ? 'bg-white border-cyan-200' : 'bg-slate-800 border-cyan-500/30'}`}></div>
      </div>

      {mood === 'sleep' && (
        <div className="absolute -top-8 right-0 font-bold text-cyan-400">
          <span className="block animate-zzz" style={{ animationDelay: '0s' }}>Z</span>
          <span className="block animate-zzz absolute top-0 right-2" style={{ animationDelay: '0.5s', fontSize: '0.8em' }}>z</span>
          <span className="block animate-zzz absolute top-0 right-4" style={{ animationDelay: '1s', fontSize: '0.6em' }}>z</span>
        </div>
      )}

      {/* BOT SVG */}
      <div className={`relative w-24 h-24 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-transform duration-200 ${isDragging ? 'scale-105' : 'hover:scale-110'}`}>
        <svg viewBox="0 0 100 100" className="overflow-visible">
          <g>
            <path d="M20 80 L80 80 L85 90 L15 90 Z" fill="#334155" />
            <path d="M25 90 L25 95 M35 90 L35 95 M45 90 L45 95 M55 90 L55 95 M65 90 L65 95 M75 90 L75 95" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2 8" className={isDragging || targetPos ? "animate-tracks" : ""} />
          </g>
          
          <rect x="30" y="55" width="40" height="25" rx="4" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <rect x="35" y="60" width="10" height="5" fill="#1e293b" rx="1" />
          <circle cx="60" cy="65" r="3" fill={mood === 'scan' || mood === 'work' ? '#ef4444' : '#22c55e'} className={mood === 'scan' ? 'animate-ping' : ''} />
          
          <g style={getArmStyles('left')}>
             <path d="M28 65 L15 75" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
             <circle cx="15" cy="75" r="3" fill="#334155" /> 
          </g>

          <g style={getArmStyles('right')}>
             <path d="M72 65 L85 75" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
             <circle cx="85" cy="75" r="3" fill="#334155" />
          </g>

          <rect x="45" y="45" width="10" height="10" fill="#64748b" />
          
          <g className="transition-transform duration-100" style={{ transform: `translateY(${isBlinking || mood === 'sleep' ? 2 : 0}px) rotate(${tilt * -0.5}deg)` }}>
            <rect x="25" y="25" width="50" height="25" rx="6" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
            <rect x="28" y="28" width="20" height="19" rx="4" fill="#0f172a" />
            <rect x="52" y="28" width="20" height="19" rx="4" fill="#0f172a" />
            
            {/* LEFT EYE */}
            <g style={{ transform: `translate(${leftEye.x}px, ${leftEye.y}px)` }}>
              <ellipse 
                cx="38" cy="37.5" 
                rx="4" ry={4 * emotion.eyeScaleY} 
                fill={emotion.color} 
                className="transition-all duration-300"
                style={{ borderRadius: emotion.eyeBorderRadius }}
              />
              <circle cx="38" cy="37.5" r={1.5 * emotion.pupilScale} fill="#ffffff" opacity="0.8" style={{ opacity: mood === 'sleep' || isBlinking ? 0 : 0.8 }} />
            </g>

            {/* RIGHT EYE */}
            <g style={{ transform: `translate(${rightEye.x}px, ${rightEye.y}px)` }}>
               <ellipse 
                cx="62" cy="37.5" 
                rx="4" ry={4 * emotion.eyeScaleY} 
                fill={emotion.color} 
                className="transition-all duration-300"
                style={{ borderRadius: emotion.eyeBorderRadius }}
              />
              <circle cx="62" cy="37.5" r={1.5 * emotion.pupilScale} fill="#ffffff" opacity="0.8" style={{ opacity: mood === 'sleep' || isBlinking ? 0 : 0.8 }} />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [heistMode, setHeistMode] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showThemeWave, setShowThemeWave] = useState(false);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
  const [isMuted, setIsMuted] = useState(false); // Audio Mute State
  
  // Gemini States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const godMode = useKonamiCode(isMuted);
  const projectRefs = useRef({});

  const toggleTheme = (e) => {
    if (godMode) return; 
    
    playSfx('click', isMuted); // Sound effect

    if (!document.startViewTransition) {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });
  };

  // Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Section Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setCurrentSection(entry.target.id);
      });
    }, { threshold: 0.3 });
    ['home', 'work', 'stack', 'about', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const skills = [
    'C', 'C++', 'Java', 'Python', 'SQL (MySQL)', 'MongoDB',
    'JavaScript', 'HTML', 'CSS', 'RAG', 'Ontology',
    'LangChain', 'Embeddings', 'PyTorch', 'LLMs',
    'React.js', 'Express.js', 'FastAPI', 'Docker', 'System Design',
    'WebAuthn', 'Manifest V3', 'Cryptography', 'TensorFlow', 
    'Web Scraping', 'Telegram API', 'NLP', 'LSTM', 'Google Cloud', 'Deep Learning'
  ];

  const bgColor = theme === 'light' ? 'bg-slate-50' : 'bg-[#030712]';
  const textColor = theme === 'light' ? 'text-slate-900' : 'text-slate-300';

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden transition-colors duration-500 ${bgColor} ${textColor} cursor-none ${theme}`}>
      <GlobalStyles godMode={godMode} theme={theme} />

      {/* WAVE ANIMATION OVERLAY */}
      {showThemeWave && (
        <div 
          className="theme-transition-overlay"
          style={{ 
            '--click-x': `${clickCoords.x}px`, 
            '--click-y': `${clickCoords.y}px`,
            backgroundColor: theme === 'light' ? '#030712' : '#f8fafc' 
          }}
        />
      )}

      {/* NEW: Scroll Progress */}
      <ScrollProgress godMode={godMode} theme={theme} />

      {/* NEW: Network Background (Sonar Edition) */}
      <NetworkBackground godMode={godMode} theme={theme} isMuted={isMuted} />

      {/* NEW: Trailing Cursor */}
      <TrailingCursor mousePos={mousePos} godMode={godMode} theme={theme} />

      {/* NEW: Resume Heist Modal */}
      {heistMode && <ResumeHeist onClose={() => setHeistMode(false)} godMode={godMode} theme={theme} isMuted={isMuted} />}

      {/* GEMINI CHAT INTERFACE */}
      {isChatOpen && <ChatInterface onClose={() => setIsChatOpen(false)} theme={theme} isMuted={isMuted} />}
      
      {/* GEMINI DECLASSIFY MODAL */}
      {selectedProject && <DeclassifyModal project={selectedProject} onClose={() => setSelectedProject(null)} theme={theme} isMuted={isMuted} />}

      {/* 1. NEURAL LINK SVG */}
      <NeuralLinkOverlay hoveredSkill={hoveredSkill} projectRefs={projectRefs} mousePos={mousePos} />

      {/* 3. INTERACTIVE BOT */}
      <InteractiveBot 
        currentSection={currentSection} 
        mousePos={mousePos} 
        godMode={godMode} 
        onOpenChat={() => setIsChatOpen(true)}
        theme={theme}
        isMuted={isMuted}
      />

      {/* HEADER */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-sm border-b transition-colors duration-300 ${theme === 'light' ? 'bg-white/70 border-slate-200' : 'bg-black/20 border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-mono text-xl font-bold tracking-tighter flex items-center gap-2">
            <Zap size={20} className={godMode ? "text-red-500" : "text-yellow-500"} />
            <span className={godMode ? "text-red-500" : (theme === 'light' ? "text-cyan-700" : "text-cyan-400")}>
              {godMode ? "SKYNET_CORE" : "YANNAKULA SYAM CHAND"}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <nav className={`hidden md:flex space-x-8 text-sm font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
              {['Work', 'Stack', 'About', 'Contact'].map((item) => (
                <MagneticButton key={item} href={`#${item.toLowerCase()}`} isMuted={isMuted} className={`relative group p-2 hover:${theme === 'light' ? 'text-black' : 'text-white'}`}>
                  <span className={`${godMode ? "text-red-500" : (theme === 'light' ? "text-cyan-600" : "text-cyan-500/50")} mr-1 opacity-0 group-hover:opacity-100 transition-opacity`}>/</span>
                  {item}
                </MagneticButton>
              ))}
            </nav>
            {/* AUDIO TOGGLE BUTTON */}
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-full border transition-all ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            {/* THEME TOGGLE BUTTON */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${
                theme === 'light' 
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200' 
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono 
              ${godMode ? 'border-red-500/50 bg-red-500/10 text-red-400' : 
                (theme === 'light' ? 'border-cyan-200 bg-cyan-50 text-cyan-800' : 'border-cyan-500/20 bg-cyan-500/5 text-cyan-400')
              }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${godMode ? 'bg-red-400' : 'bg-cyan-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${godMode ? 'bg-red-500' : 'bg-cyan-500'}`}></span>
              </span>
              <HackerText text={godMode ? "THREAT LEVEL: MIDNIGHT" : "System Online: Available for Hire"} />
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              <div className={`transition-colors ${theme === 'light' ? 'hover:text-cyan-600' : 'hover:text-cyan-400'}`}><HackerText text="BUILDING" /></div>
              <div className="flex items-center gap-4">
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${godMode ? 'from-red-500 to-orange-600' : (theme === 'light' ? 'from-cyan-600 to-blue-700' : 'from-cyan-400 to-blue-600')}`}>
                  INTELLIGENCE
                </span>
              </div>
              <div className={theme === 'light' ? 'text-slate-500' : 'text-slate-600'}>FROM DATA.</div>
            </h1>
            
            <div className={`text-xl max-w-lg leading-relaxed border-l-2 pl-6 ${theme === 'light' ? 'text-slate-600 border-cyan-200' : 'text-slate-400 border-cyan-500/30'}`}>
              I architect RAG pipelines and AI Agents that turn raw information into actionable knowledge. Currently engineering the future of healthcare at Connex AI.
            </div>

            <div className="flex gap-4 pt-4">
              <MagneticButton href="#work" isMuted={isMuted} className={`group relative px-6 py-3 font-bold rounded-lg overflow-hidden inline-flex items-center gap-2 ${godMode ? 'bg-red-600 text-black' : (theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black')}`}>
                <div className={`absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${godMode ? 'bg-black' : 'bg-cyan-400'}`}></div>
                <span className={`relative flex items-center gap-2 group-hover:text-white transition-colors`}>
                  View Projects <ArrowUpRight size={18} />
                </span>
              </MagneticButton>
            </div>
          </div>

          <div className="relative hidden lg:flex justify-center items-center">
             <div className={`absolute w-[500px] h-[500px] rounded-full blur-3xl ${godMode ? 'bg-red-500/20' : 'bg-gradient-to-b from-cyan-500/5 to-purple-500/5'}`}></div>
             <div className="relative w-96 h-96">
              <div className={`absolute inset-0 border rounded-full animate-spin-slow border-dashed ${godMode ? 'border-red-500/20' : (theme === 'light' ? 'border-cyan-200' : 'border-cyan-500/20')}`}></div>
              <div className={`absolute inset-8 border rounded-full animate-spin-reverse-slower ${godMode ? 'border-orange-500/20' : (theme === 'light' ? 'border-purple-300' : 'border-purple-500/20')}`}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Cpu size={64} className={`${godMode ? 'text-red-500' : (theme === 'light' ? 'text-cyan-600' : 'text-cyan-400')} drop-shadow-2xl`} />
              </div>
             </div>
          </div>
        </div>
      </section>

      {/* RESTORED MARQUEE SKILLS SECTION */}
      <section id="stack" className={`w-full py-12 border-y overflow-hidden backdrop-blur-md ${theme === 'light' ? 'bg-white/50 border-slate-200' : 'bg-slate-950/80 border-white/5'}`}>
        <div className="max-w-7xl mx-auto px-6 mb-6 flex items-center gap-2 font-mono text-sm">
          <Terminal size={14} className={godMode ? 'text-red-500' : (theme === 'light' ? 'text-cyan-600' : 'text-cyan-500')} />
          <span className={godMode ? 'text-red-500' : (theme === 'light' ? 'text-cyan-600' : 'text-cyan-500')}><HackerText text="CURRENT_STACK_TRACE" /></span>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-8 py-4 group-hover:[animation-play-state:paused]">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`flex items-center gap-2 text-2xl font-bold transition-all cursor-pointer uppercase ${
                  hoveredSkill === skill 
                    ? (godMode ? 'text-red-500 scale-110' : (theme === 'light' ? 'text-cyan-600 scale-110' : 'text-cyan-400 scale-110')) 
                    : (theme === 'light' ? 'text-slate-400' : 'text-slate-700')
                }`}
              >
                {skill} <span className={theme === 'light' ? 'text-slate-300 text-lg' : 'text-slate-800 text-lg'}>✦</span>
              </div>
            ))}
          </div>
          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 py-4 group-hover:[animation-play-state:paused]">
            {[...skills, ...skills, ...skills].map((skill, i) => (
              <div 
                key={i} 
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`flex items-center gap-2 text-2xl font-bold transition-all cursor-pointer uppercase ${
                  hoveredSkill === skill 
                    ? (godMode ? 'text-red-500 scale-110' : (theme === 'light' ? 'text-cyan-600 scale-110' : 'text-cyan-400 scale-110')) 
                    : (theme === 'light' ? 'text-slate-400' : 'text-slate-700')
                }`}
              >
                {skill} <span className={theme === 'light' ? 'text-slate-300 text-lg' : 'text-slate-800 text-lg'}>✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section id="work" className="py-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}><HackerText text="Selected Work" /></h2>
            {godMode && <div className="text-red-500 font-bold animate-pulse">WARNING: CLASSIFIED ARCHIVES UNLOCKED</div>}
          </div>
          <div className={`h-px flex-grow md:mx-8 ${theme === 'light' ? 'bg-slate-200' : 'bg-slate-800'}`}></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
          {/* Render Standard Projects */}
          {PROJECTS_DATA.map((project) => {
            const isRelated = hoveredSkill && project.tags.some(t => t.toLowerCase().includes(hoveredSkill.toLowerCase()));
            const isDimmed = hoveredSkill && !isRelated;

            return (
              <div 
                key={project.id}
                ref={el => projectRefs.current[project.id] = el}
                className={`md:col-span-${project.size === 'large' ? '2' : '1'} transition-all duration-300 ${isDimmed ? 'opacity-20 blur-sm scale-95' : 'opacity-100'}`}
              >
                <TiltCard className={`h-full group ${isRelated ? 'ring-2 ring-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : ''}`} godMode={godMode} theme={theme} isMuted={isMuted}>
                  <div className="h-full p-8 flex flex-col justify-between z-10 relative">
                    {/* Corners */}
                    <div className={`absolute top-4 left-4 w-2 h-2 border-t border-l ${theme === 'light' ? 'border-slate-300' : 'border-white/20'}`}></div>
                    <div className={`absolute top-4 right-4 w-2 h-2 border-t border-r ${theme === 'light' ? 'border-slate-300' : 'border-white/20'}`}></div>
                    <div className={`absolute bottom-4 left-4 w-2 h-2 border-b border-l ${theme === 'light' ? 'border-slate-300' : 'border-white/20'}`}></div>
                    <div className={`absolute bottom-4 right-4 w-2 h-2 border-b border-r ${theme === 'light' ? 'border-slate-300' : 'border-white/20'}`}></div>

                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-lg border ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-700'} text-${project.color}-400`}>
                        {project.icon}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* GEMINI TRIGGER: DECLASSIFY BUTTON */}
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                          title="Ask AI to Declassify Specs"
                        >
                          ✨
                        </button>
                        {project.links?.demo && (
                           <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full hover:scale-110 transition-transform ${theme === 'light' ? 'bg-slate-100 text-black hover:bg-slate-200' : 'bg-white text-black'}`}><ExternalLink size={16} /></a>
                        )}
                        {project.links?.github && (
                           <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full hover:scale-110 transition-transform ${theme === 'light' ? 'bg-slate-800 text-white' : 'bg-slate-800 text-white'}`}><Github size={16} /></a>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>{project.title}</h3>
                      <p className={`text-sm mb-4 ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(t => (
                          <span key={t} className={`text-xs font-mono px-2 py-1 rounded border ${theme === 'light' ? `border-${project.color}-200 bg-${project.color}-50 text-${project.color}-700` : `border-${project.color}-500/30 text-${project.color}-300 bg-${project.color}-500/10`}`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}

          {/* HIDDEN KONAMI PROJECT */}
          {godMode && (
            <div className="md:col-span-3 animate-in zoom-in duration-500">
               <TiltCard className="h-full group border-red-600 bg-red-950/20 shadow-[0_0_50px_rgba(220,38,38,0.5)]" godMode={godMode} isMuted={isMuted}>
                 <div className="h-full p-8 flex flex-col items-center justify-center text-center z-10 relative">
                    <Lock className="text-red-500 mb-4 animate-bounce" size={48} />
                    <h3 className="text-4xl font-bold text-red-500 mb-2 tracking-widest">{SECRET_PROJECT.title}</h3>
                    <p className="text-red-300 max-w-xl text-lg">{SECRET_PROJECT.desc}</p>
                    <div className="mt-6 p-2 bg-black border border-red-500 font-mono text-red-500 text-sm">
                      ACCESS GRANTED: LEVEL 5 CLEARANCE
                    </div>
                 </div>
               </TiltCard>
            </div>
          )}
        </div>
      </section>

      {/* EXPERIENCE / ABOUT */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className={`absolute inset-0 opacity-20 ${godMode ? 'bg-red-900/10' : (theme === 'light' ? 'bg-slate-100' : 'bg-[#050a15]')}`} style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <span className={`w-12 h-[2px] ${godMode ? 'bg-red-500' : (theme === 'light' ? 'bg-cyan-600' : 'bg-cyan-500')}`}></span>
            <span className={`${godMode ? 'text-red-500' : (theme === 'light' ? 'text-cyan-700' : 'text-cyan-500')} font-mono tracking-widest text-sm uppercase`}>Career Trajectory</span>
          </div>

          <div className={`relative border-l ml-3 space-y-16 ${theme === 'light' ? 'border-slate-300' : 'border-slate-800'}`}>
            
            {/* Current Role */}
            <div className="relative pl-12 group">
              <span className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 transition-all ${
                godMode ? 'bg-red-500 group-hover:ring-red-500/20 ring-[#030712]' : 
                (theme === 'light' ? 'bg-cyan-600 ring-white group-hover:ring-cyan-200' : 'bg-cyan-500 ring-[#030712] group-hover:ring-cyan-500/20')
              }`}></span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
                <h3 className={`text-2xl font-bold transition-colors ${godMode ? 'text-white group-hover:text-red-400' : (theme === 'light' ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-400')}`}>Connex AI</h3>
                <span className={`font-mono text-xs px-3 py-1 rounded-full border ${theme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'text-slate-500 bg-slate-900 border-slate-800'}`}>
                  Sep 2025 - Present
                </span>
              </div>
              
              <h4 className={`text-lg mb-4 ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>Python Developer Intern</h4>
              <p className={`${theme === 'light' ? 'text-slate-600' : 'text-slate-400'} leading-relaxed mb-6`}>
                Spearheading the development of intelligent healthcare systems. My core focus is architecting <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>RAG pipelines</strong> that allow LLMs to query complex medical ontologies stored in <strong className={theme === 'light' ? 'text-slate-900' : 'text-white'}>Neo4j</strong>.
              </p>
              
              <div className={`p-4 rounded-lg border flex gap-4 overflow-x-auto ${theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800/50'}`}>
                <div className={`flex-shrink-0 flex items-center gap-2 text-xs font-mono ${godMode ? 'text-red-300' : (theme === 'light' ? 'text-cyan-700' : 'text-cyan-300')}`}>
                  <Command size={14} /> Neo4j Graph Integration
                </div>
                <div className={`flex-shrink-0 flex items-center gap-2 text-xs font-mono ${godMode ? 'text-red-300' : (theme === 'light' ? 'text-cyan-700' : 'text-cyan-300')}`}>
                  <Command size={14} /> Vector Embeddings
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative pl-12 group">
              <span className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 transition-all ${
                godMode ? 'bg-red-500 group-hover:ring-red-500/20 ring-[#030712]' : 
                (theme === 'light' ? 'bg-purple-600 ring-white group-hover:ring-purple-200' : 'bg-slate-600 ring-[#030712] group-hover:bg-purple-500 group-hover:ring-purple-500/20')
              }`}></span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-4">
                <h3 className={`text-2xl font-bold transition-colors ${godMode ? 'text-white group-hover:text-red-400' : (theme === 'light' ? 'text-slate-900 group-hover:text-purple-600' : 'text-white group-hover:text-purple-400')}`}>Vellore Institute of Technology</h3>
                <span className={`font-mono text-xs px-3 py-1 rounded-full border ${theme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'text-slate-500 bg-slate-900 border-slate-800'}`}>
                  2022 - Present
                </span>
              </div>
              
              <h4 className="text-lg text-slate-300 mb-2">B.Tech Computer Science</h4>
              <p className="text-slate-400 mb-4">CGPA: 8.86/10</p>
            </div>

          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className={`py-20 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-6">
           <h2 className={`text-xl font-bold mb-8 flex items-center gap-2 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
             <Award className={godMode ? "text-red-500" : "text-yellow-500"} /> Authorized Certifications
           </h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               "Microsoft Azure AI Fundamentals",
               "Oracle Cloud Infrastructure 2025",
               "Cisco Cyber Security",
               "IIT Bombay Advanced C++"
             ].map((cert, i) => (
               <div key={i} className={`p-4 rounded-lg border transition-colors ${theme === 'light' ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm' : 'bg-slate-900/30 border-slate-800 hover:border-slate-600'}`}>
                 <div className={`h-1 w-8 rounded-full mb-3 ${godMode ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}></div>
                 <p className={`text-sm font-medium ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>{cert}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FOOTER / TERMINAL */}
      <footer id="contact" className={`py-32 px-6 border-t ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#030712] border-slate-800'}`}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className={`text-5xl font-bold mb-8 ${godMode ? 'text-red-500' : (theme === 'light' ? 'text-slate-900' : 'text-white')}`}>
            READY TO <span className={godMode ? 'text-red-700' : (theme === 'light' ? 'text-cyan-600' : 'text-cyan-500')}>EXECUTE?</span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <a href="mailto:syamchandyannakula@gmail.com" className={`inline-flex items-center gap-3 px-8 py-4 font-bold rounded-full transition-transform hover:scale-105 ${godMode ? 'bg-red-600 text-black' : (theme === 'light' ? 'bg-slate-900 text-white' : 'bg-white text-black')}`}>
              <Mail size={20} />
              Initialize Communication
            </a>
            
            {/* NEW: Resume Heist Button */}
            <button 
              onClick={() => setHeistMode(true)}
              className={`inline-flex items-center gap-3 px-8 py-4 font-bold rounded-full border-2 transition-transform hover:scale-105 ${godMode ? 'border-red-600 text-red-500 hover:bg-red-600 hover:text-black' : (theme === 'light' ? 'border-cyan-600 text-cyan-700 hover:bg-cyan-600 hover:text-white' : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black')}`}
            >
              <Download size={20} />
              EXTRACT RESUME DATA
            </button>
          </div>

          <div className="mt-20 flex justify-center gap-8 text-slate-500">
            <a href="https://www.linkedin.com/in/syam-chand-yannakula-350325243/" target="_blank" rel="noopener noreferrer" className={`transition-colors ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}`}>LINKEDIN</a>
            <a href="https://github.com/Syamchand123" target="_blank" rel="noopener noreferrer" className={`transition-colors ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}`}>GITHUB</a>
          </div>
          
          <p className="mt-12 text-slate-500 text-sm font-mono">
            {godMode ? "RUNNING PROTOCOL: OMEGA" : "SYSTEM.EXIT(0) // YSC © 2025"}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;