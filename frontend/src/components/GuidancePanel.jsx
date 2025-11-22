import React, { useState } from 'react'

export default function GuidancePanel({ problem, onClose }) {
  const [userQuery, setUserQuery] = useState('')
  const [hint, setHint] = useState('')
  const [loading, setLoading] = useState(false)
  const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  async function ask() {
    if (!userQuery) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/attempts/guidance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem_id: problem.id, user_query: userQuery })
      })
      const data = await res.json()
      setHint(data.next_hint)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-blue-500/20 p-4 md:p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold">AI Guidance • {problem.title}</h3>
          <button onClick={onClose} className="text-blue-200/70 hover:text-white">Close</button>
        </div>
        <p className="mt-2 text-blue-200/80 text-sm">Ask a question about this problem. You'll get a focused hint to move forward.</p>
        <div className="mt-4 flex gap-2">
          <input value={userQuery} onChange={e=>setUserQuery(e.target.value)} placeholder="Describe where you're stuck..." className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white" />
          <button onClick={ask} disabled={loading} className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60">{loading ? 'Thinking...' : 'Ask'}</button>
        </div>
        {hint && (
          <div className="mt-4 p-4 rounded-lg bg-slate-800 border border-slate-700 text-blue-100 text-sm leading-relaxed">
            {hint}
          </div>
        )}
      </div>
    </div>
  )
}
