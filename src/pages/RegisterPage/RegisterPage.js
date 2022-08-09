import React from 'react';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {Redirect} from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';

const RegisterPage = ({isRegister,handleChange,handleRegister, username}) => {
    {
        if(isRegister){
            return <Redirect to={`/profile/${username}`} />
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
                    handleRegister={handleRegister} />
                    </main>
                </div>
            );
        }
    }
}

export default RegisterPage;