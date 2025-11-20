import { useEffect, useRef, useState } from 'react'
import { Search, User, Heart, ShoppingCart, MessageCircle, Menu } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Navbar({ onQueryChange }) {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [sticky, setSticky] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    const run = async () => {
      if (!q) { setSuggestions([]); return }
      try {
        const r = await fetch(`${API_BASE}/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal })
        const data = await r.json()
        setSuggestions(data)
      } catch (e) {
        // ignore
      }
    }
    const t = setTimeout(run, 150)
    return () => { clearTimeout(t); controller.abort() }
  }, [q])

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all ${sticky ? 'backdrop-blur bg-slate-900/70 border-b border-slate-700/40 py-2' : 'bg-transparent py-4'}`}>
      <nav className="mx-auto max-w-7xl px-4 flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-white/5 lg:hidden" aria-label="Open menu"><Menu className="w-5 h-5 text-slate-100"/></button>
        <a href="#" className="flex items-center gap-2">
          <img src="/logo.svg" alt="EcoTrail Gear" className="w-8 h-8"/>
          <span className="text-xl font-bold text-emerald-300 tracking-tight">EcoTrail Gear</span>
        </a>
        <div className="relative hidden md:flex items-center flex-1 max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-300 absolute left-3"/>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); onQueryChange?.(e.target.value) }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search products, categories, articles, trails"
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-800/70 border border-slate-600/40 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
            aria-label="Search"
          />
          {open && suggestions?.length > 0 && (
            <div role="listbox" className="absolute top-full mt-2 w-full bg-slate-900/95 border border-slate-700/50 rounded-xl shadow-xl overflow-hidden">
              {suggestions.map((s, i) => (
                <button key={i} role="option" onMouseDown={() => { setQ(s.label); setOpen(false) }} className="w-full text-left px-4 py-2 hover:bg-white/5 text-slate-100">
                  <span className="text-emerald-300 mr-2 uppercase text-xs tracking-wide">{s.type}</span>{s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button className="p-2 rounded-md hover:bg-white/5" aria-label="Account"><User className="w-5 h-5 text-slate-100"/></button>
          <button className="p-2 rounded-md hover:bg-white/5" aria-label="Wishlist"><Heart className="w-5 h-5 text-slate-100"/></button>
          <button className="relative p-2 rounded-md hover:bg-white/5" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-slate-100"/>
            <span className="absolute -top-1 -right-1 text-[10px] bg-emerald-500 text-white rounded-full px-1.5 py-0.5">2</span>
          </button>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white" aria-label="Chat support"><MessageCircle className="w-4 h-4"/> Chat</button>
        </div>
      </nav>
    </header>
  )
}
