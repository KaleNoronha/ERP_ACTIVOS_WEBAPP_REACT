import { useState } from 'react'
import { Plus, Filter, Mail, Phone, Linkedin, Building2, Star, Users } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard } from '@/shared/components/ui'
import { contactos } from '../data/mockData'
import type { Contacto } from '@/shared/types/negocios.types'

export function ContactosView() {
  const [searchTerm, setSearchTerm] = useState('')

  const contactosFiltrados = contactos.filter(c => 
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: contactos.length,
    activos: contactos.filter(c => c.estado === 'Activo').length,
    decisionMakers: contactos.filter(c => c.esDecisionMaker).length,
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contactos</h2>
          <p className="text-sm text-gray-500 mt-1">Directorio de contactos comerciales</p>
        </div>
        <Button icon={Plus}>Nuevo Contacto</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Contactos" value={stats.total} icon={<Users size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<Users size={32} />} color="success" />
        <StatCard title="Decision Makers" value={stats.decisionMakers} icon={<Star size={32} />} color="warning" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar contactos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <Button variant="outline" icon={Filter}>Filtros</Button>
      </div>

      {/* Grid de Contactos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactosFiltrados.map((contacto) => (
          <ContactoCard key={contacto.id} contacto={contacto} />
        ))}
      </div>
    </div>
  )
}

function ContactoCard({ contacto }: { contacto: Contacto }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {contacto.nombre.charAt(0)}{contacto.apellido.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{contacto.nombre} {contacto.apellido}</h3>
              <p className="text-sm text-gray-500">{contacto.cargo}</p>
            </div>
          </div>
          {contacto.esDecisionMaker && (
            <span className="flex items-center gap-1 text-yellow-500 text-xs font-semibold">
              <Star size={14} fill="currentColor" /> DM
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <Building2 size={14} />
          <span className="text-sm font-medium">{contacto.empresa}</span>
        </div>

        <div className="space-y-2 text-sm">
          <a href={`mailto:${contacto.email}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <Mail size={14} />
            <span>{contacto.email}</span>
          </a>
          <a href={`tel:${contacto.telefono}`} className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
            <Phone size={14} />
            <span>{contacto.telefono}</span>
          </a>
          {contacto.celular && (
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={14} />
              <span>{contacto.celular} (Cel)</span>
            </div>
          )}
          {contacto.linkedin && (
            <a href={`https://${contacto.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Linkedin size={14} />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Badge variant={getStatusVariant(contacto.estado)}>{contacto.estado}</Badge>
        <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
          Ver detalles →
        </button>
      </div>
    </div>
  )
}

export default ContactosView


