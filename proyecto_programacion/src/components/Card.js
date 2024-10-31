// src/components/Card.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import CardBackground from './CardBackground'; 
import { useNavigate } from 'react-router-dom';

const Card = ({ title, content, size, image, id }) => {
  const navigate = useNavigate();

  const getCardStyle = () => {
    switch (size) {
      case 'large':
        return { width: '100%', height: '50vh' };
      case 'medium':
        return { width: '100%', height: '30vh' };
      default:
        return { width: '100%', height: '20vh' };
    }
  };

  const handleClick = () => {
    navigate(`/receta/${id}`); // Navegar a la página de detalles de la receta
  };

  return (
    <Paper
      elevation={3}
      style={{
        ...getCardStyle(),
        margin: '8px auto',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        color: '#fff',
      }}
      onClick={handleClick} // Agregar evento de clic
    >
      <CardBackground image={image} size={size} />

      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '16px',
          backdropFilter: 'blur(3px)', // Ligera difuminación para un aspecto brillante en el contenido
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {size === 'large' && image && (
          <Box
            component="img"
            src={image}
            alt={`${title} image`}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              margin: '8px 0',
            }}
          />
        )}

        {size === 'medium' && image && (
          <Box
            component="img"
            src={image}
            alt={`${title} image`}
            style={{
              width: '75%', 
              height: 'auto',
              borderRadius: '8px',
              margin: '8px 0',
            }}
          />
        )}

        <Box
          style={{
            marginTop: 'auto',
            paddingBottom: '10%',
          }}
        >
          <Typography variant="h6" component="h2" style={{ color: size !== 'small' ? 'black' : 'white' }}>
            {title}
          </Typography>
          <Typography variant="body1" style={{ color: size !== 'small' ? 'black' : 'white' }}>
            {content}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Card;