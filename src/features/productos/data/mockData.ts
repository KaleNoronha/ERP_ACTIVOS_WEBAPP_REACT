import type { Producto, Aplicacion, Componente, ModeloDatos, Diagrama, RecursoInfraestructura, Tecnologia } from '@/shared/types/productos.types'

// ============================================
// DATOS MOCK - MÓDULO PRODUCTOS
// ============================================

export const productos: Producto[] = [
  { id: 1, codigo: 'PRD-001', nombre: 'ERP Empresarial', descripcion: 'Sistema integral de gestión empresarial', categoria: 'Software', version: '3.2.0', fechaLanzamiento: '2023-06-15', responsable: 'Carlos Mendez', equipo: ['Miguel Torres', 'Luis Garcia'], tecnologias: ['React', 'Node.js', 'PostgreSQL'], repositorio: 'github.com/empresa/erp', documentacion: 'docs.empresa.com/erp', estado: 'Activo' },
  { id: 2, codigo: 'PRD-002', nombre: 'CRM Cloud', descripcion: 'Plataforma de gestión de relaciones con clientes', categoria: 'SaaS', version: '2.1.0', fechaLanzamiento: '2023-09-20', responsable: 'Ana Flores', equipo: ['Carmen Diaz', 'Sofia Rodriguez'], tecnologias: ['Vue.js', 'Python', 'MongoDB'], repositorio: 'github.com/empresa/crm', estado: 'Activo' },
  { id: 3, codigo: 'PRD-003', nombre: 'Portal Clientes', descripcion: 'Portal de autoservicio para clientes', categoria: 'Web App', version: '1.5.0', fechaLanzamiento: '2024-01-10', responsable: 'Miguel Torres', equipo: ['Luis Garcia'], tecnologias: ['Next.js', 'TypeScript', 'Prisma'], repositorio: 'github.com/empresa/portal', estado: 'Activo' },
  { id: 4, codigo: 'PRD-004', nombre: 'App Móvil', descripcion: 'Aplicación móvil para clientes', categoria: 'Mobile', version: '1.0.0', fechaLanzamiento: '2024-03-01', responsable: 'Carmen Diaz', equipo: ['Miguel Torres'], tecnologias: ['React Native', 'Expo'], repositorio: 'github.com/empresa/mobile', estado: 'Desarrollo' },
  { id: 5, codigo: 'PRD-005', nombre: 'API Gateway', descripcion: 'Gateway centralizado de APIs', categoria: 'API', version: '2.0.0', fechaLanzamiento: '2023-04-05', responsable: 'Luis Garcia', equipo: ['Carlos Mendez'], tecnologias: ['Kong', 'Docker', 'Kubernetes'], repositorio: 'github.com/empresa/gateway', estado: 'Activo' },
  { id: 6, codigo: 'PRD-006', nombre: 'Data Platform', descripcion: 'Plataforma de datos y analytics', categoria: 'Infraestructura', version: '1.2.0', fechaLanzamiento: '2024-02-15', responsable: 'Carlos Mendez', equipo: ['Luis Garcia'], tecnologias: ['Spark', 'Airflow', 'Redshift'], estado: 'Beta' },
]

export const aplicaciones: Aplicacion[] = [
  { id: 1, codigo: 'APP-001', nombre: 'ERP Frontend', descripcion: 'Interfaz de usuario del ERP', tipo: 'Frontend', tecnologia: 'React', framework: 'Vite', version: '3.2.0', repositorio: 'github.com/empresa/erp-frontend', urlProduccion: 'erp.empresa.com', urlStaging: 'staging-erp.empresa.com', responsable: 'Miguel Torres', equipo: ['Carmen Diaz'], dependencias: ['API Gateway', 'Auth Service'], estado: 'Producción' },
  { id: 2, codigo: 'APP-002', nombre: 'ERP Backend', descripcion: 'API REST del ERP', tipo: 'Backend', tecnologia: 'Node.js', framework: 'Express', version: '3.2.0', repositorio: 'github.com/empresa/erp-backend', responsable: 'Luis Garcia', equipo: ['Carlos Mendez'], baseDatos: 'PostgreSQL', dependencias: ['Redis', 'RabbitMQ'], estado: 'Producción' },
  { id: 3, codigo: 'APP-003', nombre: 'CRM Service', descripcion: 'Microservicio de CRM', tipo: 'Microservicio', tecnologia: 'Python', framework: 'FastAPI', version: '2.1.0', repositorio: 'github.com/empresa/crm-service', responsable: 'Sofia Rodriguez', equipo: ['Ana Flores'], baseDatos: 'MongoDB', dependencias: ['API Gateway'], estado: 'Producción' },
  { id: 4, codigo: 'APP-004', nombre: 'Auth Service', descripcion: 'Servicio de autenticación', tipo: 'Microservicio', tecnologia: 'Go', framework: 'Gin', version: '1.5.0', repositorio: 'github.com/empresa/auth-service', responsable: 'Carlos Mendez', equipo: ['Luis Garcia'], baseDatos: 'Redis', dependencias: [], estado: 'Producción' },
  { id: 5, codigo: 'APP-005', nombre: 'Mobile App', descripcion: 'Aplicación móvil', tipo: 'Mobile', tecnologia: 'React Native', framework: 'Expo', version: '1.0.0', repositorio: 'github.com/empresa/mobile-app', responsable: 'Carmen Diaz', equipo: ['Miguel Torres'], dependencias: ['API Gateway', 'Auth Service'], estado: 'Desarrollo' },
]

export const componentes: Componente[] = [
  { id: 1, codigo: 'CMP-001', nombre: 'UI Components', descripcion: 'Librería de componentes UI', tipo: 'Librería', aplicacion: 'ERP Frontend', aplicacionId: 1, version: '2.0.0', repositorio: 'github.com/empresa/ui-components', lenguaje: 'TypeScript', dependencias: ['React', 'Tailwind'], documentacion: 'storybook.empresa.com', estado: 'Activo' },
  { id: 2, codigo: 'CMP-002', nombre: 'Auth Module', descripcion: 'Módulo de autenticación', tipo: 'Módulo', aplicacion: 'ERP Frontend', aplicacionId: 1, version: '1.5.0', repositorio: 'github.com/empresa/auth-module', lenguaje: 'TypeScript', dependencias: ['JWT', 'OAuth2'], estado: 'Activo' },
  { id: 3, codigo: 'CMP-003', nombre: 'Report Generator', descripcion: 'Generador de reportes PDF', tipo: 'Servicio', aplicacion: 'ERP Backend', aplicacionId: 2, version: '1.2.0', repositorio: 'github.com/empresa/report-gen', lenguaje: 'Node.js', dependencias: ['PDFKit', 'ExcelJS'], estado: 'Activo' },
  { id: 4, codigo: 'CMP-004', nombre: 'Email Service', descripcion: 'Servicio de envío de emails', tipo: 'Servicio', aplicacion: 'ERP Backend', aplicacionId: 2, version: '1.0.0', repositorio: 'github.com/empresa/email-service', lenguaje: 'Node.js', dependencias: ['Nodemailer', 'AWS SES'], estado: 'Activo' },
  { id: 5, codigo: 'CMP-005', nombre: 'Utils Library', descripcion: 'Utilidades compartidas', tipo: 'Utilidad', aplicacion: 'General', aplicacionId: 0, version: '3.0.0', repositorio: 'github.com/empresa/utils', lenguaje: 'TypeScript', dependencias: ['Lodash', 'Date-fns'], estado: 'Activo' },
]

export const modelosDatos: ModeloDatos[] = [
  { id: 1, codigo: 'MDL-001', nombre: 'usuarios', descripcion: 'Tabla de usuarios del sistema', tipo: 'Tabla', baseDatos: 'PostgreSQL', esquema: 'public', campos: [{ nombre: 'id', tipo: 'UUID', nullable: false, primaryKey: true }, { nombre: 'email', tipo: 'VARCHAR(255)', nullable: false, primaryKey: false }, { nombre: 'nombre', tipo: 'VARCHAR(100)', nullable: false, primaryKey: false }, { nombre: 'created_at', tipo: 'TIMESTAMP', nullable: false, primaryKey: false, defaultValue: 'NOW()' }], relaciones: [{ tabla: 'roles', tipo: 'ManyToMany', campo: 'id', campoReferencia: 'usuario_id' }], indices: ['idx_usuarios_email'], estado: 'Activo' },
  { id: 2, codigo: 'MDL-002', nombre: 'clientes', descripcion: 'Tabla de clientes', tipo: 'Tabla', baseDatos: 'PostgreSQL', esquema: 'ventas', campos: [{ nombre: 'id', tipo: 'SERIAL', nullable: false, primaryKey: true }, { nombre: 'razon_social', tipo: 'VARCHAR(200)', nullable: false, primaryKey: false }, { nombre: 'ruc', tipo: 'VARCHAR(11)', nullable: false, primaryKey: false }], relaciones: [{ tabla: 'contactos', tipo: 'OneToMany', campo: 'id', campoReferencia: 'cliente_id' }], indices: ['idx_clientes_ruc'], estado: 'Activo' },
  { id: 3, codigo: 'MDL-003', nombre: 'productos_cache', descripcion: 'Cache de productos', tipo: 'Cache', baseDatos: 'Redis', esquema: 'cache', campos: [{ nombre: 'key', tipo: 'STRING', nullable: false, primaryKey: true }, { nombre: 'value', tipo: 'JSON', nullable: false, primaryKey: false }], relaciones: [], indices: [], estado: 'Activo' },
]

export const diagramas: Diagrama[] = [
  { id: 1, codigo: 'DGM-001', nombre: 'Arquitectura General', descripcion: 'Diagrama de arquitectura del sistema', tipo: 'Arquitectura', version: '2.0', autor: 'Carlos Mendez', fechaCreacion: '2023-06-01', ultimaActualizacion: '2024-01-15', herramienta: 'Draw.io', imagenUrl: '/diagrams/arquitectura.png' },
  { id: 2, codigo: 'DGM-002', nombre: 'Flujo de Autenticación', descripcion: 'Secuencia de autenticación OAuth2', tipo: 'Secuencia', aplicacion: 'Auth Service', aplicacionId: 4, version: '1.5', autor: 'Luis Garcia', fechaCreacion: '2023-08-10', ultimaActualizacion: '2024-02-01', herramienta: 'PlantUML' },
  { id: 3, codigo: 'DGM-003', nombre: 'Modelo ER Ventas', descripcion: 'Entidad-Relación del módulo de ventas', tipo: 'ER', aplicacion: 'ERP Backend', aplicacionId: 2, version: '3.0', autor: 'Miguel Torres', fechaCreacion: '2023-04-20', ultimaActualizacion: '2024-01-20', herramienta: 'dbdiagram.io' },
  { id: 4, codigo: 'DGM-004', nombre: 'Infraestructura AWS', descripcion: 'Diagrama de infraestructura cloud', tipo: 'Infraestructura', version: '1.2', autor: 'Carlos Mendez', fechaCreacion: '2024-01-05', ultimaActualizacion: '2024-02-10', herramienta: 'Lucidchart' },
  { id: 5, codigo: 'DGM-005', nombre: 'Proceso de Ventas', descripcion: 'Flujo BPMN del proceso de ventas', tipo: 'BPMN', version: '2.1', autor: 'Sofia Rodriguez', fechaCreacion: '2023-09-15', ultimaActualizacion: '2024-01-30', herramienta: 'Camunda Modeler' },
]

export const recursosInfraestructura: RecursoInfraestructura[] = [
  { id: 1, codigo: 'INF-001', nombre: 'ERP Production Server', descripcion: 'Servidor principal de producción', tipo: 'EC2', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Producción', especificaciones: { instanceType: 't3.xlarge', vCPU: '4', memory: '16 GB' }, costoMensual: 150, estado: 'Running', metricas: { cpu: 45, memoria: 62 } },
  { id: 2, codigo: 'INF-002', nombre: 'Database Primary', descripcion: 'Base de datos principal', tipo: 'RDS', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Producción', especificaciones: { engine: 'PostgreSQL 15', instanceClass: 'db.r5.large', storage: '500 GB' }, costoMensual: 280, estado: 'Running', metricas: { cpu: 30, memoria: 55, disco: 45 } },
  { id: 3, codigo: 'INF-003', nombre: 'Redis Cache', descripcion: 'Cache distribuido', tipo: 'ElastiCache', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Producción', especificaciones: { engine: 'Redis 7', nodeType: 'cache.r6g.large' }, costoMensual: 120, estado: 'Running', metricas: { cpu: 15, memoria: 40 } },
  { id: 4, codigo: 'INF-004', nombre: 'Static Assets', descripcion: 'Almacenamiento de archivos estáticos', tipo: 'S3', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Producción', especificaciones: { storageClass: 'Standard', size: '250 GB' }, costoMensual: 25, estado: 'Running' },
  { id: 5, codigo: 'INF-005', nombre: 'Load Balancer', descripcion: 'Balanceador de carga', tipo: 'ALB', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Producción', especificaciones: { type: 'Application', zones: '3' }, costoMensual: 45, estado: 'Running' },
  { id: 6, codigo: 'INF-006', nombre: 'Staging Server', descripcion: 'Servidor de staging', tipo: 'EC2', proveedor: 'AWS', region: 'us-east-1', ambiente: 'Staging', especificaciones: { instanceType: 't3.medium', vCPU: '2', memory: '4 GB' }, costoMensual: 40, estado: 'Running', metricas: { cpu: 20, memoria: 35 } },
]

export const tecnologias: Tecnologia[] = [
  { id: 1, nombre: 'React', categoria: 'Frontend', version: '18.2', licencia: 'MIT', descripcion: 'Librería para interfaces de usuario', documentacionUrl: 'react.dev', aplicaciones: 3, estado: 'Activo' },
  { id: 2, nombre: 'Node.js', categoria: 'Backend', version: '20 LTS', licencia: 'MIT', descripcion: 'Runtime de JavaScript', documentacionUrl: 'nodejs.org', aplicaciones: 4, estado: 'Activo' },
  { id: 3, nombre: 'PostgreSQL', categoria: 'Database', version: '15', licencia: 'PostgreSQL', descripcion: 'Base de datos relacional', documentacionUrl: 'postgresql.org', aplicaciones: 2, estado: 'Activo' },
  { id: 4, nombre: 'Docker', categoria: 'DevOps', version: '24', licencia: 'Apache 2.0', descripcion: 'Contenedores', documentacionUrl: 'docker.com', aplicaciones: 6, estado: 'Activo' },
  { id: 5, nombre: 'Kubernetes', categoria: 'DevOps', version: '1.28', licencia: 'Apache 2.0', descripcion: 'Orquestación de contenedores', documentacionUrl: 'kubernetes.io', aplicaciones: 4, estado: 'Activo' },
  { id: 6, nombre: 'TypeScript', categoria: 'Frontend', version: '5.3', licencia: 'Apache 2.0', descripcion: 'Superset tipado de JavaScript', documentacionUrl: 'typescriptlang.org', aplicaciones: 5, estado: 'Activo' },
  { id: 7, nombre: 'Python', categoria: 'Backend', version: '3.12', licencia: 'PSF', descripcion: 'Lenguaje de programación', documentacionUrl: 'python.org', aplicaciones: 2, estado: 'Activo' },
  { id: 8, nombre: 'Redis', categoria: 'Database', version: '7', licencia: 'BSD', descripcion: 'Base de datos en memoria', documentacionUrl: 'redis.io', aplicaciones: 3, estado: 'Activo' },
]
