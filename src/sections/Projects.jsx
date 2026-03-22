import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

function Projects() {
    const [filter, setFilter] = useState('selection');

    const projects = [
        {
            title: 'CHOKEN (Restaurant)',
            category: 'selection',
            semester: 'Perso',
            description: "Développement complet du site vitrine et du système de commande en ligne pour un restaurant japonais. Interface 'Dark Warm' immersive, design responsive, gestion de panier dynamique et intégration d'animations fluides.",
            technologies: ['Vite', 'JavaScript (ES6+)', 'CSS3', 'HTML5', 'Vercel', 'Puppeteer'],
            liveLink: 'https://choken.vercel.app',
        },
        {
            title: 'osu!scan',
            category: 'selection',
            semester: 'Perso',
            description: "Application web d'analyse de beatmaps osu!. Scanners multiples : Guest Difficulties, GD Hosts, Nominators, BN Scanner. Multi-threading pour scanner des milliers de maps en quelques secondes. Export HTML des résultats.",
            technologies: ['Python', 'Flask', 'osu! API v2', 'HTML/CSS', 'Threading'],
            githubLink: 'https://github.com/wFuxi66/osu-scan',
            liveLink: 'https://osu-scan.onrender.com',
        },
        {
            title: 'Plateforme de Création de Groupes (SAE S3)',
            category: 'academic',
            semester: 'S3',
            description: "Développement full stack d'une plateforme web pour l'enseignement. Conception de la base de données, algorithmique back end et création d'une interface moderne.",
            technologies: ['Web', 'SQL', 'POO', 'Algorithmique', 'Backend'],
        },
        {
            title: 'Projet Transverse (SAE 1256)',
            category: 'academic',
            semester: 'S2',
            description: "Application de gestion de la Cité Internationale Universitaire de Paris (CIUP) en Java. Conception UML, développement orienté objet avec interface Swing, tests unitaires et gestion Git. Travail en équipe de 4.",
            technologies: ['Java', 'Swing', 'UML', 'JUnit', 'Git'],
        },
        {
            title: 'Projet Réseaux (SAE 203)',
            category: 'academic',
            semester: 'S2',
            description: "Conception et configuration complète d'une infrastructure réseau simulée. Paramétrage du routage IP, déploiement d'un serveur d'adressage dynamique (DHCP) et sécurisation des accès distants aux équipements via SSH.",
            technologies: ['Routage', 'DHCP', 'SSH', 'Linux'],
        },
        {
            title: 'Jeu en 2D (SDL2)',
            category: 'academic',
            semester: 'S1',
            description: "Développement d'un moteur de jeu en C/C++ avec SDL2, axé sur l'algorithmique et la gestion de la mémoire bas niveau. Focus sur l'optimisation et les structures de données.",
            technologies: ['C', 'C++', 'SDL2', 'Algorithmique'],
        },
        {
            title: 'VirtualQuest (CWAD)',
            category: 'academic',
            semester: 'S1',
            description: "Projet d'intégration Front end (HTML/CSS) avec cahier des charges strict : validation W3C, Responsive Design, Media Queries, Flexbox/Grid. Axé sur le respect des normes, l'identité visuelle et l'accessibilité.",
            technologies: ['HTML5', 'CSS3', 'Responsive', 'W3C'],
        },
    ];

    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="relative">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl font-bold text-white mb-4 tracking-tight"
                        >
                            Projets
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 max-w-xl text-lg"
                        >
                            Une immersion dans mes réalisations, du développement de produits aux projets académiques.
                        </motion.p>
                    </div>

                    {/* Filtres Style Premium */}
                    <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm self-start">
                        <button
                            onClick={() => setFilter('selection')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                filter === 'selection' 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Perso
                        </button>
                        <button
                            onClick={() => setFilter('academic')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                filter === 'academic' 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Scolaire
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                                filter === 'all' 
                                ? 'bg-white text-black shadow-lg' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Tous
                        </button>
                    </div>
                </div>

                <motion.div 
                    layout
                    className="grid sm:grid-cols-2 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard
                                    title={project.title}
                                    semester={project.semester}
                                    description={project.description}
                                    technologies={project.technologies}
                                    githubLink={project.githubLink}
                                    liveLink={project.liveLink}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filter === 'selection' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-12 text-center"
                    >
                        <button 
                            onClick={() => setFilter('academic')}
                            className="text-slate-500 hover:text-white text-sm font-medium transition-colors inline-flex items-center gap-2 group"
                        >
                            Découvrir mes projets scolaires
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Projects;
