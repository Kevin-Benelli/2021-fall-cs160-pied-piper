import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { Button, InputGroup, Intent } from '@blueprintjs/core';
import { Placement, Popover2, Tooltip2 } from '@blueprintjs/popover2';
import './login.css';

export const Login = () => {

  const [username, setUsername] = useState(""); // init to empty string
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(""); // init to empty string


  // Post username and password for login/account creation to express backend
  async function postAction(e, action){
    e.preventDefault() // don't refresh form on submit

    console.log(e)
    console.log(action)

    try{
        await axios.post(`http://localhost:5000/post_${action}`, {
            username,
            password
        })
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
                onClick={ e => {;
                  postAction(e, "login");
                }}> Login </Button>
        <Button className="create-account-submit"
                onClick={ e => {
                  postAction(e, "create_account");
                }}> Create Account </Button>
      </form>
    </div>
  );

  return (
    <Popover2 placement="bottom" content={ login } >
      <Button intent={Intent.PRIMARY} icon="log-in" text="Login" tabIndex={0} />
    </Popover2>
  )
}