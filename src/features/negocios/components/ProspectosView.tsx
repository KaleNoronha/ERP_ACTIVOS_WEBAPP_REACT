import { useState } from 'react'
import { Plus, Filter, Building2, DollarSign, Calendar, TrendingUp, Users, MoreHorizontal } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { prospectos } from '../data/mockData'
import type { Prospecto, EstadoProspecto } from '@/shared/types/negocios.types'

export function ProspectosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<EstadoProspecto | 'Todos'>('Todos')

  const prospectosFiltrados = prospectos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === 'Todos' || p.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const stats = {
    total: prospectos.length,
    nuevos: prospectos.filter(p => p.estado === 'Nuevo').length,
    calificados: prospectos.filter(p => p.estado === 'Calificado').length,
    valorTotal: prospectos.reduce((acc, p) => acc + p.valor, 0),
  }

  return (
    <div className="p-6 bg-[#f8f7f4] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-900">Prospectos</h1>
          <p className="text-gray-500 mt-1">Gestiona tus oportunidades de negocio</p>
        </div>
        <Button icon={Plus}>Nuevo Prospecto</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Prospectos" 
          value={stats.total} 
          icon={<Users size={24} />}
          color="info"
        />
        <StatCard 
          title="Nuevos" 
          value={stats.nuevos} 
          icon={<TrendingUp size={24} />}
          color="success"
        />
        <StatCard 
          title="Calificados" 
          value={stats.calificados} 
          icon={<Users size={24} />}
          color="purple"
        />
        <StatCard 
          title="Valor Pipeline" 
          value={`$${(stats.valorTotal / 1000).toFixed(0)}K`} 
          icon={<DollarSign size={24} />}
          color="brand"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3 mb-6">
        <SearchInput
          placeholder="Buscar por nombre, empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todos', 'Nuevo', 'Contactado', 'Calificado'] as const).map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                filtroEstado === estado
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {estado}
            </button>
          ))}
        </div>
        <Button variant="outline" icon={Filter}>Más Filtros</Button>
      </div>

      {/* Grid de Prospectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prospectosFiltrados.map((prospecto) => (
          <ProspectoCard key={prospecto.id} prospecto={prospecto} />
        ))}
      </div>

      {prospectosFiltrados.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron prospectos</p>
        </div>
      )}
    </div>
  )
}

function ProspectoCard({ prospecto }: { prospecto: Prospecto }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-gray-200 transition-all group">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-semibold text-lg shadow-lg shadow-brand-500/20">
              {prospecto.nombre.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-brand-900">{prospecto.nombre}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Building2 size={12} />
                {prospecto.empresa}
              </p>
            </div>
          </div>
          <button className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <DollarSign size={14} className="text-emerald-500" />
              Valor estimado
            </span>
            <span className="font-semibold text-emerald-600">${prospecto.valor.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar size={14} className="text-sky-500" />
              Fecha contacto
            </span>
            <span className="text-sm text-gray-700">{prospecto.fechaContacto}</span>
          </div>

          {/* Progress bar */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Probabilidad</span>
              <span className="text-xs font-semibold text-brand-900">{prospecto.probabilidad}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-brand-500 to-brand-700 h-1.5 rounded-full transition-all"
                style={{ width: `${prospecto.probabilidad}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <Badge variant={getStatusVariant(prospecto.estado)}>{prospecto.estado}</Badge>
        <button className="text-sm text-brand-500 hover:text-brand-700 font-medium">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default ProspectosView
