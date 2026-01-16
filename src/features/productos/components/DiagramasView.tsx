import { useState } from 'react'
import { Plus, Share2, FileImage, Calendar, User, ExternalLink } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { diagramas } from '../data/mockData'
import type { Diagrama } from '@/shared/types/productos.types'

const tipoColors: Record<string, string> = {
  'Arquitectura': 'bg-blue-100 text-blue-800',
  'Secuencia': 'bg-green-100 text-green-800',
  'ER': 'bg-purple-100 text-purple-800',
  'Flujo': 'bg-orange-100 text-orange-800',
  'Infraestructura': 'bg-cyan-100 text-cyan-800',
  'BPMN': 'bg-pink-100 text-pink-800',
  'Clases': 'bg-yellow-100 text-yellow-800',
}

export function DiagramasView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroTipo, setFiltroTipo] = useState<string>('Todos')

  const diagramasFiltrados = diagramas.filter(d => {
    const matchSearch = d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       d.autor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchTipo = filtroTipo === 'Todos' || d.tipo === filtroTipo
    return matchSearch && matchTipo
  })

  const stats = {
    total: diagramas.length,
    arquitectura: diagramas.filter(d => d.tipo === 'Arquitectura').length,
    secuencia: diagramas.filter(d => d.tipo === 'Secuencia').length,
    er: diagramas.filter(d => d.tipo === 'ER').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Diagramas</h2>
          <p className="text-sm text-gray-500 mt-1">Documentación visual del sistema</p>
        </div>
        <Button icon={Plus}>Nuevo Diagrama</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Diagramas" value={stats.total} icon={<Share2 size={32} />} color="info" />
        <StatCard title="Arquitectura" value={stats.arquitectura} icon={<FileImage size={32} />} color="success" />
        <StatCard title="Secuencia" value={stats.secuencia} icon={<Share2 size={32} />} color="purple" />
        <StatCard title="ER" value={stats.er} icon={<Share2 size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Arquitectura', 'Secuencia', 'ER', 'BPMN', 'Infraestructura'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltroTipo(tipo)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroTipo === tipo
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Diagramas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {diagramasFiltrados.map((diagrama) => (
          <DiagramaCard key={diagrama.id} diagrama={diagrama} />
        ))}
      </div>

      {diagramasFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Share2 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron diagramas</p>
        </div>
      )}
    </div>
  )
}

function DiagramaCard({ diagrama }: { diagrama: Diagrama }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      {/* Preview placeholder */}
      <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Share2 size={48} className="text-gray-400" />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
            {diagrama.codigo}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tipoColors[diagrama.tipo]}`}>
            {diagrama.tipo}
          </span>
        </div>

        <h3 className="font-bold text-gray-800 mb-2">{diagrama.nombre}</h3>
        {diagrama.descripcion && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{diagrama.descripcion}</p>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-1">
              <User size={14} />
              Autor
            </span>
            <span className="text-gray-800">{diagrama.autor}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-1">
              <Calendar size={14} />
              Actualizado
            </span>
            <span className="text-gray-800">{diagrama.ultimaActualizacion}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Herramienta</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">{diagrama.herramienta}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">v{diagrama.version}</span>
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold flex items-center gap-1">
          <ExternalLink size={14} /> Abrir
        </button>
      </div>
    </div>
  )
}

export default DiagramasView


