'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronDown, Globe, MapPin, TrendingUp, Package, Users } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import dynamic from 'next/dynamic'

const MarketsMap = dynamic(() => import('@/components/markets/MarketsMap'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] items-center justify-center rounded-2xl bg-slate-900">
      <span className="text-sm text-slate-500">Loading map…</span>
    </div>
  ),
})

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}


const regions = [
  {
    name: 'Latin America',
    icon: '🌎',
    countries: [
      { name: 'Brazil', details: 'Major API import market with ANVISA registration' },
      { name: 'Mexico', details: 'Growing pharmaceutical formulations market' },
      { name: 'Peru', details: 'DIGEMID-registered API exports' },
      { name: 'Uruguay', details: 'Specialty API supply partner' },
      { name: 'Chile', details: 'ISP-registered pharmaceutical exports' },
      { name: 'Paraguay', details: 'Regional distribution hub' },
      { name: 'Guatemala', details: 'Central American market access' },
      { name: 'Argentina', details: 'ANMAT-compliant API exports' },
    ],
  },
  {
    name: 'Africa',
    icon: '🌍',
    countries: [
      { name: 'Kenya', details: 'East African formulation partner' },
      { name: 'Uganda', details: 'NDA-registered API supplies' },
      { name: 'Egypt', details: 'CAPA-registered Middle East gateway' },
    ],
  },
  {
    name: 'Middle East',
    icon: '🕌',
    countries: [
      { name: 'Saudi Arabia', details: 'SFDA-compliant API exports for GCC market' },
    ],
  },
  {
    name: 'Europe',
    icon: '🇪🇺',
    countries: [
      { name: 'Germany', details: 'EU-GMP certified supply for European market' },
      { name: 'Switzerland', details: 'Specialty API and intermediate supply' },
      { name: 'Spain', details: 'CEP-registered API exports' },
      { name: 'Russia', details: 'GMP-certified pharmaceutical exports' },
    ],
  },
  {
    name: 'Asia',
    icon: '🌏',
    countries: [
      { name: 'South Korea', details: 'MFDS-registered API supply' },
      { name: 'China', details: 'NMPA-compliant API exports' },
      { name: 'Indonesia', details: 'BPOM-registered API supply' },
      { name: 'Vietnam', details: 'DAV-registered pharmaceutical APIs' },
      { name: 'Philippines', details: 'FDA Philippines-compliant exports' },
      { name: 'Thailand', details: 'Thai FDA-registered API supply' },
      { name: 'Bangladesh', details: 'DGDA-registered API exports' },
      { name: 'Uzbekistan', details: 'Central Asian market access' },
    ],
  },
]

const exportStats = [
  { icon: Globe, value: '40+', label: 'Countries Served' },
  { icon: Package, value: '257 MT', label: 'Annual Export Capacity' },
  { icon: Users, value: '100+', label: 'Global Partners' },
  { icon: TrendingUp, value: '5', label: 'Continents Reached' },
]

function CollapsibleRegion({ region, index }: { region: typeof regions[0]; index: number }) {
  const [open, setOpen] = useState(index === 0)
  return (
    <motion.div
      className="rounded-xl border border-gray-200 bg-white overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{region.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{region.name}</h3>
          <span className="text-sm text-gray-400">({region.countries.length} countries)</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {region.countries.map((country) => (
                  <div key={country.name} className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                    <MapPin className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{country.name}</p>
                      <p className="text-xs text-gray-500">{country.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function GlobalReachPage() {
  const statsRef = useRef<HTMLElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Global Reach</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Global Presence
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Exporting high-quality APIs from Ankleshwar, Gujarat to 40+ international markets across 5 continents
          </motion.p>
        </Container>
      </section>

      {/* ─── World Map ─── */}
      <section className="bg-navy-900 py-16 md:py-24">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Our Global Footprint</h2>
            <p className="mt-3 text-gray-300 max-w-xl mx-auto">
              Highlighted regions represent our active markets — hover any marker to see details.
            </p>
          </div>
          <MarketsMap />
        </Container>
      </section>

      {/* ─── Markets by Region ─── */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Markets</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Markets by Region</h2>
            </div>
          </Reveal>

          <div className="space-y-4 max-w-3xl mx-auto">
            {regions.map((region, i) => (
              <CollapsibleRegion key={region.name} region={region} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Export Statistics ─── */}
      <section ref={statsRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Export Statistics</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Our Global Impact</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {exportStats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 mb-4">
                    <Icon className="h-7 w-7 text-brand-500" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{stat.value}</div>
                  <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden py-20" style={{ background: 'linear-gradient(90deg, #008cc9 0%, #006a9e 100%)' }}>
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Partner With Us for Your Region</h2>
              <p className="mt-4 text-lg text-white/80 mx-auto max-w-xl">
                Interested in distributing our APIs in your market? Let&apos;s discuss how we can support your business.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-brand-700 transition-all hover:bg-gray-100 hover:shadow-md active:scale-[0.98]">
                  Become a Partner
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}
