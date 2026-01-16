import { useState } from 'react'
import { Plus, Filter, User, Shield, Key, Mail, Lock, Unlock, ShieldCheck, ShieldAlert } from 'lucide-react'
import { Button, SearchInput, Badge, getStatusVariant, StatCard, DataTable, Column } from '@/shared/components/ui'
import { usuarios } from '../data/mockData'
import type { Usuario } from '@/shared/types/seguridad.types'

export function IdentidadView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.estado === 'Activo').length,
    bloqueados: usuarios.filter(u => u.bloqueado).length,
    mfaHabilitado: usuarios.filter(u => u.mfaHabilitado).length,
  }

  const columns: Column<Usuario>[] = [
    {
      key: 'nombreCompleto',
      label: 'Usuario',
      render: (_, item) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {item.nombre.charAt(0)}{item.apellido.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{item.nombreCompleto}</p>
            <p className="text-xs text-gray-500 font-mono">@{item.username}</p>
          </div>
        </div>
      )
    },
    { key: 'email', label: 'Email' },
    { key: 'departamento', label: 'Departamento' },
    { key: 'rol', label: 'Rol', render: (value) => <Badge variant="info">{String(value)}</Badge> },
    {
      key: 'mfaHabilitado',
      label: 'MFA',
      render: (value) => value ? (
        <span className="flex items-center gap-1 text-green-600"><ShieldCheck size={16} /> Sí</span>
      ) : (
        <span className="flex items-center gap-1 text-gray-400"><ShieldAlert size={16} /> No</span>
      )
    },
    {
      key: 'bloqueado',
      label: 'Estado',
      render: (value, item) => (
        <div className="flex items-center gap-2">
          {value ? (
            <Badge variant="danger" dot>Bloqueado</Badge>
          ) : (
            <Badge variant={getStatusVariant(item.estado)} dot>{item.estado}</Badge>
          )}
        </div>
      )
    },
  ]

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Identidad y Acceso</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de usuarios y permisos</p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setVista('cards')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'cards' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setVista('tabla')}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                vista === 'tabla' ? 'bg-white shadow text-gray-800' : 'text-gray-600'
              }`}
            >
              Tabla
            </button>
          </div>
          <Button icon={Plus}>Nuevo Usuario</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Usuarios" value={stats.total} icon={<User size={32} />} color="info" />
        <StatCard title="Activos" value={stats.activos} icon={<User size={32} />} color="success" />
        <StatCard title="Bloqueados" value={stats.bloqueados} icon={<Lock size={32} />} color="danger" />
        <StatCard title="MFA Habilitado" value={stats.mfaHabilitado} icon={<Shield size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <Button variant="outline" icon={Filter}>Filtros</Button>
      </div>

      {/* Vista */}
      {vista === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usuariosFiltrados.map((usuario) => (
            <UsuarioCard key={usuario.id} usuario={usuario} />
          ))}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={usuariosFiltrados}
          keyExtractor={(item) => item.id}
          actions={(item) => (
            <>
              <button className="text-indigo-700 hover:text-indigo-800 mr-3">Editar</button>
              <button className="text-blue-600 hover:text-blue-800 mr-3">Permisos</button>
              {item.bloqueado ? (
                <button className="text-green-600 hover:text-green-800">Desbloquear</button>
              ) : (
                <button className="text-red-600 hover:text-red-800">Bloquear</button>
              )}
            </>
          )}
        />
      )}
    </div>
  )
}

function UsuarioCard({ usuario }: { usuario: Usuario }) {
  return (
    <div className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border-2 overflow-hidden ${
      usuario.bloqueado ? 'border-red-200' : 'border-gray-200'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${
              usuario.bloqueado 
                ? 'bg-gradient-to-br from-red-400 to-red-600' 
                : 'bg-gradient-to-br from-purple-400 to-purple-600'
            }`}>
              {usuario.nombre.charAt(0)}{usuario.apellido.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{usuario.nombreCompleto}</h3>
              <p className="text-xs text-gray-500 font-mono">@{usuario.username}</p>
            </div>
          </div>
          {usuario.bloqueado ? (
            <Lock size={20} className="text-red-500" />
          ) : usuario.mfaHabilitado ? (
            <ShieldCheck size={20} className="text-green-500" />
          ) : (
            <ShieldAlert size={20} className="text-yellow-500" />
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={14} />
            <span className="truncate">{usuario.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <User size={14} />
            <span>{usuario.departamento}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Key size={14} />
            <Badge variant="info">{usuario.rol}</Badge>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Grupos: {usuario.grupos.length}</span>
            <span>Permisos: {usuario.permisos.length}</span>
          </div>
          {usuario.ultimoAcceso && (
            <p className="text-xs text-gray-400 mt-2">
              Último acceso: {usuario.ultimoAcceso}
            </p>
          )}
          {usuario.intentosFallidos > 0 && (
            <p className="text-xs text-indigo-700 mt-1">
              ⚠️ {usuario.intentosFallidos} intentos fallidos
            </p>
          )}
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <Badge variant={usuario.bloqueado ? 'danger' : getStatusVariant(usuario.estado)} dot>
          {usuario.bloqueado ? 'Bloqueado' : usuario.estado}
        </Badge>
        <div className="flex gap-2">
          <button className="text-sm text-indigo-700 hover:text-indigo-800 font-semibold">
            Editar
          </button>
          {usuario.bloqueado ? (
            <button className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1">
              <Unlock size={14} /> Desbloquear
            </button>
          ) : (
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              Permisos
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default IdentidadView


