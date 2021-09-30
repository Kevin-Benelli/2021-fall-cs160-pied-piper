import React from 'react'

import { io } from 'socket.io-client'
import { useState, useEffect } from 'react'


export const Chat = ({socket, username, chatroom}) => {
    const [message, setMessage] = useState("");
    
    const sendMessage = async () => {
      // If user drafts a message then set message for emission
      if (message !== ""){
        // messageData provides more details about message like time
        const messageData = {
          chatroom: chatroom.toUpperCase(), // stores specific chatroom
          author: username, // maps message to user name
          message: message, // sets messsage to message drafted
           // gets time stamp by hours and minutes
          time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        };

        // Wait for message to be sent before continuing to move forward so make it asyncronous
        // emits message data object to messaging server
        await socket.emit("send_message", messageData)        
      }
    }

    // Listens to whenever there is a change in socket server
    useEffect(() => {
      // listen to receive_message event and create call back function to handle message on client
      // grab data from backend (data)
      socket.on("receive_message", (data) => {
        
      })
      
    }, [socket]);

    return( 
    
    <div> 
      <div className="chat-room-header"> 
        <p> Live Chat Room for { chatroom.toUpperCase() } </p>
      </div>
      
      
      <div className="chat-room-body"> </div>
      
      
      <div className="chat-room-footer">
        <input 
        type="text" 
        placeholder="Lets Talk Stocks..."
        onChange={(event) => {
          setMessage(event.target.value)
        }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        {/*  &#9658; is a message send icon button */}
      </div>
    </div>
    
    )
  
} 