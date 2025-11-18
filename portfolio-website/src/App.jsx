import { useState } from 'react'
import './App.css'
import ParticleCanvas from './component/BackgroundParticles'
import Hero from './pages/Hero'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ParticleCanvas/>
      <Hero/>
    </>
  )
}

export default App
