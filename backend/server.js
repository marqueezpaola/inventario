const express = require('express');
const cors = require('cors');
const productosRouter = require('./database/routes/productos.js'); // ✅ ruta correcta a productos.js
const db = require('./database/db.js'); // ✅ CORRECTO


const app = express()
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Probar conexión
db.query('SELECT NOW()')
  .then(res => console.log("✅ Conexión exitosa:", res.rows[0]))
  .catch(err => console.error("❌ Error de conexión:", err));

// Rutas
app.use('/api/productos', productosRouter);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
