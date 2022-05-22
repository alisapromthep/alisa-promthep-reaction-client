import React from 'react';
import './CalendarComponent.scss';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarEvent from '../CalendarEvent/CalendarEvent';

function CalendarComponent({userLogArray, foodIcons}) {
    return (
        <div>
            <Calendar
            tileContent={ ({ date, view }) => {
                // console.log('date', date.getDate())
                // console.log('month',date.getMonth())
                // console.log(date.getFullYear())
                return view === 'month' && date.getDay() === 0 ? <CalendarEvent/>
            : null} }/>

            
        </div>
    );
}

export default CalendarComponent;