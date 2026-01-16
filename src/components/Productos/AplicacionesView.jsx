import React, { useState } from 'react'
import { Search, Plus, Server, Cloud, Database, Code } from 'lucide-react'

export default function AplicacionesView() {
    const [aplicaciones] = useState([
        { id: 1, nombre: 'Portal Web', tipo: 'Frontend', tecnologia: 'React', estado: 'Produccion', version: '2.1.0', responsable: 'Carlos M.', icon: Code },
        { id: 2, nombre: 'API Gateway', tipo: 'Backend', tecnologia: 'Node.js', estado: 'Produccion', version: '1.5.2', responsable: 'Sofia R.', icon: Server },
        { id: 3, nombre: 'Base de Datos Principal', tipo: 'Database', tecnologia: 'PostgreSQL', estado: 'Produccion', version: '14.2', responsable: 'Miguel T.', icon: Database },
        { id: 4, nombre: 'Servicio de Autenticacion', tipo: 'Microservicio', tecnologia: 'Java Spring', estado: 'Produccion', version: '3.0.1', responsable: 'Ana F.', icon: Cloud },
        { id: 5, nombre: 'Dashboard Analytics', tipo: 'Frontend', tecnologia: 'Vue.js', estado: 'Desarrollo', version: '0.8.0', responsable: 'Carlos M.', icon: Code },
        { id: 6, nombre: 'API Pagos', tipo: 'Backend', tecnologia: 'Python', estado: 'Testing', version: '1.2.0', responsable: 'Sofia R.', icon: Server }
    ])

    const estadoColors = {
        'Produccion': 'bg-green-100 text-green-800 border-green-200',
        'Desarrollo': 'bg-blue-100 text-blue-800 border-blue-200',
        'Testing': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Mantenimiento': 'bg-red-100 text-red-800 border-red-200'
    }

    const tipoColors = {
        'Frontend': 'bg-purple-50 border-purple-200',
        'Backend': 'bg-blue-50 border-blue-200',
        'Database': 'bg-green-50 border-green-200',
        'Microservicio': 'bg-orange-50 border-orange-200'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Aplicaciones</h2>
                    <p className="text-sm text-gray-500 mt-1">{aplicaciones.length} aplicaciones registradas</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nueva Aplicacion
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar aplicaciones..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aplicaciones.map((app) => {
                    const Icon = app.icon
                    return (
                        <div key={app.id} className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-2 ${tipoColors[app.tipo]} overflow-hidden`}>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                        <Icon size={28} className="text-white" />
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${estadoColors[app.estado]}`}>
                                        {app.estado}
                                    </span>
                                </div>

                                <h3 className="font-bold text-lg text-gray-800 mb-2">{app.nombre}</h3>
                                
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tipo:</span>
                                        <span className="font-semibold text-gray-800">{app.tipo}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tecnologia:</span>
                                        <span className="font-semibold text-gray-800">{app.tecnologia}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Version:</span>
                                        <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{app.version}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Responsable:</span>
                                        <span className="font-semibold text-gray-800">{app.responsable}</span>
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
                    )
                })}
            </div>
        </div>
    )
}
