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
    db.run('DELETE FROM users WHERE username = ?', [username], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar el usuario' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
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
    db.get('SELECT * FROM recipes WHERE id = ?', [recipeId], (err, row) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar la receta' });
            return;
        }
        if (!row) {
            res.status(404).json({ message: 'Receta no encontrada' });
        } else {
            res.json(row);
        }
    });
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

// Endpoint de prueba
app.get('/test', (req, res) => {
    res.send('Ruta de prueba funcionando');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});