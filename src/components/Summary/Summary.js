import React from 'react';
import SummaryDetail from '../SummaryDetail/SummaryDetail';
import {groupBy} from '../../util/groupBy';

function Summary({foodIcons, userLogArray}) {

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
        <div>
            {
            groupLogArray.map((food, index)=>{
                const foodKey = Object.keys(food).toString()
                const foodLog = food[foodKey]
                const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey))
                return <SummaryDetail
                key={index}
                foodKey={foodKey}
                foodLog={foodLog}
                foodIcon={foodIcon}
                />
            })
            }
        </div>
    );
}

export default Summary;