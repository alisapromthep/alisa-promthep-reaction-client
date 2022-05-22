import React from 'react';
import SummaryDetail from '../SummaryDetail/SummaryDetail';

function Summary({foodIcons, userLogArray}) {

    const groupByFood = userLogArray.reduce((cache, logs)=>{
        const property = logs['food']
        if (property in cache) {
            return {...cache, [property]: cache[property].concat(logs)}
        } else {
            return {...cache, [property]:[logs]}
        }
    }, {});

    let groupLogArray = [];
    for (const property in groupByFood) {
        const foodKey = property
        const foodLog = groupByFood[property]
        const logDetail = {[foodKey]: foodLog}
        groupLogArray.push(logDetail);
    }
    console.log(groupLogArray)


    // console.log(foodIcons)

    const groupByFoodT = [
        {nuts: [{date:"02/04/22", symptom:"vomit, itchy"},{date:"04/03/22", symptom:"itchy"}]},
        {milk: [{date:"05/04/22", symptom:"vomit, stomach cramp"},{date:"10/05/22", symptom:"diarrhea"}]}
    ];

    // console.log(groupByFood[0])
    // console.log(Object.keys(groupByFood[0]).toString())

    // const forDetail = groupByFood.map((food)=>{
    //     console.log(food)
    //     console.log(Object.keys(food).toString())
    //     const foodKey = Object.keys(food).toString()
    //     const foodLog = food[foodKey]
    //     const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey)).img_file
    //     console.log(foodIcon)
    //     console.log(foodLog)
    // })



    return (
        <div>
            {
            groupLogArray.map((food)=>{
                const foodKey = Object.keys(food).toString()
                const foodLog = food[foodKey]
                const foodIcon = (foodIcons.find((icon)=> icon.name === foodKey))
                return <SummaryDetail
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