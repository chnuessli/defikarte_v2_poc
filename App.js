import React, { useState } from 'react';
import Main from './Main';
import './index.css';
import SearchBox from './SearchBox';
import Maps from './Maps';

import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UeberDieDefikarte from './pages/UeberDieDefikarte';
import AEDInfo from './pages/AEDInfo';
import DieApp from './pages/DieApp';




/**
 * 
 * @returns Webkarte mit allen Markern
 */
export default function App() {
  const [selectPosition, setSelectPosition] = useState(null);
  return (
    <div id='MapBox' style={{ padding: "0px" }}>

      <div className="innerMap" style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        margin: "0",
        padding: "0",

      }}>
        <div style={{ width: "100%", height: "90vh" }}>
          <Maps selectPosition={selectPosition} />
          <div className="box" >
            <SearchBox selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
          </div>
        </div>


      </div>
    </div>
  );

}


