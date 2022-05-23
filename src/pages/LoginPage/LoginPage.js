import React from 'react';
import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link, Redirect} from 'react-router-dom';

function LoginPage({handleLogin, isLogin, username}) {

        {
            if(isLogin){
                return <Redirect to={`/${username}`} />
            } else {
                return (
                    <div>
                        Login
                        <LoginForm
                        handleLogin={handleLogin}
                        />
                        <p> or 
                        <Link to='/register'>
                            Register here
                        </Link>
                        </p>
                    </div>
                )
            }
        }
}

export default LoginPage;