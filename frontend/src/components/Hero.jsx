import React from 'react'

export default function Hero({ onCreateClick }) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
          Solvix
        </h1>
        <p className="mt-4 text-blue-200/80 text-lg">
          A problem-solving workspace with AI guidance. Create problems, ask questions, and get step-by-step hints.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button onClick={onCreateClick} className="px-5 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow">
            Create Problem
          </button>
          <a href="#problems" className="px-5 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold">
            Browse Problems
          </a>
        </div>
      </div>
    </section>
  )
}
