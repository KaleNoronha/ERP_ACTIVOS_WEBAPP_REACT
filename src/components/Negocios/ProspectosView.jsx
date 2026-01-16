import React, { useState } from 'react'
import { Search, Plus, Filter, DollarSign, Calendar, User, Building2 } from 'lucide-react'

export default function ProspectosView() {
    const [searchTerm, setSearchTerm] = useState('')
    const [prospectos] = useState([
        { id: 1, nombre: 'Juan Perez', empresa: 'Tech Corp', valor: 50000, estado: 'Nuevo', fecha: '2024-01-15', probabilidad: 30 },
        { id: 2, nombre: 'Maria Garcia', empresa: 'Innovate SA', valor: 75000, estado: 'Contactado', fecha: '2024-01-10', probabilidad: 60 },
        { id: 3, nombre: 'Carlos Lopez', empresa: 'Digital Plus', valor: 120000, estado: 'Calificado', fecha: '2024-01-05', probabilidad: 80 }
    ])

    const estadoColors = {
        'Nuevo': 'bg-blue-100 text-blue-800 border-blue-200',
        'Contactado': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'Calificado': 'bg-green-100 text-green-800 border-green-200'
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Prospectos</h2>
                    <p className="text-sm text-gray-500 mt-1">Gestiona tus oportunidades de negocio</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Nuevo Prospecto
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, empresa..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter size={20} />
                    Filtros
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prospectos.map((prospecto) => (
                    <div key={prospecto.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                        {prospecto.nombre.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{prospecto.nombre}</h3>
                                        <p className="text-sm text-gray-500 flex items-center gap-1">
                                            <Building2 size={14} />
                                            {prospecto.empresa}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        <DollarSign size={16} className="text-green-600" />
                                        Valor estimado
                                    </span>
                                    <span className="font-bold text-green-600">${prospecto.valor.toLocaleString()}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 flex items-center gap-2">
                                        <Calendar size={16} className="text-blue-600" />
                                        Fecha contacto
                                    </span>
                                    <span className="text-sm text-gray-700">{prospecto.fecha}</span>
                                </div>

                                <div className="pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-600">Probabilidad</span>
                                        <span className="text-xs font-semibold text-gray-700">{prospecto.probabilidad}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-orange-400 to-orange-600 h-2 rounded-full transition-all"
                                            style={{ width: `${prospecto.probabilidad}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${estadoColors[prospecto.estado]}`}>
                                {prospecto.estado}
                            </span>
                            <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                                Ver detalles →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {prospectos.length === 0 && (
                <div className="text-center py-12">
                    <User size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">No hay prospectos registrados</p>
                </div>
            )}
        </div>
    )
}
