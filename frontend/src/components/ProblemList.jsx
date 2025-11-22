import React, { useEffect, useState } from 'react'

export default function ProblemList({ onAsk }) {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState({ tag: '', difficulty: '' })
  const [loading, setLoading] = useState(true)

  const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  async function load() {
    setLoading(true)
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (filter.tag) params.set('tag', filter.tag)
    if (filter.difficulty) params.set('difficulty', filter.difficulty)
    const res = await fetch(`${API}/api/problems?${params.toString()}`)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <section id="problems" className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <input placeholder="Search" value={q} onChange={e=>setQ(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white" />
        <select value={filter.difficulty} onChange={e=>setFilter(v=>({...v, difficulty: e.target.value}))} className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white">
          <option value="">All</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={load} className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white">Apply</button>
      </div>

      {loading ? (
        <div className="text-blue-200/80">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-blue-200/80">No problems yet. Create one above.</div>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {items.map(p => (
            <li key={p.id} className="bg-slate-800/60 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold">{p.title}</h3>
                <span className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-200/80">{p.difficulty}</span>
              </div>
              <p className="mt-2 text-blue-200/80 text-sm line-clamp-3">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.tags || []).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-blue-200/80">#{t}</span>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={()=>onAsk?.(p)} className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm">Ask AI Guidance</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
