import React from 'react'
import { useState } from 'react';
import { Button, Colors, InputGroup, Intent } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import axios from 'axios'
import './settingspage.css'


export const SettingsPage = (props) => {
  
  let {loggedInUsername, setLoggedInUsername } = props; 
  const [newUsername, setNewUsername] = useState(loggedInUsername);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(null); // init to empty string
  const [errorMsg, setErrorMsg] = useState(null); // init to empty string
  const USERNAME_ENDPOINT = `http://localhost:5001/update_username` 
  const PASSWORD_ENDPOINT = `http://localhost:5001/update_password` 


  
  // Post username then password to express backend if updated
  function updateSettings(e){
    e.preventDefault() // Don't refresh form on submit
    updateUsername().then(() => updatePassword())   // Use .then() to ensure that username updates before password
  }
  
  async function updateUsername() {
    try{
      axios.post(USERNAME_ENDPOINT, {
        loggedInUsername,
        newUsername,
      }).then((response) => {
          // response.data holds a message string and an error boolean
          if(response.data.error) {
            setErrorMsg(response.data.message)
          } else {
            setLoggedInUsername(newUsername)
            setErrorMsg(null);
          }
      });
    } catch(error){
        console.log('Yo something went wrong with the name: %s', error)
    }
  }
  
 async function updatePassword() {
    //Try to post password
    try{
      axios.post(PASSWORD_ENDPOINT, {
        newUsername,
        newPassword,
      }).then((response) => {
          // response.data holds a message string and an error boolean
          if(response.data.error) {
            setErrorMsg(response.data.message);
          } else {
            setErrorMsg(null);
          }
      });
  } catch(error){
      console.log('Yo something went wrong with the password: %s', error)
    }
  }

  

  // Functions for lock icon next to password field
  function handleLockClick() {
    setShowPassword(!showPassword);
  }

  const lockButton = (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`}
              placement="right"
              >
        <Button
            className="lock"
            icon={showPassword ? "unlock" : "lock"}
            intent={Intent.WARNING}
            minimal={true}
            onClick={handleLockClick}
            />
    </Tooltip2>
);



  return (
    <div className="settingsBody">
      <h1>Account Info</h1>
      <form> 
        <InputGroup className="username"
                    placeholder="Username"
                    onChange={(e) => 
                      setNewUsername(e.target.value)}
                    defaultValue={loggedInUsername}
                    
                    />
        <InputGroup className="password"
                    placeholder="Password"
                    rightElement={lockButton}
                    onChange={(e) => setNewPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    />
        <Button className="accountSubmitButton"
                onClick={ e => {
                  updateSettings(e);
                }}> Update Account </Button>
        <div style={{
          color: Colors.RED1,
          marginTop: "5px"
        }}>{errorMsg}</div>
      </form>
    </div>
  )
} 