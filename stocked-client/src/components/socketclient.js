import React from 'react'

import { io } from 'socket.io-client'
import { useState } from 'react'
import { Chat } from './chat'
const ENDPOINT = "http://localhost:5000";
const socket = io(ENDPOINT);

export const SocketClient = () => {
  const [userName, setUsername] = useState("");
  const [chatRoom, setChatRoom] = useState("");

  // function emit socket event to join room. 
  const joinRoom = () => {
    // GET HASHSET AND CHECK IF CHATROOM TICKER EXISTS IN TICKER SET; ELSE ERROR MESSAGE
    if(userName !== "" && chatRoom !== ""){
      socket.emit("join_chat_room", chatRoom.toUpperCase());
    }
  };

  return (
    <div className="center">
      <div>
      <h3> Join Stocked Chat Room Now! </h3>
        <input 
        type="text" 
        placeholder="Enter Name" 
        onChange={(event) => {
          setUsername(event.target.value);
        }}/>
        <input 
        type="text" 
        placeholder="Enter Ticker" 
        onChange={(event) => {
          setChatRoom(event.target.value);
        
        }}/>
        
        <button onClick={joinRoom}> Join Chat Room </button>        

        {/* We call our chat component and pass in the socket
        We also want to keep track of the username and chat room being used so we pass that in as pops */}
        <Chat socket={socket} username={userName} chatroom={chatRoom}/>
      </div>
    </div>
  )
} 