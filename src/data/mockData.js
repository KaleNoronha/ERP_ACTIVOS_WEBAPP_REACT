// Mock Data para Organización

export const departamentos = [
    { id: 'Administracion', label: 'Administracion' },
    { id: 'Negocios', label: 'Negocios' },
    { id: 'Tecnologia', label: 'Tecnologia' },
    { id: 'Operaciones', label: 'Operaciones' }
];

export const macroProcesos = {
    'Administracion': [
        { id: 'GestionFinanciera', label: 'Gestión Financiera' },
        { id: 'RecursosHumanos', label: 'Recursos Humanos' }
    ],
    'Negocios': [
        { id: 'VentasComercial', label: 'Ventas y Comercial' },
        { id: 'MarketingDigital', label: 'Marketing Digital' }
    ],
    'Tecnologia': [
        { id: 'DesarrolloSoftware', label: 'Desarrollo de Software' },
        { id: 'Infraestructura', label: 'Infraestructura TI' }
    ],
    'Operaciones': [
        { id: 'Logistica', label: 'Logística' },
        { id: 'Produccion', label: 'Producción' }
    ]
};

export const procesos = {
    'DesarrolloSoftware': {
        'Planificación y Diseño': [
            { id: 'DS-PROC-01', label: 'Planificación Técnica e Intake' },
            { id: 'DS-PROC-02', label: 'Diseño y Arquitectura de Solución' },
            { id: 'DS-PROC-03', label: 'Diseño Detallado (UI/UX y Técnico)' }
        ],
        'Construcción y Calidad': [
            { id: 'DS-PROC-04', label: 'Planificación de la Iteración (Sprint)' },
            { id: 'DS-PROC-05', label: 'Implementación y Desarrollo' },
            { id: 'DS-PROC-06', label: 'Gestión de la Calidad (QA)' }
        ],
        'Entrega y Operaciones': [
            { id: 'DS-PROC-07', label: 'Gestión de Cambios y Versiones' },
            { id: 'DS-PROC-08', label: 'Gestión de la Configuración y Entornos' },
            { id: 'DS-PROC-09', label: 'Despliegue y Liberación (Release)' }
        ],
        'Transversal': [
            { id: 'DS-PROC-10', label: 'Monitoreo y Observabilidad' },
            { id: 'DS-PROC-11', label: 'Gestión de Incidentes y Soporte' },
            { id: 'DS-PROC-12', label: 'Gestión de la Seguridad y Cumplimiento' },
            { id: 'DS-PROC-13', label: 'Gestión del Documentación' },
            { id: 'DS-PROC-14', label: 'Mejora Continua y Deuda Técnica' }
        ]
    }
};

export const subprocesos = [
    {
        id: 'DS-SPROC-05.1',
        label: 'Desarrollo de Features',
        description: 'Implementación de nuevas funcionalidades',
        actividades: [
            { id: 'DS-ACT-05.1.01', label: 'Análisis de Requerimientos' },
            { id: 'DS-ACT-05.1.02', label: 'Codificación' },
            { id: 'DS-ACT-05.1.03', label: 'Revisión de Código' }
        ]
    },
    {
        id: 'DS-SPROC-05.2',
        label: 'Corrección de Bugs',
        description: 'Resolución de errores reportados',
        actividades: [
            { id: 'DS-ACT-05.2.01', label: 'Reproducción del Bug' },
            { id: 'DS-ACT-05.2.02', label: 'Análisis de Causa Raíz' },
            { id: 'DS-ACT-05.2.03', label: 'Implementación de Fix' }
        ]
    }
];

export const actividadDetails = {
    'DS-ACT-05.1.01': {
        id: 'DS-ACT-05.1.01',
        name: 'Análisis de Requerimientos',
        descripcionDetallada: 'Análisis detallado de los requerimientos funcionales y no funcionales',
        dependencia: '',
        responsable: 'Analista Funcional',
        accountable: 'Tech Lead',
        owner: 'Product Owner',
        consultado: 'Arquitecto',
        informado: 'Equipo de QA',
        entradas: 'User Stories\nCriterios de Aceptación\nDocumentación Técnica',
        salidas: 'Especificación Funcional\nDiagramas de Flujo\nCasos de Uso',
        criterio: 'Requerimientos validados y aprobados por el Product Owner',
        clasificacion: 'SOP',
        duracion: '120',
        kpis: 'Tiempo de análisis\nClaridad de requerimientos',
        kris: 'Requerimientos ambiguos\nCambios frecuentes'
    },
    'DS-ACT-05.1.02': {
        id: 'DS-ACT-05.1.02',
        name: 'Codificación',
        descripcionDetallada: 'Implementación del código según especificaciones técnicas',
        dependencia: 'DS-ACT-05.1.01',
        responsable: 'Desarrollador',
        accountable: 'Tech Lead',
        owner: 'Tech Lead',
        consultado: 'Arquitecto',
        informado: 'Scrum Master',
        entradas: 'Especificación Técnica\nEstándares de Código\nRepositorio Git',
        salidas: 'Código Fuente\nUnit Tests\nCommit en Git',
        criterio: 'Código cumple con estándares y pasa pruebas unitarias',
        clasificacion: 'Guia Tecnica',
        duracion: '240',
        kpis: 'Líneas de código\nCobertura de tests',
        kris: 'Deuda técnica\nBugs en producción'
    }
};

export const puestos = [
    { id: 'analista_sistemas', label: 'Analista de Sistemas' },
    { id: 'desarrollador_fs', label: 'Desarrollador Full-Stack' },
    { id: 'gerente_proyectos', label: 'Gerente de Proyectos' },
    { id: 'disenador_ux', label: 'Diseñador UX/UI' },
    { id: 'analista_qa', label: 'Analista QA' }
];

export const roles = [
    { id: 'tech_lead', label: 'Tech Lead' },
    { id: 'scrum_master', label: 'Scrum Master' },
    { id: 'product_owner', label: 'Product Owner' },
    { id: 'team_member', label: 'Team Member' }
];
