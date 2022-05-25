import React from 'react';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';
import Header from '../../components/Header/Header';

function NewEntryPage({handleSymptoms, handleFood, handleSubmit, symptomIcons, foodIcons}) {
    return (
        <>
        <Header headerTitle='New Entry Form'/>
        <NewEntryForm
        handleSymptoms={handleSymptoms}
        handleFood={handleFood}
        handleSubmit={handleSubmit}
        symptomIcons={symptomIcons}
        foodIcons={foodIcons}
        />
        </>
    );
}

export default NewEntryPage;