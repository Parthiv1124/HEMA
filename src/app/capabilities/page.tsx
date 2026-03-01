'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
    ChevronRight, Syringe, Atom, FlaskConical, Handshake, TrendingUp, Microscope
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { CTABanner } from '@/components/sections/CTABanner'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
            {children}
        </motion.div>
    )
}

const capabilities = [
    {
        icon: Syringe,
        title: 'Sterile Injectable API Manufacturing',
        description: 'WHO-GMP certified facility for manufacturing sterile injectable grade APIs under aseptic conditions. Our clean room infrastructure supports products requiring the highest purity standards for parenteral formulations.',
        features: ['ISO-classified clean rooms', 'Aseptic processing', 'Endotoxin-controlled manufacturing', 'Lyophilization capability'],
        highlight: true,
    },
    {
        icon: Atom,
        title: 'Chiral Chemistry Expertise',
        description: 'Specialized capabilities in chiral separation and asymmetric synthesis to produce enantiopure APIs. Our expertise in chiral technologies enables cost-effective manufacturing of single-enantiomer drugs.',
        features: ['Asymmetric synthesis', 'Chiral resolution', 'Enantioselective catalysis', 'Chiral HPLC analytics'],
        highlight: false,
    },
    {
        icon: Microscope,
        title: 'Enzymatic Separation',
        description: 'Green chemistry approaches using enzymatic biocatalysis for selective transformations. Enzyme-mediated processes provide superior selectivity with reduced environmental impact.',
        features: ['Biocatalytic resolution', 'Enzyme immobilization', 'Continuous enzyme processes', 'Green chemistry principles'],
        highlight: false,
    },
    {
        icon: Handshake,
        title: 'Custom Synthesis & Contract Manufacturing',
        description: 'End-to-end contract development and manufacturing services tailored to your specifications. From route scouting to commercial supply, we deliver reliable CDMO solutions.',
        features: ['Route scouting & optimization', 'Process development', 'Tech transfer support', 'Dedicated production campaigns'],
        highlight: false,
    },
    {
        icon: TrendingUp,
        title: 'Scale-Up from Lab to Commercial',
        description: 'Seamless transition from laboratory-scale synthesis to full commercial production. Our pilot plant bridges the gap between R&D and large-scale manufacturing with minimal risk.',
        features: ['Pilot batches (1-10 kg)', 'Scale-up optimization', 'Process validation', 'Commercial production (multi-MT)'],
        highlight: false,
    },
]

export default function CapabilitiesPage() {
    return (
        <main>
            {/* ─── Hero ─── */}
            <section className="gradient-hero py-20 pt-32">
                <Container>
                    <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-white">Capabilities</span>
                    </nav>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                        Our Capabilities
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
                        From sterile injectable APIs to custom synthesis — comprehensive pharmaceutical manufacturing expertise
                    </motion.p>
                </Container>
            </section>

            {/* ─── Capabilities Sections ─── */}
            {capabilities.map((cap, i) => {
                const Icon = cap.icon
                const isEven = i % 2 === 0
                return (
                    <section key={cap.title} className={`py-16 md:py-24 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
                        <Container>
                            <Reveal>
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className={!isEven ? 'lg:order-2' : ''}>
                                        {cap.highlight && (
                                            <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 mb-4">
                                                ★ Hero Capability
                                            </span>
                                        )}
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{cap.title}</h2>
                                        <p className="mt-4 text-gray-600 leading-relaxed">{cap.description}</p>
                                        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {cap.features.map((f) => (
                                                <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className={!isEven ? 'lg:order-1' : ''}>
                                        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 flex items-center justify-center">
                                            <Icon className="h-24 w-24 text-brand-400/40" strokeWidth={1} />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </Container>
                    </section>
                )
            })}

            {/* ─── CTA ─── */}
            <CTABanner />
        </main>
    )
}
