import React, { useState } from 'react'
import { Search, Plus, User, Shield, Key, Mail } from 'lucide-react'

export default function IdentidadView() {
    const [usuarios] = useState([
        { id: 1, usuario: 'carlos.m', nombre: 'Carlos Martinez', email: 'carlos.m@empresa.com', rol: 'Administrador', estado: 'Activo', ultimoAcceso: '2024-01-15 14:30' },
        { id: 2, usuario: 'sofia.r', nombre: 'Sofia Rodriguez', email: 'sofia.r@empresa.com', rol: 'Desarrollador', estado: 'Activo', ultimoAcceso: '2024-01-15 12:15' },
        { id: 3, usuario: 'miguel.t', nombre: 'Miguel Torres', email: 'miguel.t@empresa.com', rol: 'DBA', estado: 'Activo', ultimoAcceso: '2024-01-15 10:00' },
        { id: 4, usuario: 'ana.f', nombre: 'Ana Fernandez', email: 'ana.f@empresa.com', rol: 'Analista', estado: 'Inactivo', ultimoAcceso: '2024-01-10 09:30' },
        { id: 5, usuario: 'pedro.g', nombre: 'Pedro Garcia', email: 'pedro.g@empresa.com', rol: 'Desarrollador', estado: 'Activo', ultimoAcceso: '2024-01-15 11:45' }
    ])

    const rolColors = {
        'Administrador': 'bg-purple-100 text-purple-800',
        'Desarrollador': 'bg-blue-100 text-blue-800',
        'DBA': 'bg-green-100 text-green-800',
        'Analista': 'bg-orange-100 text-orange-800'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Identidad y Acceso</h2>
                    <p className="text-sm text-gray-500 mt-1">Gestion de usuarios y permisos</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Usuario
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Usuarios Activos</p>
                            <p className="text-3xl font-bold text-green-600">
                                {usuarios.filter(u => u.estado === 'Activo').length}
                            </p>
                        </div>
                        <User size={32} className="text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Usuarios Inactivos</p>
                            <p className="text-3xl font-bold text-gray-600">
                                {usuarios.filter(u => u.estado === 'Inactivo').length}
                            </p>
                        </div>
                        <User size={32} className="text-gray-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Administradores</p>
                            <p className="text-3xl font-bold text-purple-600">
                                {usuarios.filter(u => u.rol === 'Administrador').length}
                            </p>
                        </div>
                        <Shield size={32} className="text-purple-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Roles</p>
                            <p className="text-3xl font-bold text-blue-600">4</p>
                        </div>
                        <Key size={32} className="text-blue-500" />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar usuarios..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usuario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ultimo Acceso</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {usuario.nombre.charAt(0)}
                                        </div>
                                        <span className="font-mono text-sm">{usuario.usuario}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                                    {usuario.nombre}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        {usuario.email}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${rolColors[usuario.rol]}`}>
                                        {usuario.rol}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                        usuario.estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {usuario.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {usuario.ultimoAcceso}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button className="text-orange-600 hover:text-orange-900 mr-3">Editar</button>
                                    <button className="text-blue-600 hover:text-blue-900">Permisos</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
