import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import CV from './pages/CV'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cv" element={<CV />} />
    </Routes>
  )
}
