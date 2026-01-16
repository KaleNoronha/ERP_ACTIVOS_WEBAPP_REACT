import { useState } from 'react'
import { Plus, Mail, Phone, MapPin, Briefcase, Users, Building2, UserCheck } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { personas, departamentos } from '../data/mockData'
import type { Persona } from '@/shared/types/organizacion.types'

const departamentoColors: Record<string, string> = {
  'Tecnología': 'bg-blue-100 text-blue-800',
  'Negocios': 'bg-green-100 text-green-800',
  'Productos': 'bg-purple-100 text-purple-800',
  'Operaciones': 'bg-orange-100 text-orange-800',
  'Recursos Humanos': 'bg-pink-100 text-pink-800',
}

export function PersonasView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroDepartamento, setFiltroDepartamento] = useState<string>('Todos')

  const personasFiltradas = personas.filter(p => {
    const matchSearch = p.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       p.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchDepartamento = filtroDepartamento === 'Todos' || p.departamento === filtroDepartamento
    return matchSearch && matchDepartamento
  })

  const stats = {
    total: personas.length,
    activos: personas.filter(p => p.estado === 'Activo').length,
    departamentos: departamentos.length,
    indefinidos: personas.filter(p => p.tipoContrato === 'Indefinido').length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Equipo</h2>
          <p className="text-sm text-gray-500 mt-1">Gestiona el directorio de colaboradores</p>
        </div>
        <Button icon={Plus}>Agregar Persona</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Personas" value={stats.total} icon={<Users size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<UserCheck size={32} />} color="success" />
        <StatCard title="Departamentos" value={stats.departamentos} icon={<Building2 size={32} />} color="purple" />
        <StatCard title="Contrato Indefinido" value={stats.indefinidos} icon={<Briefcase size={32} />} color="orange" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <SearchInput
          placeholder="Buscar por nombre, cargo, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <select
          value={filtroDepartamento}
          onChange={(e) => setFiltroDepartamento(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="Todos">Todos los departamentos</option>
          {departamentos.map(d => (
            <option key={d.id} value={d.nombre}>{d.nombre}</option>
          ))}
        </select>
      </div>

      {/* Grid de Personas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {personasFiltradas.map((persona) => (
          <PersonaCard key={persona.id} persona={persona} />
        ))}
      </div>

      {personasFiltradas.length === 0 && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No se encontraron personas</p>
        </div>
      )}
    </div>
  )
}

function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-200 overflow-hidden group">
      <div className="h-20 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
      <div className="px-5 pb-5 -mt-10">
        <div className="flex justify-center mb-3">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-xl font-bold text-indigo-700 border-4 border-white shadow-lg">
            {persona.nombre.charAt(0)}{persona.apellido.charAt(0)}
          </div>
        </div>

        <div className="text-center mb-3">
          <h3 className="font-bold text-gray-800">{persona.nombreCompleto}</h3>
          <p className="text-sm text-gray-600 flex items-center justify-center gap-1 mt-1">
            <Briefcase size={14} />
            {persona.cargo}
          </p>
          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mt-2 ${departamentoColors[persona.departamento] || 'bg-gray-100 text-gray-800'}`}>
            {persona.departamento}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={14} className="text-indigo-600 flex-shrink-0" />
            <span className="truncate">{persona.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={14} className="text-indigo-600 flex-shrink-0" />
            <span>{persona.celular || persona.telefono}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <Badge variant={persona.estado === 'Activo' ? 'success' : 'default'}>{persona.estado}</Badge>
          <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
            Ver perfil →
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonasView



