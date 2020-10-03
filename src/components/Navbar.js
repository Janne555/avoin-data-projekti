import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

const Navbar = () => {

    return (
        <div class="navbar">
            <h1>Ryhmä 7: Organisaattori</h1>

            <Link class="navbaritem" to="/">Home</Link>
            <Link class="navbaritem" to="/contacts">Contacts</Link>
            <Link class="navbaritem" to="/todos">Todos</Link>
            <Link class="navbaritem" to="/velat">Velat</Link>
            <Link class="navbaritem" to="/reseptit">Reseptit</Link>
        </div>
    )

}

export default Navbar;