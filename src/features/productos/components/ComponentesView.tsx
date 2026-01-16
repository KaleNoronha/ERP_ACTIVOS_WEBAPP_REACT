import { useState } from 'react'
import { Plus, Puzzle, Code, Package, FileCode } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { componentes } from '../data/mockData'
import type { Componente } from '@/shared/types/productos.types'

const tipoColors: Record<string, string> = {
  'Módulo': 'bg-blue-100 text-blue-800',
  'Servicio': 'bg-green-100 text-green-800',
  'Librería': 'bg-purple-100 text-purple-800',
  'Utilidad': 'bg-orange-100 text-orange-800',
  'Widget': 'bg-cyan-100 text-cyan-800',
  'API': 'bg-pink-100 text-pink-800',
}

export function ComponentesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos')

  const componentesFiltrados = componentes.filter(c => {
    const matchSearch = c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.aplicacion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || c.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  const stats = {
    total: componentes.length,
    activos: componentes.filter(c => c.estado === 'Activo').length,
    librerias: componentes.filter(c => c.tipo === 'Librería').length,
    servicios: componentes.filter(c => c.tipo === 'Servicio').length,
  }

  const columns: Column<Componente>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800">{v as string}</span> },
    { key: 'tipo', label: 'Tipo', render: (v) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tipoColors[v as string]}`}>{v as string}</span> },
    { key: 'aplicacion', label: 'Aplicación' },
    { key: 'lenguaje', label: 'Lenguaje', render: (v) => <span className="flex items-center gap-1"><Code size={14} /> {v as string}</span> },
    { key: 'version', label: 'Versión', render: (v) => <span className="font-mono text-xs">{v as string}</span> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={v === 'Activo' ? 'success' : 'default'}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Componentes</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los componentes y librerías</p>
        </div>
        <Button icon={Plus}>Nuevo Componente</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Componentes" value={stats.total} icon={<Puzzle size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<Package size={32} />} color="success" />
        <StatCard title="Librerías" value={stats.librerias} icon={<FileCode size={32} />} color="purple" />
        <StatCard title="Servicios" value={stats.servicios} icon={<Code size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, aplicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Módulo', 'Servicio', 'Librería', 'Utilidad'] as const).map((tipo) => (
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
        data={componentesFiltrados}
        columns={columns}
        onRowClick={(comp) => console.log('Ver componente:', comp)}
      />
    </div>
  )
}

export default ComponentesView


