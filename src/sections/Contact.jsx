import { motion } from 'framer-motion';
import SpotlightCard from '../components/SpotlightCard';

function Contact() {
    return (
        <section id="contact" className="relative border-t border-white/5 bg-black/20">
            <div className="section-container">
                <motion.h2 
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
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />        
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
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />       
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
                        >
                            <SpotlightCard className="p-6 flex flex-col items-center h-full">
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
                                <div className="relative w-12 h-12 mb-4 rounded-full bg-white/5">
                                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.4)]"></span>
                                <span className="text-white text-sm font-medium">Disponible pour un stage</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Stage de 10 à 12 semaines</h3>    
                            <p className="text-slate-400 mb-8 text-sm">Avril - Juillet 2026 • IUT d'Orsay</p>   
                            <div className="flex justify-center">
                                <a
                                    href="mailto:zhengjimmy66@gmail.com?subject=Opportunité de stage - Jimmy ZHENG" 
                                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold text-sm rounded-full hover:bg-slate-200 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
