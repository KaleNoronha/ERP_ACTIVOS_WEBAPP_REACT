interface Tab {
  id: string
  label: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  setActiveTab: (id: string) => void
}

export function Tabs({ tabs, activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="flex gap-1 px-6">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {Icon && <Icon size={16} />}
              {tab.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Tabs
