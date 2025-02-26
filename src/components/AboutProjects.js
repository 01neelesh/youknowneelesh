import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// Placeholder images from Unsplash (replace with actual project images)
const placeholderImage1 = 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
const placeholderImage2 = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';
const placeholderImage3 = 'https://images.unsplash.com/photo-1536148935331-408321065b18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80';

const AboutProjects = () => {
    // Dummy project data (3 projects for optimal display)
    const projects = [
        {
            title: 'Exam Seating Arrangement Api',
            role: 'Developer',
            description: 'Generates exam seating arrangement PDFs from student and room data. Offers roll number-based and alphabetical arrangements, with automatic file deletion after 10 minutes for data privacy.',
            motivation: 'Developed as part of my minor project to streamline examination processes and provide a practical API for frontend integration.',
            technologies: ['Java', 'Spring Boot', 'Maven', 'cURL', 'Railway'],
            github: 'https://github.com/01neelesh/Exam-Seating-Arrangement-api',
            image: placeholderImage1,
            additionalImage: placeholderImage3, // Second image for visual balance
        },

        {
            title: 'Forward Master Bot',
            role: 'Creator',
            description: 'Telegram bot that automates message forwarding from multiple source groups to a target group with advanced filtering capabilities to exclude promotional content.',
            motivation: 'Created to streamline information management across numerous Telegram groups, reducing curation time and filtering unwanted content.',
            technologies: ['Python', 'asyncio', 'Telegram Bot API'],
            github: 'https://github.com/01neelesh/Forward_Master_Bote/stock-analyzer',
            image: placeholderImage2,
            additionalImage: placeholderImage1, // Second image for visual balance
        },
    ];

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    My Projects
                </motion.h2>

                {/* Project List */}
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        className="grid gap-8 md:grid-cols-2 mb-12 last:mb-0"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                        {/* Left Side: Project Details */}
                        <div className="bg-gray-800/50 p-6 rounded-xl shadow-lg flex flex-col justify-between h-full">
                            <div>
                                <motion.h3
                                    className="text-lg sm:text-xl lg:text-2xl font-semibold text-orange-500 mb-2"
                                    whileHover={{ scale: 1.05, color: '#f97316' }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {project.title}
                                </motion.h3>

                                <p className="text-gray-300 text-sm sm:text-base mb-2">
                                    <span className="font-medium">Role:</span> {project.role}
                                </p>

                                <p className="text-gray-300 text-sm sm:text-base mb-4">
                                    {project.description}
                                </p>

                                <p className="text-gray-300 text-sm sm:text-base mb-4">
                                    <span className="font-medium">Why:</span> {project.motivation}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-gray-700 text-gray-200 px-2 py-1 rounded text-xs sm:text-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <motion.a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors w-fit"
                                whileHover={{ x: 5 }}
                            >
                                <FaGithub size={20} />
                                <span className="text-sm sm:text-base">GitHub</span>
                            </motion.a>
                        </div>

                        {/* Right Side: Project Visuals */}
                        <div className="flex flex-col gap-4">
                            {/* Main image */}
                            <motion.div
                                className="relative rounded-xl overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <img
                                    src={project.image}
                                    alt={`${project.title} preview`}
                                    className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-xl"
                                />
                            </motion.div>
                            
                            {/* Additional image */}
                            <motion.div
                                className="relative rounded-xl overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            >
                                <img
                                    src={project.additionalImage}
                                    alt={`${project.title} additional view`}
                                    className="w-full h-40 sm:h-48 object-cover rounded-xl shadow-xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AboutProjects;