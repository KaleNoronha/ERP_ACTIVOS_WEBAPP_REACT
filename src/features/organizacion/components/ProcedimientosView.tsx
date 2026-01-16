import { useState } from 'react'
import { Plus, FileText, CheckCircle, Clock, Calendar, ListChecks } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { procedimientos } from '../data/mockData'
import type { Procedimiento } from '@/shared/types/organizacion.types'

const estadoVariant: Record<string, 'success' | 'warning' | 'default' | 'info'> = {
  'Activo': 'success',
  'En Revisión': 'warning',
  'Obsoleto': 'default',
  'Borrador': 'info',
}

export function ProcedimientosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos')

  const procedimientosFiltrados = procedimientos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.proceso.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === 'Todos' || p.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const stats = {
    total: procedimientos.length,
    activos: procedimientos.filter(p => p.estado === 'Activo').length,
    enRevision: procedimientos.filter(p => p.estado === 'En Revisión').length,
    totalPasos: procedimientos.reduce((acc, p) => acc + p.pasos.length, 0),
  }

  const columns: Column<Procedimiento>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800">{v as string}</span> },
    { key: 'proceso', label: 'Proceso' },
    { key: 'responsable', label: 'Responsable' },
    { key: 'version', label: 'Versión', render: (v) => <span className="font-mono text-xs">{v as string}</span> },
    { key: 'pasos', label: 'Pasos', render: (_, item) => <span className="flex items-center gap-1"><ListChecks size={14} /> {item.pasos.length}</span> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={estadoVariant[v as string] || 'default'}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Procedimientos</h2>
          <p className="text-sm text-gray-500 mt-1">Documenta y gestiona los procedimientos operativos</p>
        </div>
        <Button icon={Plus}>Nuevo Procedimiento</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Procedimientos" value={stats.total} icon={<FileText size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<CheckCircle size={32} />} color="success" />
        <StatCard title="En Revisión" value={stats.enRevision} icon={<Clock size={32} />} color="warning" />
        <StatCard title="Total Pasos" value={stats.totalPasos} icon={<ListChecks size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar por nombre, proceso..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todos', 'Activo', 'En Revisión', 'Borrador'] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroEstado === estado
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={procedimientosFiltrados}
        columns={columns}
        onRowClick={(proc) => console.log('Ver procedimiento:', proc)}
      />
    </div>
  )
}

export default ProcedimientosView



