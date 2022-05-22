import React from 'react';
import './NewEntryForm.scss';


function NewEntryForm ({handleSymptoms, handleFood, handleSubmit,symptomIcons,foodIcons}) {


    return (
        <div>
            <form
            onSubmit={handleSubmit}
            >
                <label className='form__label form__label--larger'>Date
                    <input type='date' name='date'/>
                </label>
                <label className='form__label form__label--larger' >What time did it happen?
                    <input type='time' name='time'/>
                </label>
                <fieldset className='form__choice-container'>
                    <legend>How are you feeling today?</legend>
                    {symptomIcons.map((symptom)=>{
                        return (
                            <label
                            className='form__label' 
                            key={symptom.id} 
                            name={symptom.name}>
                            <img 
                            className='form__label-icon'
                            src={symptom.img_file} alt={symptom.name}/>
                            {symptom.name}
                            <input 
                            type='checkbox'
                            value={symptom.name}
                            onChange={handleSymptoms}
                            />
                        </label>
                        ) 
                    })}
                </fieldset>
                <fieldset className='form__choice-container'>
                    <legend>What did you eat?</legend>
                    {foodIcons.map((food)=>{
                        return (
                            <label
                            className='form__label' 
                            key={food.id} name={food.name}>
                            <img 
                            className='form__label-icon'
                            src={food.img_file} alt={food.name}/>
                            {food.name}
                            <input 
                            type='radio'
                            name={food}
                            value={food.name}
                            onChange={handleFood}
                            />
                        </label>
                        ) 
                    })}
                </fieldset>
                <label className='form__label form__label--larger'
                name="notes">
                    Additional notes
                    <input
                    className='form__input'
                    type='textarea'
                    name="notes"/>
                </label>
                <button
                className='button'
                type='submit'
                >Noted!</button>
            </form>
        </div>
    );
}


export default NewEntryForm;