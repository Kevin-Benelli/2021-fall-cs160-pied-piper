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

app.post("/post_name", async(req, res) => {
  let { name } = req.body
  console.log("Hello %s From Express!: ", name) // ***this is where you would post to the MYSQL DB***
})

app.get("/home", cors(), async (req, res) => {
  res.send("This is the data for the home page from Express")
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})