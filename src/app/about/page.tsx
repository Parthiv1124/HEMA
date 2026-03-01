'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, Eye, Target, Award, Lightbulb, Shield, Leaf } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Timeline } from '@/components/sections/Timeline'
import { CTABanner } from '@/components/sections/CTABanner'

/* ─── ScrollReveal Wrapper ─── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Core Values Data ─── */
const coreValues = [
  { icon: Award, title: 'Quality', description: 'Uncompromising commitment to cGMP compliance and rigorous quality control at every stage of production.' },
  { icon: Lightbulb, title: 'Innovation', description: 'Continuous investment in R&D and process optimization to deliver cutting-edge pharmaceutical solutions.' },
  { icon: Shield, title: 'Integrity', description: 'Transparent business practices and ethical standards that build lasting trust with our global partners.' },
  { icon: Leaf, title: 'Sustainability', description: 'Responsible manufacturing with a focus on environmental stewardship and green chemistry initiatives.' },
]

export default function AboutPage() {
  const storyRef = useRef<HTMLElement>(null)
  const storyInView = useInView(storyRef, { once: true, margin: '-10%' })
  const vmRef = useRef<HTMLElement>(null)
  const vmInView = useInView(vmRef, { once: true, margin: '-10%' })
  const valuesRef = useRef<HTMLElement>(null)
  const valuesInView = useInView(valuesRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">About Us</span>
          </nav>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            About Hema Pharmaceuticals
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 max-w-2xl text-lg text-white/80"
          >
            Pioneering API Excellence Since 2012
          </motion.p>
        </Container>
      </section>

      {/* ─── Company Story ─── */}
      <section ref={storyRef} className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Story</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                A Legacy of Pharmaceutical Excellence
              </h2>
              <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hema Pharmaceuticals Pvt. Ltd. is a leading manufacturer of active pharmaceutical ingredients (APIs) established in 2012. With over a decade of expertise in the pharmaceutical industry, we are dedicated to delivering high-quality API bulk drugs that meet the stringent standards of the global healthcare market.
                </p>
                <p>
                  Our commitment to excellence and innovation drives us to continuously improve our processes and products, ensuring that we remain at the forefront of the industry. We specialize in producing a wide range of APIs that cater to diverse therapeutic areas.
                </p>
                <p>
                  At Hema Pharmaceuticals, quality is our top priority. We adhere to rigorous quality control measures and employ state-of-the-art technology to ensure the purity, potency, and consistency of our products. Our manufacturing facilities are compliant with cGMP.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-100 to-brand-50 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="mx-auto h-16 w-16 rounded-full bg-brand-500/10 flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-brand-500" />
                  </div>
                  <p className="text-brand-700 font-semibold text-lg">Manufacturing Facility</p>
                  <p className="text-brand-500 text-sm mt-1">Ankleshwar, Gujarat, India</p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-brand-500/10 -z-10" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── Vision & Mission ─── */}
      <section ref={vmRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={vmInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                <Eye className="h-7 w-7 text-brand-500" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                To become a globally recognized leader in API manufacturing, setting new benchmarks for quality, innovation, and sustainability in the pharmaceutical industry. We envision a world where access to high-quality medicines is universal.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={vmInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                <Target className="h-7 w-7 text-brand-500" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                To deliver pharmaceutical-grade APIs of the highest quality through continuous innovation, stringent quality control, and sustainable manufacturing practices — empowering our partners to bring safe and effective medicines to patients worldwide.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── Core Values ─── */}
      <section ref={valuesRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">What Drives Us</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Hexagonal icon container */}
                  <div className="relative mx-auto mb-5 h-20 w-20">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-brand-50 group-hover:text-brand-100 transition-colors">
                      <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-brand-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── Timeline ─── */}
      <Timeline />

      {/* ─── CTA Banner ─── */}
      <CTABanner />
    </main>
  )
}
