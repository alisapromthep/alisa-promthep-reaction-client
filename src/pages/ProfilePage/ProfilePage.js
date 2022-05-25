import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './ProfilePage.scss';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import SummaryPage from '../SummaryPage/SummaryPage';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import axios from 'axios';
import {NewtonsCradle} from '@uiball/loaders';
import Header from '../../components/Header/Header';
import NavBar from '../../components/NavBar/NavBar';


const header = {
    headers:{
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }
};

class ProfilePage extends Component {


    state = {
        foodIcons: [],
        symptomIcons: [],
        selectSymptoms: [],
        userLogs: [],
        selectFood: "",
    }

    newEntry = React.createRef();

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

    handleSymptoms = (event)=>{

        const check = event.target.checked
        const selectSymptom = event.target.value
        //check if the checked is true or false, to avoid double when uncheck

        if(check){
            this.setState({selectSymptoms: [...this.state.selectSymptoms, selectSymptom]}, ()=>{
                console.log(this.state.selectSymptoms)
            })
        } else {
            this.setState({selectSymptom: this.state.selectSymptoms.pop(selectSymptom)})
        }
    }

    handleFood = (event)=>{
        console.log(event.target.value)
        const food = event.target.value

        this.setState({selectFood: food}, ()=>{
            console.log(this.state.selectFood)
        })

    }

    handleSubmit = (event)=>{
        event.preventDefault();
        console.log(event)

        console.log('submit:',this.state.selectFood, this.state.selectSymptoms)
        console.log(event.target.time.value)
        const inputDate = event.target.date.value.split("-");
        const date = `${inputDate[1]}/${inputDate[2]}/${inputDate[0]} `
        const symptom = this.state.selectSymptoms.toString();

        const newEntry = {

            date: date,
            time_of_day: event.target.time.value,
            food: this.state.selectFood,
            symptom: symptom,
            notes: event.target.notes.value
        }

        axios
            .post(`http://localhost:8080/user/entry`, newEntry, header)
            .then((res)=>{
                event.target.reset();
                return axios.get(`http://localhost:8080/user/userLogs`, header )
            })
            .then((res)=>{
                this.setState({
                    userLogs: [...res.data]
                })
                window.scrollTo(0,0)
            })
            .catch((err)=>{
                console.log('error adding new entry log')
            })

    }

    handleDelete = (event)=>{
        event.preventDefault();
        const logId = event.target.id;

        axios
            .delete(`http://localhost:8080/user/delete/${logId}`,header)
            .then((res=>{
                return axios.get(`http://localhost:8080/user/userLogs`, header )
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

    componentDidMount() {

        const requestFood = axios.get(`http://localhost:8080/assets/food`);
        const requestSymptom = axios.get(`http://localhost:8080/assets/symptoms`);
        const requestUserLog = axios.get(`http://localhost:8080/user/userLogs`, header );

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
        
        if(this.state.foodIcons.length === 0 || this.state.symptomIcons.length === 0 || this.state.userLogs.length === 0) {
            return <div className='profile__loading'><NewtonsCradle size={40} speed={1.5} color="darkgreen" /></div>
        }  else {
            return (
                <div className='profile'> 
                    <NavBar
                    scrollToCal={this.scrollToCal}
                    scrollToNew={this.scrollToNew}/>
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
                        handleFood={this.handleFood}
                        handleSubmit={this.handleSubmit}
                        symptomIcons={this.state.symptomIcons}
                        foodIcons={this.state.foodIcons}
                        />
                        </article>
                    </main>
                </div>
            )
        }
    }
}

export default ProfilePage;