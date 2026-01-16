import { Target, Box, Users, ShieldCheck, TrendingUp, Activity, Clock, ArrowRight } from 'lucide-react'
import Organizacion from '../pages/Organizacion'
import Seguridad from '../pages/Seguridad'
import Negocios from '../pages/Negocios'
import Productos from '../pages/Productos'

interface MainViewProps {
  activeSection: string
}

export default function MainView({ activeSection }: MainViewProps) {
  if (activeSection?.startsWith('negocios-')) {
    const subsection = activeSection.replace('negocios-', '')
    return (
      <div className="flex-1 overflow-auto bg-[#f8f7f4]">
        <Negocios subsection={subsection} />
      </div>
    )
  }

  if (activeSection?.startsWith('productos-')) {
    const subsection = activeSection.replace('productos-', '')
    return (
      <div className="flex-1 overflow-auto bg-[#f8f7f4]">
        <Productos subsection={subsection} />
      </div>
    )
  }

  if (activeSection?.startsWith('org-')) {
    const subsection = activeSection.replace('org-', '')
    return (
      <div className="flex-1 overflow-auto bg-[#f8f7f4]">
        <Organizacion subsection={subsection} />
      </div>
    )
  }

  if (activeSection?.startsWith('seguridad-')) {
    const subsection = activeSection.replace('seguridad-', '')
    return (
      <div className="flex-1 overflow-auto bg-[#f8f7f4]">
        <Seguridad subsection={subsection} />
      </div>
    )
  }

  // Dashboard / Vista por defecto
  return (
    <div className="flex-1 overflow-auto bg-[#f8f7f4]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-900">
            Buenos días 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Aquí tienes un resumen de tu actividad
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <QuickStat 
            label="Prospectos Activos" 
            value="24" 
            change="+12%" 
            positive 
            icon={<Target size={20} />}
            color="rose"
          />
          <QuickStat 
            label="Tareas Pendientes" 
            value="8" 
            change="-3" 
            positive 
            icon={<Clock size={20} />}
            color="amber"
          />
          <QuickStat 
            label="Incidentes Abiertos" 
            value="2" 
            change="+1" 
            positive={false}
            icon={<Activity size={20} />}
            color="red"
          />
          <QuickStat 
            label="Contratos este mes" 
            value="$45K" 
            change="+18%" 
            positive 
            icon={<TrendingUp size={20} />}
            color="emerald"
          />
        </div>

        {/* Module Cards */}
        <h2 className="text-lg font-semibold text-brand-900 mb-4">Módulos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ModuleCard
            title="Negocios"
            description="Gestiona prospectos, leads, clientes, propuestas y contratos comerciales."
            icon={<Target size={24} />}
            color="rose"
            stats={[
              { label: 'Prospectos', value: '24' },
              { label: 'Leads', value: '18' },
              { label: 'Clientes', value: '156' },
            ]}
          />
          <ModuleCard
            title="Productos"
            description="Administra el catálogo de productos, aplicaciones e infraestructura tecnológica."
            icon={<Box size={24} />}
            color="sky"
            stats={[
              { label: 'Productos', value: '12' },
              { label: 'Apps', value: '8' },
              { label: 'Recursos', value: '34' },
            ]}
          />
          <ModuleCard
            title="Organización"
            description="Gestiona personas, roles, procesos y procedimientos de la empresa."
            icon={<Users size={24} />}
            color="emerald"
            stats={[
              { label: 'Personas', value: '45' },
              { label: 'Roles', value: '12' },
              { label: 'Procesos', value: '28' },
            ]}
          />
          <ModuleCard
            title="Seguridad"
            description="Controla riesgos, identidad, vulnerabilidades e incidentes de seguridad."
            icon={<ShieldCheck size={24} />}
            color="amber"
            stats={[
              { label: 'Riesgos', value: '8' },
              { label: 'Usuarios', value: '45' },
              { label: 'Incidentes', value: '2' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function QuickStat({ label, value, change, positive, icon, color }: {
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
  color: 'rose' | 'amber' | 'emerald' | 'sky' | 'red'
}) {
  const colorClasses = {
    rose: 'bg-rose-500/10 text-rose-500',
    amber: 'bg-amber-500/10 text-amber-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    sky: 'bg-sky-500/10 text-sky-500',
    red: 'bg-red-500/10 text-red-500',
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          {icon}
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
        }`}>
          {change}
        </span>
      </div>
      <p className="text-2xl font-bold text-brand-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

function ModuleCard({ title, description, icon, color, stats }: {
  title: string
  description: string
  icon: React.ReactNode
  color: 'rose' | 'amber' | 'emerald' | 'sky'
  stats: { label: string; value: string }[]
}) {
  const colorClasses = {
    rose: 'from-rose-500 to-rose-600',
    amber: 'from-amber-500 to-amber-600',
    emerald: 'from-emerald-500 to-emerald-600',
    sky: 'from-sky-500 to-sky-600',
  }

  const bgClasses = {
    rose: 'bg-rose-50',
    amber: 'bg-amber-50',
    emerald: 'bg-emerald-50',
    sky: 'bg-sky-50',
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white shadow-lg`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-brand-900 text-lg">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
        </div>

        <div className={`rounded-xl ${bgClasses[color]} p-4`}>
          <div className="flex justify-between">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xl font-bold text-brand-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm text-gray-500">Ver módulo</span>
        <ArrowRight size={16} className="text-gray-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  )
}
