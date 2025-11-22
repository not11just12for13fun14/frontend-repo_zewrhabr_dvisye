import { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import SessionBoard from '../components/SessionBoard'

function useQuery() {
  return new URLSearchParams(window.location.search)
}

function NewSession() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const q = useQuery()
  const pid = q.get('pid')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const createFromProblem = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem_id: pid, auto_generate_steps: true })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setSession(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const refresh = async () => {
    const res = await fetch(`${baseUrl}/api/sessions/${session.id}`)
    if (res.ok) setSession(await res.json())
  }

  useEffect(() => {
    if (pid) createFromProblem()
  }, [pid])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        {loading && <div className="text-blue-200">Creating session...</div>}
        {error && <div className="text-red-400">{error}</div>}
        {session && (
          <div className="space-y-6">
            <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
              <h1 className="text-2xl font-bold text-white mb-1">{session.problem_title}</h1>
              <div className="text-blue-300/80">{session.problem_description}</div>
            </div>
            <SessionBoard session={session} onRefresh={refresh} />
          </div>
        )}
      </main>
    </div>
  )
}

export default NewSession
