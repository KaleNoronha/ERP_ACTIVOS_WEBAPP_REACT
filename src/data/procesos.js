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
