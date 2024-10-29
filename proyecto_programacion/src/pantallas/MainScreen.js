// src/pantallas/MainScreen.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import postsData from '../mocks/posts.json'; // Importar los datos de los posts

const MainScreen = () => {
  const [posts, setPosts] = useState([]);

  // Cargar los posts desde el archivo JSON
  useEffect(() => {
    setPosts(postsData);
  }, []);

  return (
    <Box p={2} style={{ overflowY: 'auto', maxHeight: '100%' }}>
      {posts.map((post) => (
        <Paper key={post.id} elevation={2} style={{ marginBottom: '16px', padding: '16px' }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default MainScreen;