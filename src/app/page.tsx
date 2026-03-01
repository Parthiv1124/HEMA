import {
  HeroHome,
  StatsSection,
  AboutPreview,
  ProductHighlights,
  Timeline,
  CertificationGrid,
  GlobalReachPreview,
  PartnerLogos,
  CTABanner,
} from '@/components/sections'

export default function HomePage() {
  return (
    <main>
      <HeroHome />
      <StatsSection />
      <AboutPreview />
      <ProductHighlights />
      <Timeline />
      <CertificationGrid />
      <GlobalReachPreview />
      <PartnerLogos />
      <CTABanner />
    </main>
  )
}
