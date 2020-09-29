const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connection open")
});

const ContactsSchema = new mongoose.Schema({
  name: String,
  pnumero: Number,
})

const todoSchema = new mongoose.Schema({
  name: String,
  done: Boolean
})

const velkaSchema = new mongoose.Schema({
  velallinen: String,
  määrä: Number,
  maksettu: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)

const Velka = mongoose.model('Velka', velkaSchema)

const app = express()

app.use(bodyParser.json())


app.get("/foo", (req,res) => {
  res.send("<h1>hello</h1>")
})

app.get("/", (req,res) => {
  res.send("<h1>404</h1>")
})

app.post("/foo", (req, res) => {
  console.log("got post")
  console.log(req)
  res.end()
})

app.post("/todo", async (req, res) => {
  if (!("name" in req.body)) return res.status(400).send("Missing name")
  if (!("done" in req.body)) return res.status(400).send("Missing done")
  if (typeof req.body.name !== "string") return res.status(400).send("name must be string")
  if (typeof req.body.done !== "boolean") return res.status(400).send("done must be boolean")
  const todo = new Todo({name: req.body.name, done: req.body.done})
  try {
    await todo.save()
    res.json(await Todo.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to save")
  }
})


// Example:
// curl -X POST -d '{"name": "test", "done": true}' -H "Content-type: application/json"  localhost:4000/todo

app.get("/todo", async (req, res) => {
  try {
    res.json(await Todo.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to get todos")
  }
})


app.post("/velka", async (req, res) => {
  if (!("velallinen" in req.body)) return res.status(400).send("Missing velallinen")
  if (!("määrä" in req.body)) return res.status(400).send("Missing määrä")
  if (!("maksettu" in req.body)) return res.status(400).send("Missing maksettu")
  if (typeof req.body.velallinen !== "string") return res.status(400).send("velallinen must be string")
  if (typeof req.body.määrä !== "number") return res.status(400).send("määrä must be number")
  if (typeof req.body.maksettu !== "boolean") return res.status(400).send("maksettu must be boolean")
  const velka = new Velka({velallinen: req.body.velallinen, määrä: req.body.määrä, maksettu: req.body.maksettu})
  try {
    await velka.save()
    res.json(await Velka.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to save")
  }
})


// Example:
// curl -X POST -d '{"velallinen": "Aku Ankka", "määrä": 9000, "maksettu": false}' -H "Content-type: application/json"  localhost:4000/velka


app.get("/velka", async (req, res) => {
  try {
    res.json(await Velka.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to get velat")
  }
})

app.listen(4000, () => {
  console.log(`app listening on port 4000`)
})

