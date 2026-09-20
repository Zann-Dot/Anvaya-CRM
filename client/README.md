# 🌐 Anvaya CRM — Frontend Web Application

A modern, high-performance Customer Relationship Management (CRM) frontend engineered for sales teams and account executives. Built with **React 19**, **TypeScript**, **Vite 7**, **Tailwind CSS v4**, and **Flowbite React**, Anvaya CRM delivers a responsive, visually refined dashboard, complete lead lifecycle management, sales agent directories, and deep pipeline analytics.

---

## 📑 Table of Contents

- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
  - [Build and Production](#build-and-production)
- [Application Architecture](#-application-architecture)
  - [Routing & Navigation](#routing--navigation)
  - [State Management & Context](#state-management--context)
  - [API Communication & Proxying](#api-communication--proxying)
  - [Theme & Styling](#theme--styling)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)

---

## ✨ Key Features

### 1. 📊 Executive Dashboard
- **Real-Time KPIs**: Metric cards displaying Total Leads, Active Leads, Conversion Rate (%), and Deals Closed with period-over-period percentage change indicators.
- **Monthly Pipeline Health**: Visual progress bar tracking conversion efficiency and pipeline volume.
- **Dynamic Lead Feed**: Tabbed quick-filters (`All`, `New`, `Contacted`, `Qualified`, `Proposal`, `Closed`) for instant access to high-priority opportunities.

### 2. 🎯 Complete Lead Management
- **Table View (`/leads`)**: Multi-column data table with sorting by priority and time-to-close, pagination, multi-select checkboxes, and batch deletion.
- **Kanban Status Board (`/leads/status`)**: Visual workflow tracking across progression columns (`New`, `Contacted`, `Qualified`, `Proposal`, `Closed`).
- **Agent Distribution (`/leads/agents`)**: Quick breakdown and filtering of leads grouped by assigned sales representatives.
- **Detailed Lead Dossier (`/leads/:id`)**: Comprehensive lead view displaying contact information, company, source channel, timeline history, tags, and an integrated comments feed with agent attribution.
- **Lead Creation & Editing**: Modal form with automatic validations, tag assignment, sales agent selection, and priority classification.

### 3. 👥 Sales Agent Management (`/agents`)
- **Representative Directory**: Cards detailing agent name, email, operational status (`ACTIVE`, `ONCALL`, `OFFLINE`), and assigned performance metrics.
- **Agent CRUD Operations**: Interactive modals to onboard new agents or update existing profiles.
- **Search & Filter**: Real-time name/email search and status filtering.

### 4. 📈 Pipeline & Analytics Engine (`/reports`)
- **Flexible Date Filtering**: Filter analytics by standard presets (`last-week`, `last-month`, `last-3-months`, `last-year`) or custom date ranges (`startDate` / `endDate`).
- **Pipeline Breakdown**: In-pipeline vs. closed deals comparison.
- **Performance by Agent**: Aggregated closed deals mapped per sales representative.
- **Status Distribution**: Multi-chart visualization suite powered by Chart.js (Bar Chart, Doughnut Chart, Line Chart, Pie Chart, Polar Area Chart).
- **Month-over-Month Comparison**: Calculates change in total leads, active leads, closed deals, and conversion rates.

### 5. 🔍 Advanced Filtering & Search
- **Debounced Search**: Optimized 400ms debouncing across lead names, companies, and emails.
- **Multi-Factor Filter Drawer**: Filter simultaneously by status, assigned agent, priority level, acquisition source, tags, and custom sort order.
- **URL Parameter Sync**: Search terms and active filters synchronize with URL parameters for shareable states.

### 6. 🌓 Responsive & Theme-Aware UI
- **Dark Mode Support**: Seamless toggle between light and dark themes using Flowbite React theme utilities and Tailwind CSS variants.
- **Responsive Layout**: Collapsible mobile navigation drawer with sticky topbar and desktop sidebar.

---

## 🛠 Technology Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Component-based UI library |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Type safety and autocompletion (~5.8.3) |
| **Build Tool** | [Vite 7](https://vite.dev/) | Lightning-fast HMR and bundling |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS framework |
| **UI Components** | [Flowbite React](https://flowbite-react.com/) | Enterprise-ready accessible UI primitives |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) | Server state caching, optimistic updates, and background refetching |
| **Routing** | [React Router v7/v8](https://reactrouter.com/) | Client-side routing with nested layouts |
| **Data Visualization** | [Chart.js](https://www.chartjs.org/) & [React-Chartjs-2](https://react-chartjs-2.js.org/) | Canvas charts (Bar, Doughnut, Line, Pie, Polar) |
| **Animations** | [Motion](https://motion.dev/) | Fluid micro-interactions and transitions |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) | Feather/Heroicons suite (`react-icons/hi`) |
| **Date Utilities** | [date-fns](https://date-fns.org/) | Lightweight modern date manipulation |

---

## 📁 Project Structure

```text
client/
├── public/                     # Static assets and favicon
├── src/
│   ├── api/                    # API client abstraction functions
│   │   ├── agents.ts           # Fetch, add, and delete sales agents
│   │   ├── comments.ts         # Fetch and create lead comments
│   │   ├── leads.ts            # CRUD endpoints for leads
│   │   └── reports.ts          # Pipeline, status, and agent analytics
│   ├── components/             # Reusable UI component modules
│   │   ├── agents/             # AgentList, AgentsSkeleton, AgentFooter
│   │   ├── charts/             # Bar, Doughnut, Line, Pie, PolarArea charts
│   │   ├── dashboard/          # StatsCard, LeadsSection, LeadCard
│   │   ├── lead/               # LeadsTable, LeadsFilterSidebar, StatusColumn, etc.
│   │   ├── reports/            # DateRangeFilter, ReportSummaryCards
│   │   ├── AddLeadModal.tsx    # Modal form to create or edit leads
│   │   ├── AppSidebar.tsx      # Persistent application navigation sidebar
│   │   ├── SalesAgentModel.tsx # Agent creation & edit modal
│   │   ├── ToastNotification.tsx # Notification banner
│   │   └── TopNavbar.tsx       # Header with search, theme switch, and profile
│   ├── context/
│   │   └── MainProvider.tsx    # Global state (search, filters, toasts, pagination)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAgents.tsx       # React Query hooks for agents
│   │   ├── useComments.tsx     # React Query hooks for comments
│   │   ├── useDebounce.tsx     # Generic debouncing hook
│   │   ├── useFilterReducer.tsx# Reducer for complex multi-parameter filters
│   │   ├── useLeads.tsx        # React Query hooks for leads CRUD
│   │   ├── useNotification.tsx # Notification trigger helper
│   │   └── useReports.tsx      # Analytics & reporting query hooks
│   ├── layouts/
│   │   └── MainLayout.tsx      # Master layout (Sidebar + TopNavbar + Content Outlet)
│   ├── pages/                  # Page-level route views
│   │   ├── Agents.tsx          # Sales agent directory
│   │   ├── Dashboard.tsx       # Main KPI and sales overview
│   │   ├── LeadManagement.tsx  # Lead detail & timeline view
│   │   ├── Leads.tsx           # Table view with batch actions
│   │   ├── LeadsByAgents.tsx   # Leads segmented by sales agent
│   │   ├── LeadsByStatus.tsx   # Kanban-style status board
│   │   ├── Profile.tsx         # User profile page
│   │   ├── Reports.tsx         # Analytical dashboards & charts
│   │   ├── Sales.tsx           # Sales metrics
│   │   └── Settings.tsx        # Application preferences
│   ├── utilis/                 # Mock seed data and helper functions
│   ├── App.tsx                 # Route declarations
│   ├── index.css               # Global Tailwind CSS and custom animations
│   └── main.tsx                # React DOM entrypoint & Providers
├── eslint.config.js            # ESLint rules and TypeScript configuration
├── package.json                # Dependencies and scripts
├── prettier.config.js          # Code formatting configuration
├── tsconfig.json               # TypeScript compiler options
├── vercel.json                 # Vercel deployment & API rewrite configuration
└── vite.config.ts              # Vite configuration & dev proxy
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher recommended
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)
- **Backend API**: The [Backend Server](../server/README.md) running locally or hosted on Vercel.

### Installation
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
Start the Vite development server:
```bash
npm run dev
```
The application will launch at `http://localhost:5173` (or the next available port).

> [!NOTE]
> During local development, API requests matching `/api/*` are automatically forwarded to the backend via Vite's dev server proxy configured in [`vite.config.ts`](file:///d:/Major%20Projects/MP%202/client/vite.config.ts). If you are running the backend locally on port 3000, update the proxy target to `http://localhost:3000`.

### Build and Production
Type-check and compile the production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 🏗 Application Architecture

### Routing & Navigation
Routing is configured in [`App.tsx`](file:///d:/Major%20Projects/MP%202/client/src/App.tsx) wrapped in `MainLayout`:
- `/` — Main Executive Dashboard
- `/leads` — Leads table view with filters, pagination, and multi-deletion
- `/leads/status` — Kanban status board
- `/leads/agents` — Agent-grouped leads view
- `/leads/:id` — Single lead detail, history, and comments feed
- `/agents` — Sales agent management
- `/reports` — Reporting suite, chart analytics, and date filter engine
- `/profile` — User profile details
- `/settings` — Settings and preferences

### State Management & Context
Global application state is orchestrated through [`MainProvider.tsx`](file:///d:/Major%20Projects/MP%202/client/src/context/MainProvider.tsx):
- **Search & Debouncing**: Keeps input snappy while reducing API requests via `useDebounce(search, 400)`.
- **Query Parameter Builder**: Synchronizes filters, sorting options, and pagination into serialized query strings for TanStack Query.
- **Filter Reducer**: Encapsulates state updates for complex multi-attribute lead filtering.
- **Toast Notifications**: System-wide success and error feedback banners.

### API Communication & Proxying
Client requests interact with `/api/*` endpoints. 
- In development: Proxied via Vite dev server.
- In production: Handled via `rewrites` in [`vercel.json`](file:///d:/Major%20Projects/MP%202/client/vercel.json):
  ```json
  {
    "rewrites": [
      {
        "source": "/api/:path*",
        "destination": "https://anvaya-api.vercel.app/api/:path*"
      },
      {
        "source": "/(.*)",
        "destination": "/index.html"
      }
    ]
  }
  ```

### Theme & Styling
- Styled with **Tailwind CSS v4** with the modern `@import "tailwindcss";` syntax.
- Dark mode is configured with class-based variants (`@custom-variant dark (&:where(.dark, .dark *));`), fully compatible with Flowbite React's `ThemeInit` and `initThemeMode()`.

---

## 📜 Available Scripts

In the `client` directory, you can run:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and bundles static assets |
| `npm run preview` | Runs a local web server to preview the production bundle |
| `npm run lint` | Lints TypeScript and TSX files using ESLint 9 |
| `npm run format` | Formats the codebase using Prettier with Tailwind CSS plugin |
| `npm run format:check` | Verifies whether codebase adheres to Prettier formatting rules |

---

## ☁️ Deployment

The client is configured for zero-configuration deployment on **Vercel**:
1. Connect the repository to Vercel.
2. Set the **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. SPA routing and `/api` proxying are handled by [`vercel.json`](file:///d:/Major%20Projects/MP%202/client/vercel.json).
