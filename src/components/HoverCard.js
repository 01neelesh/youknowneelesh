import React from 'react';
import { motion } from 'framer-motion';

const HoverCard = ({ icon, title, description, skills = [], link, children, categories = [] }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gray-800/70 p-6 rounded-2xl border border-gray-700 shadow-xl overflow-hidden transition-all"
    >
      <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 opacity-10 group-hover:opacity-20 blur-xl transition-all duration-500" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="text-orange-500">{icon}</div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>

        <p className="text-gray-300">{description}</p>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-100 px-3 py-1 rounded-full text-sm hover:scale-105 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {categories.length > 0 && (
          <div className="mt-4 space-y-4">
            {categories.map((category, index) => (
              <div key={index}>
                <h4 className="text-sm font-semibold text-orange-400 mb-2">{category.name}</h4>
                <ul className="space-y-1">
                  {category.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:underline flex items-center gap-2"
                      >
                        {link.icon && <span>{link.icon}</span>}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center mt-4 text-orange-400 font-medium hover:underline"
          >
            {link.text}
            {children}
          </a>
        )}

        {!link && children && (
          <div className="mt-4 space-y-2 text-sm text-gray-200">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default HoverCard;
