import { BaseEntity, EstadoGeneral } from './index'

// ============================================
// TIPOS MÓDULO PRODUCTOS
// ============================================

// Estados específicos
export type EstadoProducto = 'Activo' | 'Desarrollo' | 'Descontinuado' | 'Beta'
export type EstadoAplicacion = 'Producción' | 'Desarrollo' | 'Testing' | 'Mantenimiento' | 'Deprecado'
export type EstadoRecurso = 'Running' | 'Stopped' | 'Pending' | 'Error' | 'Terminated'

// Producto
export interface Producto extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  categoria: 'Software' | 'SaaS' | 'Web App' | 'Mobile' | 'API' | 'Infraestructura'
  version: string
  fechaLanzamiento: string
  responsable: string
  equipo: string[]
  tecnologias: string[]
  repositorio?: string
  documentacion?: string
  estado: EstadoProducto
}

// Aplicación
export interface Aplicacion extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  tipo: 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'Desktop' | 'Microservicio'
  tecnologia: string
  framework?: string
  version: string
  repositorio: string
  urlProduccion?: string
  urlStaging?: string
  responsable: string
  equipo: string[]
  baseDatos?: string
  dependencias: string[]
  estado: EstadoAplicacion
}

// Componente
export interface Componente extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  tipo: 'Módulo' | 'Servicio' | 'Librería' | 'Utilidad' | 'Widget' | 'API'
  aplicacion: string
  aplicacionId: string | number
  version: string
  repositorio: string
  lenguaje: string
  dependencias: string[]
  documentacion?: string
  estado: EstadoGeneral
}

// Modelo de Datos
export interface ModeloDatos extends BaseEntity {
  codigo: string
  nombre: string
  descripcion: string
  tipo: 'Tabla' | 'Vista' | 'Colección' | 'Cache' | 'Índice'
  baseDatos: string
  esquema: string
  campos: CampoDatos[]
  relaciones: RelacionDatos[]
  indices: string[]
  estado: EstadoGeneral
}

export interface CampoDatos {
  nombre: string
  tipo: string
  nullable: boolean
  primaryKey: boolean
  foreignKey?: string
  defaultValue?: string
  descripcion?: string
}

export interface RelacionDatos {
  tabla: string
  tipo: 'OneToOne' | 'OneToMany' | 'ManyToMany'
  campo: string
  campoReferencia: string
}

// Diagrama
export interface Diagrama extends BaseEntity {
  codigo: string
  nombre: string
  descripcion?: string
  tipo: 'Arquitectura' | 'Secuencia' | 'ER' | 'Flujo' | 'Infraestructura' | 'BPMN' | 'Clases'
  aplicacion?: string
  aplicacionId?: string | number
  version: string
  autor: string
  fechaCreacion: string
  ultimaActualizacion: string
  herramienta: string
  archivoUrl?: string
  imagenUrl?: string
}

// Recurso de Infraestructura
export interface RecursoInfraestructura extends BaseEntity {
  codigo: string
  nombre: string
  descripcion?: string
  tipo: 'EC2' | 'RDS' | 'S3' | 'Lambda' | 'ECS' | 'EKS' | 'ElastiCache' | 'ALB' | 'CloudFront' | 'Route53'
  proveedor: 'AWS' | 'Azure' | 'GCP' | 'On-Premise'
  region: string
  ambiente: 'Producción' | 'Staging' | 'Desarrollo' | 'QA'
  especificaciones: Record<string, string>
  costoMensual?: number
  estado: EstadoRecurso
  metricas?: MetricasRecurso
}

export interface MetricasRecurso {
  cpu: number
  memoria: number
  disco?: number
  red?: number
}

// Stack Tecnológico
export interface Tecnologia extends BaseEntity {
  nombre: string
  categoria: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Security' | 'Testing' | 'Cloud'
  version: string
  licencia: string
  descripcion?: string
  documentacionUrl?: string
  aplicaciones: number
  estado: EstadoGeneral
}
