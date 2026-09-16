"use client";

import { useState, useRef, useEffect } from "react";

const SCENARIOS = [
  { icon: "☕", label: "Ordering Coffee", desc: "Practice ordering at a cafe", prompt: "Let's practice ordering coffee at a cafe. You walk in and I'm the barista. What would you like to order?", mode: "casual" },
  { icon: "✈️", label: "At the Airport", desc: "Navigate an airport in English", prompt: "Let's practice airport English. You just arrived at the airport for your first international flight. I'm the check-in staff. How can I help you today?", mode: "casual" },
  { icon: "💼", label: "Job Interview", desc: "Ace your interview in English", prompt: "Let's practice a job interview! I'll be the interviewer. So, tell me a little about yourself — why are you interested in this position?", mode: "casual" },
  { icon: "🍜", label: "Food & Cooking", desc: "Talk about your favorite foods", prompt: "Hey! I'm curious — what's your favorite Indonesian food? And have you ever tried cooking it yourself?", mode: "casual" },
  { icon: "🎮", label: "Gaming Chat", desc: "Talk about games you love", prompt: "Hey! Are you into gaming? What games are you playing right now? I'd love to hear about your favorites!", mode: "casual" },
  { icon: "🎵", label: "Music & Artists", desc: "Share your music taste", prompt: "What kind of music are you into? Any favorite artists or songs lately? Let's chat about music!", mode: "casual" },
];

const TEST_PREP = [
  { icon: "🎓", label: "IELTS Part 1", desc: "Introduction & Interview — personal questions", prompt: "Welcome to your IELTS Speaking practice! I'm your examiner. Let's begin with Part 1. First, can you tell me your full name, please?", mode: "ielts_part1", badge: "IELTS", badgeColor: "#7c3aed" },
  { icon: "🗣️", label: "IELTS Part 2", desc: "Long Turn — speak for 2 minutes on a topic", prompt: "Welcome to IELTS Speaking Part 2 practice! I'm going to give you a topic card. You'll have 1 minute to prepare, then speak for 1–2 minutes. Ready? Here's your first cue card.", mode: "ielts_part2", badge: "IELTS", badgeColor: "#7c3aed" },
  { icon: "💬", label: "IELTS Part 3", desc: "Discussion — deeper analytical questions", prompt: "Welcome to IELTS Speaking Part 3 practice! This is the discussion round where we explore ideas in more depth. I'll ask you some questions that require you to analyse, compare, and give your opinion. Let's begin.", mode: "ielts_part3", badge: "IELTS", badgeColor: "#7c3aed" },
  { icon: "🇺🇸", label: "TOEFL Independent", desc: "Express & support your personal opinion", prompt: "Welcome to TOEFL iBT Speaking practice! We'll start with an Independent Speaking Task. I'll give you a question, you get 15 seconds to prepare, then 45 seconds to speak. Ready? Here's your first question.", mode: "toefl_independent", badge: "TOEFL", badgeColor: "#ea580c" },
  { icon: "📚", label: "TOEFL Integrated", desc: "Summarise readings & lectures", prompt: "Welcome to TOEFL iBT Integrated Speaking practice! I'll present you with a short reading passage and a related lecture, then ask you to summarise and connect the information. Let's start with Task 2.", mode: "toefl_integrated", badge: "TOEFL", badgeColor: "#ea580c" },
];

const C = {
  blue: "#1e3a8a",
  blueMid: "#2563eb",
  blueLight: "#3b82f6",
  bluePale: "#dbeafe",
  red: "#dc2626",
  redDark: "#b91c1c",
  white: "#ffffff",
  offWhite: "#f8faff",
  navy: "#0f1d44",
  gray: "#64748b",
  grayLight: "#e2e8f0",
};

// Union Jack SVG as a reusable component for the "Eng" badge background
function UnionJackBadge({ text = "ENG", height = 28, fontSize = 16, borderRadius = 0 }) {
  const width = Math.round(height * 2.1);
  return (
    <span style={{
      display: "inline-block", position: "relative", verticalAlign: "middle",
      marginLeft: 4,
    }}>
      <svg width={width} height={height} viewBox="0 0 84 40" style={{
        borderRadius, display: "block",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      }}>
        {/* Base blue */}
        <rect width="84" height="40" rx={borderRadius} fill="#012169"/>
        {/* Clip to rounded rect */}
        <defs>
          <clipPath id={`flagClip-${height}`}>
            <rect width="84" height="40" rx={borderRadius} />
          </clipPath>
        </defs>
        <g clipPath={`url(#flagClip-${height})`}>
          {/* White diagonal stripes */}
          <path d="M0,0 L84,40" stroke="#fff" strokeWidth="9"/>
          <path d="M84,0 L0,40" stroke="#fff" strokeWidth="9"/>
          {/* Red diagonal stripes (thinner, offset per proper Union Jack) */}
          <path d="M0,0 L42,20" stroke="#C8102E" strokeWidth="4"/>
          <path d="M84,0 L42,20" stroke="#C8102E" strokeWidth="4"/>
          <path d="M42,20 L84,40" stroke="#C8102E" strokeWidth="4"/>
          <path d="M42,20 L0,40" stroke="#C8102E" strokeWidth="4"/>
          {/* White cross */}
          <rect x="0" y="15" width="84" height="10" fill="#fff"/>
          <rect x="36" y="0" width="12" height="40" fill="#fff"/>
          {/* Red cross */}
          <rect x="0" y="17" width="84" height="6" fill="#C8102E"/>
          <rect x="38" y="0" width="8" height="40" fill="#C8102E"/>
        </g>
        {/* Light overlay - keep flag vibrant */}
        <rect width="84" height="40" rx={borderRadius} fill="rgba(0,0,30,0.1)"/>
        <defs>
          <linearGradient id={`gold-${height}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE566"/>
            <stop offset="20%" stopColor="#FFD700"/>
            <stop offset="45%" stopColor="#FFFACD"/>
            <stop offset="55%" stopColor="#FFD700"/>
            <stop offset="80%" stopColor="#DAA520"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
        </defs>
        {/* Thick dark navy outline — ensures contrast against white, red, AND blue */}
        <text
          x="42" y="21"
          textAnchor="middle" dominantBaseline="central"
          fill="none"
          stroke="#0a1033"
          strokeWidth="5"
          strokeLinejoin="round"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="900"
          fontSize={fontSize * 1.35}
          letterSpacing="2.5"
          paintOrder="stroke"
        >
          {text}
        </text>
        {/* Mid dark stroke for smooth edge */}
        <text
          x="42" y="21"
          textAnchor="middle" dominantBaseline="central"
          fill="none"
          stroke="#1a2a5e"
          strokeWidth="3"
          strokeLinejoin="round"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="900"
          fontSize={fontSize * 1.35}
          letterSpacing="2.5"
          paintOrder="stroke"
        >
          {text}
        </text>
        {/* Gold fill on top */}
        <text
          x="42" y="21"
          textAnchor="middle" dominantBaseline="central"
          fill={`url(#gold-${height})`}
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
          fontWeight="900"
          fontSize={fontSize * 1.35}
          letterSpacing="2.5"
        >
          {text}
        </text>
      </svg>
    </span>
  );
}

function BrandLogo({ size = "normal" }) {
  const isLarge = size === "large";
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      fontSize: isLarge ? 32 : 15, fontWeight: 800, letterSpacing: "-0.5px",
    }}>
      <span style={{ color: C.white }}>Ngobrol</span>
      <UnionJackBadge
        text="ENG"
        height={isLarge ? 38 : 22}
        fontSize={isLarge ? 18 : 12}
        borderRadius={0}
      />
    </span>
  );
}

function SmallFlag() {
  return (
    <svg width="22" height="14" viewBox="0 0 60 36" style={{ borderRadius: 2, border: "1px solid rgba(255,255,255,0.2)", flexShrink: 0 }}>
      <rect width="60" height="36" fill="#012169"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,36 M60,0 L0,36" stroke="#C8102E" strokeWidth="3"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 V36 M0,18 H60" stroke="#C8102E" strokeWidth="6"/>
    </svg>
  );
}

function FoxMascot({ size = 120 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ display: "block" }}>
      {/* === CHEEKY LONDON FOX === */}
      
      {/* Body */}
      <ellipse cx="100" cy="155" rx="42" ry="26" fill="#E8630A"/>
      <ellipse cx="100" cy="158" rx="30" ry="18" fill="#FFF0DC"/>
      
      {/* Big bushy tail — curling up cheekily */}
      <path d="M145,148 Q175,130 170,100 Q168,85 155,82" stroke="none" fill="#E8630A"/>
      <path d="M148,150 Q172,132 168,104 Q166,90 156,86" stroke="none" fill="#D45500"/>
      {/* White tail tip */}
      <path d="M155,82 Q150,78 156,86 Q162,84 155,82" fill="#FFF0DC"/>
      <circle cx="155" cy="83" r="5" fill="#FFF8F0"/>
      
      {/* Legs — short and playful */}
      <rect x="72" y="168" width="13" height="18" rx="6" fill="#E8630A"/>
      <rect x="115" y="168" width="13" height="18" rx="6" fill="#E8630A"/>
      <rect x="72" y="179" width="13" height="7" rx="5" fill="#2D1B0E"/>
      <rect x="115" y="179" width="13" height="7" rx="5" fill="#2D1B0E"/>
      
      {/* Head — slightly tilted for cheekiness */}
      <g transform="rotate(-5, 100, 98)">
        {/* Head shape */}
        <ellipse cx="100" cy="98" rx="40" ry="36" fill="#E8630A"/>
        {/* Cheek fur */}
        <ellipse cx="68" cy="108" rx="12" ry="10" fill="#D45500"/>
        <ellipse cx="132" cy="108" rx="12" ry="10" fill="#D45500"/>
        {/* White face */}
        <path d="M80,85 Q100,78 120,85 L116,120 Q100,130 84,120 Z" fill="#FFF0DC"/>
        
        {/* Ears — big pointy fox ears */}
        <path d="M62,82 Q52,42 76,64 L72,86 Z" fill="#E8630A"/>
        <path d="M64,80 Q56,50 74,66 L72,84 Z" fill="#D45500"/>
        <path d="M66,78 Q60,56 73,68 L72,80 Z" fill="#FFB8B8"/>
        
        <path d="M138,82 Q148,42 124,64 L128,86 Z" fill="#E8630A"/>
        <path d="M136,80 Q144,50 126,66 L128,84 Z" fill="#D45500"/>
        <path d="M134,78 Q140,56 127,68 L128,80 Z" fill="#FFB8B8"/>
        
        {/* === EYES — one open, one WINKING === */}
        {/* Left eye — open, looking at you */}
        <ellipse cx="86" cy="95" rx="9" ry="10" fill="#fff"/>
        <ellipse cx="88" cy="96" rx="6" ry="7" fill="#2D1B0E"/>
        <circle cx="90" cy="93" r="2.5" fill="#fff"/>
        <circle cx="86" cy="98" r="1.2" fill="#fff" opacity="0.5"/>
        {/* Raised eyebrow — cheeky */}
        <path d="M76,84 Q82,78 95,83" stroke="#D45500" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        
        {/* Right eye — WINKING */}
        <path d="M107,95 Q114,88 121,95" stroke="#2D1B0E" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Wink crinkle lines */}
        <path d="M122,91 L126,89" stroke="#D45500" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M123,95 L127,95" stroke="#D45500" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Nose — fox shaped */}
        <ellipse cx="100" cy="108" rx="6" ry="4.5" fill="#2D1B0E"/>
        <ellipse cx="101.5" cy="107" rx="2" ry="1.2" fill="#5A4030" opacity="0.5"/>
        
        {/* Mouth — big cheeky grin */}
        <path d="M90,113 Q95,119 100,114 Q105,119 110,113" stroke="#2D1B0E" strokeWidth="2" fill="none" strokeLinecap="round"/>
        
        {/* Tongue sticking out — playful */}
        <ellipse cx="100" cy="119" rx="5" ry="7" fill="#FF6B6B"/>
        <ellipse cx="100" cy="118" rx="3.5" ry="4.5" fill="#FF9090"/>
        {/* Tongue line */}
        <line x1="100" y1="115" x2="100" y2="122" stroke="#E55555" strokeWidth="0.8"/>
        
        {/* Whiskers */}
        <line x1="70" y1="105" x2="82" y2="108" stroke="#D45500" strokeWidth="1" opacity="0.5"/>
        <line x1="68" y1="110" x2="82" y2="112" stroke="#D45500" strokeWidth="1" opacity="0.5"/>
        <line x1="118" y1="108" x2="130" y2="105" stroke="#D45500" strokeWidth="1" opacity="0.5"/>
        <line x1="118" y1="112" x2="132" y2="110" stroke="#D45500" strokeWidth="1" opacity="0.5"/>
      </g>
      
      {/* === RED HEADPHONES === */}
      <g transform="rotate(-5, 100, 98)">
        <path d="M58,88 Q56,50 100,44 Q144,50 142,88" stroke="#333" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M66,78 Q66,56 100,50 Q134,56 134,78" stroke="#555" strokeWidth="1.5" fill="none"/>
        
        <rect x="48" y="80" width="18" height="24" rx="6" fill="#C8102E"/>
        <rect x="50" y="82" width="14" height="20" rx="5" fill="#E02040"/>
        <circle cx="57" cy="92" r="4" fill="#A00020" opacity="0.4"/>
        <circle cx="57" cy="92" r="2" fill="#C8102E"/>
        
        <rect x="134" y="80" width="18" height="24" rx="6" fill="#C8102E"/>
        <rect x="136" y="82" width="14" height="20" rx="5" fill="#E02040"/>
        <circle cx="143" cy="92" r="4" fill="#A00020" opacity="0.4"/>
        <circle cx="143" cy="92" r="2" fill="#C8102E"/>
      </g>
      
      {/* === SPEECH BUBBLE — cheeky greeting === */}
      <rect x="138" y="38" width="56" height="30" rx="10" fill="#fff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <polygon points="142,64 148,70 154,62" fill="#fff"/>
      <text x="166" y="48" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.navy}
        fontFamily="Inter, -apple-system, sans-serif">Yo, let's</text>
      <text x="166" y="60" textAnchor="middle" fontSize="9" fontWeight="700" fill={C.red}
        fontFamily="Inter, -apple-system, sans-serif">ngobrol! 😜</text>
    </svg>
  );
}

function MiniFoxFace({ size = 28 }) {
  return (
    <svg viewBox="55 55 90 90" width={size} height={size}>
      <g transform="rotate(-5, 100, 98)">
        <ellipse cx="100" cy="98" rx="40" ry="36" fill="#E8630A"/>
        <ellipse cx="68" cy="108" rx="10" ry="8" fill="#D45500"/>
        <ellipse cx="132" cy="108" rx="10" ry="8" fill="#D45500"/>
        <path d="M80,85 Q100,78 120,85 L116,120 Q100,130 84,120 Z" fill="#FFF0DC"/>
        <path d="M62,82 Q52,42 76,64 L72,86 Z" fill="#E8630A"/>
        <path d="M138,82 Q148,42 124,64 L128,86 Z" fill="#E8630A"/>
        <path d="M66,78 Q60,56 73,68 L72,80 Z" fill="#FFB8B8"/>
        <path d="M134,78 Q140,56 127,68 L128,80 Z" fill="#FFB8B8"/>
        <ellipse cx="86" cy="95" rx="7" ry="8" fill="#fff"/>
        <ellipse cx="88" cy="96" rx="5" ry="6" fill="#2D1B0E"/>
        <circle cx="90" cy="93" r="2" fill="#fff"/>
        <path d="M107,95 Q114,88 121,95" stroke="#2D1B0E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="100" cy="108" rx="5" ry="3.5" fill="#2D1B0E"/>
        <path d="M90,113 Q95,119 100,114 Q105,119 110,113" stroke="#2D1B0E" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="100" cy="119" rx="4" ry="5" fill="#FF6B6B"/>
      </g>
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 5, padding: "12px 16px", alignItems: "center" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%", background: "#94a3b8",
          animation: `bounce 1.2s ease-in-out ${i * 0.15}s infinite`,
        }} />
      ))}
      <style>{`@keyframes bounce { 0%,60%,100% { transform: translateY(0) } 30% { transform: translateY(-6px) } }`}</style>
    </div>
  );
}

function Message({ msg, voiceId, autoPlay, onSpeakDone, activeAudioRef }){
  const isUser = msg.role === "user";
  const [speaking, setSpeaking] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const hasAutoPlayed = useRef(false);

  function handleSpeakEnd() {
    setSpeaking(false);
    if (onSpeakDone) onSpeakDone();
  }

  async function speakMessage() {
    // If already playing, stop
    if (speaking && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setSpeaking(false);
      return;
    }

    // If we already generated audio for this message, replay it
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      if (activeAudioRef) activeAudioRef.current = audio;
      audio.onended = () => handleSpeakEnd();
      audio.onerror = () => setSpeaking(false);
      setSpeaking(true);
      audio.play().catch(() => setSpeaking(false));
      return;
    }

    // Try server-side ElevenLabs first, fallback to browser TTS
    setSpeaking(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: msg.content,
          voiceId: voiceId || "21m00Tcm4TlvDq8ikWAM",
        }),
      });
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType?.includes("audio")) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        const audio = new Audio(url);
        audioRef.current = audio;
        if (activeAudioRef) activeAudioRef.current = audio;
        audio.onended = () => handleSpeakEnd();
        audio.onerror = () => setSpeaking(false);
        audio.play().catch(() => setSpeaking(false));
        return;
      }
    } catch {}

    // Fallback: browser TTS
    const utterance = new SpeechSynthesisUtterance(msg.content);
    utterance.lang = "en-GB";
    utterance.rate = 0.9;
    utterance.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const british = voices.find(v => v.lang === "en-GB") || voices.find(v => v.lang.startsWith("en"));
    if (british) utterance.voice = british;
    utterance.onend = () => handleSpeakEnd();
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  // Auto-play voice for the latest AI message
  useEffect(() => {
    if (autoPlay && !isUser && !hasAutoPlayed.current) {
      hasAutoPlayed.current = true;
      speakMessage();
    }
  }, [autoPlay]);

  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 10, paddingInline: 4,
    }}>
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginRight: 8, flexShrink: 0, marginTop: 2,
          overflow: "hidden",
          boxShadow: "0 2px 6px rgba(30,58,138,0.2)",
        }}>
          <MiniFoxFace size={30} />
        </div>
      )}
      <div style={{ maxWidth: "78%" }}>
        <div style={{
          padding: "10px 14px", borderRadius: 16,
          background: isUser
            ? `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`
            : C.white,
          color: isUser ? "#fff" : C.navy,
          borderBottomRightRadius: isUser ? 4 : 16,
          borderBottomLeftRadius: isUser ? 16 : 4,
          fontSize: 15, lineHeight: 1.5, whiteSpace: "pre-wrap",
          boxShadow: isUser
            ? "0 2px 8px rgba(30,58,138,0.25)"
            : "0 1px 4px rgba(0,0,0,0.06)",
          border: isUser ? "none" : `1px solid ${C.grayLight}`,
        }}>
          {msg.content}
        </div>
        {/* Speaker button for AI messages */}
        {!isUser && (
          <button
            onClick={speakMessage}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "4px 8px", marginTop: 2,
              fontSize: 12, color: speaking ? C.red : C.gray,
              display: "flex", alignItems: "center", gap: 4,
              transition: "color 0.15s",
            }}
          >
            {speaking ? "⏹️ Stop" : "🔊 Listen"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function NgobrolEng() {
  const [view, setView] = useState("landing");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [chatMode, setChatMode] = useState("casual");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("lily");
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const activeAudioRef = useRef(null);

  // ElevenLabs voice IDs — British for IELTS/casual, American for TOEFL
  const VOICES = {
    lily: { id: "pFZP5JQG7iQjIQuC4Bku", label: "Lily 🇬🇧", desc: "Warm British female", accent: "british" },
    george: { id: "JBFqnCBsd6RMkjVDRZzb", label: "George 🇬🇧", desc: "Warm British male", accent: "british" },
    rachel: { id: "21m00Tcm4TlvDq8ikWAM", label: "Rachel 🇺🇸", desc: "Warm American female", accent: "american" },
    josh: { id: "TxGEqnHWrfWFTfGW9XjX", label: "Josh 🇺🇸", desc: "Clear American male", accent: "american" },
  };

  useEffect(() => {
    // Load voices for TTS
    window.speechSynthesis?.getVoices();
  }, []);

  // Stop all audio — ElevenLabs + browser TTS
  function stopAllAudio() {
    window.speechSynthesis?.cancel();
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }

  // Handle phone back button — go to landing instead of closing app
  useEffect(() => {
    function handleBack(e) {
      if (view === "chat") {
        e.preventDefault();
        stopAllAudio();
        setView("landing");
      }
    }
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, [view]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Don't auto-focus input on mobile — it pops up the keyboard and hides the first message

  function startListening() {
    if (isRecording || loading) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
     const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    let silenceTimer = null;
    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInput(finalTranscript || interimTranscript);
      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        recognition.stop();
      }, 3000);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    };
    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }

  function toggleRecording() {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    startListening();
  }

  async function sendMessage(userText) {
    if (!userText.trim()) return;
    const newMessages = [...messages, { role: "user", content: userText.trim() }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          scenario: selectedScenario ? `${selectedScenario.label}. ${selectedScenario.desc}` : null,
          mode: chatMode,
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops, something went wrong. Coba lagi ya! 😊" }]);
    }
    setLoading(false);
  }

  function startChat(scenario) {
    setSelectedScenario(scenario || null);
    setChatMode(scenario?.mode || "casual");
    // Auto-switch voice: American for TOEFL, British for IELTS/casual
    if (scenario?.mode?.startsWith("toefl")) {
      setSelectedVoice("rachel");
    } else {
      setSelectedVoice("lily");
    }
    setMessages(scenario
      ? [{ role: "assistant", content: scenario.prompt }]
      : [{ role: "assistant", content: "Hey! 👋 Aku NgobrolEng, teman ngobrol bahasa Inggris kamu. Mau ngobrol tentang apa hari ini? Just type in English — or Bahasa juga boleh, nanti aku bantu! 😊" }]
    );
    window.history.pushState({ view: "chat" }, "");
    setView("chat");
  }

  // ─── LANDING PAGE ───
  if (view === "landing") {
    return (
      <div style={{
        minHeight: "100vh", background: C.offWhite,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>
        {/* Hero */}
        <div style={{
          background: `linear-gradient(155deg, ${C.navy} 0%, ${C.blue} 50%, ${C.blueMid} 100%)`,
          padding: "48px 20px 56px", textAlign: "center", color: "#fff",
          borderRadius: "0 0 32px 32px", position: "relative", overflow: "hidden",
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute", top: 20, right: -20, width: 140, height: 140,
            borderRadius: "50%", border: `3px solid ${C.red}`, opacity: 0.1,
          }} />
          <div style={{
            position: "absolute", bottom: -10, left: -20, width: 100, height: 100,
            borderRadius: "50%", background: C.red, opacity: 0.07,
          }} />

          <div style={{ position: "relative" }}>
            <div style={{ marginBottom: 4, display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FoxMascot size={52} />
              <BrandLogo size="large" />
            </div>
            <div style={{
              fontSize: 15, opacity: 0.92, fontWeight: 400, lineHeight: 1.5, marginBottom: 24,
            }}>
              Tempat Asyik Belajar Bahasa Inggris
            </div>

            <div style={{
              background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)",
              borderRadius: 20, padding: "24px 20px 20px", maxWidth: 360, margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.15)",
              position: "relative", overflow: "hidden",
            }}>
              {/* London skyline silhouette */}
              <svg
                viewBox="0 0 360 100"
                style={{
                  position: "absolute", bottom: 56, left: 0, right: 0,
                  width: "100%", opacity: 0.12, pointerEvents: "none",
                }}
                preserveAspectRatio="xMidYMax meet"
              >
                {/* London Eye */}
                <circle cx="45" cy="42" r="28" fill="none" stroke="#fff" strokeWidth="2.5"/>
                <line x1="45" y1="70" x2="45" y2="100" stroke="#fff" strokeWidth="2.5"/>
                {/* Spokes */}
                <line x1="45" y1="14" x2="45" y2="70" stroke="#fff" strokeWidth="1"/>
                <line x1="17" y1="42" x2="73" y2="42" stroke="#fff" strokeWidth="1"/>
                <line x1="25" y1="22" x2="65" y2="62" stroke="#fff" strokeWidth="1"/>
                <line x1="65" y1="22" x2="25" y2="62" stroke="#fff" strokeWidth="1"/>
                {/* Small buildings left */}
                <rect x="5" y="75" width="12" height="25" fill="#fff"/>
                <rect x="20" y="70" width="10" height="30" fill="#fff"/>
                {/* Big Ben / Elizabeth Tower */}
                <rect x="100" y="20" width="16" height="80" fill="#fff"/>
                <rect x="97" y="16" width="22" height="8" fill="#fff"/>
                <polygon points="108,4 97,16 119,16" fill="#fff"/>
                <rect x="106" y="0" width="4" height="6" fill="#fff"/>
                {/* Parliament building */}
                <rect x="118" y="52" width="45" height="48" fill="#fff"/>
                <rect x="120" y="45" width="8" height="10" fill="#fff"/>
                <rect x="132" y="42" width="8" height="13" fill="#fff"/>
                <rect x="144" y="45" width="8" height="10" fill="#fff"/>
                <rect x="155" y="48" width="6" height="8" fill="#fff"/>
                {/* The Shard */}
                <polygon points="190,8 185,100 195,100" fill="#fff"/>
                {/* Tower Bridge */}
                <rect x="220" y="40" width="14" height="60" fill="#fff"/>
                <rect x="270" y="40" width="14" height="60" fill="#fff"/>
                <rect x="218" y="36" width="18" height="8" fill="#fff"/>
                <rect x="268" y="36" width="18" height="8" fill="#fff"/>
                {/* Bridge top walkway */}
                <rect x="234" y="42" width="36" height="5" fill="#fff"/>
                {/* Bridge arches */}
                <path d="M220,100 Q227,80 234,100" fill="#fff"/>
                <path d="M270,100 Q277,80 284,100" fill="#fff"/>
                {/* Bridge road */}
                <rect x="210" y="75" width="84" height="6" fill="#fff"/>
                {/* St Paul's dome */}
                <rect x="310" y="60" width="30" height="40" fill="#fff"/>
                <ellipse cx="325" cy="60" rx="18" ry="14" fill="#fff"/>
                <rect x="322" y="42" width="6" height="18" fill="#fff"/>
                <circle cx="325" cy="40" r="3" fill="#fff"/>
                {/* Small buildings right */}
                <rect x="345" y="70" width="15" height="30" fill="#fff"/>
                {/* Ground line */}
                <rect x="0" y="98" width="360" height="2" fill="#fff"/>
              </svg>

              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Practice English with AI</div>
                <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5, marginBottom: 20 }}>
                  Ngobrol santai sama AI yang sabar, seru, dan nggak akan menghakimi kamu. Gratis!
                </div>
                <button
                  onClick={() => startChat(null)}
                  style={{
                    background: C.red, color: "#fff", border: "none",
                    padding: "13px 32px", borderRadius: 14, fontSize: 15, fontWeight: 700,
                    cursor: "pointer", width: "100%",
                    boxShadow: "0 4px 14px rgba(220,38,38,0.3)",
                    transition: "transform 0.15s",
                  }}
                  onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
                  onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                >
                  Mulai Ngobrol 🚀
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scenarios */}
        <div style={{ padding: "32px 20px 20px", maxWidth: 400, margin: "0 auto" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 4 }}>
            Pilih topik ngobrol
          </div>
          <div style={{ fontSize: 13, color: C.gray, marginBottom: 16 }}>
            Atau langsung freestyle di atas — terserah kamu!
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {SCENARIOS.map(s => (
              <button key={s.label} onClick={() => startChat(s)} style={{
                background: C.white, border: `1.5px solid ${C.grayLight}`, borderRadius: 16,
                padding: "16px 12px", textAlign: "left", cursor: "pointer",
                transition: "all 0.15s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.blueMid;
                  e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.grayLight;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.4 }}>{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Test Prep */}
        <div style={{ padding: "8px 20px 20px", maxWidth: 400, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 4,
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.navy }}>
              📝 Test Prep
            </div>
            <span style={{
              fontSize: 10, fontWeight: 700, color: "#fff",
              background: "linear-gradient(135deg, #7c3aed, #ea580c)",
              padding: "2px 8px", borderRadius: 6, letterSpacing: "0.5px",
            }}>NEW</span>
          </div>
          <div style={{ fontSize: 13, color: C.gray, marginBottom: 6 }}>
            Latihan IELTS & TOEFL gratis — AI jadi examiner kamu!
          </div>
          <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 16, fontStyle: "italic" }}>
            * Latihan simulasi — bukan tes resmi IELTS/TOEFL. Format & skor mengikuti struktur ujian asli.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TEST_PREP.map(s => (
              <button key={s.label} onClick={() => startChat(s)} style={{
                background: C.white, border: `1.5px solid ${C.grayLight}`, borderRadius: 16,
                padding: "14px 14px", textAlign: "left", cursor: "pointer",
                transition: "all 0.15s", display: "flex", alignItems: "center", gap: 12,
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = s.badgeColor;
                  e.currentTarget.style.boxShadow = `0 2px 12px ${s.badgeColor}22`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.grayLight;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{s.label}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 700, color: "#fff",
                      background: s.badgeColor, padding: "1px 6px",
                      borderRadius: 4, letterSpacing: "0.5px",
                    }}>{s.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.4 }}>{s.desc}</div>
                </div>
                <div style={{ fontSize: 18, color: C.grayLight, flexShrink: 0 }}>→</div>
              </button>
            ))}
          </div>
        </div>

        {/* Why NgobrolEng */}
        <div style={{ padding: "20px 20px 36px", maxWidth: 400, margin: "0 auto" }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.navy, marginBottom: 14 }}>
            Kenapa NgobrolEng?
          </div>
          {[
            { emoji: "🤖", title: "AI yang Sabar", text: "Nggak perlu malu salah grammar. AI kita akan bantu kamu pelan-pelan." },
            { emoji: "🆓", title: "Gratis!", text: "Latihan ngobrol English kapan aja, dari mana aja. Cuma butuh HP." },
            { emoji: "🎯", title: "Langsung Praktik", text: "Bukan hafalan rumus grammar — langsung ngobrol topik yang kamu suka." },
            { emoji: "📈", title: "Makin Lancar", text: "Semakin sering ngobrol, semakin cas cis cus English kamu!" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start",
              padding: "12px 14px", background: C.white, borderRadius: 14,
              border: `1px solid ${C.grayLight}`,
              borderLeft: `3px solid ${i % 2 === 0 ? C.blueMid : C.red}`,
            }}>
              <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{item.emoji}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.navy, marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.45 }}>{item.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Share */}
        <div style={{ padding: "0 20px 24px", maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
          <button
            onClick={async () => {
              const shareData = {
                title: "NgobrolEng",
                text: "Latihan ngobrol English gratis pakai AI! Ada IELTS & TOEFL Speaking juga. Coba sekarang:",
                url: "https://ngobroleng.com",
              };
              try {
                if (navigator.share) {
                  await navigator.share(shareData);
                } else {
                  window.open("https://wa.me/?text=" + encodeURIComponent(shareData.text + " " + shareData.url), "_blank");
                }
              } catch {}
            }}
            style={{
              background: "#25D366", color: "#fff", border: "none",
              padding: "12px 28px", borderRadius: 14, fontSize: 14, fontWeight: 700,
              cursor: "pointer", width: "100%",
              boxShadow: "0 3px 10px rgba(37,211,102,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "transform 0.15s",
            }}
            onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
            onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
          >
            📤 Share NgobrolEng ke teman
          </button>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "0 20px 28px" }}>
          <div style={{
            display: "flex", justifyContent: "center", gap: 0, marginBottom: 12,
            borderRadius: 3, overflow: "hidden", width: 60, margin: "0 auto 12px",
          }}>
            <div style={{ height: 4, flex: 1, background: C.blue }} />
            <div style={{ height: 4, flex: 1, background: C.white, border: `1px solid ${C.grayLight}`, borderLeft: "none", borderRight: "none" }} />
            <div style={{ height: 4, flex: 1, background: C.red }} />
          </div>
          <div style={{ fontSize: 12, color: "#94a3b8" }}>
            NgobrolEng © 2026 · The fun place to learn English
          </div>
        </div>
      </div>
    );
  }

  // ─── CHAT VIEW ───
  return (
    <div style={{
      height: "100vh", display: "flex", flexDirection: "column",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: C.offWhite,
    }}>
      {/* Chat header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.navy}, ${C.blue})`,
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
        color: "#fff", flexShrink: 0,
        borderBottom: `3px solid ${C.red}`,
      }}>
        <button onClick={() => { stopAllAudio(); setView("landing"); }} style={{
          background: "rgba(255,255,255,0.12)", border: "none", color: "#fff",
          width: 34, height: 34, borderRadius: 10, cursor: "pointer", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.blueMid}, ${C.blueLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden",
          boxShadow: `0 0 0 2px ${C.red}`,
        }}>
          <MiniFoxFace size={34} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>
            <BrandLogo />
          </div>
          <div style={{ fontSize: 11, opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
            {selectedScenario?.badge ? (
              <>
                <span style={{
                  fontSize: 8, fontWeight: 700, color: "#fff",
                  background: selectedScenario.badgeColor, padding: "1px 5px",
                  borderRadius: 3, letterSpacing: "0.5px",
                }}>{selectedScenario.badge}</span>
                {selectedScenario.label}
              </>
            ) : selectedScenario ? `🎯 ${selectedScenario.label}` : "Your English buddy 🐾"}
          </div>
        </div>
        {/* Voice selector */}
        <button
          onClick={() => setSelectedVoice(v => {
            if (v === "lily") return "george";
            if (v === "george") return "lily";
            if (v === "rachel") return "josh";
            if (v === "josh") return "rachel";
            return "lily";
          })}
          style={{
            background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff", padding: "4px 10px", borderRadius: 8,
            fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          🔊 {VOICES[selectedVoice]?.label}
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "16px 12px",
        WebkitOverflowScrolling: "touch",
      }}>
        {messages.map((m, i) => {
          const isLastAI = m.role === "assistant" && i === messages.length - 1;
          return <Message key={i} msg={m} voiceId={VOICES[selectedVoice]?.id} autoPlay={false} onSpeakDone={isLastAI ? () => setTimeout(startListening, 500) : null} activeAudioRef={activeAudioRef} />;
        })}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 4 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
            }}>
              <MiniFoxFace size={30} />
            </div>
            <div style={{ background: C.white, borderRadius: 16, borderBottomLeftRadius: 4, border: `1px solid ${C.grayLight}` }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{
        padding: "10px 12px 14px", borderTop: `1px solid ${C.grayLight}`,
        background: C.white, flexShrink: 0,
      }}>
        <div style={{ display: "flex", gap: 8, maxWidth: 600, margin: "0 auto", alignItems: "center" }}>
          {/* Mic button */}
          <button
            onClick={toggleRecording}
            disabled={loading}
            style={{
              width: 46, height: 46, borderRadius: 14, border: "none",
              background: isRecording
                ? C.red
                : `linear-gradient(135deg, ${C.blue}, ${C.blueMid})`,
              color: "#fff", fontSize: 20, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s", flexShrink: 0,
              boxShadow: isRecording ? "0 0 0 4px rgba(220,38,38,0.25)" : "0 2px 6px rgba(30,58,138,0.2)",
              animation: isRecording ? "pulse 1.5s ease-in-out infinite" : "none",
            }}
          >
            🎤
          </button>
          <style>{`@keyframes pulse { 0%,100% { box-shadow: 0 0 0 4px rgba(220,38,38,0.25) } 50% { box-shadow: 0 0 0 8px rgba(220,38,38,0.15) } }`}</style>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && !loading && (e.preventDefault(), sendMessage(input))}
            placeholder={isRecording ? "🎤  Listening... speak in English!" : "Type or tap 🎤 to speak..."}
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 14,
              border: `1.5px solid ${isRecording ? C.red : C.grayLight}`, fontSize: 15, outline: "none",
              transition: "border-color 0.15s", background: isRecording ? "#fff5f5" : C.offWhite,
            }}
            onFocus={e => { if (!isRecording) e.target.style.borderColor = C.blueMid; }}
            onBlur={e => { if (!isRecording) e.target.style.borderColor = C.grayLight; }}
            disabled={loading || isRecording}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            style={{
              width: 46, height: 46, borderRadius: 14, border: "none",
              background: input.trim() && !loading ? C.red : C.grayLight,
              color: "#fff", fontSize: 20, cursor: input.trim() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s", flexShrink: 0,
              boxShadow: input.trim() && !loading ? "0 2px 8px rgba(220,38,38,0.25)" : "none",
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
