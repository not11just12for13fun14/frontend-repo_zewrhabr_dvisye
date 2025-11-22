import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NewSession from './pages/NewSession'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/session/new" element={<NewSession />} />
    </Routes>
  )
}

export default App
