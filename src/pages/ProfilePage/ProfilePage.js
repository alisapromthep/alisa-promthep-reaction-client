import React, {Component} from 'react';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import Summary from '../../components/Summary/Summary';
import NewEntryPage from '../NewEntryPage/NewEntryPage';
import axios from 'axios';
import {NewtonsCradle} from '@uiball/loaders';
import Header from '../../components/Header/Header';

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
                console.log(res)
                event.target.reset();
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
    }

    render () {
        
        if(this.state.foodIcons.length === 0 || this.state.symptomIcons.length === 0 || this.state.userLogs.length === 0) {
            return <NewtonsCradle size={40} speed={1.5} color="darkgreen"/>
        } else {
            return (
                <div>
                    <Header headerTitle={`${this.props.match.params.username}'s Profile`}/>
                    <CalendarComponent
                    userLogArray={this.state.userLogs}
                    foodIcons={this.state.foodIcons}
                    />
                    <NewEntryPage
                    handleSymptoms={this.handleSymptoms}
                    handleFood={this.handleFood}
                    handleSubmit={this.handleSubmit}
                    symptomIcons={this.state.symptomIcons}
                    foodIcons={this.state.foodIcons}
                    />
                    <Summary
                    foodIcons={this.state.foodIcons}
                    userLogArray={this.state.userLogs}
                    />
                </div>
            )
        }
    }
}

export default ProfilePage;