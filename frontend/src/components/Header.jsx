import { Link, NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 grid place-items-center text-white font-bold">S</div>
          <span className="text-white font-semibold tracking-tight">Solvix</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/" className={({isActive}) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-slate-800'}`}>Home</NavLink>
          <NavLink to="/problems" className={({isActive}) => `px-3 py-1.5 rounded-md ${isActive ? 'bg-blue-600 text-white' : 'text-blue-200 hover:bg-slate-800'}`}>Problems</NavLink>
          <a href="/test" className="px-3 py-1.5 rounded-md text-blue-200 hover:bg-slate-800">Diagnostics</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
