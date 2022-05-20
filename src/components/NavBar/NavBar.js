import React from 'react';
import {NavLink} from 'react-router-dom'
import './NavBar.scss'

function NavBar(props) {
    return (
        <nav>
            <NavLink> Calender </NavLink>
            <NavLink> New Entry </NavLink>
            <NavLink> Summary </NavLink>
        </nav>
    );
}

export default NavBar;