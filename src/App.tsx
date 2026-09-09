import { X, Phone, Mail, Instagram, MessageCircle, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useTypewriter } from './hooks/useTypewriter';
import { ErrorBoundary } from './components/ErrorBoundary';

const AdvancedMap = lazy(() => import('./components/ui/interactive-map').then(module => ({ default: module.AdvancedMap })));


type ServiceType = 'short' | 'medium' | 'long' | null;

const TypewriterText = ({ text }: { text: string }) => {
  const displayText = useTypewriter(text, 50);
  return <span>{displayText}</span>;
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [expandedService, setExpandedService] = useState<ServiceType>(null);
  const [currentTransformation, setCurrentTransformation] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serviceCardsVisible, setServiceCardsVisible] = useState([false, false, false]);
  const serviceRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [goldLinesVisible, setGoldLinesVisible] = useState([false, false, false, false]);
  const goldLineRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [goldLeavesVisible, setGoldLeavesVisible] = useState([false, false, false, false]);
  const goldLeafRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }

      serviceRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (isVisible && !serviceCardsVisible[index]) {
            setServiceCardsVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        }
      });

      if (contactFormRef.current) {
        const rect = contactFormRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible && !contactFormVisible) {
          setContactFormVisible(true);
        }
      }

      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible && !mapVisible) {
          setMapVisible(true);
        }
      }

      goldLineRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
          if (isVisible && !goldLinesVisible[index]) {
            setGoldLinesVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        }
      });

      goldLeafRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 1.2 && rect.bottom > 0;
          if (isVisible && !goldLeavesVisible[index]) {
            setGoldLeavesVisible(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [serviceCardsVisible, contactFormVisible, mapVisible, goldLinesVisible, goldLeavesVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTransformation(prev => (prev + 1) % 5);
    }, 4300);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    const subject = encodeURIComponent('New Contact Form Submission');
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:ninahairwellness@gmail.com?subject=${subject}&body=${body}`;

    setFormStatus('success');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-cream" style={{ minHeight: '100vh', backgroundColor: '#faf8f6' }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1a1a1a]" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <img
            src="/image.png"
            alt="Nina Hair Wellness - Premium Nanoplasty Treatment Specialist"
            className="h-16 md:h-20 w-auto transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => scrollToSection('home')}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative">
            <button onClick={() => scrollToSection('home')} className="nav-link relative transition-colors duration-300 text-white" aria-label="Navigate to home section">
              Home
              {activeSection === 'home' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"></span>}
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link relative transition-colors duration-300 text-white" aria-label="Navigate to about section">
              About
              {activeSection === 'about' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"></span>}
            </button>
            <button onClick={() => scrollToSection('services')} className="nav-link relative transition-colors duration-300 text-white" aria-label="Navigate to services section">
              Services
              {activeSection === 'services' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"></span>}
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link relative transition-colors duration-300 text-white" aria-label="Navigate to contact section">
              Contact
              {activeSection === 'contact' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"></span>}
            </button>
          </nav>

          {/* Right Side - Book Now Button & Burger Menu */}
          <div className="flex items-center gap-4">
            <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className={`border-2 px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base font-medium tracking-widest transition-all duration-300 inline-block ${
              isScrolled
                ? 'border-gold bg-gold text-black hover:bg-gold/80'
                : 'border-black text-black hover:bg-gold hover:border-gold hover:text-black'
            }`}>
              BOOK NOW
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col items-start gap-2 w-7 group"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} className="text-white" />
              ) : (
                <>
                  <span className="w-full h-[1.5px] transition-all duration-300 group-hover:w-3/4 bg-white"></span>
                  <span className="w-1/2 h-[1.5px] transition-all duration-300 group-hover:w-full bg-white"></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gold/30 shadow-xl bg-[#1a1a1a] text-white">
            <nav className="flex flex-col px-8 py-8 gap-8">
              <div className="flex flex-col gap-4 md:hidden">
                <p className="text-xs uppercase tracking-widest mb-2 text-center text-gray-400">Navigation</p>
                <button onClick={() => scrollToSection('home')} className="text-lg font-light hover:text-gold transition-all duration-300 text-center" aria-label="Navigate to home section">
                  Home
                </button>
                <button onClick={() => scrollToSection('about')} className="text-lg font-light hover:text-gold transition-all duration-300 text-center" aria-label="Navigate to about section">
                  About
                </button>
                <button onClick={() => scrollToSection('services')} className="text-lg font-light hover:text-gold transition-all duration-300 text-center" aria-label="Navigate to services section">
                  Services
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-lg font-light hover:text-gold transition-all duration-300 text-center" aria-label="Navigate to contact section">
                  Contact
                </button>
              </div>

              <div className="border-t border-gold/30 pt-6 md:border-t-0 md:pt-0">
                <p className="text-xs uppercase tracking-widest mb-4 text-center text-gray-400">Follow Us</p>
                <div className="flex gap-8 justify-center">
                  <a href="https://www.instagram.com/ninahairwellnessofficial/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-all duration-300 hover:scale-110" aria-label="Follow us on Instagram">
                    <Instagram size={26} strokeWidth={1.5} />
                  </a>
                </div>
              </div>

              <div className="border-t border-gold/30 pt-6 flex flex-col gap-4">
                <p className="text-xs uppercase tracking-widest mb-2 text-gray-400">Get In Touch</p>
                <a href="tel:0451292291" className="flex items-center gap-4 hover:text-gold transition-all duration-300 group" aria-label="Call us at 0451 292 291">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Phone size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light">0451 292 291</span>
                </a>
                <a href="mailto:ninahairwellness@gmail.com" className="flex items-center gap-4 hover:text-gold transition-all duration-300 group" aria-label="Email us at ninahairwellness@gmail.com">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Mail size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light">ninahairwellness@gmail.com</span>
                </a>
                <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-gold transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <MessageCircle size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm font-light">WhatsApp Chat</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="pt-20" style={{ paddingTop: '5rem' }}>
        {/* Hero Section */}
        <section id="home" className="relative h-[49vh] min-h-[450px] overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="https://www.pexels.com/download/video/4723011/" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Centered Text Content */}
          <div className="relative h-full flex items-center justify-center p-8 pt-16 md:pt-20">
            <div className="text-center text-white max-w-4xl w-full bg-black/50 backdrop-blur-sm px-6 md:px-12 py-8 md:py-10 rounded-2xl animate-fade-in relative">
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 tracking-wide">
                Nanoplasty Treatment Melbourne | Premium Home Service
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 font-light">
                Book Your Hair Wellness Experience
              </p>
              <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-10 py-4 text-lg font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all duration-300 rounded-full inline-block">
                Book Now
              </a>
            </div>
          </div>

          {/* Decorative line */}
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gold/30"></div>
        </section>

        {/* About Section */}
        <section id="about" className="py-8 px-6 bg-[#d4c4b8]">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center justify-start">
              {/* White Card with Content - extends across most of width */}
              <div className="relative bg-white rounded-tl-[120px] md:rounded-tl-[250px] rounded-bl-[50px] rounded-tr-[80px] md:rounded-tr-[100px] rounded-br-[80px] md:rounded-br-[100px] pt-12 pb-8 pl-8 pr-8 md:pl-20 md:pr-12 w-full md:w-[70%] shadow-2xl z-0 overflow-hidden">
                {/* Floral decoration */}
                <img
                  src="/flower.png"
                  alt="Decorative floral accent"
                  className="absolute top-8 right-8 w-44 h-44 md:w-56 md:h-56 opacity-30 pointer-events-none"
                />
                {/* Gold leaves decoration */}
                <img
                  src="/gold leavs.png"
                  alt="Gold leaves decoration"
                  className="absolute bottom-0 left-0 w-28 h-28 md:w-32 md:h-32 opacity-60 pointer-events-none z-0"
                />
                <div className="max-w-xl relative z-10 ml-4 md:ml-12">
                  <h2 className="text-3xl font-playfair mb-3 leading-tight">About Nina Hair Wellness: Premium Nanoplasty Specialist in Melbourne</h2>
                  <p className="text-sm leading-relaxed text-gray-800 mb-2">
                    Nina Hair Wellness Official was created with the purpose of bringing a premium Nanoplasty Home Service experience directly to you with comfort care and exceptional results, all in the convenience of your own home.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-800 mb-2">
                    My work is 100% specialized in Nanoplasty, offering a personalized service from the initial hair assessment to the final finish. I use high-performance professional products and updated techniques to ensure intense shine, perfect alignment, and a real transformation in the health of your hair.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-800 mb-2">
                    <span className="font-semibold">Service Areas:</span><br />
                    Williamstown, Newport, Yarraville, Seddon, Altona, Footscray, Sunshine, Ascot Vale, Melbourne CBD, Southbank, Docklands, Port Melbourne, St Kilda, Carlton, Fitzroy and surrounding suburbs.
                  </p>
                  <p className="text-sm leading-relaxed text-gray-800 mb-2">
                    If your suburb is not listed, please contact us to check availability.
                  </p>

                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${aboutExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm leading-relaxed text-gray-800 mb-2">
                      Before starting the treatment, I perform a complete analysis of your hair structure, chemical history, and personal goals. This guarantees safety, transparency, and results tailored to each hair type, with no risks and maximum quality.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-800 mb-2">
                      My commitment is to take care of you with attention, respect, and excellence. I want you to enjoy a comfortable, professional, and effortless experience whether your goal is to reduce frizz, align the hair, repair damage, or achieve that luxurious shine that boosts your confidence.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-800 mb-2">
                      At Nina Hair Wellness, I believe beautiful hair begins with real and dedicated care.
                    </p>
                    <p className="text-sm leading-relaxed text-gray-800 mb-4">
                      Welcome to transform your hair with Premium Nanoplasty in Melbourne right in your home.
                    </p>
                  </div>

                  {!aboutExpanded && (
                    <button
                      onClick={() => setAboutExpanded(true)}
                      className="text-sm text-black hover:text-gray-700 font-medium mb-4 underline transition-colors"
                    >
                      Read More
                    </button>
                  )}

                  <p className="text-sm leading-relaxed text-gray-800 mb-4">
                    <span className="font-semibold text-black">
                      <TypewriterText text="Shine. Strength. Health. Confidence." />
                    </span>
                  </p>

                  <div className="flex gap-3 relative z-20 flex-wrap">
                    <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-6 py-2.5 md:px-7 rounded-full hover:bg-gray-800 transition-colors text-sm whitespace-nowrap inline-block">
                      Book Now
                    </a>
                    <button onClick={() => scrollToSection('contact')} className="bg-transparent border-2 border-black text-black px-6 py-2.5 md:px-7 rounded-full hover:bg-black hover:text-white transition-colors text-sm whitespace-nowrap">
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              {/* Image box overlapping from the right */}
              <div className="hidden md:block absolute right-0 top-0 w-[40%] h-full shadow-2xl z-10">
                <img
                  src="/IMG_7121.jpg"
                  alt="Nina Hair Wellness - Professional Nanoplasty Results"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Services Section - Nanoplasty */}
        <section id="services" className="bg-[#d4c4b8] py-8 px-6 relative">
          {/* Left Bottom Corner Gold Leaf */}
          <div ref={goldLeafRefs[0]} className={`absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none opacity-30 z-0 transition-transform duration-1000 ease-out origin-bottom-left ${goldLeavesVisible[0] ? 'scale-100' : 'scale-0'}`}>
            <img
              src="/files_5754595-1764678022222-gold leaf 3.png"
              alt="Decorative gold leaf accent"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Bottom Corner Gold Leaf */}
          <div ref={goldLeafRefs[1]} className={`absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none opacity-30 z-0 transition-transform duration-1000 ease-out origin-bottom-right ${goldLeavesVisible[1] ? 'scale-100' : 'scale-0'}`}>
            <img
              src="/files_5754595-1764678022222-gold leaf 3.png"
              alt="Decorative gold leaf accent"
              className="w-full h-full object-contain scale-x-[-1]"
            />
          </div>

          <div className="max-w-7xl mx-auto mb-8">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-center text-black">Professional Nanoplasty Services in Melbourne</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:min-h-[400px] max-w-7xl mx-auto">
            {/* Short Hair */}
            <div
              ref={serviceRefs[0]}
              className={`flex-1 relative group overflow-hidden rounded-t-[60px] transition-all duration-700 hover:scale-105 hover:shadow-2xl min-h-[500px] md:h-auto ${
                serviceCardsVisible[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <img
                src="/Short Hair Service.png"
                alt="Short hair nanoplasty treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Default Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300 ${
                expandedService === 'short' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Short Hair</h3>
                <p className="text-white/90 mb-6 text-lg">
                  Perfect for hair above shoulder length. Full restoration and shine enhancement.
                </p>
                <button
                  onClick={() => setExpandedService('short')}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white border-2 border-white transition-all duration-300 w-full md:w-auto"
                >
                  Learn More
                </button>
              </div>

              {/* Expanded Info Overlay */}
              <div className={`absolute inset-0 bg-[#d4c4b8] p-8 transition-opacity duration-300 flex flex-col justify-between overflow-y-auto ${
                expandedService === 'short' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <img
                  src="/flower.png"
                  alt="Decorative floral accent"
                  className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none"
                />
                <div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-6">Short Hair Nanoplasty</h3>

                  <div className="space-y-4 text-black/90">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-gold">Treatment Details</h4>
                        <p className="leading-relaxed">Our specialized nanoplasty treatment for short hair delivers complete hair restoration and rejuvenation. Perfect for hair above shoulder length, this treatment penetrates deeply to repair damage from the inside out.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-black">$260</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Intense shine and smoothness</li>
                        <li>Frizz elimination</li>
                        <li>Heat damage repair</li>
                        <li>Long-lasting results (3-4 months)</li>
                        <li>Healthier, stronger hair</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Duration & Price</h4>
                      <p className="leading-relaxed">Treatment time: 2-3 hours<br/>Starting from $260</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 text-center">
                    Book Now
                  </a>
                  <button
                    onClick={() => setExpandedService(null)}
                    className="flex-1 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 border-2 border-black transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Medium Hair */}
            <div
              ref={serviceRefs[1]}
              className={`flex-1 relative group overflow-hidden rounded-t-[60px] transition-all duration-700 delay-150 hover:scale-105 hover:shadow-2xl min-h-[500px] md:h-auto ${
                serviceCardsVisible[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <img
                src="/medium_hair service.png"
                alt="Medium hair nanoplasty treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Default Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300 ${
                expandedService === 'medium' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Medium Hair</h3>
                <p className="text-white/90 mb-6 text-lg">
                  For hair between shoulder and mid-back. Complete transformation and repair.
                </p>
                <button
                  onClick={() => setExpandedService('medium')}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white border-2 border-white transition-all duration-300 w-full md:w-auto"
                >
                  Learn More
                </button>
              </div>

              {/* Expanded Info Overlay */}
              <div className={`absolute inset-0 bg-[#d4c4b8] p-8 transition-opacity duration-300 flex flex-col justify-between overflow-y-auto ${
                expandedService === 'medium' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <img
                  src="/flower.png"
                  alt="Decorative floral accent"
                  className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none"
                />
                <div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-6">Medium Hair Nanoplasty</h3>

                  <div className="space-y-4 text-black/90">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-gold">Treatment Details</h4>
                        <p className="leading-relaxed">Designed for medium-length hair between shoulder and mid-back, this comprehensive nanoplasty treatment provides deep repair and transformation. Our advanced formula restores vitality and creates lasting smoothness.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-black">$350</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Complete hair transformation</li>
                        <li>Deep conditioning and repair</li>
                        <li>Enhanced manageability</li>
                        <li>Dramatic shine boost</li>
                        <li>Results last 3-5 months</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Duration & Price</h4>
                      <p className="leading-relaxed">Treatment time: 3-4 hours<br/>Starting from $350</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 text-center">
                    Book Now
                  </a>
                  <button
                    onClick={() => setExpandedService(null)}
                    className="flex-1 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 border-2 border-black transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            {/* Long Hair */}
            <div
              ref={serviceRefs[2]}
              className={`flex-1 relative group overflow-hidden rounded-t-[60px] transition-all duration-700 delay-300 hover:scale-105 hover:shadow-2xl min-h-[500px] md:h-auto ${
                serviceCardsVisible[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <img
                src="/Long Hair Service copy.png"
                alt="Long hair nanoplasty treatment"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Default Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300 ${
                expandedService === 'long' ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}>
                <h3 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Long Hair</h3>
                <p className="text-white/90 mb-6 text-lg">
                  For hair past mid-back. Intensive repair and luxurious smoothness.
                </p>
                <button
                  onClick={() => setExpandedService('long')}
                  className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white border-2 border-white transition-all duration-300 w-full md:w-auto"
                >
                  Learn More
                </button>
              </div>

              {/* Expanded Info Overlay */}
              <div className={`absolute inset-0 bg-[#d4c4b8] p-8 transition-opacity duration-300 flex flex-col justify-between overflow-y-auto ${
                expandedService === 'long' ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}>
                <img
                  src="/flower.png"
                  alt="Decorative floral accent"
                  className="absolute top-4 right-4 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none"
                />
                <div>
                  <h3 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-6">Long Hair Nanoplasty</h3>

                  <div className="space-y-4 text-black/90">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 text-gold">Treatment Details</h4>
                        <p className="leading-relaxed">Our premium nanoplasty treatment for long hair provides intensive repair and luxurious results. Perfect for hair past mid-back, this treatment addresses the unique challenges of longer hair with deep nourishment and restoration.</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-black">$440</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Benefits</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Intensive damage repair</li>
                        <li>Luxurious smoothness and shine</li>
                        <li>Reduced styling time</li>
                        <li>Split end treatment</li>
                        <li>Long-lasting results (4-6 months)</li>
                        <li>Enhanced hair strength</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-lg mb-2 text-gold">Duration & Price</h4>
                      <p className="leading-relaxed">Treatment time: 4-5 hours<br/>Starting from $440</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex-1 bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 text-center">
                    Book Now
                  </a>
                  <button
                    onClick={() => setExpandedService(null)}
                    className="flex-1 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 border-2 border-black transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gold Leaf Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 0.4 }} />
                  <stop offset="25%" style={{ stopColor: '#D4AF37', stopOpacity: 0.7 }} />
                  <stop offset="50%" style={{ stopColor: '#f4e5c2', stopOpacity: 0.5 }} />
                  <stop offset="75%" style={{ stopColor: '#D4AF37', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#d4a574', stopOpacity: 0.4 }} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M0,25 Q120,18 240,22 T480,25 Q600,20 720,24 T960,22 Q1080,18 1200,25 T1440,22 L1440,60 L0,60 Z"
                fill="url(#goldGradient)"
                opacity="0.6"
                filter="url(#glow)"
              />

              <path
                d="M0,35 Q150,28 300,32 T600,34 Q750,30 900,34 T1200,32 Q1350,30 1440,34 L1440,60 L0,60 Z"
                fill="url(#goldGradient)"
                opacity="0.4"
              />
            </svg>
          </div>
        </section>

        {/* Before & After Section */}
        <section className="py-8 md:py-12 px-6 bg-[#c9c4be] relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-16">
              <div ref={goldLineRefs[0]} className={`h-px bg-gold mx-auto mb-6 ${goldLinesVisible[0] ? 'animate-expand-line' : 'w-0'}`}></div>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-black">Nanoplasty Results Melbourne | Real Client Transformations</h2>
              <p className="text-base md:text-lg text-gray-800 max-w-2xl mx-auto leading-relaxed">
                Witness the remarkable journey from damaged to divine.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentTransformation * 100}%)` }}
                >
                  {/* Transformation 1 */}
                  <div className="min-w-full px-2">
                    <div className="grid md:grid-cols-2 gap-1 rounded-t-[80px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white">
                      <div className="relative group overflow-hidden">
                        <img
                          src="/IMG_7100.jpg"
                          alt="Before treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-black/60 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">BEFORE</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-light leading-relaxed">Dry, damaged hair lacking shine and vitality</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden">
                        <img
                          src="/IMG_7121 copy copy.jpg"
                          alt="After treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/40 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-white backdrop-blur-md border-2 border-gold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                            <span className="text-black font-bold tracking-[0.2em] text-xs md:text-sm">AFTER</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow-lg">Luxuriously smooth, radiant hair with natural shine</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation 2 */}
                  <div className="min-w-full px-2">
                    <div className="grid md:grid-cols-2 gap-1 rounded-t-[80px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white">
                      <div className="relative group overflow-hidden">
                        <img
                          src="/image5 copy copy copy copy.jpeg"
                          alt="Before treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-black/60 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">BEFORE</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-light leading-relaxed">Dry, damaged hair lacking shine and vitality</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden">
                        <img
                          src="/image7 copy copy copy.jpeg"
                          alt="After treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/40 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-white backdrop-blur-md border-2 border-gold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                            <span className="text-black font-bold tracking-[0.2em] text-xs md:text-sm">AFTER</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow-lg">Luxuriously smooth, radiant hair with natural shine</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation 3 */}
                  <div className="min-w-full px-2">
                    <div className="grid md:grid-cols-2 gap-1 rounded-t-[80px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white">
                      <div className="relative group overflow-hidden">
                        <img
                          src="/IMG_7624.jpg"
                          alt="Before treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-black/60 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">BEFORE</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-light leading-relaxed">Frizzy, unmanageable hair with split ends</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden">
                        <img
                          src="/IMG_7645.jpg"
                          alt="After treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/40 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-white backdrop-blur-md border-2 border-gold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                            <span className="text-black font-bold tracking-[0.2em] text-xs md:text-sm">AFTER</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow-lg">Silky, healthy hair with vibrant shine and movement</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation 4 */}
                  <div className="min-w-full px-2">
                    <div className="grid md:grid-cols-2 gap-1 rounded-t-[80px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white">
                      <div className="relative group overflow-hidden">
                        <img
                          src="/IMG_7490.jpg"
                          alt="Before treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-black/60 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">BEFORE</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-light leading-relaxed">Dry, damaged hair lacking shine</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden">
                        <img
                          src="/0ac512df-2f06-43d2-8c77-3dc9eb86fe70.jpg"
                          alt="After treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/40 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-white backdrop-blur-md border-2 border-gold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                            <span className="text-black font-bold tracking-[0.2em] text-xs md:text-sm">AFTER</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow-lg">Smooth, lustrous hair with restored health</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Transformation 5 */}
                  <div className="min-w-full px-2">
                    <div className="grid md:grid-cols-2 gap-1 rounded-t-[80px] rounded-b-[40px] overflow-hidden shadow-2xl bg-white">
                      <div className="relative group overflow-hidden">
                        <img
                          src="/image4.jpeg"
                          alt="Before treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-black/60 backdrop-blur-md border-2 border-white/40 px-4 py-1.5 md:px-6 md:py-2 rounded-full">
                            <span className="text-white font-bold tracking-[0.2em] text-xs md:text-sm">BEFORE</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-light leading-relaxed">Dull, lifeless hair needing revitalization</p>
                        </div>
                      </div>
                      <div className="relative group overflow-hidden">
                        <img
                          src="/image2 copy copy.jpeg"
                          alt="After treatment"
                          className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#d4a574]/40 via-transparent to-transparent"></div>
                        <div className="absolute top-4 left-4 md:top-8 md:left-8">
                          <div className="inline-block bg-white backdrop-blur-md border-2 border-gold px-4 py-1.5 md:px-6 md:py-2 rounded-full shadow-lg">
                            <span className="text-black font-bold tracking-[0.2em] text-xs md:text-sm">AFTER</span>
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
                          <p className="text-white text-sm md:text-base font-medium leading-relaxed drop-shadow-lg">Glossy, voluminous hair with stunning depth and color</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentTransformation(prev => Math.max(0, prev - 1))}
                disabled={currentTransformation === 0}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black hover:bg-gold text-white hover:text-black p-3 md:p-4 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 z-10 shadow-xl"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setCurrentTransformation(prev => Math.min(4, prev + 1))}
                disabled={currentTransformation === 4}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black hover:bg-gold text-white hover:text-black p-3 md:p-4 rounded-full disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-300 z-10 shadow-xl"
              >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
              </button>

              {/* Indicator Dots */}
              <div className="flex justify-center gap-3 mt-6 md:mt-12">
                <button
                  onClick={() => setCurrentTransformation(0)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTransformation === 0 ? 'bg-gold w-12' : 'bg-gray-400 w-2'
                  }`}
                  aria-label="View transformation 1"
                />
                <button
                  onClick={() => setCurrentTransformation(1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTransformation === 1 ? 'bg-gold w-12' : 'bg-gray-400 w-2'
                  }`}
                  aria-label="View transformation 2"
                />
                <button
                  onClick={() => setCurrentTransformation(2)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTransformation === 2 ? 'bg-gold w-12' : 'bg-gray-400 w-2'
                  }`}
                  aria-label="View transformation 3"
                />
                <button
                  onClick={() => setCurrentTransformation(3)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTransformation === 3 ? 'bg-gold w-12' : 'bg-gray-400 w-2'
                  }`}
                  aria-label="View transformation 4"
                />
                <button
                  onClick={() => setCurrentTransformation(4)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentTransformation === 4 ? 'bg-gold w-12' : 'bg-gray-400 w-2'
                  }`}
                  aria-label="View transformation 5"
                />
              </div>
            </div>

            <div className="text-center mt-8 md:mt-12">
              <div ref={goldLineRefs[1]} className={`h-px bg-gold mx-auto mb-6 ${goldLinesVisible[1] ? 'animate-expand-line' : 'w-0'}`}></div>
              <p className="text-gray-800 text-base md:text-lg mb-6 md:mb-8 font-light">Ready to experience your own transformation?</p>
              <button onClick={() => scrollToSection('contact')} className="bg-black text-white px-8 md:px-12 py-3 md:py-4 rounded-full hover:bg-gold hover:text-black transition-all duration-300 text-sm md:text-base font-semibold tracking-wide shadow-xl">
                Book Your Consultation
              </button>
            </div>
          </div>
        </section>

        {/* Instagram Section */}
        <section className="pt-8 md:pt-12 pb-12 md:pb-16 px-6 bg-[#c9c4be] relative">
          {/* Left Bottom Corner Gold Leaf */}
          <div ref={goldLeafRefs[2]} className={`absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-30 z-10 transition-transform duration-1000 ease-out origin-bottom-left ${goldLeavesVisible[2] ? 'scale-100' : 'scale-0'}`}>
            <img
              src="/files_5754595-1764678022222-gold leaf 3.png"
              alt="Decorative gold leaf accent"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Right Bottom Corner Gold Leaf */}
          <div ref={goldLeafRefs[3]} className={`absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 pointer-events-none opacity-30 z-10 transition-transform duration-1000 ease-out origin-bottom-right ${goldLeavesVisible[3] ? 'scale-100' : 'scale-0'}`}>
            <img
              src="/files_5754595-1764678022222-gold leaf 3.png"
              alt="Decorative gold leaf accent"
              className="w-full h-full object-contain scale-x-[-1]"
            />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div ref={goldLineRefs[2]} className={`h-px bg-gold mx-auto mb-6 ${goldLinesVisible[2] ? 'animate-expand-line' : 'w-0'}`}></div>
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">As Seen on Instagram</h2>
              <p className="text-xl text-gray-600">Follow our journey and see daily transformations</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { src: '/hair reel 1.png', link: 'https://www.instagram.com/p/DRCPtTUE3MV/' },
                { src: '/hair reel 2.png', link: 'https://www.instagram.com/p/DPGWhlCk5tc/' },
                { src: '/files_5754595-1764678319060-hair reel 3.png', link: 'https://www.instagram.com/p/DP1DBJdE2C2/' },
                { src: '/files_5754595-1764678401870-hair reel 4.png', link: 'https://www.instagram.com/p/DRXCxXpE5us/' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative aspect-[9/16] rounded-lg overflow-hidden group transition-all duration-700 hover:shadow-gold opacity-100 translate-y-0`}
                  style={{
                    transitionDelay: `${idx * 150}ms`,
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <img
                    src={item.src}
                    alt={`Instagram reel ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="bg-white/90 group-hover:bg-white rounded-full p-4 transition-all duration-300">
                      <Play className="text-black fill-black" size={24} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Instagram className="text-white drop-shadow-lg" size={24} />
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-8">
              <a href="https://www.instagram.com/ninahairwellnessofficial/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-semibold hover:text-gold transition-colors">
                <Instagram size={24} />
                Follow @ninahairwellness
              </a>
            </div>
          </div>

          {/* Gold Leaf Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none">
            <svg
              className="absolute bottom-0 w-full h-full"
              viewBox="0 0 1440 60"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="goldGradientReels" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#d4a574', stopOpacity: 0.4 }} />
                  <stop offset="25%" style={{ stopColor: '#D4AF37', stopOpacity: 0.7 }} />
                  <stop offset="50%" style={{ stopColor: '#f4e5c2', stopOpacity: 0.5 }} />
                  <stop offset="75%" style={{ stopColor: '#D4AF37', stopOpacity: 0.7 }} />
                  <stop offset="100%" style={{ stopColor: '#d4a574', stopOpacity: 0.4 }} />
                </linearGradient>
                <filter id="glowReels">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M0,25 Q120,18 240,22 T480,25 Q600,20 720,24 T960,22 Q1080,18 1200,25 T1440,22 L1440,60 L0,60 Z"
                fill="url(#goldGradientReels)"
                opacity="0.6"
                filter="url(#glowReels)"
              />

              <path
                d="M0,35 Q150,28 300,32 T600,34 Q750,30 900,34 T1200,32 Q1350,30 1440,34 L1440,60 L0,60 Z"
                fill="url(#goldGradientReels)"
                opacity="0.4"
              />
            </svg>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-20 px-6 bg-[#d4c4b8]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-px bg-gold w-24 mx-auto mb-6"></div>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4 text-black">Nanoplasty FAQs for Melbourne Clients</h2>
              <p className="text-lg text-gray-800">Everything you need to know about our premium home service</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "What is Nanoplasty treatment?",
                  answer: "Nanoplasty is an advanced hair treatment that uses nanotechnology to restore, align, and add shine to your hair. It repairs damage from within, reducing frizz and creating smooth, healthy-looking hair that lasts for months."
                },
                {
                  question: "Do you provide home service in Melbourne?",
                  answer: "Yes! Nina Hair Wellness specializes in premium home service throughout Melbourne, Melbourne CBD, and surrounding suburbs. Enjoy professional Nanoplasty treatment in the comfort of your own home."
                },
                {
                  question: "How long does Nanoplasty treatment take?",
                  answer: "Treatment time varies by hair length: Short hair takes approximately 2-3 hours, medium hair 3-4 hours, and long hair 4-5 hours. This includes consultation, application, processing, and styling."
                },
                {
                  question: "How long do Nanoplasty results last?",
                  answer: "Results typically last 4-6 months with proper care. You'll enjoy reduced frizz, enhanced shine, and improved hair health throughout this period. Regular touch-ups help maintain optimal results."
                },
                {
                  question: "Is Nanoplasty safe for all hair types?",
                  answer: "Yes! Nanoplasty is suitable for all hair types including color-treated, chemically processed, and natural hair. Before starting, we perform a complete hair analysis to ensure the treatment is customized for your specific needs."
                },
                {
                  question: "What areas around Melbourne do you service?",
                  answer: "We provide home service Nanoplasty to clients in Williamstown, Newport, Yarraville, Seddon, Altona, Footscray, Sunshine, Ascot Vale, Melbourne CBD, Southbank, Docklands, Port Melbourne, St Kilda, Carlton, Fitzroy and surrounding suburbs. Contact us to confirm if we service your area."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-t-[40px] shadow-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full text-left p-6 md:p-8 hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    <h3 className="text-xl font-playfair font-bold text-black pr-4">{faq.question}</h3>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 flex-shrink-0 text-gold ${expandedFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed px-6 md:px-8 pb-6 md:pb-8">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Card Section */}
        <section id="contact" className="py-12 md:py-20 px-6 bg-[#d4c4b8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <div className="w-16 h-px bg-black mx-auto mb-6"></div>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4 text-black">Book Your Nanoplasty Appointment in Melbourne Today</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Contact Form Card */}
              <div
                ref={contactFormRef}
                className={`bg-black rounded-t-[80px] shadow-2xl overflow-hidden transition-all duration-700 relative ${
                  contactFormVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Gold Leaf Bottom Right */}
                <div className="absolute bottom-0 right-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none opacity-20 z-10 transform scale-x-[-1]">
                  <img
                    src="/gold leaf 3.png"
                    alt="Decorative gold leaf accent"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <form onSubmit={handleFormSubmit} className="space-y-3 md:space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-white text-xs md:text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white text-xs md:text-sm font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-white text-xs md:text-sm font-medium mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors"
                        placeholder="0451 292 291"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-white text-xs md:text-sm font-medium mb-1">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 md:px-4 py-2 md:py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-white/40 transition-colors resize-none"
                        placeholder="Tell us about your hair wellness goals..."
                      />
                    </div>

                    {formStatus === 'success' && (
                      <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center text-sm">
                        Thank you! We'll be in touch soon.
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center text-sm">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-white text-black py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>

                  <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/20">
                    <p className="text-white text-xs md:text-sm mb-2 md:mb-3 font-semibold text-center">Or contact us directly</p>
                    <div className="flex flex-col gap-1.5 md:gap-2">
                      <a href="tel:0451292291" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs md:text-sm">
                        <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        0451 292 291
                      </a>
                      <a href="mailto:ninahairwellness@gmail.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs md:text-sm">
                        <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        ninahairwellness@gmail.com
                      </a>
                      <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-xs md:text-sm">
                        <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div
                ref={mapRef}
                className={`bg-white rounded-t-[80px] shadow-2xl overflow-hidden h-full min-h-[400px] md:min-h-[600px] transition-all duration-700 delay-150 ${
                  mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <ErrorBoundary fallback={
                  <div className="flex items-center justify-center h-full bg-cream p-8">
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Map is temporarily unavailable</p>
                      <p className="text-sm text-gray-500">Find us at: Melbourne Road, Melbourne, Melbourne, Victoria</p>
                    </div>
                  </div>
                }>
                  <Suspense fallback={
                    <div className="flex items-center justify-center h-full bg-cream">
                      <div className="text-center">
                        <div className="animate-pulse mb-4">
                          <div className="w-16 h-16 mx-auto border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-gray-600">Loading map...</p>
                      </div>
                    </div>
                  }>
                    <AdvancedMap
                      center={[-37.8630, 144.8990]}
                      zoom={14}
                      markers={[
                        {
                          id: 1,
                          position: [-37.8630, 144.8990],
                          color: 'gold',
                          size: 'large',
                          popup: {
                            title: 'Nina Hair Wellness',
                            content: 'Melbourne Road, Melbourne, Melbourne, Victoria - Premium Hair Care & Nanoplasty Specialist'
                          }
                        }
                      ]}
                      circles={[
                        {
                          id: 1,
                          center: [-37.8630, 144.8990],
                          radius: 1000,
                          style: {
                            color: '#d4a574',
                            fillColor: '#d4a574',
                            fillOpacity: 0.1,
                            weight: 2
                          },
                          popup: 'Service Area'
                        }
                      ]}
                      enableClustering={false}
                      enableSearch={true}
                      enableControls={true}
                      style={{ height: '100%', width: '100%' }}
                      className="map-container"
                    />
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative h-[300px] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1159334/pexels-photo-1159334.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Ready for transformation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center text-white px-6">
              <div ref={goldLineRefs[3]} className={`h-px bg-gold mx-auto mb-4 ${goldLinesVisible[3] ? 'animate-expand-line' : 'w-0'}`}></div>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Ready for Your Transformation?</h2>
              <p className="text-lg mb-6 text-gray-200">Experience the luxury of true hair wellness</p>
              <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-3 text-base font-bold tracking-wider hover:bg-black hover:text-white border-2 border-white transition-all duration-300 rounded-sm inline-block">
                Book Now
              </a>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer className="bg-[#1a1a1a] text-white py-8 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="w-24 h-px bg-white/20 mx-auto mb-6"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Brand Info */}
              <div className="text-center md:text-left">
                <img
                  src="/image.png"
                  alt="Nina Hair Wellness"
                  className="h-16 w-auto mb-3 mx-auto md:mx-0"
                />
                <p className="text-gray-400 mb-2 text-sm">Premium Hair Wellness Studio</p>
                <p className="text-gold mb-3 text-sm font-medium">Certified by Floractive Australia</p>

                <a
                  href="https://edeed.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                >
                  <span>Made by EDEED</span>
                  <img
                    src="/edeed-logo-mobile.png"
                    alt="EDEED Logo"
                    className="w-6 h-6 transition-transform group-hover:scale-110"
                  />
                </a>
              </div>

              {/* Contact Info */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Contact Us</h3>
                <div className="space-y-2">
                  <a href="tel:0451292291" className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Phone size={16} className="text-white" />
                    0451 292 291
                  </a>
                  <a href="mailto:ninahairwellness@gmail.com" className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <Mail size={16} className="text-white" />
                    ninahairwellness@gmail.com
                  </a>
                  <a href="https://wa.me/61451292291" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                    <MessageCircle size={16} className="text-white" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Service Areas & Social */}
              <div className="text-center md:text-left">
                <h3 className="text-xl font-playfair font-bold mb-3 text-gold">Service Areas</h3>
                <p className="text-sm leading-relaxed text-gray-300 mb-4">
                  Williamstown, Newport, Yarraville, Seddon, Altona, Footscray, Sunshine, Ascot Vale, Melbourne CBD, Southbank, Docklands, Port Melbourne, St Kilda, Carlton, Fitzroy and surrounding suburbs
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <a href="https://www.instagram.com/ninahairwellnessofficial/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
