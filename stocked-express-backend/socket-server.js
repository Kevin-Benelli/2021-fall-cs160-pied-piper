const express = require('express'); 
const app = express(); 
const cors = require("cors");
const finnhub = require('finnhub');
const port = 5001 // localhost 5001
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

var bcrypt = require('bcryptjs'); // Hash passwords
var saltRounds = 10;

// Socket.io is requried for chatting service
const { Server } = require("socket.io")
const http = require("http")


// Instantiate socket server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // identify what server is calling our socket.io server (setting to reactJS local dev server)
    // origin: "http://localhost:3000", // grats permission to accept socket communication with this url
    origin: "*", // grats permission to accept socket communication with this url
    mathods: ["GET", "POST"],
  },
});

// Listen for socket event to be recieved: listens for event with name "connection"
io.on("connection", (socket) =>{
  console.log(`User Connected: ${socket.id}`); // should console.log the id of the user

  // listens and passes chat room id to socket // this is passed through at the client level
  socket.on("join_chat_room", (data) => {
      socket.join(data);
      console.log(`User ID: ${socket.id} joined the chat room: ${data}`)
  });

  // listens for message data to be emitted from client side (Chat.js) / creates event send_message
  socket.on("send_message", (data) => {
      // Emits messages you send to all other uses in the chatRoom
      socket.to(data.chatroom).emit("receive_message", data);
      console.log(data);
      
  });

  // disconnect from the server at the end
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});





//Creating a database and connection
const mysql = require("mysql");
const e = require('express');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootuser",
  database: "stocked"
});


// Password requirements for account creation and password update
function password_invalid(password) {
  if(password.length < 5 ||
     !password.match(/[a-z]/g) ||
     !password.match(/[A-Z]/g) ||
     !password.match(/[0-9]/g))
     return true;
  return false;
}


// server.get("/", cors(), async(req, res) => {
//   res.send("Yah boi is workin")
// })

app.post("/post_login", async(req, res) => {
  let { username, password } = req.body

  console.log("/post_login");
  console.log("Express received: ", req.body) 
  
  // Checking if the username and hashed password exists in the database
  // If the login is correct, we return the username. Otherwise, we return a "Logging in Failed" message.
  db.query("SELECT username, password FROM users WHERE username = ?", [username], (err, result) => {
    if (result.length != 1) { // Couldn't even find a username that matched
      console.log(err)
      res.send({
        message: "Incorrect username/password", 
        error: true
      });
    }
    else { // Found a matching username
      let hashedPassword = result[0].password;

      bcrypt.compare(password, hashedPassword, function(err, result) {
        if(result) { // Found matching hashed password!
          res.send({
            message: "Successfully logged in", 
            error: false
          });
        } else { // Wrong password
          console.log(err)
          res.send({
            message: "Incorrect username/password", 
            error: true
          });
        }
      });
    }
  })
})

app.post("/post_create_account", async(req, res) => {
  let { username, password } = req.body;

  console.log("/post_create_account");
  
  // Adds password restrictions
  if (password_invalid(password)) {
      res.send({
        message: "Password must contain 1 upper and lowercase letter, 1 number, and be longer than 4 characters", 
        error: true
      });
    }
else {
  console.log("Express received: ", req.body);
  
  // Hash password
  bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
    if(err) throw err;
    else {
      // First check if username exists, can't make account with that name if it does
      db.query("SELECT username FROM users WHERE username = ?", [username], (err, result) => {
        if(result && result.length != 0) { 
          console.log(err)
          res.send({
            message: "Username already exists", 
            error: true
          });
        } else {
          // Adding the username and password to the database
          db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hashedPassword], (err, result) => { // Adds hashedPassword to the database instead of password
            if(err) {
              console.log(err)
              res.send({
                message: "Account creation failed", 
                error: true
              });
            }
            else {
              console.log(`Made new account with username ${username}, unhashed pw ${password}, hashed pw ${hashedPassword}`);
              res.send({
                message: "New account created", 
                error: false
              });
            }
          });
        }
      });
    }
  });
}
})


// update_username:
// Expects an object with attributes currentUsername and newUsername
app.post("/update_username", async(req, res) => {
  let { loggedInUsername, newUsername } = req.body;

  console.log("/update_username");
  console.log("Express received: ", req.body);

  // Check if newUsername is non-null, if null then don't update
  if(newUsername) {
    db.query("SELECT username FROM users WHERE username = ?", [newUsername], (err, result) => {
      if(result && result.length != 0) { 
        res.send({
          message: "New username exists already in database.", 
          error: true
        });
      } else {
        db.query("UPDATE users SET username=? WHERE username=?", [newUsername, loggedInUsername], (err, result) => { 
          if(err) {
            console.log(err)
            res.send({
              message: "Username update failed.", 
              error: true
            });
          }
          else {
            console.log(`Updated account ${loggedInUsername} to username ${newUsername}`);
            res.send({
              message: "Account username updated.", 
              error: false
            });
          }
        }); 
      }
    });
  }
})


// update_password: 
// Expects an attribute newPassword that we will try to use to update the user's account
app.post("/update_password", async(req, res) => {
  let {newUsername, newPassword} = req.body;

  console.log("/update_password");
  console.log("Express received: ", req.body);

  // Check if password is non-null, if null then don't update
  if(newPassword) {
    // Check password validity
    if (password_invalid(newPassword) === true) {
       res.send({
         message: "Password must contain 1 upper and lowercase letter, 1 number, and be longer than 4 characters", 
         error: true
       });
     }
    else {    
      // Hash password
      bcrypt.hash(newPassword, saltRounds, function(err, hashedPassword) {
        if(err) throw err;
        else {
          // Attempt to update password in database
          db.query("UPDATE users set password=? WHERE username=?", [hashedPassword, newUsername], (err, result) => { 
            if(err) {
              console.log(err)
              res.send({
                message: "Password update failed", 
                error: true
              });
            }
            else {
              console.log(`Updated password of ${newUsername} to password ${newPassword}`);
              res.send({
                message: "Account password updated", 
                error: false
              });
            }
          }); 
        }
      })
    }
  }
})


app.get("/home", cors(), async (req, res) => {
  res.send("This is the data for the home page from Express")
})


// Returns the specified username if it exists in the database
app.get("/user/:username", async(req, res) => {
  let username = req.params['username'];

  const username_query = `SELECT * FROM users WHERE username = ?`;
  try{
    db.query(username_query, username, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      }
      else{
        console.log(result);
        const db_username = result[0].username;
        res.json({
            "status": "success",
            "data": {
              "username": db_username
            }
          }
        );
      }
    });
  }
  catch (err){
    console.log(err);
    res.sendStatus(500);
  }
})

// Returns the watchlist for the specified user
app.get("/user/:username/watchlist", async(req, res) => {
  let username = req.params['username'];

  const watchlist_query = `SELECT ticker FROM users INNER JOIN user_ticker ON users.id = user_ticker.user_id WHERE username = ?`;
  try{
    db.query(watchlist_query, username, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      }
      else{
        console.log(result);
        let result_tickers = [];
        for(let i = 0; i < result.length; i++){
          result_tickers.push(result[i].ticker);
        }
        res.json({
              "status": "success",
              "data": {
                "username": username,
                "watchlist": result_tickers
              }
            }
        );
      }
    });
  }
  catch (err){
    console.log(err);
    res.sendStatus(500);
  }
})

// Saves a user's message for a particular ticker chat in the database
app.post("/ticker/:ticker_symbol/messages", async(req, res) => {
  let ticker_symbol = req.params['ticker_symbol'];
  let {username, message} = req.body;

  let user_id;
  const get_user_id_query = `SELECT id FROM users WHERE username = ?`;
  const ticker_message_query = `INSERT INTO chat_message (message_text, ticker, user_id) VALUES (?, ?, ?)`;
  try{
    // We need to first find the user id number based on the username
    db.query(get_user_id_query, username, (err, result) => {
      if (result.length == 0) {
        // The user does not exist
        res.sendStatus(404);
      }
      else{
        user_id = result[0].id;
        try{
          // Add the chat message to the database
          db.query(ticker_message_query, [message, ticker_symbol, user_id] , (err, result) => {
            if (result.length == 0) {
              res.sendStatus(404);
            }
            else{
              res.json({
                "status": "success",
                "data": {
                  "message": "Successfully added a message to " + ticker_symbol + " chat from " + username,
                }
              });
            }
          });
        }
        catch (err){
          console.log(err);
          res.sendStatus(500);
        }
      }
    });
  }
  catch (err){
    console.log(err);
    res.sendStatus(500);
  }
})

// Add a ticker to the database
// The ticker cannot already exist in the database
app.post("/ticker/add-ticker", async(req, res) => {
  let {ticker_symbol} = req.body;

  const ticker_message_query = `INSERT INTO ticker (ticker_symbol) VALUES (?)`;
  try{
    db.query(ticker_message_query, ticker_symbol, (err, result) => {
      if (result.length == 0) {
        res.sendStatus(404);
      }
      else{
        res.json({
          "status": "success",
          "data": {
            "message": "Successfully created a ticker " + ticker_symbol,
          }
        });
      }
    });
  }
  catch (err){
    console.log(err);
    res.sendStatus(500);
  }

})

app.get("/chart_data", cors(), async (req, res) => {
  console.log("/chart_data");
  console.log("Got request");
  console.log(req.query)
  let { symbol, resolution, from, to } = req.query;

  
  const api_key = finnhub.ApiClient.instance.authentications['api_key'];
  api_key.apiKey = "c4vvrsiad3i8k1mq9sjg" // Replace this
  const finnhubClient = new finnhub.DefaultApi()

  let chartData = {}; 
  let errorMsg = null;

  finnhubClient.stockCandles(symbol, resolution, from, to, (errCandles, dataCandles, responseCandles) => {
    // console.log("errCandles:")
    // console.log(errCandles)
    // console.log("dataCandles:")
    // console.log(dataCandles)
    // console.log("responseCandles:")
    // console.log(responseCandles)
    if (errCandles || dataCandles["s"] == 'no_data') {
      let error = errCandles ? errCandles : "Ticker data not found.";
      res.send({
        chartData: chartData, 
        error: error
      }); // Error
    } else {
      let minVal = Math.min(...dataCandles["l"]);
      let maxVal = Math.max(...dataCandles["h"]);
      chartData = {
        candles: {
          ...dataCandles
        },
        computed: {
          min: minVal,
          max: maxVal
        }
      };
      finnhubClient.quote(symbol, (errQuote, dataQuote, responseQuote) => {
        if (errQuote || dataQuote["s"] == 'no_data') {
          let error = errQuote ? errQuote : "Ticker data not found.";
          res.send({
            chartData: chartData, 
            error: error
          }); // Error
        } else {
          chartData = {
            ...chartData,
            quote: {
              ...dataQuote
            }
          };
          // console.log(`API Success:`);
          // console.log(chartData);
          res.send({
            chartData: chartData, 
            error: null
          }); // Success!
        }
      });
    }
  });
})


server.listen(port, () => {
  console.log("SERVER RUNNING");
});

// app.listen(port, () => {
// 	console.log(`Listening at http://localhost:${port}`)
// })