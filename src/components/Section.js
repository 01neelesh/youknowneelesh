import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;