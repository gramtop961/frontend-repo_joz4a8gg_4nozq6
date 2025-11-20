import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ImpactCounter from './components/ImpactCounter'
import CategoryCarousel from './components/CategoryCarousel'
import ProductGrid from './components/ProductGrid'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <ImpactCounter />
        <CategoryCarousel />
        <ProductGrid />
        <Footer />
      </main>
    </div>
  )
}

function Footer(){
  return (
    <footer className="border-t border-slate-700/40 py-12 bg-slate-900/60">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-300">
        <div>
          <div className="text-white font-semibold mb-3">Shop</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Camping</a></li>
            <li><a href="#">Hiking</a></li>
            <li><a href="#">Accessories</a></li>
            <li><a href="#">Gift cards</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Learn</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Trail Academy</a></li>
            <li><a href="#">Sustainability reports</a></li>
            <li><a href="#">Care guides</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">About</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Our story</a></li>
            <li><a href="#">Certifications</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <div className="text-white font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Shipping info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Repair services</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-slate-500">© {new Date().getFullYear()} EcoTrail Gear — Built with sustainability in mind</div>
    </footer>
  )
}

export default App