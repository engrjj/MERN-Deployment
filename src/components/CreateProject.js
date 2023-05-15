import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import moment from 'moment';


const CreateProject = (props) => {
    const dateToday = moment().format("L");
    moment.suppressDeprecationWarnings = true;
    const [newProject, setNewProject] = useState({
        p_name: "",
        due_date: "",
        status: "backlog"
    });

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        if (newProject.p_name.length > 2 && moment(newProject.due_date).isAfter(dateToday)) {
            axios.post("http://localhost:8000/api/addproject", newProject)
            .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("/");
    
            })
            .catch(err=>console.log(err))
        }
        else {
                window.alert("Please fill the fields correctly.")
        }
    }
    
    const changeHandler = (e) => {
        const ProjectVals = {...newProject};
        ProjectVals[e.target.name] = e.target.value;
        setNewProject(ProjectVals);
    }
    console.log(newProject)
    return (
        <>
            <div>
            <Link to="/">Back to Dashboard</Link>
            <hr/>
            <h3>Plan a New Project</h3>
            <form onSubmit={submitHandler}>
                <div style={{margin: "20px"}}>
                    <label>Project: </label>
                    <input type="text" name="p_name" onChange = {(e)=>changeHandler(e)}/>
                    {newProject.p_name.length < 3 && <p className="validation">Project Name must be at least 3 characters long.</p>}
                </div>
                <div style={{margin: "20px"}}>
                    <label>Date: </label>
                    <input type="date" name="due_date" onChange = {(e)=>changeHandler(e)}/>
                    {moment(newProject.due_date).isBefore(dateToday) && <p className="validation">Please provide a Valid Due Date.</p>}
                    {newProject.due_date == "" && <p className="validation">Please provide a Valid Due Date.</p>}
                </div>
                <input type="submit" value="Plan Project"/>
            </form>
        </div>
        </>
    )
}

export default CreateProject;