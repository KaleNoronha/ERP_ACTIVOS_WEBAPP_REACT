import React, { useState } from 'react'
import { Search, Plus, Database, Table, FileText } from 'lucide-react'

export default function DatosView() {
    const [modelos] = useState([
        { id: 1, nombre: 'Usuarios', tipo: 'Tabla', baseDatos: 'PostgreSQL', esquema: 'public', descripcion: 'Informacion de usuarios del sistema', campos: 15 },
        { id: 2, nombre: 'Productos', tipo: 'Tabla', baseDatos: 'PostgreSQL', esquema: 'inventory', descripcion: 'Catalogo de productos', campos: 22 },
        { id: 3, nombre: 'Ordenes', tipo: 'Tabla', baseDatos: 'PostgreSQL', esquema: 'sales', descripcion: 'Ordenes de compra', campos: 18 },
        { id: 4, nombre: 'Logs', tipo: 'Coleccion', baseDatos: 'MongoDB', esquema: 'logs', descripcion: 'Registros de actividad', campos: 8 },
        { id: 5, nombre: 'Sesiones', tipo: 'Cache', baseDatos: 'Redis', esquema: 'sessions', descripcion: 'Sesiones de usuario activas', campos: 5 }
    ])

    const tipoColors = {
        'Tabla': 'bg-blue-100 text-blue-800',
        'Coleccion': 'bg-green-100 text-green-800',
        'Cache': 'bg-red-100 text-red-800',
        'Vista': 'bg-purple-100 text-purple-800'
    }

    const dbColors = {
        'PostgreSQL': 'bg-indigo-50 border-indigo-200',
        'MongoDB': 'bg-green-50 border-green-200',
        'Redis': 'bg-red-50 border-red-200'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Modelos de Datos</h2>
                    <p className="text-sm text-gray-500 mt-1">{modelos.length} modelos registrados</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Modelo
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar modelos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelos.map((modelo) => (
                    <div key={modelo.id} className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-2 ${dbColors[modelo.baseDatos]} overflow-hidden`}>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                    {modelo.tipo === 'Tabla' ? <Table size={24} className="text-white" /> : <Database size={24} className="text-white" />}
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tipoColors[modelo.tipo]}`}>
                                    {modelo.tipo}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg text-gray-800 mb-2">{modelo.nombre}</h3>
                            <p className="text-sm text-gray-600 mb-4">{modelo.descripcion}</p>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Base de Datos</span>
                                    <span className="font-semibold text-gray-800">{modelo.baseDatos}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Esquema</span>
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{modelo.esquema}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Campos</span>
                                    <span className="font-bold text-orange-600">{modelo.campos}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                                <button className="flex-1 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center justify-center gap-1">
                                    <FileText size={14} />
                                    Ver estructura
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
