import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import axios from 'axios';

const Admin = () => {
	const [deleteUsername, setDeleteUsername] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loggedInUsername, setLoggedInUsername] = useState('');

	const userId = localStorage.getItem('userId'); // Obtener el ID del usuario logueado

	// Fetch user data based on userId
	const fetchUser = async (id) => {
		try {
			const response = await axios.get(`http://localhost:4000/users/${id}`);
			setLoggedInUsername(response.data.username); // Establecer el nombre de usuario logueado
		} catch (error) {
			console.error('Error fetching user:', error);
			setLoggedInUsername('');
		}
	};

	useEffect(() => {
		if (userId) {
			fetchUser(userId); // Llama a la función para obtener el usuario al cargar el componente
		}
	}, [userId]);

	const handleDeleteUser = async () => {
		// Validación para no permitir borrar el usuario logueado
		if (deleteUsername.trim() === loggedInUsername) {
			setError('No puedes eliminar tu propio usuario.');
			setSuccess(null);
			return;
		}

		try {
			await axios.delete(`http://localhost:4000/users/${deleteUsername}`);
			setSuccess('Usuario eliminado exitosamente.');
			setDeleteUsername('');
			setError(null);
		} catch (err) {
			setError(
				'Error al eliminar el usuario. Asegúrate de que el nombre de usuario sea correcto.'
			);
			setSuccess(null);
		}
	};

	return (
		<Box
			p={2}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '80vh', // Ajuste para centrar más el contenido verticalmente
				textAlign: 'center',
				color: 'white',
			}}
		>
			<Typography
				variant="h4"
				style={{
					color: '#c48304',
					fontWeight: 'bold',
					fontFamily: 'Roboto, sans-serif',
				}}
				sx={{ marginBottom: 3 }}
			>
				Administrar Usuarios
			</Typography>
			<TextField
				label="Nombre de Usuario"
				variant="outlined"
				fullWidth
				value={deleteUsername}
				onChange={(e) => setDeleteUsername(e.target.value)}
				sx={{ marginBottom: 2 }}
			/>
			<Button
				variant="contained"
				color="error"
				fullWidth
				onClick={handleDeleteUser}
			>
				Eliminar Usuario
			</Button>
			{error && (
				<Typography color="error" sx={{ marginTop: 2 }}>
					{error}
				</Typography>
			)}
			{success && (
				<Typography color="success.main" sx={{ marginTop: 2 }}>
					{success}
				</Typography>
			)}
		</Box>
	);
};

export default Admin;
