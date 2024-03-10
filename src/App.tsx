import './App.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wynik from "./pages/Wynik";
import Form from "./pages/Form";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/form' Component={Form} />
          <Route path='/wynik' Component={Wynik} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
