import React from 'react'

import { io } from 'socket.io-client'
import { useState } from 'react'


export const Chat = ({socket, username, chatroom}) => {
    <div> 
      <div className="chat-room-header"> 
        {/* Room: {chatroom} */} hello
      </div>
      
      
      <div className="chat-room-body"> 
      
      </div>
      
      
      <div className="chat-room-footer">
         
        <input type="text" placeholder="Yo..." />
        
      </div>
    </div>

    return(<div>hello

      {/* {socket, username, chatroom} */}
    </div>)
  
} 