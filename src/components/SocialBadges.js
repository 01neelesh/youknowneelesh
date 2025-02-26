import React from 'react';
import { FaLinkedin, FaGithub, FaHackerrank } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const SocialBadges = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center">Digital Footprints</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {/* UPDATE_LINKS_HERE: Update profile URLs */}
        <a href="https://www.linkedin.com/in/01neelesh?" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <FaLinkedin size={24} className="text-blue-500" />
          <span className="text-gray-300">LinkedIn</span>
        </a>
        <a href="https://github.com/01neelesh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <FaGithub size={24} className="text-white" />
          <span className="text-gray-300">GitHub</span>
        </a>
        <a href="https://leetcode.com/u/01neelesh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <SiLeetcode size={24} className="text-yellow-500" />
          <span className="text-gray-300">LeetCode</span>
        </a>
        <a href="https://hackerrank.com/neeleshchaturve1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
          <FaHackerrank size={24} className="text-green-500" />
          <span className="text-gray-300">HackerRank</span>
        </a>
      </div>
    </div>
  );
};

export default SocialBadges;