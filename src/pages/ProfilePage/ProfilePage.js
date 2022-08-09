import React, {Component} from 'react';
import './ProfilePage.scss';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import SummaryPage from '../SummaryPage/SummaryPage';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';
import axios from 'axios';
import {NewtonsCradle} from '@uiball/loaders';
import { Redirect } from 'react-router-dom';


class ProfilePage extends Component {

    //today's date and time as default value for form 
    today = new Date();
    dd = this.today.getDate() < 10 ? `0${this.today.getDate()}`:`${this.today.getDate()}`
    mm = (this.today.getMonth()+1) < 10 ? `0${(this.today.getMonth()+1)}`:`${this.today.getMonth()+1}`
    yyyy = this.today.getFullYear();

    todayDate = `${this.yyyy}-${this.mm}-${this.dd}`;
    
    hours = this.today.getHours() < 10 ? `0${this.today.getHours()}`:this.today.getHours();
    minutes = this.today.getMinutes()<10 ? `0${this.today.getMinutes()}`:this.today.getMinutes();
    timeNow = `${this.hours}:${this.minutes}`
    
    state = {
        foodIcons: [],
        symptomIcons: [],
        userLogs: [],
        selectSymptoms: [],
        selectFood: "",
        date: this.todayDate,
        time:this.timeNow,
    }

    //header for axios requests

    header = {
        headers:{
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    };

    //create reference to implement scroll to button (for NavBar)

    newEntry = React.createRef();

    //NavBar scroll functions 

    scrollToNew = (event)=>{
        event.preventDefault();
        this.newEntry.current.scrollIntoView();
    }

    scrollToCal = (event)=>{
        event.preventDefault();
        window.scrollTo(0,0);
    }

    handleCalendarClick = (event)=>{
        this.newEntry.current.scrollIntoView();
    }

    // forms handler 

    //handle symptoms selection 

    handleSymptoms = (event)=>{

        console.log(event)

        const check = event.target.checked
        const selectSymptom = event.target.value
        console.log('check',check)
        console.log(selectSymptom)
        //check if the checked is true or false, to avoid double when uncheck

        if(check){
            this.setState({selectSymptoms: [...this.state.selectSymptoms, selectSymptom]},()=>{console.log(this.state.selectSymptoms)})
        } else {
            this.setState({selectSymptom: this.state.selectSymptoms.pop(selectSymptom)},()=>{console.log(this.state.selectSymptoms)})
        }
    }

    //handle form input change 
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    //handle form submission 

    handleSubmit = (event)=>{
        event.preventDefault();

        const inputDate = this.state.date.split("-");
        const date = `${inputDate[1]}/${inputDate[2]}/${inputDate[0]} `
        const symptom = this.state.selectSymptoms.toString();

        const newEntry = {

            date: date,
            time_of_day: this.state.time,
            food: this.state.selectFood,
            symptom: symptom,
            notes: event.target.notes.value
        }

        console.log('stored', symptom)

        axios
            .post(`${process.env.REACT_APP_API_URL}/user/entry`, newEntry, this.header)
            .then((res)=>{
                event.target.reset();
                return axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, this.header )
            })
            .then((res)=>{
                this.setState({
                    userLogs: [...res.data],
                    selectSymptoms:[],
                    date: this.todayDate,
                    time:this.timeNow
                })
                window.scrollTo(0,0)
            })
            .catch((err)=>{
                console.log('error adding new entry log')
            })

    }

    //handle delete post 

    handleDelete = (event)=>{
        event.preventDefault();
        const logId = event.target.id;

        axios
            .delete(`${process.env.REACT_APP_API_URL}/user/delete/${logId}`,this.header)
            .then((res=>{
                return axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, this.header )
            }))
            .then((res)=>{
                this.setState({
                    userLogs: [...res.data]
                })
            })
            .catch((err)=>{
                console.log(err)
                console.log('error finding the user log and deleting')
            })
    }
    
    //get token to verify user is log in before rendering 
    loginToken = sessionStorage.getItem('token');

    //first render 

    componentDidMount() {


        const requestFood = axios.get(`${process.env.REACT_APP_API_URL}/assets/food`);
        const requestSymptom = axios.get(`${process.env.REACT_APP_API_URL}/assets/symptoms`);
        const requestUserLog = axios.get(`${process.env.REACT_APP_API_URL}/user/userLogs`, this.header );

        axios
            .all ([requestFood, requestSymptom, requestUserLog])
            .then((res)=>{
                const foodArray = res[0].data;
                const symptomArray = res[1].data;
                const userLogArray = res[2].data;

                this.setState({
                    foodIcons: [...foodArray],
                    symptomIcons: [...symptomArray],
                    userLogs: [...userLogArray],
                })
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    render () {
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
                        scrollToCal={this.scrollToCal}
                        scrollToNew={this.scrollToNew}
                        handleLogout={this.props.handleLogout}
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
}

export default ProfilePage;