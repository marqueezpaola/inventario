const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM producto ORDER BY producto_id');
  res.json(result.rows);
});

// Agregar producto
router.post('/', async (req, res) => {
  const { nombre, descripcion, tipo_id, proveedor_id, lote, fecha_ingreso, fecha_vencimiento, precio } = req.body;
  await db.query(
    `INSERT INTO producto (nombre, descripcion, tipo_id, proveedor_id, lote, fecha_ingreso, fecha_vencimiento, precio)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [nombre, descripcion, tipo_id, proveedor_id, lote, fecha_ingreso, fecha_vencimiento, precio]
  );
  res.json({ mensaje: 'Producto agregado correctamente' });
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM producto WHERE producto_id = $1', [id]);
  res.json({ mensaje: 'Producto eliminado' });
});

// Editar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, tipo_id, proveedor_id, lote, fecha_ingreso, fecha_vencimiento, precio } = req.body;
  await db.query(
    `UPDATE producto SET nombre = $1, descripcion = $2, tipo_id = $3, proveedor_id = $4, lote = $5, fecha_ingreso = $6, fecha_vencimiento = $7, precio = $8
     WHERE producto_id = $9`,
    [nombre, descripcion, tipo_id, proveedor_id, lote, fecha_ingreso, fecha_vencimiento, precio, id]
  );
  res.json({ mensaje: 'Producto actualizado' });
});

module.exports = router;
