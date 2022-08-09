import { Component } from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

class App extends Component {

  state = {
    isLogin: false,
    isLoginError: false,
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    isRegister: false,
  }

  handleChange = (event)=>{
    this.setState({
      [event.target.name]:event.target.value,
    })
  }

  //handling register/ form validity 
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

  handleRegister = (event)=>{
    event.preventDefault();

    if (!this.isFormValid()){
        console.log('invalid form');
        return;
    } else {
        axios
            .post(`${process.env.REACT_APP_API_URL}/user/register`, {
                name: this.state.name,
                username: this.state.username,
                password: this.state.password,
                phone: this.state.phone,
                email: this.state.email
            })
            .then((response)=>{
                console.log(response);
                console.log(`new user is added`);
                sessionStorage.setItem('token', response.data.token)
                this.setState({
                  isRegister: true,
                  username:response.data.username,
                  isLogin: true
                });
            })
            .catch((err)=>{
                console.log(`problem registering`);
            })
    }

}


  handleLogout = (event)=>{
    event.preventDefault();
    sessionStorage.removeItem('token')

    this.setState({
      isLogin: false
    }); 
    
  }

  handleLogin = (event) => {
    event.preventDefault(); 
    
    const username = event.target.username.value;
    const password = event.target.password.value;

    const login = {
      username: username,
      password: password,
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, login)
      .then((response)=>{

        const username = response.data.username;
        const authToken = response.data.token
        sessionStorage.setItem('token', authToken)

        this.setState({
          isLogin: true,
          isLoginError: false,
          username: username,
        })
      })
      .catch ((err)=>{
        console.log(err)
      })

    event.target.reset();
  }

  render (){

    return (
      <div>
        <Router>
          <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/login' render={(routerProps)=>{
              return (
                <LoginPage
                handleLogin={this.handleLogin}
                username={this.state.username}
                isLogin={this.state.isLogin}
                {...routerProps}
                />
              )
            }}/>
            <Route path='/register' render = {
              (rounterProps)=>{
                return (
                  <RegisterPage
                  isRegister={this.state.isRegister}
                  handleChange={this.handleChange}
                  handleRegister={this.handleRegister}
                  username={this.state.username}
                  />
                )
              }
            }/>
            <Route path='/profile/:username' render={(routerProps)=>{
              return (
                <ProfilePage
                isLogin={this.state.isLogin}
                handleLogout={this.handleLogout}
                {...routerProps}
                />
              )
            }}/> 
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
