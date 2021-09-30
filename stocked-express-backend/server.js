const express = require('express'); 
const app = express(); 
const cors = require("cors");
app.use(cors());
const finnhub = require('finnhub');
const port = 5000 // localhost 5000

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

  // disconnect from the server at the end
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


//Creating a database and connection
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootuser",
  database: "Stocked"
});

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())




app.get("/", cors(), async(req, res) => {
  res.send("Yah boi is workin")
})

app.post("/post_login", async(req, res) => {
  let { username, password } = req.body

  console.log("/post_login");
  console.log("Express received: ", req.body) 
  // Checking if the username and password exists in the database
  // If the user exists, we return the username. Otherwise, we return a "Logging in Failed" message.
  db.query("SELECT username FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
    if (result.length == 0) {
      console.log(err)
      res.send({
        message: "Incorrect username/password", 
        error: true
      });
    }
    else {
      res.send({
        message: "Successfully logged in", 
        error: false
      });
    }
  })
})

app.post("/post_create_account", async(req, res) => {
  let { username, password } = req.body;

  console.log("/post_create_account");
  console.log("Express received: ", req.body);

  // First check if username exists, can't make account with that name if it does
  db.query("SELECT username FROM users WHERE username = ?", [username], (err, result) => {
    if (result.length != 0) { 
      console.log(err)
      res.send({
        message: "Username already exists", 
        error: true
      });
    } else {
      // Adding the username and password to the database
      db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, password], (err, result) => {
        if(err) {
          console.log(err)
          res.send({
            message: "Account creation failed", 
            error: true
          });
        }
        else {
          res.send({
            message: "New account created", 
            error: false
          });
        }
      });
    }
  })
})

app.get("/home", cors(), async (req, res) => {
  res.send("This is the data for the home page from Express")
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



app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})


// server.listen(5000, () => {
//   console.log("SERVER RUNNING");
// });