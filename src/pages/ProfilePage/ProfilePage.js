import React, {Component, useEffect, useState} from 'react';
import './ProfilePage.scss';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import SummaryPage from '../SummaryPage/SummaryPage';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import {NewtonsCradle} from '@uiball/loaders';
import { Redirect } from 'react-router-dom';

const ProfilePage = () => {

    //today's date and time as default value for form 
    const today = new Date();
    const dd = today.getDate() < 10 ? `0${today.getDate()}`:`${today.getDate()}`
    const mm = (today.getMonth()+1) < 10 ? `0${(today.getMonth()+1)}`:`${today.getMonth()+1}`
    const yyyy = today.getFullYear();

    todayDate = `${yyyy}-${mm}-${dd}`;
    
    hours = today.getHours() < 10 ? `0${today.getHours()}`:today.getHours();
    minutes = today.getMinutes()<10 ? `0${today.getMinutes()}`:today.getMinutes();
    timeNow = `${hours}:${minutes}`

    const [foodIcons, setFoodIcons] = useState([]);
    const [symptomIcons, setSymptomIcons] = useState([]);
    const [userLogs, setUserLogs] = useState([]);
    const [selectSymptoms, setSelectSymptoms] = useState([]);
    const [selectFood, setSelectFood] = useState([]);
    const [date, setDate] = useState(todayDate);
    const [time, setTime] = useState(timeNow);

    //header for axios requests

    const header = {
        headers:{
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    };

    //create reference to implement scroll to button (for NavBar)

    const newEntry = React.createRef();

    //NavBar scroll functions 

    const scrollToNew = (event)=>{
        event.preventDefault();
        newEntry.current.scrollIntoView();
    }

    const scrollToCal = (event)=>{
        event.preventDefault();
        window.scrollTo(0,0);
    }

    const handleCalendarClick = (event)=>{
        newEntry.current.scrollIntoView();
    }

    // forms handler 

    //handle symptoms selection 

    const handleSymptoms = (event)=>{

        console.log(event)

        const check = event.target.checked
        const newSelectSymptom = event.target.value
        console.log('check',check)
        console.log(newSelectSymptom)
        //check if the checked is true or false, to avoid double when uncheck

        if(check){
            setSelectSymptoms((prev)=> {
            return(
                [...prev,
                    newSelectSymptom
                ]
            )});

        } else {
            setSelectSymptoms((prev)=>{ 
            return (
                prev.pop(newSelectSymptom)
            )});
        }
    }

    //handle form input change 
    const handleChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    //handle form submission 

    const handleSubmit = (event)=>{
        event.preventDefault();

        const inputDate = date.split("-");
        const date = `${inputDate[1]}/${inputDate[2]}/${inputDate[0]} `
        const symptom = selectSymptoms.toString();

        const newEntry = {

            date: date,
            time_of_day: time,
            food: selectFood,
            symptom: symptom,
            notes: event.target.notes.value
        }

        console.log('stored', symptom)

        axios
            .post(`${process.env.REACT_APP_API_URL}/user/entry`, newEntry, header)
            .then((res)=>{
                event.target.reset();
                return axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, header )
            })
            .then((res)=>{
                setUserLogs([...res.data]);
                setSelectSymptoms([]);
                setDate(todayDate);
                setTime(timeNow);
                window.scrollTo(0,0)
            })
            .catch((err)=>{
                console.log('error adding new entry log')
            })

    }

    //handle delete post 

    const handleDelete = (event)=>{
        event.preventDefault();
        const logId = event.target.id;

        axios
            .delete(`${process.env.REACT_APP_API_URL}/user/delete/${logId}`,this.header)
            .then((res=>{
                return axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, this.header )
            }))
            .then((res)=>{
                setUserLogs([...res.data]);
            })
            .catch((err)=>{
                console.log(err)
                console.log('error finding the user log and deleting')
            })
    }
    
    //get token to verify user is log in before rendering 
    const loginToken = sessionStorage.getItem('token');

    //first render 

    useEffect(()=>{

        const requestFood = axios.get(`${process.env.REACT_APP_API_URL}/assets/food`);
        const requestSymptom = axios.get(`${process.env.REACT_APP_API_URL}/assets/symptoms`);
        const requestUserLog = axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, header );

        axios
            .all ([requestFood, requestSymptom, requestUserLog])
            .then((res)=>{
                const foodArray = res[0].data;
                const symptomArray = res[1].data;
                const userLogArray = res[2].data;

                setFoodIcons([...foodArray]);
                setSymptomIcons([...symptomArray]);
                setUserLogs([...userLogArray]);

                this.setState({
                    foodIcons: [...foodArray],
                    symptomIcons: [...symptomArray],
                    userLogs: [...userLogArray],
                })
            })
            .catch((err)=>{
                console.log(err)
            })

    },[])


        //when log out, redirect to homepage 
        if(!this.props.isLogin){
            return <Redirect to="/"/>;
        }

        //check if user is log in before rendering the page 
        if(!this.loginToken){
            alert ('Please log in or register to access')
            return <Redirect to="/login"/>;
        } else {
            if(this.state.foodIcons.length === 0 || this.state.symptomIcons.length === 0) {

                return <div className='profile__loading'><NewtonsCradle size={40} speed={1.5} color="darkgreen" /></div>
            }  else {
                return (
                    <div className='profile'> 
                        <NavBar
                        scrollToCal={scrollToCal}
                        scrollToNew={scrollToNew}
                        handleLogout={handleLogout}
                        />
                        <main className='profile__dashboard'>
                            <Header 
                            headerTitle={`${this.props.match.params.username}'s Profile`}/>
                            <div className='profile__topcontainer'>
                            <CalendarComponent
                            handleCalendarClick={this.handleCalendarClick}
                            userLogArray={this.state.userLogs}
                            foodIcons={this.state.foodIcons}
                            />
                            <SummaryPage
                            handleDelete={this.handleDelete}
                            foodIcons={this.state.foodIcons}
                            userLogArray={this.state.userLogs}
                            />
                            </div>
                            <article
                            ref={this.newEntry}
                            className='profile__form-container'>
                            <NewEntryPage
                            handleSymptoms={this.handleSymptoms}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            symptomIcons={this.state.symptomIcons}
                            foodIcons={this.state.foodIcons}
                            date={this.state.date}
                            time={this.state.time}
                            />
                            </article>
                        </main>
                    </div>
                )
            }
        }
}

export default ProfilePage;