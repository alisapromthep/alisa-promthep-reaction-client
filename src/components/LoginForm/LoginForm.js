import React from 'react';
import './LoginForm.scss';

function LoginForm({handleLogin}) {


    return (
        <form
        className='login__form'
        onSubmit={handleLogin}
        >
            <label 
            className='login__label'
            name='username'>
                Username
                <input
                className='login__input'
                type='text'
                name='username'
                placeholder='Your username' />
            </label>
            <label 
            className='login__label'
            name='password'>
                Password
                <input
                className='login__input'
                type='password'
                name='password'
                placeholder='Your password' />
            </label>
            <button 
            className='button'
            type='submit'> Login </button>
        </form>
    );
}

export default LoginForm;