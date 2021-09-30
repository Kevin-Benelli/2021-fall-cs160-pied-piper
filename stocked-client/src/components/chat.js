import React from 'react'
import { useState, useEffect } from 'react'


export const Chat = ({socket, username, chatroom}) => {
    const [userMessage, setUserMessage] = useState("");
    const [messageLog, setMessageLog] = useState([]);


    const sendMessage = async () => {
      // If user drafts a message then set message for emission
      if (userMessage !== ""){
        // messageData provides more details about message like time
        const messageData = {
          chatroom: chatroom, // stores specific chatroom
          author: username, // maps message to user name
          message: userMessage, // sets messsage to message drafted
           // gets time stamp by hours and minutes
          time: 
          new Date(Date.now()).getHours() + 
          ":" + 
          new Date(Date.now()).getMinutes() + 
          ":" + 
          new Date(Date.now()).getSeconds(),
        };

        // Wait for message to be sent before continuing to move forward so make it asyncronous
        // emits message data object to messaging server
        await socket.emit("send_message", messageData);   
        
        // When we send a message we store our message in the chat log
        setMessageLog((prevMessageLog) => [...prevMessageLog, messageData])
      }
    };

    // Listens to whenever there is a change in socket server
    useEffect(() => {
      // listen to receive_message event and create call back function to handle message on client
      // grab data from backend (data)
      socket.on("receive_message", (data) => {
        console.log(data);
        // whenever someone emmit a message it sets message log to what ever it was before plus the new message
        setMessageLog((prevMessageLog) => [...prevMessageLog, data])
      });
      
      
    }, [socket]);

    return( 
    
    <div> 
      <div className="chat-room-header"> 
        <p> Live Chat Room for { chatroom.toUpperCase() } </p>
      </div>
      
      
      <div className="chat-room-body"> 
        {
          // for each element in message list return <h1> message </h1>
          messageLog.map((messageContent) => {
            return (

              // access ids: user-self and user-other to sytle the user respectivley. 
              // user-self should be left centered and user-other should be on right
              <div className="message" id={username === messageContent.author ? "user-self" : "user-other"}> 
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="sender_time">{messageContent.author} Sent: {messageContent.time}</p>
                </div>
                
                </div>
              </div>
            );
          })}

      </div>
      
      
      <div className="chat-room-footer">
        <input 
        type="text" 
        placeholder="Lets Talk Stocks..."
        onChange={(event) => {
          setUserMessage(event.target.value)
        }}
        onKeyPress={(event) => {
          // If user types message and presses enter then send the message
          event.key === "Enter" && sendMessage()
        }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        {/*  &#9658; is a message send icon button */}
      </div>
    </div>
    
    )
  
} 