import React, { useState } from 'react'
import { AlertTriangle, Shield, TrendingUp, TrendingDown } from 'lucide-react'

export default function RiesgosView() {
    const [riesgos] = useState([
        { id: 1, codigo: 'R-001', descripcion: 'Falla en sistema de respaldo', categoria: 'Tecnologia', probabilidad: 'Alta', impacto: 'Alto', nivel: 'Critico' },
        { id: 2, codigo: 'R-002', descripcion: 'Perdida de datos de clientes', categoria: 'Seguridad', probabilidad: 'Media', impacto: 'Alto', nivel: 'Alto' },
        { id: 3, codigo: 'R-003', descripcion: 'Retraso en entregas', categoria: 'Operacional', probabilidad: 'Media', impacto: 'Medio', nivel: 'Medio' },
        { id: 4, codigo: 'R-004', descripcion: 'Incumplimiento normativo', categoria: 'Legal', probabilidad: 'Baja', impacto: 'Alto', nivel: 'Medio' },
        { id: 5, codigo: 'R-005', descripcion: 'Falta de personal capacitado', categoria: 'Recursos Humanos', probabilidad: 'Alta', impacto: 'Medio', nivel: 'Alto' }
    ])

    const matrizData = {
        'Alto-Alto': ['R-001', 'R-002'],
        'Alto-Medio': ['R-005'],
        'Alto-Bajo': [],
        'Medio-Alto': ['R-004'],
        'Medio-Medio': ['R-003'],
        'Medio-Bajo': [],
        'Bajo-Alto': [],
        'Bajo-Medio': [],
        'Bajo-Bajo': []
    }

    const getCellColor = (prob, imp) => {
        const key = `${prob}-${imp}`
        if (['Alto-Alto', 'Alto-Medio', 'Medio-Alto'].includes(key)) return 'bg-red-100 border-red-300'
        if (['Medio-Medio', 'Alto-Bajo', 'Bajo-Alto'].includes(key)) return 'bg-yellow-100 border-yellow-300'
        return 'bg-green-100 border-green-300'
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gestion de Riesgos</h2>
                <p className="text-sm text-gray-500 mt-1">Matriz de probabilidad e impacto</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600 font-semibold">Criticos</p>
                            <p className="text-3xl font-bold text-red-700">2</p>
                        </div>
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>
                </div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-orange-600 font-semibold">Altos</p>
                            <p className="text-3xl font-bold text-orange-700">2</p>
                        </div>
                        <TrendingUp size={32} className="text-orange-500" />
                    </div>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600 font-semibold">Medios</p>
                            <p className="text-3xl font-bold text-yellow-700">1</p>
                        </div>
                        <TrendingDown size={32} className="text-yellow-500" />
                    </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600 font-semibold">Bajos</p>
                            <p className="text-3xl font-bold text-green-700">0</p>
                        </div>
                        <Shield size={32} className="text-green-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">Matriz de Riesgos</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Probabilidad / Impacto</th>
                                <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Bajo</th>
                                <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Medio</th>
                                <th className="border border-gray-300 p-2 bg-gray-100 text-sm font-semibold">Alto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {['Alto', 'Medio', 'Bajo'].map((prob) => (
                                <tr key={prob}>
                                    <td className="border border-gray-300 p-2 bg-gray-100 font-semibold text-sm">{prob}</td>
                                    {['Bajo', 'Medio', 'Alto'].map((imp) => {
                                        const key = `${prob}-${imp}`
                                        const items = matrizData[key] || []
                                        return (
                                            <td key={imp} className={`border border-gray-300 p-3 ${getCellColor(prob, imp)} h-24 align-top`}>
                                                <div className="flex flex-wrap gap-1">
                                                    {items.map(codigo => (
                                                        <span key={codigo} className="px-2 py-1 bg-white rounded text-xs font-semibold shadow-sm">
                                                            {codigo}
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
            </div>

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
                                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">{riesgo.codigo}</span>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded ${
                                            riesgo.nivel === 'Critico' ? 'bg-red-100 text-red-800' :
                                            riesgo.nivel === 'Alto' ? 'bg-orange-100 text-orange-800' :
                                            riesgo.nivel === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {riesgo.nivel}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-gray-800 mb-1">{riesgo.descripcion}</p>
                                    <p className="text-sm text-gray-600">Categoria: {riesgo.categoria}</p>
                                </div>
                                <div className="text-right text-sm">
                                    <p className="text-gray-600">Probabilidad: <span className="font-semibold">{riesgo.probabilidad}</span></p>
                                    <p className="text-gray-600">Impacto: <span className="font-semibold">{riesgo.impacto}</span></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
