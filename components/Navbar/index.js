import React, { useState } from 'react';
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink,NavLinkImg } from './NavbarElements';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import { SidebarData } from './SidebarData';
import image from '../../images/defi_logo.png'


/**
 * 
 * @returns Toggel Navigation and horizontal Navigation
 */
const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (


    <Nav>
      <NavLinkImg to="/Home">
        <img src={image}  style={{width:"80px",height:"50px",}} />
      </NavLinkImg>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={()=>{
              showSidebar();
              const element= document.getElementById('MapBox');
              element.style.display='none';

            }} />
          </Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className="nav-menu-items" onClick={
            ()=>{
              showSidebar();
              const element= document.getElementById('MapBox');
              element.style.display='block';

            }
          }>


            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}


          </ul>
        </nav>
      </IconContext.Provider>
      <NavMenu>
        <NavLink to="/Home">
          Home
        </NavLink>
        <NavLink to="/UeberDieDefikarte" activestyle="true">
          Über die Defikarte
        </NavLink>
        <NavLink to="/DieApp" activestyle="true">
          Die App
        </NavLink>
        <NavLink to="/AEDInfo" activestyle="true">
          AED Info
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/Formular/Formular">Neuen Standort melden</NavBtnLink>
      </NavBtn>
    </Nav>



  );
};

export default Navbar;