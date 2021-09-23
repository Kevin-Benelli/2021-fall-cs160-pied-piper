import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  HashRouter,
  Route
} from "react-router-dom";
import { Header } from './components/header';
import { ChartPage } from './components/chartpage';

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
        
          <HashRouter basename="/2021-fall-cs160-pied-piper">

            {/* all routes that look like /ticker/xyz will be handled by the ChartPage component */}
            <Route path="/ticker/:ticker" children={<ChartPage/>} />

          </HashRouter>
      </div>
    </div>
  );
}

export default App;
