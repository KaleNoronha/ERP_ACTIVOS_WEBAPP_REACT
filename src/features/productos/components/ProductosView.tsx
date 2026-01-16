import { useState } from 'react'
import { Plus, Package, Tag, Calendar, Code, ExternalLink, Box } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { productos } from '../data/mockData'
import type { Producto, EstadoProducto } from '@/shared/types/productos.types'

const estadoColors: Record<EstadoProducto, 'success' | 'info' | 'warning' | 'default'> = {
  'Activo': 'success',
  'Desarrollo': 'info',
  'Beta': 'warning',
  'Descontinuado': 'default',
}

const categoriaColors: Record<string, string> = {
  'Software': 'bg-blue-100 text-blue-800',
  'SaaS': 'bg-purple-100 text-purple-800',
  'Web App': 'bg-green-100 text-green-800',
  'Mobile': 'bg-orange-100 text-orange-800',
  'API': 'bg-cyan-100 text-cyan-800',
  'Infraestructura': 'bg-gray-100 text-gray-800',
}

export function ProductosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos')

  const productosFiltrados = productos.filter(p => {
    const matchSearch = p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filtroCategoria === 'Todos' || p.categoria === filtroCategoria
    return matchSearch && matchCategoria
  })

  const stats = {
    total: productos.length,
    activos: productos.filter(p => p.estado === 'Activo').length,
    enDesarrollo: productos.filter(p => p.estado === 'Desarrollo' || p.estado === 'Beta').length,
    tecnologias: [...new Set(productos.flatMap(p => p.tecnologias))].length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona el portafolio de productos</p>
        </div>
        <Button icon={Plus}>Nuevo Producto</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Productos" value={stats.total} icon={<Package size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<Box size={32} />} color="success" />
        <StatCard title="En Desarrollo" value={stats.enDesarrollo} icon={<Code size={32} />} color="warning" />
        <StatCard title="Tecnologías" value={stats.tecnologias} icon={<Tag size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Software', 'SaaS', 'Web App', 'Mobile', 'API'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFiltroCategoria(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filtroCategoria === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron productos</p>
        </div>
      )}
    </div>
  )
}

function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-xl flex items-center justify-center">
            <Package size={28} className="text-white" />
          </div>
          <Badge variant={estadoColors[producto.estado]}>{producto.estado}</Badge>
        </div>

        <div className="mb-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
            {producto.codigo}
          </span>
        </div>

        <h3 className="font-bold text-lg text-gray-800 mb-2">{producto.nombre}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{producto.descripcion}</p>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-2">
              <Tag size={14} />
              Categoría
            </span>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoriaColors[producto.categoria]}`}>
              {producto.categoria}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Versión</span>
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{producto.version}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-2">
              <Calendar size={14} />
              Lanzamiento
            </span>
            <span className="text-gray-800">{producto.fechaLanzamiento}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Tecnologías</p>
          <div className="flex flex-wrap gap-1">
            {producto.tecnologias.slice(0, 3).map(tech => (
              <span key={tech} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
            {producto.tecnologias.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{producto.tecnologias.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        {producto.repositorio && (
          <a href={`https://${producto.repositorio}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
            <ExternalLink size={14} /> Repo
          </a>
        )}
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default ProductosView


