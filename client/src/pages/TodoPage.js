import React, { useState, useEffect } from 'react';
import Card from '../components/card/Card';
import Form from '../form/Form';


const TodoPage = () => {

    const [todo, setTodo] = useState([])

    const [newTodo, setNewTodo] = useState('')

    useEffect(() => {
        fetch('/api/todos/')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => setTodo(data))

    }, [])

    const handleFormChange = (todoFromForm) => {
        setNewTodo(todoFromForm)
    }


    const handleFormSubmit = () => {
        fetch('/api/todos/create', {
            method: 'POST',
            body: JSON.stringify({
                // This function is used to convert the body into JSOn
                content: newTodo
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => res.json())
            .then(msg => {
                console.log(msg)
                // Cleaning the form after submitting 
                setNewTodo('')

                // Making a fetch req again so we will display the new todos without reloading the page
                getLatestTodos()

            })
    }

    const getLatestTodos = () => {
        fetch('/api/todos/')
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(data => {
                return setTodo(data);
            })

    }

    return (
        <>
            <Form userInput={newTodo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} />
            <Card listOfTodos={todo} />
        </>
    );
}




export default TodoPage;