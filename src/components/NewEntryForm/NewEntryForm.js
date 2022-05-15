import React from 'react';
import './NewEntryForm.scss';

function NewEntryForm(props) {
    return (
        <div>
            <form>
                <p>today's date</p>
                <p>time of day</p>
                <label name='food'>
                    <input
                    name='food'
                    type='text'
                    />
                </label>
            </form>
        </div>
    );
}

export default NewEntryForm;