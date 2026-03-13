import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  KeyRound,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Users,
  Building2,
  BellRing,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How it works" },
  { id: "for-sellers", label: "For Sellers" },
  { id: "for-agents", label: "For Agents" },
  { id: "viewings", label: "Booking flow" },
  { id: "contact", label: "Contact" },
];

const shufflerLayers = [
  "Viewings confirmed only after owner approval",
  "Each handoff is timestamped and auditable",
  "No manual back-and-forth for access windows",
  "Keys are never left unmanaged",
  "Agents are coordinated through one clear protocol",
];

const typewriterLines = [
  "Owner-approved booking windows only.",
  "Agent requests are reviewed in seconds.",
  "Secure key custody with handover visibility.",
  "Remote owners stay informed at every step.",
];

const schedulerDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const schedulerOrder = [1, 3, 5, 2, 0, 4, 6, 2];

const steps = [
  {
    number: "01",
    title: "Register property",
    detail: "Seller uploads property details, access instructions, and preferred windows.",
  },
  {
    number: "02",
    title: "Secure key handling",
    detail: "Keys are logged, photographed, and tracked in a documented custody flow.",
  },
  {
    number: "03",
    title: "Coordinate and confirm",
    detail: "Agents request slots. Sellers approve. Every action remains logged.",
  },
];

const sellerBenefits = [
  { title: "Work with several agents", detail: "No sole mandate bottleneck. Keep your listing open, controlled, and flexible." },
  { title: "Remote ownership made manageable", detail: "If you are away or busy, your showing schedule still runs professionally." },
  { title: "Less anxiety, more control", detail: "You stay informed and in command of every handoff and approval." },
];

const agentBenefits = [
  { title: "Clear operational path", detail: "Agents submit requests through a structured flow with clear feedback." },
  { title: "Trust-safe access", detail: "Access is centrally controlled, not improvised by text message agreements." },
  { title: "Fewer delays", detail: "A standard protocol replaces repeated coordination overhead." },
];

const faqItems = [
  {
    q: "Does KeyKeeper replace my agent?",
    a: "No. We are the operational layer for secure access and scheduling while agents keep lead ownership.",
  },
  {
    q: "Can I work with more than one agent?",
    a: "Yes. You can authorise multiple agents while keeping your own approval rules.",
  },
  {
    q: "Is key handling really secure?",
    a: "Yes. Every custody event is logged with timestamp and handler notes.",
  },
  {
    q: "What if I am travelling?",
    a: "Approve or adjust every showing from anywhere through the dashboard flow.",
  },
];

const protocolCards = [
  {
    step: "01",
    title: "Input protocol",
    copy: "Seller defines property access boundaries, opening windows, and rules.",
    visual: "motif",
  },
  {
    step: "02",
    title: "Request protocol",
    copy: "Agents submit requests that convert into validated booking candidates.",
    visual: "scan",
  },
  {
    step: "03",
    title: "Release protocol",
    copy: "Approvals, updates, and completion marks are kept in one timeline.",
    visual: "wave",
  },
];

function MagneticButton({ children, href, className = "", ...props }) {
  const classes =
    "magnetic-btn inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold";
  return href ? (
    <a href={href} {...props} className={`${classes} ${className}`}>
      <span className="magnetic-layer" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  ) : (
    <button {...props} className={`${classes} ${className}`}>
      <span className="magnetic-layer" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

function SectionHeader({ badge, title, lead }) {
  return (
    <div className="mx-auto max-w-4xl text-center lg:text-left">
      <p className="font-mono text-sm uppercase tracking-[0.35em] text-[#CC5833]">{badge}</p>
      <h2 className="mt-3 text-3xl font-bold text-[#1A1A1A] sm:text-4xl md:text-5xl">{title}</h2>
      {lead ? <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[#2E4036] lg:mx-0">{lead}</p> : null}
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const heroSentinelRef = useRef(null);
  const protocolRefs = useRef([]);
  const schedulerCursor = useRef(null);
  const schedulerSave = useRef(null);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [stackItems, setStackItems] = useState(shufflerLayers);
  const [typeIdx, setTypeIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    gsap.set(".hero-bg", { opacity: 0.9 });
    const ctx = gsap.context(() => {
      gsap.from(".hero-item", { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.12 });
      gsap.from(".stagger-card", {
        y: 30,
        opacity: 0,
        scale: 0.98,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: "#how-it-works", start: "top 78%" },
      });
      gsap.from(".philosophy-word", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: "#philosophy", start: "top 78%" },
      });

      gsap.to("#protocol-asset-0", { rotate: 360, repeat: -1, duration: 16, ease: "none", transformOrigin: "50% 50%" });
      gsap.to("#scan-line", { xPercent: 100, repeat: -1, duration: 2.6, yoyo: true, ease: "power2.inOut" });
      gsap.to("#wave-path", { strokeDashoffset: -80, repeat: -1, duration: 2.4, ease: "none" });

      protocolCards.forEach((_, idx) => {
        const panel = protocolRefs.current[idx];
        if (!panel) return;
        if (idx < protocolCards.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top top",
            end: "+=95%",
            pin: true,
            pinSpacing: true,
            scrub: false,
          });
        }
        if (idx < protocolCards.length - 1) {
          ScrollTrigger.create({
            trigger: panel,
            start: "top 35%",
            end: "bottom 35%",
            onEnter: () => gsap.to(panel, { scale: 0.9, filter: "blur(20px)", autoAlpha: 0.55, duration: 0.35, ease: "power2.inOut" }),
            onEnterBack: () => gsap.to(panel, { scale: 1, filter: "blur(0px)", autoAlpha: 1, duration: 0.35, ease: "power2.inOut" }),
          });
        }
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setNavSolid(!entry.isIntersecting), { threshold: 0.01 });
    if (heroSentinelRef.current) io.observe(heroSentinelRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStackItems((prev) => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
      gsap.fromTo(
        ".shuffle-top",
        { y: -22, opacity: 0.65, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "cubic-bezier(0.34, 1.56, 0.64, 1)" }
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = typewriterLines[typeIdx];
      if (charIdx < current.length) {
        setTypedText(current.slice(0, charIdx + 1));
        setCharIdx((p) => p + 1);
      } else {
        setTimeout(() => {
          setTypeIdx((p) => (p + 1) % typewriterLines.length);
          setCharIdx(0);
          setTypedText("");
        }, 1200);
      }
    }, 36);
    return () => clearTimeout(timeout);
  }, [typeIdx, charIdx]);

  useEffect(() => {
    let pointer = 0;
    const run = () => {
      const idx = schedulerOrder[pointer % schedulerOrder.length];
      setActiveDay(idx);
      const dayX = [0, 14.5, 29, 43.5, 57.5, 72, 86.5][idx];

      if (schedulerCursor.current) {
        gsap.set(schedulerCursor.current, { opacity: 0.95, scale: 0.9, left: "0%", top: "12px" });
        const tl = gsap.timeline();
        tl
          .to(schedulerCursor.current, { opacity: 1, duration: 0.25, ease: "power2.out" })
          .to(schedulerCursor.current, { left: `${dayX}%`, duration: 0.55, ease: "power3.out" })
          .to(schedulerCursor.current, { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 })
          .to(schedulerCursor.current, { left: "84%", top: "90px", duration: 0.6, ease: "power2.inOut" })
          .to(schedulerCursor.current, { opacity: 0, duration: 0.2 });
      }

      if (schedulerSave.current) {
        gsap.fromTo(
          schedulerSave.current,
          { y: 0 },
          { y: -3, duration: 0.12, yoyo: true, repeat: 2, delay: 1.35 }
        );
      }
      pointer++;
    };
    run();
    const id = setInterval(run, 2200);
    return () => clearInterval(id);
  }, []);

  const philosophyWords = ["Most", "property", "coordination", "focuses", "on", "manual", "handoffs.", "We", "focus", "on", "control,", "security,", "and", "seller", "independence."];

  return (
    <div ref={rootRef} className="relative min-h-screen bg-[#F2F0E9] text-[#1A1A1A]">
      <div className="noise-overlay" />

      <nav
        className={`fixed inset-x-4 top-4 z-40 mx-auto w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
          navSolid
            ? "bg-[#F2F0E9]/60 border border-[#2E4036]/20 backdrop-blur-xl shadow-[0_24px_40px_-24px_rgba(26,26,26,0.35)]"
            : "bg-white/5 backdrop-blur-sm border border-white/10"
        } rounded-[2.75rem] px-3 py-3 sm:px-6`}
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="font-black tracking-[0.12em] text-lg">KEYKEEPER</a>
          <button aria-label="Toggle navigation" className="rounded-full border border-[#2E4036]/30 p-2 md:hidden" onClick={() => setMobileNav((p) => !p)}>
            <span className="sr-only">menu</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${mobileNav ? "rotate-180" : "rotate-0"}`} />
          </button>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="interactive-hover text-sm font-semibold text-[#2E4036]">{item.label}</a>
            ))}
            <MagneticButton href="#contact" className="bg-[#CC5833] text-white">Book a consultation</MagneticButton>
          </div>
        </div>
        {mobileNav ? (
          <div className="mt-4 grid gap-3 border-t border-[#2E4036]/10 pt-3 md:hidden">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="interactive-hover text-sm font-semibold text-[#2E4036]" onClick={() => setMobileNav(false)}>{item.label}</a>
            ))}
            <MagneticButton href="#contact" className="bg-[#CC5833] text-white justify-self-start">Book a consultation</MagneticButton>
          </div>
        ) : null}
      </nav>

      <main>
        <section id="home" className="relative min-h-[100dvh] overflow-hidden rounded-[2.75rem]">
          <div ref={heroSentinelRef} id="hero-sentinel" className="pointer-events-none absolute left-0 top-0 h-1 w-full" />
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1900&q=80" alt="Modern home exterior" className="hero-bg absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#2E4036]/30" />
          <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-14 sm:px-10 md:px-16">
            <div className="mx-auto w-full max-w-5xl">
              <p className="hero-item uppercase tracking-[0.5em] text-xs text-[#E8E4DD] sm:text-sm">Real Estate Access Protocol</p>
              <h1 className="hero-item mt-4 max-w-4xl text-[clamp(2rem,8vw,5.5rem)] font-black leading-[0.95] text-[#F2F0E9]">Sell with confidence</h1>
              <p className="hero-item font-drama mt-2 text-[clamp(2.7rem,11vw,6rem)] leading-none text-[#CC5833]">without gatekeeping.</p>
              <p className="hero-item mt-6 max-w-2xl text-base leading-relaxed text-[#F5F3EE] sm:text-lg">KeyKeeper coordinates key custody and viewing schedules so sellers can work with multiple agents without operational chaos.</p>
              <div className="hero-item mt-8 flex flex-col gap-3 sm:flex-row">
                <MagneticButton href="#contact" className="bg-[#CC5833] text-white">Book a consultation <ArrowRight className="h-4 w-4" /></MagneticButton>
                <MagneticButton href="#for-sellers" className="bg-[#FFFFFF]/15 text-[#F2F0E9] border border-[#F2F0E9]/40">Register a property <ArrowRight className="h-4 w-4" /></MagneticButton>
              </div>
              <div className="hero-item mt-10 flex flex-wrap gap-4 text-sm text-[#E8E4DD]">
                <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Structured key custody</span>
                <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" /> Multi-agent support</span>
                <span className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4" /> Remote viewing management</span>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              badge="How KeyKeeper works"
              title="Seller control with operational clarity"
              lead="You remain owner of the process. We make each access event visible, secure, and coordinated."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <article className="rounded-[2.5rem] border border-[#2E4036]/10 bg-white/80 p-8 shadow-[0_30px_50px_-32px_rgba(46,64,54,0.5)]">
                <h3 className="text-2xl font-bold">From property to viewings in three steps</h3>
                <ol className="mt-6 space-y-6">
                  {steps.map((step) => (
                    <li key={step.number} className="stagger-card flex gap-4">
                      <span className="font-mono text-sm text-[#CC5833]">{step.number}</span>
                      <div>
                        <p className="font-semibold">{step.title}</p>
                        <p className="mt-1 text-[#4A5D53]">{step.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
              <div className="stagger-card space-y-4">
                <div className="rounded-[2.5rem] border border-[#2E4036]/10 bg-white/90 p-6">
                  <p className="font-semibold">Why this helps remote sellers</p>
                  <p className="mt-3 text-[#4A5D53]">No need to attend every appointment. You approve access remotely with visibility preserved.</p>
                </div>
                <div className="rounded-[2.5rem] border border-[#2E4036]/10 bg-[#2E4036] p-6 text-[#F2F0E9]">
                  <p className="font-semibold">Independence from sole mandate pressure</p>
                  <p className="mt-3">Work with multiple agents while keeping full command over schedule and access policy.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-[2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-6 shadow-[0_24px_36px_-28px_rgba(26,26,26,0.35)]">
              <p className="text-xs uppercase tracking-[0.34em] text-[#CC5833]">Feature card 1</p>
              <h3 className="mt-3 text-2xl font-bold">Operational stack</h3>
              <p className="mt-2 text-[#4A5D53]">Diagnostic Shuffler</p>
              <div className="relative mt-5 min-h-[180px]">
                {stackItems.slice(0, 3).map((item, index) => (
                  <div
                    key={item}
                    className={`feature-stack-item stagger-card absolute inset-x-0 rounded-[1.9rem] border border-[#2E4036]/20 bg-white/95 p-4 transition-transform ${index === 0 ? "shuffle-top" : ""}`}
                    style={{ transform: `translateY(${index * 14}px) scale(${1 - index * 0.03})`, zIndex: 10 - index, opacity: 1 - index * 0.12 }}
                  >
                    <p className="font-mono text-sm text-[#CC5833]">View {index + 1}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#2E4036]">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-6 shadow-[0_24px_36px_-28px_rgba(26,26,26,0.35)]">
              <p className="text-xs uppercase tracking-[0.34em] text-[#CC5833]">Feature card 2</p>
              <h3 className="mt-3 text-2xl font-bold">Live protocol feed</h3>
              <p className="mt-2 text-[#4A5D53]">Telemetry Typewriter</p>
              <div className="mt-6 rounded-[1.6rem] border border-[#2E4036]/20 bg-[#111]/95 p-4 text-[#F2F0E9]">
                <p className="font-mono text-xs text-[#CC5833]">Live Feed</p>
                <p className="mt-3 min-h-20 text-sm leading-relaxed">
                  <span className="typewriter">{typedText}</span><span className="type-caret" />
                </p>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-6 shadow-[0_24px_36px_-28px_rgba(26,26,26,0.35)]">
              <p className="text-xs uppercase tracking-[0.34em] text-[#CC5833]">Feature card 3</p>
              <h3 className="mt-3 text-2xl font-bold">Booking cursor flow</h3>
              <p className="mt-2 text-[#4A5D53]">Cursor protocol scheduler</p>
              <div className="mt-5 relative rounded-[1.6rem] border border-[#2E4036]/20 bg-white/95 p-4">
                <div className="mb-4 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-[#1A1A1A]">
                  {schedulerDays.map((d, idx) => (
                    <div key={d} className={`rounded-[1rem] border px-1 py-2 ${idx === activeDay ? "border-[#CC5833] bg-[#CC5833] text-white" : "border-[#2E4036]/25 bg-[#F2F0E9]"}`}>
                      {d}
                    </div>
                  ))}
                </div>
                <div className="relative h-[66px] overflow-hidden">
                  <div ref={schedulerCursor} className="pointer-events-none absolute left-0 top-3 h-6 w-6 rounded-full border border-[#CC5833] bg-[#CC5833]/20" style={{ transform: "translate(-50%, 0)" }}>
                    <div className="absolute inset-1 rounded-full bg-[#CC5833]" />
                  </div>
                  <div className="absolute left-[84%] top-[52px] rounded-full bg-[#2E4036] px-3 py-1 text-xs font-semibold text-[#F2F0E9]">Save</div>
                  <div ref={schedulerSave} className="absolute left-[82.5%] top-[52px] h-8 w-[34px] rounded-full border border-[#2E4036]" />
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="for-sellers" className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeader
              badge="For Sellers"
              title="Built for sellers who are often unavailable"
              lead="Designed for absentee owners, remote owners, and multi-agent sellers."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sellerBenefits.map((item) => (
                <div key={item.title} className="stagger-card rounded-[2rem] border border-[#2E4036]/20 bg-white/80 p-6 shadow-[0_24px_36px_-28px_rgba(26,26,26,0.35)]">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="mt-2 text-[#4A5D53]">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <MagneticButton href="#contact" className="bg-[#2E4036] text-[#F2F0E9]">Register a property <ArrowRight className="h-4 w-4" /></MagneticButton>
              <MagneticButton href="#contact" className="bg-[#FFFFFF]/10 text-[#1A1A1A] border border-[#1A1A1A]/25">Request a demo <ArrowRight className="h-4 w-4" /></MagneticButton>
            </div>
          </div>
        </section>

        <section id="for-agents" className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeader badge="For Agents" title="A clear, repeatable process for access requests" lead="Agents request viewings through one controlled system instead of ad-hoc calls." />
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {agentBenefits.map((item) => (
                <div key={item.title} className="stagger-card rounded-[2rem] border border-[#2E4036]/20 bg-white/80 p-6 shadow-[0_24px_36px_-28px_rgba(26,26,26,0.35)]">
                  <h4 className="text-xl font-bold">{item.title}</h4>
                  <p className="mt-2 text-[#4A5D53]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="philosophy" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
          <img src="https://images.unsplash.com/photo-1616594039964-3e8f6e5f1d7b?auto=format&fit=crop&w=1800&q=80" alt="Texture and greenery" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-[#1A1A1A]/88" />
          <div className="relative z-10 mx-auto max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-[#CC5833]">Manifesto</p>
            <h2 className="mt-4 max-w-5xl text-4xl font-black text-[#F2F0E9] sm:text-5xl">Most coordination is reactive. We make it operational.</h2>
            <p className="mt-6 text-2xl leading-tight text-[#F2F0E9] sm:text-3xl">
              We focus on <span className="font-drama text-[#CC5833] text-[2.3rem] leading-none">control, security, and seller independence.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {philosophyWords.map((word, idx) => <span key={`${word}-${idx}`} className="philosophy-word inline-flex font-medium text-[#F5F3EE]">{word}</span>)}
            </div>
          </div>
        </section>

        <section id="protocol-archive" className="relative z-0 min-h-screen overflow-hidden py-10">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:px-10">
            {protocolCards.map((card, idx) => (
              <article key={card.step} ref={(node) => { protocolRefs.current[idx] = node; }} className="relative h-[80vh] min-h-[550px] rounded-[2rem] border border-[#2E4036]/20 bg-[#F2F0E9] p-8">
                <p className="font-mono text-sm text-[#CC5833]">Step {card.step}</p>
                <h3 className="mt-2 text-4xl font-black">{card.title}</h3>
                <p className="mt-4 max-w-2xl text-lg text-[#2E4036]">{card.copy}</p>
                <div className="mt-8 grid place-items-center rounded-[2rem] border border-[#2E4036]/15 bg-white/85 p-8">
                  {card.visual === "motif" ? (
                    <svg id="protocol-asset-0" width="190" height="190" viewBox="0 0 200 200" className="text-[#CC5833]"><circle cx="100" cy="100" r="74" fill="none" stroke="currentColor" strokeWidth="8" /><line x1="100" y1="26" x2="100" y2="174" stroke="currentColor" strokeWidth="4" /><line x1="26" y1="100" x2="174" y2="100" stroke="currentColor" strokeWidth="4" /><polygon points="100,26 112,70 88,70" fill="currentColor" /></svg>
                  ) : card.visual === "scan" ? (
                    <div className="relative h-40 w-full max-w-xl overflow-hidden rounded-[1.2rem] border border-[#2E4036]/25 bg-[#2E4036]">
                      <div className="grid h-full w-full grid-cols-7 gap-1 p-3">
                        {Array.from({ length: 49 }).map((_, i) => <span key={i} className="rounded-[0.35rem] border border-[#F2F0E9]/20 bg-[#3f4d44]/15" />)}
                      </div>
                      <div id="scan-line" className="absolute inset-y-0 left-0 w-2 bg-[#CC5833] shadow-[0_0_0_8px_rgba(204,88,51,0.25)]" />
                    </div>
                  ) : (
                    <svg width="100%" viewBox="0 0 700 200" className="h-44">
                      <path id="wave-path" d="M12 120 C80 20, 160 220, 240 120 C320 20, 420 220, 500 120 C580 20, 660 220, 688 120" fill="none" stroke="#CC5833" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" pathLength="200" strokeDasharray="200" strokeDashoffset="0" />
                    </svg>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="viewings" className="relative z-20 px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeader badge="Booking / Viewing flow" title="Every request, approval, and handoff is structured" lead="A practical workflow for remote owners and active agents." />
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              <div className="rounded-[2rem] border border-[#2E4036]/20 bg-white/85 p-6">
                <div className="flex items-center gap-3"><CalendarPlus className="h-5 w-5 text-[#CC5833]" /><p className="font-semibold">Seller action flow</p></div>
                <ul className="mt-4 space-y-3 text-[#4A5D53]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Register property and protocol</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Define viewing windows</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Approve or reject booking requests</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Track handover notes after each visit</li>
                </ul>
              </div>
              <div className="rounded-[2rem] border border-[#2E4036]/20 bg-white/85 p-6">
                <div className="flex items-center gap-3"><CalendarClock className="h-5 w-5 text-[#CC5833]" /><p className="font-semibold">Agent interaction flow</p></div>
                <ul className="mt-4 space-y-3 text-[#4A5D53]">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Request slot from dashboard</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Receive approved/revision status</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Confirm entry and security notes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#CC5833]" /> Close session with completion marker</li>
                </ul>
              </div>
            </div>

            <div className="mt-10 grid gap-4 rounded-[2.25rem] border border-[#2E4036]/15 bg-[#2E4036] p-6 text-[#F2F0E9] lg:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#CC5833]">Get started</p>
                <h3 className="mt-2 text-3xl font-black">Register a property in under 5 minutes</h3>
                <p className="mt-2 text-[#E9E6DF]">Add one property and one policy to activate your first secure showing workflow.</p>
              </div>
              <div className="grid place-items-center"><MagneticButton href="#contact" className="bg-[#CC5833] text-white">Register a property <ArrowRight className="h-4 w-4" /></MagneticButton></div>
            </div>
          </div>
        </section>

        <section id="contact" className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[#2E4036]/15 bg-white/90 p-8 sm:p-10">
            <SectionHeader badge="Contact" title="Ready to reduce stress and gain control?" lead="Choose your next step and we will respond with setup guidance for your property." />
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <form className="grid gap-4">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input className="kk-input" placeholder="Full name" />
                  <input className="kk-input" placeholder="Email" type="email" />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input className="kk-input" placeholder="Phone" type="tel" />
                  <select className="kk-input"><option>Seller</option><option>Agent</option><option>Partner</option></select>
                </div>
                <input className="kk-input" placeholder="Property location" />
                <textarea className="kk-input min-h-32 resize-y" placeholder="How can we help?" />
                <div className="flex flex-wrap gap-4 pt-2">
                  <MagneticButton className="bg-[#CC5833] text-white">Contact us <ArrowRight className="h-4 w-4" /></MagneticButton>
                  <p className="text-sm text-[#4A5D53] flex items-center gap-2"><PhoneCall className="h-4 w-4" /> Request a callback</p>
                </div>
              </form>
              <div className="space-y-4">
                <div className="rounded-[2rem] border border-[#2E4036]/20 bg-[#2E4036] p-5 text-[#F2F0E9]">
                  <h3 className="text-2xl font-bold">Primary actions</h3>
                  <p className="mt-3 text-[#E9E6DF]">Fastest next steps for any role.</p>
                  <div className="mt-4 space-y-2">
                    <a href="#home" className="interactive-hover flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4" /> Book a consultation</a>
                    <a href="#for-sellers" className="interactive-hover flex items-center gap-2 text-sm"><KeyRound className="h-4 w-4" /> Register a property</a>
                    <a href="#for-agents" className="interactive-hover flex items-center gap-2 text-sm"><Building2 className="h-4 w-4" /> Request a demo</a>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-[#2E4036]/20 bg-[#F5F3EE] p-5"><p className="font-semibold">Response expectation</p><p className="mt-2 text-sm text-[#4A5D53]">Operational responses are typically within one business day.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-20 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <SectionHeader badge="FAQ" title="Questions from sellers and agents" lead="Clear answers before onboarding." />
            <div className="mt-10 grid gap-4">
              {faqItems.map((item) => (
                <details key={item.q} className="rounded-[2rem] border border-[#2E4036]/15 bg-white/85 p-5 transition hover:border-[#CC5833]">
                  <summary className="cursor-pointer text-lg font-semibold interactive-hover">{item.q}</summary>
                  <p className="mt-3 max-w-3xl text-[#4A5D53]">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6 lg:px-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-4">
            <MagneticButton href="#contact" className="bg-[#2E4036] text-[#F2F0E9]"><MessageCircle className="h-4 w-4" /> Contact us</MagneticButton>
            <MagneticButton href="#for-sellers" className="bg-[#CC5833] text-[#F2F0E9]">Register a property</MagneticButton>
            <MagneticButton href="#for-agents" className="border border-[#2E4036]/25 bg-white/20 text-[#1A1A1A]">Request a demo</MagneticButton>
          </div>
        </section>
      </main>

      <footer className="rounded-t-[4rem] bg-[#1A1A1A] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="text-2xl font-black text-[#F2F0E9]">KEYKEEPER</p>
            <p className="mt-3 text-sm text-[#D7D2C6]">The operational layer between sellers and agents for secure, scalable viewing operations.</p>
          </div>
          <div>
            <p className="font-semibold text-[#F2F0E9]">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-[#D7D2C6]">
              <li><a href="#home" className="interactive-hover">Home</a></li>
              <li><a href="#how-it-works" className="interactive-hover">How it works</a></li>
              <li><a href="#for-sellers" className="interactive-hover">For Sellers</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-[#F2F0E9]">System Status</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#D7D2C6]"><span className="inline-block h-2.5 w-2.5 rounded-full bg-[#22c55e] pulse-dot"/> Operational</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
