import React from 'react'
import { Button, Intent } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import './userdropdown.css';
import { clearLocalStorageItem } from 'utils/storage';
import {
  HashRouter,
  Route,
  NavLink
} from "react-router-dom";

export const UserDropdown = (props) => {
  let { loggedInUsername, setLoggedInUsername } = props;

  function logout(e) {
    setLoggedInUsername(null);
  }


  let dropdown = (
    <div className="userdropdown center">

      <HashRouter basename="/">

      { /* Creates the settings button and goes back home */ }
      <NavLink to = {'/'}>
        <Button>Home</Button><br/>
      </NavLink>

      { /* Creates the settings button and goes to the settings page */ }
      <NavLink to = {'/settings'}>
        <Button>Settings</Button><br/>
      </NavLink>

      { /* Creates the chat button and goes to the chat page */ }
      <NavLink to = {'/chat'}>
        <Button>Chat</Button><br/> 
      </NavLink>

      <Button className="mystery" // ???
                onClick={ event => window.location.href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" }> FREE BITCOIN CLICK HERE!! </Button><br/>

      <Button className="logout" // Creates the logout button
                onClick={ logout }> Logout </Button><br/>
      To be continued
      </HashRouter>
    </div>
  );

  return (
    <Popover2 placement="bottom" content={ dropdown } >
      <Button intent={Intent.PRIMARY} icon="user" text={ loggedInUsername } tabIndex={0} />
    </Popover2>
  )
}
