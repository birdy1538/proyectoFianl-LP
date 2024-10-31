import React from 'react';
import { Box } from '@mui/material';

const CardBackground = ({ image, size }) => {
  const gradientPercentage = size === 'large' ? '40%' : size === 'medium' ? '30%' : '100%';
  const transparencyLevel = size !== 'small' ? 'blur(8px)' : 'blur(1px)'

  return (
    <>
      {/* Blurred Image Background */}
      {image && (
        <Box
          component="img"
          src={image}
          alt="Background"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: transparencyLevel,
            zIndex: 0,
            borderRadius: '16px',
          }}
        />
      )}

      {/* Gradient Overlay */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3) ${gradientPercentage}, rgba(255, 255, 255, 1) 100%)`,
          zIndex: 1,
          borderRadius: '16px',
        }}
      />
    </>
  );
};

export default CardBackground;