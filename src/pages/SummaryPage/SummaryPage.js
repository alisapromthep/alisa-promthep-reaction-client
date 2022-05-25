import React from 'react';
import './SummaryPage.scss';
import SummaryDetail from '../../components/SummaryDetail/SummaryDetail';
import {groupBy} from '../../util/groupBy';
import uniqid from 'uniqid';
import Header from '../../components/Header/Header';

function Summary({handleDelete, foodIcons, userLogArray}) {
    //group the logs by the same food 

    const groupByFood = groupBy('food', userLogArray)

    //put each grouping into an array, for mapping later 
    let groupLogArray = [];
    for (const property in groupByFood) {
        const foodKey = property;
        const foodLog = groupByFood[property];
        const logDetail = {[foodKey]: foodLog};
        groupLogArray.push(logDetail);
    }

    return (
        <article className='summary__container'>
            <Header headerTitle='Allergy log' />
            <div className='summary__detailbox'>
            {
            groupLogArray.map((food)=>{
                const foodKey = Object.keys(food).toString()
                const foodLog = food[foodKey]
                const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey))
                return <SummaryDetail
                key={uniqid()}
                foodKey={foodKey}
                foodLog={foodLog}
                foodIcon={foodIcon}
                handleDelete={handleDelete}
                />
            })
            }
            </div>
        </article>
    );
}

export default Summary;