'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/* ─── Particle Field ─── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  driftX: number
  driftY: number
  duration: number
  delay: number
}

function ParticleField() {
  const reduced = useReducedMotion()

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.2,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -20,
    }))
  }, [])

  if (reduced) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white will-change-transform"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Word-staggered Headline ─── */
const headlineWords = ['Unwavering', 'Quality,', 'Unmatched', 'Consistency']

function AnimatedHeadline() {
  return (
    <h1 className="text-5xl leading-tight font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
      {headlineWords.map((word, i) => (
        <motion.span
          key={word}
          className="mr-[0.3em] inline-block last:mr-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.4 + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}

/* ─── Trust Badges ─── */
const trustBadges = ['WHO-GMP', 'CDSCO', 'ISO 9001', 'ISO 14001', 'CEP', 'EU-GMP']

/* ─── Scroll Indicator ─── */
function ScrollIndicator() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      style={{ opacity }}
    >
      <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
        Scroll to explore
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5 text-gray-400" />
      </motion.div>
    </motion.div>
  )
}

/* ─── Main Hero Component ─── */
export function HeroHome() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden pb-28"
      style={{ background: 'linear-gradient(135deg, #1e40af 0%, #0369a1 40%, #0ea5e9 100%)' }}
    >
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-20 text-center sm:px-6">
        {/* Eyebrow */}
        <motion.p
          className="mb-6 text-sm font-semibold tracking-widest text-brand-400 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          WHO-GMP Certified API Manufacturer
        </motion.p>

        {/* Headline */}
        <AnimatedHeadline />

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Leading manufacturer of sterile injectable grade APIs, serving 40+
          international markets with WHO-GMP certified excellence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link href="/products">
            <Button variant="primary" size="lg">
              Explore Products
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="mt-12 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl bg-white/6 px-6 py-3 backdrop-blur-md border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {trustBadges.map((badge, i) => (
            <span key={badge} className="flex items-center gap-3">
              <span className="text-xs font-medium tracking-wider text-gray-400 uppercase transition-colors hover:text-brand-400">
                {badge}
              </span>
              {i < trustBadges.length - 1 && (
                <span className="text-gray-600">·</span>
              )}
            </span>
          ))}
        </motion.div>

        {/* Glass Certification Strip */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <span className="h-px w-12 bg-white/20" />
          <span className="text-xs font-medium tracking-widest text-white/40 uppercase">
            Ankleshwar, Gujarat · Est. 2012
          </span>
          <span className="h-px w-12 bg-white/20" />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
