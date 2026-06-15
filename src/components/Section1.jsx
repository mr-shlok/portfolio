import React, { useEffect, useRef, useState } from 'react'
import './Section1.css'

// ─── Profile cards (existing) ────────────────────────────────────────────────
const HOUSES = [
  {
    id: 'stark',
    name: 'EDUCATION',
    seat: 'Theem College',
    words: '"Knowledge Is Power"',
    region: 'Academic Base',
    sigil: 'BE / HSC / SSC',
    colors: ['#6b7a8d', '#c8d4e0'],
    accent: '#8fafc4',
    description:
      '• BE (IT) — Theem College (2022–2026)\n• HSC — New English College (2020–2022)\n• SSC — R. V. Nerker School (2020)',
    sigil_url: '/images/one.jpg',
    bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 60%, #0d1117 100%)',
    borderColor: '#4a6380',
  },
  {
    id: 'lannister',
    name: 'SKILLS',
    seat: 'Core Expertise',
    words: '"Code Meets Logic"',
    region: 'Engineering',
    sigil: 'Java & Web Stack',
    colors: ['#c9a84c', '#e8c97a'],
    accent: '#d4a84b',
    description:
      '• Java (OOP, Collections, Exceptions, JVM)\n• SQL (Joins, Normalization, DDL/DML)\n• SDLC (Models, Lifecycle)\n• Web Development (Full Stack)',
    sigil_url: '/images/two.jpg',
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 60%, #1a1200 100%)',
    borderColor: '#7a6130',
  },
  {
    id: 'targaryen',
    name: 'AWARDS',
    seat: 'IIT Bombay / AWS / IBM',
    words: '"Innovate and Execute"',
    region: 'Achievements',
    sigil: 'Certifications',
    colors: ['#c41e3a', '#ff4466'],
    accent: '#c0392b',
    description:
      '• IIT Bombay Hackathon Finalist\n• AWS Generative AI Workshop\n• Edunet Green Skills & AI/ML\n• IBM AI Foundation Program',
    sigil_url: '/images/three.png',
    bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 60%, #1a0000 100%)',
    borderColor: '#7a1a1a',
  },
  {
    id: 'baratheon',
    name: 'COURSES',
    seat: 'Qspiders Training',
    words: '"Continuous Learning"',
    region: 'Professional Training',
    sigil: 'Full Stack Stack',
    colors: ['#e8c97a', '#f5e6c8'],
    accent: '#c9a84c',
    description:
      'Qspiders Training Program\n\nOngoing specialization in Java, SQL, and Web Development.',
    sigil_url: '/images/four.webp',
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 60%, #0a0a00 100%)',
    borderColor: '#5a5020',
  },
  {
    id: 'greyjoy',
    name: 'LANGUAGES',
    seat: 'Fluency',
    words: '"Words Convey Intent"',
    region: 'Communication',
    sigil: 'Trilingual',
    colors: ['#d4af37', '#8b8b6b'],
    accent: '#b8a040',
    description:
      '• English (Professional)\n• Hindi (Native)\n• Marathi (Native)',
    sigil_url: '/images/five.jpg',
    bg: 'linear-gradient(135deg, #050810 0%, #0a1020 60%, #050810 100%)',
    borderColor: '#3a4a5a',
  },
  {
    id: 'tyrell',
    name: 'CONNECT',
    seat: 'jshlok11111@gmail.com',
    words: '"Let\'s Build Together"',
    region: 'Collaboration',
    sigil: 'Get in Touch',
    colors: ['#4a7c3f', '#7ab648'],
    accent: '#5a9e48',
    description:
      'Email: jshlok11111@gmail.com\nPhone: 8080156497\nLinkedIn: linkedin.com/in/jshlok\nGitHub: github.com/mr-shlok',
    sigil_url: '/images/six.jpg',
    bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 60%, #030a00 100%)',
    borderColor: '#2a4a20',
  },
]

// ─── Work Experience data ────────────────────────────────────────────────────
const EXPERIENCES = [
  {
    id: 'hackveda',
    role: 'Java Intern',
    company: 'Hackveda Solutions Pvt. Ltd.',
    period: 'Internship',
    type: 'Professional Internship',
    accent: '#c9a84c',
    description: 'Worked on Java programming and software development concepts during the internship period. Gained hands-on experience with core Java, object-oriented programming principles, data structures, and algorithm design. Developed practical understanding of software development lifecycle (SDLC), code debugging, and version control. Contributed to real-world project modules involving Java backend logic and database connectivity.',
    skills: ['Java', 'OOP', 'Data Structures', 'SDLC', 'Backend Development'],
  },
  {
    id: 'qspiders',
    role: 'Incubation Intern — Integrated Program',
    company: 'Qspiders',
    period: 'Campus Recruitment',
    type: 'Training & Incubation',
    accent: '#8fafc4',
    description: 'Selected through campus recruitment for an intensive training program in Java, SQL, and Web Technologies. Currently enhancing skills as a Java Full Stack Developer. The program covers advanced Java concepts, Spring Boot framework, RESTful API development, frontend technologies (HTML, CSS, JavaScript, React), database management with MySQL, and deployment practices. Focused on building production-ready applications with industry-standard best practices.',
    skills: ['Java Full Stack', 'Spring Boot', 'SQL', 'React', 'REST APIs', 'Web Technologies'],
  },
  {
    id: 'finwizz',
    role: 'Client Relations Associate',
    company: 'Finwizz Financial Services Pvt. Ltd.',
    period: 'Professional Experience',
    type: 'Professional Skills',
    accent: '#5a9e48',
    description: 'Worked in a customer-facing financial services role to intentionally strengthen professional communication, client interaction, and relationship-building skills. Collaborated with customers and finance professionals to understand requirements, assist with loan consultation processes, and provide end-to-end support throughout customer interactions. Developed strong interpersonal, problem-solving, and teamwork abilities while gaining firsthand experience in a professional business environment and learning how to effectively communicate with diverse stakeholders.',
    skills: ['Professional Communication', 'Client Relationship Management', 'Customer Interaction', 'Problem Solving', 'Team Collaboration', 'Stakeholder Management'],
  },
]

// ─── Hackathon / Project data ────────────────────────────────────────────────
const HACKATHONS = [
  {
    id: 'insightx',
    name: 'InsightX Astra',
    venue: 'IIT Bombay Techfest',
    emoji: '🧠',
    accent: '#c0392b',
    shortDesc: 'Conversational AI for digital payment data analysis',
    fullDesc: 'InsightX Astra was a conversational AI platform developed during the IIT Bombay Techfest hackathon, focused on enabling users to query complex digital payment datasets using natural language. The system allowed users to ask financial questions and receive real-time, explainable insights in a simplified format. The main goal was to reduce complexity in financial data interpretation using AI-driven conversation interfaces.',
    tech: ['React.js', 'Node.js', 'Python (Flask)', 'NLP/OpenAI API', 'MongoDB/Firebase', 'JWT Auth'],
  },
  {
    id: 'blogy',
    name: 'Blogy',
    venue: 'Hackathon Project',
    emoji: '📝',
    accent: '#c9a84c',
    shortDesc: 'Multilingual blogging platform with real-time translation',
    fullDesc: 'Blogy was a multilingual blogging platform designed to allow users to write, translate, and publish blogs in multiple languages. The system focused on breaking language barriers and making content accessible globally. It supported real-time translation and user-friendly blog publishing with a clean, responsive interface.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Translation APIs', 'JWT Auth'],
  },
  {
    id: 'kodemaster',
    name: 'Kodemaster',
    venue: 'Hackathon Project',
    emoji: '💻',
    accent: '#5a9e48',
    shortDesc: 'Developer productivity & code management tool',
    fullDesc: 'Kodemaster was a developer-focused productivity platform built to assist programmers with code management, snippet organization, and quick debugging suggestions. It acted as a lightweight tool to improve coding efficiency and workflow organization.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
  },
  {
    id: 'lumen',
    name: 'Lumen',
    venue: 'Hackathon Project',
    emoji: '✨',
    accent: '#8fafc4',
    shortDesc: 'AI-powered smart utility & productivity platform',
    fullDesc: 'Lumen was a smart AI-based utility project focused on enhancing user productivity through intelligent suggestions and automation. It provided smart insights, task handling features, and AI-assisted decision-making support.',
    tech: ['React.js', 'Node.js', 'Python', 'ML/NLP Models', 'MongoDB', 'Secure Sessions'],
  },
]

// ─── HouseCard component (existing, preserved) ──────────────────────────────
const HouseCard = ({ house, index }) => {
  const cardRef   = useRef(null)
  const sigilRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 120)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
    if (sigilRef.current) {
      sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
    }
  }
  const handleMouseLeave = () => {
    if (sigilRef.current) sigilRef.current.style.transform = ''
    setHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`house-card house-card--${house.id} ${visible ? 'visible' : ''}`}
      style={{ '--accent': house.accent, '--border': house.borderColor, background: house.bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
      <div className="card-glow" />

      <div ref={sigilRef} className="house-sigil-wrap">
        {!imgError ? (
          <img
            className="house-sigil-img"
            src={house.sigil_url}
            alt={`House ${house.name} sigil`}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="house-sigil-fallback">{house.sigil[0]}</div>
        )}
        <div className="sigil-ring" />
      </div>

      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{house.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">{house.name}</h2>
        <p className="house-seat">{house.seat}</p>
        <p className="house-sigil-label">{house.sigil}</p>
      </div>

      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{house.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="hover-name">{house.name}</h2>
        {house.id === 'tyrell' ? (
          <div className="hover-desc-connect">
            <p style={{ margin: '4px 0' }}>Email:<br /><a href="mailto:jshlok11111@gmail.com" target="_blank" rel="noopener noreferrer">jshlok11111@gmail.com</a></p>
            <p style={{ margin: '4px 0' }}>Phone:<br /><a href="tel:8080156497">8080156497</a></p>
            <p style={{ margin: '4px 0' }}>LinkedIn:<br /><a href="https://www.linkedin.com/in/jshlok/" target="_blank" rel="noopener noreferrer">linkedin.com/in/jshlok</a></p>
            <p style={{ margin: '4px 0' }}>GitHub:<br /><a href="https://github.com/mr-shlok/" target="_blank" rel="noopener noreferrer">github.com/mr-shlok</a></p>
          </div>
        ) : (
          <p className="hover-desc" style={{ whiteSpace: 'pre-line' }}>{house.description}</p>
        )}
      </div>

      <div className="card-accent-bar" />
    </div>
  )
}

// ─── ExperienceCard component ────────────────────────────────────────────────
const ExperienceCard = ({ exp, index }) => {
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 200)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`exp-card ${visible ? 'visible' : ''}`}
      style={{ '--exp-accent': exp.accent }}
    >
      <div className="exp-card-border" />
      <div className="exp-header">
        <div className="exp-type-badge">{exp.type}</div>
        <div className="exp-period">{exp.period}</div>
      </div>
      <h3 className="exp-company">{exp.company}</h3>
      <h4 className="exp-role">{exp.role}</h4>
      <div className="exp-divider">
        <span className="divider-line" />
        <span className="divider-diamond" />
        <span className="divider-line" />
      </div>
      <p className="exp-description">{exp.description}</p>
      <div className="exp-skills">
        {exp.skills.map(s => (
          <span key={s} className="exp-skill-tag">{s}</span>
        ))}
      </div>
    </div>
  )
}

// ─── HackathonCard component (FIXED - uses React state for visibility) ───────
const HackathonCard = ({ hack, index }) => {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`hack-card ${visible ? 'visible' : ''} ${expanded ? 'hack-expanded' : ''}`}
      style={{ '--hack-accent': hack.accent }}
    >
      <div className="hack-card-glow" />
      <div className="hack-summary" onClick={() => setExpanded(!expanded)}>
        <span className="hack-emoji">{hack.emoji}</span>
        <div className="hack-info">
          <h3 className="hack-name">{hack.name}</h3>
          <p className="hack-venue">{hack.venue}</p>
          <p className="hack-short">{hack.shortDesc}</p>
        </div>
        <span className={`hack-toggle ${expanded ? 'rotated' : ''}`}>▾</span>
      </div>
      <div className={`hack-details ${expanded ? 'details-open' : ''}`}>
        <div className="hack-details-inner">
          <div className="hack-divider">
            <span className="divider-line" />
            <span className="divider-diamond" />
            <span className="divider-line" />
          </div>
          <p className="hack-full-desc">{hack.fullDesc}</p>
          <div className="hack-tech-wrap">
            <span className="hack-tech-label">Tech Stack:</span>
            <div className="hack-tech-tags">
              {hack.tech.map(t => (
                <span key={t} className="hack-tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Section1 ───────────────────────────────────────────────────────────
const Section1 = () => {
  const sectionRef   = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="section1">

      {/* Ambient background texture */}
      <div className="section1-bg-texture" />
      <div className="section1-bg-vignette" />

      {/* ─── Past Experience Section ─── */}
      <div className="experience-section" id="experience">
        <header className="section1-header">
          <p className="section1-eyebrow fade-up visible">PAST EXPERIENCE</p>
          <div className="header-ornament">
            <span className="ornament-line" />
            <span className="ornament-rune">⚒</span>
            <span className="ornament-line" />
          </div>
          <h2 className="section1-title fade-up visible">
            Past<br />
            <em>Experience</em>
          </h2>
          <p className="section1-subtitle fade-up visible">
            Professional internships and training programs that built my foundation.
          </p>
        </header>

        <div className="experience-grid">
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="section-divider-ornament">
        <span className="footer-line" />
        <span className="footer-sigil">✦</span>
        <span className="footer-line" />
      </div>

      {/* ─── Profile Cards Section (existing) ─── */}
      <div id="profile-section" />
      <header className="section1-header">
        <p className="section1-eyebrow fade-up visible">THE PROFESSIONAL PROFILE</p>
        <div className="header-ornament">
          <span className="ornament-line" />
          <span className="ornament-rune">✦</span>
          <span className="ornament-line" />
        </div>
        <h1 className="section1-title fade-up visible">
          Core<br />
          <em>Profile</em>
        </h1>
        <p className="section1-subtitle fade-up visible">
          Focused skills. Six core pillars. One developer mindset.
        </p>
      </header>

      <div className="houses-grid">
        {HOUSES.map((house, i) => (
          <HouseCard key={house.id} house={house} index={i} />
        ))}
      </div>

      {/* ─── Divider ─── */}
      <div className="section-divider-ornament">
        <span className="footer-line" />
        <span className="footer-sigil">⚔</span>
        <span className="footer-line" />
      </div>

      {/* ─── Projects / Hackathons Section ─── */}
      <div className="hackathons-section" id="projects">
        <header className="section1-header">
          <p className="section1-eyebrow fade-up visible">HACKATHON PROJECTS</p>
          <div className="header-ornament">
            <span className="ornament-line" />
            <span className="ornament-rune">🏆</span>
            <span className="ornament-line" />
          </div>
          <h2 className="section1-title fade-up visible">
            Projects
          </h2>
          <p className="section1-subtitle fade-up visible">
            Click on any project to explore the details and tech stack.
          </p>
        </header>

        <div className="hackathons-list">
          {HACKATHONS.map((hack, i) => (
            <HackathonCard key={hack.id} hack={hack} index={i} />
          ))}
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className="portfolio-footer">
        <div className="footer-info">
          <p className="footer-tagline">Software Engineer — Based in Mumbai</p>
          <p className="footer-copyright">© 2026 Shlok Jadhav</p>
          <p className="footer-made">MADE WITH CODE</p>
        </div>
        <div className="footer-big-name">
          <h2 className="footer-hero-name">SHLOK JADHAV</h2>
        </div>
        <div className="footer-links">
          <a href="https://github.com/mr-shlok" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span className="footer-link-divider">•</span>
          <a href="https://www.linkedin.com/in/jshlok/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span className="footer-link-divider">•</span>
          <a href="mailto:jshlok11111@gmail.com">Email</a>
        </div>
      </footer>

    </section>
  )
}

export default Section1