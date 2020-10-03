
const mongoose = require('mongoose')

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

module.exports = {
  Contacts,
  Todo,
  Velka
}