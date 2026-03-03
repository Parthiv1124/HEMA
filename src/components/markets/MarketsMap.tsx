'use client'

import { useState, memo, useCallback } from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker,
} from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import { markets, regions, type Market, type Region } from './marketsData'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ─── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipProps {
    market: Market
    x: number
    y: number
}

const Tooltip = memo(function Tooltip({ market, x, y }: TooltipProps) {
    return (
        <motion.div
            key={market.country}
            initial={{ opacity: 0, scale: 0.9, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 6 }}
            transition={{ duration: 0.15 }}
            className="pointer-events-none fixed z-50"
            style={{ left: x, top: y, transform: 'translate(-50%, -110%)' }}
        >
            <div
                className="min-w-[180px] max-w-[240px] rounded-xl border border-white/10 px-4 py-3 shadow-2xl"
                style={{
                    background: 'rgba(15, 23, 42, 0.85)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                }}
            >
                <p className="text-sm font-semibold text-sky-400">{market.country}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                    {market.region}
                </p>
                <p className="mt-2 text-xs leading-snug text-slate-300">{market.description}</p>
            </div>
        </motion.div>
    )
})

// ─── Animated Marker ────────────────────────────────────────────────────────
interface MarkerPinProps {
    market: Market
    onEnter: (m: Market, x: number, y: number) => void
    onLeave: () => void
    delay: number
}

const MarkerPin = memo(function MarkerPin({ market, onEnter, onLeave, delay }: MarkerPinProps) {
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => onEnter(market, e.clientX, e.clientY),
        [market, onEnter],
    )

    return (
        <Marker coordinates={market.coordinates}>
            <g onMouseEnter={handleMouseEnter} onMouseLeave={onLeave} style={{ cursor: 'pointer' }}>
                {/* Core glowing dot — blue */}
                <motion.circle
                    r={4}
                    fill="#008cc9"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay }}
                    style={{
                        filter: 'drop-shadow(0 0 5px #008cc9) drop-shadow(0 0 10px #38bdf888)',
                    }}
                />
            </g>
        </Marker>
    )
})

// ─── Region Filter ───────────────────────────────────────────────────────────
interface FilterBarProps {
    active: Region
    onChange: (r: Region) => void
}

const FilterBar = memo(function FilterBar({ active, onChange }: FilterBarProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2">
            {regions.map((r) => (
                <button
                    key={r}
                    onClick={() => onChange(r)}
                    className={[
                        'relative rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200',
                        active === r
                            ? 'text-white'
                            : 'border border-white/10 text-slate-400 hover:border-sky-400/40 hover:text-sky-400',
                    ].join(' ')}
                >
                    {active === r && (
                        <motion.span
                            layoutId="pill"
                            className="absolute inset-0 rounded-full bg-sky-500"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )}
                    <span className="relative">{r}</span>
                </button>
            ))}
        </div>
    )
})

// ─── Main Component ──────────────────────────────────────────────────────────
export default function MarketsMap() {
    const [activeRegion, setActiveRegion] = useState<Region>('All')
    const [tooltip, setTooltip] = useState<{ market: Market; x: number; y: number } | null>(null)

    const visibleMarkets =
        activeRegion === 'All' ? markets : markets.filter((m) => m.region === activeRegion)

    const handleEnter = useCallback((market: Market, x: number, y: number) => {
        setTooltip({ market, x, y })
    }, [])

    const handleLeave = useCallback(() => setTooltip(null), [])

    const handleRegion = useCallback((r: Region) => {
        setTooltip(null)
        setActiveRegion(r)
    }, [])

    return (
        <div className="relative w-full select-none">
            {/* Region Filter */}
            <FilterBar active={activeRegion} onChange={handleRegion} />

            {/* Map */}
            <motion.div
                className="relative mt-8 overflow-hidden rounded-2xl"
                style={{ background: '#0f172a' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <ComposableMap
                    projectionConfig={{ scale: 147, center: [10, 10] }}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <Geographies geography={GEO_URL}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: { fill: '#1e293b', stroke: '#0f172a', strokeWidth: 0.5, outline: 'none' },
                                        hover: { fill: '#1e293b', stroke: '#0f172a', strokeWidth: 0.5, outline: 'none' },
                                        pressed: { fill: '#1e293b', stroke: '#0f172a', strokeWidth: 0.5, outline: 'none' },
                                    }}
                                />
                            ))
                        }
                    </Geographies>

                    <AnimatePresence mode="popLayout">
                        {visibleMarkets.map((m, i) => (
                            <MarkerPin
                                key={m.country}
                                market={m}
                                onEnter={handleEnter}
                                onLeave={handleLeave}
                                delay={i * 0.06}
                            />
                        ))}
                    </AnimatePresence>
                </ComposableMap>

                {/* Bottom fade gradient */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{
                        background: 'linear-gradient(to top, #0f172a 0%, transparent 100%)',
                    }}
                />
            </motion.div>

            {/* Tooltip portal */}
            <AnimatePresence>
                {tooltip && (
                    <Tooltip market={tooltip.market} x={tooltip.x} y={tooltip.y} />
                )}
            </AnimatePresence>

            {/* Legend */}
            <div className="mt-6 flex items-center justify-center gap-2">
                <span
                    className="inline-block h-2.5 w-2.5 rounded-full bg-sky-400"
                    style={{ filter: 'drop-shadow(0 0 4px #008cc9)' }}
                />
                <span className="text-xs text-slate-400">API delivery markets</span>
            </div>
        </div>
    )
}
