import { Component } from 'react';
import './App.scss';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

export const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {

  state = {
    isLogin: false,
  }

  handleChange = (event) => {

    this.setState({
        [event.target.name]: event.target.value,
    })
  }

  handleLogin = (event) => {
    event.preventDefault(); 
    
    const username = event.target.username.value;
    const password = event.target.password.value;

    const login = {
      username: username,
      password: password,
    }



    event.target.reset();
  }

  render (){

    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" render={(routerProps)=>{
              return (
                <LoginPage
                handleLogin={this.handleLogin}
                {...routerProps}
                />
              )
            }}/>

            <Route path="/register" component={RegisterPage}/>
            <Route path="/:userId" component={ProfilePage}/> 
          </Switch>
        </Router>
        
      </div>
    );
  }
}

export default App;
