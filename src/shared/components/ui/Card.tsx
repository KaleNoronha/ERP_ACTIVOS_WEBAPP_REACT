import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ children, className = '', hover = false, padding = 'none' }: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
  }

  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden
        ${hover ? 'hover:shadow-md hover:border-gray-200 transition-all cursor-pointer' : ''}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '', action }: {
  children: ReactNode
  className?: string
  action?: ReactNode
}) {
  return (
    <div className={`p-5 pb-0 flex items-start justify-between ${className}`}>
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  )
}

export function CardContent({ children, className = '' }: {
  children: ReactNode
  className?: string
}) {
  return <div className={`p-5 ${className}`}>{children}</div>
}

export function CardFooter({ children, className = '', border = true }: {
  children: ReactNode
  className?: string
  border?: boolean
}) {
  return (
    <div className={`px-5 py-3 ${border ? 'border-t border-gray-100 bg-gray-50/50' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Stat Card mejorado
interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'brand' | 'orange'
  className?: string
}

const colorConfig = {
  default: {
    bg: 'bg-gray-50',
    icon: 'bg-gray-100 text-gray-600',
    text: 'text-gray-600',
    accent: 'bg-gray-500',
  },
  success: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-100 text-emerald-600',
    text: 'text-emerald-600',
    accent: 'bg-emerald-500',
  },
  warning: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-100 text-amber-600',
    text: 'text-amber-600',
    accent: 'bg-amber-500',
  },
  danger: {
    bg: 'bg-red-50',
    icon: 'bg-red-100 text-red-600',
    text: 'text-red-600',
    accent: 'bg-red-500',
  },
  info: {
    bg: 'bg-sky-50',
    icon: 'bg-sky-100 text-sky-600',
    text: 'text-sky-600',
    accent: 'bg-sky-500',
  },
  purple: {
    bg: 'bg-violet-50',
    icon: 'bg-violet-100 text-violet-600',
    text: 'text-violet-600',
    accent: 'bg-violet-500',
  },
  brand: {
    bg: 'bg-brand-50',
    icon: 'bg-brand-100 text-brand-500',
    text: 'text-brand-500',
    accent: 'bg-brand-500',
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'bg-orange-100 text-orange-600',
    text: 'text-orange-600',
    accent: 'bg-orange-500',
  },
}

export function StatCard({ title, value, icon, trend, color = 'default', className = '' }: StatCardProps) {
  const config = colorConfig[color]

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 relative overflow-hidden ${className}`}>
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${config.accent}`} />
      
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-brand-900">{value}</p>
          {trend && (
            <p className={`text-xs mt-2 font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% vs mes anterior
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.icon}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
