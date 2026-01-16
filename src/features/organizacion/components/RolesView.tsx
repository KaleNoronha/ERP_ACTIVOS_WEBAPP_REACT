import { useState } from 'react'
import { Plus, Shield, Users, Target, Award } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard, DataTable, type Column } from '@/shared/components/ui'
import { roles } from '../data/mockData'
import type { Rol } from '@/shared/types/organizacion.types'

const nivelColors: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
  'Estratégico': 'info',
  'Táctico': 'warning',
  'Operativo': 'success',
}

export function RolesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroNivel, setFiltroNivel] = useState<string>('Todos')

  const rolesFiltrados = roles.filter(r => {
    const matchSearch = r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       r.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchNivel = filtroNivel === 'Todos' || r.nivel === filtroNivel
    return matchSearch && matchNivel
  })

  const stats = {
    total: roles.length,
    estrategicos: roles.filter(r => r.nivel === 'Estratégico').length,
    tacticos: roles.filter(r => r.nivel === 'Táctico').length,
    operativos: roles.filter(r => r.nivel === 'Operativo').length,
  }

  const columns: Column<Rol>[] = [
    { key: 'codigo', label: 'Código', render: (v) => <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{v as string}</span> },
    { key: 'nombre', label: 'Nombre', render: (v) => <span className="font-semibold text-gray-800">{v as string}</span> },
    { key: 'departamento', label: 'Departamento' },
    { key: 'nivel', label: 'Nivel', render: (v) => <Badge variant={nivelColors[v as string] || 'default'}>{v as string}</Badge> },
    { key: 'personasAsignadas', label: 'Personas', render: (v) => <span className="flex items-center gap-1"><Users size={14} /> {v as number}</span> },
    { key: 'estado', label: 'Estado', render: (v) => <Badge variant={v === 'Activo' ? 'success' : 'default'}>{v as string}</Badge> },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Roles</h2>
          <p className="text-sm text-gray-500 mt-1">Define los roles y responsabilidades de la organización</p>
        </div>
        <Button icon={Plus}>Nuevo Rol</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Roles" value={stats.total} icon={<Shield size={32} />} color="info" />
        <StatCard title="Estratégicos" value={stats.estrategicos} icon={<Target size={32} />} color="purple" />
        <StatCard title="Tácticos" value={stats.tacticos} icon={<Award size={32} />} color="orange" />
        <StatCard title="Operativos" value={stats.operativos} icon={<Users size={32} />} color="success" />
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
          {(['Todos', 'Estratégico', 'Táctico', 'Operativo'] as const).map((nivel) => (
            <button
              key={nivel}
              onClick={() => setFiltroNivel(nivel)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroNivel === nivel
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {nivel}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla */}
      <DataTable
        data={rolesFiltrados}
        columns={columns}
        onRowClick={(rol) => console.log('Ver rol:', rol)}
      />
    </div>
  )
}

export default RolesView



