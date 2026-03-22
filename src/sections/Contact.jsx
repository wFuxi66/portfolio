/**
 * Contact Section - Contact information and links
 */
function Contact() {
    return (
        <section id="contact" className="relative bg-dark-900/30">
            <div className="section-container">
                <h2 className="section-title">Contact</h2>

                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-lg text-gray-300 mb-8">
                        Je suis activement à la recherche d'un stage pour le printemps 2026.
                        <br />
                        <span className="text-cyan-400">N'hésitez pas à me contacter pour toute opportunité !</span>
                    </p>

                    {/* Contact Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        {/* Email */}
                        <a
                            href="mailto:zhengjimmy66@gmail.com"
                            className="glass-card glow-border hover-glow p-6 group transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-600/20 flex items-center justify-center group-hover:bg-cyan-600/30 transition-colors">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white mb-1">Email</h3>
                            <p className="text-xs text-gray-400 group-hover:text-cyan-400 transition-colors break-all">zhengjimmy66@gmail.com</p>
                        </a>

                        {/* Phone */}
                        <a
                            href="tel:+33767696993"
                            className="glass-card glow-border hover-glow p-6 group transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-600/20 flex items-center justify-center group-hover:bg-cyan-600/30 transition-colors">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white mb-1">Téléphone</h3>
                            <p className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">07 67 69 69 93</p>
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/jimmy-zheng-4a9073331/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card glow-border hover-glow p-6 group transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-600/20 flex items-center justify-center group-hover:bg-cyan-600/30 transition-colors">
                                <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                            <p className="text-sm text-gray-400 group-hover:text-cyan-400 transition-colors">Mon profil</p>
                        </a>

                        {/* Location */}
                        <div className="glass-card glow-border p-6 group transition-all duration-300">
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cyan-600/20 flex items-center justify-center">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-white mb-1">Localisation</h3>
                            <p className="text-sm text-gray-400">Paris 13e, France</p>
                        </div>
                    </div>

                    {/* Stage CTA */}
                    <div className="glass-card glow-border p-8 bg-gradient-to-r from-cyan-600/10 to-transparent">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                            <span className="text-emerald-400 font-medium">Disponible pour un stage</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Stage de 10 à 12 semaines</h3>
                        <p className="text-gray-400 mb-4">Avril - Juillet 2026 • IUT d'Orsay</p>
                        <a
                            href="mailto:zhengjimmy66@gmail.com?subject=Opportunité de stage - Jimmy ZHENG"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-dark-950 font-semibold rounded-lg hover:bg-cyan-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Me contacter
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
