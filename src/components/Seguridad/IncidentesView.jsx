import React, { useState } from 'react'
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react'

export default function IncidentesView() {
    const [incidentes] = useState([
        { id: 1, numero: 'INC-2024-001', titulo: 'Caida del servicio de autenticacion', tipo: 'Disponibilidad', prioridad: 'Critica', estado: 'Abierto', fechaReporte: '2024-01-15 14:30', responsable: 'Carlos M.', tiempoTranscurrido: '2h 30m' },
        { id: 2, numero: 'INC-2024-002', titulo: 'Acceso no autorizado detectado', tipo: 'Seguridad', prioridad: 'Alta', estado: 'En Investigacion', fechaReporte: '2024-01-15 10:15', responsable: 'Sofia R.', tiempoTranscurrido: '6h 45m' },
        { id: 3, numero: 'INC-2024-003', titulo: 'Lentitud en base de datos', tipo: 'Performance', prioridad: 'Media', estado: 'En Investigacion', fechaReporte: '2024-01-14 16:20', responsable: 'Miguel T.', tiempoTranscurrido: '1d 45m' },
        { id: 4, numero: 'INC-2024-004', titulo: 'Error en proceso de pagos', tipo: 'Funcional', prioridad: 'Alta', estado: 'Resuelto', fechaReporte: '2024-01-14 09:00', responsable: 'Ana F.', tiempoTranscurrido: '1d 8h' },
        { id: 5, numero: 'INC-2024-005', titulo: 'Falla en backup automatico', tipo: 'Operacional', prioridad: 'Media', estado: 'Cerrado', fechaReporte: '2024-01-13 22:00', responsable: 'Carlos M.', tiempoTranscurrido: '2d 5h' }
    ])

    const prioridadColors = {
        'Critica': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500', icon: 'text-red-500' },
        'Alta': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-500', icon: 'text-orange-500' },
        'Media': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500', icon: 'text-yellow-500' },
        'Baja': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500', icon: 'text-blue-500' }
    }

    const estadoIcons = {
        'Abierto': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
        'En Investigacion': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
        'Resuelto': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
        'Cerrado': { icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-100' }
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Incidentes de Seguridad</h2>
                <p className="text-sm text-gray-500 mt-1">Gestion y seguimiento de incidentes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Abiertos</p>
                            <p className="text-3xl font-bold text-red-600">
                                {incidentes.filter(i => i.estado === 'Abierto').length}
                            </p>
                        </div>
                        <AlertCircle size={32} className="text-red-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">En Investigacion</p>
                            <p className="text-3xl font-bold text-yellow-600">
                                {incidentes.filter(i => i.estado === 'En Investigacion').length}
                            </p>
                        </div>
                        <Clock size={32} className="text-yellow-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Resueltos</p>
                            <p className="text-3xl font-bold text-green-600">
                                {incidentes.filter(i => i.estado === 'Resuelto').length}
                            </p>
                        </div>
                        <CheckCircle size={32} className="text-green-500" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Cerrados</p>
                            <p className="text-3xl font-bold text-gray-600">
                                {incidentes.filter(i => i.estado === 'Cerrado').length}
                            </p>
                        </div>
                        <XCircle size={32} className="text-gray-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-6">Timeline de Incidentes</h3>
                <div className="space-y-4">
                    {incidentes.map((inc, index) => {
                        const colors = prioridadColors[inc.prioridad]
                        const estadoConfig = estadoIcons[inc.estado]
                        const EstadoIcon = estadoConfig.icon

                        return (
                            <div key={inc.id} className="relative">
                                {index !== incidentes.length - 1 && (
                                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
                                )}
                                <div className="flex gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full ${estadoConfig.bg} flex items-center justify-center`}>
                                        <EstadoIcon size={24} className={estadoConfig.color} />
                                    </div>
                                    <div className={`flex-1 bg-white border-2 ${colors.border} rounded-lg p-4 hover:shadow-lg transition-shadow`}>
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                                                        {inc.numero}
                                                    </span>
                                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${colors.bg} ${colors.text}`}>
                                                        {inc.prioridad}
                                                    </span>
                                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                                                        {inc.tipo}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-gray-800 mb-2">{inc.titulo}</h4>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>Reportado: {inc.fechaReporte}</span>
                                                    <span>•</span>
                                                    <span>Responsable: <span className="font-semibold">{inc.responsable}</span></span>
                                                    <span>•</span>
                                                    <span className="font-semibold text-orange-600">{inc.tiempoTranscurrido}</span>
                                                </div>
                                            </div>
                                            <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold whitespace-nowrap ml-4">
                                                Ver detalles →
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
