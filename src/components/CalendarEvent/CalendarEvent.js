import React from 'react';
import './CalendarEvent.scss';

function CalendarEvent({food, foodIcons}) {

    const foodInfo = foodIcons.find((icon)=>icon.name === food)

    return (
        <div>
            <img className='calendar__img' src={foodInfo.img_file} alt={foodInfo.name}/>
        </div>
    );
}

export default CalendarEvent;