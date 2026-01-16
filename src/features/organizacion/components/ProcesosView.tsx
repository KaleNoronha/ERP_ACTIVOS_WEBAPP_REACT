import { useState } from 'react'
import { Plus, GitBranch, Target, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { procesos } from '../data/mockData'
import type { Proceso } from '@/shared/types/organizacion.types'

const tipoColors: Record<string, string> = {
  'Estratégico': 'bg-purple-100 text-purple-800',
  'Operativo': 'bg-blue-100 text-blue-800',
  'Soporte': 'bg-green-100 text-green-800',
}

const estadoVariant: Record<string, 'success' | 'warning' | 'default' | 'info'> = {
  'Activo': 'success',
  'En Revisión': 'warning',
  'Obsoleto': 'default',
  'Borrador': 'info',
}

export function ProcesosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos')

  const procesosFiltrados = procesos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || p.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  const stats = {
    total: procesos.length,
    activos: procesos.filter(p => p.estado === 'Activo').length,
    estrategicos: procesos.filter(p => p.tipo === 'Estratégico').length,
    operativos: procesos.filter(p => p.tipo === 'Operativo').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Procesos</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los procesos de la organización</p>
        </div>
        <Button icon={Plus}>Nuevo Proceso</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Procesos" value={stats.total} icon={<GitBranch size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<CheckCircle size={32} />} color="success" />
        <StatCard title="Estratégicos" value={stats.estrategicos} icon={<Target size={32} />} color="purple" />
        <StatCard title="Operativos" value={stats.operativos} icon={<TrendingUp size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar por nombre, descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todos', 'Estratégico', 'Operativo', 'Soporte'] as const).map((tipo) => (
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

      {/* Grid de Procesos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {procesosFiltrados.map((proceso) => (
          <ProcesoCard key={proceso.id} proceso={proceso} />
        ))}
      </div>

      {procesosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <GitBranch size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron procesos</p>
        </div>
      )}
    </div>
  )
}

function ProcesoCard({ proceso }: { proceso: Proceso }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <GitBranch size={24} className="text-white" />
          </div>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${tipoColors[proceso.tipo]}`}>
            {proceso.tipo}
          </span>
        </div>

        <div className="mb-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
            {proceso.codigo}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-2">{proceso.nombre}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{proceso.descripcion}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Macro Proceso</span>
            <span className="font-semibold text-gray-800">{proceso.macroProceso}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Responsable</span>
            <span className="text-gray-800">{proceso.responsable}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock size={14} />
              Versión
            </span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{proceso.version}</span>
          </div>
        </div>

        {proceso.indicadores.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Indicadores: {proceso.indicadores.length}</p>
            <div className="flex flex-wrap gap-1">
              {proceso.indicadores.slice(0, 2).map(ind => (
                <span key={ind.id} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  {ind.nombre}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Badge variant={estadoVariant[proceso.estado] || 'default'}>{proceso.estado}</Badge>
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default ProcesosView



