import React, { useState } from 'react'
import { AlertTriangle, Shield, TrendingUp, Clock } from 'lucide-react'

export default function VulnerabilidadesView() {
    const [vulnerabilidades] = useState([
        { id: 1, codigo: 'CVE-2024-001', titulo: 'SQL Injection en API Login', aplicacion: 'Portal Web', severidad: 'Critica', estado: 'Abierta', fechaDeteccion: '2024-01-15', cvss: 9.8 },
        { id: 2, codigo: 'CVE-2024-002', titulo: 'XSS en formulario de contacto', aplicacion: 'Portal Web', severidad: 'Alta', estado: 'En Progreso', fechaDeteccion: '2024-01-10', cvss: 7.5 },
        { id: 3, codigo: 'CVE-2024-003', titulo: 'Dependencia desactualizada', aplicacion: 'API Gateway', severidad: 'Media', estado: 'Abierta', fechaDeteccion: '2024-01-08', cvss: 5.3 },
        { id: 4, codigo: 'CVE-2024-004', titulo: 'Configuracion insegura CORS', aplicacion: 'API Pagos', severidad: 'Alta', estado: 'Abierta', fechaDeteccion: '2024-01-05', cvss: 8.1 },
        { id: 5, codigo: 'CVE-2024-005', titulo: 'Falta de rate limiting', aplicacion: 'API Gateway', severidad: 'Baja', estado: 'Cerrada', fechaDeteccion: '2024-01-01', cvss: 3.7 }
    ])

    const severidadColors = {
        'Critica': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', badge: 'bg-red-500' },
        'Alta': { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', badge: 'bg-orange-500' },
        'Media': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', badge: 'bg-yellow-500' },
        'Baja': { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', badge: 'bg-blue-500' }
    }

    const estadoColors = {
        'Abierta': 'bg-red-100 text-red-800',
        'En Progreso': 'bg-yellow-100 text-yellow-800',
        'Cerrada': 'bg-green-100 text-green-800'
    }

    const stats = {
        criticas: vulnerabilidades.filter(v => v.severidad === 'Critica' && v.estado !== 'Cerrada').length,
        altas: vulnerabilidades.filter(v => v.severidad === 'Alta' && v.estado !== 'Cerrada').length,
        medias: vulnerabilidades.filter(v => v.severidad === 'Media' && v.estado !== 'Cerrada').length,
        bajas: vulnerabilidades.filter(v => v.severidad === 'Baja' && v.estado !== 'Cerrada').length
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Vulnerabilidades</h2>
                <p className="text-sm text-gray-500 mt-1">Gestion de seguridad de aplicaciones</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <AlertTriangle size={32} />
                        <span className="text-4xl font-bold">{stats.criticas}</span>
                    </div>
                    <p className="text-sm font-semibold opacity-90">Criticas</p>
                    <p className="text-xs opacity-75 mt-1">Requieren atencion inmediata</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <TrendingUp size={32} />
                        <span className="text-4xl font-bold">{stats.altas}</span>
                    </div>
                    <p className="text-sm font-semibold opacity-90">Altas</p>
                    <p className="text-xs opacity-75 mt-1">Prioridad alta</p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Clock size={32} />
                        <span className="text-4xl font-bold">{stats.medias}</span>
                    </div>
                    <p className="text-sm font-semibold opacity-90">Medias</p>
                    <p className="text-xs opacity-75 mt-1">Planificar correccion</p>
                </div>

                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                        <Shield size={32} />
                        <span className="text-4xl font-bold">{stats.bajas}</span>
                    </div>
                    <p className="text-sm font-semibold opacity-90">Bajas</p>
                    <p className="text-xs opacity-75 mt-1">Bajo riesgo</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="font-bold text-lg">Lista de Vulnerabilidades</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {vulnerabilidades.map((vuln) => {
                        const colors = severidadColors[vuln.severidad]
                        return (
                            <div key={vuln.id} className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${colors.border}`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-mono">
                                                {vuln.codigo}
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${colors.bg} ${colors.text}`}>
                                                {vuln.severidad}
                                            </span>
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${estadoColors[vuln.estado]}`}>
                                                {vuln.estado}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-gray-800 mb-2">{vuln.titulo}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>App: <span className="font-semibold">{vuln.aplicacion}</span></span>
                                            <span>Detectado: {vuln.fechaDeteccion}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="mb-2">
                                            <span className="text-xs text-gray-500">CVSS Score</span>
                                            <div className={`text-2xl font-bold ${colors.text}`}>{vuln.cvss}</div>
                                        </div>
                                        <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                                            Ver detalles →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
