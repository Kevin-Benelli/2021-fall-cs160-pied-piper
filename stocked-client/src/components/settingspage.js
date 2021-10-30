import React from 'react'
import { useState } from 'react';
import { Button, Colors, InputGroup, Intent } from '@blueprintjs/core';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import axios from 'axios'
import './settingspage.css'


export const SettingsPage = (props) => {
  
  let {loggedInUsername, setLoggedInUsername } = props; 
  const [newUsername, setNewUsername] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null); // init to empty string
  const [errorMsg, setErrorMsg] = useState(null); // init to empty string

  async function updateSettings(e){
    e.preventDefault() // don't refresh form on submit
    try{
      let newValues = {
        username: newUsername,
        password: password,
        } 
        axios.post(`http://localhost:5001/post_update_account`, {
          usernameToUpdate: loggedInUsername,
          newValues: newValues,
        }).then((response) => {
            // response.data holds a message string and an error boolean
            if(response.data.error) {
              setErrorMsg(response.data.message);
            } else {
              setErrorMsg(null);
              if(newValues.username)
                setLoggedInUsername(newUsername)
            }
        });
    }catch(error){
        console.log('Yo something went wrong: %s', error)
    }
  }

  return (
    <div className="settings">
      <h1>Account Info</h1>
      <form> 
        <InputGroup className="username"
                    placeholder="Username"
                    onChange={(e) => setNewUsername(e.target.value)}
                    defaultValue={loggedInUsername}
                    
                    />
        <InputGroup className="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    />
        <Button className="update-account-submit"
                onClick={ e => {
                  updateSettings(e);
                }}> Update Info </Button>
        <div style={{
          color: Colors.RED1,
          marginTop: "5px"
        }}>{errorMsg}</div>
      </form>
    </div>
  )
} 