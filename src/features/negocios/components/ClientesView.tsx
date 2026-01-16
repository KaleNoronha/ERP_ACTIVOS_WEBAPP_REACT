import { useState } from 'react'
import { Plus, Filter, Building2, Mail, Phone, MapPin, CreditCard, Users } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard, DataTable, Column } from '@/shared/components/ui'
import { clientes } from '../data/mockData'
import type { Cliente } from '@/shared/types/negocios.types'

export function ClientesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')

  const clientesFiltrados = clientes.filter(c => 
    c.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ruc.includes(searchTerm) ||
    c.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: clientes.length,
    activos: clientes.filter(c => c.estado === 'Activo').length,
    corporativos: clientes.filter(c => c.tipoCliente === 'Corporativo').length,
    creditoTotal: clientes.reduce((acc, c) => acc + (c.creditoAprobado || 0), 0),
  }

  const columns: Column<Cliente>[] = [
    { 
      key: 'razonSocial', 
      label: 'Cliente',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            {item.razonSocial.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{item.razonSocial}</p>
            <p className="text-xs text-gray-500 font-mono">{item.codigo}</p>
          </div>
        </div>
      )
    },
    { key: 'ruc', label: 'RUC' },
    { key: 'sector', label: 'Sector' },
    { 
      key: 'tipoCliente', 
      label: 'Tipo',
      render: (value) => <Badge variant="info">{String(value)}</Badge>
    },
    { key: 'contactoPrincipal', label: 'Contacto' },
    { 
      key: 'estado', 
      label: 'Estado',
      render: (value) => <Badge variant={getStatusVariant(String(value))}>{String(value)}</Badge>
    },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Clientes</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de cartera de clientes</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVista('cards')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'cards' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setVista('tabla')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'tabla' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Tabla
            </button>
          </div>
          <Button icon={Plus}>Nuevo Cliente</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Clientes" value={stats.total} icon={<Users size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<Building2 size={32} />} color="success" />
        <StatCard title="Corporativos" value={stats.corporativos} icon={<Building2 size={32} />} color="purple" />
        <StatCard title="Crédito Total" value={`$${(stats.creditoTotal / 1000).toFixed(0)}K`} icon={<CreditCard size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar por razón social, RUC..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <Button variant="outline" icon={Filter}>Filtros</Button>
      </div>

      {/* Vista */}
      {vista === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientesFiltrados.map((cliente) => (
            <ClienteCard key={cliente.id} cliente={cliente} />
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={clientesFiltrados}
          keyExtractor={(item) => item.id}
          actions={(item) => (
            <>
              <button className="text-indigo-700 hover:text-indigo-800 mr-3">Ver</button>
              <button className="text-blue-600 hover:text-blue-800">Editar</button>
            </>
          )}
        />
      )}
    </div>
  )
}

function ClienteCard({ cliente }: { cliente: Cliente }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              {cliente.razonSocial.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{cliente.razonSocial}</h3>
              <p className="text-xs text-gray-500 font-mono">{cliente.codigo}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(cliente.estado)}>{cliente.estado}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={14} />
            <span>RUC: {cliente.ruc}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={14} />
            <span className="truncate">{cliente.direccion}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={14} />
            <span>{cliente.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={14} />
            <span>{cliente.telefono}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <Badge variant="info">{cliente.tipoCliente}</Badge>
            <span className="ml-2 text-xs text-gray-500">{cliente.sector}</span>
          </div>
          {cliente.creditoAprobado && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Crédito</p>
              <p className="font-bold text-green-600">${cliente.creditoAprobado.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">Contacto: {cliente.contactoPrincipal}</span>
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default ClientesView


