// ... (código existente)

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 4000;
const SECRET_KEY = 'mi_secreto'; // Cambia esto por una clave más segura en producción

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./database.db');

// Middleware para manejar JSON
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al registrar el usuario' });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: this.lastID });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username y password son requeridos' });
    }

    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ 
            message: 'Inicio de sesión exitoso', 
            token, 
            userId: user.id // Devolviendo el ID del usuario
        });
    });
});

// Endpoint para obtener un usuario por ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    db.get('SELECT id, username FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(row);
    });
});

// Endpoint para eliminar un usuario por nombre
app.delete('/users/:username', (req, res) => {
    const username = req.params.username;

    // Buscar el ID del usuario por nombre de usuario
    db.get('SELECT id FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al buscar el usuario' });
        }
        if (!row) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userId = row.id;

        // Eliminar los registros de la tabla de unión 'recetasFavoritas'
        db.run('DELETE FROM recetasFavoritas WHERE userId = ?', [userId], function(err) {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar recetas favoritas' });
            }

            // Eliminar al usuario de la tabla 'users'
            db.run('DELETE FROM users WHERE id = ?', [userId], function(err) {
                if (err) {
                    return res.status(500).json({ error: 'Error al eliminar el usuario' });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ message: 'Usuario no encontrado' });
                }
                res.json({ message: 'Usuario y sus registros relacionados eliminados exitosamente' });
            });
        });
    });
});

// Endpoint para obtener todos los usuarios registrados (sin contraseñas)
app.get('/users', (req, res) => {
    db.all('SELECT id, username FROM users', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener los usuarios' });
        }
        res.json(rows);
    });
});

// Endpoint para buscar una receta por ID
app.get('/recipes/:id', (req, res) => {
    const recipeId = req.params.id;
    const userId = req.query.userId; // userId puede ser null o undefined

    let query;
    let params;

    if (userId) {
        // Si hay userId, ejecutamos la consulta que incluye la verificación de favorito
        query = `
            SELECT 
                r.*, 
                CASE 
                    WHEN rf.recetaId IS NOT NULL THEN 1
                    ELSE 0
                END AS isFavorite
            FROM 
                recipes r
            LEFT JOIN 
                recetasFavoritas rf ON r.id = rf.recetaId AND rf.userId = ?
            WHERE 
                r.id = ?
        `;
        params = [userId, recipeId];
    } else {
        // Si no hay userId, solo consultamos la receta sin verificar favoritos
        query = `
            SELECT 
                r.*
            FROM 
                recipes r
            WHERE 
                r.id = ?
        `;
        params = [recipeId];
    }

    db.get(query, params, (err, row) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Error al buscar la receta' });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Receta no encontrada' });
        } else {
            // Si hay userId, convertimos el campo `isFavorite` a booleano
            if (userId) {
                row.isFavorite = row.isFavorite === 1;
            } else {
                row.isFavorite = false; // No hay forma de determinar si es favorita sin userId
            }
            res.json(row);
        }
    });
});

// Consulta para obtener las recetas favoritas del usuario
app.get('/favorites/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT 
            r.id,
            r.Name,
            r.Description,
            r.Images
        FROM 
            recetasFavoritas rf
        INNER JOIN 
            recipes r ON rf.recetaId = r.id
        WHERE 
            rf.userId = ?
    `;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar las recetas favoritas' });
            return;
        }
        if (rows.length === 0) {
            res.status(404).json({ message: 'No se encontraron recetas favoritas' });
        } else {
            res.json(rows); // Los nombres de los campos se mantienen originales
        }
    });
});

// Endpoint para eliminar una receta favorita
app.delete('/removeFavorite', (req, res) => {
    const recetaId = req.body.recetaId; // Se espera que el ID de la receta venga en el cuerpo de la solicitud
    const userId = req.body.userId; // El ID del usuario viene como un parámetro de consulta

    if (!recetaId || !userId) {
        return res.status(400).json({ error: 'recetaId y userId son requeridos' });
    }

    // Ejecutar la consulta para eliminar la receta favorita
    db.run('DELETE FROM recetasFavoritas WHERE userId = ? AND recetaId = ?', [userId, recetaId], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la receta favorita' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Receta favorita no encontrada' });
        }
        res.json({ message: 'Receta favorita eliminada exitosamente' });
    });
});

// Search endpoint
app.post('/search', async (req, res) => {
    const { searchTerm } = req.body; // Get the search term from the request body

    if (!searchTerm) {
        return res.status(400).json({ message: 'Search term is required' });
    }

    // Construct the SQL query as a string using placeholders
    const query = `
        SELECT * FROM recipes 
        WHERE keywords_clean LIKE ? 
        LIMIT 20
    `;

    // Create the parameter for the query
    const params = [`%${searchTerm}%`];

    try {
        // Use db.all() to execute the parameterized query
        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Error fetching recipes:', err.message);
                return res.status(500).json({ message: 'Internal server error' });
            }
            return res.json(rows); // Return the recipes found
        });
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para obtener 15 recetas aleatorias
app.get('/feedRecipes', (req, res) => {
    const sql = `SELECT * FROM recipes ORDER BY RANDOM() LIMIT 15`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching recipes:', err.message);
            return res.status(500).json({ error: 'Error fetching recipes' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No recipes found' });
        }

        res.json({
            recipes: rows
        });
    });
});

// Endpoint para agregar o quitar recetas favoritas
app.put('/favorites', (req, res) => {
    const { userId, recetaId } = req.body;

    if (!userId || !recetaId) {
        return res.status(400).json({ error: 'userId y recetaId son requeridos' });
    }

    // Verificar si la receta ya está en las favoritas del usuario
    db.get('SELECT * FROM RecetasFavoritas WHERE userId = ? AND recetaId = ?', [userId, recetaId], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error al verificar la receta favorita' });
        }

        if (row) {
            // Si la receta ya existe, eliminarla (quitar de favoritos)
            db.run('DELETE FROM RecetasFavoritas WHERE userId = ? AND recetaId = ?', [userId, recetaId], function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Error al quitar la receta de favoritos' });
                }
                return res.json({ message: 'Receta quitada de favoritos' });
            });
        } else {
            // Si la receta no existe, agregarla (añadir a favoritos)
            db.run('INSERT INTO RecetasFavoritas (userId, recetaId) VALUES (?, ?)', [userId, recetaId], function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Error al agregar la receta a favoritos' });
                }
                return res.json({ message: 'Receta agregada a favoritos' });
            });
        }
    });
});

// Endpoint de prueba
app.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});