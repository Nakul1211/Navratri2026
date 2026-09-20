import { useState, useEffect } from 'react';

// ============ INTRO ============
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
      <div className="text-center animate-fadeIn">
        <div className="text-8xl md:text-9xl mb-6 animate-glow" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D4AF37' }}>
          ॐ
        </div>
        <p className="text-xl md:text-2xl text-[#D4AF37]/80 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          जय माता दी
        </p>
      </div>
    </div>
  );
}

// ============ NAVBAR ============
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-light tracking-wider gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Navratri 2026
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'Gallery', 'Schedule', 'Location'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-[#F5F5DC]/70 hover:text-[#D4AF37] transition-colors duration-300 tracking-wide">
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ============ HERO ============
function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a0a] to-[#0a0a0a]"></div>
      
      {/* Subtle rotating circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#D4AF37]/5 animate-rotate"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-8 animate-float">
          <span className="text-7xl md:text-9xl animate-glow" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#D4AF37' }}>ॐ</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 animate-fadeInUp" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          <span className="gradient-text">Navratri</span>
          <br />
          <span className="text-[#D4AF37]">2026</span>
        </h1>

        <p className="text-lg md:text-xl text-[#F5F5DC]/60 mb-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          11 October – 19 October
        </p>

        <p className="text-base text-[#F5F5DC]/40 mb-12 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          Nine Nights of Divine Celebration
        </p>

        <div className="animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <a href="#gallery" className="btn-premium">
            Explore
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY ============
function GallerySection() {
  const images = [
    { src: 'https://image.qwenlm.ai/generated-images/abe6f77a-991c-4a9e-8c69-4bd6f9760569/_result.png', title: 'Divine Idol' },
    { src: 'https://image.qwenlm.ai/generated-images/b9013c41-a6d7-43d4-ad3b-e0398d728a13/_result.png', title: 'Sacred Aarti' },
    { src: 'https://image.qwenlm.ai/generated-images/e8802867-61cb-42a1-8fc0-e06e50311990/_result.png', title: 'Garba Night' },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(prev => (prev + 1) % images.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0505] to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4 gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Gallery
          </h2>
          <div className="divider"></div>
        </div>

        <div className="relative">
          <div className="glass rounded-2xl overflow-hidden animate-scaleIn" key={active}>
            <img
              src={images[active].src}
              alt={images[active].title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-2xl md:text-3xl font-light text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {images[active].title}
              </h3>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'bg-[#D4AF37] w-12' : 'bg-[#D4AF37]/30 w-6'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ SCHEDULE ============
function ScheduleSection() {
  const schedule = [
    { day: 'Day 1', date: '11 Oct', deity: 'Shailaputri' },
    { day: 'Day 2', date: '12 Oct', deity: 'Brahmacharini' },
    { day: 'Day 3', date: '13 Oct', deity: 'Chandraghanta' },
    { day: 'Day 4', date: '14 Oct', deity: 'Kushmanda' },
    { day: 'Day 5', date: '15 Oct', deity: 'Skandamata' },
    { day: 'Day 6', date: '16 Oct', deity: 'Katyayani' },
    { day: 'Day 7', date: '17 Oct', deity: 'Kalaratri' },
    { day: 'Day 8', date: '18 Oct', deity: 'Mahagauri' },
    { day: 'Day 9', date: '19 Oct', deity: 'Siddhidatri' },
  ];

  return (
    <section id="schedule" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0505] to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4 gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Nine Divine Days
          </h2>
          <div className="divider"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {schedule.map((item, i) => (
            <div key={i} className="card-premium text-center animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-[#D4AF37] text-sm mb-2 tracking-wider">{item.day}</div>
              <div className="text-[#F5F5DC]/60 text-xs mb-3">{item.date}</div>
              <div className="text-lg font-light text-[#D4AF37]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {item.deity}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="card-premium inline-block">
            <p className="text-[#D4AF37] text-lg mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Daily Schedule
            </p>
            <p className="text-[#F5F5DC]/60 text-sm">
              Aarti: 7:30 PM • Garba: 10:30 PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ LOCATION ============
function LocationSection() {
  return (
    <section id="location" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0505] to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4 gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Visit Us
          </h2>
          <div className="divider"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-premium">
            <h3 className="text-[#D4AF37] text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Venue
            </h3>
            <p className="text-[#F5F5DC]/70 text-sm leading-relaxed">
              Society Community Hall
              <br />
              Main Road, Society Complex
            </p>
          </div>

          <div className="card-premium">
            <h3 className="text-[#D4AF37] text-xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Dates
            </h3>
            <p className="text-[#F5F5DC]/70 text-sm leading-relaxed">
              11 October – 19 October 2026
              <br />
              Nine Nights of Celebration
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-premium">
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

// ============ ORGANIZERS ============
function OrganizersSection() {
  const organizers = [
    'હસમુખભાઈ', 'નકુલ', 'વિનોદ', 'વિકાસ', 'રાહુલ', 'કરણ',
    'હાર્દિક', 'ધમો', 'ભીખાભાઈ', 'રાજુભાઈ', 'વિકી', 'દલપતભાઈ',
    'જયેશ', 'ઉમેશ'
  ];

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0d0505] to-[#0a0a0a]"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-light mb-4 gradient-text" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Organizing Committee
          </h2>
          <div className="divider"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {organizers.map((name, i) => (
            <div key={i} className="card-premium text-center py-6 animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <p className="text-[#D4AF37] text-sm font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="py-20 border-t border-[#D4AF37]/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <p className="text-[#F5F5DC]/40 text-sm mb-4 tracking-wider">
            Designed & Developed by
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light gradient-text animate-glow" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Maheriya Nakul
          </h2>
        </div>

        <div className="divider mb-8"></div>

        <p className="text-[#F5F5DC]/30 text-xs">
          © 2026 All Rights Reserved
        </p>
      </div>
    </footer>
  );
}

// ============ APP ============
function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      
      {!showIntro && (
        <>
          <Navbar />
          <HeroSection />
          <GallerySection />
          <ScheduleSection />
          <LocationSection />
          <OrganizersSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
