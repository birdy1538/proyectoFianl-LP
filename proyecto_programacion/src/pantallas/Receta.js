// src/pantallas/Receta.js
import React from 'react';
import { useParams } from 'react-router-dom';
import postsData from '../mocks/posts.json';

const Receta = () => {
  const { id } = useParams();
  const post = postsData.find((post) => post.id === parseInt(id)); // Find the post by ID

  if (!post) {
    return <div>Post not found</div>; // Handle post not found
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Display more post details here if needed */}
    </div>
  );
};

export default Receta;