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
        margin: '16px auto',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        color: '#c48304',
      }}
      onClick={handleClick} // Agregar evento de click
    >
      {/* Usar CardBackground para la imagen de fondo */}
      <CardBackground image={image} size={size} />

      {/* Ajustar la imagen para que ocupe todo el ancho en tamaños large y medium */}
      {['large', 'medium'].includes(size) && image && (
        <Box
          style={{
            width: '100%',
            height: size === 'large' ? '75%' : '55%', // Ajustar la altura de la imagen según el tamaño
            position: 'absolute',
            top: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <Box
            component="img"
            src={image}
            alt={`${title} image`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Capa de degradado para difuminar la parte inferior */}
          <Box
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '30%', // Ajustar la altura del degradado
            }}
          />
        </Box>
      )}

      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '0px 16px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          style={{
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
            marginTop: '2px',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          style={{
            color: 'white',
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 400,
            marginTop: '1px',
          }}
        >
          {content}
        </Typography>
      </Box>
    </Paper>
  );
};

export default Card;