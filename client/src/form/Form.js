import React from 'react';

const Form = ({ userInput, onFormChange, onFormSubmit }) => {
    
    const handleChange = (e) => {
        onFormChange(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onFormSubmit()
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" required value={userInput} onChange={handleChange} />
                <button type="submuit">Send</button>
            </form>
        </>
    );
}

export default Form;