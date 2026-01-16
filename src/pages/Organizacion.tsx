import { useState } from 'react'
import { Users, Briefcase, GitBranch, FileText, Activity, Filter, Table, Settings } from 'lucide-react'
import { Tabs } from '@/shared/components/ui'
import { 
  PersonasView, 
  RolesView, 
  ProcesosView, 
  ProcedimientosView,
  ActividadesView 
} from '@/features/organizacion'


type SubsectionKey = 'personas' | 'roles' | 'procesos' | 'procedimientos' | 'actividades'

interface TabConfig {
  id: string
  label: string
  icon: React.ComponentType<{ size?: number }>
}

interface SubsectionConfig {
  tabs: TabConfig[]
  content: Record<string, React.ComponentType>
}

const SUBSECTION_CONFIG: Record<SubsectionKey, SubsectionConfig> = {
  personas: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Users },
      { id: 'organigrama', label: 'Organigrama', icon: Briefcase },
    ],
    content: {
      'lista': PersonasView,
      'organigrama': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Organigrama</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>,
    }
  },
  roles: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Table },
      { id: 'configuracion', label: 'Configuración', icon: Settings }
    ],
    content: {
      'lista': RolesView,
      'configuracion': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Configuración de Roles</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  },
  procesos: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Table },
      { id: 'mapa', label: 'Mapa', icon: GitBranch }
    ],
    content: {
      'lista': ProcesosView,
      'mapa': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Mapa de Procesos</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  },
  procedimientos: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: FileText },
      { id: 'configuracion', label: 'Configuración', icon: Settings }
    ],
    content: {
      'lista': ProcedimientosView,
      'configuracion': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Configuración</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  },
  actividades: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Activity },
      { id: 'filtros', label: 'Filtros', icon: Filter }
    ],
    content: {
      'lista': ActividadesView,
      'filtros': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Filtros Avanzados</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  }
}

interface OrganizacionProps {
  subsection?: SubsectionKey
}

export default function Organizacion({ subsection = 'personas' }: OrganizacionProps) {
  const config = SUBSECTION_CONFIG[subsection]
  const [activeTab, setActiveTab] = useState(config?.tabs[0]?.id || '')

  if (!config) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Subsección no encontrada</h2>
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
