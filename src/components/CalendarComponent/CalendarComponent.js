import React from 'react';
import './CalendarComponent.scss';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

function CalendarComponent(props) {
    return (
        <div>
            <Calendar />
        </div>
    );
}

export default CalendarComponent;