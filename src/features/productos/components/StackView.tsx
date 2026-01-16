import { useState } from 'react'
import { Plus, Layers, Code, Database, Cloud, Shield, TestTube, AppWindow } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { tecnologias } from '../data/mockData'
import type { Tecnologia } from '@/shared/types/productos.types'

const categoriaIcons: Record<string, React.ReactNode> = {
  'Frontend': <AppWindow size={24} />,
  'Backend': <Code size={24} />,
  'Database': <Database size={24} />,
  'DevOps': <Cloud size={24} />,
  'Security': <Shield size={24} />,
  'Testing': <TestTube size={24} />,
  'Cloud': <Cloud size={24} />,
}

const categoriaColors: Record<string, string> = {
  'Frontend': 'from-blue-400 to-blue-600',
  'Backend': 'from-green-400 to-green-600',
  'Database': 'from-purple-400 to-purple-600',
  'DevOps': 'from-indigo-500 to-indigo-700',
  'Security': 'from-red-400 to-red-600',
  'Testing': 'from-cyan-400 to-cyan-600',
  'Cloud': 'from-indigo-400 to-indigo-600',
}

export function StackView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState<string>('Todos')

  const tecnologiasFiltradas = tecnologias.filter(t => {
    const matchSearch = t.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategoria = filtroCategoria === 'Todos' || t.categoria === filtroCategoria
    return matchSearch && matchCategoria
  })

  const stats = {
    total: tecnologias.length,
    frontend: tecnologias.filter(t => t.categoria === 'Frontend').length,
    backend: tecnologias.filter(t => t.categoria === 'Backend').length,
    devops: tecnologias.filter(t => t.categoria === 'DevOps').length,
  }

  // Agrupar por categoría
  const porCategoria = tecnologiasFiltradas.reduce((acc, tech) => {
    if (!acc[tech.categoria]) acc[tech.categoria] = []
    acc[tech.categoria].push(tech)
    return acc
  }, {} as Record<string, Tecnologia[]>)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Stack Tecnológico</h2>
          <p className="text-sm text-gray-500 mt-1">Tecnologías utilizadas en la organización</p>
        </div>
        <Button icon={Plus}>Agregar Tecnología</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tecnologías" value={stats.total} icon={<Layers size={32} />} color="info" />
        <StatCard title="Frontend" value={stats.frontend} icon={<AppWindow size={32} />} color="success" />
        <StatCard title="Backend" value={stats.backend} icon={<Code size={32} />} color="purple" />
        <StatCard title="DevOps" value={stats.devops} icon={<Cloud size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar tecnología..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <div className="flex gap-2 flex-wrap">
          {(['Todos', 'Frontend', 'Backend', 'Database', 'DevOps'] as const).map((cat) => (
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

      {/* Grid por Categoría */}
      {Object.entries(porCategoria).map(([categoria, techs]) => (
        <div key={categoria} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            {categoriaIcons[categoria]}
            {categoria}
            <span className="text-sm font-normal text-gray-500">({techs.length})</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techs.map((tech) => (
              <TecnologiaCard key={tech.id} tecnologia={tech} />
            ))}
          </div>
        </div>
      ))}

      {tecnologiasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Layers size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron tecnologías</p>
        </div>
      )}
    </div>
  )
}

function TecnologiaCard({ tecnologia }: { tecnologia: Tecnologia }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden group">
      <div className={`h-2 bg-gradient-to-r ${categoriaColors[tecnologia.categoria] || 'from-gray-400 to-gray-600'}`} />
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${categoriaColors[tecnologia.categoria] || 'from-gray-400 to-gray-600'} rounded-lg flex items-center justify-center text-white`}>
            {categoriaIcons[tecnologia.categoria] || <Code size={20} />}
          </div>
          <Badge variant={tecnologia.estado === 'Activo' ? 'success' : 'default'}>
            {tecnologia.estado}
          </Badge>
        </div>

        <h4 className="font-bold text-gray-800 mb-1">{tecnologia.nombre}</h4>
        <p className="text-xs text-gray-500 mb-3">v{tecnologia.version} • {tecnologia.licencia}</p>

        {tecnologia.descripcion && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tecnologia.descripcion}</p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            {tecnologia.aplicaciones} apps
          </span>
          {tecnologia.documentacionUrl && (
            <a 
              href={`https://${tecnologia.documentacionUrl}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-indigo-700 hover:text-indigo-800 font-semibold"
            >
              Docs →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default StackView


