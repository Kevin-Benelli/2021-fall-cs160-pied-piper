import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Button, InputGroup, Intent } from '@blueprintjs/core';
import { Placement, Popover2, Tooltip2 } from '@blueprintjs/popover2';
import { Colors } from "@blueprintjs/core";
import './login.css';
import { setLocalStorageItem } from 'utils/storage';

export const Login = (props) => {
  let { setLoggedInUsername } = props;

  const [username, setUsername] = useState(""); // init to empty string
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(""); // init to empty string
  const [errorMsg, setErrorMsg] = useState(null); // init to empty string


  // Post username and password for login/account creation to express backend
  async function postAction(e, action){
    e.preventDefault() // don't refresh form on submit
    try{
        axios.post(`http://localhost:5001/post_${action}`, {
          username,
          password
        }).then((response) => {
            // response.data holds a message string and an error boolean
            if(response.data.error) {
              setErrorMsg(response.data.message);
            } else {
              setErrorMsg(null);
              setLoggedInUsername(username)
            }
        });
    }catch(error){
        console.log('Yo something went wrong: %s', error)
    }
  }

  function handleLockClick() {
    setShowPassword(!showPassword);
  }

  const lockButton = (
    <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`}
              placement="right"
              >
        <Button
            icon={showPassword ? "unlock" : "lock"}
            intent={Intent.WARNING}
            minimal={true}
            onClick={handleLockClick}
            />
    </Tooltip2>
);

  let login = (
    <div className="login center">
      <form> 
        <InputGroup className="username"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    />
        <InputGroup className="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    rightElement={lockButton}
                    type={showPassword ? "text" : "password"}
                    />
        <Button className="login-submit"
                onClick={ e => {
                  postAction(e, "login");
                }}> Login </Button>
        <Button className="create-account-submit"
                onClick={ e => {
                  postAction(e, "create_account");
                }}> Create Account </Button>
        <div style={{
            color: Colors.RED1,
            marginTop: "5px"
          }}>{errorMsg}</div>
      </form>
    </div>
  );

  return (
    <Popover2 placement="bottom" content={ login } >
      <Button intent={Intent.PRIMARY} icon="log-in" text="Login" tabIndex={0} />
    </Popover2>
  )
}