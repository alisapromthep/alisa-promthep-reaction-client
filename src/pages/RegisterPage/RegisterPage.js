import React from 'react';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';

function RegisterPage ({handleChange, handleRegister, username}) {

    return (
        <div className='register'>
            <div className='register__hero-container'>
            <HeroImg />
            </div>
            <main className='register__form-container'>
                <Header headerTitle='Register'/>
            <RegisterForm
            handleChange={handleChange}
            handleSubmit={handleRegister} />
            </main>
        </div>
    );

}

export default RegisterPage;