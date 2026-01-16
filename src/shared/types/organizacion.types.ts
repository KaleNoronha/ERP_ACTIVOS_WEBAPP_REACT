import { BaseEntity, EstadoGeneral, EstadoProceso } from './index'

// ============================================
// TIPOS MÓDULO ORGANIZACIÓN
// ============================================

// Departamento
export interface Departamento extends BaseEntity {
  codigo: string
  nombre: string
  descripcion?: string
  responsable: string
  responsableId: string | number
  ubicacion?: string
  presupuesto?: number
  estado: EstadoGeneral
}

// Persona
export interface Persona extends BaseEntity {
  codigo: string
  nombre: string
  apellido: string
  nombreCompleto: string
  dni: string
  email: string
  telefono: string
  celular?: string
  cargo: string
  departamento: string
  departamentoId: string | number
  fechaIngreso: string
  fechaSalida?: string
  tipoContrato: 'Indefinido' | 'Plazo Fijo' | 'Practicante' | 'Consultor'
  jefe?: string
  jefeId?: string | number
  estado: EstadoGeneral
  foto?: string
}

// Rol
export interface Rol extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  departamento: string
  departamentoId: string | number
  nivel: 'Estratégico' | 'Táctico' | 'Operativo'
  responsabilidades: string[]
  competencias: string[]
  personasAsignadas: number
  estado: EstadoGeneral
}

// Proceso
export interface Proceso extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  tipo: 'Estratégico' | 'Operativo' | 'Soporte'
  macroProceso: string
  macroProcesoId: string | number
  responsable: string
  responsableId: string | number
  objetivo: string
  alcance: string
  entradas: string[]
  salidas: string[]
  indicadores: Indicador[]
  estado: EstadoProceso
  version: string
  fechaAprobacion?: string
}

export interface Indicador {
  id: string | number
  nombre: string
  formula: string
  meta: number
  unidad: string
  frecuencia: 'Diario' | 'Semanal' | 'Mensual' | 'Trimestral' | 'Anual'
}

// Procedimiento
export interface Procedimiento extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  proceso: string
  procesoId: string | number
  objetivo: string
  alcance: string
  responsable: string
  version: string
  fechaElaboracion: string
  fechaAprobacion?: string
  fechaVigencia?: string
  estado: EstadoProceso
  pasos: PasoProcedimiento[]
  documentos: DocumentoAdjunto[]
}

export interface PasoProcedimiento {
  numero: number
  descripcion: string
  responsable: string
  tiempo?: string
  observaciones?: string
}

export interface DocumentoAdjunto {
  id: string | number
  nombre: string
  tipo: string
  url: string
  fechaCarga: string
}

// Actividad
export interface Actividad extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  procesoId: string | number
  proceso: string
  subprocesoId?: string | number
  subproceso?: string
  responsable: string
  accountable: string
  consultado: string[]
  informado: string[]
  entradas: string[]
  salidas: string[]
  criterioAceptacion: string
  duracionEstimada: number // en minutos
  clasificacion: 'SOP' | 'Guía Técnica' | 'Instructivo' | 'Formato'
  kpis: string[]
  riesgos: string[]
  estado: EstadoProceso
}
