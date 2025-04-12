import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CrudUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir

  // Obtener usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Acción para redirigir al componente EditUser con el ID del usuario seleccionado
  const handleEditUser = (userId) => {
    navigate(`/EditUser/${userId}`); // Redirige a la ruta parametrizada con el ID
  };

  // Acción para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Ejemplo: Elimina el token de autenticación
    sessionStorage.clear(); // Limpia el almacenamiento de sesión si es necesario
    navigate("/"); // Redirige al usuario a la página de inicio de sesión
  };

  useEffect(() => {
    fetchUsers(); // Carga los usuarios al montar el componente
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <button onClick={handleLogout} className="logout-btn">
        Cerrar Sesión
      </button>
      <h2>Usuarios:</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>{user.edad}</td>
              <td>
                <button
                  onClick={() => handleEditUser(user.id)}
                  className="edit-delete"
                >
                  Editar
                </button>
                <button className="delete-btn">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudUsers;