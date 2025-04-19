import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Code, TrendingUp, ExternalLink, Menu , Download } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsPraying, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import WaveBackground from './components/WaveBackground.js';
import ContactSection from './components/ContactSection.js';
import Section from './components/Section.js';
import SocialBadge from './components/SocialBadges.js';
import './styles/index.css';
import profilePic from './assets/profilevideo-unscreen.gif';
import AboutProjects from './components/AboutProjects.js';

// SkillCard Component (unchanged)
const SkillCard = ({ icon, title, skills, description, children }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-gray-800/50 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="text-orange-500">{icon}</div>
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
    </div>
    <p className="leading-relaxed mb-4">{description}</p>
    {skills && skills.length > 0 && (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
    {children}
  </motion.div>
);

// Navbar Component (fixed and moved outside)

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.nav
      className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.a href="#home" className="text-xl font-bold text-orange-500">Neelesh</motion.a>
        <div className="hidden md:flex space-x-6">
        <motion.a href="#projects" className="text-gray-300 hover:text-orange-500">Projects</motion.a>
          <motion.a href="#skills" className="text-gray-300 hover:text-orange-500">Skills</motion.a>
          <motion.a href="#contact" className="text-gray-300 hover:text-orange-500">Contact</motion.a>
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1hK_EwH_X6-K5I7rr7K1B8U35Q6C6221j" 
            download="Neelesh_Chaturvedi_Resume.pdf"
            className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-orange-600 transition"
            whileHover={{ scale: 1.1 }}
          >
            <Download size = {16} />
            <span>Resume</span>
          </motion.a>
        </div>
        <div className="md:hidden">
          <motion.button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
            <Menu size={24} />
          </motion.button>
          {isOpen && (
            <motion.div
              className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <motion.a href="#projects" className="block text-gray-300 hover:text-orange-500 py-2">Projects</motion.a>
              <motion.a href="#skills" className="block text-gray-300 hover:text-orange-500 py-2">Skills</motion.a>
              <motion.a href="#contact" className="block text-gray-300 hover:text-orange-500 py-2">Contact</motion.a>
              <motion.a
                href="https://drive.google.com/uc?export=download&id=1hK_EwH_X6-K5I7rr7K1B8U35Q6C6221j" // Replace with your ID
                download="Neelesh_Chaturvedi_Resume.pdf"
                className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-orange-600 transition"
                whileHover={{ scale: 1.1 }}
              >
                <Download size = {16} />
                <span>Resume</span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
const App = () => {
  const [currentLearning, setCurrentLearning] = useState('Jetpack Compose');
  const [futureGoals] = useState(['KMP','System Design']);
  const { scrollYProgress } = useScroll();
  const travelerX = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  // State for text rotator
  const greetings = [
    "Hello", // English
    "नमस्ते", // Hindi (Namaste)
    "வணக்கம்", // Tamil (Vanakkam)
    "నమస్కారం", // Telugu (Namaskaram)
    "ನಮಸ್ಕಾರ", // Kannada (Namaskara)
    "നമസ്കാരം", // Malayalam (Namaskaram)
    "নমস্কার", // Bengali (Nomoshkar)
    "નમસ્તે", // Gujarati (Namaste)
    "ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ", // Punjabi (Sat Sri Akal)
    "ନମସ୍କାର", // Odia (Namaskar)
    "नमस्कार", // Marathi (Namaskar)
  ];
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);

  // Text rotator effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 2000); // Rotate every 2 seconds
    return () => clearInterval(interval);
  }, [greetings.length]);

  // Responsive viewport helper
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

  return (
    <div className="app min-h-screen">
      <Navbar /> {/* Use the Navbar component here */}
      <WaveBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 z-[-5]" />

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 left-0 h-8 w-8 sm:h-12 sm:w-12 text-orange-500 opacity-50 z-20"
        style={{ x: travelerX }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Scroll Progress Indicator"
      >
        <div className="w-full h-full bg-orange-500 rounded-full shadow-lg animate-pulse" />
      </motion.div>

      <div className="content">
        {/* Hero Section with Text Rotator */}
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
                srcSet={`${profilePic} 300w, ${profilePic} 600w`}
                sizes="(max-width: 768px) 150px, 300px"
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

        {/* About projects */}
        <Section id = "projects">
          <AboutProjects />
        </Section>

        {/* Skills Section */}
        <Section id="skills">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Developing Knowledgebase
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
            <SkillCard
              icon={<Code size={isMobile ? 24 : 32} />}
              title="Development"
              skills={['Java', 'Python', 'SQL', 'Spring Boot', 'Mobile Applications', 'Firebase', 'MySql', 'XML']}
              description="Practical learning driven by solid fundamentals."
            />

            <SkillCard
              icon={<TrendingUp size={isMobile ? 24 : 32} />}
              title="Stock Market"
              skills={['Technical Analysis', 'Fundamental Analysis']}
              description="Technical analysis expert with 3+ years in market patterns. See my strategies here: "
            >
              <div className="inline-flex items-center -mt-4">
                <motion.a
                  href="https://curvy-crowley-25d.notion.site/Patterns-and-Short-term-Strategies-PSTS-6e11adf4763a4398ac9744cf732ce45e"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-orange-400 font-medium hover:underline transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Strategies
                  <FontAwesomeIcon icon={faMagnifyingGlassChart} className="ml-2" />
                </motion.a>
              </div>
            </SkillCard>

            <SkillCard
              icon={<BookOpen size={isMobile ? 24 : 32} />}
              title="Poetry"
              skills={['Public Speaking', 'Social Interaction', 'Story Telling']}
              description="Poetry for me is not a hobby, but a means of listening and connecting with people."
            />
          </div>
        </Section>

        {/* Growth Journey Section */}
        <Section id="growth">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center">Growth Journey</h2>
            <div className="bg-gray-800/50 p-6 rounded-xl shadow-xl">
              <div className="space-y-8">
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
          </div>
        </Section>


        {/* Social Section */}
        <Section id="social">
          <SocialBadge />
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <ContactSection />
        </Section>

        {/* Footer */}
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