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
    isRegister: false,
    name: "",
    username: "",
    password: "",
    phone: "",
    email: "",
  }

  handleLogout = (event)=>{
    event.preventDefault();
    sessionStorage.removeItem('token')

    this.setState({
      isLogin: false
    }); 
    
  }

  handleChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value,
    })
}

  isFormValid = ()=>{
    //check if all fields are filled 
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

  handleRegister = (event)=> {
    event.preventDefault();
    if (!this.isFormValid()){
      console.log('invalid form');
      return;
  } else {
      axios
          .post(`http://localhost:8080/user/register`, {
              name: event.target.name.value,
              username: event.target.username.value,
              password: event.target.password.value,
              phone: event.target.phone.value,
              email: event.target.email.value
          })
          .then((response)=>{
            const username = response.data.username;
            const authToken = response.data.token;
            sessionStorage.setItem('token', authToken);
    
            this.setState({
              isLogin: true,
              isLoginError: false,
              username: username,
            })

          })
          .catch((err)=>{
              console.log(`problem registering`);
          })
  }

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
      .post(`http://localhost:8080/user/login`, login)
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
        console.log(err.response.data.error)
      })

    event.target.reset();
  }

  render (){
      return (
        <div>
          <Router>
            <Switch>
              <Route path='/' exact component={HomePage}/>
              <Route path="/login" render={(routerProps)=>{
                return (
                  <LoginPage
                  handleLogin={this.handleLogin}
                  username={this.state.username}
                  isLogin={this.state.isLogin}
                  {...routerProps}
                  />
                )
              }}/>
              <Route path="/register" render={(routerProps)=>{
                return (
                  <RegisterPage 
                  handleRegister={this.handleRegister}
                  handleChange={this.handleChange}
                  isRegister={this.state.isRegister}
                  username={this.state.username}
                  isLogin={this.state.isLogin}
                  {...routerProps}
                  />
                )
              }}
              />
  
              <Route path="/profile/:username" render={(routerProps)=>{
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
