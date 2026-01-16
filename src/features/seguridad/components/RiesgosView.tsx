import { useState } from 'react'
import { Plus, AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { riesgos } from '../data/mockData'
import type { Riesgo, NivelRiesgo } from '@/shared/types/seguridad.types'

type MatrizKey = `${'Alta' | 'Media' | 'Baja'}-${'Alto' | 'Medio' | 'Bajo'}`

export function RiesgosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [vista, setVista] = useState<'matriz' | 'lista'>('matriz')

  const riesgosFiltrados = riesgos.filter(r =>
    r.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    criticos: riesgos.filter(r => r.nivelRiesgo === 'Crítico').length,
    altos: riesgos.filter(r => r.nivelRiesgo === 'Alto').length,
    medios: riesgos.filter(r => r.nivelRiesgo === 'Medio').length,
    bajos: riesgos.filter(r => r.nivelRiesgo === 'Bajo').length,
  }

  // Construir matriz de riesgos
  const matrizData: Record<MatrizKey, Riesgo[]> = {
    'Alta-Alto': riesgos.filter(r => r.probabilidad === 'Alta' && r.impacto === 'Alto'),
    'Alta-Medio': riesgos.filter(r => r.probabilidad === 'Alta' && r.impacto === 'Medio'),
    'Alta-Bajo': riesgos.filter(r => r.probabilidad === 'Alta' && r.impacto === 'Bajo'),
    'Media-Alto': riesgos.filter(r => r.probabilidad === 'Media' && r.impacto === 'Alto'),
    'Media-Medio': riesgos.filter(r => r.probabilidad === 'Media' && r.impacto === 'Medio'),
    'Media-Bajo': riesgos.filter(r => r.probabilidad === 'Media' && r.impacto === 'Bajo'),
    'Baja-Alto': riesgos.filter(r => r.probabilidad === 'Baja' && r.impacto === 'Alto'),
    'Baja-Medio': riesgos.filter(r => r.probabilidad === 'Baja' && r.impacto === 'Medio'),
    'Baja-Bajo': riesgos.filter(r => r.probabilidad === 'Baja' && r.impacto === 'Bajo'),
  }

  const getCellColor = (prob: string, imp: string) => {
    const key = `${prob}-${imp}`
    if (['Alta-Alto', 'Alta-Medio', 'Media-Alto'].includes(key)) return 'bg-red-100 border-red-300'
    if (['Media-Medio', 'Alta-Bajo', 'Baja-Alto'].includes(key)) return 'bg-yellow-100 border-yellow-300'
    return 'bg-green-100 border-green-300'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestión de Riesgos</h2>
          <p className="text-sm text-gray-500 mt-1">Matriz de probabilidad e impacto</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVista('matriz')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'matriz' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Matriz
            </button>
            <button
              onClick={() => setVista('lista')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'lista' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Lista
            </button>
          </div>
          <Button icon={Plus}>Nuevo Riesgo</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Críticos" value={stats.criticos} icon={<AlertTriangle size={32} />} color="danger" />
        <StatCard title="Altos" value={stats.altos} icon={<TrendingUp size={32} />} color="orange" />
        <StatCard title="Medios" value={stats.medios} icon={<TrendingDown size={32} />} color="warning" />
        <StatCard title="Bajos" value={stats.bajos} icon={<Shield size={32} />} color="success" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar riesgos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
      </div>

      {/* Vista */}
      {vista === 'matriz' ? (
        <MatrizRiesgos matrizData={matrizData} getCellColor={getCellColor} />
      ) : (
        <ListaRiesgos riesgos={riesgosFiltrados} />
      )}
    </div>
  )
}

function MatrizRiesgos({ 
  matrizData, 
  getCellColor 
}: { 
  matrizData: Record<MatrizKey, Riesgo[]>
  getCellColor: (prob: string, imp: string) => string 
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="font-bold text-lg mb-4">Matriz de Riesgos</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">
                Probabilidad / Impacto
              </th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Bajo</th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Medio</th>
              <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Alto</th>
            </tr>
          </thead>
          <tbody>
            {(['Alta', 'Media', 'Baja'] as const).map((prob) => (
              <tr key={prob}>
                <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-sm">{prob}</td>
                {(['Bajo', 'Medio', 'Alto'] as const).map((imp) => {
                  const key = `${prob}-${imp}` as MatrizKey
                  const items = matrizData[key] || []
                  return (
                    <td 
                      key={imp} 
                      className={`border border-gray-300 p-3 ${getCellColor(prob, imp)} h-24 align-top min-w-[150px]`}
                    >
                      <div className="flex flex-wrap gap-1">
                        {items.map(riesgo => (
                          <span 
                            key={riesgo.codigo} 
                            className="px-2 py-1 bg-white rounded text-xs font-semibold shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                            title={riesgo.titulo}
                          >
                            {riesgo.codigo}
                          </span>
                        ))}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded" />
          <span>Crítico/Alto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-100 border border-yellow-300 rounded" />
          <span>Medio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
          <span>Bajo</span>
        </div>
      </div>
    </div>
  )
}

function ListaRiesgos({ riesgos }: { riesgos: Riesgo[] }) {
  const nivelColors: Record<NivelRiesgo, string> = {
    'Crítico': 'bg-red-100 text-red-800',
    'Alto': 'bg-orange-100 text-orange-800',
    'Medio': 'bg-yellow-100 text-yellow-800',
    'Bajo': 'bg-green-100 text-green-800',
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-bold text-lg">Lista de Riesgos</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {riesgos.map((riesgo) => (
          <div key={riesgo.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                    {riesgo.codigo}
                  </span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${nivelColors[riesgo.nivelRiesgo]}`}>
                    {riesgo.nivelRiesgo}
                  </span>
                  <Badge variant={getStatusVariant(riesgo.estado)}>{riesgo.estado}</Badge>
                </div>
                <p className="font-semibold text-gray-800 mb-1">{riesgo.titulo}</p>
                <p className="text-sm text-gray-600 mb-2">{riesgo.descripcion}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Categoría: <span className="font-medium">{riesgo.categoria}</span></span>
                  <span>Propietario: <span className="font-medium">{riesgo.propietario}</span></span>
                </div>
              </div>
              <div className="text-right text-sm ml-4">
                <p className="text-gray-600">
                  Probabilidad: <span className="font-semibold">{riesgo.probabilidad}</span>
                </p>
                <p className="text-gray-600">
                  Impacto: <span className="font-semibold">{riesgo.impacto}</span>
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {riesgo.controles.length} controles
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RiesgosView


