import React from 'react';

function LoginForm({handleLogin}) {


    return (
        <div>
            <form
            onSubmit={handleLogin}
            >
                <label name='username'>
                    Username
                    <input
                    type='text'
                    name='username'
                    placeholder='username' />
                </label>
                <label name='password'>
                    Password
                    <input
                    type='password'
                    name='password'
                    placeholder='password' />
                </label>
                <button type='submit'> Login </button>
            </form>
        </div>
    );
}

export default LoginForm;