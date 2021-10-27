import React from 'react'
import "./socketclient.css"
import { io } from 'socket.io-client'
import { useState } from 'react'
import { Chat } from './chat'
const ENDPOINT = "http://localhost:5001";
const socket = io(ENDPOINT);

export const SocketClient = () => {
  const [userName, setUsername] = useState("");
  const [chatRoom, setChatRoom] = useState("");
  const [showChatBox, setShowChatBox] = useState(false);


  // function emit socket event to join room. 
  const joinRoom = () => {
    // GET HASHSET AND CHECK IF CHATROOM TICKER EXISTS IN TICKER SET; ELSE ERROR MESSAGE
    if(userName !== "" && chatRoom !== ""){
      socket.emit("join_chat_room", chatRoom);
      setShowChatBox(true);
    }
  };

  return (
    <div className="center">
      {/* If chat box is not displayed show enter chat room; else show chat box */}
      {!showChatBox ? (
        <div className="joinChatRoom">
          <h3> Join Stocked Chat Room Now! </h3>
            <input 
            className="joinChatInputField"
            type="text" 
            placeholder="Enter Name" 
            onChange={(event) => {
              setUsername(event.target.value.toUpperCase());
            }}/>
            <input 
            className="joinChatInputField"
            type="text" 
            placeholder="Enter Ticker" 
            onChange={(event) => {
              setChatRoom(event.target.value.toUpperCase());
            
            }}/>
            
            <button className="joinChatRoomButton" onClick={joinRoom}> Join Chat Room </button>        
        </div>
      ) : (
        // Call our chat component and pass in the socket
        // Keep track of the username and chat room being used so we pass that in as pops
          <Chat socket={socket} username={userName} chatroom={chatRoom}/>
      )}
        
    </div>
  );
} 