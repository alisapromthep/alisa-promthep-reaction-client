import React from 'react';
import NewEntryForm from '../../components/NewEntryForm/NewEntryForm';

function NewEntryPage({handleSymptoms, handleFood, handleSubmit, symptomIcons, foodIcons}) {
    return (
        <NewEntryForm
        handleSymptoms={handleSymptoms}
        handleFood={handleFood}
        handleSubmit={handleSubmit}
        symptomIcons={symptomIcons}
        foodIcons={foodIcons}
        />
    );
}

export default NewEntryPage;