import React from 'react';
import SummaryDetail from '../SummaryDetail/SummaryDetail';

function Summary({foodIcons, userLogArray}) {

    //group the logs by the same food 

    const groupByFood = userLogArray.reduce((cache, logs)=>{
        const property = logs['food']
        if (property in cache) {
            return {...cache, [property]: cache[property].concat(logs)}
        } else {
            return {...cache, [property]:[logs]}
        }
    }, {});

    //put each grouping into an array, for mapping later 
    let groupLogArray = [];
    for (const property in groupByFood) {
        const foodKey = property
        const foodLog = groupByFood[property]
        const logDetail = {[foodKey]: foodLog}
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