import { useState } from 'react'
import { Plus, Filter, FileText, DollarSign, Calendar, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { propuestas } from '../data/mockData'
import type { Propuesta, EstadoPropuesta } from '@/shared/types/negocios.types'

export function PropuestasView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<EstadoPropuesta | 'Todos'>('Todos')

  const propuestasFiltradas = propuestas.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.codigo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchEstado = filtroEstado === 'Todos' || p.estado === filtroEstado
    return matchSearch && matchEstado
  })

  const stats = {
    total: propuestas.length,
    enNegociacion: propuestas.filter(p => p.estado === 'En Negociación').length,
    valorTotal: propuestas.reduce((acc, p) => acc + p.monto, 0),
    aprobadas: propuestas.filter(p => p.estado === 'Aprobada').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Propuestas</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de propuestas comerciales</p>
        </div>
        <Button icon={Plus}>Nueva Propuesta</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Propuestas" value={stats.total} icon={<FileText size={32} />} color="info" />
        <StatCard title="En Negociación" value={stats.enNegociacion} icon={<Clock size={32} />} color="warning" />
        <StatCard title="Valor Total" value={`$${(stats.valorTotal / 1000).toFixed(0)}K`} icon={<DollarSign size={32} />} color="success" />
        <StatCard title="Aprobadas" value={stats.aprobadas} icon={<CheckCircle size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar propuestas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2">
          {(['Todos', 'Borrador', 'Enviada', 'En Negociación', 'Aprobada'] as const).map((estado) => (
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

      {/* Lista de Propuestas */}
      <div className="space-y-4">
        {propuestasFiltradas.map((propuesta) => (
          <PropuestaCard key={propuesta.id} propuesta={propuesta} />
        ))}
      </div>

      {propuestasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron propuestas</p>
        </div>
      )}
    </div>
  )
}

function PropuestaCard({ propuesta }: { propuesta: Propuesta }) {
  const [expanded, setExpanded] = useState(false)
  
  const montoFinal = propuesta.descuento 
    ? propuesta.monto * (1 - propuesta.descuento / 100)
    : propuesta.monto

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                {propuesta.codigo}
              </span>
              <Badge variant={getStatusVariant(propuesta.estado)}>{propuesta.estado}</Badge>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-1">{propuesta.titulo}</h3>
            <p className="text-sm text-gray-600 mb-3">{propuesta.descripcion}</p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FileText size={14} />
                Cliente: <span className="font-medium text-gray-700">{propuesta.cliente}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Emitida: {propuesta.fechaEmision}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} />
                Vence: {propuesta.fechaVencimiento}
              </span>
            </div>
          </div>

          <div className="text-right ml-6">
            <p className="text-sm text-gray-500">Monto Total</p>
            <p className="text-2xl font-bold text-green-600">
              ${montoFinal.toLocaleString()} {propuesta.moneda}
            </p>
            {propuesta.descuento && (
              <p className="text-xs text-indigo-700">
                -{propuesta.descuento}% descuento aplicado
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">Responsable: {propuesta.responsable}</p>
          </div>
        </div>

        {/* Items expandibles */}
        <button 
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm text-indigo-700 hover:text-indigo-800 font-medium"
        >
          {expanded ? 'Ocultar detalle' : 'Ver detalle'} ({propuesta.items.length} items)
        </button>

        {expanded && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-2">Descripción</th>
                  <th className="pb-2 text-center">Cantidad</th>
                  <th className="pb-2 text-right">P. Unitario</th>
                  <th className="pb-2 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {propuesta.items.map((item) => (
                  <tr key={item.id} className="border-t border-gray-50">
                    <td className="py-2 text-gray-700">{item.descripcion}</td>
                    <td className="py-2 text-center">{item.cantidad}</td>
                    <td className="py-2 text-right">${item.precioUnitario.toLocaleString()}</td>
                    <td className="py-2 text-right font-medium">${item.subtotal.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-gray-200 font-bold">
                  <td colSpan={3} className="py-2 text-right">Total:</td>
                  <td className="py-2 text-right text-green-600">${propuesta.monto.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
        <Button variant="outline" size="sm">Duplicar</Button>
        <Button variant="outline" size="sm">Editar</Button>
        <Button size="sm">Enviar</Button>
      </div>
    </div>
  )
}

export default PropuestasView


