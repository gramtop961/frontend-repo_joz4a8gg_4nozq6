import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 400], [0, 120])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.4])

  return (
    <section className="relative h-[80vh] md:h-[90vh] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://cdn.coverr.co/videos/coverr-camping-by-the-lake-8494/1080p.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-label="EcoTrail Gear in nature"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"/>
      <motion.div style={{ y, opacity }} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-emerald-300 font-semibold tracking-widest uppercase">Sustainable Outdoor Equipment</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-white max-w-4xl leading-tight">
          Gear up for your next adventure without compromising the planet
        </h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#shop" className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium">Shop gear</a>
          <a href="#learn" className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium">Learn more</a>
        </div>
        <div className="mt-10 grid grid-cols-3 gap-6">
          <TrustBadge label="B Corp"/>
          <TrustBadge label="1% for the Planet"/>
          <TrustBadge label="Climate Neutral"/>
        </div>
      </motion.div>
    </section>
  )
}

function TrustBadge({ label }) {
  return (
    <div className="px-4 py-2 rounded-full bg-white/10 text-white text-sm border border-white/20">{label}</div>
  )
}
