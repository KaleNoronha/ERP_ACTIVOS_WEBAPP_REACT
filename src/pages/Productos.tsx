import { useState } from 'react'
import { Box, AppWindow, Puzzle, Database, Share2, Server, Layers, Table } from 'lucide-react'
import { Tabs } from '@/shared/components/ui'
import {
  ProductosView,
  AplicacionesView,
  ComponentesView,
  DatosView,
  DiagramasView,
  InfraestructuraView,
  StackView
} from '@/features/productos'


type SubsectionKey = 'productos' | 'aplicaciones' | 'componentes' | 'datos' | 'diagramas' | 'infraestructura' | 'stack'

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
  productos: {
    tabs: [
      { id: 'catalogo', label: 'Catálogo', icon: Box }
    ],
    content: {
      'catalogo': ProductosView
    }
  },
  aplicaciones: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: AppWindow },
      { id: 'arquitectura', label: 'Arquitectura', icon: Share2 }
    ],
    content: {
      'lista': AplicacionesView,
      'arquitectura': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Arquitectura de Aplicaciones</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  },
  componentes: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Puzzle }
    ],
    content: {
      'lista': ComponentesView
    }
  },
  datos: {
    tabs: [
      { id: 'modelos', label: 'Modelos', icon: Database },
      { id: 'diccionario', label: 'Diccionario', icon: Table }
    ],
    content: {
      'modelos': DatosView,
      'diccionario': () => <div className="p-6"><h2 className="text-xl font-bold text-gray-800">Diccionario de Datos</h2><p className="text-gray-500 mt-2">Próximamente...</p></div>
    }
  },
  diagramas: {
    tabs: [
      { id: 'lista', label: 'Lista', icon: Share2 }
    ],
    content: {
      'lista': DiagramasView
    }
  },
  infraestructura: {
    tabs: [
      { id: 'recursos', label: 'Recursos', icon: Server }
    ],
    content: {
      'recursos': InfraestructuraView
    }
  },
  stack: {
    tabs: [
      { id: 'tecnologias', label: 'Tecnologías', icon: Layers }
    ],
    content: {
      'tecnologias': StackView
    }
  }
}

interface ProductosPageProps {
  subsection?: string
}

export default function Productos({ subsection = 'productos' }: ProductosPageProps) {
  const config = SUBSECTION_CONFIG[subsection as SubsectionKey]
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
