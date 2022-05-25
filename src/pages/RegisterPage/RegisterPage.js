import React, { Component } from 'react';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Header from '../../components/Header/Header';
import HeroImg from '../../components/HeroImg/HeroImg';

class RegisterPage extends Component {

    state = {
        name: "",
        username: "",
        password: "",
        phone: "",
        email: "",
        isRegister: false,
    }

    handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    isFormValid = ()=>{

        //check if fields are filled 
        if (
            !this.state.name ||
            !this.state.username ||
            !this.state.password ||
            !this.state.phone ||
            !this.state.email
        ) {
            return false;
        } else {
            return true 
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();

        if (!this.isFormValid()){
            console.log('invalid form');
            return;
        } else {
            axios
                .post(`http://localhost:8080/user/register`, {
                    name: this.state.name,
                    username: this.state.username,
                    password: this.state.password,
                    phone: this.state.phone,
                    email: this.state.email
                })
                .then((response)=>{
                    console.log(response);
                    console.log(`new user is added`);
                    this.setState({isRegister: true});
                    
                })
                .catch((err)=>{
                    console.log(`problem registering`);
                })
        }

    }

    render () {
        if(this.state.isRegister){
            return <Redirect to='/login' />
        }

        return (
            <div className='register'>
                <div className='register__hero-container'>
                <HeroImg />
                </div>
                <main className='register__form-container'>
                    <Header headerTitle='Register'/>
                <RegisterForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
                </main>
            </div>
        );
    }
}

export default RegisterPage;