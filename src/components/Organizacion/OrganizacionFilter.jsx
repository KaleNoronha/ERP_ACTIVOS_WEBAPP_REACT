import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search, SquareChevronDown, Eraser, Building, Store, Code, ClipboardList, Repeat, MoreVertical, X } from 'lucide-react';

// --- Componentes de UI ---
const SummaryPill = ({ children, colorScheme = 'gray' }) => {
    const colors = {
        gray: 'bg-gray-100 text-gray-800',
        blue: 'bg-blue-100 text-blue-800',
        orange: 'bg-orange-100 text-orange-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        purple: 'bg-purple-100 text-purple-800',
        pink: 'bg-pink-100 text-pink-800',
        indigo: 'bg-indigo-100 text-indigo-800',
        teal: 'bg-teal-100 text-teal-800',
        cyan: 'bg-cyan-100 text-cyan-800',
        amber: 'bg-amber-100 text-amber-800',
        lime: 'bg-lime-100 text-lime-800',
        emerald: 'bg-emerald-100 text-emerald-800',
        violet: 'bg-violet-100 text-violet-800',
        sky: 'bg-sky-100 text-sky-800',
        rose: 'bg-rose-100 text-rose-800',
        fuchsia: 'bg-fuchsia-100 text-fuchsia-800',
        yellow: 'bg-yellow-100 text-yellow-800',
    };
    const colorClass = colors[colorScheme] || colors.gray;

    return (
        <span className={`flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5 ${colorClass}`}>
            {children}
        </span>
    );
};

// --- Definiciones de Datos ---
const departamentoOptions = [
    { id: 'Administracion', label: 'Administracion', icon: Building, tagColor: 'bg-gray-100 text-gray-800', colorName: 'gray' }, 
    { id: 'Negocios', label: 'Negocios', icon: Store, tagColor: 'bg-green-100 text-green-800', colorName: 'green' }, 
    { id: 'Tecnologia', label: 'Tecnologia', icon: Code, tagColor: 'bg-blue-100 text-blue-800', colorName: 'blue' }, 
    { id: 'Operaciones', label: 'Operaciones', icon: ClipboardList, tagColor: 'bg-red-100 text-red-800', colorName: 'red' },
];

const procesoN1OptionsInitial = {
    
    'Administracion': [],
    'Negocios': [],
    'Tecnologia': [],
    'Operaciones': []
};

const procesoN2Options = {
    'DesarrolloSoftware': {
        'f1': [
            { id: 'PlanificacionIntake', label: 'Planificación Técnica e Intake' },
            { id: 'DisenoArquitectura', label: 'Diseño y Arquitectura de Solución' },
            { id: 'DisenoDetallado', label: 'Diseño Detallado (UI/UX y Técnico)' },
        ],
        'f2': [
            { id: 'PlanificacionSprint', label: 'Planificación de la Iteración (Sprint)' },
            { id: 'Implementacion', label: 'Implementación y Desarrollo' },
            { id: 'GestionCalidad', label: 'Gestión de la Calidad (QA)' },
        ],
        'f3': [
            { id: 'GestionCambios', label: 'Gestión de Cambios y Versiones' },
            { id: 'GestionConfig', label: 'Gestión de la Configuración y Entornos' },
            { id: 'DespliegueRelease', label: 'Despliegue y Liberación (Release)' },
        ],
        'transversal': [
            { id: 'MonitoreoObs', label: 'Monitoreo y Observabilidad' },
            { id: 'GestionIncidentes', label: 'Gestión de Incidentes y Soporte' },
            { id: 'GestionSeguridad', label: 'Gestión de la Seguridad y Cumplimiento' },
            { id: 'GestionConocimiento', label: 'Gestión del Documentación' },
            { id: 'MejoraContinua', label: 'Mejora Continua y Deuda Técnica' },
        ]
    },
};

// --- Datos para Búsqueda (10 c/u) ---
const puestosOptions = [
    { id: 'analista_sistemas', label: 'Analista de Sistemas' }, { id: 'desarrollador_fs', label: 'Desarrollador Full-Stack' }, { id: 'gerente_proyectos', label: 'Gerente de Proyectos' }, { id: 'disenador_ux', label: 'Diseñador UX/UI' }, { id: 'analista_datos', label: 'Analista de Datos' }, { id: 'ingeniero_devops', label: 'Ingeniero DevOps' }, { id: 'analista_qa', label: 'Analista QA' }, { id: 'ingeniero_datos', label: 'Ingeniero de Datos' }, { id: 'arquitecto_cloud', label: 'Arquitecto Cloud' }, { id: 'especialista_bi', label: 'Especialista BI' },
];
const rolesOptions = [
    { id: 'tech_lead', label: 'Tech Lead' }, { id: 'scrum_master', label: 'Scrum Master' }, { id: 'product_owner', label: 'Product Owner' }, { id: 'team_member', label: 'Team Member' }, { id: 'stakeholder', label: 'Stakeholder' }, { id: 'chapter_lead', label: 'Chapter Lead' }, { id: 'tribe_lead', label: 'Tribe Lead' }, { id: 'qa_lead', label: 'QA Lead' }, { id: 'ux_lead', label: 'UX Lead' }, { id: 'dev_lead', label: 'Dev Lead' },
];
// Datos iniciales - serán reemplazados por datos de JIRA
const procesoN3OptionsInitial = [
    { id: 'p3_auth', label: 'N3: Autenticación de Usuarios' }, { id: 'p3_pagos', label: 'N3: Procesamiento de Pagos' }, { id: 'p3_notif', label: 'N3: Sistema de Notificaciones' }, { id: 'p3_inventario', label: 'N3: Gestión de Inventario' }, { id: 'p3_onboarding', label: 'N3: Onboarding de Cliente' }, { id: 'p3_reglas', label: 'N3: Motor de Reglas' }, { id: 'p3_conciliacion', label: 'N3: Conciliación Automática' }, { id: 'p3_reportes', label: 'N3: Módulo de Reportes' }, { id: 'p3_perfil', label: 'N3: Gestión de Perfil de Usuario' }, { id: 'p3_seguridad', label: 'N3: Auditoría de Seguridad' },
];
const actividadOptions = [
    { id: 'a_login_jwt', label: 'Act: Desarrollo Login JWT' }, { id: 'a_fix_password', label: 'Act: Corrección Flujo Olvidé Contraseña' }, { id: 'a_reporte_ventas', label: 'Act: Creación Reporte Ventas' }, { id: 'a_sprint_planning', label: 'Act: Sprint Planning 10' }, { id: 'a_daily', label: 'Act: Daily Standup' }, { id: 'a_refinamiento', label: 'Act: Refinamiento Backlog' }, { id: 'a_demo_sprint', label: 'Act: Demo Sprint' }, { id: 'a_retro_sprint', label: 'Act: Retro Sprint' }, { id: 'a_deploy_prod', label: 'Act: Deploy a Producción' }, { id: 'a_hotfix_login', label: 'Act: Hotfix Error Login' },
];

// --- Paleta de Colores para Proceso N1 y N2 ---
const n1ColorPalette = [
    { // 0: Verde
      base: 'border-gray-300 text-gray-600 hover:border-green-400 hover:text-green-700 hover:bg-green-50', 
      selected: 'bg-green-600 text-white border-green-700 shadow-inner',
      n2: { base: 'border-green-400 text-green-700 hover:bg-green-50', selected: 'bg-green-600 text-white border-green-700 shadow-inner' }
    },
    { // 1: Azul (para Desarrollo de Software)
      base: 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50', 
      selected: 'bg-blue-600 text-white border-blue-700 shadow-inner',
      n2: { base: 'border-blue-400 text-blue-700 hover:bg-blue-50', selected: 'bg-blue-600 text-white border-blue-700 shadow-inner' }
    },
    { // 2: Ámbar/Amarillo
      base: 'border-gray-300 text-gray-600 hover:border-amber-500 hover:text-amber-700 hover:bg-amber-50', 
      selected: 'bg-amber-600 text-white border-amber-700 shadow-inner',
      n2: { base: 'border-amber-500 text-amber-700 hover:bg-amber-50', selected: 'bg-amber-600 text-white border-amber-700 shadow-inner' }
    },
    { // 3: Fucsia/Rosa
      base: 'border-gray-300 text-gray-600 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-50', 
      selected: 'bg-pink-600 text-white border-pink-700 shadow-inner',
      n2: { base: 'border-pink-500 text-pink-700 hover:bg-pink-50', selected: 'bg-pink-600 text-white border-pink-700 shadow-inner' }
    },
    { // 4: Turquesa/Teal
      base: 'border-gray-300 text-gray-600 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50', 
      selected: 'bg-teal-600 text-white border-teal-700 shadow-inner',
      n2: { base: 'border-teal-400 text-teal-700 hover:bg-teal-50', selected: 'bg-teal-600 text-white border-teal-700 shadow-inner' }
    },
    { // 5: Rojo/Marrón
      base: 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-700 hover:bg-red-50', 
      selected: 'bg-red-600 text-white border-red-700 shadow-inner',
      n2: { base: 'border-red-500 text-red-700 hover:bg-red-50', selected: 'bg-red-600 text-white border-red-700 shadow-inner' }
    },
    { // 6: Índigo/Morado
      base: 'border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-700 hover:bg-indigo-50', 
      selected: 'bg-indigo-600 text-white border-indigo-700 shadow-inner',
      n2: { base: 'border-indigo-400 text-indigo-700 hover:bg-indigo-50', selected: 'bg-indigo-600 text-white border-indigo-700 shadow-inner' }
    },
    { // 7: Púrpura
      base: 'border-gray-300 text-gray-600 hover:border-purple-400 hover:text-purple-700 hover:bg-purple-50', 
      selected: 'bg-purple-600 text-white border-purple-700 shadow-inner',
      n2: { base: 'border-purple-400 text-purple-700 hover:bg-purple-50', selected: 'bg-purple-600 text-white border-purple-700 shadow-inner' }
    },
    { // 8: Cian
      base: 'border-gray-300 text-gray-600 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50', 
      selected: 'bg-cyan-600 text-white border-cyan-700 shadow-inner',
      n2: { base: 'border-cyan-400 text-cyan-700 hover:bg-cyan-50', selected: 'bg-cyan-600 text-white border-cyan-700 shadow-inner' }
    },
    { // 9: Lima
      base: 'border-gray-300 text-gray-600 hover:border-lime-500 hover:text-lime-700 hover:bg-lime-50', 
      selected: 'bg-lime-600 text-white border-lime-700 shadow-inner',
      n2: { base: 'border-lime-500 text-lime-700 hover:bg-lime-50', selected: 'bg-lime-600 text-white border-lime-700 shadow-inner' }
    },
    { // 10: Naranja
      base: 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-700 hover:bg-orange-50', 
      selected: 'bg-orange-600 text-white border-orange-700 shadow-inner',
      n2: { base: 'border-orange-500 text-orange-700 hover:bg-orange-50', selected: 'bg-orange-600 text-white border-orange-700 shadow-inner' }
    },
    { // 11: Esmeralda
      base: 'border-gray-300 text-gray-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50', 
      selected: 'bg-emerald-600 text-white border-emerald-700 shadow-inner',
      n2: { base: 'border-emerald-400 text-emerald-700 hover:bg-emerald-50', selected: 'bg-emerald-600 text-white border-emerald-700 shadow-inner' }
    },
    { // 12: Violeta
      base: 'border-gray-300 text-gray-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50', 
      selected: 'bg-violet-600 text-white border-violet-700 shadow-inner',
      n2: { base: 'border-violet-400 text-violet-700 hover:bg-violet-50', selected: 'bg-violet-600 text-white border-violet-700 shadow-inner' }
    },
    { // 13: Cielo
      base: 'border-gray-300 text-gray-600 hover:border-sky-400 hover:text-sky-700 hover:bg-sky-50', 
      selected: 'bg-sky-600 text-white border-sky-700 shadow-inner',
      n2: { base: 'border-sky-400 text-sky-700 hover:bg-sky-50', selected: 'bg-sky-600 text-white border-sky-700 shadow-inner' }
    },
    { // 14: Rosa
      base: 'border-gray-300 text-gray-600 hover:border-rose-400 hover:text-rose-700 hover:bg-rose-50', 
      selected: 'bg-rose-600 text-white border-rose-700 shadow-inner',
      n2: { base: 'border-rose-400 text-rose-700 hover:bg-rose-50', selected: 'bg-rose-600 text-white border-rose-700 shadow-inner' }
    },
];

// --- Componente Menú Lateral ---
const ActivitiesMenu = ({ onSelect, activeOption }) => {
    const [hoveredOption, setHoveredOption] = useState(null);

    const MenuButton = ({ option }) => {
        const IconComponent = option.icon;
        const isActive = activeOption === option.value;
        const isHovered = hoveredOption === option.value;

        return (
            <div
                className="relative flex items-center justify-start"
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
            >
                <button
                    onClick={() => onSelect(option.value)}
                    aria-label={option.label}
                    className={`relative flex items-center justify-center rounded-lg transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${isActive ? 'w-12 h-12 bg-orange-500 text-white shadow-xl transform scale-110' : 'w-11 h-11 bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                    <IconComponent
                        className={`transition-all duration-300 ease-in-out ${isActive ? 'size-[22px]' : 'size-[20px]'}`}
                    />
                </button>
                {isHovered && (
                    <div className="absolute right-full mr-4 bg-gray-800 text-white text-xs px-3 py-2 rounded-md whitespace-nowrap z-50 shadow-lg">
                        {option.label}
                        <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-start gap-3">
            {departamentoOptions.map((option) => <MenuButton key={option.id} option={{ label: option.label, value: option.id, icon: option.icon }} />)}
        </div>
    );
};

// --- Componente de Búsqueda Autocompletable con Píldora ---
const SearchablePillInput = React.forwardRef(({ options, selectedValue, onChange, placeholder, isDisabled, colorScheme, onFocus }, ref) => {
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    const setRefs = useCallback((node) => {
        inputRef.current = node;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    }, [ref]);

    const selectedOption = useMemo(() => {
        return options.find(opt => opt.id === selectedValue);
    }, [selectedValue, options]);

    const filteredOptions = useMemo(() => {
        if (inputValue.length < 2) return []; 
        return options.filter(opt =>
            opt.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    }, [inputValue, options]);

    useEffect(() => {
        if (!selectedValue) {
            setInputValue('');
        }
    }, [selectedValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length >= 2) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    const handleOptionClick = (option) => {
        onChange(option.id);
        setInputValue('');
        setIsOpen(false);
        containerRef.current?.focus();
    };

    const handleClearSelection = (e) => {
        e.stopPropagation();
        onChange(null);
        setInputValue('');
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleBlur = (e) => {
        setTimeout(() => {
            if (containerRef.current && !containerRef.current.contains(document.activeElement)) {
                setIsOpen(false);
                setInputValue('');
            }
        }, 200);
    };

    const colorClasses = {
        blue: {
            pill: "bg-blue-100 text-blue-800",
            x_icon: "text-blue-700/70 hover:text-blue-900"
        },
        orange: {
            pill: "bg-orange-100 text-orange-800",
            x_icon: "text-orange-700/70 hover:text-orange-900"
        }
    };
    const currentColors = colorClasses[colorScheme] || colorClasses.blue;

    return (
        <div className="relative" ref={containerRef} onBlur={handleBlur} onFocus={onFocus}>
            <div className={`flex items-center w-full rounded border shadow-sm text-sm p-1.5 h-9 transition-colors duration-200 ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white border-gray-300'} ${isOpen ? 'border-orange-500 ring-1 ring-orange-500' : 'border-gray-300'}`}>
                {selectedOption ? (
                    <span className={`flex items-center justify-between text-xs font-semibold rounded-full px-2.5 py-0.5 ${currentColors.pill}`}>
                        <span>{selectedOption.label}</span>
                        <button
                            type="button"
                            onClick={handleClearSelection}
                            className={`ml-1.5 ${currentColors.x_icon}`}
                            aria-label="Eliminar selección"
                        >
                            <X className="size-3" />
                        </button>
                    </span>
                ) : (
                    <input
                        ref={setRefs}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={() => { if(inputValue.length >= 2) setIsOpen(true); }}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        className="w-full h-full bg-transparent border-none outline-none focus:ring-0 p-0 m-0 placeholder:italic placeholder:text-gray-400"
                    />
                )}
            </div>

            {isOpen && filteredOptions.length > 0 && !selectedOption && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto" data-skip-grid-nav="true">
                    <ul className="py-1">
                        {filteredOptions.map(option => (
                            <li
                                key={option.id}
                                // --- ACTUALIZACIÓN: mousedown -> pointerdown ---
                                onPointerDown={() => handleOptionClick(option)}
                                className={`px-3 py-1.5 text-sm cursor-pointer text-gray-800 hover:bg-gray-100`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
});

// --- Componente Botón N2 ---
// Se eliminó 'w-full' para que funcione en 'flex-wrap'
const ProcessN2Button = React.memo(({ n2, isSelected, colorClasses, onClick, registerFocusable }) => (
    <button 
        ref={registerFocusable} 
        type="button" 
        onClick={() => onClick(n2.id)} 
        className={`px-5 py-1.5 text-xs text-left whitespace-normal font-semibold border rounded-md transition-all duration-200 min-h-[2.25rem] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${isSelected ? colorClasses.selected : `bg-white ${colorClasses.base}`}`}
    >
        {n2.label}
    </button>
));


// --- Componente Principal ---
export default function OrganizacionFilter() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [focusedIndex, setFocusedIndex] = useState(0);
    
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [selectedProcesoN1, setSelectedProcesoN1] = useState(null);
    const [selectedProcesoN2, setSelectedProcesoN2] = useState(null);

    const [searchModeA, setSearchModeA] = useState('actividad');
    const [searchModeB, setSearchModeB] = useState('puesto');
    
    const [selectedActividad, setSelectedActividad] = useState(null);
    const [selectedProcesoN3, setSelectedProcesoN3] = useState(null);
    const [selectedPuesto, setSelectedPuesto] = useState(null);
    const [selectedRol, setSelectedRol] = useState(null);

    // Estado para datos dinámicos de JIRA
    const [procesoN1Options, setProcesoN1Options] = useState(procesoN1OptionsInitial);
    const [procesoN2OptionsGeneral, setProcesoN2OptionsGeneral] = useState([]);
    const [procesoN3Options, setProcesoN3Options] = useState(procesoN3OptionsInitial);
    const [isLoadingN1, setIsLoadingN1] = useState(false);
    const [isLoadingN2, setIsLoadingN2] = useState(false);

    const formRef = useRef(null);
    const focusableElementsRef = useRef([]);

    const loadedDepartments = useRef(new Set());

    // No inicializar con ningún departamento
    useEffect(() => {
        // Componente inicia sin departamento seleccionado
    }, []);

    // Carga lazy de N1 cuando se selecciona departamento
    useEffect(() => {
        if (!selectedDepartamento) return;
        if (loadedDepartments.current.has(selectedDepartamento)) return;
        
        setIsLoadingN1(true);
        import('../../data').then(({ macroProcesos }) => {
            setProcesoN1Options(prev => ({ ...prev, [selectedDepartamento]: macroProcesos[selectedDepartamento] || [] }));
            loadedDepartments.current.add(selectedDepartamento);
            setIsLoadingN1(false);
        });
    }, [selectedDepartamento]);

    const hasLoadedN2 = useRef(false);

    // Carga lazy de N2 cuando se selecciona N1
    useEffect(() => {
        if (!selectedProcesoN1) {
            setProcesoN2OptionsGeneral([]);
            hasLoadedN2.current = false;
            return;
        }
        
        setIsLoadingN2(true);
        hasLoadedN2.current = false;
        import('../../data').then(({ procesos }) => {
            setProcesoN2OptionsGeneral(procesos[selectedProcesoN1] || []);
            hasLoadedN2.current = true;
            setIsLoadingN2(false);
        });
    }, [selectedProcesoN1]);

    const currentProcesoN1List = useMemo(() => {
        return selectedDepartamento ? (procesoN1Options[selectedDepartamento] || []) : [];
    }, [selectedDepartamento, procesoN1Options]);

    const currentProcesoN2List = useMemo(() => {
        if (selectedProcesoN1 && Object.keys(procesoN2OptionsGeneral).length > 0) {
            return procesoN2OptionsGeneral;
        }
        
        const options = procesoN2Options[selectedProcesoN1] || [];
        return Array.isArray(options) ? options : selectedProcesoN1 === 'DesarrolloSoftware' ? [] : [];
    }, [selectedProcesoN1, procesoN2OptionsGeneral]);

    // Asignar colores dinámicamente a los MacroProcesos
    const colorNames = ['green', 'blue', 'amber', 'pink', 'teal', 'red', 'indigo', 'purple', 'cyan', 'lime', 'orange', 'emerald', 'violet', 'sky', 'rose'];
    
    const allProcesoN1 = useMemo(() => {
        const allN1 = Object.values(procesoN1Options).flat();
        return allN1.map((n1, index) => ({
            ...n1,
            colorName: colorNames[index % colorNames.length]
        }));
    }, [procesoN1Options]);
    const allProcesoN2 = useMemo(() => {
        return Object.values(procesoN2Options).flatMap(val => {
            if (Array.isArray(val)) {
                return val;
            }
            return Object.values(val).flat();
        });
    }, []);

    const allPuestos = puestosOptions;
    const allRoles = rolesOptions;
    const allActividades = actividadOptions;
    const allProcesoN3 = procesoN3Options;

    // Color N1 seleccionado (para N2)
    const selectedN1Color = useMemo(() => {
        const defaultColor = { base: 'border-gray-300 text-gray-600 hover:bg-gray-100', selected: 'bg-gray-500 text-white border-gray-600 shadow-inner' };
        if (!selectedProcesoN1) return defaultColor;
        
        const n1Index = currentProcesoN1List.findIndex(n1 => n1.id === selectedProcesoN1);
        if (n1Index === -1) return defaultColor;
        
        // --- Asignación de Color Fija para Desarrollo ---
        if (selectedProcesoN1 === 'DesarrolloSoftware') {
            return n1ColorPalette[1].n2;
        }
        let paletteIndex = n1Index % n1ColorPalette.length;
        if (paletteIndex === 1) { 
            paletteIndex = (paletteIndex + 1) % n1ColorPalette.length;
        }
        
        return n1ColorPalette[paletteIndex].n2;
        
    }, [selectedProcesoN1, currentProcesoN1List]);

    const registerFocusable = useCallback((el) => { if (el && !focusableElementsRef.current.includes(el)) { focusableElementsRef.current.push(el); } }, []);

    useEffect(() => { if(isCollapsed) return; focusableElementsRef.current[focusedIndex]?.focus(); }, [focusedIndex, isCollapsed]);

    const handleSearch = async () => {
        setIsCollapsed(true);
        window.dispatchEvent(new CustomEvent('close-popovers'));
        window.dispatchEvent(new CustomEvent('search-started'));
        
        const { subprocesos } = await import('../../data');
        
        const allN2 = typeof currentProcesoN2List === 'object' && !Array.isArray(currentProcesoN2List)
            ? Object.values(currentProcesoN2List).flat()
            : Array.isArray(currentProcesoN2List) ? currentProcesoN2List : allProcesoN2;
        const selectedN2 = allN2.find(n2 => n2.id === selectedProcesoN2);
        
        window.dispatchEvent(new CustomEvent('search-results', { 
            detail: { 
                subprocesos,
                procesoN2: selectedN2 || null
            } 
        }));
    };
    const handleClear = () => {
        setSelectedDepartamento(null);
        setSelectedProcesoN1(null);
        setSelectedProcesoN2(null);
        setSelectedActividad(null);
        setSelectedProcesoN3(null);
        setSelectedPuesto(null);
        setSelectedRol(null);
        setSearchModeA('actividad');
        setSearchModeB('puesto');
        setActiveField(null); 
        setFocusedIndex(0); 
        focusableElementsRef.current = []; 
        requestAnimationFrame(() => focusableElementsRef.current[0]?.focus());
    };
    
    const handleMenuSelect = (deptoId) => {
        setSelectedDepartamento(deptoId);
        setSelectedProcesoN1(null);
        setSelectedProcesoN2(null);
        setSelectedPuesto(null);
        setSelectedRol(null);
        setSelectedActividad(null);
        setSelectedProcesoN3(null);
    };

    const handleToggleSelection = useCallback((currentValue, newValue, setter, resetters = []) => {
        setter(currentValue === newValue ? null : newValue);
        resetters.forEach(reset => reset(null));
    }, []);

    const handleProcesoN1Click = useCallback((n1Id) => {
        const newValue = selectedProcesoN1 === n1Id ? null : n1Id;
        setSelectedProcesoN1(newValue);
        setSelectedProcesoN2(null);
    }, [selectedProcesoN1]);

    const handleProcesoN2Click = useCallback((n2Id) => {
        const newValue = selectedProcesoN2 === n2Id ? null : n2Id;
        setSelectedProcesoN2(newValue);
    }, [selectedProcesoN2]);

    const handleExpand = () => { setIsCollapsed(false); setFocusedIndex(0); };
    
    const handleKeyDown = (e) => {
        if (e.target.closest('[data-skip-grid-nav="true"]')) return;
        
        const elements = focusableElementsRef.current.filter(el => el && !el.disabled);
        const totalElements = elements.length;
        if (!totalElements) return;
        let currentIndex = elements.findIndex(el => el === document.activeElement);
        if (currentIndex === -1) currentIndex = focusedIndex;
        let nextIndex = currentIndex;
        if (e.key === 'ArrowRight') { nextIndex = (currentIndex + 1) % totalElements; } 
        else if (e.key === 'ArrowLeft') { nextIndex = (currentIndex - 1 + totalElements) % totalElements; } 
        else if (e.key === 'Enter' && elements[currentIndex]?.type !== 'text' && elements[currentIndex]?.tagName !== 'SELECT') { e.preventDefault(); elements[currentIndex]?.click(); }
        else { return; }
        e.preventDefault();
        setFocusedIndex(nextIndex);
        elements[nextIndex]?.focus();
    };
    
    // --- Render ---
    return (
        <div className="bg-white font-sans p-2 md:px-6">
            <h1 className="text-xl font-bold text-gray-800 mb-4">FormBusqueda Actividades Nivelado</h1>
            
            <div className="flex items-start gap-4">
                
                <div className="flex-1">
                    <div className={`bg-white ${isCollapsed ? '' : 'rounded-xl shadow-md border-t border-l border-gray-200'}`}>
                        <div className="relative min-h-[64px]">
                            <div className={`grid transition-[grid-template-rows,opacity] duration-1000 ease-in-out ${isCollapsed ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
                                <div className="overflow-hidden">
                                    <div className="py-8 px-6" ref={formRef} onKeyDown={handleKeyDown}>
                                        <div className="flex flex-col gap-4">
                                            
                                            {/* --- Nivel 1: Proceso N1 --- */}
                                            {selectedDepartamento && (
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-semibold text-gray-700">Proceso N1 </label>
                                                    {isLoadingN1 ? (
                                                        <div className="flex gap-2">
                                                            {[1,2,3,4].map(i => (
                                                                <div key={i} className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
                                                            ))}
                                                        </div>
                                                    ) : currentProcesoN1List.length > 0 ? (
                                                    <div className="flex flex-wrap gap-2">
                                                        {currentProcesoN1List.map((n1, i) => {
                                                            
                                                            let color;
                                                            if (n1.id === 'DesarrolloSoftware') {
                                                                color = n1ColorPalette[1]; // Índice 1 = Azul
                                                            } else {
                                                                let paletteIndex = i % n1ColorPalette.length;
                                                                if (paletteIndex === 1) { 
                                                                    paletteIndex = (paletteIndex + 1) % n1ColorPalette.length;
                                                                }
                                                                color = n1ColorPalette[paletteIndex];
                                                            }

                                                            return (
                                                                <button 
                                                                    key={n1.id} 
                                                                    ref={registerFocusable} 
                                                                    type="button" 
                                                                    onClick={() => handleProcesoN1Click(n1.id)} 
                                                                    className={`px-2 py-1 text-xs font-semibold border rounded-md touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${selectedProcesoN1 === n1.id ? color.selected : `bg-white ${color.base}`}`}
                                                                >
                                                                    {n1.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    ) : null}
                                                </div>
                                            )}

                                            {/* --- Nivel 2: Proceso N2 --- */}
                                            {selectedProcesoN1 && (
                                                <div className="space-y-2">
                                                    <label className="block text-xs font-semibold text-gray-700">Proceso N2 ({allProcesoN1.find(n1 => n1.id === selectedProcesoN1)?.label})</label>
                                                    
                                                    {isLoadingN2 ? (
                                                        <div className="grid grid-cols-3 gap-4">
                                                            {[1,2,3].map(i => (
                                                                <div key={i} className="space-y-2">
                                                                    <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                                                                    {[1,2,3].map(j => (
                                                                        <div key={j} className="h-9 bg-gray-200 rounded-md animate-pulse"></div>
                                                                    ))}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : typeof currentProcesoN2List === 'object' && !Array.isArray(currentProcesoN2List) ? (
                                                        <div className="space-y-4">
                                                            <div className="grid grid-cols-3 gap-4">
                                                                {['Planificación y Diseño', 'Construcción y Calidad', 'Entrega y Operaciones'].map(fase => (
                                                                    <div key={fase} className="space-y-2">
                                                                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide">{fase}</h3>
                                                                        <div className="flex flex-col gap-2">
                                                                            {(currentProcesoN2List[fase] || []).map(n2 => (
                                                                                <ProcessN2Button 
                                                                                    key={n2.id} 
                                                                                    n2={n2} 
                                                                                    isSelected={selectedProcesoN2 === n2.id}
                                                                                    colorClasses={selectedN1Color}
                                                                                    onClick={handleProcesoN2Click}
                                                                                    registerFocusable={registerFocusable}
                                                                                /> 
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {currentProcesoN2List['Transversal'] && currentProcesoN2List['Transversal'].length > 0 && (
                                                                <div className="space-y-2">
                                                                    <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wide">Transversal</h3>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {currentProcesoN2List['Transversal'].map(n2 => (
                                                                            <ProcessN2Button 
                                                                                key={n2.id} 
                                                                                n2={n2} 
                                                                                isSelected={selectedProcesoN2 === n2.id}
                                                                                colorClasses={selectedN1Color}
                                                                                onClick={handleProcesoN2Click}
                                                                                registerFocusable={registerFocusable}
                                                                            /> 
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : Array.isArray(currentProcesoN2List) ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {currentProcesoN2List.map(n2 => (
                                                                <ProcessN2Button 
                                                                    key={n2.id} 
                                                                    n2={n2} 
                                                                    isSelected={selectedProcesoN2 === n2.id}
                                                                    colorClasses={selectedN1Color}
                                                                    onClick={handleProcesoN2Click}
                                                                    registerFocusable={registerFocusable}
                                                                /> 
                                                            ))}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                            
                                            {(selectedDepartamento || selectedProcesoN1) && <div className="-my-2 pt-2"><hr className="border-gray-200"/></div>}

                                            {/* --- Campos de Búsqueda y Acciones --- */}
                                            <div className="flex justify-between items-end gap-6 pt-2">
                                                <div className="w-2/3 flex gap-6 items-start">
                                                    
                                                    <div className="w-1/2 space-y-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <button type="button" onClick={() => setSearchModeA(prev => prev === 'actividad' ? 'procesoN3' : 'actividad')} className="text-gray-400 hover:text-orange-500 transition-colors text-lg" aria-label="Cambiar entre Actividad y Proceso N3"><Repeat /></button>
                                                            <label htmlFor="search-a-input" className="text-xs font-semibold text-gray-700 capitalize">{searchModeA === 'actividad' ? 'Actividad' : 'Proceso N3'}</label>
                                                        </div>
                                                        <SearchablePillInput
                                                            ref={registerFocusable}
                                                            options={searchModeA === 'actividad' ? allActividades : allProcesoN3}
                                                            selectedValue={searchModeA === 'actividad' ? selectedActividad : selectedProcesoN3}
                                                            onChange={id => searchModeA === 'actividad' ? setSelectedActividad(id) : setSelectedProcesoN3(id)}
                                                            placeholder={`Buscar por ${searchModeA}...`}
                                                            isDisabled={false}
                                                            onFocus={() => setActiveField('searchA')}
                                                            colorScheme={searchModeA === 'actividad' ? 'orange' : 'blue'}
                                                        />
                                                    </div>

                                                    <div className="w-1/2 space-y-1">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setSearchModeB(prev => prev === 'puesto' ? 'rol' : 'puesto')} 
                                                                className={`transition-colors text-lg text-gray-400 hover:text-orange-500`} 
                                                                aria-label="Cambiar entre Puesto y Rol"
                                                            >
                                                                <Repeat />
                                                            </button>
                                                            <label 
                                                                htmlFor="search-b-input" 
                                                                className={`text-xs font-semibold capitalize text-gray-700`}
                                                            >
                                                                {searchModeB === 'puesto' ? 'Puesto' : 'Rol'}
                                                            </label>
                                                        </div>
                                                        <SearchablePillInput
                                                            ref={registerFocusable}
                                                            options={searchModeB === 'puesto' ? allPuestos : allRoles}
                                                            selectedValue={searchModeB === 'puesto' ? selectedPuesto : selectedRol}
                                                            onChange={id => searchModeB === 'puesto' ? setSelectedPuesto(id) : setSelectedRol(id)}
                                                            placeholder={`Buscar por ${searchModeB}...`}
                                                            isDisabled={false}
                                                            onFocus={() => setActiveField('searchB')}
                                                            colorScheme={searchModeB === 'puesto' ? 'blue' : 'orange'}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="flex items-end justify-end gap-3">
                                                    <button ref={registerFocusable} onClick={handleClear} type="button" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-md px-4 h-9 leading-none text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 [&>svg]:size-[1.2em] [&>svg]:shrink-0"><Eraser /><span>Limpiar</span></button>
                                                    <button ref={registerFocusable} onClick={handleSearch} type="button" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 rounded-md px-4 h-9 leading-none text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 disabled:bg-gray-300 disabled:cursor-not-allowed [&>svg]:size-[1.2em] [&>svg]:shrink-0"><Search /><span>Buscar</span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* --- Vista Colapsada (Pills) --- */}
                            <div className={`absolute top-0 left-0 right-0 p-4 flex justify-between items-center transition-opacity duration-500 ease-in-out ${isCollapsed ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'}`}>
                                <div className="flex flex-wrap items-center gap-2" aria-live="polite">
                                    {selectedDepartamento && (
                                        <SummaryPill colorScheme={departamentoOptions.find(d => d.id === selectedDepartamento)?.colorName || 'gray'}>
                                            Dpto: {departamentoOptions.find(d => d.id === selectedDepartamento)?.label}
                                        </SummaryPill>
                                    )}
                                    {selectedProcesoN1 && (
                                        <SummaryPill colorScheme={allProcesoN1.find(n1 => n1.id === selectedProcesoN1)?.colorName || 'blue'}>
                                            N1: {allProcesoN1.find(n1 => n1.id === selectedProcesoN1)?.label}
                                        </SummaryPill>
                                    )}
                                    {selectedProcesoN2 && (() => {
                                        const allN2 = typeof currentProcesoN2List === 'object' && !Array.isArray(currentProcesoN2List)
                                            ? Object.values(currentProcesoN2List).flat()
                                            : Array.isArray(currentProcesoN2List) ? currentProcesoN2List : allProcesoN2;
                                        return (
                                            <SummaryPill colorScheme="blue">
                                                N2: {allN2.find(n2 => n2.id === selectedProcesoN2)?.label}
                                            </SummaryPill>
                                        );
                                    })()}
                                    
                                    {selectedPuesto && searchModeB === 'puesto' && (
                                        <SummaryPill colorScheme="blue">
                                            Puesto: {allPuestos.find(p => p.id === selectedPuesto)?.label}
                                        </SummaryPill>
                                    )}
                                    {selectedRol && searchModeB === 'rol' && (
                                        <SummaryPill colorScheme="orange">
                                            Rol: {allRoles.find(r => r.id === selectedRol)?.label}
                                        </SummaryPill>
                                    )}
                                    {selectedActividad && searchModeA === 'actividad' && (
                                        <SummaryPill colorScheme="orange">
                                            Act: {allActividades.find(a => a.id === selectedActividad)?.label}
                                        </SummaryPill>
                                    )}
                                    {selectedProcesoN3 && searchModeA === 'procesoN3' && (
                                        <SummaryPill colorScheme="blue">
                                            N3: {allProcesoN3.find(p3 => p3.id === selectedProcesoN3)?.label}
                                        </SummaryPill>
                                    )}

                                </div>
                                <button onClick={handleExpand} className="text-gray-500 hover:text-orange-500 transition-colors text-2xl" aria-label="Expandir formulario de búsqueda"><SquareChevronDown className="size-6"/></button>

                            </div>
                        </div>
                    </div>
                </div>
                
                {/* --- Columna 2: Menú Lateral / Icono Colapsado --- */}
                <div className="flex-shrink-0 w-auto pt-1">
                    {isCollapsed ? (
                        <button 
                            className="flex items-center justify-center w-11 h-11 bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 ease-in-out hover:bg-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500"
                            onClick={handleExpand}
                            aria-label="Mostrar menú"
                        >
                            <MoreVertical className="size-5" />
                        </button>
                    ) : (
                        <ActivitiesMenu 
                            activeOption={selectedDepartamento} 
                            onSelect={handleMenuSelect} 
                        />
                    )}
                </div>

            </div>
        </div>
    );
}