import React from 'react'
import { Button, Intent } from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import './userdropdown.css';
import { clearLocalStorageItem } from 'utils/storage';

export const UserDropdown = (props) => {
  let { loggedInUsername, setLoggedInUsername } = props;

  function logout(e) {
    setLoggedInUsername(null);
  }

  let dropdown = (
    <div className="userdropdown center">
      <Button className="logout"
                onClick={ logout }> Logout </Button><br/>
      To be continued
    </div>
  );

  return (
    <Popover2 placement="bottom" content={ dropdown } >
      <Button intent={Intent.PRIMARY} icon="user" text={ loggedInUsername } tabIndex={0} />
    </Popover2>
  )
}
