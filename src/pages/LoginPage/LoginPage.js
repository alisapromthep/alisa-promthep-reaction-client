import React from 'react';
import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link, Redirect} from 'react-router-dom';

function LoginPage({handleLogin, isLogin, username}) {

        {
            if(isLogin){
                return <Redirect to={`/profile/${username}`} />
            } else {
                return (
                    <div>
                        <h1>Welcome to ReAction</h1>
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