import React, {Component, useState} from 'react';
import './HomePage.scss';
import {Link} from 'react-router-dom';
import hero from '../../assets/images/home-hero.jpg';
import Footer from '../../components/Footer/Footer';

const HomePage = () => {

    const [mouseOnRegister, setMouseOnRegister] = useState(false);

    //toggle button between register and login 
    handleMouseEnter = (event)=>{
        setMouseOnRegister(true)
    }

    handleMouseLeave = (event)=>{
        setMouseOnRegister(false)
    }

        return (
            <main className='home'>
                <div className='home__hero-container'>
                <img className='home__hero' 
                src={hero} alt='illustration of three people with fruits'/>
                </div>
                <article className='home__container'>
                <h1 className='home__title'>Welcome to reAction!</h1>
                <h2 className='home__tagline'>Navigate life with allergies</h2>
                <p className='home__description'>Keep track and manage your allergies and food intolerance and enjoy eating</p>
                <div className='home__link-container'>
                <Link 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`home__link ${mouseOnRegister ? 'home__link--active': null}`}
                to='/register' >register</Link>
                <Link 
                className={`home__link ${mouseOnRegister ? null: 'home__link--active'}`}
                to='/login'>login</Link>
                </div>
                <Footer />
                </article>
            </main>
        );
}

export default HomePage;