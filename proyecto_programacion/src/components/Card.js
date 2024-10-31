// src/components/Card.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import CardBackground from './CardBackground'; // Import the new background component
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
    navigate(`/receta/${id}`); // Navigate to the recipe detail page
  };

  return (
    <Paper
      elevation={3}
      style={{
        ...getCardStyle(),
        margin: '8px auto',
        borderRadius: '16px', // Rounded corners
        overflow: 'hidden',
        position: 'relative',
        color: '#fff',
      }}
      onClick={handleClick} // Add click event
    >
      {/* Pass the size prop to the CardBackground component */}
      <CardBackground image={image} size={size} />

      {/* Content */}
      <Box
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '16px',
          backdropFilter: 'blur(3px)', // Slight blur for a glossy look on content
          height: '100%', // Content occupies the full height of the card
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // Space between to push content to bottom
        }}
      >
        {/* Display Image Inside Content */}
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
              width: '75%', // 25% smaller than the original width
              height: 'auto',
              borderRadius: '8px',
              margin: '8px 0',
            }}
          />
        )}

        {/* Box for title and content */}
        <Box
          style={{
            marginTop: 'auto',
            paddingBottom: '10%', // Add padding to the bottom
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