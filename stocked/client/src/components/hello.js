import React from 'react'
import { useState, useEffect } from 'react';

export const Hello = () => {
    return (<div> Bruhhhhh From Hello Component</div>)

    // useEffect(() => {

    // })
}




// state = {
//     data: null
//   };


//   useEffect(() => {
//     this.callBackendAPI()
//       .then(res => this.setState({ data: res.express }))
//       .catch(err => console.log(err));
//   },
//     // fetching the GET route from the Express server which matches the GET route from server.js
//   callBackendAPI = async () => {
//     const response = await fetch('/express_backend');
//     const body = await response.json();

//     if (response.status !== 200) {
//       throw Error(body.message) 
//     }
//     return body;
//   }

