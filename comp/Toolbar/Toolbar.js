import React from 'react';
import DrawerToggleButton from '../DrawerToogleButton/DrawerToggleButton';
import './Toolbar.css';
import test from './test.png'

//import './Toolbar.css'

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
        <a href="index.html"><img src={test} alt="" width="100"/></a>
        </div>
      <div className="spacer" />
      <div className="toolbar_navigation-items">
        <ul>
          <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/">Über die Defikarte</a>
        </li>
        <li>
          <a href="/">Die App</a>
        </li>
        <li>
          <a href="/">AED Info</a>
        </li>
        <li>
          <a href="/">Sponsoren</a>
        </li>
        <li>
          <a href="/">Impressum & Datenschutz</a>
        </li>
        </ul>
      </div>
    </nav>
  </header>
)

export default toolbar