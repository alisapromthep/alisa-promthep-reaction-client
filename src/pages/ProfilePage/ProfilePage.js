import React, {Component} from 'react';
import CalendarComponent from '../../components/CalendarComponent/CalendarComponent';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';
import axios from 'axios';
class ProfilePage extends Component {

    state = {
        foodIcons: [],
        symptomIcons: [],
        selectSymptoms: [],
        selectFood: "",
    }

    handleSymptoms = (event)=>{
        console.log(event.target.value)
        const selectSymptom = event.target.value

        this.setState({selectSymptoms: [...this.state.selectSymptoms, selectSymptom]}, ()=>{
            console.log(this.state.selectSymptoms)
        })

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

        // const newEntry = {
        //     username: x,
        //     data: {todaysDate},
        //     time_of_day: event.target.time.value,
        //     food: this.state.selectFood,
        //     symptom: this.state.selectSymptoms,
        //     notes: event.target.notes.value
        // }

        // axios
        //     .get('http://localhost:8080/user/username', {
        //         headers:{
        //             Authorization: `Bearer ${sessionStorage.getItem('token')}`
        //         }
        //     })
        //     .then((res)=>{
        //         console.log(res)
        //     })

    }

    componentDidMount() {

        const requestFood = axios.get(`http://localhost:8080/assets/food`);
        const requestSymptom = axios.get(`http://localhost:8080/assets/symptoms`);

        axios
            .all ([requestFood, requestSymptom])
            .then((res)=>{
                const foodArray = res[0].data;
                const symptomArray = res[1].data;

                this.setState({
                    foodIcons: foodArray,
                    symptomIcons: symptomArray,
                })

            })

    }

    render () {
        
        if(this.state.foodIcons.length === 0 || this.state.symptomIcons.length === 0) {
            return <p>Loading . . . </p>
        } else {
            return (
                <div>
                    This is profile page
                    <CalendarComponent />
                    <NewEntryForm
                    handleSymptoms={this.handleSymptoms}
                    handleFood={this.handleFood}
                    handleSubmit={this.handleSubmit}
                    symptomIcons={this.state.symptomIcons}
                    foodIcons={this.state.foodIcons}
                    />
                </div>
            )
        }
    }
}

export default ProfilePage;