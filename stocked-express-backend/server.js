const express = require('express'); 
const app = express(); 
const cors = require("cors")
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

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})