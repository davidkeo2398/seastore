import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { env } from './config/config'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './common/Layout'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
