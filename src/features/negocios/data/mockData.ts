import { Prospecto, Lead, Cliente, Contacto, Propuesta, ListaPrecios, Contrato } from '@/shared/types/negocios.types'

export const prospectos: Prospecto[] = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    empresa: 'Tech Solutions SAC',
    cargo: 'Gerente de TI',
    email: 'jperez@techsolutions.com',
    telefono: '+51 999 888 777',
    origen: 'LinkedIn',
    valor: 85000,
    probabilidad: 35,
    estado: 'Nuevo',
    fechaContacto: '2024-01-15',
    notas: 'Interesado en solución ERP'
  },
  {
    id: 2,
    nombre: 'María García',
    empresa: 'Innovate Corp',
    cargo: 'Directora Comercial',
    email: 'mgarcia@innovatecorp.pe',
    telefono: '+51 998 777 666',
    origen: 'Referido',
    valor: 120000,
    probabilidad: 60,
    estado: 'Contactado',
    fechaContacto: '2024-01-10',
    notas: 'Reunión programada para demo'
  },
  {
    id: 3,
    nombre: 'Carlos López',
    empresa: 'Digital Plus',
    cargo: 'CEO',
    email: 'clopez@digitalplus.com',
    telefono: '+51 997 666 555',
    origen: 'Evento',
    valor: 200000,
    probabilidad: 80,
    estado: 'Calificado',
    fechaContacto: '2024-01-05',
    notas: 'Muy interesado, solicita propuesta formal'
  },
  {
    id: 4,
    nombre: 'Ana Rodríguez',
    empresa: 'Global Services',
    cargo: 'Gerente General',
    email: 'arodriguez@globalservices.pe',
    telefono: '+51 996 555 444',
    origen: 'Web',
    valor: 65000,
    probabilidad: 25,
    estado: 'Nuevo',
    fechaContacto: '2024-01-18'
  },
  {
    id: 5,
    nombre: 'Roberto Sánchez',
    empresa: 'Fintech Peru',
    cargo: 'CTO',
    email: 'rsanchez@fintechperu.com',
    telefono: '+51 995 444 333',
    origen: 'LinkedIn',
    valor: 150000,
    probabilidad: 45,
    estado: 'Contactado',
    fechaContacto: '2024-01-12'
  }
]

export const leads: Lead[] = [
  {
    id: 1,
    codigo: 'LEAD-2024-001',
    prospecto: 'Carlos López',
    empresa: 'Digital Plus',
    producto: 'ERP Enterprise',
    valor: 200000,
    probabilidad: 80,
    estado: 'Calificado',
    etapa: 'Propuesta',
    fechaCreacion: '2024-01-05',
    fechaCierre: '2024-02-28',
    responsable: 'Sofia Mendoza'
  },
  {
    id: 2,
    codigo: 'LEAD-2024-002',
    prospecto: 'María García',
    empresa: 'Innovate Corp',
    producto: 'CRM Cloud',
    valor: 120000,
    probabilidad: 60,
    estado: 'En Proceso',
    etapa: 'Demo',
    fechaCreacion: '2024-01-10',
    responsable: 'Carlos Ruiz'
  },
  {
    id: 3,
    codigo: 'LEAD-2024-003',
    prospecto: 'Roberto Sánchez',
    empresa: 'Fintech Peru',
    producto: 'API Gateway',
    valor: 150000,
    probabilidad: 45,
    estado: 'En Proceso',
    etapa: 'Negociación',
    fechaCreacion: '2024-01-12',
    responsable: 'Sofia Mendoza'
  },
  {
    id: 4,
    codigo: 'LEAD-2024-004',
    prospecto: 'Juan Pérez',
    empresa: 'Tech Solutions SAC',
    producto: 'ERP Standard',
    valor: 85000,
    probabilidad: 35,
    estado: 'Nuevo',
    etapa: 'Contacto Inicial',
    fechaCreacion: '2024-01-15',
    responsable: 'Ana Torres'
  }
]

export const clientes: Cliente[] = [
  {
    id: 1,
    codigo: 'CLI-001',
    razonSocial: 'Corporación Acme SAC',
    ruc: '20123456789',
    direccion: 'Av. Javier Prado 1234, San Isidro',
    sector: 'Tecnología',
    tipoCliente: 'Corporativo',
    contactoPrincipal: 'Pedro Martínez',
    email: 'pmartinez@acme.com.pe',
    telefono: '+51 1 234 5678',
    estado: 'Activo',
    fechaRegistro: '2022-03-15',
    creditoAprobado: 500000
  },
  {
    id: 2,
    codigo: 'CLI-002',
    razonSocial: 'Industrias del Norte SA',
    ruc: '20987654321',
    direccion: 'Calle Los Pinos 567, Miraflores',
    sector: 'Manufactura',
    tipoCliente: 'Corporativo',
    contactoPrincipal: 'Laura Vega',
    email: 'lvega@industriasnorte.pe',
    telefono: '+51 1 345 6789',
    estado: 'Activo',
    fechaRegistro: '2021-08-20',
    creditoAprobado: 300000
  },
  {
    id: 3,
    codigo: 'CLI-003',
    razonSocial: 'StartupTech SRL',
    ruc: '20456789123',
    direccion: 'Jr. Huallaga 890, Lima',
    sector: 'Tecnología',
    tipoCliente: 'Startup',
    contactoPrincipal: 'Diego Flores',
    email: 'dflores@startuptech.io',
    telefono: '+51 1 456 7890',
    estado: 'Activo',
    fechaRegistro: '2023-06-10',
    creditoAprobado: 50000
  },
  {
    id: 4,
    codigo: 'CLI-004',
    razonSocial: 'Retail Express EIRL',
    ruc: '20789123456',
    direccion: 'Av. Arequipa 2345, Lince',
    sector: 'Retail',
    tipoCliente: 'PYME',
    contactoPrincipal: 'Carmen Quispe',
    email: 'cquispe@retailexpress.pe',
    telefono: '+51 1 567 8901',
    estado: 'Activo',
    fechaRegistro: '2023-01-05'
  }
]

export const contactos: Contacto[] = [
  {
    id: 1,
    nombre: 'Pedro',
    apellido: 'Martínez',
    cargo: 'Gerente de TI',
    empresa: 'Corporación Acme SAC',
    clienteId: 1,
    email: 'pmartinez@acme.com.pe',
    telefono: '+51 1 234 5678',
    celular: '+51 999 111 222',
    linkedin: 'linkedin.com/in/pedromartinez',
    esDecisionMaker: true,
    estado: 'Activo'
  },
  {
    id: 2,
    nombre: 'Laura',
    apellido: 'Vega',
    cargo: 'Directora de Operaciones',
    empresa: 'Industrias del Norte SA',
    clienteId: 2,
    email: 'lvega@industriasnorte.pe',
    telefono: '+51 1 345 6789',
    celular: '+51 998 222 333',
    esDecisionMaker: true,
    estado: 'Activo'
  },
  {
    id: 3,
    nombre: 'Miguel',
    apellido: 'Torres',
    cargo: 'Jefe de Compras',
    empresa: 'Corporación Acme SAC',
    clienteId: 1,
    email: 'mtorres@acme.com.pe',
    telefono: '+51 1 234 5679',
    esDecisionMaker: false,
    estado: 'Activo'
  },
  {
    id: 4,
    nombre: 'Diego',
    apellido: 'Flores',
    cargo: 'CEO',
    empresa: 'StartupTech SRL',
    clienteId: 3,
    email: 'dflores@startuptech.io',
    telefono: '+51 1 456 7890',
    celular: '+51 997 333 444',
    linkedin: 'linkedin.com/in/diegoflores',
    esDecisionMaker: true,
    estado: 'Activo'
  }
]

export const propuestas: Propuesta[] = [
  {
    id: 1,
    codigo: 'PROP-2024-001',
    titulo: 'Implementación ERP Enterprise',
    cliente: 'Digital Plus',
    clienteId: 'prospect-3',
    descripcion: 'Propuesta para implementación completa de ERP Enterprise con módulos de finanzas, inventario y RRHH',
    monto: 200000,
    moneda: 'USD',
    descuento: 5,
    estado: 'En Negociación',
    fechaEmision: '2024-01-20',
    fechaVencimiento: '2024-02-20',
    responsable: 'Sofia Mendoza',
    items: [
      { id: 1, descripcion: 'Licencias ERP Enterprise (50 usuarios)', cantidad: 1, precioUnitario: 80000, subtotal: 80000 },
      { id: 2, descripcion: 'Implementación y configuración', cantidad: 1, precioUnitario: 60000, subtotal: 60000 },
      { id: 3, descripcion: 'Capacitación (40 horas)', cantidad: 40, precioUnitario: 500, subtotal: 20000 },
      { id: 4, descripcion: 'Soporte primer año', cantidad: 1, precioUnitario: 40000, subtotal: 40000 }
    ]
  },
  {
    id: 2,
    codigo: 'PROP-2024-002',
    titulo: 'CRM Cloud - Plan Profesional',
    cliente: 'Innovate Corp',
    clienteId: 'prospect-2',
    descripcion: 'Suscripción anual CRM Cloud con integración a sistemas existentes',
    monto: 120000,
    moneda: 'USD',
    estado: 'Enviada',
    fechaEmision: '2024-01-18',
    fechaVencimiento: '2024-02-18',
    responsable: 'Carlos Ruiz',
    items: [
      { id: 1, descripcion: 'Suscripción CRM Cloud (100 usuarios/año)', cantidad: 1, precioUnitario: 90000, subtotal: 90000 },
      { id: 2, descripcion: 'Integración con ERP existente', cantidad: 1, precioUnitario: 20000, subtotal: 20000 },
      { id: 3, descripcion: 'Migración de datos', cantidad: 1, precioUnitario: 10000, subtotal: 10000 }
    ]
  },
  {
    id: 3,
    codigo: 'PROP-2024-003',
    titulo: 'API Gateway Enterprise',
    cliente: 'Fintech Peru',
    clienteId: 'prospect-5',
    descripcion: 'Solución de API Gateway para gestión de microservicios',
    monto: 150000,
    moneda: 'USD',
    estado: 'Borrador',
    fechaEmision: '2024-01-22',
    fechaVencimiento: '2024-02-22',
    responsable: 'Sofia Mendoza',
    items: [
      { id: 1, descripcion: 'Licencia API Gateway Enterprise', cantidad: 1, precioUnitario: 100000, subtotal: 100000 },
      { id: 2, descripcion: 'Implementación y configuración', cantidad: 1, precioUnitario: 35000, subtotal: 35000 },
      { id: 3, descripcion: 'Capacitación técnica', cantidad: 1, precioUnitario: 15000, subtotal: 15000 }
    ]
  }
]

export const listasPrecios: ListaPrecios[] = [
  {
    id: 1,
    codigo: 'LP-2024-001',
    nombre: 'Lista General 2024',
    descripcion: 'Lista de precios estándar para todos los productos',
    moneda: 'USD',
    vigenciaDesde: '2024-01-01',
    vigenciaHasta: '2024-12-31',
    activo: true,
    items: [
      { id: 1, productoId: 1, producto: 'ERP Enterprise', precioBase: 80000, precioVenta: 80000, descuentoMaximo: 10 },
      { id: 2, productoId: 2, producto: 'CRM Cloud', precioBase: 45000, precioVenta: 45000, descuentoMaximo: 15 },
      { id: 3, productoId: 3, producto: 'API Gateway', precioBase: 60000, precioVenta: 60000, descuentoMaximo: 8 }
    ]
  },
  {
    id: 2,
    codigo: 'LP-2024-002',
    nombre: 'Lista Corporativos',
    descripcion: 'Precios especiales para clientes corporativos',
    moneda: 'USD',
    vigenciaDesde: '2024-01-01',
    vigenciaHasta: '2024-12-31',
    activo: true,
    items: [
      { id: 1, productoId: 1, producto: 'ERP Enterprise', precioBase: 80000, precioVenta: 72000, descuentoMaximo: 15 },
      { id: 2, productoId: 2, producto: 'CRM Cloud', precioBase: 45000, precioVenta: 38250, descuentoMaximo: 20 }
    ]
  }
]

export const contratos: Contrato[] = [
  {
    id: 1,
    numero: 'CTR-2023-045',
    titulo: 'Contrato de Licenciamiento ERP',
    cliente: 'Corporación Acme SAC',
    clienteId: 1,
    tipo: 'Licencia',
    monto: 250000,
    moneda: 'USD',
    fechaInicio: '2023-04-01',
    fechaFin: '2026-03-31',
    renovacionAutomatica: true,
    estado: 'Vigente',
    responsable: 'Sofia Mendoza'
  },
  {
    id: 2,
    numero: 'CTR-2023-067',
    titulo: 'Contrato de Mantenimiento Anual',
    cliente: 'Industrias del Norte SA',
    clienteId: 2,
    tipo: 'Mantenimiento',
    monto: 48000,
    moneda: 'USD',
    fechaInicio: '2023-09-01',
    fechaFin: '2024-08-31',
    renovacionAutomatica: true,
    estado: 'Vigente',
    responsable: 'Carlos Ruiz'
  },
  {
    id: 3,
    numero: 'CTR-2024-012',
    titulo: 'Consultoría de Transformación Digital',
    cliente: 'StartupTech SRL',
    clienteId: 3,
    tipo: 'Consultoría',
    monto: 35000,
    moneda: 'USD',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-04-15',
    renovacionAutomatica: false,
    estado: 'Vigente',
    responsable: 'Ana Torres'
  },
  {
    id: 4,
    numero: 'CTR-2023-089',
    titulo: 'Suscripción CRM Cloud',
    cliente: 'Retail Express EIRL',
    clienteId: 4,
    tipo: 'Servicio',
    monto: 18000,
    moneda: 'USD',
    fechaInicio: '2023-02-01',
    fechaFin: '2024-01-31',
    renovacionAutomatica: true,
    estado: 'Por Vencer',
    responsable: 'Carlos Ruiz'
  }
]
