import { useState } from 'react'
import { Plus, Filter, TrendingUp, DollarSign, Target, Clock, ArrowRight } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { leads } from '../data/mockData'
import type { Lead, EstadoLead } from '@/shared/types/negocios.types'

const ETAPAS = ['Contacto Inicial', 'Demo', 'Propuesta', 'Negociación', 'Cierre']

export function LeadsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [vista, setVista] = useState<'lista' | 'pipeline'>('lista')

  const leadsFiltrados = leads.filter(l => 
    l.prospecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: leads.length,
    enProceso: leads.filter(l => l.estado === 'En Proceso').length,
    valorTotal: leads.reduce((acc, l) => acc + l.valor, 0),
    tasaConversion: 25, // Simulado
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Leads</h2>
          <p className="text-sm text-gray-500 mt-1">Pipeline de oportunidades comerciales</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVista('lista')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'lista' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Lista
            </button>
            <button
              onClick={() => setVista('pipeline')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'pipeline' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Pipeline
            </button>
          </div>
          <Button icon={Plus}>Nuevo Lead</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Leads" value={stats.total} icon={<Target size={32} />} color="info" />
        <StatCard title="En Proceso" value={stats.enProceso} icon={<Clock size={32} />} color="warning" />
        <StatCard title="Valor Pipeline" value={`$${(stats.valorTotal / 1000).toFixed(0)}K`} icon={<DollarSign size={32} />} color="success" />
        <StatCard title="Tasa Conversión" value={`${stats.tasaConversion}%`} icon={<TrendingUp size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <Button variant="outline" icon={Filter}>Filtros</Button>
      </div>

      {/* Vista Lista o Pipeline */}
      {vista === 'lista' ? (
        <LeadsLista leads={leadsFiltrados} />
      ) : (
        <LeadsPipeline leads={leadsFiltrados} />
      )}
    </div>
  )
}

function LeadsLista({ leads }: { leads: Lead[] }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lead</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Etapa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Probabilidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-800">{lead.prospecto}</p>
                  <p className="text-sm text-gray-500">{lead.empresa}</p>
                  <p className="text-xs text-gray-400 font-mono">{lead.codigo}</p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{lead.producto}</td>
              <td className="px-6 py-4">
                <span className="font-bold text-green-600">${lead.valor.toLocaleString()}</span>
              </td>
              <td className="px-6 py-4">
                <Badge variant="info">{lead.etapa}</Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${lead.probabilidad}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{lead.probabilidad}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <Badge variant={getStatusVariant(lead.estado)}>{lead.estado}</Badge>
              </td>
              <td className="px-6 py-4 text-sm">
                <button className="text-indigo-700 hover:text-indigo-800 font-medium">Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function LeadsPipeline({ leads }: { leads: Lead[] }) {
  const leadsPorEtapa = ETAPAS.reduce((acc, etapa) => {
    acc[etapa] = leads.filter(l => l.etapa === etapa)
    return acc
  }, {} as Record<string, Lead[]>)

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {ETAPAS.map((etapa) => (
        <div key={etapa} className="flex-shrink-0 w-72">
          <div className="bg-gray-100 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">{etapa}</h3>
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                {leadsPorEtapa[etapa]?.length || 0}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              ${(leadsPorEtapa[etapa]?.reduce((acc, l) => acc + l.valor, 0) || 0).toLocaleString()}
            </p>
          </div>
          
          <div className="space-y-3">
            {leadsPorEtapa[etapa]?.map((lead) => (
              <div key={lead.id} className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{lead.prospecto}</p>
                    <p className="text-xs text-gray-500">{lead.empresa}</p>
                  </div>
                  <Badge variant={getStatusVariant(lead.estado)} size="sm">{lead.estado}</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{lead.producto}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600 text-sm">${lead.valor.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">{lead.probabilidad}%</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
                  <span>{lead.responsable}</span>
                  <ArrowRight size={14} className="text-indigo-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LeadsView


