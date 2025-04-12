import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de éxito o error
  const navigate = useNavigate(); // Hook para redirigir al CRUD

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setMensaje(data.error); // Mostrar mensaje de error
      } else {
        setMensaje("Inicio de sesión exitoso");
        setTimeout(() => {
          navigate("/CrudUsers"); // Redirige al componente de CRUD
        }, 1000); // Redirigir con un breve retraso
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor");
      console.error("Detalles del error:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        {mensaje && <p className={`login-message ${mensaje.includes("Error") ? "login-error" : "login-success"}`}>
          {mensaje}
        </p>} 
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo:</label>
            <input
              className="form-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Contraseña:</label>
            <input
              className="form-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <Link to="/Registro" className="login-register-link">
            Ir al Registro
          </Link>
          <button className="login-button" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;