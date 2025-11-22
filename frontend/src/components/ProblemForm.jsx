import { useState } from 'react'

function ProblemForm({ onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [difficulty, setDifficulty] = useState('medium')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/problems`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, category, difficulty })
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      onCreate?.(data)
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div>
        <label className="block text-blue-200 text-sm mb-1">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 text-white" placeholder="e.g., Two Sum with constraints" required />
      </div>
      <div>
        <label className="block text-blue-200 text-sm mb-1">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} className="w-full bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 text-white" placeholder="Describe the problem you want to solve..." required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-blue-200 text-sm mb-1">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 text-white">
            <option value="general">General</option>
            <option value="coding">Coding</option>
            <option value="math">Math</option>
            <option value="writing">Writing</option>
          </select>
        </div>
        <div>
          <label className="block text-blue-200 text-sm mb-1">Difficulty</label>
          <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 text-white">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>
      <button disabled={loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-4 py-2 rounded-md">
        {loading ? 'Creating...' : 'Create Problem'}
      </button>
    </form>
  )
}

export default ProblemForm
