import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Link, Routes, Route, useParams, Navigate } from "react-router-dom";
import MainPage from './components/Main';
import CreateProject from './components/CreateProject';




function App() {

  return (
    <div className="App">
      <h1>Project Manager</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/projects" element={<MainPage/>} default/>
          <Route path ="/" element={<Navigate to ="/projects" replace/>}/>
          <Route path="/projects/new" element={<CreateProject/>}/>
          {/* <Route path="/project/:id" element={<DisplayAuthor/>}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
