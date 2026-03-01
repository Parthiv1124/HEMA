'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, User, Users, Heart, GraduationCap } from 'lucide-react'
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

const leaders = [
  {
    name: 'Jignesh Patel',
    title: 'Managing Director & CEO',
    bio: 'Visionary leader with over 15 years of experience in the pharmaceutical industry. Drives the strategic direction and global expansion of Hema Pharmaceuticals.',
  },
  {
    name: 'Director – Operations',
    title: 'Chief Operating Officer',
    bio: 'Oversees all manufacturing operations, supply chain management, and facility expansion. Ensures operational excellence across all production activities.',
  },
  {
    name: 'Head – Quality Assurance',
    title: 'VP Quality & Regulatory',
    bio: 'Leads the quality management system and regulatory compliance initiatives. Responsible for WHO-GMP, EU-GMP, and CDSCO certifications.',
  },
  {
    name: 'Head – Research & Development',
    title: 'VP R&D',
    bio: 'Spearheads process development, DMF filings, and analytical method development. Drives innovation in API synthesis and green chemistry.',
  },
  {
    name: 'Head – International Sales',
    title: 'VP Business Development',
    bio: 'Manages global business relationships across 40+ international markets. Drives market expansion across Latin America, Africa, Europe, and Asia.',
  },
  {
    name: 'Head – Finance',
    title: 'Chief Financial Officer',
    bio: 'Manages financial planning, reporting, and corporate governance. Ensures sustainable growth and operational efficiency.',
  },
]

const cultureValues = [
  { icon: Users, title: 'Collaborative Environment', description: 'Cross-functional teams working together to solve complex pharmaceutical challenges.' },
  { icon: GraduationCap, title: 'Continuous Learning', description: 'Regular training programs and industry conferences to keep our team at the cutting edge.' },
  { icon: Heart, title: 'Employee Wellbeing', description: 'Comprehensive health benefits, work-life balance, and a supportive workplace culture.' },
  { icon: User, title: 'Growth Opportunities', description: 'Clear career progression paths with mentorship and leadership development programs.' },
]

export default function LeadershipPage() {
  const teamRef = useRef<HTMLElement>(null)
  const teamInView = useInView(teamRef, { once: true, margin: '-10%' })
  const cultureRef = useRef<HTMLElement>(null)
  const cultureInView = useInView(cultureRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Leadership</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Leadership
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Experienced professionals driving pharmaceutical innovation and global growth
          </motion.p>
        </Container>
      </section>

      {/* ─── Leadership Team ─── */}
      <section ref={teamRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Team</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Meet the Leadership</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i }}
              >
                {/* Photo placeholder */}
                <div className="mx-auto h-28 w-28 rounded-full bg-gradient-to-br from-brand-100 to-brand-50 flex items-center justify-center mb-5">
                  <User className="h-12 w-12 text-brand-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{leader.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-500">{leader.title}</p>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Company Culture ─── */}
      <section ref={cultureRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={cultureInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Our Culture</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Life at Hema Pharmaceuticals</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              We foster a culture of excellence, innovation, and mutual respect where every team member contributes to our mission of improving global health.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={cultureInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-7 w-7 text-brand-500" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <CTABanner />
    </main>
  )
}
