import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Code, TrendingUp, ExternalLink } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsPraying, faMagnifyingGlassChart } from '@fortawesome/free-solid-svg-icons';
import WaveBackground from './components/WaveBackground.js';
import ContactSection from './components/ContactSection.js';
import Section from './components/Section.js';
import SocialBadge from './components/SocialBadges.js';
import './styles/index.css';
import profilePic from './assets/profilevideo-unscreen.gif';
import poetryPic from './assets/open-mic.jpg';
import AboutProjects from './components/AboutProjects.js';

// SkillCard Component - Updated to accept and render children
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

    {/* Skills list rendering */}
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


const App = () => {
  const [currentLearning, setCurrentLearning] = useState('DSA');
  const [futureGoals] = useState(['AWS', 'System Design']);
  const { scrollYProgress } = useScroll();
  const travelerX = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

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
      <WaveBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/80 z-[-5]" />

      {/* Scroll Indicator */}
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
        {/* Hero Section */}
        <Section className="min-h-screen flex items-center justify-center">
          <motion.div className="text-center space-y-6 p-4 sm:p-6 lg:p-8">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              नमस्कार <FontAwesomeIcon icon={faHandsPraying} className="ml-2 text-orange-500 to-pink-500" />
            </motion.h1>
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
            <p className="text-base sm:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed">
              मैं Neelesh, a coder by day, a market analyst by passion, and a poet by soul.
              Life is a cycle, much like the stock market, with its ups and downs. I find joy in decoding its patterns through code, charts, and verses.
            </p>
          </motion.div>
        </Section>

        {/* About projects */}
        <Section>
          <AboutProjects />
        </Section>

        {/* Skills Section */}
        <Section>
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
              skills={['Java', 'Python', 'SQL', 'Spring Boot', 'Mobile Applications']}
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
                  className="inline-flex items-center text-orange-500 font-medium hover:underline transition-all duration-300"
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
        <Section>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center">Growth Journey</h2>
            <div className="bg-gray-800\50 p-6 rounded-xl shadow-xl">
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

        {/* Poetry Section */}
        <Section>
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center">Poetry & Connection</h2>
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="bg-gray-800/50 p-6 rounded-xl">
                <blockquote className="text-lg sm:text-xl lg:text-2xl italic leading-relaxed">
                  घर से निकल पड़े कदम , न जाने कहाँ को जायेंगे,<br />
                   वापस पहुंचे तो ठीक, वर्ना जमींदोज़ हो जायेंगे |
                </blockquote>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-xl overflow-hidden">
                <img
                  src={poetryPic}
                  srcSet={`${poetryPic} 300w, ${poetryPic} 600w`}
                  sizes="(max-width: 768px) 150px, 300px"
                  alt="Poetry Performance"
                  className="w-full object-cover rounded-xl shadow-xl"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </Section>

        {/* Social Section  */}
        <Section>
          <SocialBadge />
        </Section>

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="py-8 text-center">
          <p className="text-base sm:text-lg font-medium text-gray-400 ">
            चले तो कट ही जाएगा सफ़र आहिस्ता आहिस्ता <br />
            If we walk, the journey will pass slowly
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;