import { useState } from 'react'
import { Plus, Server, Cloud, HardDrive, DollarSign, Activity, Cpu, MemoryStick } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { recursosInfraestructura } from '../data/mockData'
import type { RecursoInfraestructura, EstadoRecurso } from '@/shared/types/productos.types'

const estadoColors: Record<EstadoRecurso, 'success' | 'warning' | 'info' | 'danger' | 'default'> = {
  'Running': 'success',
  'Stopped': 'default',
  'Pending': 'warning',
  'Error': 'danger',
  'Terminated': 'default',
}

const tipoIcons: Record<string, React.ReactNode> = {
  'EC2': <Server size={24} />,
  'RDS': <HardDrive size={24} />,
  'S3': <Cloud size={24} />,
  'Lambda': <Activity size={24} />,
  'ElastiCache': <Cpu size={24} />,
  'ALB': <Server size={24} />,
}

const ambienteColors: Record<string, string> = {
  'Producción': 'bg-green-100 text-green-800',
  'Staging': 'bg-yellow-100 text-yellow-800',
  'Desarrollo': 'bg-blue-100 text-blue-800',
  'QA': 'bg-purple-100 text-purple-800',
}

export function InfraestructuraView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroAmbiente, setFiltroAmbiente] = useState<string>('Todos')

  const recursosFiltrados = recursosInfraestructura.filter(r => {
    const matchSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchAmbiente = filtroAmbiente === 'Todos' || r.ambiente === filtroAmbiente
    return matchSearch && matchAmbiente
  })

  const stats = {
    total: recursosInfraestructura.length,
    running: recursosInfraestructura.filter(r => r.estado === 'Running').length,
    costoMensual: recursosInfraestructura.reduce((acc, r) => acc + (r.costoMensual || 0), 0),
    produccion: recursosInfraestructura.filter(r => r.ambiente === 'Producción').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Infraestructura</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona los recursos de infraestructura cloud</p>
        </div>
        <Button icon={Plus}>Nuevo Recurso</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Recursos" value={stats.total} icon={<Server size={32} />} color="info" />
        <StatCard title="Running" value={stats.running} icon={<Activity size={32} />} color="success" />
        <StatCard title="Costo Mensual" value={`$${stats.costoMensual}`} icon={<DollarSign size={32} />} color="warning" />
        <StatCard title="Producción" value={stats.produccion} icon={<Cloud size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Producción', 'Staging', 'Desarrollo'] as const).map((ambiente) => (
            <button
              key={ambiente}
              onClick={() => setFiltroAmbiente(ambiente)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroAmbiente === ambiente
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {ambiente}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Recursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recursosFiltrados.map((recurso) => (
          <RecursoCard key={recurso.id} recurso={recurso} />
        ))}
      </div>

      {recursosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Server size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron recursos</p>
        </div>
      )}
    </div>
  )
}

function RecursoCard({ recurso }: { recurso: RecursoInfraestructura }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-xl flex items-center justify-center text-white">
            {tipoIcons[recurso.tipo] || <Server size={24} />}
          </div>
          <Badge variant={estadoColors[recurso.estado]}>{recurso.estado}</Badge>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
            {recurso.codigo}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${ambienteColors[recurso.ambiente]}`}>
            {recurso.ambiente}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 mb-1">{recurso.nombre}</h3>
        <p className="text-sm text-gray-600 mb-4">{recurso.tipo} • {recurso.region}</p>

        {/* Especificaciones */}
        <div className="space-y-1 text-sm mb-4">
          {Object.entries(recurso.especificaciones).slice(0, 3).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-gray-500 capitalize">{key}</span>
              <span className="text-gray-800 font-medium">{value}</span>
            </div>
          ))}
        </div>

        {/* Métricas */}
        {recurso.metricas && (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2">Métricas</p>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-blue-500" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${recurso.metricas.cpu}%` }} />
                  </div>
                </div>
                <span className="text-xs text-gray-600">{recurso.metricas.cpu}%</span>
              </div>
              <div className="flex items-center gap-2">
                <MemoryStick size={14} className="text-green-500" />
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: `${recurso.metricas.memoria}%` }} />
                  </div>
                </div>
                <span className="text-xs text-gray-600">{recurso.metricas.memoria}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        {recurso.costoMensual && (
          <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
            <DollarSign size={14} />
            {recurso.costoMensual}/mes
          </span>
        )}
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default InfraestructuraView


