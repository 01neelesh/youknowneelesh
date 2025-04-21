import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Download, Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsPraying, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import WaveBackground from './components/WaveBackground.js';
import HoverCard from './components/HoverCard.js';
import ExpandableCard from './components/ExapndableCard.jsx';
import ContactSection from './components/ContactSection.js';
import Section from './components/Section.js';
import SocialBadge from './components/SocialBadges.js';
import './styles/index.css';
import profilePic from './assets/profilevideo-unscreen.gif';
import AboutProjects from './components/ProjectSection.js';

// navbar 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" }
  ];

  const navbarVariants = {
    top: {
      backgroundColor: "rgba(17, 24, 39, 0.5)",
      backdropFilter: "blur(8px)",
      boxShadow: "none",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
    },
    scrolled: {
      backgroundColor: "rgba(17, 24, 39, 0.85)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
    }
  };

  const linkVariants = {
    hover: {
      color: "#f97316",
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      pointerEvents: "none",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 px-4 py-3 transition-all duration-300"
      variants={navbarVariants}
      animate={scrolled ? "scrolled" : "top"}
      initial="top"
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="relative z-10 group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                Neelesh
              </span>
            </span>
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 group-hover:w-full transition-all duration-300"
              layoutId="underline"
            />
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex space-x-1 mr-2">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="relative px-4 py-2 text-gray-300 font-medium rounded-md text-sm hover:text-orange-500 transition-colors"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500 origin-left scale-x-0 transition-transform duration-300 ease-out"
                    whileHover={{ scaleX: 1 }}
                  />
                </motion.a>
              ))}
            </div>
            <motion.a
              href="https://drive.google.com/uc?export=download&id=1hK_EwH_X6-K5I7rr7K1B8U35Q6C6221j"
              download="Neelesh_Chaturvedi_Resume.pdf"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              <span>Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-10 p-2 rounded-full bg-gray-800/80 text-gray-300 hover:text-orange-500 hover:bg-gray-700/80 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="absolute top-full left-0 right-0 md:hidden mt-2 mx-4 bg-gray-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700/50 overflow-hidden"
          variants={mobileMenuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <div className="flex flex-col py-3">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="px-6 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-700/40 transition-colors"
                variants={mobileItemVariants}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.div 
              className="px-5 pt-3 pb-4"
              variants={mobileItemVariants}
            >
              <motion.a
                href="https://drive.google.com/uc?export=download&id=1hK_EwH_X6-K5I7rr7K1B8U35Q6C6221j"
                download="Neelesh_Chaturvedi_Resume.pdf"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 transition-all shadow-md"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={16} />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};


const App = () => {
  const [currentLearning, setCurrentLearning] = useState('Jetpack Compose');
  const [futureGoals] = useState(['KMP', 'System Design']);
  const { scrollYProgress } = useScroll();
  const travelerX = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  const greetings = [
    "Hello", "नमस्ते", "வணக்கம்", "నమస్కారం", "ನಮಸ್ಕಾರ",
    "നമസ്കാരം", "নমস্কার", "નમસ્તે", "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ", "ନମସ୍କାର", "नमस्कार",
  ];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [greetings.length]);

  const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return { isMobile: width < 768, isTablet: width >= 768 && width < 1024 };
  };

  const { isMobile } = useViewport();

  const [expandedCard, setExpandedCard] = useState(null); // 🔥 Shared state for both cards

  return (
    <div className="app min-h-screen">
      <Navbar />
      <WaveBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 z-[-5]" />

      <motion.div
        className="fixed bottom-8 left-0 h-8 w-8 sm:h-12 sm:w-12 text-orange-500 opacity-50 z-20"
        style={{ x: travelerX }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full h-full bg-orange-500 rounded-full shadow-lg animate-pulse" />
      </motion.div>

      <div className="content">
        <Section className="min-h-screen flex items-center justify-center">
          <motion.div className="text-center space-y-8 p-4 sm:p-6 lg:p-8">
            <motion.div
              className="text-3xl sm:text-4xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                key={greetings[currentGreetingIndex]}
                className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {greetings[currentGreetingIndex]}
              </motion.span>
              <FontAwesomeIcon icon={faHandsPraying} className="ml-2 text-orange-500 to-pink-500" />
            </motion.div>

            <motion.div
              className="relative w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 mx-auto rounded-full overflow-hidden"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-black-500 animate-pulse" style={{ filter: 'blur(10px)', transform: 'scale(1.1)' }} />
              <img
                src={profilePic}
                alt="Neelesh Chaturvedi"
                className="relative w-full h-full object-cover border-transparent"
                loading="lazy"
              />
            </motion.div>

            <p className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed bg-gray-800/50 p-6 rounded-xl">
              Myself Neelesh, a coder by day, a market analyst by passion, and a poet by soul.
              Life is a cycle, much like the stock market, with its ups and downs. I find joy in decoding its patterns through code, charts, and verses.
            </p>
          </motion.div>
        </Section>

        <Section id="projects">
          <AboutProjects />
        </Section>

        <Section id="skills">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Developing Knowledgebase
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 items-stretch">
            <ExpandableCard
              isExpanded={expandedCard === 'dev'}
              onHover={() => setExpandedCard('dev')}
              onLeave={() => setExpandedCard(null)}
            />
            
            <HoverCard
              icon={<TrendingUp size={24} />}
              title="Research & Analysis"
              description="Post-pandemic market learning focused on VCP (Minervini), day trading (Gajjala), and technical analysis. Strong fundamentals guide my practice."
              isExpanded={expandedCard === 'analysis'}
              onHover={() => setExpandedCard('analysis')}
              onLeave={() => setExpandedCard(null)}
              categories={[
                {
                  name: 'Market Accuracy',
                  links: [
                    {
                      label: 'Check My Accuracy',
                      href: 'https://curvy-crowley-25d.notion.site/Patterns-and-Short-term-Strategies-PSTS-6e11adf4763a4398ac9744cf732ce45e',
                      icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
                    },
                  ],
                },
                {
                  name: 'Stock Screeners',
                  links: [
                    {
                      label: 'Mid Cap Growth Companies',
                      href: 'https://www.screener.in/screens/2020273/mid-cap-growth-companies/',
                    },
                    {
                      label: 'Undervalued Financially Backed Stocks',
                      href: 'https://www.screener.in/screens/1826601/undervalued-financially-backed-stocks/',
                    },
                    {
                      label: 'Margin Enhancement Picks',
                      href: 'https://www.screener.in/screens/1826592/margin-enhancement/',
                    },
                  ],
                },
              ]}
            />
          </div>
        </Section>

        <Section id="growth">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center">Growth Journey</h2>
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl space-y-8">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Currently Learning</h3>
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  {currentLearning}
                </motion.div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Future Goals</h3>
                <div className="flex flex-wrap gap-3">
                  {futureGoals.map((goal, index) => (
                    <motion.div
                      key={goal}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      {goal}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="social">
          <SocialBadge />
        </Section>

        <Section id="contact">
          <ContactSection />
        </Section>

        <footer className="py-8 text-center">
          <p className="text-base sm:text-lg font-medium text-gray-400">
            चले तो कट ही जाएगा सफ़र आहिस्ता आहिस्ता <br />
            If we keep on walking, the journey will pass slowly
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
