import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProblemForm from '../components/ProblemForm'

function Home() {
  const [problems, setProblems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const loadProblems = async () => {
    const res = await fetch(`${baseUrl}/api/problems`)
    if (res.ok) setProblems(await res.json())
  }

  useEffect(() => { loadProblems() }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <section className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Describe a problem</h2>
          <p className="text-blue-200/80 mb-6">Tell the assistant what you want to solve. You’ll get a guided plan.</p>
          <ProblemForm onCreate={() => loadProblems()} />
        </section>
        <section>
          <h3 className="text-xl font-semibold text-white mb-3">Recent problems</h3>
          <div className="space-y-3">
            {problems.map(p => (
              <a key={p.id} href={`/session/new?pid=${p.id}`} className="block bg-slate-800/60 border border-slate-700 rounded-lg p-4 hover:border-blue-500/40 transition-colors">
                <div className="text-white font-medium">{p.title}</div>
                <div className="text-blue-300/70 text-sm line-clamp-2">{p.description}</div>
              </a>
            ))}
            {!problems.length && <div className="text-blue-200/80 text-sm">No problems yet. Create your first one.</div>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
