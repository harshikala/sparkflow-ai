# Supply Chain Management Dashboard

A role-based supply chain management dashboard built with React, TypeScript, and Tailwind CSS.

## Project Overview

This application provides a comprehensive supply chain management platform with real-time insights across inventory, warehousing, delivery, forecasting, and more. Access is controlled through role-based authentication, ensuring each user sees only the modules relevant to their responsibilities.

## Features

### Authentication & Roles
- Role-based login system with four user roles: **Admin**, **Warehouse Manager**, **Delivery Agent**, and **Store Manager**
- Each role has access to a filtered set of navigation modules
- Session persistence via local storage

**Demo Credentials** (password for all: `password`):
| Role | Email |
|------|-------|
| Admin | admin@supply.com |
| Warehouse Manager | warehouse@supply.com |
| Delivery Agent | delivery@supply.com |
| Store Manager | store@supply.com |

### Modules

| Module | Description | Accessible By |
|--------|-------------|---------------|
| **Dashboard** | KPI metrics, order/revenue charts, warehouse performance, recent alerts | All roles |
| **Inventory** | SKU-level stock tracking, reorder points, stock status | Admin, Warehouse, Store |
| **Warehouse** | Warehouse load, capacity, and efficiency monitoring | Admin, Warehouse |
| **Delivery** | Delivery tracking and route management | Admin, Delivery |
| **Forecasting** | Demand predictions with confidence scores | Admin, Store |
| **Trending** | Trend analysis and analytics | Admin, Store |
| **Customers** | Customer data and insights | Admin, Store |
| **Markdowns** | Markdown/pricing management | Admin, Store |
| **Simulations** | Supply chain scenario simulations | Admin only |
| **Alerts** | Real-time alerts (low stock, delivery delays, etc.) | All roles |
| **Returns** | Returns processing and tracking | Admin, Warehouse |
| **Training** | Zone-based training modules | Admin, Store |
| **AI Co-Pilot** | AI-assisted supply chain assistant | All roles |
| **Privacy** | Privacy and data management settings | Admin only |
| **Preferences** | User preferences and settings | All roles |
| **Profile** | User profile management | All roles |

### Application Flow

1. **Login** → User authenticates at `/login` with email and password
2. **Role Detection** → System identifies user role and filters sidebar navigation
3. **Dashboard** → User lands on the main dashboard with KPI cards and charts
4. **Navigation** → Collapsible sidebar allows navigation between permitted modules
5. **Data Layer** → API service layer (with mock data) powers all modules via React Query

## Tech Stack

- **React 18** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool and dev server
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library (Radix UI primitives)
- **React Router v6** — Client-side routing
- **React Query (TanStack)** — Server state management
- **Recharts** — Data visualization / charts
- **Axios** — HTTP client
- **Lucide React** — Icon library

## Project Structure

```
src/
├── components/        # Shared components (Layout, Sidebar, Header, MetricCard, DataTable)
│   └── ui/            # shadcn/ui primitives
├── hooks/             # Custom hooks (useAuth, useMobile, useToast)
├── pages/             # Route-level page components
├── services/          # API service layer with mock data
├── lib/               # Utility functions
└── main.tsx           # Application entry point
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <REPO_URL>

# Navigate to project directory
cd <PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for static hosting.

## API Layer

The project uses a mock API service (`src/services/api.ts`) with intercepted Axios requests returning demo data. To connect to a real backend, replace the mock interceptors with actual API endpoints.

Available endpoints:
- `GET /api/inventory` — Inventory items with stock levels
- `GET /api/warehouses` — Warehouse load and efficiency data
- `GET /api/demand` — Demand heatmap data by zip code
- `GET /api/forecast` — Demand forecast predictions
- `GET /api/markdowns` — Markdown pricing data
- `GET /api/customers` — Customer analytics
- `GET /api/returns` — Returns data
- `GET /api/simulate` — Simulation results
- `GET /api/alerts` — System alerts
- `GET /api/training/:zone` — Training content by zone
