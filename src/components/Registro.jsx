import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    edad: "", // Añadido el campo "edad"
  });

  const [mensaje, setMensaje] = useState(""); // Estado para mensajes de éxito o error
  const navigate = useNavigate(); // Hook para redirigir

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMensaje("Usuario registrado exitosamente");
      console.log(response.data);

      // Redirigir al login después del registro exitoso
      navigate("/");
    } catch (error) {
      // Verificar si el error es por correo duplicado
      if (error.response && error.response.data.error === "El correo ya está registrado") {
        setMensaje("El correo ingresado ya está registrado. Usa otro correo.");
      } else {
        setMensaje("Error al registrar usuario. Inténtalo de nuevo.");
      }
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: "",
      email: "",
      password: "",
      edad: "",
    }); // Limpia el formulario
    navigate("/"); // Redirige a otra página si es necesario
  };

  return (
    <div className="registro-container">
      <h2>Formulario de Registro</h2>
      {mensaje && <p className="mensaje">{mensaje}</p>} {/* Muestra mensajes */}
      <form className="registro-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Tu correo electrónico"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Tu contraseña"
          value={formData.password}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="edad">Edad:</label> {/* Nuevo campo para la edad */}
        <input
          type="number"
          id="edad"
          name="edad"
          placeholder="Tu edad"
          value={formData.edad}
          onChange={handleInputChange}
          required
        />

        <button type="submit" className="submit-button">
          Registrar
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default Registro;