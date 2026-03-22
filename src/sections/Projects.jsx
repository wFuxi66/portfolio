import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

/**
 * Projects Section - Grid of key projects
 */
function Projects() {
    const projects = [
        {
            title: 'CHOKEN (Restaurant)',
            semester: 'Perso',
            description: "Développement complet du site vitrine et du système de commande en ligne pour un restaurant japonais. Interface 'Dark Warm' immersive, design responsive, gestion de panier dynamique et intégration d'animations fluides.",
            technologies: ['Vite', 'JavaScript (ES6+)', 'CSS3', 'HTML5', 'Vercel', 'Puppeteer'],
            liveLink: 'https://choken.vercel.app',
        },
        {
            title: 'osu!scan',
            semester: 'Perso',
            description: "Application web d'analyse de beatmaps osu!. Scanners multiples : Guest Difficulties, GD Hosts, Nominators, BN Scanner. Multi-threading pour scanner des milliers de maps en quelques secondes. Export HTML des résultats.",
            technologies: ['Python', 'Flask', 'osu! API v2', 'HTML/CSS', 'Threading'],
            githubLink: 'https://github.com/wFuxi66/osu-scan',
            liveLink: 'https://osu-scan.onrender.com',
        },
        {
            title: 'Plateforme de Création de Groupes (SAE S3)',
            semester: 'S3',
            description: "Développement full stack d'une plateforme web pour l'enseignement. Conception de la base de données, algorithmique back end et création d'une interface moderne.",
            technologies: ['Web', 'SQL', 'POO', 'Algorithmique', 'Backend'],
        },
        {
            title: 'Projet Transverse (SAE 1256)',
            semester: 'S2',
            description: "Application de gestion de la Cité Internationale Universitaire de Paris (CIUP) en Java. Conception UML, développement orienté objet avec interface Swing, tests unitaires et gestion Git. Travail en équipe de 4.",
            technologies: ['Java', 'Swing', 'UML', 'JUnit', 'Git'],
        },
        {
            title: 'Projet Réseaux (SAE 203)',
            semester: 'S2',
            description: "Conception et configuration complète d'une infrastructure réseau simulée. Paramétrage du routage IP, déploiement d'un serveur d'adressage dynamique (DHCP) et sécurisation des accès distants aux équipements via SSH.",
            technologies: ['Routage', 'DHCP', 'SSH', 'Linux'],
        },
        {
            title: 'Jeu en 2D (SDL2)',
            semester: 'S1',
            description: "Développement d'un moteur de jeu en C/C++ avec SDL2, axé sur l'algorithmique et la gestion de la mémoire bas niveau. Focus sur l'optimisation et les structures de données.",
            technologies: ['C', 'C++', 'SDL2', 'Algorithmique'],
        },
        {
            title: 'VirtualQuest (CWAD)',
            semester: 'S1',
            description: "Projet d'intégration Front end (HTML/CSS) avec cahier des charges strict : validation W3C, Responsive Design, Media Queries, Flexbox/Grid. Axé sur le respect des normes, l'identité visuelle et l'accessibilité.",
            technologies: ['HTML5', 'CSS3', 'Responsive', 'W3C'],
        },
    ];

    return (
        <section id="projects" className="relative">
            <div className="section-container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-6 tracking-tight"
                >
                    Projets
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 mb-10 max-w-2xl text-lg"
                >
                    Une sélection de mes projets techniques, réalisés dans un cadre personnel ou académique.
                </motion.p>

                <div className="grid sm:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
                </div>
            </div>
        </section>
    );
}

export default Projects;
