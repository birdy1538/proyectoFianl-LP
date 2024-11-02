import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete'; // Importar el ícono de eliminación

const Favoritos = () => {
  const [favoritas, setFavoritas] = useState([]);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchFavoritas = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/favorites/${userId}`);
        
        if (response.data.length > 0) {
          console.log('Recetas favoritas obtenidas:', response.data);
          setFavoritas(response.data);
        } 
      } catch (err) {
        setError('Parece que no tienes recetas favoritas :/');
        console.error(err);
      }
    };

    if (userId) {
      fetchFavoritas();
    }
  }, [userId]);

  const handleRemoveFavorite = async (recetaId) => {
    try {
      await axios.delete(`http://localhost:4000/removeFavorite`, {
        data: { userId, recetaId },
      });
      setFavoritas(favoritas.filter((receta) => receta.id !== recetaId));
    } catch (error) {
      console.error('Error eliminando la receta favorita:', error);
    }
  };

  // Check for userId and render message if not present
  if (!userId) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          padding: '16px', 
          height: '100vh', // Use full height for centering
          justifyContent: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          style={{ 
            marginBottom: '16px', 
            padding: '8px 16px', 
            zIndex: 1000,
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Parece que no estás conectado a ninguna cuenta
        </Typography>
        <Typography 
          variant="h7" 
          style={{ 
            marginBottom: '16px', 
            padding: '8px 16px', 
            zIndex: 1000,
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Para ver tus recetas favoritas inicia sesión
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/login" 
          sx={{ marginTop: '16px' }} // Add margin to the button
        >
          Iniciar sesión
        </Button>
      </Box>
    );
  }

  if (error) {
    return (
      <>
        <Typography 
          variant="h3" 
          style={{ 
            marginBottom: '16px', 
            padding: '8px 16px', 
            zIndex: 1000,
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Oh vaya...
        </Typography>
        <Typography variant="h5">{error}</Typography>
      </>
    );
  }

  if (!favoritas.length) {
    return (
      <>
        <Typography 
          variant="h3" 
          style={{ 
            marginBottom: '16px', 
            padding: '8px 16px', 
            zIndex: 1000,
            color: 'white', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Oh vaya...
        </Typography>
        <Typography variant="h5">No tienes recetas favoritas aún.</Typography>
      </>
    );
  }

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '16px', 
        maxHeight: '80vh',
        overflowY: 'auto'
      }}
    >
      <Typography 
        variant="h3" 
        style={{ 
          marginBottom: '16px', 
          padding: '8px 16px', 
          zIndex: 1000,
          color: 'white', 
          fontWeight: 'bold', 
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Tus Recetas Favoritas
      </Typography>
      {favoritas.map((receta) => (
        <Box 
          key={receta.id} 
          sx={{ 
            display: 'flex', 
            width: '100%', 
            maxWidth: '800px', 
            marginBottom: '16px' 
          }}
        >
          <Link to={`/receta/${receta.id}`} style={{ textDecoration: 'none', width: '80%' }}>
            <Card 
              sx={{ 
                display: 'flex', 
                overflow: 'hidden',
                width: '100%',
                height: '70px' 
              }}
            >
              <CardMedia
                component="img"
                sx={{ 
                  width: '25%', 
                  height: '100%', 
                  objectFit: 'cover' 
                }}
                image={receta.Images ? JSON.parse(receta.Images.replace(/'/g, '"'))[0] : ''}
                alt={receta.Name}
              />
              <CardContent 
                sx={{ 
                  flex: '1 0 auto', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column'
                }}
              >
                <Typography 
                  variant="h8" 
                  noWrap={false} // Permitir el wrapping
                  sx={{ 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis', 
                    display: '-webkit-box', 
                    WebkitBoxOrient: 'vertical', 
                    WebkitLineClamp: 2, // Limitar a 2 líneas
                    flexGrow: 1, // Permitir que el nombre crezca
                    marginBottom: '8px', // Espacio entre el nombre y el botón
                  }}
                >
                  {receta.Name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
          <Box 
            sx={{ 
              width: '20%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <IconButton 
              aria-label="eliminar" 
              onClick={(e) => {
                e.stopPropagation(); 
                handleRemoveFavorite(receta.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Favoritos;