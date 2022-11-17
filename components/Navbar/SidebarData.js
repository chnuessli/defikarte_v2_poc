import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
/**
 * @returns Array von Elementen für die aufgeklappte Navigationleiste der mobilen Version
 */

export const SidebarData = [
  {
    title: 'HOME',
    path: "/index",
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'ÜBER DIE DEFIKARTE',
    path: "/about",
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'DIE APP',
    path: "/DieApp",
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'AED INFO',
    path: '/AEDInfo',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'SPONSOREN',
    path: "/signup",
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'NEUEN Standort MELDEN',
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Kontakt',
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }

];
