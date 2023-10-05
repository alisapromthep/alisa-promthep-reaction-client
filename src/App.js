import { Component } from 'react';
import './App.scss';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import {UserProvider} from './context/userContext';

const App = () => {

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

    return (
      <BrowserRouter>
      <UserProvider>
        <Routes>
            <Route path='/' exact element={<HomePage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element= {<RegisterPage/>}/>
            <Route path='/profile/:username' element={<ProfilePage/>}/> 
        </Routes>
      </UserProvider>
      </BrowserRouter>
    );
}

export default App;
