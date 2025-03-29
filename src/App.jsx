import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login"; // Importa Login correctamente
import CrudUsers from "./components/CrudUsers"; // Importa CrudUsers correctamente
import "./App.css"; // Corregir ruta de estilos

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Ruta protegida del CRUD */}
        <Route
          path="/crud"
          element={
            isAuthenticated ? (
              <CrudUsers />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Redirigir cualquier otra ruta al Login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
