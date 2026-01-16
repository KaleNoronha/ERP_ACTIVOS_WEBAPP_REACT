import { useState } from 'react'
import { Plus, Activity, Clock, Target, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { actividades } from '../data/mockData'
import type { Actividad } from '@/shared/types/organizacion.types'

const clasificacionColors: Record<string, string> = {
  'SOP': 'bg-blue-100 text-blue-800',
  'Guía Técnica': 'bg-purple-100 text-purple-800',
  'Instructivo': 'bg-green-100 text-green-800',
  'Formato': 'bg-orange-100 text-orange-800',
}

export function ActividadesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroClasificacion, setFiltroClasificacion] = useState<string>('Todos')

  const actividadesFiltradas = actividades.filter(a => {
    const matchSearch = a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       a.proceso.toLowerCase().includes(searchTerm.toLowerCase())
    const matchClasificacion = filtroClasificacion === 'Todos' || a.clasificacion === filtroClasificacion
    return matchSearch && matchClasificacion
  })

  const stats = {
    total: actividades.length,
    activas: actividades.filter(a => a.estado === 'Activo').length,
    conRiesgos: actividades.filter(a => a.riesgos.length > 0).length,
    tiempoPromedio: Math.round(actividades.reduce((acc, a) => acc + a.duracionEstimada, 0) / actividades.length),
  }

  const columns: Column<Actividad>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800">{v as string}</span> },
    { key: 'proceso', label: 'Proceso' },
    { key: 'responsable', label: 'Responsable' },
    { key: 'clasificacion', label: 'Clasificación', render: (v) => <span className={`px-2 py-1 text-xs font-semibold rounded-full ${clasificacionColors[v as string] || 'bg-gray-100'}`}>{v as string}</span> },
    { key: 'duracionEstimada', label: 'Duración', render: (v) => <span className="flex items-center gap-1"><Clock size={14} /> {v as number} min</span> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={v === 'Activo' ? 'success' : 'default'}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Actividades</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona las actividades de los procesos</p>
        </div>
        <Button icon={Plus}>Nueva Actividad</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Actividades" value={stats.total} icon={<Activity size={32} />} color="info" />
        <StatCard title="Activas" value={stats.activas} icon={<CheckCircle size={32} />} color="success" />
        <StatCard title="Con Riesgos" value={stats.conRiesgos} icon={<AlertTriangle size={32} />} color="warning" />
        <StatCard title="Tiempo Promedio" value={`${stats.tiempoPromedio} min`} icon={<Clock size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, proceso..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'SOP', 'Guía Técnica', 'Instructivo', 'Formato'] as const).map((clasificacion) => (
            <button
              key={clasificacion}
              onClick={() => setFiltroClasificacion(clasificacion)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroClasificacion === clasificacion
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {clasificacion}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={actividadesFiltradas}
        columns={columns}
        onRowClick={(act) => console.log('Ver actividad:', act)}
      />
    </div>
  )
}

export default ActividadesView



