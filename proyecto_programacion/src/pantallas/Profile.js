import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person'; // Ícono de persona
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'; // Ícono de agregar persona

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const userId = localStorage.getItem('userId');

  const fetchUser = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/users/${id}`);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUsername('');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/profile');
  };

  return (
    <Box 
      p={2} 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh', // Ajuste para centrar más el contenido verticalmente
        textAlign: 'center'
      }}
    >
      <Typography 
        variant="h4" 
        style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
          }}
        gutterBottom
      >
        {userId ? 'Perfil de Usuario' : 'Inicia Sesión o Registrate'}
      </Typography>
      
      {/* Mostrar ícono central dependiendo del estado de sesión */}
      {userId ? (
        <PersonIcon style={{ color: 'white' }} sx={{ fontSize: 80, marginBottom: 3 }} />
      ) : (
        <PersonAddAltIcon style={{ color: 'white' }} sx={{ fontSize: 80, marginBottom: 3 }} />
      )}

      {userId ? (
        <>
          <Typography 
            variant="h6" 
            style={{ 
              color: 'white', 
              fontWeight: 'bold', 
              fontFamily: 'Roboto, sans-serif',
            }}
            sx={{ marginBottom: 3 }}
          >
            Bienvenido, {username || 'Cargando...'}
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
            sx={{ marginTop: 3 }}
          >
            Cerrar Sesión
          </Button>
          {/* Botón para ir a la pantalla de administración */}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/admin')}
            sx={{ marginTop: 3 }}
          >
            Administrar Usuarios
          </Button>
        </>
      ) : (
        <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ padding: '10px 20px' }}
          >
            Iniciar Sesión
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/register')}
            sx={{ padding: '10px 20px' }}
          >
            Registrarse
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Profile;