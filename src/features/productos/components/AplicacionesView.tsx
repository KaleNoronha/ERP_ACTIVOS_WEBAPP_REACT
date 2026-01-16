import { useState } from 'react'
import { Plus, AppWindow, Server, Globe, GitBranch, Database } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { aplicaciones } from '../data/mockData'
import type { Aplicacion, EstadoAplicacion } from '@/shared/types/productos.types'

const estadoColors: Record<EstadoAplicacion, 'success' | 'info' | 'warning' | 'default' | 'danger'> = {
  'Producción': 'success',
  'Desarrollo': 'info',
  'Testing': 'warning',
  'Mantenimiento': 'default',
  'Deprecado': 'danger',
}

const tipoColors: Record<string, string> = {
  'Frontend': 'bg-blue-100 text-blue-800',
  'Backend': 'bg-green-100 text-green-800',
  'Fullstack': 'bg-purple-100 text-purple-800',
  'Mobile': 'bg-orange-100 text-orange-800',
  'Microservicio': 'bg-cyan-100 text-cyan-800',
  'Desktop': 'bg-gray-100 text-gray-800',
}

export function AplicacionesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos')

  const aplicacionesFiltradas = aplicaciones.filter(a => {
    const matchSearch = a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       a.tecnologia.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || a.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  const stats = {
    total: aplicaciones.length,
    produccion: aplicaciones.filter(a => a.estado === 'Producción').length,
    desarrollo: aplicaciones.filter(a => a.estado === 'Desarrollo').length,
    microservicios: aplicaciones.filter(a => a.tipo === 'Microservicio').length,
  }

  const columns: Column<Aplicacion>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800">{v as string}</span> },
    { key: 'tipo', label: 'Tipo', render: (v) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tipoColors[v as string]}`}>{v as string}</span> },
    { key: 'tecnologia', label: 'Tecnología', render: (v, item) => <span>{v as string}{item.framework ? ` / ${item.framework}` : ''}</span> },
    { key: 'version', label: 'Versión', render: (v) => <span className="font-mono text-xs">{v as string}</span> },
    { key: 'responsable', label: 'Responsable' },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={estadoColors[v as EstadoAplicacion]}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Aplicaciones</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona el inventario de aplicaciones</p>
        </div>
        <Button icon={Plus}>Nueva Aplicación</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Apps" value={stats.total} icon={<AppWindow size={32} />} color="info" />
        <StatCard title="En Producción" value={stats.produccion} icon={<Globe size={32} />} color="success" />
        <StatCard title="En Desarrollo" value={stats.desarrollo} icon={<GitBranch size={32} />} color="warning" />
        <StatCard title="Microservicios" value={stats.microservicios} icon={<Server size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, tecnología..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Frontend', 'Backend', 'Microservicio', 'Mobile'] as const).map((tipo) => (
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
        data={aplicacionesFiltradas}
        columns={columns}
        onRowClick={(app) => console.log('Ver aplicación:', app)}
      />
    </div>
  )
}

export default AplicacionesView


