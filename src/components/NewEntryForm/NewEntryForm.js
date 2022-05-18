import React from 'react';
import './NewEntryForm.scss';

function NewEntryForm(props) {
    return (
        <div>
            <form>
                <p>today's date</p>
                <p>time of day</p>
                <label name='foodCategory'>
                    <input
                    name='foodCategory'
                    type='text'
                    />
                </label>
            </form>
        </div>
    );
}

export default NewEntryForm;