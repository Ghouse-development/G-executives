import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Materials from './pages/Materials'
import TestPage from './pages/TestPage'
import Executives from './pages/Executives'
import TestSelection from './pages/TestSelection'
import TestTypeSelection from './pages/TestTypeSelection'
import Documents from './pages/Documents'
import ComprehensiveTest from './pages/ComprehensiveTest'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="materials" element={<Materials />} />
        <Route path="test" element={<TestPage />} />
        <Route path="test-type" element={<TestTypeSelection />} />
        <Route path="test-selection" element={<TestSelection />} />
        <Route path="executives" element={<Executives />} />
        <Route path="documents" element={<Documents />} />
        <Route path="comprehensive-test" element={<ComprehensiveTest />} />
      </Route>
    </Routes>
  )
}

export default App