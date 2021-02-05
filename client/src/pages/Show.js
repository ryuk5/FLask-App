import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Delete from '../delete/Delete';

const Show = () => {
    // Getting the id of the todo passed in the URL
    const { id } = useParams() // the useParams hook will return an object
    const [todo, setTodo] = useState([])

    useEffect(() => {
        fetch(`/api/todo/${id}`)
            .then(res => res.json())
            .then(data => setTodo(data))
    }, [id]) // When the ID changes i wanna fetch data de nouveau!

    return (
        <div>
            {todo.length > 0 && todo.map(data => <div key={id}>{data.content}</div>)}
            <Delete id={id} />
            <hr/>
            <Link to='/'>Back to todos</Link>
        </div>
    );
}

export default Show;