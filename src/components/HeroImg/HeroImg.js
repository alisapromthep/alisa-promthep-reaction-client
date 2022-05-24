import React from 'react';
import './HeroImg.scss';
import loginhero from '../../assets/images/watermelonboy.png';

function HeroImg(props) {
    return (
        <img className='heroimg'src={loginhero} alt='illustration of a guy holding a wage of watermelon' />
    );
}

export default HeroImg;