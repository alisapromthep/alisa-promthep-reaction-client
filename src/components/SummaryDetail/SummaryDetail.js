import React from 'react';
import './SummaryDetail.scss'
import uniqid from 'uniqid'
import {RiDeleteBin5Line} from 'react-icons/ri';

function SummaryDetail({foodLog, foodIcon, handleDelete}) {

    return (
        <article className='summary'>
            <div className='summary__img-container'>
            <img className='summary__img' src={foodIcon.img_file} alt={foodIcon.name}/>
            <p className='summary__img-name'>{foodIcon.name}</p>
            </div>
            <ul className='summary__list'>
                {foodLog.map((entry)=>{
                    const timestamp = Date.parse(entry.date);
                    let inputDate = new Date(timestamp);
                    return (
                        <li 
                        className='summary__detail'
                        key={uniqid()}> <p className='summary__text'>
                            <span className='summary__detail--bold'>{inputDate.toLocaleDateString()}</span>: {entry.symptom}</p>
                            <p><span className='summary__detail--bold'>Note</span> {entry.notes}
                            <button className='summary__delete'
                            onClick={handleDelete}
                            >
                                <RiDeleteBin5Line id={entry.id} className='summary__delete-img'/>
                            </button>
                        </p>
                        </li>
                    )
                })}
            </ul>
        </article>
    );
}

export default SummaryDetail;