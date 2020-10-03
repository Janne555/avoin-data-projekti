const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connection open")
});

const contactsSchema = new mongoose.Schema({
  name: String,
  pnumero: Number,
  osoite: String,
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

const Contacts = mongoose.model('Contacts', contactsSchema)

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


app.post("/contacts", async (req, res) => {
  if (!("name" in req.body)) return res.status(400).send("Missing name")
  if (!("pnumero" in req.body)) return res.status(400).send("Missing pnumero")
  if (!("osoite" in req.body)) return res.status(400).send("Missing osoite")
  if (typeof req.body.name !== "string") return res.status(400).send("name must be string")
  if (typeof req.body.osoite !== "string") return res.status(400).send("done must be string")
  const contacts = new Contacts({name: req.body.name, pnumero: req.body.pnumero, osoite: req.body.osoite})
  try {
    await contacts.save()
    res.json(await contacts.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to save")
  }
})

app.get("/contacts", async (req, res) => {
  try {
    res.json(await Contacts.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to get contacts")
  }
})



app.post("/todo", async (req, res) => {
  if (!("name" in req.body)) return res.status(400).send("Missing name")
  if (!("done" in req.body)) return res.status(400).send("Missing done")
  if (typeof req.body.name !== "string") return res.status(400).send("name must be string")
  if (typeof req.body.name !== "number") return res.status(400).send("name must be number")
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
// curl -X POST -d '{"name": "test2", "done": true}' -H "Content-type: application/json"  localhost:4000/todo
// curl -X POST -d '{"name": "test2", "pnumero": 324534534, "osoite": "makkyla"}' -H "Content-type: application/json"  localhost:4000/contacts

app.get("/todo", async (req, res) => {
  try {
    res.json(await Todo.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).send("failed to get todos")
  }
})

app.listen(4000, () => {
  console.log(`app listening on port 4000`)
})

