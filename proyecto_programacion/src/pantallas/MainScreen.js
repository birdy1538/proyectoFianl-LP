import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Card from '../components/Card';
import postsData from '../mocks/posts.json';

const MainScreen = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(postsData);
  }, []);

  const getRandomSize = () => {
    const sizes = ['large', 'medium', 'small'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };

  const getRandomImage = () => {
    return `https://picsum.photos/600/400?random=${Math.floor(Math.random() * postsData.length) + 1}`;
  };

  return (
    <Box p={2} style={{ overflowY: 'auto', maxHeight: '100%' }}>
      {posts.map((post) => (
        <Card
          key={post.id}
          title={post.title}
          content={post.content}
          size={getRandomSize()}
          image={getRandomImage()}
          id={post.id}
        />
      ))}
    </Box>
  );
};

export default MainScreen;