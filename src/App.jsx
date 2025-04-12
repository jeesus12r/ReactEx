import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login"; // Importa el componente Login
import CrudUsers from "./components/CrudUsers"; // Importa el componente CrudUsers
import Registro from "./components/Registro"; // Importa el componente Registro
import "./App.css"; 
import EditUser from "./components/EditUser";

const App = () => {
  

  return (
    <Router>
      <Routes>
      
      <Route path="/" element={<Login />} />
      <Route path="/CrudUsers" element={<CrudUsers />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/EditUser/:id" element={<EditUser />} />

        

        
      </Routes>
    </Router>
  );
};

export default App;