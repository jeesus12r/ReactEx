import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams(); // Captura el ID desde la URL
  const navigate = useNavigate(); // Permite redirigir después de guardar o cancelar
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    edad: "",
  });

  // Cargar los datos del usuario usando el ID
  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los datos del usuario");
      }
      const data = await response.json();
      setFormData({
        nombre: data.nombre,
        email: data.email,
        edad: data.edad, // Se asegura que sólo los campos requeridos sean manejados
      });
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUser(); // Llama al API para obtener los datos del usuario al montar el componente
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }
      navigate("/CrudUsers"); // Redirige al CRUD después de guardar los cambios
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Usuario</h2>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="number"
        name="edad"
        value={formData.edad}
        onChange={handleInputChange}
        placeholder="Edad"
        required
      />
      <button type="submit">Guardar Cambios</button>
      <button type="button" onClick={() => navigate("/CrudUsers")}>
        Cancelar
      </button>
    </form>
  );
};

export default EditUser;