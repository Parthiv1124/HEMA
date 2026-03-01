'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight, GraduationCap, Heart, TrendingUp, Users,
  Globe, Shield, Mail, ArrowRight
} from 'lucide-react'
import { Container } from '@/components/ui/Container'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const benefits = [
  { icon: TrendingUp, title: 'Career Growth', description: 'Clear progression paths from entry-level to leadership with mentoring and development programs.' },
  { icon: GraduationCap, title: 'Continuous Learning', description: 'Regular training, industry conferences, and professional development opportunities to enhance your skills.' },
  { icon: Heart, title: 'Health & Wellbeing', description: 'Comprehensive health insurance, wellness programs, and work-life balance initiatives for all employees.' },
  { icon: Globe, title: 'Global Exposure', description: 'Work with international clients across 40+ countries and gain experience in global pharmaceutical markets.' },
  { icon: Users, title: 'Team Culture', description: 'Collaborative, inclusive environment where diverse perspectives are valued and innovation thrives.' },
  { icon: Shield, title: 'Stability & Impact', description: 'Be part of a growing company making a real impact on global healthcare through quality API manufacturing.' },
]

export default function CareersPage() {
  const benefitsRef = useRef<HTMLElement>(null)
  const benefitsInView = useInView(benefitsRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Careers</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Careers
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Join our team and help shape the future of pharmaceutical manufacturing
          </motion.p>
        </Container>
      </section>

      {/* ─── Why Join Hema ─── */}
      <section ref={benefitsRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={benefitsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Why Hema</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Why Join Hema Pharmaceuticals?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-gray-500">
              We offer more than just a job — we offer a career in an industry that makes a real difference in people&apos;s lives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{b.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── Open Positions ─── */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Opportunities</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Open Positions</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We are always looking for talented individuals who share our passion for quality and innovation in pharmaceutical manufacturing. If you believe you can contribute to our mission, we&apos;d love to hear from you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-brand-400 mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Send Us Your CV</h3>
              <p className="mt-2 text-gray-500 text-sm">
                Share your resume and a cover letter telling us about your experience and why you&apos;d like to join Hema Pharmaceuticals.
              </p>
              <a
                href="mailto:careers@hemapharma.com"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3 text-base font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.98]"
              >
                <Mail className="h-4 w-4" />
                careers@hemapharma.com
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ─── Application CTA ─── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(90deg, #008cc9 0%, #006a9e 100%)' }}>
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Ready to Make an Impact?</h2>
              <p className="mt-4 text-lg text-white/80 mx-auto max-w-xl">
                Join a team that&apos;s dedicated to improving global health through pharmaceutical innovation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:careers@hemapharma.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-700 transition-all hover:bg-gray-100 hover:shadow-md active:scale-[0.98]"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
