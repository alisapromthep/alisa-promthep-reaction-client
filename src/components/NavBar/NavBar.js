import React from 'react';
import './NavBar.scss'
import {TiDocumentAdd} from 'react-icons/ti';
import {AiOutlineCalendar} from 'react-icons/ai';

function NavBar({scrollToCal, scrollToSum, scrollToNew}) {
    return (
        <nav className='navbar'>
            <button 
            onClick={scrollToCal}
            className='navbar__button'><AiOutlineCalendar id="calendar"
            className='navbar__icon'/> Calendar </button>
            <button
            onClick={scrollToNew}
            className='navbar__button'><TiDocumentAdd id="newEntry" className='navbar__icon'/> New</button>
        </nav>
    );
}

export default NavBar;