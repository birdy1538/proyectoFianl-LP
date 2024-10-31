import React from 'react';
import { useParams } from 'react-router-dom';
import postsData from '../mocks/posts.json';

const Receta = () => {
  const { id } = useParams();
  const post = postsData.find((post) => post.id === parseInt(id)); // Buscar el post por ID

  if (!post) {
    return <div>Post not found</div>; // Manejar el caso de post no encontrado
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Mostrar más detalles del post aquí si es necesario */}
    </div>
  );
};

export default Receta;