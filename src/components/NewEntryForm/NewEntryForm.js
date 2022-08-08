import React from 'react';
import './NewEntryForm.scss';


function NewEntryForm ({handleSymptoms, handleSubmit, handleChange,symptomIcons,foodIcons, date,time}) {

    return (
        <form
        className='form'
        onSubmit={handleSubmit}
        >
            <div className='form__topcontainer'>
                <label className='form__label form__label--larger'>Date
                    <input
                    required
                    className='form__input'
                    type='date'
                    value={date}
                    name='date'
                    onChange={handleChange}
                    />
                </label>
                <label className='form__label form__label--larger' >What time did it happen?
                    <input
                    required
                    className='form__input'
                    type='time' 
                    value={time}
                    name='time'
                    onChange={handleChange}
                    />
                </label>
            </div>
            <div className='form__bottomcontainer'>
                <div className='form__fieldset-container'>
                    <fieldset className='form__choice-container'>
                        <legend className='form__legend'>How are you feeling today?</legend>
                        {symptomIcons.map((symptom)=>{
                            return (
                                <label
                                className='form__icon-label' 
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
                        <legend className='form__legend'>What did you eat?</legend>
                        {foodIcons.map((food)=>{
                            return (
                                <label
                                className='form__icon-label'
                                key={food.id} name={food.name}>
                                <img 
                                className='form__label-icon'
                                src={food.img_file} alt={food.name}/>
                                {food.name}
                                <input 
                                type='radio'
                                name='selectFood'
                                value={food.name}
                                onChange={handleChange}
                                />
                            </label>
                            ) 
                        })}
                    </fieldset>
                </div>
                    <label className='form__label form__label--larger form__notes'
                    name="notes">
                        Additional notes
                        <input
                        className='form__input'
                        type='textarea'
                        name="notes"
                        placeholder='Your notes here, ex. abc brand cookies *tears*'
                        />
                    </label>
                <button
                className='button form__button'
                type='submit'
                >Noted!</button>
            </div>
        </form>
    );
}


export default NewEntryForm;