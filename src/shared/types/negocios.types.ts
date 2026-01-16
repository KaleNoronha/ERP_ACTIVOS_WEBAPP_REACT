import { BaseEntity, EstadoGeneral } from './index'

// ============================================
// TIPOS MÓDULO NEGOCIOS
// ============================================

// Estados específicos
export type EstadoProspecto = 'Nuevo' | 'Contactado' | 'Calificado' | 'Descartado'
export type EstadoLead = 'Nuevo' | 'En Proceso' | 'Calificado' | 'Convertido' | 'Perdido'
export type EstadoPropuesta = 'Borrador' | 'Enviada' | 'En Negociación' | 'Aprobada' | 'Rechazada'
export type EstadoContrato = 'Borrador' | 'Vigente' | 'Por Vencer' | 'Vencido' | 'Cancelado'

// Prospecto
export interface Prospecto extends BaseEntity {
  nombre: string
  empresa: string
  cargo?: string
  email: string
  telefono: string
  origen: string
  valor: number
  probabilidad: number
  estado: EstadoProspecto
  fechaContacto: string
  notas?: string
}

// Lead
export interface Lead extends BaseEntity {
  codigo: string
  prospecto: string
  empresa: string
  producto: string
  valor: number
  probabilidad: number
  estado: EstadoLead
  etapa: string
  fechaCreacion: string
  fechaCierre?: string
  responsable: string
}

// Cliente
export interface Cliente extends BaseEntity {
  codigo: string
  razonSocial: string
  ruc: string
  direccion: string
  sector: string
  tipoCliente: 'Corporativo' | 'PYME' | 'Startup' | 'Gobierno'
  contactoPrincipal: string
  email: string
  telefono: string
  estado: EstadoGeneral
  fechaRegistro: string
  creditoAprobado?: number
}

// Contacto
export interface Contacto extends BaseEntity {
  nombre: string
  apellido: string
  cargo: string
  empresa: string
  clienteId?: string | number
  email: string
  telefono: string
  celular?: string
  linkedin?: string
  esDecisionMaker: boolean
  estado: EstadoGeneral
}

// Propuesta
export interface Propuesta extends BaseEntity {
  codigo: string
  titulo: string
  cliente: string
  clienteId: string | number
  descripcion: string
  monto: number
  moneda: 'USD' | 'PEN' | 'EUR'
  descuento?: number
  estado: EstadoPropuesta
  fechaEmision: string
  fechaVencimiento: string
  responsable: string
  items: PropuestaItem[]
}

export interface PropuestaItem {
  id: string | number
  descripcion: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

// Lista de Precios
export interface ListaPrecios extends BaseEntity {
  codigo: string
  nombre: string
  descripcion?: string
  moneda: 'USD' | 'PEN' | 'EUR'
  vigenciaDesde: string
  vigenciaHasta: string
  activo: boolean
  items: PrecioItem[]
}

export interface PrecioItem {
  id: string | number
  productoId: string | number
  producto: string
  precioBase: number
  precioVenta: number
  descuentoMaximo: number
}

// Contrato
export interface Contrato extends BaseEntity {
  numero: string
  titulo: string
  cliente: string
  clienteId: string | number
  tipo: 'Servicio' | 'Producto' | 'Mantenimiento' | 'Consultoría' | 'Licencia'
  monto: number
  moneda: 'USD' | 'PEN' | 'EUR'
  fechaInicio: string
  fechaFin: string
  renovacionAutomatica: boolean
  estado: EstadoContrato
  responsable: string
  documentoUrl?: string
}
