import ProjectCard from '../components/ProjectCard';

/**
 * Projects Section - Grid of key projects
 */
function Projects() {
    const projects = [
        {
            title: 'Jeu en 2D (SDL2)',
            semester: 'S1',
            description: "Développement d'un moteur de jeu en C/C++ avec SDL2, mettant en avant l'algorithmique et la gestion mémoire bas niveau. Travail approfondi sur les structures de données et l'optimisation des performances.",
            technologies: ['C', 'C++', 'SDL2', 'Algorithmique'],
            githubLink: '#', // Lien vers GitHub
        },
        {
            title: 'VirtualQuest (CWAD)',
            semester: 'S1',
            description: "Projet d'intégration Front-end (HTML/CSS) avec un cahier des charges strict (Validation W3C, Responsive Design avec Media Queries, Flexbox/Grid). Axé sur le respect des normes, l'identité visuelle et l'accessibilité.",
            technologies: ['HTML5', 'CSS3', 'Responsive', 'W3C'],
            githubLink: '#', // Lien vers GitHub
        },
        {
            title: 'Projet Transverse (SAE 1256)',
            semester: 'S2',
            description: "Application de gestion de la Cité Internationale Universitaire de Paris (CIUP) en Java. Conception UML, développement orienté objet avec interface Swing, tests unitaires et gestion Git. Travail en équipe de 4 sous méthodologie intégrant Qualité, IHM et DOO.",
            technologies: ['Java', 'Swing', 'UML', 'JUnit', 'Git'],
            githubLink: '#', // Lien vers GitHub
        },
        {
            title: 'Plateforme de Création de Groupes (SAE S3)',
            semester: 'S3',
            description: "Plateforme de création de groupes pour les services d'enseignement. Projet intégrant Analyse, SQL/Backend, Développement Web, Algorithmique et Conception POO. Application web complète avec base de données et interface moderne.",
            technologies: ['Web', 'SQL', 'POO', 'Algorithmique', 'Backend'],
            githubLink: '#', // Lien vers GitHub
        },
    ];

    return (
        <section id="projects" className="relative">
            <div className="section-container">
                <h2 className="section-title">Projets Clés</h2>

                <p className="text-gray-400 mb-8 max-w-2xl">
                    Découvrez une sélection de mes projets réalisés au cours de mon parcours en BUT Informatique,
                    illustrant ma progression et mes compétences techniques.
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
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Projects;
