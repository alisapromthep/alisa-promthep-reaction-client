import React from 'react';
import './RegisterForm.scss';

function SignupForm({handleChange, handleSubmit}) {


    return (
        <form
        className='register__form'
        onSubmit={handleSubmit}>
            <label
            className='register__label' 
            name='name'>
                Name
                <input
                className='register__input'
                name='name'
                type='text'
                placeholder='Name'
                onChange={handleChange}  />
            </label>
            <label
            className='register__label' 
            name='username'>
                Username
                <input
                className='register__input'
                name='username'
                type='text'
                placeholder='Username'
                onChange={handleChange}  />
            </label>
            <label
            className='register__label' 
            name='password'>
                Password
                <input
                className='register__input'
                name='password'
                type='password'
                placeholder='Password'
                onChange={handleChange} />
            </label>
            <label
            className='register__label'            
            name='phone'>
                Phone number 
                <input
                className='register__input'
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
                className='register__input'
                name='email'
                type='email'
                placeholder='Email'
                onChange={handleChange}  />
            </label>
            <button
            className='button'
            type='submit'> Register </button>
        </form>
    );
}

export default SignupForm;