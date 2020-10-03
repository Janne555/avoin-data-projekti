import React, { useEffect } from 'react';
import Contacts from './components/Contacts';
import Velat from "./components/Velat"
import Todos from "./components/Todos"
import Resepti from "./components/Resepti"
import Navbar from "./components/Navbar"
import './App.css';
import "./css/main.css"
import "./css/todos.css"


import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'


function App() {
  useEffect(() => {
    fetch("/foo", )
  })
  
  return (
    <div className="App" >
      <Router>
        <Navbar />

        <Switch>

          <Route path="/contacts">
            <Contacts />
          </Route>

          <Route path="/todos">
            <Todos />
          </Route>

          <Route path="/reseptit">
            <Resepti />
          </Route>

          <Route path="/velat">
          <Velat />
          </Route>

          <Route path="/">
            <div>
              <h1>
                Home
              </h1>
            </div>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
