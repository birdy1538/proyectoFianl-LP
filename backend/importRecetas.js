const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sqlite3 = require('sqlite3').verbose();

// Crear o abrir la base de datos SQLite
const db = new sqlite3.Database('database.db');

// Ruta del archivo CSV
const csvFilePath = path.join(__dirname, 'recipes_final.csv');

// Crear la tabla de recetas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Name TEXT,
        Description TEXT,
        Images TEXT,
        RecipeCategory TEXT,
        Keywords TEXT,
        RecipeIngredientQuantities TEXT,
        RecipeIngredientParts TEXT,
        Calories REAL,
        RecipeServings INTEGER,
        RecipeInstructions TEXT,
        hours INTEGER,
        minutes INTEGER,
        totaltime_min INTEGER,
        calories_classification TEXT,
        RecipeCategory_clean TEXT,
        Keywords_clean TEXT
    )`);
});

// Leer y procesar el archivo CSV
fs.createReadStream(csvFilePath)
    .pipe(csv({ separator: ',' })) // Cambia el separador a punto y coma
    .on('data', (row) => {
        // Log para verificar el contenido de cada fila
        console.log('Row data:', row);

        // Desestructurar las propiedades del row
        const {
            Name,
            Description,
            Images,
            RecipeCategory,
            Keywords,
            RecipeIngredientQuantities,
            RecipeIngredientParts,
            Calories,
            RecipeServings,
            RecipeInstructions,
            hours,
            minutes,
            totaltime_min,
            calories_classification,
            RecipeCategory_clean,
            Keywords_clean,
        } = row;

        // Verificar si hay propiedades faltantes o undefined
        const values = [
            Name,
            Description,
            Images,
            RecipeCategory,
            Keywords,
            RecipeIngredientQuantities,
            RecipeIngredientParts,
            Calories,
            RecipeServings,
            RecipeInstructions,
            hours,
            minutes,
            totaltime_min,
            calories_classification,
            RecipeCategory_clean,
            Keywords_clean
        ];

        // Log para verificar los valores que se van a insertar
        console.log('Values to insert:', values);

        // Validar si hay propiedades undefined o null
        if (values.some(value => value === undefined)) {
            console.error('Row contains undefined values. Skipping insert.');
            return;
        }

        // Inserta cada fila en la base de datos
        const sql = `INSERT INTO recipes (Name, Description, Images, RecipeCategory, Keywords, RecipeIngredientQuantities, 
                     RecipeIngredientParts, Calories, RecipeServings, RecipeInstructions, hours, minutes, 
                     totaltime_min, calories_classification, RecipeCategory_clean, Keywords_clean) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run(sql, values, function(err) {
            if (err) {
                console.error(`Error inserting row: ${err.message}`);
            } else {
                console.log(`Inserted row with ID: ${this.lastID}`); // Log de la fila insertada
            }
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        db.close(); // Cerrar la conexión a la base de datos
    })
    .on('error', (error) => {
        console.error(`Error processing CSV file: ${error.message}`);
    });