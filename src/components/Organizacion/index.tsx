import React from 'react'
import CrudTableView from '../common/CrudTableView'

export function PersonasView() {
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'cargo', label: 'Cargo' },
        { key: 'departamento', label: 'Departamento' },
        { key: 'email', label: 'Email' },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    value === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            )
        }
    ]

    return <CrudTableView title="Personas" columns={columns} />
}

export function RolesView() {
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'departamento', label: 'Departamento' },
        { key: 'nivel', label: 'Nivel' },
        { key: 'personas', label: 'Personas Asignadas', render: (value) => value?.length || 0 }
    ]

    return <CrudTableView title="Roles y Responsabilidades" columns={columns} />
}

export function ProcesosView() {
    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'responsable', label: 'Responsable' },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    value === 'Activo' ? 'bg-green-100 text-green-800' :
                    value === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            )
        }
    ]

    return <CrudTableView title="Procesos" columns={columns} />
}

export function ProcedimientosView() {
    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'proceso', label: 'Proceso' },
        { key: 'version', label: 'Versión' },
        { key: 'fechaAprobacion', label: 'Fecha Aprobación' },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    value === 'Vigente' ? 'bg-green-100 text-green-800' :
                    value === 'En Revisión' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            )
        }
    ]

    return <CrudTableView title="Procedimientos" columns={columns} />
}
