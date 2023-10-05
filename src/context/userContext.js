import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const UserContext = createContext();

const userInfoInitial = {
    name: "",
    username: "",
    password: "",
    email: "",
}


export function useUser(){
    return useContext(UserContext);
};

export function UserProvider({children}){

    const [userInfo, setUserInfo] = useState(userInfoInitial);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value,
            })
        }
        
        //handling register/ form validity 
        const isFormValid = ()=>{
        
            //check if fields are filled 
            if (
                !this.state.name ||
                !this.state.username ||
                !this.state.password ||
                !this.state.email
            ) {
                return false;
            } else {
                return true 
            }
        }
        
        const handleRegister = (event)=>{
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
        
        
        const handleLogout = (event)=>{
            event.preventDefault();
            sessionStorage.removeItem('token')
        
            this.setState({
            isLogin: false
            }); 
            
        }
        
        const handleLogin = (event) => {
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

        return (
            <UserContext.Provider 
            value={({
                userInfo, 
                setUserInfo,
                isLogin,
                setIsLogin,
                isLoginError,
                setIsLoginError,
                isRegister, 
                setIsRegister,
                handleChange,
                isFormValid,
                handleRegister,
                handleLogin,
                handleLogout,
            })}>
            {children}
            </UserContext.Provider>
        )

}