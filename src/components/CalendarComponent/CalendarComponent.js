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
                return (userLogArray.map((log)=>{
                    const timestamp = Date.parse(log.date);
                    let inputDate = new Date(timestamp);
                    return view === 'month' && date.toLocaleDateString() === inputDate.toLocaleDateString() ? <CalendarEvent food={log.food} foodIcons={foodIcons} /> : null}))
                }
            }/>
        </div>
    );
}

export default CalendarComponent;