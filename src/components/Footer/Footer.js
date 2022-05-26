import React from 'react';
import './Footer.scss'
import {FaGithubSquare, FaLinkedin} from 'react-icons/fa';

function Footer(props) {
    return (
        <footer className='footer'>
            <div className='footer__icon-container'>
            <a className='footer__link' href='https://github.com/alisapromthep' target="_blank" rel="noreferrer"><FaGithubSquare className='footer__icon' /></a>
            <a className='footer__link' href='https://www.linkedin.com/in/alisa-promthep/' target="_blank" rel="noreferrer"><FaLinkedin className='footer__icon'/></a>
            </div>
            <p className='footer__info'>Made with ♡ by Alisa</p>
        </footer>
    );
}

export default Footer;