import './App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
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
    <Router>
      <div className="center">
      <div className="App">
        <Header/>
        {homePage}
        
          <Switch>

            {/* all routes that look like /ticker/xyz will be handled by the ChartPage component */}
            <Route path="/2021-fall-cs160-pied-piper/ticker/:ticker" children={<ChartPage/>} />

          </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
