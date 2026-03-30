import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

/**
 * Projects Section - Full list of academic and personal projects with STAR methodology
 */
function Projects() {
    const [filter, setFilter] = useState('selection');

    const projects = [
        {
            title: 'CHOKEN (WIP)',
            category: 'selection',
            semester: 'Perso',
            star: {
                s: "Un restaurant japonais souhaitait moderniser sa présence en ligne et proposer un menu interactif.",
                t: "Concevoir une interface immersive reflétant l'identité visuelle de l'établissement tout en restant ultra-fluide.",
                a: "Développement d'un site vitrine avec animations CSS avancées, gestion dynamique du panier en JavaScript pur et optimisation du SEO.",
                r: "Plateforme performante livrée, offrant une expérience utilisateur fluide et une vitrine digitale élégante."
            },
            technologies: ['Vite', 'JavaScript', 'CSS3', 'HTML5', 'Vercel'],
            liveLink: 'https://choken.vercel.app',
        },
        {
            title: 'osu!scan',
            category: 'selection',
            semester: 'Perso',
            star: {
                s: "L'analyse des données de beatmaps sur osu! était lente et laborieuse via les outils existants.",
                t: "Créer un scanner capable de traiter des milliers de maps simultanément pour extraire des statistiques précises.",
                a: "Utilisation de l'API v2 d'osu!, implémentation du multi-threading en Python (Flask) et génération de rapports HTML automatisés.",
                r: "Outil capable de scanner une bibliothèque entière en quelques secondes, utilisé par la communauté pour gagner un temps précieux."
            },
            technologies: ['Python', 'Flask', 'osu! API v2', 'Threading'],
            githubLink: 'https://github.com/wFuxi66/osu-scan',
            liveLink: 'https://osu-scan.onrender.com',
        },
        {
            title: 'Application de création de groupes',
            category: 'academic',
            semester: 'S3',
            star: {
                s: "L'IUT d'Orsay avait besoin d'automatiser la répartition des étudiants en groupes TD/TP, un processus alors manuel et source d'erreurs.",
                t: "Concevoir une application complète (web + bureau) gérant les contraintes de disponibilité et de composition des groupes.",
                a: "Développement en équipe avec méthodologie Agile : back-end Java, base de données SQL, interface web PHP/HTML/CSS, sprints réguliers et revues de code sur GitLab.",
                r: "Application fonctionnelle livrée, permettant la génération automatique des groupes avec gestion des contraintes en quelques secondes."
            },
            technologies: ['Java', 'PHP', 'SQL', 'Agile'],
        },
        {
            title: 'Projet Transverse (SAE 1256)',
            category: 'academic',
            semester: 'S2',
            star: {
                s: "La Cité Internationale Universitaire de Paris (CIUP) avait besoin d'un outil pour gérer ses infrastructures et résidents.",
                t: "Développer une application de bureau robuste permettant le suivi des données et la gestion des équipements.",
                a: "Modélisation UML complète, développement en Java avec interface Swing et mise en place de tests unitaires (JUnit) en équipe de 4.",
                r: "Logiciel fonctionnel livré, démontrant une gestion fiable des données et une architecture logicielle propre."
            },
            technologies: ['Java', 'Swing', 'UML', 'JUnit', 'Git'],
        },
        {
            title: 'Configuration Réseau & Firewall',
            category: 'academic',
            semester: 'S2',
            star: {
                s: "TP réseau en BUT Informatique : mise en situation d'un administrateur système devant sécuriser une infrastructure multi-sous-réseaux.",
                t: "Configurer et sécuriser un réseau complet avec isolation des zones et contrôle du trafic entrant/sortant.",
                a: "Mise en place de règles iptables, NAT, VLANs et filtrage applicatif sur routeurs Linux. Rédaction d'une politique de sécurité réseau documentée.",
                r: "Infrastructure sécurisée et opérationnelle, avec isolation effective des zones et blocage des flux non autorisés."
            },
            technologies: ['Linux', 'Réseau', 'Sécurité', 'iptables'],
        },
        {
            title: 'Jeu vidéo 2D en C++',
            category: 'academic',
            semester: 'S1',
            star: {
                s: "Projet de 1ère année BUT : développer un jeu vidéo complet en équipe, sans bibliothèque graphique externe imposée.",
                t: "Créer un jeu 2D jouable avec animations fluides, détection de collisions et logique de niveaux progressifs.",
                a: "Programmation orientée objet en C++, gestion des sprites, physique et boucle de jeu. Collaboration via Git et Code::Blocks avec répartition des tâches par module.",
                r: "Jeu 2D complet et jouable livré en fin de semestre, démontrant la maîtrise de la POO et du travail collaboratif."
            },
            technologies: ['C++', 'SDL2', 'Git', 'POO'],
        },
        {
            title: 'Site web responsive',
            category: 'academic',
            semester: 'S1',
            star: {
                s: "SAÉ de 1ère année BUT : intégrer une maquette en respectant des critères stricts d'accessibilité et d'ergonomie.",
                t: "Produire un site consultable sur tous les supports (mobile, tablette, desktop) sans framework CSS.",
                a: "Développement HTML/CSS pur avec media queries, flexbox et animations CSS. Respect des contrastes WCAG et sémantique HTML5.",
                r: "Site fonctionnel et validé sur tous les supports, bien noté pour la qualité du code et le respect des standards web."
            },
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

                    <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm self-start">
                        <button
                            onClick={() => setFilter('selection')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${filter === 'selection'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Perso
                        </button>
                        <button
                            onClick={() => setFilter('academic')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${filter === 'academic'
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                }`}
                        >
                            Scolaire
                        </button>
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${filter === 'all'
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
                                    star={project.star}
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
                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
