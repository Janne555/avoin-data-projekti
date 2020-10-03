import React, { useEffect, useState } from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App" >
      <Router>
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

        <Switch>

          <Route path="/contacts">
            <Contacts />
          </Route>

          <Route path="/todos">
            {loggedIn
              ? <Todos />
              : <div>kirjaudu ensin sisään</div>
            }
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
