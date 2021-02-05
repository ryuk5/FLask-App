import React from 'react';
import { useHistory } from 'react-router-dom';

const Delete = ({ id }) => {
    const history = useHistory()

    const deleteTodo = () => {
        fetch(`/api/todo/delete/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // Redirecting users to the index page
                history.push('/')
            })
    }

    return(
        <>
            <button onClick={deleteTodo}>Delete</button>
        </>
    );


}

export default Delete