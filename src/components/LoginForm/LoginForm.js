import React from 'react';

function LoginForm(props) {
    return (
        <div>
            <form>
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
            </form>
        </div>
    );
}

export default LoginForm;