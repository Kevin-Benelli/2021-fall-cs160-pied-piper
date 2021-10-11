const express = require('express'); 
const app = express(); 
const cors = require("cors");
const finnhub = require('finnhub');
const port = 5000 // localhost 5000
var bcrypt = require('bcryptjs'); // Hash passwords

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

  const checkPassword = await bcrypt.compare(password, password.hash); // Check the hash password

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

  const hash = await bcrypt.hash(password, 2); // hashes the password to salt 2

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
      db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hash], (err, result) => { // ADDS "hash" to the database
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