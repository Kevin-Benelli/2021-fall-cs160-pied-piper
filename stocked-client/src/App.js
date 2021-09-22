import logo from './pics/logo.png';
import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState("") // init to empty string
  const [homePage, setHomePage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/home").then((response) => {
      setHomePage(response.data)
    })
  }, [])
  // Function posts name to express backend
  async function postName(e){
      e.preventDefault() // don't refresh form on submit

      try{
          await axios.post("http://localhost:5000/post_name", {
              name
          })
      }catch(error){
          console.log('Yo something went wrong: %s', error)
      }
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <form onSubmit ={postName}> 
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <button type="submit"> Send Your First Name To Post To The Backend</button>
        </form>


        {homePage}
      </header>
      
    </div>
  );
}

export default App;
