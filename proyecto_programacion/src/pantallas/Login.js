import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../imagenes/Recipelogo.png'; // Importar la imagen

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:4000/login', {
				username,
				password,
			});
			if (response.data.message === 'Inicio de sesión exitoso') {
				localStorage.setItem('userId', response.data.userId);
				navigate('/'); // Redirigir a la pantalla principal
			}
		} catch (err) {
			setError('Invalid username or password. Please try again.');
			console.error(err);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '70vh',
				padding: 3,
			}}
		>
			{/* Imagen centrada horizontalmente */}
			<Box sx={{ mb: 3 }}>
				<img
					src={logo}
					alt="Logo"
					style={{ maxWidth: '200px', width: '100%' }}
				/>
			</Box>

			<Typography
				variant="h4"
				component="h1"
				gutterBottom
				style={{
					color: '#c48304',
					fontWeight: 'bold',
					fontFamily: 'Roboto, sans-serif',
				}}
			>
				Login
			</Typography>
			{error && <Typography color="error">{error}</Typography>}
			<form onSubmit={handleLogin} style={{ width: '100%', maxWidth: 400 }}>
				<TextField
					label="Username"
					variant="outlined"
					fullWidth
					margin="normal"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<TextField
					label="Password"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					fullWidth
					sx={{ marginTop: 2 }}
				>
					Iniciar Sesión
				</Button>
			</form>
		</Box>
	);
};

export default Login;
