import React, { Component } from 'react';
import './RegisterPage.scss'
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import axios from 'axios';

class RegisterPage extends Component {

    state = {
        name: "",
        username: "",
        password: "",
        phone: "",
        email: "",
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
                    console.log(response)
                    console.log(`new user is added`)
                })
                .catch((err)=>{
                    console.log(`problem registering`)
                })
        }

    }

    render () {

        return (
            <div>
                <RegisterForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default RegisterPage;