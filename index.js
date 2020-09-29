const express = require('express')

const app = express()

app.get("/foo", (req,res) => {
  res.send("<h1>hello</h1>")
})

app.listen(4000, () => {
  console.log(`app listening on port 4000`)
})