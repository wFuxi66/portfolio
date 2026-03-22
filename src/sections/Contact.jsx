import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

function Contact() {
    return (
        <section id="contact" className="relative border-t border-white/5 bg-black/20" aria-labelledby="contact-title">
            <div className="section-container">
                <motion.h2 
                    id="contact-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl font-bold text-white mb-12 tracking-tight"
                >
                    Contact
                </motion.h2>

                <div className="max-w-2xl mx-auto text-center">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400 mb-8"
                    >
                        Je suis activement à la recherche d'un stage pour le printemps 2026.
                        <br />
                        <span className="text-white font-medium">N'hésitez pas à me contacter pour toute opportunité.</span>
                    </motion.p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            href="mailto:zhengjimmy66@gmail.com"
                            className="group transition-all duration-300 flex flex-col h-full"
                            aria-label="Envoyer un email à Jimmy Zheng"
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                </div>
                                <h3 className="font-medium text-white mb-1 text-sm">Email</h3>
                                <p className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors break-all leading-tight">zhengjimmy66@gmail.com</p>
                            </SpotlightCard>
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            href="tel:+33767696993"
                            className="group transition-all duration-300 flex flex-col h-full"
                            aria-label="Appeler Jimmy Zheng"
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </div>
                                <h3 className="font-medium text-white mb-1 text-sm">Téléphone</h3>
                                <p className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">07 67 69 69 93</p>
                            </SpotlightCard>
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            href="https://www.linkedin.com/in/jimmy-zheng-4a9073331/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group transition-all duration-300 flex flex-col h-full"
                            aria-label="Profil LinkedIn de Jimmy Zheng"
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                                    </svg>
                                </div>
                                <h3 className="font-medium text-white mb-1 text-sm">LinkedIn</h3>
                                <p className="text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors">Mon profil</p>
                            </SpotlightCard>
                        </motion.a>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col h-full"
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Localisation : Paris 13e">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </div>
                                <h3 className="font-medium text-white mb-1 text-sm">Localisation</h3>
                                <p className="text-[11px] text-slate-500">Paris 13e</p>
                            </SpotlightCard>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="max-w-lg mx-auto"
                    >
                        <SpotlightCard className="p-8">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]" aria-hidden="true"></span>
                                <span className="text-white text-sm font-medium">Disponible pour un stage</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 text-center tracking-tight">Stage de 10 à 12 semaines</h3>    
                            <p className="text-slate-400 mb-8 text-sm text-center">Avril - Juillet 2026 • IUT d'Orsay</p>   
                            <div className="flex justify-center">
                                <a
                                    href="mailto:zhengjimmy66@gmail.com?subject=Opportunité de stage - Jimmy ZHENG" 
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                    aria-label="Envoyer un email de proposition de stage"
                                >
                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                    <span>Me contacter</span>
                                </a>
                            </div>
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
