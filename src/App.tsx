import { useState, useEffect, useCallback } from 'react';

// ============ PARTICLES ============
function Particles({ count = 25 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 5 + 2 + 'px',
            height: Math.random() * 5 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: ['#FFD700', '#FF6600', '#DC143C', '#FFA500'][Math.floor(Math.random() * 4)],
            animation: `sparkle ${Math.random() * 4 + 2}s ease-in-out ${Math.random() * 3}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

// ============ INTRO SCREEN ============
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3500);
    const t4 = setTimeout(() => onComplete(), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#0d0505] via-[#1a0808] to-[#0d0505]">
      <Particles count={40} />
      <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-yellow-400/10 animate-spin-slow"></div>
      <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full border border-red-500/10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
      
      {phase >= 0 && (
        <div className="animate-fadeInScale text-center relative z-10">
          <div className="text-8xl md:text-[10rem] animate-glow-pulse" style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: '#FFD700' }}>
            ॐ
          </div>
        </div>
      )}
      {phase >= 1 && (
        <div className="animate-fadeInUp mt-6 text-center relative z-10">
          <p className="text-yellow-400 text-xl md:text-3xl animate-glow" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            || श्री दुर्गायै नमः ||
          </p>
        </div>
      )}
      {phase >= 2 && (
        <div className="animate-fadeInUp mt-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            जय माता दी
          </h2>
          <p className="text-yellow-300/60 mt-3 text-base md:text-lg">Navratri 2026 • 11-19 October</p>
        </div>
      )}
      {phase >= 3 && (
        <div className="animate-fadeInUp mt-10 relative z-10">
          <div className="flex space-x-3">
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} className="w-3 h-3 rounded-full bg-yellow-400 animate-diya" style={{ animationDelay: `${i * 0.2}s` }}></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Gallery', 'Aarti', 'Prasad', 'Garba', 'Schedule', 'Location', 'Team'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glossy-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl md:text-3xl animate-diya">🪔</span>
          <span className="text-lg md:text-xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            Navratri 2026
          </span>
        </div>
        <div className="hidden lg:flex items-center space-x-5">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="text-yellow-100/80 hover:text-yellow-400 transition-all duration-300 text-sm font-medium relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        <button className="lg:hidden text-yellow-400 text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
      {mobileOpen && (
        <div className="lg:hidden glossy-nav mt-2 mx-4 rounded-2xl p-4 animate-fadeInScale">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              className="block py-3 text-yellow-100/80 hover:text-yellow-400 transition-all border-b border-yellow-400/10 text-center"
              onClick={() => setMobileOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#1a0808] to-[#0d0505]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-yellow-400/5 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full border border-red-500/5 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      <Particles count={35} />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="mb-6 animate-float">
          <span className="text-7xl md:text-9xl text-yellow-400 animate-glow" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>ॐ</span>
        </div>
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-4 animate-fadeInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="gradient-text">Navratri</span>
          <br />
          <span className="text-yellow-400 animate-glow">2026</span>
        </h1>
        <p className="text-xl md:text-3xl text-yellow-300/90 mb-3 animate-fadeInUp" style={{ animationDelay: '0.3s', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
          || सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ||
        </p>
        <p className="text-base md:text-xl text-yellow-100/60 mb-3 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          11 October – 19 October 2026 | Grand Society Celebration
        </p>
        <p className="text-sm md:text-lg text-yellow-100/40 mb-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          Nine Divine Nights of Maa Durga's Blessings
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <a href="#gallery" className="btn-golden">🎉 Explore Gallery</a>
          <a href="#location" className="btn-outline-gold">📍 Visit Us</a>
        </div>
        <div className="flex justify-center mt-12 space-x-6">
          {['🪔', '🪔', '🪔', '🪔', '🪔'].map((d, i) => (
            <span key={i} className="text-2xl md:text-3xl animate-diya" style={{ animationDelay: `${i * 0.4}s` }}>{d}</span>
          ))}
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

// ============ COUNTDOWN CLOCK ============
function CountdownClock() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-10-11T05:00:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const digits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#150808] to-[#0d0505]"></div>
      <Particles count={20} />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-40 h-40 rounded-full border border-yellow-400/10" style={{ animation: 'ripple 3s ease-out infinite' }}></div>
        <div className="absolute inset-0 w-40 h-40 rounded-full border border-yellow-400/10" style={{ animation: 'ripple 3s ease-out 1s infinite' }}></div>
        <div className="absolute inset-0 w-40 h-40 rounded-full border border-yellow-400/10" style={{ animation: 'ripple 3s ease-out 2s infinite' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <span className="text-5xl md:text-6xl animate-glow-pulse">⏰</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold gradient-text mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
          Countdown to Navratri 2026
        </h2>
        <p className="text-yellow-100/50 mb-10 text-sm md:text-base">11 October 2026 • The Divine Beginning</p>

        <div className="flex justify-center items-center gap-3 md:gap-6 flex-wrap">
          {digits.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="clock-digit animate-pulse-glow">
                <span className="text-3xl md:text-5xl font-black text-yellow-400 relative z-10 animate-clock-tick" style={{ fontFamily: "'Playfair Display', serif", animationDelay: `${i * 0.25}s` }}>
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-yellow-100/50 text-xs md:text-sm mt-2 uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="animate-pendulum">
            <div className="w-0.5 h-16 bg-gradient-to-b from-yellow-400/50 to-transparent mx-auto"></div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-600 mx-auto -mt-1 animate-diya shadow-lg shadow-yellow-400/30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MEGA TITLE SECTION ============
function MegaTitleSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#1a0808] to-[#0d0505]"></div>
      <div className="absolute inset-0 animate-mega-glow-bg"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 rounded-full border-2 border-yellow-400/20 animate-ring-expand"></div>
        <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-orange-500/20 animate-ring-expand" style={{ animationDelay: '1s' }}></div>
        <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-red-500/20 animate-ring-expand" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 animate-sparkle-float"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              fontSize: `${Math.random() * 16 + 8}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      <Particles count={30} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8 flex justify-center items-center space-x-4">
          <span className="text-4xl md:text-5xl animate-diya">🪔</span>
          <span className="text-5xl md:text-6xl animate-lotus-spin">🌺</span>
          <span className="text-4xl md:text-5xl animate-diya" style={{ animationDelay: '1s' }}>🪔</span>
        </div>

        <div className="animate-mega-title mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-tight animate-mega-shine" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            બોલ મારી અંબે
          </h1>
        </div>

        <div className="animate-mega-pulse mb-8">
          <h2 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black animate-glow" style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: '#FFD700' }}>
            જય જય અંબે
          </h2>
        </div>

        <div className="flex justify-center items-center space-x-3">
          {['🪔', '🌺', '✨', '🙏', '✨', '🌺', '🪔'].map((item, i) => (
            <span key={i} className="text-2xl md:text-3xl animate-diya" style={{ animationDelay: `${i * 0.3}s` }}>{item}</span>
          ))}
        </div>

        <div className="mt-12 mx-auto w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-mega-pulse rounded-full"></div>
      </div>
    </section>
  );
}

// ============ PHOTO GALLERY (ONLY 1 PHOTO) ============
function PhotoGallery() {
  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#120606] to-[#0d0505]"></div>
      <Particles count={15} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            ✨ Photo Gallery ✨
          </h2>
          <p className="text-yellow-100/50 text-lg">Divine moments captured in time</p>
          <div className="section-divider mt-4"></div>
        </div>

        {/* Single Main Image */}
        <div className="relative mb-10">
          <div className="relative rounded-3xl overflow-hidden animate-border-glow border-2 animate-pulse-glow">
            <img
              src="https://image.qwenlm.ai/generated-images/abe6f77a-991c-4a9e-8c69-4bd6f9760569/_result.png"
              alt="Maa Durga Idol"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Maa Durga Idol
              </h3>
              <p className="text-yellow-100/70">Divine decoration of Goddess Durga</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ AARTI SECTION ============
function AartiSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="aarti" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#1a0505] to-[#0d0505]"></div>
      <Particles count={20} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🪔 Daily Aarti 🪔
          </h2>
          <p className="text-yellow-100/50 text-lg">Sacred evening prayers</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-3 glossy-card px-8 py-5 animate-border-glow mb-8">
            <span className="text-3xl animate-pendulum">🪔</span>
            <span className="text-yellow-400 font-bold text-3xl md:text-4xl animate-clock-tick" style={{ fontFamily: "'Playfair Display', serif" }}>
              7:30 PM
            </span>
            <span className="text-3xl animate-pendulum" style={{ animationDelay: '1s' }}>🪔</span>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-golden mt-6"
          >
            {showDetails ? 'Hide Details' : 'View Details'} ✨
          </button>

          {showDetails && (
            <div className="mt-8 space-y-6 animate-fadeInUp">
              <div className="glossy-card p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl animate-diya">🪔</span>
                  <h3 className="text-yellow-400 font-bold text-xl">Sandhya Aarti</h3>
                </div>
                <p className="text-yellow-100/70 text-sm">Every evening at <span className="text-yellow-400 font-bold">7:30 PM</span>, the sacred Aarti ceremony is performed with traditional bells, conch shells, and devotional songs.</p>
              </div>

              <div className="glossy-card p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl">🔔</span>
                  <h3 className="text-yellow-400 font-bold text-xl">Aarti Mantra</h3>
                </div>
                <p className="text-yellow-100/70 text-sm" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                  "ॐ जय अम्बे गौरी, माँ शीतला मायी।<br/>
                  सकल सुख कारिणी, विश्व विख्याता ध्यायी॥"
                </p>
              </div>

              <div className="glossy-card p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-3xl animate-glow-pulse">✨</span>
                  <h3 className="text-yellow-400 font-bold text-xl">Special Aarti</h3>
                </div>
                <p className="text-yellow-100/70 text-sm">On Ashtami & Navami, special Maha Aarti with 108 diyas, flower offerings, and traditional instruments creates a divine atmosphere.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ PRASAD SECTION ============
function PrasadSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="prasad" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#100606] to-[#0d0505]"></div>
      <Particles count={15} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🍲 દિવ્ય પ્રસાદ 🍲
          </h2>
          <p className="text-yellow-100/50 text-lg">માતાજીના આશીર્વાદથી પ્રસાદ</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-golden mt-6"
          >
            {showDetails ? 'Hide Details' : 'View Prasad Menu'} 🍽️
          </button>

          {showDetails && (
            <div className="mt-8 space-y-4 animate-fadeInUp">
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🫓</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Halwa - Puri - Chana</h4>
                    <p className="text-yellow-100/60 text-sm">Traditional Navratri bhog served daily</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🥥</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Coconut & Fruits</h4>
                    <p className="text-yellow-100/60 text-sm">Sacred coconut and seasonal fruits prasad</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🍬</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Mithai & Sweets</h4>
                    <p className="text-yellow-100/60 text-sm">Special sweets on Ashtami & Navami</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🍚</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Annaprashan Bhog</h4>
                    <p className="text-yellow-100/60 text-sm">Grand feast on Ashtami - Khichdi, Puri, Halwa</p>
                  </div>
                </div>
              </div>
              <p className="text-yellow-100/40 text-sm text-center italic mt-6">
                "Prasad is distributed after every Aarti ceremony"
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ GARBA SECTION ============
function GarbaSection() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="garba" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#150505] to-[#0d0505]"></div>
      <Particles count={25} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            💃 Garba Nights 💃
          </h2>
          <p className="text-yellow-100/50 text-lg">Nine nights of divine dance & joy</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-4 glossy-card px-8 py-5 animate-border-glow mb-8">
            <span className="text-3xl animate-diya">💃</span>
            <span className="text-yellow-400 font-bold text-3xl md:text-4xl animate-clock-tick" style={{ fontFamily: "'Playfair Display', serif" }}>
              10:30 PM
            </span>
            <span className="text-3xl animate-diya" style={{ animationDelay: '1s' }}>🕺</span>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="btn-golden mt-6"
          >
            {showDetails ? 'Hide Details' : 'View Garba Details'} 💃
          </button>

          {showDetails && (
            <div className="mt-8 space-y-4 animate-fadeInUp">
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl animate-diya">🕙</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold text-lg">10:30 PM - Garba Begins</h4>
                    <p className="text-yellow-100/60 text-sm">After Aarti, the dance floor comes alive</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🥁</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Live Dhol & Orchestra</h4>
                    <p className="text-yellow-100/60 text-sm">Traditional Garba music with DJ & live band</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">💃</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Traditional Garba & Dandiya</h4>
                    <p className="text-yellow-100/60 text-sm">All age groups welcome • Free entry</p>
                  </div>
                </div>
              </div>
              <div className="glossy-card p-5">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <h4 className="text-yellow-400 font-bold">Competition & Prizes</h4>
                    <p className="text-yellow-100/60 text-sm">Best costume & dance competition with prizes</p>
                  </div>
                </div>
              </div>
              <p className="text-yellow-100/40 mt-4 text-sm">Garba starts after Aarti ceremony every night</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============ SCHEDULE - COMPACT DAYS ============
function ScheduleSection() {
  const schedule = [
    { day: 1, date: '11 Oct', name: 'પ્રતિપદા', deity: 'શૈલપુત્રી', color: '#FF6B6B' },
    { day: 2, date: '12 Oct', name: 'દ્વિતીયા', deity: 'બ્રહ્મચારિણી', color: '#FFA500' },
    { day: 3, date: '13 Oct', name: 'તૃતીયા', deity: 'ચંદ્રઘંટા', color: '#FFD700' },
    { day: 4, date: '14 Oct', name: 'ચતુર્થી', deity: 'કૂષ્માંડા', color: '#4CAF50' },
    { day: 5, date: '15 Oct', name: 'પંચમી', deity: 'સ્કંદમાતા', color: '#00BCD4' },
    { day: 6, date: '16 Oct', name: 'ષષ્ઠી', deity: 'કાત્યાયની', color: '#3F51B5' },
    { day: 7, date: '17 Oct', name: 'સપ્તમી', deity: 'કાલરાત્રી', color: '#9C27B0' },
    { day: 8, date: '18 Oct', name: 'અષ્ટમી', deity: 'મહાગૌરી', color: '#E91E63' },
    { day: 9, date: '19 Oct', name: 'નવમી', deity: 'સિદ્ધિદાત્રી', color: '#FF5722' },
  ];

  return (
    <section id="schedule" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#100505] to-[#0d0505]"></div>
      <Particles count={15} />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📅 નવ દિવ્ય દિવસો 📅
          </h2>
          <p className="text-yellow-100/50 text-lg">11 October – 19 October 2026</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="glossy-card p-4 md:p-5 text-center hover:scale-105 transition-all duration-500 group animate-organizer-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {/* Day number with color accent */}
              <div className="relative mb-2">
                <span className="text-3xl md:text-4xl font-black" style={{ color: item.color, fontFamily: "'Playfair Display', serif" }}>
                  {item.day}
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{ background: item.color }}></div>
              </div>
              
              {/* Date */}
              <p className="text-yellow-100/50 text-xs mb-2">{item.date}</p>
              
              {/* Day name in Gujarati */}
              <h3 className="text-yellow-400 font-bold text-sm md:text-base mb-1" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                {item.name}
              </h3>
              
              {/* Deity name in Gujarati */}
              <p className="text-yellow-100/60 text-xs md:text-sm" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                {item.deity}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <div className="glossy-card p-6 inline-block animate-border-glow">
            <p className="text-yellow-400 font-bold text-lg">🎊 19 October - Monday - વિજયાદશમી 🎊</p>
            <p className="text-yellow-100/50 text-sm mt-1">Grand Visarjan & Celebration Conclusion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ LOCATION ============
function LocationSection() {
  return (
    <section id="location" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#100606] to-[#0d0505]"></div>
      <Particles count={10} />

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📍 Visit Us 📍
          </h2>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="glossy-card p-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏛️</span>
                <div>
                  <h4 className="text-yellow-400 font-bold">Venue</h4>
                  <p className="text-yellow-100/70 text-sm">Purusharthi Nagar Society</p>
                </div>
              </div>
            </div>
            <div className="glossy-card p-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📅</span>
                <div>
                  <h4 className="text-yellow-400 font-bold">Dates</h4>
                  <p className="text-yellow-100/70 text-sm">11 October – 19 October 2026 (Monday)</p>
                </div>
              </div>
            </div>
            <div className="glossy-card p-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🕖</span>
                <div>
                  <h4 className="text-yellow-400 font-bold">Daily Aarti</h4>
                  <p className="text-yellow-100/70 text-sm">7:30 PM Evening | 10:30 PM Garba Night</p>
                </div>
              </div>
            </div>
            <div className="glossy-card p-5">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📞</span>
                <div>
                  <h4 className="text-yellow-400 font-bold">Contact</h4>
                  <p className="text-yellow-100/70 text-sm">Contact organizing committee for details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="glossy-card p-2 w-full animate-pulse-glow">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.151564796195!2d72.56312717625987!3d23.0549043151191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8569c5f49f83%3A0x197806e0ebacb2ee!2sPurusharthi%20Nagar%20Society!5e0!3m2!1sen!2sin!4v1789918330065!5m2!1sen!2sin" 
                width="100%" 
                height="300" 
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Location Map"
              ></iframe>
            </div>
            <a href="https://maps.google.com/?q=Purusharthi+Nagar+Society" target="_blank" rel="noopener noreferrer" className="btn-golden w-full text-center block">
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ ORGANIZER SECTION ============
function OrganizerSection() {
  const organizers = [
    { name: 'હસમુખભાઈ', emoji: '👑' },
    { name: 'નકુલ', emoji: '⭐' },
    { name: 'વિનોદ', emoji: '🌟' },
    { name: 'વિકાસ', emoji: '✨' },
    { name: 'રાહુલ', emoji: '💫' },
    { name: 'કરણ', emoji: '🔥' },
    { name: 'હાર્દિક', emoji: '💎' },
    { name: 'ધમો', emoji: '🎯' },
    { name: 'ભીખાભાઈ', emoji: '🏆' },
    { name: 'રાજુભાઈ', emoji: '🌺' },
    { name: 'વિકી', emoji: '🎪' },
    { name: 'દલપતભાઈ', emoji: '🎨' },
    { name: 'જયેશ', emoji: '🙏' },
    { name: 'ઉમેશ', emoji: '🪔' },
    { name: 'કાલિશ', emoji: '🌟' },
    { name: 'ચેતન', emoji: '✨' },
  ];

  return (
    <section id="team" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#150808] to-[#0d0505]"></div>
      
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      
      <Particles count={20} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <span className="text-3xl md:text-4xl animate-diya">🪔</span>
            <span className="text-4xl md:text-5xl animate-lotus-spin">🌺</span>
            <span className="text-3xl md:text-4xl animate-diya" style={{ animationDelay: '1s' }}>🪔</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black gradient-text mb-4 animate-mega-pulse" style={{ fontFamily: "'Playfair Display', serif" }}>
            આયોજક સમિતી
          </h2>
          <p className="text-xl md:text-2xl text-yellow-400/80 mb-2" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            Organizing Committee
          </p>
          <p className="text-yellow-100/40 text-sm md:text-base">The dedicated team behind this grand celebration</p>
          <div className="section-divider mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {organizers.map((member, i) => (
            <div
              key={i}
              className="glossy-card p-5 md:p-6 text-center hover:scale-110 transition-all duration-500 group animate-organizer-in animate-organizer-glow"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl mb-3 group-hover:animate-heartbeat transition-transform duration-300">
                {member.emoji}
              </div>
              <h4 className="text-lg md:text-xl font-bold animate-name-shimmer mb-1" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                {member.name}
              </h4>
              <p className="text-yellow-100/40 text-xs md:text-sm">Organizer</p>
              <div className="mt-3 mx-auto w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent group-hover:w-20 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glossy-card p-6 md:p-8 inline-block animate-border-glow">
            <p className="text-yellow-400 font-bold text-lg md:text-2xl mb-2" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
              🙏 સૌનો આભાર 🙏
            </p>
            <p className="text-yellow-100/60 text-sm md:text-base">
              Thank you for making this celebration possible
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              {['🪔', '🌺', '✨', '🙏', '✨', '🌺', '🪔'].map((item, i) => (
                <span key={i} className="text-xl animate-diya" style={{ animationDelay: `${i * 0.2}s` }}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MARQUEE ============
function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-red-900/80 via-yellow-900/80 to-red-900/80 py-3 overflow-hidden border-y border-yellow-400/20">
      <div className="whitespace-nowrap" style={{ animation: 'marquee 25s linear infinite' }}>
        <span className="text-yellow-400 text-sm mx-8">🙏 जय माता दी 🙏</span>
        <span className="text-yellow-300 text-sm mx-8">✨ Navratri 2026 • 11-19 October ✨</span>
        <span className="text-yellow-400 text-sm mx-8">🪔 Daily Aarti 7:30 PM 🪔</span>
        <span className="text-yellow-300 text-sm mx-8">💃 Garba Night 10:30 PM 💃</span>
        <span className="text-yellow-400 text-sm mx-8">🍲 Prasad Distribution Daily 🍲</span>
        <span className="text-yellow-300 text-sm mx-8">🌺 Everyone Welcome 🌺</span>
        <span className="text-yellow-400 text-sm mx-8">🙏 जय माता दी 🙏</span>
        <span className="text-yellow-300 text-sm mx-8">✨ Navratri 2026 • 11-19 October ✨</span>
      </div>
    </div>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="relative py-16 border-t border-yellow-400/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] to-[#050202]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-4 mb-6">
          {['🪔', '🌺', '🙏', '🌺', '🪔'].map((item, i) => (
            <span key={i} className="text-2xl animate-diya" style={{ animationDelay: `${i * 0.3}s` }}>{item}</span>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Jai Mata Di 🙏
        </h3>
        <p className="text-yellow-100/50 mb-2">May Maa Durga bless everyone with strength, wisdom & prosperity</p>
        
        <div className="section-divider my-8"></div>

        {/* BIG NAME - Maheriya Nakul */}
        <div className="my-12">
          <p className="text-yellow-100/40 text-sm mb-4 uppercase tracking-widest">Website Designed & Developed by</p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black animate-mega-shine leading-tight animate-mega-title" style={{ fontFamily: "'Playfair Display', serif" }}>
            Maheriya Nakul
          </h2>
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-mega-pulse rounded-full"></div>
          </div>
          <p className="text-yellow-100/30 text-xs mt-4">© 2026 | Premium Navratri Website</p>
        </div>

        <div className="mt-8 p-5 rounded-xl bg-gradient-to-r from-yellow-400/5 to-red-400/5 border border-yellow-400/10">
          <p className="text-yellow-100/40 text-sm">
            © 2026 All Rights Reserved | Navratri Grand Celebration
          </p>
          <p className="text-yellow-100/30 text-xs mt-1">
            Premium Society Website • Professional Design
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors"><i className="fab fa-facebook text-xl"></i></span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors"><i className="fab fa-instagram text-xl"></i></span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors"><i className="fab fa-whatsapp text-xl"></i></span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors"><i className="fab fa-youtube text-xl"></i></span>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0505]">
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <>
          <Navbar />
          <HeroSection />
          <MarqueeBanner />
          <CountdownClock />
          <MegaTitleSection />
          <PhotoGallery />
          <AartiSection />
          <PrasadSection />
          <GarbaSection />
          <ScheduleSection />
          <LocationSection />
          <OrganizerSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
