import React from 'react';
import './LoginPage.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import {Link} from 'react-router-dom';

function LoginPage(props) {
    return (
        <div>
            Login
            <LoginForm />
            <p> or 
            <Link to='/register'>
                Register here
            </Link>
            </p>

        </div>
    );
}

export default LoginPage;