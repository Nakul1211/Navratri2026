import { useState, useEffect, useRef } from 'react';

// ============ PARTICLE COMPONENT ============
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            background: ['#FFD700', '#FF6600', '#DC143C'][Math.floor(Math.random() * 3)],
            animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out ${Math.random() * 2}s infinite`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
}

// ============ OM ANIMATION ============
function OmAnimation() {
  return (
    <div className="relative flex items-center justify-center mb-8">
      <div className="animate-spin-slow absolute w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-dashed border-yellow-400/30"></div>
      <div className="animate-spin-slow absolute w-52 h-52 md:w-72 md:h-72 rounded-full border border-red-500/20" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>
      <div className="text-6xl md:text-8xl font-bold animate-glow text-yellow-400" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
        ॐ
      </div>
    </div>
  );
}

// ============ INTRO SCREEN ============
function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);
    const t2 = setTimeout(() => setPhase(2), 2000);
    const t3 = setTimeout(() => setPhase(3), 3500);
    const t4 = setTimeout(() => onComplete(), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0a0a] via-[#2d0a0a] to-[#1a0a0a]">
      <Particles />
      {phase >= 0 && (
        <div className="animate-fadeInUp text-center">
          <OmAnimation />
        </div>
      )}
      {phase >= 1 && (
        <div className="animate-fadeInUp text-center mt-4" style={{ animationDelay: '0.3s' }}>
          <p className="text-yellow-400 text-lg md:text-2xl animate-glow" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            || श्री दुर्गायै नमः ||
          </p>
        </div>
      )}
      {phase >= 2 && (
        <div className="animate-fadeInUp text-center mt-6" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl md:text-4xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            जय माता दी
          </h2>
          <p className="text-yellow-300/70 mt-2 text-sm md:text-base">Welcome to Navratri 2026</p>
        </div>
      )}
      {phase >= 3 && (
        <div className="animate-fadeInUp mt-8">
          <div className="flex space-x-2">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-3 h-3 rounded-full bg-yellow-400 animate-diya" style={{ animationDelay: `${i * 0.3}s` }}></div>
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

  const links = ['Home', 'Gallery', 'Mantras', 'Schedule', 'Location', 'Team'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glossy-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl md:text-3xl">🙏</span>
          <span className="text-lg md:text-xl font-bold gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
            Navratri 2026
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-yellow-100/80 hover:text-yellow-400 transition-all duration-300 text-sm font-medium relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-yellow-400 text-2xl" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glossy-nav mt-2 mx-4 rounded-2xl p-4 animate-scaleIn">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block py-3 text-yellow-100/80 hover:text-yellow-400 transition-all border-b border-yellow-400/10 text-center"
              onClick={() => setMobileOpen(false)}
            >
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#2d0a0a] to-[#1a0a0a]"></div>
      
      {/* Decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-yellow-400/10 animate-spin-slow"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] rounded-full border border-red-500/10 animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
      
      <Particles />

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Om Symbol */}
        <div className="mb-6 animate-float">
          <span className="text-7xl md:text-9xl text-yellow-400 animate-glow" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            ॐ
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-4 animate-fadeInUp" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="gradient-text">Navratri</span>
          <br />
          <span className="text-yellow-400 animate-glow">2026</span>
        </h1>

        {/* Slogan */}
        <p className="text-xl md:text-3xl text-yellow-300/90 mb-4 animate-fadeInUp" style={{ animationDelay: '0.3s', fontFamily: "'Tiro Devanagari Hindi', serif" }}>
          || सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ||
        </p>
        
        <p className="text-sm md:text-lg text-yellow-100/60 mb-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          Grand Celebration of Maa Durga at Our Society
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <a href="#gallery" className="btn-golden">
            🎉 Explore Gallery
          </a>
          <a href="#location" className="btn-outline-gold">
            📍 Visit Us
          </a>
        </div>

        {/* Decorative diyas */}
        <div className="flex justify-center mt-12 space-x-8">
          {['🪔', '🪔', '🪔', '🪔', '🪔'].map((d, i) => (
            <span key={i} className="text-2xl md:text-3xl animate-diya" style={{ animationDelay: `${i * 0.4}s` }}>{d}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

// ============ PHOTO GALLERY ============
function PhotoGallery() {
  const galleryImages = [
    { src: 'https://image.qwenlm.ai/generated-images/2f5e7865-1671-4ee0-a5f8-1de39a833ec8/_result.png', title: 'Maa Durga Idol', desc: 'Divine decoration of Goddess Durga' },
    { src: 'https://image.qwenlm.ai/generated-images/2018a6b2-5626-4560-9853-5f5541c3228c/_result.png', title: 'Garba Night', desc: 'Traditional Garba & Dandiya Raas' },
    { src: 'https://image.qwenlm.ai/generated-images/6384b773-e2d2-4f00-9682-26553db19418/_result.png', title: 'Pandal Decoration', desc: 'Magnificent pandal setup' },
    { src: 'https://image.qwenlm.ai/generated-images/a2ac7a29-f91d-4d12-ba46-dedf7b754d91/_result.png', title: 'Grand Aarti', desc: 'Sacred Aarti ceremony' },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#200808] to-[#1a0a0a]"></div>
      <Particles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            ✨ Photo Gallery ✨
          </h2>
          <p className="text-yellow-100/60 text-lg">Capturing the divine moments of Navratri</p>
          <div className="section-divider mt-4"></div>
        </div>

        {/* Main Featured Image */}
        <div className="relative mb-12">
          <div className="relative rounded-3xl overflow-hidden animate-border-glow border-2 animate-pulse-glow">
            <img
              src={galleryImages[activeIndex].src}
              alt={galleryImages[activeIndex].title}
              className="w-full h-[300px] md:h-[500px] object-cover transition-all duration-1000"
              style={{ animation: 'scaleIn 0.8s ease-out' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                {galleryImages[activeIndex].title}
              </h3>
              <p className="text-yellow-100/70 text-sm md:text-lg">{galleryImages[activeIndex].desc}</p>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-yellow-400 w-8' : 'bg-yellow-400/30'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Thumbnail Grid with 3D effect */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`photo-card-3d cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-500 ${i === activeIndex ? 'border-yellow-400 scale-105' : 'border-yellow-400/20 opacity-70 hover:opacity-100'}`}
              onClick={() => setActiveIndex(i)}
            >
              <img src={img.src} alt={img.title} className="w-full h-32 md:h-40 object-cover" />
              <div className="p-2 bg-gradient-to-r from-[#8B0000]/90 to-[#1a0a0a]/90">
                <p className="text-yellow-400 text-xs md:text-sm font-medium truncate">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-scrolling strip */}
        <div className="mt-16 overflow-hidden">
          <div className="flex space-x-4 auto-scroll" style={{ width: 'max-content' }}>
            {[...galleryImages, ...galleryImages].map((img, i) => (
              <div key={i} className="w-48 md:w-64 h-32 md:h-40 rounded-xl overflow-hidden flex-shrink-0 border border-yellow-400/20">
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ MANTRAS SECTION ============
function MantrasSection() {
  const mantras = [
    {
      sanskrit: "ॐ दुर्गायै नमः",
      meaning: "Salutations to Goddess Durga",
      benefit: "Chanting this removes all obstacles and brings divine protection"
    },
    {
      sanskrit: "ॐ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥",
      meaning: "O Narayani, you are the auspiciousness of all that is auspicious",
      benefit: "This powerful mantra brings peace, prosperity and removes all fears"
    },
    {
      sanskrit: "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।",
      meaning: "May all beings be happy, may all beings be free from illness",
      benefit: "Universal prayer for well-being of all"
    },
    {
      sanskrit: "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
      meaning: "Salutations to Goddess Chamunda",
      benefit: "This Navakshari mantra destroys negativity and bestows power"
    },
    {
      sanskrit: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
      meaning: "To the Goddess who resides in all beings as energy, I bow again and again",
      benefit: "Acknowledges the divine feminine energy in all creation"
    },
    {
      sanskrit: "ॐ लक्ष्म्यै नमः",
      meaning: "Salutations to Goddess Lakshmi",
      benefit: "Brings wealth, fortune and abundance"
    }
  ];

  const [activeMantra, setActiveMantra] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMantra(prev => (prev + 1) % mantras.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="mantras" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#2a0505] to-[#1a0a0a]"></div>
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🙏 Sacred Mantras & Shlokas 🙏
          </h2>
          <p className="text-yellow-100/60 text-lg">Divine chants for spiritual awakening</p>
          <div className="section-divider mt-4"></div>
        </div>

        {/* Featured Mantra Display */}
        <div className="glossy-card p-8 md:p-12 mb-12 text-center animate-pulse-glow">
          <div className="text-5xl mb-4 animate-diya">🪔</div>
          <p className="text-2xl md:text-4xl text-yellow-400 mb-6 leading-relaxed" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
            {mantras[activeMantra].sanskrit}
          </p>
          <p className="text-lg md:text-xl text-yellow-100/80 mb-4 italic">
            "{mantras[activeMantra].meaning}"
          </p>
          <p className="text-sm md:text-base text-yellow-300/60">
            ✨ {mantras[activeMantra].benefit}
          </p>
          
          <div className="flex justify-center mt-6 space-x-2">
            {mantras.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveMantra(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeMantra ? 'bg-yellow-400 w-6' : 'bg-yellow-400/30'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* All Mantras Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mantras.map((mantra, i) => (
            <div
              key={i}
              className={`glossy-card p-6 transition-all duration-500 hover:scale-105 cursor-pointer ${i === activeMantra ? 'border-yellow-400 scale-105' : ''}`}
              onClick={() => setActiveMantra(i)}
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl animate-diya" style={{ animationDelay: `${i * 0.3}s` }}>🪔</span>
                <div>
                  <p className="text-yellow-400 text-lg mb-2" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                    {mantra.sanskrit}
                  </p>
                  <p className="text-yellow-100/60 text-sm">{mantra.meaning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SCHEDULE SECTION ============
function ScheduleSection() {
  const schedule = [
    { day: 'Day 1', date: '22 Sep 2026', name: 'Pratipada', deity: 'Shailaputri', color: 'from-red-900 to-red-700' },
    { day: 'Day 2', date: '23 Sep 2026', name: 'Dwitiya', deity: 'Brahmacharini', color: 'from-orange-900 to-orange-700' },
    { day: 'Day 3', date: '24 Sep 2026', name: 'Tritiya', deity: 'Chandraghanta', color: 'from-yellow-900 to-yellow-700' },
    { day: 'Day 4', date: '25 Sep 2026', name: 'Chaturthi', deity: 'Kushmanda', color: 'from-green-900 to-green-700' },
    { day: 'Day 5', date: '26 Sep 2026', name: 'Panchami', deity: 'Skandamata', color: 'from-teal-900 to-teal-700' },
    { day: 'Day 6', date: '27 Sep 2026', name: 'Shashthi', deity: 'Katyayani', color: 'from-blue-900 to-blue-700' },
    { day: 'Day 7', date: '28 Sep 2026', name: 'Saptami', deity: 'Kalaratri', color: 'from-indigo-900 to-indigo-700' },
    { day: 'Day 8', date: '29 Sep 2026', name: 'Ashtami', deity: 'Mahagauri', color: 'from-purple-900 to-purple-700' },
    { day: 'Day 9', date: '30 Sep 2026', name: 'Navami', deity: 'Siddhidatri', color: 'from-pink-900 to-pink-700' },
  ];

  return (
    <section id="schedule" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#1a0505] to-[#1a0a0a]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📅 Navratri Schedule 📅
          </h2>
          <p className="text-yellow-100/60 text-lg">Nine nights of divine celebration</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {schedule.map((item, i) => (
            <div
              key={i}
              className="glossy-card p-5 hover:scale-105 transition-all duration-500 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-20 rounded-[20px] group-hover:opacity-30 transition-opacity`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-yellow-400 font-bold text-sm">{item.day}</span>
                  <span className="text-yellow-100/50 text-xs">{item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mb-1" style={{ fontFamily: "'Tiro Devanagari Hindi', serif" }}>
                  {item.name}
                </h3>
                <p className="text-yellow-100/70 text-sm">Goddess: {item.deity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Events Timeline */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-yellow-400 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Daily Events
          </h3>
          <div className="space-y-4">
            {[
              { time: '5:00 AM', event: 'Mangala Aarti', icon: '🌅' },
              { time: '7:00 AM', event: 'Abhishek & Shringar', icon: '🪷' },
              { time: '11:00 AM', event: 'Madhyanh Aarti & Bhog', icon: '🍲' },
              { time: '5:00 PM', event: 'Sandhya Aarti', icon: '🪔' },
              { time: '7:00 PM', event: 'Garba & Dandiya Raas', icon: '💃' },
              { time: '10:00 PM', event: 'Shayan Aarti', icon: '🌙' },
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 glossy-card p-4 hover:scale-[1.02] transition-all">
                <span className="text-2xl md:text-3xl">{item.icon}</span>
                <div>
                  <span className="text-yellow-400 font-bold text-sm">{item.time}</span>
                  <p className="text-yellow-100/80">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ LOCATION SECTION ============
function LocationSection() {
  return (
    <section id="location" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#200808] to-[#1a0a0a]"></div>
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            📍 Visit Us 📍
          </h2>
          <p className="text-yellow-100/60 text-lg">Join us for the divine celebration</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Map Placeholder */}
          <div className="glossy-card p-2 animate-pulse-glow">
            <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] bg-gradient-to-br from-[#2d1a1a] to-[#1a0a0a] flex items-center justify-center relative">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🗺️</span>
                <p className="text-yellow-400 text-lg font-bold">Society Pandal Location</p>
                <p className="text-yellow-100/50 text-sm mt-2">Interactive Map</p>
              </div>
              {/* Decorative map elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-400/30 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 border border-red-400/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="space-y-6">
            <div className="glossy-card p-6">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🏛️</span>
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Venue</h3>
                  <p className="text-yellow-100/80">Society Community Hall & Open Ground</p>
                  <p className="text-yellow-100/60 text-sm">Main Road, Society Complex</p>
                </div>
              </div>
            </div>

            <div className="glossy-card p-6">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">📅</span>
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Dates</h3>
                  <p className="text-yellow-100/80">22 September - 1 October 2026</p>
                  <p className="text-yellow-100/60 text-sm">9 Days of Grand Celebration</p>
                </div>
              </div>
            </div>

            <div className="glossy-card p-6">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">📞</span>
                <div>
                  <h3 className="text-yellow-400 font-bold text-lg mb-1">Contact</h3>
                  <p className="text-yellow-100/80">For queries & participation</p>
                  <p className="text-yellow-100/60 text-sm">Contact organizing committee</p>
                </div>
              </div>
            </div>

            {/* Location Button */}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-golden w-full text-center block"
            >
              📍 Get Directions - Navigate to Venue
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ TEAM SECTION ============
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
    { name: 'Prakash Mehta', role: 'Transport Head', emoji: '🚗' },
    { name: 'Ganesh Tiwari', role: 'Sound & Light', emoji: '🔊' },
    { name: 'Harsh Desai', role: 'Volunteer Coordinator', emoji: '🤝' },
  ];

  return (
    <section id="team" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#2a0505] to-[#1a0a0a]"></div>
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            👥 Organizing Committee 👥
          </h2>
          <p className="text-yellow-100/60 text-lg">The dedicated team behind this grand celebration</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <div
              key={i}
              className="glossy-card p-5 text-center hover:scale-105 transition-all duration-500 group"
            >
              <div className="text-4xl mb-3 group-hover:animate-diya">{member.emoji}</div>
              <h4 className="text-yellow-400 font-bold text-sm md:text-base mb-1">{member.name}</h4>
              <p className="text-yellow-100/50 text-xs md:text-sm">{member.role}</p>
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
    <footer className="relative py-12 border-t border-yellow-400/20">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] to-[#0d0505]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Decorative */}
        <div className="flex justify-center space-x-4 mb-6">
          {['🪔', '🌺', '🙏', '🌺', '🪔'].map((item, i) => (
            <span key={i} className="text-2xl animate-diya" style={{ animationDelay: `${i * 0.3}s` }}>{item}</span>
          ))}
        </div>

        <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Jai Mata Di 🙏
        </h3>
        
        <p className="text-yellow-100/60 mb-2">May Maa Durga bless everyone with strength, wisdom, and prosperity</p>
        
        <div className="section-divider my-8"></div>

        <p className="text-yellow-400/80 text-sm mb-2">
          Navratri 2026 Grand Celebration | Society Durga Puja Committee
        </p>
        
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-400/5 to-red-400/5 border border-yellow-400/10">
          <p className="text-yellow-100/50 text-xs md:text-sm">
            🌟 Website Designed & Developed by <span className="text-yellow-400 font-bold">Maheriya Nakul</span> 🌟
          </p>
          <p className="text-yellow-100/30 text-xs mt-1">
            © 2026 All Rights Reserved | Premium Navratri Celebration Website
          </p>
        </div>

        <div className="mt-6 flex justify-center space-x-6">
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors">
            <i className="fab fa-facebook text-xl"></i>
          </span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors">
            <i className="fab fa-instagram text-xl"></i>
          </span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors">
            <i className="fab fa-whatsapp text-xl"></i>
          </span>
          <span className="text-yellow-400/40 hover:text-yellow-400 cursor-pointer transition-colors">
            <i className="fab fa-youtube text-xl"></i>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ============ MARQUEE BANNER ============
function MarqueeBanner() {
  return (
    <div className="bg-gradient-to-r from-red-900 via-yellow-900 to-red-900 py-3 overflow-hidden border-y border-yellow-400/20">
      <div className="whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
        <span className="text-yellow-400 text-sm md:text-base mx-8">🙏 जय माता दी 🙏</span>
        <span className="text-yellow-300 text-sm md:text-base mx-8">✨ Navratri 2026 - Grand Celebration ✨</span>
        <span className="text-yellow-400 text-sm md:text-base mx-8">🪔 22 Sep - 1 Oct 2026 🪔</span>
        <span className="text-yellow-300 text-sm md:text-base mx-8">💃 Garba & Dandiya Every Night 💃</span>
        <span className="text-yellow-400 text-sm md:text-base mx-8">🌺 Everyone is Welcome 🌺</span>
        <span className="text-yellow-300 text-sm md:text-base mx-8">🙏 जय माता दी 🙏</span>
        <span className="text-yellow-400 text-sm md:text-base mx-8">✨ Navratri 2026 - Grand Celebration ✨</span>
      </div>
    </div>
  );
}

// ============ SPECIAL FEATURES ============
function SpecialFeatures() {
  const features = [
    { icon: '🎪', title: 'Grand Pandal', desc: 'Magnificent themed pandal with stunning decorations' },
    { icon: '💃', title: 'Garba Nights', desc: '9 nights of traditional Garba & Dandiya Raas' },
    { icon: '🍲', title: 'Prasad & Food', desc: 'Delicious bhog and annakshetra for all devotees' },
    { icon: '🎵', title: 'Live Music', desc: 'Traditional folk music and live orchestra' },
    { icon: '🎆', title: 'Cultural Programs', desc: 'Rasleela, dance performances & competitions' },
    { icon: '🪔', title: 'Daily Aarti', desc: 'Sacred aarti ceremonies with divine chants' },
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a0a] via-[#1a0808] to-[#1a0a0a]"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            🌟 Special Highlights 🌟
          </h2>
          <p className="text-yellow-100/60 text-lg">What makes our Navratri celebration special</p>
          <div className="section-divider mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glossy-card p-6 text-center hover:scale-105 transition-all duration-500 group animate-3d"
              style={{ animationDelay: `${i * 1}s` }}
            >
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">{feature.icon}</div>
              <h3 className="text-yellow-400 font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-yellow-100/60 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ COUNTDOWN ============
function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-09-22T00:00:00').getTime();
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

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-yellow-900/20 to-red-900/20"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          ⏰ Countdown to Navratri 2026 ⏰
        </h2>
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {[
            { value: timeLeft.days, label: 'Days' },
            { value: timeLeft.hours, label: 'Hours' },
            { value: timeLeft.minutes, label: 'Minutes' },
            { value: timeLeft.seconds, label: 'Seconds' },
          ].map((item, i) => (
            <div key={i} className="glossy-card p-4 md:p-6 animate-pulse-glow">
              <div className="text-3xl md:text-5xl font-black text-yellow-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                {item.value}
              </div>
              <div className="text-yellow-100/50 text-xs md:text-sm mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ MAIN APP ============
function App() {
  const [showIntro, setShowIntro] = useState(true);
  const introRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div ref={introRef} className="min-h-screen bg-[#1a0a0a]">
      {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      
      {!showIntro && (
        <>
          <Navbar />
          <HeroSection />
          <MarqueeBanner />
          <Countdown />
          <SpecialFeatures />
          <PhotoGallery />
          <MantrasSection />
          <ScheduleSection />
          <LocationSection />
          <TeamSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
