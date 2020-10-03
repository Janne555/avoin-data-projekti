import React from 'react';
import {
    Link
} from 'react-router-dom'
import LoginButton from './LoginButton'

const Navbar = ({ loggedIn, setLoggedIn }) => {

    return (
        <div class="navbar">
            <h1>Ryhmä 7: Organisaattori</h1>

            <Link class="navbaritem" to="/">Koti</Link>
            <Link class="navbaritem" to="/contacts">Yhteystiedot</Link>
            <Link class="navbaritem" to="/todos">Todos</Link>
            <Link class="navbaritem" to="/velat">Velat</Link>
            <Link class="navbaritem" to="/reseptit">Reseptit</Link>
            <LoginButton loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
    )

}

export default Navbar;