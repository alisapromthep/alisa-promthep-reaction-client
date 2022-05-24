import React from 'react';
import './Header.scss';

function Header({headerTitle}) {
    return (
        <header>
            <h1 className='header__title'>{headerTitle}</h1>
        </header>
    );
}

export default Header;