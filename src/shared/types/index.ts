// ============================================
// TIPOS BASE DEL SISTEMA
// ============================================

// Estados comunes
export type EstadoGeneral = 'Activo' | 'Inactivo' | 'Pendiente' | 'Archivado'
export type EstadoProceso = 'Activo' | 'En Revisión' | 'Obsoleto' | 'Borrador'
export type Prioridad = 'Crítica' | 'Alta' | 'Media' | 'Baja'
export type Severidad = 'Crítica' | 'Alta' | 'Media' | 'Baja'

// Entidad base
export interface BaseEntity {
  id: string | number
  createdAt?: string
  updatedAt?: string
}

// Columna para tablas
export interface TableColumn<T = unknown> {
  key: keyof T | string
  label: string
  render?: (value: unknown, item: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

// Paginación
export interface PaginationParams {
  page: number
  limit: number
  total?: number
}

// Respuesta API
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  pagination?: PaginationParams
}

// Filtros genéricos
export interface FilterParams {
  search?: string
  estado?: string
  fechaDesde?: string
  fechaHasta?: string
  [key: string]: unknown
}
