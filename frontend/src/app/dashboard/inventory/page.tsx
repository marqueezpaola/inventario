'use client';
import { useEffect, useState } from 'react';

interface Producto {
  producto_id: number;
  nombre: string;
  descripcion: string;
  tipo_id: number;
  proveedor_id: number;
  lote: string;
  fecha_ingreso: string;
  fecha_vencimiento: string;
  precio: number;
}

export default function InventoryPage() {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error cargando productos:', err));
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Inventario</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.producto_id}>
              <td>{p.producto_id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.precio} Bs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
