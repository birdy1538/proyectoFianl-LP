import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId'); // Obtener el userId del localStorage

  // Función para obtener el usuario por ID
  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${id}`);
      setUsername(response.data.username); // Guardar el nombre de usuario en el estado
    } catch (error) {
      console.error('Error fetching user:', error);
      setUsername(''); 
    }
  };

  useEffect(() => {
    console.log(userId);
    if (userId) {
      fetchUser(userId); // Llamar a la función para obtener el usuario si hay userId
    }
  }, [userId]); // Ejecutar el efecto solo cuando userId cambie

  const handleLogout = () => {
    localStorage.removeItem('userId'); // Eliminar el userId del almacenamiento local
    navigate('/login'); // Redirigir a la pantalla de inicio de sesión
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Perfil
      </Typography>
      {userId ? (
        <>
          <Typography variant="h6">Bienvenido, {username || 'Cargando...'}</Typography> {/* Mostrar el nombre de usuario */}
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </>
      ) : (
        <Typography variant="h6">Hola, ¿quieres iniciar sesión?</Typography> // Mensaje si no está loggeado
      )}
      <Button variant="contained" color="primary" onClick={() => navigate('/login')} style={{ marginRight: '16px' }}>
        Iniciar Sesión
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate('/register')} style={{ marginRight: '16px' }}>
        Registrarse
      </Button>
    </Box>
  );
};

export default Profile;