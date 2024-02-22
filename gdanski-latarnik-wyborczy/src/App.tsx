// import { useState } from 'react'
import './App.css'
import Nav from "./components/Nav"
import Hero from "./components/Hero"
import Onas from './components/Onas'
import FAQ from './components/FAQ'
import Kontakt from './components/Kontakt'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
        <Nav />
        <Hero />
        <Onas />
        <FAQ />
        <Kontakt />
    </>
  )
}

export default App
