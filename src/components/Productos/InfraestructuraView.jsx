import React, { useState } from 'react'
import { Search, Plus, Server, Cloud, HardDrive, Activity } from 'lucide-react'

export default function InfraestructuraView() {
    const [recursos] = useState([
        { id: 1, nombre: 'Web Server 01', tipo: 'EC2', proveedor: 'AWS', region: 'us-east-1', estado: 'Running', cpu: 45, memoria: 62 },
        { id: 2, nombre: 'Database Primary', tipo: 'RDS', proveedor: 'AWS', region: 'us-east-1', estado: 'Running', cpu: 30, memoria: 78 },
        { id: 3, nombre: 'Cache Server', tipo: 'ElastiCache', proveedor: 'AWS', region: 'us-east-1', estado: 'Running', cpu: 15, memoria: 45 },
        { id: 4, nombre: 'Load Balancer', tipo: 'ALB', proveedor: 'AWS', region: 'us-east-1', estado: 'Running', cpu: 10, memoria: 20 },
        { id: 5, nombre: 'Storage Bucket', tipo: 'S3', proveedor: 'AWS', region: 'us-east-1', estado: 'Running', cpu: 0, memoria: 0 },
        { id: 6, nombre: 'Dev Server', tipo: 'EC2', proveedor: 'AWS', region: 'us-west-2', estado: 'Stopped', cpu: 0, memoria: 0 }
    ])

    const estadoColors = {
        'Running': { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
        'Stopped': { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' },
        'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' }
    }

    const tipoIcons = {
        'EC2': Server,
        'RDS': HardDrive,
        'ElastiCache': Activity,
        'ALB': Cloud,
        'S3': Cloud
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Infraestructura</h2>
                    <p className="text-sm text-gray-500 mt-1">{recursos.length} recursos en la nube</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Recurso
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                    <p className="text-sm text-gray-600">Running</p>
                    <p className="text-3xl font-bold text-green-600">
                        {recursos.filter(r => r.estado === 'Running').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
                    <p className="text-sm text-gray-600">Stopped</p>
                    <p className="text-3xl font-bold text-gray-600">
                        {recursos.filter(r => r.estado === 'Stopped').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <p className="text-sm text-gray-600">Regiones</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {new Set(recursos.map(r => r.region)).size}
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500">
                    <p className="text-sm text-gray-600">Tipos</p>
                    <p className="text-3xl font-bold text-orange-600">
                        {new Set(recursos.map(r => r.tipo)).size}
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar recursos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recurso</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Region</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">CPU</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Memoria</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {recursos.map((recurso) => {
                            const Icon = tipoIcons[recurso.tipo] || Server
                            const colors = estadoColors[recurso.estado]
                            return (
                                <tr key={recurso.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                                <Icon size={20} className="text-white" />
                                            </div>
                                            <span className="font-semibold text-gray-800">{recurso.nombre}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {recurso.tipo}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {recurso.region}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-2 w-fit ${colors.bg} ${colors.text}`}>
                                            <span className={`w-2 h-2 rounded-full ${colors.dot}`}></span>
                                            {recurso.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {recurso.cpu > 0 ? (
                                            <div className="w-20">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>{recurso.cpu}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${recurso.cpu > 70 ? 'bg-red-500' : recurso.cpu > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${recurso.cpu}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {recurso.memoria > 0 ? (
                                            <div className="w-20">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>{recurso.memoria}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className={`h-2 rounded-full ${recurso.memoria > 70 ? 'bg-red-500' : recurso.memoria > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                        style={{ width: `${recurso.memoria}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ) : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-orange-600 hover:text-orange-900 mr-3">Ver</button>
                                        <button className="text-blue-600 hover:text-blue-900">Gestionar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
