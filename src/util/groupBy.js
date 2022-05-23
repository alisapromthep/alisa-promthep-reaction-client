export const groupBy = (key, array)=> { return array.reduce((cache, logs)=>{
    const property = logs[key];
    if (property in cache) {
        return {...cache, [property]: cache[property].concat(logs)};
    } else {
        return {...cache, [property]:[logs]};
    }
}, {});
}

