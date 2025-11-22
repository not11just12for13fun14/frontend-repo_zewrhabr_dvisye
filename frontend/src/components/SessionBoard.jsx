import { useEffect, useState } from 'react'

function StepItem({ step, index, onUpdate }) {
  const [status, setStatus] = useState(step.status)
  const [note, setNote] = useState(step.note || '')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onUpdate(index + 1, { status, note })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-blue-200/80">Step {index + 1}</div>
        <select value={status} onChange={e => setStatus(e.target.value)} className="text-sm bg-slate-900 border border-slate-700 text-blue-100 rounded px-2 py-1">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <p className="text-blue-100 mb-3">{step.text}</p>
      {step.note && <p className="text-xs text-blue-300/70 italic mb-3">Tip: {step.note}</p>}
      <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Add notes..." className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-blue-100 mb-3" />
      <button onClick={handleSave} className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded disabled:opacity-60" disabled={saving}>
        {saving ? 'Saving...' : 'Save' }
      </button>
    </div>
  )
}

function SessionBoard({ session, onRefresh }) {
  const [sending, setSending] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const updateStep = async (stepIndex, payload) => {
    const res = await fetch(`${baseUrl}/api/sessions/${session.id}/steps/${stepIndex}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Update failed')
    await onRefresh()
  }

  const regenerate = async () => {
    setSending(true)
    try {
      await fetch(`${baseUrl}/api/sessions/${session.id}/steps/generate`, { method: 'POST' })
      await onRefresh()
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Guidance</h3>
        <button onClick={regenerate} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded disabled:opacity-60" disabled={sending}>
          {sending ? 'Generating...' : 'Regenerate' }
        </button>
      </div>
      {session.steps?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {session.steps.map((s, i) => (
            <StepItem key={i} step={s} index={i} onUpdate={updateStep} />
          ))}
        </div>
      ) : (
        <div className="text-blue-200/80 text-sm">No steps yet. Click Regenerate to create an action plan.</div>
      )}
    </div>
  )
}

export default SessionBoard
