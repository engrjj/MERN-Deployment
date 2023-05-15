import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Link, Routes, Route, useParams, useNavigate } from "react-router-dom";

const DeleteProject = (props) => {
    const {id, removeFromCompleted} = props;
    const navigate = useNavigate();
    const deleteHandler = (idFromBelow, name) => {
        console.log(idFromBelow);
        console.log(name);
        if (window.confirm("Delete this project?")) {
            axios.delete("http://localhost:8000/api/delete/" + idFromBelow)
            .then (res => {
                console.log(res.data.project);
                window.alert("Successfully removed the project!");
                removeFromCompleted(id);
            })
            .catch(err => console.log(err))
        }

    }

    return (
        <div className="description">
            <button onClick={()=> deleteHandler(id)}>Delete</button>
        </div>

    )
}

export default DeleteProject;