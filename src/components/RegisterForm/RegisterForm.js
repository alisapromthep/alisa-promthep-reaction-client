import React from 'react';

function SignupForm(props) {
    return (
        <div>
            <form>
                <label
                name='name'>
                    Name
                    <input
                    name='name'
                    type='text'
                    placeholder='name' />
                </label>
                <label
                name='username'>
                    Username
                    <input
                    name='username'
                    type='text'
                    placeholder='username' />
                </label>
                <label
                name='password'>
                    Password
                    <input
                    name='=password'
                    type='password'
                    placeholder='password' />
                </label>
                <label
                name='phone'>
                    Phone number 
                    <input
                    name='phone'
                    type='text'
                    placeholder='Phone Number' />
                </label>
                <label
                name='email'>
                    Email 
                    <input
                    name='email'
                    type='email'
                    placeholder='Email' />
                </label>
            </form>
        </div>
    );
}

export default SignupForm;