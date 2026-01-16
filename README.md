# ACTIVOS ERP - Frontend

Sistema ERP empresarial moderno construido con React, TypeScript y Tailwind CSS.

## 🎨 Diseño

Paleta de colores personalizada:
- **Primario**: `#CE1212` (Rojo corporativo)
- **Hover**: `#810000` (Rojo oscuro)
- **Fondo claro**: `#EEEBDD` (Crema)
- **Oscuro**: `#1B1717` (Casi negro)

## 🏗️ Arquitectura

El proyecto utiliza **Feature-Sliced Design (FSD)** para una estructura escalable y mantenible:

```
src/
├── components/
│   ├── common/           # Componentes comunes (Tabs, etc.)
│   └── layouts/          # Layout principal, SideNav
├── features/             # Módulos de negocio autocontenidos
│   ├── negocios/         # Prospectos, Leads, Clientes, Contratos
│   │   ├── components/
│   │   └── data/
│   ├── organizacion/     # Personas, Roles, Procesos
│   │   ├── components/
│   │   └── data/
│   ├── productos/        # Catálogo, Apps, Infraestructura
│   │   ├── components/
│   │   └── data/
│   └── seguridad/        # Riesgos, Identidad, Incidentes
│       ├── components/
│       └── data/
├── pages/                # Páginas principales
├── shared/               # Código compartido
│   ├── components/ui/    # Button, Badge, Card, DataTable, etc.
│   └── types/            # TypeScript types por módulo
└── services/             # API services
```

## 📦 Módulos

### Negocios
- Prospectos - Pipeline de oportunidades
- Leads - Gestión de leads
- Clientes - Directorio de clientes
- Contactos - Contactos por cliente
- Propuestas - Propuestas comerciales
- Lista de Precios - Catálogo de precios
- Contratos - Gestión de contratos

### Organización
- Personas - Directorio de empleados
- Roles - Roles y responsabilidades
- Procesos - Mapa de procesos
- Actividades - Actividades por proceso
- Procedimientos - Documentación

### Productos
- Catálogo - Productos y servicios
- Aplicaciones - Inventario de apps
- Componentes - Librerías y módulos
- Datos - Modelos de datos
- Diagramas - Documentación visual
- Infraestructura - Recursos cloud
- Stack - Tecnologías utilizadas

### Seguridad
- Riesgos - Matriz de riesgos
- Identidad - Usuarios y accesos
- Vulnerabilidades - CVEs y remediación
- Incidentes - Respuesta a incidentes

## 🚀 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| React 18 | UI Framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS v4 | Estilos |
| Lucide React | Iconos |
| Axios | HTTP client |

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview
```

## 📁 Path Aliases

Configurados en `tsconfig.json` y `vite.config.js`:

```typescript
import { Button } from '@/shared/components/ui'
import { ProspectosView } from '@/features/negocios'
import type { Prospecto } from '@/shared/types/negocios.types'
```

## 🎯 Componentes UI

Componentes reutilizables en `src/shared/components/ui/`:

- **Button** - Variantes: primary, secondary, outline, ghost, danger
- **Badge** - Estados y etiquetas con colores semánticos
- **Card** - Contenedores con header, content, footer
- **StatCard** - Métricas con iconos y tendencias
- **DataTable** - Tablas con acciones y hover
- **SearchInput** - Input de búsqueda con clear

## � Convenciones

- **Componentes**: PascalCase (`ProspectosView.tsx`)
- **Tipos**: PascalCase con sufijo (`negocios.types.ts`)
- **Hooks**: camelCase con prefijo use (`useProspectos.ts`)
- **Archivos de datos**: camelCase (`mockData.ts`)

## 📄 Licencia

Privado - Todos los derechos reservados
