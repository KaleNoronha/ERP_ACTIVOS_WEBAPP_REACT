import { useState } from 'react'
import { Plus, Filter, FileText, DollarSign, Calendar, AlertTriangle, CheckCircle, Clock, RefreshCw } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { contratos } from '../data/mockData'
import type { Contrato, EstadoContrato } from '@/shared/types/negocios.types'

export function ContratosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<EstadoContrato | 'Todos'>('Todos')

  const contratosFiltrados = contratos.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       c.numero.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === 'Todos' || c.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const stats = {
    total: contratos.length,
    vigentes: contratos.filter(c => c.estado === 'Vigente').length,
    porVencer: contratos.filter(c => c.estado === 'Por Vencer').length,
    valorTotal: contratos.reduce((acc, c) => acc + c.monto, 0),
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contratos</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de contratos comerciales</p>
        </div>
        <Button icon={Plus}>Nuevo Contrato</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Contratos" value={stats.total} icon={<FileText size={32} />} color="info" />
        <StatCard title="Vigentes" value={stats.vigentes} icon={<CheckCircle size={32} />} color="success" />
        <StatCard title="Por Vencer" value={stats.porVencer} icon={<AlertTriangle size={32} />} color="warning" />
        <StatCard title="Valor Total" value={`$${(stats.valorTotal / 1000).toFixed(0)}K`} icon={<DollarSign size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar contratos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todos', 'Vigente', 'Por Vencer', 'Vencido'] as const).map((estado) => (
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
        <Button variant="outline" icon={Filter}>Más Filtros</Button>
      </div>

      {/* Lista de Contratos */}
      <div className="space-y-4">
        {contratosFiltrados.map((contrato) => (
          <ContratoCard key={contrato.id} contrato={contrato} />
        ))}
      </div>

      {contratosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron contratos</p>
        </div>
      )}
    </div>
  )
}

function ContratoCard({ contrato }: { contrato: Contrato }) {
  const diasRestantes = calcularDiasRestantes(contrato.fechaFin)
  
  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 overflow-hidden ${
      contrato.estado === 'Por Vencer' ? 'border-l-yellow-500' :
      contrato.estado === 'Vigente' ? 'border-l-green-500' :
      contrato.estado === 'Vencido' ? 'border-l-red-500' :
      'border-l-gray-300'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                {contrato.numero}
              </span>
              <Badge variant={getStatusVariant(contrato.estado)}>{contrato.estado}</Badge>
              <Badge variant="info">{contrato.tipo}</Badge>
              {contrato.renovacionAutomatica && (
                <span className="flex items-center gap-1 text-xs text-blue-600">
                  <RefreshCw size={12} /> Auto-renovación
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{contrato.titulo}</h3>
            
            <div className="flex items-center gap-6 text-sm text-gray-500 mt-3">
              <span className="flex items-center gap-1">
                <FileText size={14} />
                Cliente: <span className="font-medium text-gray-700">{contrato.cliente}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {contrato.fechaInicio} - {contrato.fechaFin}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {diasRestantes > 0 ? `${diasRestantes} días restantes` : 'Vencido'}
              </span>
            </div>
          </div>

          <div className="text-right ml-6">
            <p className="text-sm text-gray-500">Monto</p>
            <p className="text-2xl font-bold text-green-600">
              ${contrato.monto.toLocaleString()} {contrato.moneda}
            </p>
            <p className="text-xs text-gray-500 mt-1">Responsable: {contrato.responsable}</p>
          </div>
        </div>

        {/* Barra de progreso del contrato */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>{contrato.fechaInicio}</span>
            <span>{contrato.fechaFin}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                contrato.estado === 'Por Vencer' ? 'bg-yellow-500' :
                contrato.estado === 'Vigente' ? 'bg-green-500' :
                'bg-red-500'
              }`}
              style={{ width: `${calcularProgreso(contrato.fechaInicio, contrato.fechaFin)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <Button variant="outline" size="sm">Ver Documento</Button>
        <Button variant="outline" size="sm">Editar</Button>
        {contrato.estado === 'Por Vencer' && (
          <Button size="sm" icon={RefreshCw}>Renovar</Button>
        )}
      </div>
    </div>
  )
}

function calcularDiasRestantes(fechaFin: string): number {
  const hoy = new Date()
  const fin = new Date(fechaFin)
  const diff = fin.getTime() - hoy.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function calcularProgreso(fechaInicio: string, fechaFin: string): number {
  const inicio = new Date(fechaInicio).getTime()
  const fin = new Date(fechaFin).getTime()
  const hoy = new Date().getTime()
  
  if (hoy >= fin) return 100
  if (hoy <= inicio) return 0
  
  return Math.round(((hoy - inicio) / (fin - inicio)) * 100)
}

export default ContratosView


