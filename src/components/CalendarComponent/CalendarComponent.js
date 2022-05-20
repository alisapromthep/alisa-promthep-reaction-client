import React from 'react';
import './CalendarComponent.scss';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({symptomIcons}) {
    return (
        <div>
            <Calendar tileContent={ ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>component</p> : null} />

            
        </div>
    );
}

export default CalendarComponent;