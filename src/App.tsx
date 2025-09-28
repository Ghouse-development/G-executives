import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Materials from './pages/Materials'
import TestPage from './pages/TestPage'
import Categories from './pages/Categories'
import Executives from './pages/Executives'
import Progress from './pages/Progress'
import QuestionGenerator from './pages/QuestionGenerator'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="materials" element={<Materials />} />
        <Route path="test" element={<TestPage />} />
        <Route path="categories" element={<Categories />} />
        <Route path="executives" element={<Executives />} />
        <Route path="progress" element={<Progress />} />
        <Route path="generate" element={<QuestionGenerator />} />
      </Route>
    </Routes>
  )
}

export default App