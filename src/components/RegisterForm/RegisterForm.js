import React from 'react';
import './RegisterForm.scss';

function SignupForm({handleChange, handleSubmit}) {


    return (
        <div>
            <form
            className='register_form'
            onSubmit={handleSubmit}>
                <label
                className='register__label' 
                name='name'>
                    Name
                    <input
                    name='name'
                    type='text'
                    placeholder='name'
                    onChange={handleChange}  />
                </label>
                <label
                className='register__label' 
                name='username'>
                    Username
                    <input
                    name='username'
                    type='text'
                    placeholder='username'
                    onChange={handleChange}  />
                </label>
                <label
                className='register__label' 
                name='password'>
                    Password
                    <input
                    name='password'
                    type='password'
                    placeholder='password'
                    onChange={handleChange} />
                </label>
                <label
                className='register__label'            
                name='phone'>
                    Phone number 
                    <input
                    name='phone'
                    type='text'
                    placeholder='Phone Number'
                    onChange={handleChange}  />
                </label>
                <label
                className='register__label' 
                name='email'>
                    Email 
                    <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={handleChange}  />
                </label>
                <button type='submit'> Register </button>
            </form>
        </div>
    );
}

export default SignupForm;