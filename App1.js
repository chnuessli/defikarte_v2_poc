import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UeberDieDefikarte from './pages/UeberDieDefikarte';
import AEDInfo from './pages/AEDInfo';
import DieApp from './pages/DieApp';

import AddDefi from './pages/AddDefi';
import Formular from './pages/Formular/Formular';

/**
 * 
 * @returns Funktionsfähige Navigation 
 */
function App1() {


  return (
 
    <Router>
      <Navbar />
      
      <Routes>
        <Route path='/Home' exact element={<Home/>} />
        <Route path='/UeberDieDefikarte' element={<UeberDieDefikarte/>} />
        <Route path='/AEDInfo' element={<AEDInfo/>} />
        <Route path='/DieApp' element={<DieApp/>} />

        <Route path='/AddDefi' element={<AddDefi/>} />
        <Route path='/Formular/Formular' element={<Formular/>} />
        
      </Routes>
    </Router>
    )
}

export default App1;
