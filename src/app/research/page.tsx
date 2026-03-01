'use client'

import { useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  ChevronRight, FlaskConical, Microscope, FileText, Timer, TrendingUp,
  ChevronDown, ChevronUp
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { CTABanner } from '@/components/sections/CTABanner'
import { getAllProducts } from '@/lib/products'

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

const rdAreas = [
  { icon: FlaskConical, title: 'Process Development', description: 'Route scouting, optimization, and cost-effective synthesis route identification for new and existing APIs.' },
  { icon: Microscope, title: 'Analytical Method Development', description: 'Development and validation of analytical methods per ICH guidelines for in-house testing and regulatory submissions.' },
  { icon: FileText, title: 'DMF Filing', description: 'Comprehensive Drug Master File preparation and filing with major regulatory authorities worldwide.' },
  { icon: Timer, title: 'Stability Studies', description: 'ICH-compliant accelerated and long-term stability programs to support shelf-life claims and regulatory approvals.' },
  { icon: TrendingUp, title: 'Scale-Up Optimization', description: 'Systematic transfer of lab-scale processes to pilot and production scale with process analytical technology.' },
]

export default function ResearchPage() {
  const products = getAllProducts()
  const dmfProducts = products.filter((p) => p.dmfStatus)
  const pipelineProducts = products.filter((p) => p.category === 'development')

  const [sortField, setSortField] = useState<'name' | 'casNumber' | 'dmfStatus'>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const sortedDmf = useMemo(() => {
    return [...dmfProducts].sort((a, b) => {
      const aVal = a[sortField] ?? ''
      const bVal = b[sortField] ?? ''
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
  }, [dmfProducts, sortField, sortDir])

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else { setSortField(field); setSortDir('asc') }
  }

  const SortIcon = ({ field }: { field: typeof sortField }) => {
    if (sortField !== field) return <ChevronDown className="h-3 w-3 opacity-30" />
    return sortDir === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
  }

  const overviewRef = useRef<HTMLElement>(null)
  const overviewInView = useInView(overviewRef, { once: true, margin: '-10%' })
  const areasRef = useRef<HTMLElement>(null)
  const areasInView = useInView(areasRef, { once: true, margin: '-10%' })
  const dmfRef = useRef<HTMLElement>(null)
  const dmfInView = useInView(dmfRef, { once: true, margin: '-10%' })
  const pipelineRef = useRef<HTMLElement>(null)
  const pipelineInView = useInView(pipelineRef, { once: true, margin: '-10%' })

  return (
    <main>
      {/* ─── Hero ─── */}
      <section className="gradient-hero py-20 pt-32">
        <Container>
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Research & Development</span>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Research & Development
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mt-4 max-w-2xl text-lg text-white/80">
            Driving innovation through process development, analytical excellence, and regulatory expertise
          </motion.p>
        </Container>
      </section>

      {/* ─── R&D Overview ─── */}
      <section ref={overviewRef} className="bg-white py-16 md:py-24">
        <Container size="lg">
          <motion.div className="mx-auto max-w-3xl text-center" initial={{ opacity: 0, y: 20 }} animate={overviewInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Innovation Hub</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">R&D Capabilities</h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-lg">
              Our state-of-the-art R&D laboratory is equipped with advanced analytical instruments including HPLC, GC, FTIR, UV-Vis spectrophotometers, and dissolution apparatus. Our team of experienced scientists drives continuous improvement in process efficiency, product quality, and regulatory compliance.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* ─── Key R&D Areas ─── */}
      <section ref={areasRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} animate={areasInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Key Focus Areas</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rdAreas.map((area, i) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={area.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={areasInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * i }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                    <Icon className="h-6 w-6 text-brand-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{area.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{area.description}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ─── DMF Filing Status ─── */}
      <section ref={dmfRef} className="bg-white py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={dmfInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Regulatory</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">DMF Filing Status</h2>
            <p className="mt-2 text-gray-500">Products with active Drug Master File submissions</p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-xl border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={dmfInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 cursor-pointer select-none" onClick={() => toggleSort('name')}>
                    <span className="flex items-center gap-1">Product <SortIcon field="name" /></span>
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 cursor-pointer select-none" onClick={() => toggleSort('casNumber')}>
                    <span className="flex items-center gap-1">CAS Number <SortIcon field="casNumber" /></span>
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 cursor-pointer select-none" onClick={() => toggleSort('dmfStatus')}>
                    <span className="flex items-center gap-1">DMF Status <SortIcon field="dmfStatus" /></span>
                  </th>
                  <th className="py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                </tr>
              </thead>
              <tbody>
                {sortedDmf.map((p, i) => (
                  <tr key={p.slug} className={`border-b border-gray-100 last:border-0 ${i % 2 ? 'bg-gray-50/50' : 'bg-white'} hover:bg-brand-50/30 transition-colors`}>
                    <td className="py-3 px-4">
                      <Link href={`/products/${p.slug}`} className="font-medium text-gray-900 hover:text-brand-500 transition-colors">{p.name}</Link>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm text-gray-500">{p.casNumber}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success" size="sm">{p.dmfStatus}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 capitalize">{p.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </Container>
      </section>

      {/* ─── Pipeline / Under Development ─── */}
      <section ref={pipelineRef} className="bg-gray-50 py-16 md:py-24">
        <Container>
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={pipelineInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">Pipeline</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Under Development</h2>
            <p className="mt-2 text-gray-500">Molecules currently in our R&D pipeline</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pipelineProducts.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={pipelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="group block rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-200"
                >
                  <Badge variant="gold" size="sm" className="mb-3">In Development</Badge>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                  <p className="mt-1 font-mono text-xs text-gray-500">{p.casNumber}</p>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{p.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner />
    </main>
  )
}
