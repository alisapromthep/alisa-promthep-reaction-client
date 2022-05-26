import React from 'react';
import './NavBar.scss'
import {TiDocumentAdd} from 'react-icons/ti';
import {AiOutlineCalendar, AiOutlineLogout} from 'react-icons/ai';

function NavBar({scrollToCal, scrollToNew, handleLogout}) {
    return (
        <nav className='navbar'>
            <button 
            onClick={scrollToCal}
            className='navbar__button'><AiOutlineCalendar id="calendar"
            className='navbar__icon'/> Calendar </button>
            <button
            onClick={scrollToNew}
            className='navbar__button'><TiDocumentAdd id="newEntry" className='navbar__icon'/> New</button>
            <button
            onClick={handleLogout}
            className='navbar__button'>< AiOutlineLogout id="logout" className='navbar__icon'/>Log out</button>
        </nav>
    );
}

export default NavBar;