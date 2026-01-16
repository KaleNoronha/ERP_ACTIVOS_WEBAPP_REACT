import React, { useState } from 'react';
import {
  Check, Building, Contact, FileText, Tag, Box, AppWindow, Puzzle, Users, GitBranch,
  KeyRound, ShieldCheck, ChevronRight, ChevronLeft, Zap, Ellipsis,
  MoreVertical, Handshake, Target, LayoutDashboard, Settings, HelpCircle,
  Share2, ChevronDown, Package, Layers
} from 'lucide-react';

const SideNav = ({ onSectionChange }) => {
  const [activeItem, setActiveItem] = useState('mi-trabajo');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);

  const menuSections = [
    {
      label: 'Negocios',
      icon: Handshake,
      color: 'text-rose-400',
      items: [
        { id: 'negocios-prospectos', label: 'Prospectos', icon: Target },
        { id: 'negocios-leads', label: 'Leads', icon: Handshake },
        { id: 'negocios-cliente', label: 'Clientes', icon: Building },
        { id: 'negocios-contactos', label: 'Contactos', icon: Contact },
        { id: 'negocios-propuestas', label: 'Propuestas', icon: FileText },
        { id: 'negocios-listas-precios', label: 'Lista de Precios', icon: Tag },
        { id: 'negocios-contratos', label: 'Contratos', icon: FileText },
      ]
    },
    {
      label: 'Productos',
      icon: Box,
      color: 'text-sky-400',
      items: [
        { id: 'productos-productos', label: 'Catálogo', icon: Box },
        { id: 'productos-aplicaciones', label: 'Aplicaciones', icon: AppWindow },
        { id: 'productos-componentes', label: 'Componentes', icon: Puzzle },
        { id: 'productos-datos', label: 'Datos', icon: Layers },
        { id: 'productos-diagramas', label: 'Diagramas', icon: Share2 },
        { id: 'productos-infraestructura', label: 'Infraestructura', icon: GitBranch },
        { id: 'productos-stack', label: 'Stack', icon: Box },
      ]
    },
    {
      label: 'Organización',
      icon: Users,
      color: 'text-emerald-400',
      items: [
        { id: 'org-personas', label: 'Personas', icon: Users },
        { id: 'org-roles', label: 'Roles', icon: Contact },
        { id: 'org-procesos', label: 'Procesos', icon: Share2 },
        { id: 'org-actividades', label: 'Actividades', icon: FileText },
        { id: 'org-procedimientos', label: 'Procedimientos', icon: FileText },
      ]
    },
    {
      label: 'Seguridad',
      icon: ShieldCheck,
      color: 'text-amber-400',
      items: [
        { id: 'seguridad-riesgos', label: 'Riesgos', icon: ShieldCheck },
        { id: 'seguridad-identidad', label: 'Identidad', icon: KeyRound },
        { id: 'seguridad-vulnerabilidades', label: 'Vulnerabilidades', icon: ShieldCheck },
        { id: 'seguridad-incidentes', label: 'Incidentes', icon: Zap },
      ]
    }
  ];

  const footerMenuItems = [
    { id: 'footer-dashboards', label: 'Dashboards', icon: LayoutDashboard },
    { id: 'footer-configuracion', label: 'Configuración', icon: Settings },
    { id: 'footer-ayuda', label: 'Ayuda', icon: HelpCircle },
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    onSectionChange?.(item.id);
  };

  const handleSectionToggle = (sectionLabel) => {
    setExpandedSection(prev => prev === sectionLabel ? null : sectionLabel);
  };

  return (
    <div
      className={`relative flex flex-col h-screen transition-all duration-300 ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
      style={{ backgroundColor: '#1B1717' }}
    >
      {/* Header / Logo */}
      <div className="flex items-center h-16 px-4 border-b border-white/10">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setShowWorkspaceModal(!showWorkspaceModal)}
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Package size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <>
              <div className="flex flex-col">
                <span className="text-white font-semibold text-sm">Activos ERP</span>
                <span className="text-gray-500 text-xs">Workspace</span>
              </div>
              <ChevronDown size={14} className="text-gray-500 ml-auto group-hover:text-white transition-colors" />
            </>
          )}
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-brand-900 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-700 transition-all z-50 shadow-lg"
      >
        <ChevronLeft size={14} className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Quick action */}
      {!isCollapsed && (
        <div className="px-3 py-4">
          <button
            onClick={() => handleItemClick({ id: 'mi-trabajo' })}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeItem === 'mi-trabajo'
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Check size={18} />
            <span className="text-sm font-medium">Mi Trabajo</span>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        {menuSections.map((section) => {
          const isExpanded = expandedSection === section.label;
          const SectionIcon = section.icon;

          return (
            <div key={section.label} className="mb-2">
              {/* Section header */}
              <button
                onClick={() => handleSectionToggle(section.label)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isExpanded ? 'bg-white/5' : 'hover:bg-white/5'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <SectionIcon size={18} className={section.color} />
                {!isCollapsed && (
                  <>
                    <span className="text-sm font-medium text-gray-300 flex-1 text-left">{section.label}</span>
                    <ChevronRight 
                      size={14} 
                      className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                    />
                  </>
                )}
              </button>

              {/* Section items */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isExpanded && !isCollapsed ? 'max-h-96 mt-1' : 'max-h-0'
              }`}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2 ml-3 rounded-lg transition-all text-sm ${
                        isActive
                          ? 'bg-brand-500/10 text-brand-500 border-l-2 border-brand-500'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        {footerMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              } ${
                activeItem === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="text-sm">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
