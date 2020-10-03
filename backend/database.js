
const mongoose = require('mongoose')

const contactsSchema = new mongoose.Schema({
  name: String,
  pnumero: Number,
  osoite: String,
})

const todoSchema = new mongoose.Schema({
  name: String,
  done: Boolean,
  owner: String
})

const velkaSchema = new mongoose.Schema({
  velallinen: String,
  määrä: Number,
  maksettu: Boolean
})

const reseptiSchema = new mongoose.Schema({
  nimi: String,
  ainekset: String,
  aika: Number,
  ohje: String,
  vaikeustaso: Number
})

const Contacts = mongoose.model('Contacts', contactsSchema)

const Todo = mongoose.model('Todo', todoSchema)

const Velka = mongoose.model('Velka', velkaSchema)

const Resepti = mongoose.model('Resepti', reseptiSchema)

module.exports = {
  Contacts,
  Todo,
  Velka,
  Resepti
}