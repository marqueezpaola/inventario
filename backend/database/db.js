// backend/database/db.js
const { Pool } = require('pg');

// Cambia estos datos por los de tu base real
const db = new Pool({
    user: 'postgres',            // valor por defecto
    host: 'localhost',           // valor por defecto
    database: 'inventario',        // base por defecto si no creaste otra
    password: '1542',            // tu contraseña personalizada
    port: 5432                   // puerto por defecto
  });
module.exports = db;
