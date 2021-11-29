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
import { useStickyState } from 'utils/storage';
import { SocketClient } from 'components/socketclient';
import { HelpPage } from 'components/helppage';


function App() {
  
  const [homePage, setHomePage] = useState("")

  useEffect(() => {
    axios.get("http://localhost:5001/home").then((response) => {
      setHomePage(response.data)
    })
  }, []);

  const [loggedInUsername, setLoggedInUsername] = useStickyState(null, "username");

  return (
    
      <div className="center">
        <div className="App">
          <HashRouter basename="/2021-fall-cs160-pied-piper">
            <Header loggedInUsername={loggedInUsername}
                    setLoggedInUsername={setLoggedInUsername}/>
            {/* { loggedInUsername && 
              <div>
                This div shows when a user is logged in. ${loggedInUsername}
              </div>
            }
            { !loggedInUsername && 
              <div>
                This div shows when there's no logged in user.
              </div>
            } */}
        
          

            {/* all routes that look like /ticker/xyz will be handled by the ChartPage component */}
            <Route path="/" children={homePage} />
            <Route path="/ticker/:ticker" children={<ChartPage/>} />
            <Route path="/settings" children={<SettingsPage loggedInUsername={loggedInUsername} setLoggedInUsername={setLoggedInUsername}/>}/>
            <Route path="/chat" children={<SocketClient />}/>
            <Route path="/help" children={<HelpPage />}/>

            {/* <Route path="/news/:ticker" component={<NewsPage} /> */}


          </HashRouter>
      </div>
    </div>
  );
}

export default App;
