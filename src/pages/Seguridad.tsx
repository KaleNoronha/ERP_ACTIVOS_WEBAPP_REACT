import { useState } from 'react'
import { ShieldCheck, KeyRound, Zap, AlertTriangle } from 'lucide-react'
import { 
  RiesgosView, 
  IdentidadView, 
  VulnerabilidadesView, 
  IncidentesView 
} from '@/features/seguridad'
import { Tabs } from '@/shared/components/ui'


interface SubsectionConfig {
  tabs: Array<{ id: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }>
  content: Record<string, React.ComponentType>
}

const SUBSECTION_CONFIG: Record<string, SubsectionConfig> = {
  riesgos: {
    tabs: [
      { id: 'matriz', label: 'Matriz de Riesgos', icon: ShieldCheck },
      { id: 'lista', label: 'Lista', icon: AlertTriangle }
    ],
    content: {
      'matriz': RiesgosView,
      'lista': RiesgosView
    }
  },
  identidad: {
    tabs: [
      { id: 'usuarios', label: 'Usuarios', icon: KeyRound },
      { id: 'permisos', label: 'Permisos', icon: ShieldCheck }
    ],
    content: {
      'usuarios': IdentidadView,
      'permisos': () => <div className="p-6"><h2 className="text-xl font-bold">Gestión de Permisos - Próximamente</h2></div>
    }
  },
  vulnerabilidades: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: AlertTriangle },
      { id: 'dashboard', label: 'Dashboard', icon: ShieldCheck }
    ],
    content: {
      'lista': VulnerabilidadesView,
      'dashboard': () => <div className="p-6"><h2 className="text-xl font-bold">Dashboard Vulnerabilidades - Próximamente</h2></div>
    }
  },
  incidentes: {
    tabs: [
      { id: 'activos', label: 'Activos', icon: Zap },
      { id: 'historico', label: 'Histórico', icon: Zap }
    ],
    content: {
      'activos': IncidentesView,
      'historico': IncidentesView
    }
  }
}

interface SeguridadProps {
  subsection?: string
}

export default function Seguridad({ subsection = 'riesgos' }: SeguridadProps) {
  const config = SUBSECTION_CONFIG[subsection]
  const [activeTab, setActiveTab] = useState(config?.tabs[0]?.id || '')

  if (!config) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">Subsección no encontrada</h2>
      </div>
    )
  }

  const ContentComponent = config.content[activeTab]

  return (
    <div className="h-full flex flex-col">
      <Tabs
        tabs={config.tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 overflow-auto">
        {ContentComponent && <ContentComponent />}
      </div>
    </div>
  )
}
