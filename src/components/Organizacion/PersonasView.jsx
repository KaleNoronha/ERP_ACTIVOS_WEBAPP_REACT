import React, { useState } from 'react'
import { Search, Plus, Mail, Phone, MapPin, Briefcase } from 'lucide-react'

export default function PersonasView() {
    const [searchTerm, setSearchTerm] = useState('')
    const [personas] = useState([
        { id: 1, nombre: 'Carlos Mendez', cargo: 'Gerente de Tecnologia', departamento: 'Tecnologia', email: 'carlos.m@empresa.com', telefono: '+51 999 888 777', ubicacion: 'Lima', estado: 'Activo', avatar: 'CM' },
        { id: 2, nombre: 'Sofia Rodriguez', cargo: 'Analista Senior', departamento: 'Negocios', email: 'sofia.r@empresa.com', telefono: '+51 999 777 666', ubicacion: 'Lima', estado: 'Activo', avatar: 'SR' },
        { id: 3, nombre: 'Miguel Torres', cargo: 'Desarrollador Full Stack', departamento: 'Tecnologia', email: 'miguel.t@empresa.com', telefono: '+51 999 666 555', ubicacion: 'Arequipa', estado: 'Activo', avatar: 'MT' },
        { id: 4, nombre: 'Ana Flores', cargo: 'Product Owner', departamento: 'Productos', email: 'ana.f@empresa.com', telefono: '+51 999 555 444', ubicacion: 'Lima', estado: 'Activo', avatar: 'AF' }
    ])

    const departamentoColors = {
        'Tecnologia': 'bg-blue-100 text-blue-800',
        'Negocios': 'bg-green-100 text-green-800',
        'Productos': 'bg-purple-100 text-purple-800',
        'Operaciones': 'bg-orange-100 text-orange-800'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Equipo</h2>
                    <p className="text-sm text-gray-500 mt-1">{personas.length} personas activas</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Agregar Persona
                </button>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, cargo, departamento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {personas.map((persona) => (
                    <div key={persona.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden group">
                        <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600"></div>
                        <div className="px-6 pb-6 -mt-12">
                            <div className="flex justify-center mb-4">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-orange-600 border-4 border-white shadow-lg">
                                    {persona.avatar}
                                </div>
                            </div>

                            <div className="text-center mb-4">
                                <h3 className="font-bold text-lg text-gray-800">{persona.nombre}</h3>
                                <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
                                    <Briefcase size={14} />
                                    {persona.cargo}
                                </p>
                                <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${departamentoColors[persona.departamento]}`}>
                                    {persona.departamento}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail size={16} className="text-orange-500" />
                                    <span className="truncate">{persona.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16} className="text-orange-500" />
                                    <span>{persona.telefono}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MapPin size={16} className="text-orange-500" />
                                    <span>{persona.ubicacion}</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <button className="w-full py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                                    Ver perfil completo
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
