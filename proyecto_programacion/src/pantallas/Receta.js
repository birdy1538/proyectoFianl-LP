import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const Receta = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError('Error fetching recipe');
        console.error(err);
      }
    };

    fetchRecipeById();
  }, [id]);

  if (error) {
    return <Typography variant="h5" >Hubo un error buscando esta receta</Typography> ;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Función para manejar el análisis de imágenes
  const getParsedImages = (imagesString) => {
    try {
      return JSON.parse(imagesString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing images:', error);
      return null; // Devolver null en caso de error de análisis
    }
  };

  // Función para manejar el análisis de instrucciones
  const getParsedInstructions = (instructionsString) => {
    try {
      return JSON.parse(instructionsString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing instructions:', error);
      return null; // Devolver null en caso de error de análisis
    }
  };

  // Analizar imágenes e instrucciones
  const images = recipe.Images ? getParsedImages(recipe.Images) : null;
  const instructions = recipe.RecipeInstructions ? getParsedInstructions(recipe.RecipeInstructions) : null;

  return (
    <Box sx={{ height: '85vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      {/* Combined Image and Content Section */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {/* Image Section with Gradient */}
        <Box sx={{ position: 'relative', height: '66.67%' }}>
          <Box
            component="img"
            src={images ? images[0] : ''} // Usar imágenes o cadena vacía si no hay imágenes
            alt={recipe.Name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              marginBottom: '16px',
              borderBottomLeftRadius: '16px', // Rounded bottom left corners
              borderBottomRightRadius: '16px', // Rounded bottom right corners
            }}
          />
          {/* Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '25%', // Gradient covers the bottom 25%
              background: 'linear-gradient(to top, #f19f04, transparent)',
              borderBottomLeftRadius: '16px', // Rounded bottom left corners
              borderBottomRightRadius: '16px', // Rounded bottom right corners
            }}
          />
          {/* Title Positioned at the Center Bottom */}
          <Typography 
            variant="h3" // Use h3 for a larger title
            sx={{ 
              position: 'absolute', 
              bottom: '10%', // Adjust as needed to center vertically
              left: '50%', 
              transform: 'translateX(-50%)', 
              color: 'white', 
              fontWeight: 'bold', 
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'center', // Center the text
            }}
          >
            {recipe.Name}
          </Typography>
        </Box>
        
        {/* Content Section */}
        <Box
          sx={{
            padding: '16px', // Padding for content
            backgroundColor: '#c48304',
            borderRadius: '16px', 
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: '16px', color: '#3d2802', fontWeight: 'normal', fontFamily: 'Roboto, sans-serif' }}>
            {recipe.Description}
          </Typography>
          {instructions && 
          <Typography variant="h6" sx={{ marginBottom: '8px', color: '#3d2802', fontWeight: 'normal', fontFamily: 'Roboto, sans-serif' }}>
            Instructions:
          </Typography>
          }
          {instructions && instructions.map((step, index) => (
            <Typography key={index} variant="body1" component="p" sx={{ marginBottom: '8px', listStyleType: 'disc', marginLeft: '20px', color: '#3d2802', fontWeight: 'normal', fontFamily: 'Roboto, sans-serif' }}>
              {"- " + step}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Receta;