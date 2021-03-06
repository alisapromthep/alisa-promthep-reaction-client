import React from 'react';
import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link, Redirect} from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';


function LoginPage({handleLogin, isLogin, username}) {

    //when login, redirect to profile page

        {
            if(isLogin){
                return <Redirect to={`/profile/${username}`} />
            } else {
                return (
                    <div className='login'>
                        <div className='login__hero-container'>
                            <HeroImg />
                        </div>
                    <main className='login__form-container'>
                    <Header headerTitle='Log-in'/>
                        <LoginForm
                        handleLogin={handleLogin}
                        />
                        <p className='login__noaccount'> Don't have an account? 
                        <Link 
                        className='login__link'
                        to='/register'>
                            Register
                        </Link>
                        </p>
                    </main>
                    </div>
                )
            }
        }
}

export default LoginPage;