import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ImpactCounter() {
  const [metrics, setMetrics] = useState({ trees_planted: 0, bottles_recycled: 0, carbon_offset_kg: 0 })

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch(`${API_BASE}/api/impact`)
        const data = await r.json()
        setMetrics(data)
      } catch {}
    }
    run()
  }, [])

  return (
    <section className="py-12 bg-slate-900/60 border-t border-b border-slate-700/40">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <Metric label="Trees Planted" value={metrics.trees_planted} suffix=""/>
        <Metric label="Plastic Bottles Recycled" value={metrics.bottles_recycled}/>
        <Metric label="Carbon Offset" value={metrics.carbon_offset_kg} suffix=" kg"/>
      </div>
    </section>
  )
}

function formatNumber(n) {
  return new Intl.NumberFormat().format(n)
}

function Metric({ label, value, suffix = '' }) {
  return (
    <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50">
      <div className="text-3xl md:text-4xl font-extrabold text-emerald-400">{formatNumber(value)}{suffix}</div>
      <div className="mt-1 text-slate-300">{label}</div>
    </div>
  )
}
