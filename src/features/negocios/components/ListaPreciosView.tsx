import { useState } from 'react'
import { Plus, Filter, Tag, DollarSign, Calendar, Percent, Package } from 'lucide-react'
import { Button, SearchInput, Badge, StatCard } from '@/shared/components/ui'
import { listasPrecios } from '../data/mockData'
import type { ListaPrecios } from '@/shared/types/negocios.types'

export function ListaPreciosView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLista, setSelectedLista] = useState<ListaPrecios | null>(null)

  const listasFiltradas = listasPrecios.filter(l => 
    l.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.codigo.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: listasPrecios.length,
    activas: listasPrecios.filter(l => l.activo).length,
    productos: listasPrecios.reduce((acc, l) => acc + l.items.length, 0),
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Listas de Precios</h2>
          <p className="text-sm text-gray-500 mt-1">Gestión de tarifarios y precios</p>
        </div>
        <Button icon={Plus}>Nueva Lista</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Listas" value={stats.total} icon={<Tag size={32} />} color="info" />
        <StatCard title="Activas" value={stats.activas} icon={<Tag size={32} />} color="success" />
        <StatCard title="Productos" value={stats.productos} icon={<Package size={32} />} color="purple" />
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        <SearchInput
          placeholder="Buscar listas de precios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClear={() => setSearchTerm('')}
        />
        <Button variant="outline" icon={Filter}>Filtros</Button>
      </div>

      {/* Layout de dos columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Listas de Precios */}
        <div className="lg:col-span-1 space-y-4">
          {listasFiltradas.map((lista) => (
            <div 
              key={lista.id}
              onClick={() => setSelectedLista(lista)}
              className={`bg-white rounded-xl shadow-md border-2 p-4 cursor-pointer transition-all ${
                selectedLista?.id === lista.id 
                  ? 'border-indigo-600 shadow-lg' 
                  : 'border-gray-200 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xs font-mono text-gray-500">{lista.codigo}</span>
                  <h3 className="font-bold text-gray-800">{lista.nombre}</h3>
                </div>
                <Badge variant={lista.activo ? 'success' : 'default'}>
                  {lista.activo ? 'Activa' : 'Inactiva'}
                </Badge>
              </div>
              
              {lista.descripcion && (
                <p className="text-sm text-gray-600 mb-3">{lista.descripcion}</p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {lista.vigenciaDesde}
                </span>
                <span className="flex items-center gap-1">
                  <Package size={14} />
                  {lista.items.length} productos
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detalle de Lista Seleccionada */}
        <div className="lg:col-span-2">
          {selectedLista ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-gray-500">{selectedLista.codigo}</span>
                    <h3 className="text-xl font-bold text-gray-800">{selectedLista.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedLista.descripcion}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={selectedLista.activo ? 'success' : 'default'} size="md">
                      {selectedLista.activo ? 'Activa' : 'Inactiva'}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-2">Moneda: {selectedLista.moneda}</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>Vigencia: {selectedLista.vigenciaDesde} - {selectedLista.vigenciaHasta}</span>
                  </div>
                </div>
              </div>

              {/* Tabla de Productos */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio Base</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio Venta</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Desc. Máx.</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Precio Mín.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedLista.items.map((item) => {
                      const precioMinimo = item.precioVenta * (1 - item.descuentoMaximo / 100)
                      return (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                                <Package size={20} className="text-white" />
                              </div>
                              <span className="font-medium text-gray-800">{item.producto}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-500">
                            ${item.precioBase.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right font-bold text-green-600">
                            ${item.precioVenta.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="flex items-center justify-end gap-1 text-indigo-700">
                              <Percent size={14} />
                              {item.descuentoMaximo}%
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right text-gray-600">
                            ${precioMinimo.toLocaleString()}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <Button variant="outline" size="sm">Exportar</Button>
                <Button variant="outline" size="sm">Editar</Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
              <Tag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Selecciona una lista de precios para ver el detalle</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ListaPreciosView


