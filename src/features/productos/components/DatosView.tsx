import { useState } from 'react'
import { Plus, Database, Table, Key, Link } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { modelosDatos } from '../data/mockData'
import type { ModeloDatos } from '@/shared/types/productos.types'

const tipoColors: Record<string, string> = {
  'Tabla': 'bg-blue-100 text-blue-800',
  'Vista': 'bg-green-100 text-green-800',
  'Colección': 'bg-purple-100 text-purple-800',
  'Cache': 'bg-orange-100 text-orange-800',
  'Índice': 'bg-cyan-100 text-cyan-800',
}

export function DatosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos')

  const modelosFiltrados = modelosDatos.filter(m => {
    const matchSearch = m.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       m.baseDatos.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || m.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  const stats = {
    total: modelosDatos.length,
    tablas: modelosDatos.filter(m => m.tipo === 'Tabla').length,
    totalCampos: modelosDatos.reduce((acc, m) => acc + m.campos.length, 0),
    relaciones: modelosDatos.reduce((acc, m) => acc + m.relaciones.length, 0),
  }

  const columns: Column<ModeloDatos>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800 font-mono">{v as string}</span> },
    { key: 'tipo', label: 'Tipo', render: (v) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tipoColors[v as string]}`}>{v as string}</span> },
    { key: 'baseDatos', label: 'Base de Datos', render: (v) => <span className="flex items-center gap-1"><Database size={14} /> {v as string}</span> },
    { key: 'esquema', label: 'Esquema' },
    { key: 'campos', label: 'Campos', render: (_, item) => <span className="flex items-center gap-1"><Key size={14} /> {item.campos.length}</span> },
    { key: 'relaciones', label: 'Relaciones', render: (_, item) => <span className="flex items-center gap-1"><Link size={14} /> {item.relaciones.length}</span> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={v === 'Activo' ? 'success' : 'default'}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Modelos de Datos</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los modelos y estructuras de datos</p>
        </div>
        <Button icon={Plus}>Nuevo Modelo</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Modelos" value={stats.total} icon={<Database size={32} />} color="info" />
        <StatCard title="Tablas" value={stats.tablas} icon={<Table size={32} />} color="success" />
        <StatCard title="Total Campos" value={stats.totalCampos} icon={<Key size={32} />} color="purple" />
        <StatCard title="Relaciones" value={stats.relaciones} icon={<Link size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, base de datos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Tabla', 'Vista', 'Colección', 'Cache'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroTipo === tipo
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={modelosFiltrados}
        columns={columns}
        onRowClick={(modelo) => console.log('Ver modelo:', modelo)}
      />
    </div>
  )
}

export default DatosView


