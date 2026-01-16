import React, { useState } from 'react'
import { Search, Plus, Code2, Database, Cloud, Shield, Layers } from 'lucide-react'

export default function StackView() {
    const [stack] = useState([
        { id: 1, nombre: 'React', categoria: 'Frontend', version: '18.2.0', licencia: 'MIT', aplicaciones: 5, icon: Code2, color: 'blue' },
        { id: 2, nombre: 'Node.js', categoria: 'Backend', version: '20.0.0', licencia: 'MIT', aplicaciones: 8, icon: Layers, color: 'green' },
        { id: 3, nombre: 'PostgreSQL', categoria: 'Database', version: '15.2', licencia: 'PostgreSQL', aplicaciones: 12, icon: Database, color: 'indigo' },
        { id: 4, nombre: 'Docker', categoria: 'DevOps', version: '24.0', licencia: 'Apache 2.0', aplicaciones: 15, icon: Cloud, color: 'cyan' },
        { id: 5, nombre: 'JWT', categoria: 'Security', version: '9.0.0', licencia: 'MIT', aplicaciones: 10, icon: Shield, color: 'red' },
        { id: 6, nombre: 'TypeScript', categoria: 'Frontend', version: '5.0.0', licencia: 'Apache 2.0', aplicaciones: 6, icon: Code2, color: 'blue' },
        { id: 7, nombre: 'Redis', categoria: 'Database', version: '7.0', licencia: 'BSD', aplicaciones: 4, icon: Database, color: 'red' },
        { id: 8, nombre: 'Kubernetes', categoria: 'DevOps', version: '1.28', licencia: 'Apache 2.0', aplicaciones: 8, icon: Cloud, color: 'blue' }
    ])

    const categorias = ['Frontend', 'Backend', 'Database', 'DevOps', 'Security']
    const [categoriaActiva, setCategoriaActiva] = useState('Todos')

    const colorSchemes = {
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
        green: 'bg-green-50 border-green-200 text-green-700',
        indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
        cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
        red: 'bg-red-50 border-red-200 text-red-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700'
    }

    const stackFiltrado = categoriaActiva === 'Todos' 
        ? stack 
        : stack.filter(item => item.categoria === categoriaActiva)

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Stack Tecnologico</h2>
                    <p className="text-sm text-gray-500 mt-1">{stack.length} tecnologias en uso</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 shadow-md">
                    <Plus size={20} />
                    Agregar Tecnologia
                </button>
            </div>

            <div className="mb-6">
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar tecnologias..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>

                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={() => setCategoriaActiva('Todos')}
                        className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            categoriaActiva === 'Todos' 
                                ? 'bg-orange-500 text-white' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Todos ({stack.length})
                    </button>
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategoriaActiva(cat)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                                categoriaActiva === cat 
                                    ? 'bg-orange-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {cat} ({stack.filter(s => s.categoria === cat).length})
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stackFiltrado.map((tech) => {
                    const Icon = tech.icon
                    return (
                        <div key={tech.id} className={`border-2 rounded-xl p-4 ${colorSchemes[tech.color]} hover:shadow-lg transition-all`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <Icon size={24} className={`text-${tech.color}-600`} />
                                </div>
                                <span className="px-2 py-1 bg-white rounded text-xs font-mono shadow-sm">
                                    v{tech.version}
                                </span>
                            </div>

                            <h3 className="font-bold text-lg mb-1">{tech.nombre}</h3>
                            <p className="text-xs font-semibold mb-3">{tech.categoria}</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Licencia:</span>
                                    <span className="font-semibold">{tech.licencia}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Apps:</span>
                                    <span className="font-bold">{tech.aplicaciones}</span>
                                </div>
                            </div>

                            <button className="w-full mt-3 py-2 bg-white rounded-lg text-sm font-semibold hover:shadow-md transition-shadow">
                                Ver detalles
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
