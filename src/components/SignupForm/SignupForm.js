import React from 'react';

function SignupForm(props) {
    return (
        <div>
            <form>
                <label>
                    Name
                    <input />
                </label>
                <label>
                    Username
                    <input />
                </label>
                <label>
                    Password
                    <input />
                </label>
            </form>
        </div>
    );
}

export default SignupForm;