import React from 'react';
import { Redirect } from 'react-router-dom';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';

function RegisterPage ({handleChange, handleRegister, username, isLogin}) {
    
    if(isLogin){
        return <Redirect to={`/profile/${username}`}/>
    } else {
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
}

export default RegisterPage;