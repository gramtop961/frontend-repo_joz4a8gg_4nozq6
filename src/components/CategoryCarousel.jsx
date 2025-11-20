import { useEffect, useRef } from 'react'
import { Tent, Mountain, Sun } from 'lucide-react'

const categories = [
  { key: 'camping', title: 'Carbon-Neutral Camping Equipment', desc: 'Sleep, cook, and explore with minimized footprint', icon: Tent, color: 'from-emerald-500 to-teal-400' },
  { key: 'hiking', title: 'Recycled Material Hiking Gear', desc: 'High performance layers and packs made from waste', icon: Mountain, color: 'from-lime-400 to-emerald-400' },
  { key: 'energy', title: 'Renewable Energy Outdoor Accessories', desc: 'Power your adventure with the sun and wind', icon: Sun, color: 'from-amber-400 to-orange-500' },
]

export default function CategoryCarousel() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let isDown = false; let startX = 0; let scrollLeft = 0
    const mdown = (e) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft }
    const mup = () => { isDown = false }
    const move = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; const walk = (x - startX) * 1.2; el.scrollLeft = scrollLeft - walk }
    el.addEventListener('mousedown', mdown); el.addEventListener('mouseleave', mup); el.addEventListener('mouseup', mup); el.addEventListener('mousemove', move)
    return () => { el.removeEventListener('mousedown', mdown); el.removeEventListener('mouseleave', mup); el.removeEventListener('mouseup', mup); el.removeEventListener('mousemove', move) }
  }, [])

  return (
    <section className="py-12" id="shop">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Shop our sustainable collections</h2>
        <div ref={ref} className="flex gap-6 overflow-x-auto scrollbar-hide snap-x">
          {categories.map((c) => <CategoryCard key={c.key} {...c} />)}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ title, desc, icon: Icon, color }) {
  return (
    <div className="min-w-[280px] md:min-w-[360px] snap-center">
      <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-emerald-400/50 transition group">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} grid place-items-center mb-4`}>
          <Icon className="w-6 h-6 text-slate-900"/>
        </div>
        <div className="text-white font-semibold text-lg">{title}</div>
        <div className="text-slate-300 mt-1">{desc}</div>
        <button className="mt-4 inline-flex items-center text-emerald-300 hover:text-emerald-200">Explore →</button>
      </div>
    </div>
  )
}
