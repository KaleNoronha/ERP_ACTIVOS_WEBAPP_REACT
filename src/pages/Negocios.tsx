import { useState } from 'react'
import { Target, Handshake, Building, Contact, FileText, Tag } from 'lucide-react'
import { 
  ProspectosView, 
  LeadsView, 
  ClientesView, 
  ContactosView, 
  PropuestasView, 
  ListaPreciosView, 
  ContratosView 
} from '@/features/negocios'
import { Tabs } from '@/shared/components/ui';



interface SubsectionConfig {
  tabs: Array<{ id: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }>
  content: Record<string, React.ComponentType>
}

const SUBSECTION_CONFIG: Record<string, SubsectionConfig> = {
  prospectos: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Target },
      { id: 'kanban', label: 'Kanban', icon: Target }
    ],
    content: {
      'lista': ProspectosView,
      'kanban': () => <div className="p-6"><h2 className="text-xl font-bold">Kanban Prospectos - Próximamente</h2></div>
    }
  },
  leads: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Handshake },
      { id: 'pipeline', label: 'Pipeline', icon: Handshake }
    ],
    content: {
      'lista': LeadsView,
      'pipeline': LeadsView // El componente ya tiene vista pipeline
    }
  },
  cliente: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Building }
    ],
    content: {
      'lista': ClientesView
    }
  },
  contactos: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Contact }
    ],
    content: {
      'lista': ContactosView
    }
  },
  propuestas: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: FileText }
    ],
    content: {
      'lista': PropuestasView
    }
  },
  'listas-precios': {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Tag }
    ],
    content: {
      'lista': ListaPreciosView
    }
  },
  contratos: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: FileText }
    ],
    content: {
      'lista': ContratosView
    }
  }
}

interface NegociosProps {
  subsection?: string
}

export default function Negocios({ subsection = 'prospectos' }: NegociosProps) {
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
