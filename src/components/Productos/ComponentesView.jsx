import React, { useState } from 'react'
import { Search, Plus, Puzzle, GitBranch, ExternalLink } from 'lucide-react'

export default function ComponentesView() {
    const [componentes] = useState([
        { id: 1, nombre: 'Auth Module', tipo: 'Modulo', aplicacion: 'Portal Web', version: '2.1.0', repositorio: 'github.com/empresa/auth-module' },
        { id: 2, nombre: 'Payment Gateway', tipo: 'Servicio', aplicacion: 'API Pagos', version: '1.5.0', repositorio: 'github.com/empresa/payment-gw' },
        { id: 3, nombre: 'UI Components', tipo: 'Libreria', aplicacion: 'Portal Web', version: '3.0.0', repositorio: 'github.com/empresa/ui-lib' },
        { id: 4, nombre: 'Data Validator', tipo: 'Utilidad', aplicacion: 'API Gateway', version: '1.2.0', repositorio: 'github.com/empresa/validator' },
        { id: 5, nombre: 'Report Generator', tipo: 'Modulo', aplicacion: 'ERP', version: '2.0.0', repositorio: 'github.com/empresa/reports' }
    ])

    const tipoColors = {
        'Modulo': 'bg-blue-100 text-blue-800',
        'Servicio': 'bg-green-100 text-green-800',
        'Libreria': 'bg-purple-100 text-purple-800',
        'Utilidad': 'bg-orange-100 text-orange-800'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Componentes</h2>
                    <p className="text-sm text-gray-500 mt-1">{componentes.length} componentes registrados</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Componente
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar componentes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Componente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aplicacion</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Repositorio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {componentes.map((comp) => (
                            <tr key={comp.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                            <Puzzle size={20} className="text-white" />
                                        </div>
                                        <span className="font-semibold text-gray-800">{comp.nombre}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tipoColors[comp.tipo]}`}>
                                        {comp.tipo}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {comp.aplicacion}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                                        v{comp.version}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                                        <GitBranch size={14} />
                                        {comp.repositorio.split('/').slice(-1)[0]}
                                        <ExternalLink size={12} />
                                    </a>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-orange-600 hover:text-orange-900 mr-3">Ver</button>
                                    <button className="text-blue-600 hover:text-blue-900">Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
