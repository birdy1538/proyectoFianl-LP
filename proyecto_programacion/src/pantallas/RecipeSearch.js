import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	Box,
	TextField,
	Typography,
	CircularProgress,
	Grid,
	Card,
	CardMedia,
	CardContent,
} from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeSearch = () => {
	const [query, setQuery] = useState('');
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (query) {
				handleSearch(query);
			} else {
				setResults([]);
			}
		}, 300); // 300ms delay

		return () => clearTimeout(delayDebounceFn); // Cleanup the timeout on unmount or when query changes
	}, [query]);

	const handleSearch = async (searchTerm) => {
		setLoading(true);
		try {
			const response = await axios.post('http://localhost:4000/search', {
				searchTerm: searchTerm, // Ensure searchTerm is passed in the payload
			});

			console.log('Found recipes:', response.data);
			setResults(response.data); // Update results with response data
			setError(null); // Clear any previous errors
		} catch (error) {
			console.error('Error during search:', error);
			setError('Error fetching recipes.'); // Set an error message
		} finally {
			setLoading(false); // Stop loading
		}
	};

	return (
		<Box
			sx={{
				padding: '16px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Typography
				variant="h3"
				style={{
					marginBottom: '16px',
					padding: '8px 16px',
					zIndex: 1000,
					color: '#c48304',
					fontWeight: 'bold',
					fontFamily: 'Roboto, sans-serif',
				}}
			>
				Ingresa un ingrediente...
			</Typography>
			<TextField
				label="Ingresa una palabra clave de tu receta"
				variant="outlined"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				sx={{ width: '100%', maxWidth: '600px', marginBottom: '16px' }}
			/>
			{loading && <CircularProgress size={24} sx={{ marginTop: '16px' }} />}
			{error && (
				<Typography color="error" sx={{ marginTop: '16px' }}>
					{error}
				</Typography>
			)}

			{/* Scrollable Results Container */}
			{query && !loading && results.length === 0 && (
				<Typography
					variant="h5"
					style={{
						marginBottom: '16px',
						padding: '8px 16px',
						zIndex: 1000,
						color: '#c48304',
						fontWeight: 'bold',
						fontFamily: 'Roboto, sans-serif',
					}}
				>
					Lo sentimos, no encontramos resultados...
				</Typography>
			)}
			{results.length > 0 && (
				<Box
					sx={{
						width: '100%',
						maxHeight: '40vh', // Set a maximum height for the results container
						overflowY: 'auto', // Enable vertical scrolling
						marginTop: '16px',
						padding: '8px', // Optional padding for aesthetics
					}}
				>
					<Grid container spacing={2}>
						{results.map((receta) => (
							<Grid item xs={12} key={receta.id}>
								<Box
									sx={{
										display: 'flex',
										width: '100%',
										marginBottom: '16px',
									}}
								>
									<Link
										to={`/receta/${receta.id}`}
										style={{ textDecoration: 'none', width: '100%' }}
									>
										<Card
											sx={{
												display: 'flex',
												overflow: 'hidden',
												width: '100%',
												height: '70px', // Set a fixed height for all cards
											}}
										>
											<CardMedia
												component="img"
												sx={{
													width: '25%',
													height: '100%',
													objectFit: 'cover',
												}}
												image={
													receta.Images
														? JSON.parse(receta.Images.replace(/'/g, '"'))[0]
														: ''
												}
												alt={receta.Name}
											/>
											<CardContent
												sx={{
													flex: '1 0 auto',
													display: 'flex',
													flexDirection: 'column',
													justifyContent: 'space-between', // Space between title and bottom
												}}
											>
												<Typography
													variant="h8"
													noWrap={false} // Allow wrapping
													sx={{
														overflow: 'hidden',
														textOverflow: 'ellipsis',
														display: '-webkit-box',
														WebkitBoxOrient: 'vertical',
														WebkitLineClamp: 2, // Limit to 2 lines
														flexGrow: 1, // Allow name to grow
														marginBottom: '8px', // Space between name and button
													}}
												>
													{receta.Name}
												</Typography>
											</CardContent>
										</Card>
									</Link>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			)}
		</Box>
	);
};

export default RecipeSearch;
