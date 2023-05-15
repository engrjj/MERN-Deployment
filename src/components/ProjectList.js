import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { BrowserRouter, Link, Routes, Route, useNavigate } from "react-router-dom";
import DeleteProject from './Deleter';
import moment from 'moment'


const ProjectList = (props) => {
    const {listOfProjects, setListOfProjects} = props;
    const [backlog, setBacklog] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [progress, setProgress] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8000/api/allprojectsinbacklog")
        .then((res) => {
            setListOfProjects(res.data.projects);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [backlog])
    useEffect(() => {
        axios.get("http://localhost:8000/api/allprojectsinprogress")
        .then((res) => {
            setProgress(res.data.projects);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [progress])
    useEffect(() => {
        axios.get("http://localhost:8000/api/allprojectscompleted")
        .then((res) => {
            setCompleted(res.data.projects);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [completed])
    const removeFromBacklog = projectId => {
        setListOfProjects(listOfProjects.filter(project => project._id != projectId));
    }
    const removeFromInProgress = projectId => {
        setProgress(progress.filter(project => project._id != projectId));
    }
    const removeFromCompleted = projectId => {
        setCompleted(completed.filter(project => project._id != projectId));
    }

    const startHandler = (projectId) => {
        axios.patch("http://localhost:8000/api/editproject/" + projectId, {status: "in_progress"})
        .then(res => {
            removeFromBacklog(projectId);
        })
        .catch(err=>console.log(err))
    }

    const completeHandler = (projectId) => {
        axios.patch("http://localhost:8000/api/editproject/" + projectId, {status: "completed"})
        .then(res => {
            removeFromInProgress(projectId);
        })
        .catch(err=>console.log(err))
    }

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    return (
        <>
            <hr/>
            <main className="displayProjects">
                <div className="projectList">
                <h3 style={{backgroundColor: "lightblue"}}>Backlog</h3>
                { listOfProjects.map((project, index) => {
                    return (
                        <div key={index}>
                            <p>{project.p_name}</p>
                            <p>Due: {moment(project.due_date).format('L')}</p>
                            <button onClick={()=> startHandler(project._id)}>Start Project</button>
                        </div>
                    )
                }) }
                </div>
                <div className="projectList">
                <h3 style={{backgroundColor: "yellow"}}>In Progress</h3>
                { progress.map((project, index) => {
                    return (
                        <div key={index}>
                            <p>{project.p_name}</p>
                            <p>Due: {moment(project.due_date).format('L')}</p>
                            <button onClick={()=> completeHandler(project._id)}>Move to Completed</button>
                        </div>
                    )
                }) }
                </div>
                <div className="projectList">
                <h3 style={{backgroundColor: "lightgreen"}}>Completed</h3>
                { completed.map((project, index) => {
                    return (
                        <div key={index}>
                            <p>{project.p_name}</p>
                            <p>Due: {moment(project.due_date).format('L')}</p>
                            <DeleteProject id={project._id} removeFromCompleted={removeFromCompleted}/>
                        </div>
                    )
                }) }
                </div>
            </main>
            <Link to="/projects/new">Add a New Project</Link>
        </>

    )
}

export default ProjectList;