import { useState } from 'react'
import { Plus, AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { vulnerabilidades } from '../data/mockData'
import type { Vulnerabilidad, Severidad } from '@/shared/types/seguridad.types'

export function VulnerabilidadesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroSeveridad, setFiltroSeveridad] = useState<Severidad | 'Todas'>('Todas')

  const vulnerabilidadesFiltradas = vulnerabilidades.filter(v => {
    const matchSearch = v.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       v.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       v.aplicacion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSeveridad = filtroSeveridad === 'Todas' || v.severidad === filtroSeveridad
    return matchSearch && matchSeveridad
  })

  const stats = {
    criticas: vulnerabilidades.filter(v => v.severidad === 'Crítica' && v.estado !== 'Resuelta').length,
    altas: vulnerabilidades.filter(v => v.severidad === 'Alta' && v.estado !== 'Resuelta').length,
    medias: vulnerabilidades.filter(v => v.severidad === 'Media' && v.estado !== 'Resuelta').length,
    bajas: vulnerabilidades.filter(v => v.severidad === 'Baja' && v.estado !== 'Resuelta').length,
  }

  const severidadColors: Record<Severidad, { bg: string; text: string; border: string }> = {
    'Crítica': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-500' },
    'Alta': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-indigo-600' },
    'Media': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-500' },
    'Baja': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-500' },
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vulnerabilidades</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de seguridad de aplicaciones</p>
        </div>
        <Button icon={Plus}>Nueva Vulnerabilidad</Button>
      </div>

      {/* Stats con gradientes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle size={32} />
            <span className="text-4xl font-bold">{stats.criticas}</span>
          </div>
          <p className="text-sm font-semibold opacity-90">Críticas</p>
          <p className="text-xs opacity-75 mt-1">Requieren atención inmediata</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={32} />
            <span className="text-4xl font-bold">{stats.altas}</span>
          </div>
          <p className="text-sm font-semibold opacity-90">Altas</p>
          <p className="text-xs opacity-75 mt-1">Prioridad alta</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Clock size={32} />
            <span className="text-4xl font-bold">{stats.medias}</span>
          </div>
          <p className="text-sm font-semibold opacity-90">Medias</p>
          <p className="text-xs opacity-75 mt-1">Planificar corrección</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Shield size={32} />
            <span className="text-4xl font-bold">{stats.bajas}</span>
          </div>
          <p className="text-sm font-semibold opacity-90">Bajas</p>
          <p className="text-xs opacity-75 mt-1">Bajo riesgo</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar vulnerabilidades..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todas', 'Crítica', 'Alta', 'Media', 'Baja'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setFiltroSeveridad(sev)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroSeveridad === sev
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Vulnerabilidades */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-bold text-lg">Lista de Vulnerabilidades</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {vulnerabilidadesFiltradas.map((vuln) => {
            const colors = severidadColors[vuln.severidad]
            return (
              <div 
                key={vuln.id} 
                className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${colors.border}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                        {vuln.codigo}
                      </span>
                      {vuln.cveId && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                          {vuln.cveId}
                        </span>
                      )}
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${colors.bg} ${colors.text}`}>
                        {vuln.severidad}
                      </span>
                      <Badge variant={getStatusVariant(vuln.estado)}>{vuln.estado}</Badge>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{vuln.titulo}</h4>
                    <p className="text-sm text-gray-600 mb-2">{vuln.descripcion}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>App: <span className="font-semibold">{vuln.aplicacion}</span></span>
                      {vuln.componente && <span>Componente: <span className="font-semibold">{vuln.componente}</span></span>}
                      <span>Detectado: {vuln.fechaDeteccion}</span>
                      <span>Responsable: <span className="font-semibold">{vuln.responsable}</span></span>
                    </div>
                  </div>

                  <div className="text-right ml-6">
                    <div className="mb-2">
                      <span className="text-xs text-gray-500">CVSS Score</span>
                      <div className={`text-2xl font-bold ${colors.text}`}>{vuln.cvssScore}</div>
                    </div>
                    <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
                      Ver detalles →
                    </button>
                  </div>
                </div>

                {vuln.solucionPropuesta && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                    <span className="font-semibold text-blue-800">Solución propuesta: </span>
                    <span className="text-blue-700">{vuln.solucionPropuesta}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {vulnerabilidadesFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Shield size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron vulnerabilidades</p>
        </div>
      )}
    </div>
  )
}

export default VulnerabilidadesView


