import React from 'react';
import './SummaryDetail.scss'

function SummaryDetail({foodKey, foodLog, foodIcon }) {


    return (
        <article className='summary'>
            <div className='summary__img-container'>
            <img className='summary__img' src={foodIcon.img_file} alt={foodIcon.name}/>
            <p className='summary__img-name'>{foodIcon.name}</p>
            </div>
            <ul>
                {foodLog.map((entry, index)=>{
                    return (
                        <li key={index}>
                            {entry.date}: {entry.symptom}
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}

export default SummaryDetail;