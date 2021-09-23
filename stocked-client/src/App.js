import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Header } from './components/header';

function App() {
  
  const [homePage, setHomePage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/home").then((response) => {
      setHomePage(response.data)
    })
  }, []);

  return (
    <div className="center">
      <div className="App">
        <Header/>
        {homePage}
      </div>
    </div>
  );
}

export default App;
