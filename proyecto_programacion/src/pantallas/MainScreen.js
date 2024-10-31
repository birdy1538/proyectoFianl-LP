import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Card from '../components/Card';
import postsData from '../mocks/posts.json';

// List of random food image URLs
const randomImages = [
  'https://picsum.photos/600/400?random=1',
  'https://picsum.photos/600/400?random=2',
  'https://picsum.photos/600/400?random=3',
  'https://picsum.photos/600/400?random=4',
  'https://picsum.photos/600/400?random=5',
];

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
    return randomImages[Math.floor(Math.random() * randomImages.length)];
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