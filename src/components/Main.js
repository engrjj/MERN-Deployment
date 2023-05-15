import React , { useEffect, useState } from 'react'
import axios from 'axios'
// import ProductForm from './ProductForm';
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import ProjectList from './ProjectList';



const MainPage = () => {
    const [listOfProjects, setListOfProjects] = useState([]);

    
    return (
        <div>
            <ProjectList listOfProjects = {listOfProjects} setListOfProjects = {setListOfProjects}/>
        </div>

    )
}

export default MainPage;