import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Card from '../components/Card';
import axios from 'axios';

const MainScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/feedRecipes');
        setRecipes(response.data.recipes); 
      } catch (err) {
        setError('Error fetching recipes');
        console.error(err);
      }
    };

    fetchRecipes();
  }, []);

  const getRandomSize = () => {
    const sizes = ['large', 'medium', 'small'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const getRandomImage = (imagesString) => {
    const imagesArray = JSON.parse(imagesString.replace(/'/g, '"')); 
    return imagesArray.length > 0 ? imagesArray[Math.floor(Math.random() * imagesArray.length)] : 'default-image-url.jpg';
  };

  const getFirstSentence = (description) => {
    const sentenceEndings = /[.!?]/; 
    const firstSentence = description.split(sentenceEndings)[0];
    return firstSentence.trim() + (firstSentence ? '.' : ''); 
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowMessage(false);
      } else {
        setShowMessage(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box 
      p={2} 
      style={{ 
        overflowY: 'auto', 
        maxHeight: '100%', 
        position: 'relative' 
      }}
    >
      {showMessage && (
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
          ¡Hola! ¿Qué cocinaremos hoy?
        </Typography>
      )}
      {error && (
        <Typography variant="h5">Ha surgido un problema al cargar las recetas :c</Typography>
      )}
      {recipes.map((recipe) => (
        <Card
          key={recipe.id}
          title={recipe.Name} 
          content={getFirstSentence(recipe.Description)} 
          size={getRandomSize()}
          image={getRandomImage(recipe.Images)} 
          id={recipe.id}
        />
      ))}
    </Box>
  );
};

export default MainScreen;