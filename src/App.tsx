// import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Ankieta from './pages/Ankieta';
import Wynik from './pages/Wynik';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/ankieta' Component={Ankieta} />
          <Route path='/wynik' Component={Wynik} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
