import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import SeatChartImage from '../assets/image.png'
import knowItAll from '../assets/know-it-all.png'
import crowdVos from '../assets/crowd-vs.png'

const ProjectsSection = () => {
  const projects = [
    {
      title: "SeatChart - Exam Seating Arrangement",
      type: "Web Application",
      description: "A SaaS tool built from scratch that generates examination seating charts from student data. Offers multiple arrangement methods including multi-class students in one room, roll number-wise, and alphanumeric ordering.",
      technologies: ["Java", "Spring Boot", "React", "REST API", "Railway", "Netlify"],
      liveUrl: "https://seatchart.netlify.app",
      githubUrl: "https://github.com/01neelesh/Exam-Seating-Arrangement-api",
      imageUrl: SeatChartImage,
      features: [
        "Upload student data files to generate seating arrangements",
        "Multiple arrangement algorithms",
        "PDF generation for printing",
        "Secure data handling with automatic deletion"
      ]
    },
    {
      title: "CrowdVos",
      type: "Android Application",
      description: "An opinion trading app inspired platform where users can create polls, join existing polls, and exchange opinions. Fully functional with Firebase integration for real-time data handling.",
      technologies: ["Android", "Java", "Firebase", "Material Design"],
      githubUrl: "https://github.com/01neelesh/crowdvos",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1oA2dhvPcCgqzFjKvdkxKeS968XYoUmwK",
      screenshotCollage: crowdVos,
      features: [
        "Create and participate in opinion polls",
        "Real-time updates using Firebase",
        "User authentication and profiles",
        "Results visualization"
      ]
    },
    {
      title: "Know It All",
      type: "Android Application",
      description: "A quiz application that fetches questions from a trivia API using the Volley library. Demonstrates working with legacy Android practices and SharedPreferences for data persistence.",
      technologies: ["Android", "Volley", "SharedPreferences", "REST API"],
      githubUrl: "https://github.com/01neelesh/know-it-all",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1ttJuErtmny8zmhLQibqAQW4f3240Agdw",
      screenshotCollage: knowItAll,
      features: [
        "Categorized quiz questions",
        "Score tracking and history",
        "Difficulty selection",
        "Offline capability with cached questions"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-800/50 to-gray-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A collection of software solutions I've built, from web applications to Android apps.
            Each project represents different skills and technologies from my development journey.
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <div className="relative rounded-xl overflow-hidden group">
                <div className="relative h-72 overflow-hidden rounded-lg border-2 border-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-purple-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <a href='https://seatchart.netlify.app/'>
                  <img
                    src={project.type === "Web Application" ? project.imageUrl : project.screenshotCollage}
                    alt={`${project.title} ${project.type === "Web Application" ? "screenshot" : "screenshots"}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  </a>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <span className="text-orange-500 text-sm font-medium mb-2 block">{project.type}</span>
                    <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300">{project.description}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                    <ul className="space-y-1 text-gray-300">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Built With</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <FaGithub size={18} />
                      <span>View Code</span>
                    </motion.a>

                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <FaExternalLinkAlt size={16} />
                        <span>Live Demo</span>
                      </motion.a>
                    )}

                    {project.downloadUrl && (
                      <motion.a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <FaDownload size={16} />
                        <span>Download APK</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;