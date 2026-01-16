import React from 'react'
import CrudTableView from '../common/CrudTableView'

export default function LeadsView() {
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'empresa', label: 'Empresa' },
        { key: 'fuente', label: 'Fuente' },
        { key: 'etapa', label: 'Etapa' },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    {value}
                </span>
            )
        },
        { key: 'probabilidad', label: 'Probabilidad' }
    ]

    const mockData = [
        { id: 1, nombre: 'Ana Martinez', empresa: 'StartupXYZ', fuente: 'Web', etapa: 'Calificacion', estado: 'Activo', probabilidad: '45%' },
        { id: 2, nombre: 'Pedro Sanchez', empresa: 'Corp Industries', fuente: 'Referido', etapa: 'Propuesta', estado: 'Activo', probabilidad: '70%' },
        { id: 3, nombre: 'Laura Torres', empresa: 'Tech Solutions', fuente: 'LinkedIn', etapa: 'Negociacion', estado: 'Activo', probabilidad: '85%' }
    ]

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Pipeline de Leads</h2>
                <p className="text-sm text-gray-500 mt-1">Seguimiento del embudo de ventas</p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                {['Nuevo', 'Calificacion', 'Propuesta', 'Negociacion'].map((etapa, idx) => (
                    <div key={etapa} className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                        <h3 className="text-sm font-semibold text-gray-600 mb-2">{etapa}</h3>
                        <p className="text-2xl font-bold text-gray-800">{idx + 1}</p>
                        <p className="text-xs text-gray-500 mt-1">leads activos</p>
                    </div>
                ))}
            </div>

            <CrudTableView
                title=""
                columns={columns}
                emptyMessage="No hay leads registrados"
            />

            <div className="mt-4 bg-white rounded-lg shadow p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-gray-600">Tasa de conversion</p>
                        <p className="text-2xl font-bold text-green-600">32%</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Valor total pipeline</p>
                        <p className="text-2xl font-bold text-blue-600">$245K</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Tiempo promedio cierre</p>
                        <p className="text-2xl font-bold text-orange-600">45 dias</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
