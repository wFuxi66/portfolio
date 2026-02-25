import ProjectCard from '../components/ProjectCard';

/**
 * Projects Section - Grid of key projects
 */
function Projects() {
    const projects = [
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
            description: "Plateforme de création de groupes pour les services d'enseignement. Projet intégrant Analyse, SQL/Backend, Développement Web, Algorithmique et Conception POO. Application web complète avec base de données et interface moderne.",
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
            description: "Conception et configuration complète d'une topologie réseau simulée. Paramétrage du routage IP, déploiement d'un serveur d'adressage dynamique (DHCP) et sécurisation des accès distants aux équipements via SSH.",
            technologies: ['Routage', 'DHCP', 'SSH', 'Linux'],
        },
        {
            title: 'Jeu en 2D (SDL2)',
            semester: 'S1',
            description: "Développement d'un moteur de jeu en C/C++ avec SDL2, mettant en avant l'algorithmique et la gestion mémoire bas niveau. Travail approfondi sur les structures de données et l'optimisation.",
            technologies: ['C', 'C++', 'SDL2', 'Algorithmique'],
        },
        {
            title: 'VirtualQuest (CWAD)',
            semester: 'S1',
            description: "Projet d'intégration Front-end (HTML/CSS) avec cahier des charges strict : validation W3C, Responsive Design, Media Queries, Flexbox/Grid. Axé sur le respect des normes, l'identité visuelle et l'accessibilité.",
            technologies: ['HTML5', 'CSS3', 'Responsive', 'W3C'],
        },
    ];

    return (
        <section id="projects" className="relative">
            <div className="section-container">
                <h2 className="section-title">Projets</h2>

                <p className="text-gray-400 mb-8 max-w-2xl">
                    Une sélection de mes projets personnels et académiques, illustrant ma progression et mes compétences techniques.
                </p>

                <div className="grid sm:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            semester={project.semester}
                            description={project.description}
                            technologies={project.technologies}
                            githubLink={project.githubLink}
                            liveLink={project.liveLink}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
