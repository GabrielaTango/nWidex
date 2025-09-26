import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import { Presupuesto } from './components/Presupuesto/Presupuesto'
import { NavBar } from './components/NavBar'
import { Login } from './components/Login'
import { Home } from './components/Home'
import PrivateRoutes from './PrivateRoutes'

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/home" element={<Home />} />
              <Route path="/presupuesto" element={<Presupuesto />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
