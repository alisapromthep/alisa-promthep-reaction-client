import React from 'react';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';
import Header from '../../components/Header/Header';

function NewEntryPage({handleSymptoms, handleSubmit, handleChange, symptomIcons, foodIcons, date, time}) {

    return (
        <>
        <Header headerTitle='New Entry Form'/>
        <NewEntryForm
        handleSymptoms={handleSymptoms}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        symptomIcons={symptomIcons}
        foodIcons={foodIcons}
        date={date}
        time={time}
        />
        </>
    );
}

export default NewEntryPage;