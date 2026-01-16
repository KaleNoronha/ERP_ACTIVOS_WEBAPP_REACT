import React, { useState } from 'react'
import { Search, Plus, Package, Tag, Calendar } from 'lucide-react'

export default function ProductosView() {
    const [productos] = useState([
        { id: 1, codigo: 'PRD-001', nombre: 'ERP Empresarial', categoria: 'Software', version: '3.2.0', estado: 'Activo', fechaLanzamiento: '2023-06-15' },
        { id: 2, codigo: 'PRD-002', nombre: 'CRM Cloud', categoria: 'SaaS', version: '2.1.0', estado: 'Activo', fechaLanzamiento: '2023-09-20' },
        { id: 3, codigo: 'PRD-003', nombre: 'Portal Clientes', categoria: 'Web App', version: '1.5.0', estado: 'Activo', fechaLanzamiento: '2024-01-10' },
        { id: 4, codigo: 'PRD-004', nombre: 'App Movil', categoria: 'Mobile', version: '1.0.0', estado: 'Desarrollo', fechaLanzamiento: '2024-03-01' },
        { id: 5, codigo: 'PRD-005', nombre: 'API Gateway', categoria: 'Infraestructura', version: '2.0.0', estado: 'Activo', fechaLanzamiento: '2023-04-05' }
    ])

    const estadoColors = {
        'Activo': 'bg-green-100 text-green-800',
        'Desarrollo': 'bg-blue-100 text-blue-800',
        'Descontinuado': 'bg-gray-100 text-gray-800'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Catalogo de Productos</h2>
                    <p className="text-sm text-gray-500 mt-1">{productos.length} productos registrados</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Producto
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productos.map((producto) => (
                    <div key={producto.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                    <Package size={28} className="text-white" />
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${estadoColors[producto.estado]}`}>
                                    {producto.estado}
                                </span>
                            </div>

                            <div className="mb-2">
                                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                                    {producto.codigo}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-gray-800 mb-3">{producto.nombre}</h3>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Tag size={14} />
                                        Categoria
                                    </span>
                                    <span className="font-semibold text-gray-800">{producto.categoria}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Version</span>
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{producto.version}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Calendar size={14} />
                                        Lanzamiento
                                    </span>
                                    <span className="text-gray-800">{producto.fechaLanzamiento}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <button className="flex-1 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                    Ver detalles
                                </button>
                                <button className="flex-1 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    Editar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
