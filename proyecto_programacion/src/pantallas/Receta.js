import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, ToggleButton } from '@mui/material';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Receta = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Simulamos que obtenemos el userId del localStorage (puede ser modificado según tu contexto)
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        let response;

        if (userId) {
          // Si hay userId, envía el parámetro de consulta
          response = await axios.get(`http://localhost:4000/recipes/${id}`, {
            params: { userId }
          });
        } else {
          // Si no hay userId, omite el parámetro de consulta
          response = await axios.get(`http://localhost:4000/recipes/${id}`);
        }

        setRecipe(response.data);
        if (userId) {
          setIsFavorite(response.data.isFavorite); // Asume que la respuesta incluye isFavorite
        }
      } catch (err) {
        setError('Error fetching recipe');
        console.error(err);
      }
    };

    fetchRecipeById();
  }, [id, userId]);

  const handleFavoriteToggle = async () => {
    try {
      const response = await axios.put('http://localhost:4000/favorites', {
        userId: userId,
        recetaId: id
      });
      setIsFavorite(!isFavorite);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al modificar la receta favorita:', error);
    }
  };

  if (error) {
    return <Typography variant="h5">Hubo un error buscando esta receta</Typography>;
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
      return null;
    }
  };

  // Función para manejar el análisis de instrucciones
  const getParsedInstructions = (instructionsString) => {
    try {
      return JSON.parse(instructionsString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing instructions:', error);
      return null;
    }
  };

  // Analizar imágenes e instrucciones
  const images = recipe.Images ? getParsedImages(recipe.Images) : null;
  const instructions = recipe.RecipeInstructions ? getParsedInstructions(recipe.RecipeInstructions) : null;

  return (
    <Box sx={{ height: '85vh', overflowY: 'auto', display: 'flex', flexDirection: 'column'}}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', paddingBottom: '100px'}}>
        <Box sx={{ position: 'relative', height: '66.67%' }}>
          <Box
            component="img"
            src={images ? images[0] : ''}
            alt={recipe.Name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              marginBottom: '16px',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '25%',
              background: 'linear-gradient(to top, #f19f04, transparent)',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          />
          <Typography
            variant="h3"
            sx={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              textAlign: 'center',
            }}
          >
            {recipe.Name}
          </Typography>
        </Box>

        <Box
          sx={{
            padding: '16px',
            backgroundColor: '#c48304',
            borderRadius: '16px',
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: '16px', color: '#3d2802', fontWeight: 'normal', fontFamily: 'Roboto, sans-serif' }}>
            {recipe.Description}
          </Typography>

          {/* Botón de toggle para agregar/quitar de favoritos */}
          {userId && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
              <ToggleButton
                value="check"
                selected={isFavorite}
                onChange={handleFavoriteToggle}
                sx={{ color: isFavorite ? 'black' : 'white' }}
              >
                {isFavorite ? <BookmarkAddedIcon /> : <BookmarkIcon />}
              </ToggleButton>
            </Box>
          )}

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