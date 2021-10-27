import React, { useState } from 'react'
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import logo from '../pics/logo.png';
import { Login } from './login';
import './header.css'
import { UserDropdown } from './userdropdown';
import { SearchBar } from './searchbar';
import { NavLink } from 'react-router-dom';

export const Header = (props) => {
  let { loggedInUsername, setLoggedInUsername } = props;

  return (
    <div className="center">
      <div className="header">
        <Navbar className="header-navbar">
          <NavbarGroup align={ Alignment.LEFT }>
            <NavLink to="/">
              <img src={logo} className="header-logo" alt="logo" />
            </NavLink>
          </NavbarGroup>

          <NavbarGroup align={ Alignment.RIGHT }>
            <SearchBar/>
            { loggedInUsername && 
              <UserDropdown loggedInUsername={loggedInUsername}
                            setLoggedInUsername={setLoggedInUsername}/>
            }
            { !loggedInUsername &&
              <Login setLoggedInUsername={setLoggedInUsername}/>
            }
          </NavbarGroup>
          
        </Navbar>
      </div>
    </div>
  )
} 