import { ReactNode } from 'react'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'brand' | 'orange'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
  success: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  danger: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  info: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
  purple: { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500' },
  brand: { bg: 'bg-brand-50', text: 'text-brand-700', dot: 'bg-brand-500' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
}

export function Badge({ children, variant = 'default', size = 'sm', dot = false, className = '' }: BadgeProps) {
  const styles = variantStyles[variant]
  const sizeStyles = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  
  return (
    <span className={`
      inline-flex items-center gap-1.5 font-medium rounded-full
      ${styles.bg} ${styles.text} ${sizeStyles} ${className}
    `}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
      {children}
    </span>
  )
}

// Helper para mapear estados a variantes
export function getStatusVariant(status: string): BadgeVariant {
  const statusMap: Record<string, BadgeVariant> = {
    // Estados generales
    'Activo': 'success',
    'Inactivo': 'default',
    'Pendiente': 'warning',
    'Archivado': 'default',
    
    // Estados de proceso
    'En Revisión': 'warning',
    'Borrador': 'default',
    'Vigente': 'success',
    'Obsoleto': 'default',
    
    // Estados de negocio
    'Nuevo': 'info',
    'Contactado': 'warning',
    'Calificado': 'success',
    'Convertido': 'success',
    'Perdido': 'danger',
    'Descartado': 'default',
    
    // Estados de propuesta/contrato
    'Enviada': 'info',
    'En Negociación': 'warning',
    'Aprobada': 'success',
    'Rechazada': 'danger',
    'Por Vencer': 'warning',
    'Vencido': 'danger',
    'Cancelado': 'danger',
    
    // Estados de aplicación
    'Producción': 'success',
    'Desarrollo': 'info',
    'Testing': 'warning',
    'Mantenimiento': 'brand',
    'Deprecado': 'default',
    
    // Estados de infraestructura
    'Running': 'success',
    'Stopped': 'default',
    'Error': 'danger',
    
    // Estados de seguridad
    'Abierto': 'danger',
    'Abierta': 'danger',
    'En Investigación': 'warning',
    'En Progreso': 'warning',
    'Resuelto': 'success',
    'Resuelta': 'success',
    'Cerrado': 'default',
    'Cerrada': 'default',
    'Mitigado': 'success',
    'Aceptado': 'info',
    
    // Prioridades/Severidades
    'Crítica': 'danger',
    'Crítico': 'danger',
    'Alta': 'brand',
    'Alto': 'brand',
    'Media': 'warning',
    'Medio': 'warning',
    'Baja': 'info',
    'Bajo': 'info',
  }
  
  return statusMap[status] || 'default'
}
