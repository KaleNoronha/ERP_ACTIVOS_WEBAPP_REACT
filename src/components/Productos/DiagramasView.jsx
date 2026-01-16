import React, { useState } from 'react'
import { Search, Plus, Share2, Calendar, Eye } from 'lucide-react'

export default function DiagramasView() {
    const [diagramas] = useState([
        { id: 1, nombre: 'Arquitectura General', tipo: 'Arquitectura', aplicacion: 'Sistema ERP', version: '2.0', ultimaActualizacion: '2024-01-10' },
        { id: 2, nombre: 'Flujo de Autenticacion', tipo: 'Secuencia', aplicacion: 'Portal Web', version: '1.5', ultimaActualizacion: '2024-01-08' },
        { id: 3, nombre: 'Modelo de Datos', tipo: 'ER', aplicacion: 'Base de Datos', version: '3.0', ultimaActualizacion: '2024-01-05' },
        { id: 4, nombre: 'Infraestructura Cloud', tipo: 'Infraestructura', aplicacion: 'AWS', version: '1.2', ultimaActualizacion: '2024-01-03' },
        { id: 5, nombre: 'Proceso de Ventas', tipo: 'BPMN', aplicacion: 'CRM', version: '1.0', ultimaActualizacion: '2023-12-20' }
    ])

    const tipoColors = {
        'Arquitectura': 'bg-blue-100 text-blue-800',
        'Secuencia': 'bg-green-100 text-green-800',
        'ER': 'bg-purple-100 text-purple-800',
        'Infraestructura': 'bg-orange-100 text-orange-800',
        'BPMN': 'bg-cyan-100 text-cyan-800'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Diagramas</h2>
                    <p className="text-sm text-gray-500 mt-1">{diagramas.length} diagramas registrados</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Diagrama
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar diagramas..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {diagramas.map((diagrama) => (
                    <div key={diagrama.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
                        <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <Share2 size={48} className="text-gray-400" />
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tipoColors[diagrama.tipo]}`}>
                                    {diagrama.tipo}
                                </span>
                                <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                    v{diagrama.version}
                                </span>
                            </div>

                            <h3 className="font-bold text-gray-800 mb-1">{diagrama.nombre}</h3>
                            <p className="text-sm text-gray-600 mb-3">{diagrama.aplicacion}</p>
                            
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {diagrama.ultimaActualizacion}
                                </span>
                                <button className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1">
                                    <Eye size={14} />
                                    Ver
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
