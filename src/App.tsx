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
      {/* Rotating rings */}
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
      
      {/* Ripple effects */}
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

        {/* Clock Display */}
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

        {/* Decorative pendulum */}
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

// ============ PHOTO GALLERY ============
function PhotoGallery() {
  const images = [
    { src: 'https://image.qwenlm.ai/generated-images/abe6f77a-991c-4a9e-8c69-4bd6f9760569/_result.png', title: 'Maa Durga Idol', desc: 'Divine decoration of Goddess Durga' },
    { src: 'https://image.qwenlm.ai/generated-images/b9013c41-a6d7-43d4-ad3b-e0398d728a13/_result.png', title: 'Grand Aarti', desc: 'Sacred evening Aarti ceremony' },
    { src: 'https://image.qwenlm.ai/generated-images/e8802867-61cb-42a1-8fc0-e06e50311990/_result.png', title: 'Garba Night', desc: 'Traditional Garba & Dandiya Raas' },
    { src: 'https://image.qwenlm.ai/generated-images/37c36d06-ed74-456f-a36a-a173fd050bd1/_result.png', title: 'Divine Prasad', desc: 'Holy prasad distribution' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

        {/* Main Image */}
        <div className="relative mb-10">
          <div className="relative rounded-3xl overflow-hidden animate-border-glow border-2 animate-pulse-glow">
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].title}
              className="w-full h-[280px] md:h-[450px] object-cover transition-all duration-1000 animate-fadeInScale"
              key={activeIndex}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {images[activeIndex].title}
              </h3>
              <p className="text-yellow-100/70">{images[activeIndex].desc}</p>
            </div>
          </div>
          <div className="flex justify-center mt-6 space-x-3">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`h-3 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-yellow-400 w-8' : 'bg-yellow-400/30 w-3'}`} />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div key={i}
              className={`photo-card-3d cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-500 ${i === activeIndex ? 'border-yellow-400 scale-105 shadow-lg shadow-yellow-400/20' : 'border-yellow-400/20 opacity-60 hover:opacity-100'}`}
              onClick={() => setActiveIndex(i)}>
              <img src={img.src} alt={img.title} className="w-full h-28 md:h-36 object-cover" />
              <div className="p-2 bg-gradient-to-r from-[#8B0000]/80 to-[#0d0505]/80">
                <p className="text-yellow-400 text-xs font-medium truncate">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-scroll strip */}
        <div className="mt-12 overflow-hidden">
          <div className="flex space-x-4 animate-scroll-auto" style={{ width: 'max-content' }}>
            {[...images, ...images, ...images].map((img, i) => (
              <div key={i} className="w-44 md:w-56 h-28 md:h-36 rounded-xl overflow-hidden flex-shrink-0 border border-yellow-400/15">
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ AARTI SECTION ============
function AartiSection() {
  return (
    <section id="aarti" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#1a0505] to-[#0d0505]"></div>
      <Particles count={20} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🪔 Daily Aarti 🪔
          </h2>
          <p className="text-yellow-100/50 text-lg">Sacred evening prayers</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Aarti Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border-2 border-yellow-400/30 animate-pulse-glow">
              <img
                src="https://image.qwenlm.ai/generated-images/b9013c41-a6d7-43d4-ad3b-e0398d728a13/_result.png"
                alt="Aarti Ceremony"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
            {/* Time badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glossy-card px-6 py-3 animate-heartbeat">
              <span className="text-yellow-400 font-bold text-lg md:text-xl">🕖 7:30 PM Daily</span>
            </div>
          </div>

          {/* Aarti Details */}
          <div className="space-y-5">
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

            {/* Animated time display */}
            <div className="text-center mt-4">
              <div className="inline-flex items-center space-x-3 glossy-card px-6 py-4 animate-border-glow">
                <span className="text-2xl animate-pendulum">🪔</span>
                <span className="text-yellow-400 font-bold text-2xl md:text-3xl animate-clock-tick" style={{ fontFamily: "'Playfair Display', serif" }}>
                  7:30 PM
                </span>
                <span className="text-2xl animate-pendulum" style={{ animationDelay: '1s' }}>🪔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ PRASAD SECTION ============
function PrasadSection() {
  return (
    <section id="prasad" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#100606] to-[#0d0505]"></div>
      <Particles count={15} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🍲 Divine Prasad 🍲
          </h2>
          <p className="text-yellow-100/50 text-lg">Holy offerings blessed by Maa Durga</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Prasad Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border-2 border-yellow-400/30 animate-pulse-glow">
              <img
                src="https://image.qwenlm.ai/generated-images/37c36d06-ed74-456f-a36a-a173fd050bd1/_result.png"
                alt="Divine Prasad"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Prasad Details */}
          <div className="space-y-4">
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
            <p className="text-yellow-100/40 text-sm text-center italic">
              "Prasad is distributed after every Aarti ceremony"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ GARBA SECTION ============
function GarbaSection() {
  return (
    <section id="garba" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#150505] to-[#0d0505]"></div>
      <Particles count={25} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            💃 Garba Nights 💃
          </h2>
          <p className="text-yellow-100/50 text-lg">Nine nights of divine dance & joy</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Garba Details */}
          <div className="space-y-4 order-2 md:order-1">
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
          </div>

          {/* Garba Image */}
          <div className="relative order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden border-2 border-yellow-400/30 animate-pulse-glow">
              <img
                src="https://image.qwenlm.ai/generated-images/e8802867-61cb-42a1-8fc0-e06e50311990/_result.png"
                alt="Garba Night"
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
            {/* Time badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 glossy-card px-6 py-3 animate-heartbeat">
              <span className="text-yellow-400 font-bold text-lg md:text-xl">🕥 10:30 PM Nightly</span>
            </div>
          </div>
        </div>

        {/* Garba time display */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center space-x-4 glossy-card px-8 py-5 animate-border-glow">
            <span className="text-3xl animate-diya">💃</span>
            <span className="text-yellow-400 font-bold text-2xl md:text-4xl animate-clock-tick" style={{ fontFamily: "'Playfair Display', serif" }}>
              10:30 PM
            </span>
            <span className="text-3xl animate-diya" style={{ animationDelay: '1s' }}>🕺</span>
          </div>
          <p className="text-yellow-100/40 mt-4 text-sm">Garba starts after Aarti ceremony every night</p>
        </div>
      </div>
    </section>
  );
}

// ============ SCHEDULE - DAY BY DAY EXPANDING ============
function ScheduleSection() {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [autoExpand, setAutoExpand] = useState(0);

  const schedule = [
    { day: 1, date: '11 Oct', name: 'Pratipada', deity: 'Shailaputri', color: '#FF6B6B', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Goddess who rides a lion, daughter of the mountain' },
    { day: 2, date: '12 Oct', name: 'Dwitiya', deity: 'Brahmacharini', color: '#FFA500', aarti: '7:30 PM', garba: '10:30 PM', desc: 'The ascetic form, penance and devotion' },
    { day: 3, date: '13 Oct', name: 'Tritiya', deity: 'Chandraghanta', color: '#FFD700', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Half-moon shaped like a bell, bestower of grace' },
    { day: 4, date: '14 Oct', name: 'Chaturthi', deity: 'Kushmanda', color: '#4CAF50', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Creator of the universe, source of cosmic energy' },
    { day: 5, date: '15 Oct', name: 'Panchami', deity: 'Skandamata', color: '#00BCD4', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Mother of Lord Kartikeya, bestower of salvation' },
    { day: 6, date: '16 Oct', name: 'Shashthi', deity: 'Katyayani', color: '#3F51B5', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Warrior goddess, destroyer of evil forces' },
    { day: 7, date: '17 Oct', name: 'Saptami', deity: 'Kalaratri', color: '#9C27B0', aarti: '7:30 PM', garba: '10:30 PM', desc: 'The fierce dark night, remover of darkness' },
    { day: 8, date: '18 Oct', name: 'Ashtami', deity: 'Mahagauri', color: '#E91E63', aarti: '7:30 PM', garba: '10:30 PM', desc: 'The extremely white radiant one, Maha Aarti special' },
    { day: 9, date: '19 Oct', name: 'Navami', deity: 'Siddhidatri', color: '#FF5722', aarti: '7:30 PM', garba: '10:30 PM', desc: 'Bestower of all supernatural powers • Final Day' },
  ];

  // Auto-expand one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoExpand(prev => {
        const next = (prev + 1) % schedule.length;
        setExpandedDay(next);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDayClick = useCallback((day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  }, [expandedDay]);

  return (
    <section id="schedule" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#100505] to-[#0d0505]"></div>
      <Particles count={15} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📅 Nine Divine Days 📅
          </h2>
          <p className="text-yellow-100/50 text-lg">11 October – 19 October 2026</p>
          <div className="section-divider mt-4"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-red-500 to-yellow-400 opacity-30"></div>

          {schedule.map((item, i) => (
            <div
              key={i}
              className={`relative mb-4 transition-all duration-700 ease-out ${expandedDay === i ? 'z-10' : 'z-0'}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Timeline dot */}
              <div className={`absolute left-4 md:left-6 top-6 w-5 h-5 rounded-full border-2 transition-all duration-500 ${expandedDay === i ? 'scale-150 border-yellow-400 bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'border-yellow-400/40 bg-transparent'}`}>
                {expandedDay === i && <div className="absolute inset-0 rounded-full bg-yellow-400" style={{ animation: 'ripple 2s ease-out infinite' }}></div>}
              </div>

              {/* Card */}
              <div
                className={`ml-14 md:ml-16 cursor-pointer transition-all duration-700 ease-out ${expandedDay === i ? 'expanded' : 'collapsed'}`}
                onClick={() => handleDayClick(i)}
              >
                <div className={`glossy-card overflow-hidden transition-all duration-500 ${expandedDay === i ? 'border-yellow-400/60 animate-pulse-glow' : ''}`}>
                  {/* Header - always visible */}
                  <div className="p-4 md:p-5 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl md:text-3xl font-black" style={{ color: item.color, fontFamily: "'Playfair Display', serif" }}>
                        {item.day}
                      </span>
                      <div>
                        <h3 className="text-yellow-400 font-bold text-base md:text-lg">{item.name}</h3>
                        <p className="text-yellow-100/50 text-xs">{item.date} • {item.deity}</p>
                      </div>
                    </div>
                    <span className={`text-yellow-400 transition-transform duration-500 text-xl ${expandedDay === i ? 'rotate-180' : ''}`}>▼</span>
                  </div>

                  {/* Expanded content */}
                  {expandedDay === i && (
                    <div className="px-4 md:px-5 pb-5 animate-fadeInUp">
                      <div className="border-t border-yellow-400/10 pt-4 space-y-3">
                        <p className="text-yellow-100/70 text-sm">{item.desc}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-yellow-400/5 rounded-lg p-3 text-center">
                            <span className="text-yellow-400 text-xs block">🪔 Aarti</span>
                            <span className="text-yellow-100 font-bold text-sm">{item.aarti}</span>
                          </div>
                          <div className="bg-yellow-400/5 rounded-lg p-3 text-center">
                            <span className="text-yellow-400 text-xs block">💃 Garba</span>
                            <span className="text-yellow-100 font-bold text-sm">{item.garba}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-yellow-100/40">
                          <span>🍲 Prasad after Aarti</span>
                          <span>•</span>
                          <span>🎵 Live Music</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final day highlight */}
        <div className="mt-10 text-center">
          <div className="glossy-card p-6 inline-block animate-border-glow">
            <p className="text-yellow-400 font-bold text-lg">🎊 19 October - Monday - Vijayadashami 🎊</p>
            <p className="text-yellow-100/50 text-sm mt-1">Grand Visarjan & Celebration Conclusion</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MANTRAS ============
function MantrasSection() {
  const mantras = [
    { sanskrit: "ॐ दुर्गायै नमः", meaning: "Salutations to Goddess Durga" },
    { sanskrit: "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥", meaning: "O Narayani, you are the auspiciousness of all" },
    { sanskrit: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे", meaning: "Navakshari mantra - destroys negativity" },
    { sanskrit: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥", meaning: "To the Goddess who resides as energy in all beings" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(prev => (prev + 1) % mantras.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#150808] to-[#0d0505]"></div>
      <Particles count={15} />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🙏 Sacred Mantras 🙏
          </h2>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="glossy-card p-8 md:p-12 text-center animate-pulse-glow">
          <div className="text-4xl mb-4 animate-diya">🪔</div>
          <p className="text-xl md:text-3xl text-yellow-400 mb-4 leading-relaxed" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            {mantras[active].sanskrit}
          </p>
          <p className="text-yellow-100/60 italic">"{mantras[active].meaning}"</p>
          <div className="flex justify-center mt-6 space-x-2">
            {mantras.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all ${i === active ? 'bg-yellow-400 w-6' : 'bg-yellow-400/30 w-2'}`} />
            ))}
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
                  <p className="text-yellow-100/70 text-sm">Society Community Hall & Open Ground</p>
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
            <div className="glossy-card p-8 w-full text-center animate-pulse-glow">
              <span className="text-6xl block mb-4">🗺️</span>
              <p className="text-yellow-400 font-bold text-lg">Society Pandal</p>
              <p className="text-yellow-100/50 text-sm mt-2">Main Road, Society Complex</p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-golden w-full text-center block">
              📍 Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ TEAM ============
function TeamSection() {
  const team = [
    { name: 'Rajesh Kumar Sharma', role: 'President', emoji: '👑' },
    { name: 'Suresh Patel', role: 'Vice President', emoji: '🌟' },
    { name: 'Amit Joshi', role: 'Secretary', emoji: '📋' },
    { name: 'Vikram Singh', role: 'Treasurer', emoji: '💰' },
    { name: 'Mahesh Gupta', role: 'Event Manager', emoji: '🎪' },
    { name: 'Ramesh Verma', role: 'Decoration Head', emoji: '🎨' },
    { name: 'Deepak Pandya', role: 'Food Committee', emoji: '🍽️' },
    { name: 'Kiran Bhatt', role: 'Cultural Head', emoji: '💃' },
    { name: 'Nitin Shah', role: 'Security Head', emoji: '🛡️' },
    { name: 'Prakash Mehta', role: 'Transport', emoji: '🚗' },
    { name: 'Ganesh Tiwari', role: 'Sound & Light', emoji: '🔊' },
    { name: 'Harsh Desai', role: 'Volunteer Coord.', emoji: '🤝' },
  ];

  return (
    <section id="team" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#0f0505] to-[#0d0505]"></div>
      <Particles count={10} />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            👥 Organizing Committee 👥
          </h2>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <div key={i} className="glossy-card p-4 text-center hover:scale-105 transition-all duration-500 group">
              <div className="text-3xl mb-2 group-hover:animate-heartbeat">{member.emoji}</div>
              <h4 className="text-yellow-400 font-bold text-xs md:text-sm mb-1">{member.name}</h4>
              <p className="text-yellow-100/40 text-xs">{member.role}</p>
            </div>
          ))}
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
        <div className="my-10">
          <p className="text-yellow-100/40 text-sm mb-3 uppercase tracking-widest">Website Designed & Developed by</p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black gradient-text leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Maheriya Nakul
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
          </div>
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
          <PhotoGallery />
          <AartiSection />
          <PrasadSection />
          <GarbaSection />
          <ScheduleSection />
          <MantrasSection />
          <LocationSection />
          <TeamSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
