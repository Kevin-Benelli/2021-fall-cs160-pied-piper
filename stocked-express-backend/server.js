const express = require('express'); 
const app = express(); 
const cors = require("cors");
const finnhub = require('finnhub');
const port = 5000 // localhost 5000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async(req, res) => {
  res.send("Yah boi is workin")
})

app.post("/post_login", async(req, res) => {
  let { username, password } = req.body
  console.log("/post_login");
  console.log("Express received: ", req.body) // ***this is where you would post to the MYSQL DB***
})

app.post("/post_create_account", async(req, res) => {
  let { username, password } = req.body
  console.log("/post_create_account");
  console.log("Express received: ", req.body) // ***this is where you would post to the MYSQL DB***
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