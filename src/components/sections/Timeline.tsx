'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion'
import { Container } from '@/components/ui/Container'

const milestones = [
  { year: 2012, description: 'Embarked on the production of API intermediates' },
  { year: 2015, description: 'Proudly began production of Active Pharmaceutical Ingredients' },
  { year: 2017, description: 'Received GMP certification for quality and compliance' },
  { year: 2020, description: 'Manufacturing standards recognized with WHO-GMP Standard' },
  { year: 2021, description: 'Constructed a new GMP Manufacturing block' },
  { year: 2022, description: 'Production capacity increased to 257 Metric Tonnes' },
  { year: 2023, description: 'Strengthened R&D and QA capacities for developing and filing DMFs' },
  { year: 2024, description: 'Written Confirmation received from The Central Drugs Standard Control Organisation' },
  { year: 2025, description: 'CEP and EU-GMP certification achieved' },
]

/* --- Desktop: Horizontal scroll timeline (receives scrollYProgress from parent) --- */
function DesktopTimeline({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-52%'])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div className="hidden lg:block">
      {/* Progress bar */}
      <div className="relative mx-auto mb-10 h-1 max-w-5xl overflow-hidden rounded-full bg-brand-100">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-brand-500"
          style={{ width: progressWidth }}
        />
      </div>

      {/* Horizontal rail */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-12 px-8"
          style={{ x }}
        >
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="relative flex w-[260px] shrink-0 flex-col items-center text-center"
            >
              {/* Connecting line */}
              {i < milestones.length - 1 && (
                <div className="absolute top-5 left-[calc(50%+20px)] h-0.5 w-[calc(260px-8px)] bg-brand-100" />
              )}
              {/* Node dot */}
              <div
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-400 bg-white"
                style={{ boxShadow: '0 0 0 4px rgba(2,132,199,0.12)' }}
              >
                <div className="h-2 w-2 rounded-full bg-brand-500" />
              </div>
              {/* Year + Description card */}
              <div
                className="mt-4 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-md border border-white/80"
                style={{ boxShadow: '0 2px 12px rgba(14,64,143,0.06)' }}
              >
                <span className="text-2xl font-bold text-[#0c2d6b]">{m.year}</span>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* --- Mobile: Vertical timeline --- */
function MobileTimeline() {
  return (
    <div className="relative pl-8 lg:hidden">
      <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-brand-100" />
      {milestones.map((m, i) => (
        <MobileNode key={m.year} milestone={m} index={i} />
      ))}
    </div>
  )
}

function MobileNode({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative pb-10 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="absolute -left-5 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand-400 bg-white"
        style={{ boxShadow: '0 0 0 4px rgba(2,132,199,0.12)' }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      </div>
      <div
        className="mt-1 rounded-xl px-4 py-3 bg-white/60 backdrop-blur-md border border-white/80"
        style={{ boxShadow: '0 2px 12px rgba(14,64,143,0.06)' }}
      >
        <span className="text-xl font-bold text-[#0c2d6b]">{milestone.year}</span>
        <p className="mt-1 text-sm leading-relaxed text-gray-600">{milestone.description}</p>
      </div>
    </motion.div>
  )
}

/* --- Main Section --- */
export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress spans the full tall container — starts the moment the
  // section top hits the viewport top, ends when the bottom leaves
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      {/* ── Desktop: tall scroll-driver, sticky inner content ── */}
      <div ref={containerRef} className="hidden lg:flex" style={{ height: '400vh' }}>
        <div className="sticky top-0 h-screen w-full bg-white flex flex-col justify-center py-16">
          <Container>
            {/* Header */}
            <div className="mb-14 text-center">
              <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
                Our Journey
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
                A Decade of Growth
              </h2>
            </div>
            <DesktopTimeline scrollYProgress={scrollYProgress} />
          </Container>
        </div>
      </div>

      {/* ── Mobile: normal vertical layout, unaffected by sticky ── */}
      <section className="py-16 bg-white lg:hidden">
        <Container>
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold tracking-widest text-brand-500 uppercase">
              Our Journey
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0c2d6b] md:text-4xl">
              A Decade of Growth
            </h2>
          </div>
          <MobileTimeline />
        </Container>
      </section>
    </>
  )
}
