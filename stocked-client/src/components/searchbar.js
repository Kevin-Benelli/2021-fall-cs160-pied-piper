import React from 'react'
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import { Button, InputGroup, Intent } from '@blueprintjs/core';
import './searchbar.css'

export const SearchBar = () => {
  return (
    <div className="center">
      <div className="search">
        <Navbar className="search-navbar">  
          <NavbarGroup align={ Alignment.RIGHT }>
          <InputGroup className="search-bar"
                    placeholder="Search Bar"
                    />
          </NavbarGroup>
          
        </Navbar>
      </div>
    </div>
  )
} 