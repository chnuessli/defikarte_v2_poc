import React from 'react'

import './SideDrawer.css'

const sideDrawer = props => {
    let drawerClasses = 'side-drawer'
    if (props.show) {
      drawerClasses = 'side-drawer open'
    }
    return (
      <nav className={drawerClasses}>
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
      </nav>
    )
  }

export default sideDrawer