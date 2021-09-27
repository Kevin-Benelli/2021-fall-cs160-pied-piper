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
import { SettingsPage } from './components/settingspage';
import { SearchBar } from './components/searchbar';
import { useStickyState } from 'utils/storage';


function App() {
  
  const [homePage, setHomePage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5000/home").then((response) => {
      setHomePage(response.data)
    })
  }, []);

  const [loggedInUsername, setLoggedInUsername] = useStickyState(null, "username");

  return (
    
      <div className="center">
      <div className="App">
        <Header loggedInUsername={loggedInUsername}
                setLoggedInUsername={setLoggedInUsername}/>
        {homePage}
        { loggedInUsername && 
          <div>
            This div shows when a user is logged in.
          </div>
        }
        { !loggedInUsername && 
          <div>
            This div shows when there's no logged in user.
          </div>
        }
        
          <HashRouter basename="/2021-fall-cs160-pied-piper">

            {/* all routes that look like /ticker/xyz will be handled by the ChartPage component */}
            <Route path="/ticker/:ticker" children={<ChartPage/>} />
            <Route path="/settings" children={<SettingsPage />}/>
            
            <Route path="/search" children={<SearchBar />}/>

            {/* <Route path="/news/:ticker" component={<NewsPage} /> */}


          </HashRouter>
      </div>
    </div>
  );
}

export default App;
