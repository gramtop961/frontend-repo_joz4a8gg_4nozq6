import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch(`${API_BASE}/api/products?page=${page}&limit=12&sort=most_sustainable`)
        const data = await r.json()
        setProducts((prev) => [...prev, ...data.items])
        setTotal(data.total)
      } catch {}
    }
    run()
  }, [page])

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Featured gear</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p, idx) => <Card key={idx} p={p} />)}
        </div>
        {products.length < total && (
          <div className="mt-8 text-center">
            <button onClick={() => setPage((n) => n + 1)} className="px-5 py-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-white hover:border-emerald-400/50">Load more</button>
          </div>
        )}
      </div>
    </section>
  )
}

function Card({ p }) {
  return (
    <div className="group rounded-xl overflow-hidden bg-slate-800/60 border border-slate-700/50 hover:border-emerald-400/50">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={p.images?.[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition"/>
      </div>
      <div className="p-3">
        <div className="text-white font-medium line-clamp-1">{p.name}</div>
        <div className="text-emerald-300 font-semibold">
          {p.sale_price ? (
            <>
              <span>${p.sale_price.toFixed(2)}</span>
              <span className="text-slate-400 line-through ml-2">${p.price.toFixed(2)}</span>
            </>
          ) : <span>${p.price.toFixed(2)}</span>}
        </div>
        <div className="text-xs text-slate-400 mt-1">{p.rating} ★ ({p.review_count}) • <span className="text-emerald-300">{p.sustainability?.[0]}</span></div>
        <button className="mt-3 w-full px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white">Add to cart</button>
      </div>
    </div>
  )
}
