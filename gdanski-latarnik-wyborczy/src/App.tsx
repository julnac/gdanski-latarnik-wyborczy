// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from "./components/Nav"
import Home from './pages/Home';
import Ankieta from './pages/Ankieta';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/ankieta' Component={Ankieta} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
