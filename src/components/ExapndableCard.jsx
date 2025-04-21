// components/ExpandableCard.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from 'lucide-react'; // Or use any icon library you're already using

const ExpandableCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    { title: 'Languages', items: ['Java', 'Kotlin', 'Python', 'SQL'] },
    { title: 'Frontend', items: ['HTML', 'CSS'] },
    { title: 'Testing', items: ['JUnit','Mockito', 'cURL'] },
    { title: 'Frameworks', items: ['Android Dev', 'Spring Boot 3'] },
    { title: 'Build Tools', items: ['Gradle', 'Maven', 'npm'] },
    { title: 'Version Control', items: ['Git', 'GitHub'] },
    { title: 'Databases', items: ['MySQL', 'SQLite', 'Room', 'Firestore'] },
    { title: 'Cloud', items: ['Firebase (hands-on)'] },
    { title: 'Libraries', items: ['Retrofit', 'OkHttp', 'Volley', 'Dagger/Hilt', 'ML Kit'] },
  ];

  return (
    <motion.div
    onMouseEnter={() => setIsExpanded(true)}
    onMouseLeave={() => setIsExpanded(false)}
    
      whileHover={{ scale: 1.02 }}
      className="group relative bg-gray-800/70 p-6 rounded-2xl border border-gray-700 shadow-xl transition-all cursor-pointer"
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-10 group-hover:opacity-20 blur-xl transition-all duration-500" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-orange-500"><Code size={24} /></div>
          <h3 className="text-xl font-semibold text-white">Development</h3>
        </div>

        <p className="text-gray-300">
        My programming adventure began with Java in '21, marking milestones with a landing page ('22) and an app ('23).
        Driven by a thirst for knowledge, I eagerly explore the tech universe, absorbing new concepts rapidly.
        This momentum of learning and creation defines my ongoing development path.
        </p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-200 mt-2"
            >
              {categories.map((cat, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-orange-400 mb-2">{cat.title}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-xs hover:bg-orange-500 hover:text-white transition"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-xs text-gray-400 mt-2">
          {isExpanded ? 'Hover to collapse' : 'Hover to expand'}
        </div>
      </div>
    </motion.div>
  );
};

export default ExpandableCard;
