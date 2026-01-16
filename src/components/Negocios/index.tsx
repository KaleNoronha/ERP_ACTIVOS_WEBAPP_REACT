import React from 'react'
import CrudTableView from '../common/CrudTableView'

export function ClientesView() {
    const columns = [
        { key: 'razonSocial', label: 'Razón Social' },
        { key: 'ruc', label: 'RUC' },
        { key: 'sector', label: 'Sector' },
        { key: 'contactoPrincipal', label: 'Contacto' },
        { key: 'telefono', label: 'Teléfono' }
    ]

    return <CrudTableView title="Clientes" columns={columns} />
}

export function ContactosView() {
    const columns = [
        { key: 'nombre', label: 'Nombre' },
        { key: 'cargo', label: 'Cargo' },
        { key: 'empresa', label: 'Empresa' },
        { key: 'email', label: 'Email' },
        { key: 'telefono', label: 'Teléfono' }
    ]

    return <CrudTableView title="Contactos" columns={columns} />
}

export function PropuestasView() {
    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'cliente', label: 'Cliente' },
        { key: 'descripcion', label: 'Descripción' },
        { key: 'monto', label: 'Monto', render: (value) => `$${value}` },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    value === 'Aprobada' ? 'bg-green-100 text-green-800' :
                    value === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                }`}>
                    {value}
                </span>
            )
        }
    ]

    return <CrudTableView title="Propuestas" columns={columns} />
}

export function ListaPreciosView() {
    const columns = [
        { key: 'codigo', label: 'Código' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'vigenciaDesde', label: 'Vigencia Desde' },
        { key: 'vigenciaHasta', label: 'Vigencia Hasta' },
        { 
            key: 'activo', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {value ? 'Activo' : 'Inactivo'}
                </span>
            )
        }
    ]

    return <CrudTableView title="Listas de Precios" columns={columns} />
}

export function ContratosView() {
    const columns = [
        { key: 'numero', label: 'Número' },
        { key: 'cliente', label: 'Cliente' },
        { key: 'tipo', label: 'Tipo' },
        { key: 'fechaInicio', label: 'Fecha Inicio' },
        { key: 'fechaFin', label: 'Fecha Fin' },
        { 
            key: 'estado', 
            label: 'Estado',
            render: (value) => (
                <span className={`px-2 py-1 text-xs rounded-full ${
                    value === 'Vigente' ? 'bg-green-100 text-green-800' :
                    value === 'Por Vencer' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                }`}>
                    {value}
                </span>
            )
        }
    ]

    return <CrudTableView title="Contratos" columns={columns} />
}
