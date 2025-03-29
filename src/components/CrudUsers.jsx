import React, { useState, useEffect } from "react";
import axios from "axios";

const CrudUsers = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        nombre: "",
        email: "",
        password: "", // Ajustado para que coincida con "password"
        edad: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    // Obtener usuarios desde el backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    };

    // Crear usuario nuevo
    const handleCreateUser = async () => {
        try {
            await axios.post("http://localhost:3000/api/users", {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                edad: formData.edad,
            });
            fetchUsers();
            resetForm();
        } catch (error) {
            console.error("Error al crear el usuario:", error);
        }
    };

    // Editar usuario existente
    const handleEditUser = async () => {
        try {
            await axios.put(`http://localhost:3000/api/users/${formData.id}`, {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                edad: formData.edad,
            });
            fetchUsers();
            resetForm();
        } catch (error) {
            console.error("Error al editar el usuario:", error);
        }
    };

    // Eliminar usuario
    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
        }
    };

    // Configurar usuario para edición
    const handleSetEditUser = (user) => {
        setFormData({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            password: "", // Se requerirá ingresar una nueva contraseña al editar
            edad: user.edad,
        });
        setIsEditing(true);
    };

    // Resetear el formulario
    const resetForm = () => {
        setFormData({
            id: null,
            nombre: "",
            email: "",
            password: "",
            edad: "",
        });
        setIsEditing(false);
    };

    // Manejo de cambios en el formulario
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Obtener usuarios al montar el componente
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    isEditing ? handleEditUser() : handleCreateUser();
                }}
            >
                <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={!isEditing}
                />
                <input
                    type="number"
                    name="edad"
                    placeholder="Edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">{isEditing ? "Actualizar Usuario" : "Crear Usuario"}</button>
                {isEditing && <button onClick={resetForm}>Cancelar</button>}
            </form>

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
                                <button onClick={() => handleSetEditUser(user)} className="edit-btn">
                                    Editar
                                </button>
                                <button onClick={() => handleDeleteUser(user.id)} className="delete-btn">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrudUsers;
