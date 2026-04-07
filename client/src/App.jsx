import React from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Gallery from './pages/Gallery';
import Money from './pages/Money';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import Impact from './pages/Impact';
import DonateBlood from './pages/DonateBlood';

const App = () => {
  return (
    <Routes>
      <Route path = '/' element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/gallery' element={<Gallery />} />
      
      <Route 
        path='/donateBlood' 
       element={<DonateBlood />}/>

      <Route path='/money' element={<Money />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/admin-panel' element={<AdminPanel />} />
      <Route path='/impact' element={<Impact />} />
    </Routes>
  )
}

export default App