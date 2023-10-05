import React from 'react';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import {Navigate} from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';
import { useUser } from '../../context/userContext';

const RegisterPage = () => {

    const {userInfo, isRegister} = useUser();

    {
        if(isRegister){
            return <Navigate to={`/profile/${userInfo.username}`} />
        } else {
            return (
                <div className='register'>
                    <div className='register__hero-container'>
                    <HeroImg />
                    </div>
                    <main className='register__form-container'>
                        <Header headerTitle='Register'/>
                    <RegisterForm/>
                    </main>
                </div>
            );
        }
    }
}

export default RegisterPage;