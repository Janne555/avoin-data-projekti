const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = require('./server')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongo connection open")
});

app.listen(4000, () => {
  console.log(`app listening on port 4000`)
})