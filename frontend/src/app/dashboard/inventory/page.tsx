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

export default function InventarioPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [nuevo, setNuevo] = useState<Partial<Producto>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const res = await fetch('http://localhost:3001/api/productos');
    const data = await res.json();
    setProductos(data);
  };

  const guardarProducto = async () => {
    const method = editandoId ? 'PUT' : 'POST';
    const url = editandoId
      ? `http://localhost:3001/api/productos/${editandoId}`
      : 'http://localhost:3001/api/productos';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });

    setNuevo({});
    setEditandoId(null);
    fetchProductos();
  };

  const eliminarProducto = async (id: number) => {
    await fetch(`http://localhost:3001/api/productos/${id}`, { method: 'DELETE' });
    fetchProductos();
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">PerfumeVault</h1>
          <p className="text-gray-500">Gestión elegante de tu inventario de fragancias</p>
        </div>
        <button
          onClick={guardarProducto}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded shadow"
        >
          {editandoId ? 'Actualizar' : '+ Añadir Perfume'}
        </button>
      </div>

      {/* Campos de nuevo producto */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <input value={nuevo.nombre || ''} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} placeholder="Nombre" className="p-2 border rounded" />
        <input value={nuevo.descripcion || ''} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} placeholder="Descripción" className="p-2 border rounded" />
        <input value={nuevo.precio || ''} type="number" onChange={e => setNuevo({ ...nuevo, precio: Number(e.target.value) })} placeholder="Precio" className="p-2 border rounded" />
        <input value={nuevo.lote || ''} type="text" onChange={e => setNuevo({ ...nuevo, lote: e.target.value })} placeholder="Lote" className="p-2 border rounded" />
      </div>

      {productos.map(p => (
        <div key={p.producto_id} className="bg-white rounded shadow p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold">{p.nombre}</h2>
              <p className="text-sm text-gray-500">{p.descripcion}</p>
              <p className="text-sm text-gray-400">Lote: {p.lote}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-800 font-semibold">{p.precio} Bs</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => {
                    setNuevo(p);
                    setEditandoId(p.producto_id);
                  }}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarProducto(p.producto_id)}
                  className="bg-red-100 text-red-700 px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
