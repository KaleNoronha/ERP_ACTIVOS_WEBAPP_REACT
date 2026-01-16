import { BaseEntity, EstadoGeneral, Prioridad, Severidad } from './index'

// ============================================
// TIPOS MÓDULO SEGURIDAD
// ============================================

// Estados específicos
export type EstadoRiesgo = 'Identificado' | 'En Análisis' | 'Mitigado' | 'Aceptado' | 'Cerrado'
export type EstadoVulnerabilidad = 'Abierta' | 'En Progreso' | 'Resuelta' | 'Cerrada' | 'Falso Positivo'
export type EstadoIncidente = 'Abierto' | 'En Investigación' | 'Contenido' | 'Resuelto' | 'Cerrado'
export type NivelRiesgo = 'Crítico' | 'Alto' | 'Medio' | 'Bajo'

// Riesgo
export interface Riesgo extends BaseEntity {
  codigo: string
  titulo: string
  descripcion: string
  categoria: 'Tecnología' | 'Seguridad' | 'Operacional' | 'Legal' | 'Financiero' | 'Reputacional'
  activo?: string
  activoId?: string | number
  probabilidad: 'Alta' | 'Media' | 'Baja'
  impacto: 'Alto' | 'Medio' | 'Bajo'
  nivelRiesgo: NivelRiesgo
  propietario: string
  propietarioId: string | number
  fechaIdentificacion: string
  fechaRevision?: string
  controles: ControlRiesgo[]
  planMitigacion?: string
  estado: EstadoRiesgo
}

export interface ControlRiesgo {
  id: string | number
  nombre: string
  tipo: 'Preventivo' | 'Detectivo' | 'Correctivo'
  descripcion: string
  efectividad: 'Alta' | 'Media' | 'Baja'
  responsable: string
}

// Usuario (Identidad)
export interface Usuario extends BaseEntity {
  username: string
  nombre: string
  apellido: string
  nombreCompleto: string
  email: string
  telefono?: string
  departamento: string
  departamentoId: string | number
  rol: string
  rolId: string | number
  permisos: Permiso[]
  grupos: string[]
  ultimoAcceso?: string
  intentosFallidos: number
  bloqueado: boolean
  mfaHabilitado: boolean
  fechaCreacion: string
  fechaExpiracion?: string
  estado: EstadoGeneral
}

export interface Permiso {
  id: string | number
  modulo: string
  accion: 'Leer' | 'Crear' | 'Editar' | 'Eliminar' | 'Administrar'
  recurso: string
}

export interface GrupoUsuarios extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  permisos: Permiso[]
  usuarios: number
  estado: EstadoGeneral
}

// Vulnerabilidad
export interface Vulnerabilidad extends BaseEntity {
  codigo: string
  cveId?: string
  titulo: string
  descripcion: string
  aplicacion: string
  aplicacionId: string | number
  componente?: string
  severidad: Severidad
  cvssScore: number
  vector?: string
  tipoVulnerabilidad: string
  fechaDeteccion: string
  fechaReporte?: string
  fechaResolucion?: string
  responsable: string
  responsableId: string | number
  solucionPropuesta?: string
  estado: EstadoVulnerabilidad
  evidencias: Evidencia[]
}

export interface Evidencia {
  id: string | number
  tipo: 'Screenshot' | 'Log' | 'Documento' | 'Video'
  descripcion: string
  url: string
  fechaCarga: string
}

// Incidente de Seguridad
export interface Incidente extends BaseEntity {
  numero: string
  titulo: string
  descripcion: string
  tipo: 'Disponibilidad' | 'Seguridad' | 'Performance' | 'Funcional' | 'Datos'
  categoria: string
  prioridad: Prioridad
  impacto: 'Crítico' | 'Mayor' | 'Menor' | 'Mínimo'
  urgencia: 'Inmediata' | 'Alta' | 'Media' | 'Baja'
  servicioAfectado: string
  servicioAfectadoId?: string | number
  usuariosAfectados?: number
  fechaReporte: string
  fechaDeteccion: string
  fechaResolucion?: string
  tiempoResolucion?: string
  reportadoPor: string
  asignadoA: string
  asignadoAId: string | number
  equipo?: string
  causaRaiz?: string
  solucion?: string
  accionesPreventivas?: string
  estado: EstadoIncidente
  timeline: TimelineEntry[]
}

export interface TimelineEntry {
  id: string | number
  fecha: string
  accion: string
  usuario: string
  detalle?: string
}

// Auditoría
export interface RegistroAuditoria extends BaseEntity {
  fecha: string
  usuario: string
  usuarioId: string | number
  accion: 'Login' | 'Logout' | 'Crear' | 'Editar' | 'Eliminar' | 'Ver' | 'Exportar' | 'Importar'
  modulo: string
  recurso: string
  recursoId?: string | number
  ip: string
  userAgent?: string
  detalles?: Record<string, unknown>
  resultado: 'Éxito' | 'Fallo' | 'Denegado'
}
