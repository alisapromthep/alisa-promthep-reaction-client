import React from 'react';
import './HomePage.scss';
import {Link} from 'react-router-dom';
import hero from '../../assets/images/home-hero.jpg';

function HomePage(props) {




    return (
        <main className='home'>
            <div className='home__hero-container'>
            <img className='home__hero' 
            src={hero} alt='illustration of three people with fruits'/>
            </div>
            <article className='home__container'>
            <h1 className='home__title'>Navigate life with allergies</h1>
            <p className='home__description'>Keep track and manages your allergies and food intolerance and enjoy eating</p>
            <div className='home__link-container'>
            <Link className='home__link'
            to='/register' >register</Link>
            <Link className='home__link home__link--active'
            to='/login'>login</Link>
            </div>
            </article>
        </main>
    );
}

export default HomePage;