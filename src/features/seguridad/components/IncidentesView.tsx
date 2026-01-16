import { useState } from 'react'
import { Plus, AlertCircle, Clock, CheckCircle, XCircle, Users, Zap } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { incidentes } from '../data/mockData'
import type { Incidente, Prioridad } from '@/shared/types/seguridad.types'

export function IncidentesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<string>('Todos')

  const incidentesFiltrados = incidentes.filter(i => {
    const matchSearch = i.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       i.numero.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === 'Todos' || i.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const stats = {
    abiertos: incidentes.filter(i => i.estado === 'Abierto').length,
    enInvestigacion: incidentes.filter(i => i.estado === 'En Investigación').length,
    resueltos: incidentes.filter(i => i.estado === 'Resuelto').length,
    cerrados: incidentes.filter(i => i.estado === 'Cerrado').length,
  }

  const prioridadColors: Record<Prioridad, { bg: string; text: string; border: string; icon: string }> = {
    'Crítica': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500', icon: 'text-red-500' },
    'Alta': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-indigo-600', icon: 'text-indigo-600' },
    'Media': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500', icon: 'text-yellow-500' },
    'Baja': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500', icon: 'text-blue-500' },
  }

  const estadoIcons: Record<string, { icon: typeof AlertCircle; color: string; bg: string }> = {
    'Abierto': { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100' },
    'En Investigación': { icon: Clock, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    'Contenido': { icon: Zap, color: 'text-indigo-600', bg: 'bg-orange-100' },
    'Resuelto': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100' },
    'Cerrado': { icon: XCircle, color: 'text-gray-500', bg: 'bg-gray-100' },
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Incidentes de Seguridad</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión y seguimiento de incidentes</p>
        </div>
        <Button icon={Plus}>Nuevo Incidente</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Abiertos</p>
              <p className="text-3xl font-bold text-red-600">{stats.abiertos}</p>
            </div>
            <AlertCircle size={32} className="text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Investigación</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.enInvestigacion}</p>
            </div>
            <Clock size={32} className="text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resueltos</p>
              <p className="text-3xl font-bold text-green-600">{stats.resueltos}</p>
            </div>
            <CheckCircle size={32} className="text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Cerrados</p>
              <p className="text-3xl font-bold text-gray-600">{stats.cerrados}</p>
            </div>
            <XCircle size={32} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar incidentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {['Todos', 'Abierto', 'En Investigación', 'Resuelto', 'Cerrado'].map((estado) => (
            <button
              key={estado}
              onClick={() => setFiltroEstado(estado)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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

      {/* Timeline de Incidentes */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-bold text-lg mb-6">Timeline de Incidentes</h3>
        <div className="space-y-4">
          {incidentesFiltrados.map((inc, index) => {
            const colors = prioridadColors[inc.prioridad]
            const estadoConfig = estadoIcons[inc.estado] || estadoIcons['Abierto']
            const EstadoIcon = estadoConfig.icon

            return (
              <div key={inc.id} className="relative">
                {index !== incidentesFiltrados.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                )}
                <div className="flex gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-full ${estadoConfig.bg} flex items-center justify-center`}>
                    <EstadoIcon size={24} className={estadoConfig.color} />
                  </div>
                  <div className={`flex-1 bg-white border-2 ${colors.border} rounded-lg p-4 hover:shadow-lg transition-shadow`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                            {inc.numero}
                          </span>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${colors.bg} ${colors.text}`}>
                            {inc.prioridad}
                          </span>
                          <Badge variant="info">{inc.tipo}</Badge>
                          <Badge variant={getStatusVariant(inc.estado)}>{inc.estado}</Badge>
                        </div>
                        <h4 className="font-bold text-gray-800 mb-2">{inc.titulo}</h4>
                        <p className="text-sm text-gray-600 mb-2">{inc.descripcion}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
                          <span>Reportado: {inc.fechaReporte}</span>
                          <span>•</span>
                          <span>Servicio: <span className="font-semibold">{inc.servicioAfectado}</span></span>
                          <span>•</span>
                          <span>Asignado: <span className="font-semibold">{inc.asignadoA}</span></span>
                          {inc.usuariosAfectados && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Users size={14} />
                                {inc.usuariosAfectados} usuarios afectados
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold whitespace-nowrap ml-4">
                        Ver detalles →
                      </button>
                    </div>

                    {/* Info adicional para resueltos/cerrados */}
                    {(inc.estado === 'Resuelto' || inc.estado === 'Cerrado') && inc.tiempoResolucion && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-green-700">
                            <span className="font-semibold">Tiempo de resolución:</span> {inc.tiempoResolucion}
                          </span>
                          {inc.causaRaiz && (
                            <span className="text-green-700">
                              <span className="font-semibold">Causa raíz:</span> {inc.causaRaiz}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Timeline del incidente */}
                    {inc.timeline.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-500 mb-2">Últimas acciones:</p>
                        <div className="space-y-1">
                          {inc.timeline.slice(-2).map((entry) => (
                            <div key={entry.id} className="text-xs text-gray-500 flex items-center gap-2">
                              <span className="font-mono">{entry.fecha.split(' ')[1]}</span>
                              <span className="font-semibold">{entry.accion}</span>
                              <span>- {entry.usuario}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {incidentesFiltrados.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron incidentes</p>
        </div>
      )}
    </div>
  )
}

export default IncidentesView


