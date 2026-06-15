import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

// ─── Chapter data ────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'intro',
    progress: [0, 0.12],
    eyebrow: 'HELLO, I\'M',
    title: 'SHLOK JADHAV',
    subtitle: 'JAVA FULL STACK DEVELOPER',
    body: 'Building scalable, secure, and innovative web applications with modern technologies.',
    sigil: '✦',
    tech: ['JAVA', 'SPRING BOOT', 'SQL', 'REACT'],
    stats: [
      { icon: '💼', text: '2+\nMajor Projects' },
      { icon: '🐙', text: 'Open Source\nContributor' },
      { icon: '💻', text: '500+\nDSA Problems Solved' },
      { icon: '🛡️', text: '100%\nPassion' },
    ],
    ctaPrimary: { label: 'EXPLORE PROJECTS →', url: '#projects', external: false },
    ctaSecondary: { label: 'CONTACT ME ✉', url: 'mailto:jshlok11111@gmail.com', external: false },
  },
  {
    id: 'about',
    progress: [0.12, 0.30],
    eyebrow: 'PORTFOLIO STORY',
    title: 'ABOUT ME',
    subtitle: 'SOFTWARE ENGINEERING STUDENT',
    body: 'A motivated Information Technology student pursuing BE (IT) from Theem College of Engineering. Passionate about problem-solving and real-world project building.',
    sigil: '🎓',
    tech: ['FULL STACK', 'PROBLEM SOLVING', 'SOFTWARE DEV'],
    stats: [
      { icon: '📚', text: 'IT Engineering\n2022–2026' },
      { icon: '🎓', text: 'Theem College\nOf Engineering' },
      { icon: '💡', text: 'Continuous\nLearner' },
    ],
    ctaPrimary: { label: 'VIEW SKILLS →', url: '#profile-section', external: false },
    ctaSecondary: { label: 'RESUME 📄', url: '/Shlok_Jadhav_Resume.pdf', external: true },
  },
  {
    id: 'payshield',
    progress: [0.30, 0.52],
    eyebrow: 'PROJECT SPOTLIGHT',
    title: 'PAYSHIELD',
    subtitle: 'UPI Fraud Detection System',
    body: 'ML-powered system that detects suspicious UPI transactions using anomaly detection and transaction analysis to improve payment security.',
    sigil: '🛡️',
    tech: ['PYTHON', 'MACHINE LEARNING', 'SQL', 'ANOMALY DETECTION', 'UPI PAYMENTS'],
    stats: [
      { icon: '📈', text: 'Detection Accuracy: 92%' },
      { icon: '🎯', text: 'Reduced False Positives by 30%' },
      { icon: '⚡', text: 'Real-time Transaction Monitoring' },
    ],
    ctaPrimary: { label: 'VIEW CODE (GITHUB) 🐙', url: 'https://github.com/mr-shlok/UPI-Shield', external: true },
    ctaSecondary: { label: 'LIVE DEMO ↗', url: '#', external: false },
  },
  {
    id: 'greenmiles',
    progress: [0.52, 0.70],
    eyebrow: 'FEATURED PROJECT',
    title: 'GREENMILES EV',
    subtitle: 'AI-Powered EV Intelligence Platform',
    body: 'Platform for EV route planning, battery prediction, charging station discovery, and sustainability tracking.',
    sigil: '⚡',
    tech: ['JAVA', 'SPRING BOOT', 'REACT', 'AI / ML', 'POSTGRESQL', 'MAP API'],
    stats: [
      { icon: '🛣️', text: 'Route Cost Reduced by 18%' },
      { icon: '🔋', text: 'Battery Prediction Accuracy: 91%' },
      { icon: '🍃', text: 'Sustainability Score Tracking' },
    ],
    ctaPrimary: { label: 'VIEW CODE (GITHUB) 🐙', url: 'https://github.com/mr-shlok/GreenMiles-EV', external: true },
    ctaSecondary: { label: 'LIVE DEMO ↗', url: '#', external: false },
  },
  {
    id: 'pharmatrace',
    progress: [0.70, 0.87],
    eyebrow: 'BLOCKCHAIN PROJECT',
    title: 'PHARMATRACE',
    subtitle: 'Blockchain Supply Chain',
    body: 'Blockchain-based pharmaceutical supply chain tracking system to prevent counterfeit drugs using tamper-proof records.',
    sigil: '📦',
    tech: ['BLOCKCHAIN', 'ETHEREUM', 'SMART CONTRACTS', 'WEB3'],
    stats: [
      { icon: '🔒', text: 'Tamper-proof Records' },
      { icon: '🔗', text: 'Decentralized Tracking' },
    ],
    ctaPrimary: { label: 'VIEW CODE (GITHUB) 🐙', url: 'https://github.com/patildhrup/PharmaTrace', external: true },
    ctaSecondary: { label: 'EXPLORE PROFILE →', url: '#profile-section', external: false },
  },
  {
    id: 'insight-astra',
    progress: [0.87, 1.0],
    eyebrow: 'HACKATHON BUILD',
    title: 'INSIGHT ASTRA',
    subtitle: 'Conversational AI System',
    body: 'Conversational AI system to query digital payment data using natural language and generate real-time insights.',
    sigil: '✨',
    tech: ['CONVERSATIONAL AI', 'NATURAL LANGUAGE', 'DATA ANALYTICS', 'API'],
    stats: [
      { icon: '🧠', text: 'NLP Driven Queries' },
      { icon: '📊', text: 'Real-time Analytics' },
    ],
    ctaPrimary: { label: 'VIEW CODE (GITHUB) 🐙', url: 'https://github.com/patildhrup/insight-Astra', external: true },
    ctaSecondary: { label: 'EXPLORE PROFILE →', url: '#profile-section', external: false },
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
const lerp = (a, b, t) => a + (b - a) * t
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const invlerp = (a, b, v) => clamp((v - a) / (b - a), 0, 1)

// ─── Component ───────────────────────────────────────────────────────────────
const Hero = () => {
  const containerRef  = useRef(null)
  const stickyRef     = useRef(null)
  const videoRef      = useRef(null)
  const overlayRef    = useRef(null)
  const eyebrowRef    = useRef(null)
  const titleRef      = useRef(null)
  const subtitleRef   = useRef(null)
  const bodyRef       = useRef(null)
  const statsRef      = useRef(null)
  const sigilRef      = useRef(null)
  const progressRef   = useRef(null)
  const vignetteRef   = useRef(null)
  const chapterLabelRef = useRef(null)
  const runeBarRef    = useRef(null)
  const tagsRef       = useRef(null)
  const ctaRef        = useRef(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [videoReady, setVideoReady]       = useState(false)

  // ─── Chapter transition ───────────────────────────────────────────────────
  const prevChapter = useRef(-1)
  const transitionChapter = (idx) => {
    if (prevChapter.current === idx) return
    prevChapter.current = idx

    const tl = gsap.timeline()

    // fade out old text
    tl.to([eyebrowRef.current, titleRef.current, subtitleRef.current, tagsRef.current, bodyRef.current, statsRef.current, ctaRef.current].filter(Boolean), {
      y: -24, opacity: 0, duration: 0.35, ease: 'power2.in', stagger: 0.03,
    })
    // update DOM mid-fade via callback
    .call(() => {
      setActiveChapter(idx)
    })
    // fade in new text
    .fromTo(
      [eyebrowRef.current, titleRef.current, subtitleRef.current, tagsRef.current, bodyRef.current, statsRef.current, ctaRef.current].filter(Boolean),
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.05 }
    )

    // chapter label
    if (chapterLabelRef.current) {
      gsap.fromTo(chapterLabelRef.current,
        { opacity: 0, x: 12 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )
      chapterLabelRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`
    }
  }

  // ─── Setup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => setTimeout(() => setVideoReady(true), 1000)
    video.addEventListener('loadedmetadata', onReady)
    if (video.readyState >= 1) onReady()

    return () => video.removeEventListener('loadedmetadata', onReady)
  }, [])

  // ─── GSAP ScrollTrigger ───────────────────────────────────────────────────
  useEffect(() => {
    if (!videoReady) return

    const video    = videoRef.current
    const duration = video.duration || 1

    // Scroll distance = 5× viewport so we have plenty of room to scrub
    const scrollHeight = window.innerHeight * 6

    // Pin the sticky wrapper
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top top',
      end:     `+=${scrollHeight}`,
      pin:     stickyRef.current,
      pinSpacing: true,
      anticipatePin: 1,
    })

    // Main scrub timeline — drives video time + rune bar
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start:   'top top',
        end:     `+=${scrollHeight}`,
        scrub:   1.2,
        onUpdate: (self) => {
          // video scrub
          const t = self.progress * duration
          if (Math.abs(video.currentTime - t) > 0.04) {
            video.currentTime = t
          }

          // progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${self.progress * 100}%`
          }

          // chapter detection
          const p = self.progress
          const idx = CHAPTERS.findIndex(c => p >= c.progress[0] && p < c.progress[1])
          transitionChapter(idx === -1 ? CHAPTERS.length - 1 : idx)

          // vignette intensity
          const vinInt = 0.55 + Math.sin(p * Math.PI) * 0.2
          if (vignetteRef.current) {
            vignetteRef.current.style.opacity = String(vinInt)
          }
        },
      },
    })

    // Subtle overlay colour shift across scroll
    gsap.to(overlayRef.current, {
      background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.0) 55%)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${scrollHeight}`,
        scrub: 2,
      },
    })

    // Rune bar decorative tick animation
    if (runeBarRef.current) {
      const ticks = runeBarRef.current.querySelectorAll('.rune-tick')
      gsap.fromTo(ticks,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'elastic.out(1,0.5)',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      )
    }

    // Entrance animation
    gsap.fromTo(
      [eyebrowRef.current, titleRef.current, subtitleRef.current, tagsRef.current, bodyRef.current, statsRef.current, ctaRef.current].filter(Boolean),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', stagger: 0.08, delay: 0.3 }
    )

    return () => {
      scrubTl.kill()
      pinTrigger.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoReady])

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>

      {/* ── Loading overlay ── */}
      <div className={`got-loading ${videoReady ? 'hidden' : ''}`}>
        <div className="got-loading-logo">Shlok Jadhav</div>
        <div className="got-loading-sub">Software Engineer Portfolio</div>
        <div className="got-loading-bar-wrap">
          <div className="got-loading-bar-fill" />
        </div>
      </div>

      {/* ── Main scroll container ── */}
      <div
        ref={containerRef}
        className="got-container"
        style={{ height: `${window.innerHeight * 6}px` }}
      >
        {/* ── Sticky viewport ── */}
        <div ref={stickyRef} className="got-sticky">

          {/* Video */}
          <video
            ref={videoRef}
            className="got-video"
            src="/video/one.mp4"
            playsInline
            autoPlay
            muted
            preload="auto"
          />

          {/* Layers */}
          <div ref={vignetteRef} className="got-vignette" />
          <div ref={overlayRef}  className="got-overlay" />
          <div className="got-grain" />

          {/* Corner ornaments */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} className={`got-corner got-corner-${pos}`}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
                <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.4"/>
                <rect x="1" y="1" width="4" height="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.6"/>
              </svg>
            </div>
          ))}

          {/* Nav */}
          <nav className="got-nav">
            <div className="got-nav-logo">
              Shlok Jadhav
              <span className="got-nav-role">Software Engineer</span>
            </div>
            <ul className="got-nav-links">
              <li><a href="https://github.com/mr-shlok" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/jshlok/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="mailto:jshlok11111@gmail.com">Email</a></li>
              <li><a href="/Shlok_Jadhav_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a></li>
            </ul>
            <button className="got-nav-hamburger" onClick={() => {
              const menu = document.querySelector('.got-mobile-menu');
              menu && menu.classList.toggle('open');
            }}>
              <span></span><span></span><span></span>
            </button>
            <div className="got-mobile-menu">
              <a href="https://github.com/mr-shlok" target="_blank" rel="noopener noreferrer" onClick={(e) => { document.querySelector('.got-mobile-menu')?.classList.remove('open'); }}>GitHub</a>
              <a href="https://www.linkedin.com/in/jshlok/" target="_blank" rel="noopener noreferrer" onClick={(e) => { document.querySelector('.got-mobile-menu')?.classList.remove('open'); }}>LinkedIn</a>
              <a href="mailto:jshlok11111@gmail.com" onClick={(e) => { document.querySelector('.got-mobile-menu')?.classList.remove('open'); }}>Email</a>
              <a href="/Shlok_Jadhav_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={(e) => { document.querySelector('.got-mobile-menu')?.classList.remove('open'); }}>Resume</a>
            </div>
          </nav>

          {/* Rune bar */}
          <div ref={runeBarRef} className="got-rune-bar">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="rune-tick" />
            ))}
          </div>

   
          <div className="got-content">
            <span ref={eyebrowRef} className="got-eyebrow">{CHAPTERS[activeChapter].eyebrow}</span>
            <h1 ref={titleRef} className="got-title">{CHAPTERS[activeChapter].title}</h1>
            <span ref={subtitleRef} className="got-subtitle">{CHAPTERS[activeChapter].subtitle}</span>
            
            <p ref={bodyRef} className="got-body">{CHAPTERS[activeChapter].body}</p>
            
            <div ref={tagsRef} className="got-tech-tags">
              {CHAPTERS[activeChapter].tech && CHAPTERS[activeChapter].tech.map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            {CHAPTERS[activeChapter].stats && (
              <div ref={statsRef} className="got-stats-grid">
                {CHAPTERS[activeChapter].stats.map((stat, i) => (
                  <div key={i} className="got-stat-item">
                    <span className="stat-icon">{stat.icon}</span>
                    <span className="stat-text">{stat.text.split('\n').map((line, j) => <React.Fragment key={j}>{line}<br/></React.Fragment>)}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div ref={ctaRef} className="got-cta-row">
              {CHAPTERS[activeChapter].ctaPrimary && (
                CHAPTERS[activeChapter].ctaPrimary.external ? (
                  <a
                    href={CHAPTERS[activeChapter].ctaPrimary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="got-cta-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    {CHAPTERS[activeChapter].ctaPrimary.label}
                  </a>
                ) : (
                  <a
                    href={CHAPTERS[activeChapter].ctaPrimary.url}
                    className="got-cta-btn"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                    onClick={(e) => {
                      const url = CHAPTERS[activeChapter].ctaPrimary.url;
                      if (url.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {CHAPTERS[activeChapter].ctaPrimary.label}
                  </a>
                )
              )}
              {CHAPTERS[activeChapter].ctaSecondary && (
                CHAPTERS[activeChapter].ctaSecondary.external ? (
                  <a
                    href={CHAPTERS[activeChapter].ctaSecondary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="got-cta-ghost"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                  >
                    {CHAPTERS[activeChapter].ctaSecondary.label}
                  </a>
                ) : (
                  <a
                    href={CHAPTERS[activeChapter].ctaSecondary.url}
                    className="got-cta-ghost"
                    style={{ textDecoration: 'none', display: 'inline-block' }}
                    onClick={(e) => {
                      const url = CHAPTERS[activeChapter].ctaSecondary.url;
                      if (url.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {CHAPTERS[activeChapter].ctaSecondary.label}
                  </a>
                )
              )}
            </div>
          </div>

         
          <div className="got-right-panel">
            <div ref={chapterLabelRef} className="got-chapter-label">01 / 06</div>
            <div className="got-vert-line" />
            <div className="got-dots">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className={`got-dot ${i === activeChapter ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="got-scroll-hint">
            <span>Scroll</span>
            <div className="arrow" />
          </div>

          {/* Progress bar */}
          <div className="got-progress-bar-wrap">
            <div ref={progressRef} className="got-progress-bar-fill" />
          </div>

        </div>{/* /sticky */}
      </div>{/* /container */}
    </>
  )
}

export default Hero