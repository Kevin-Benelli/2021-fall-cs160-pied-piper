import React from 'react'
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import logo from '../pics/logo.png';
import { Login } from './login';
import './header.css'

export const Header = () => {
  return (
    <div className="center">
      <div className="header">
        <Navbar className="header-navbar">
          <NavbarGroup align={ Alignment.LEFT }>
            <img src={logo} className="header-logo" alt="logo" />
          </NavbarGroup>
          
          <NavbarGroup align={ Alignment.RIGHT }>
            <Login/>
          </NavbarGroup>
          
        </Navbar>
      </div>
    </div>
  )
} 