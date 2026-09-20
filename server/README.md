# ⚙️ Anvaya CRM — Backend REST API

A scalable, modular RESTful API powering the Anvaya CRM platform. Built with **Node.js (ES Modules)**, **Express 5**, and **Mongoose 9** connected to **MongoDB**, this service provides comprehensive lead lifecycle tracking, sales representative management, activity commentary, and high-performance analytical aggregations.

---

## 📑 Table of Contents

- [Key Highlights](#-key-highlights)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Database Models & Schemas](#-database-models--schemas)
  - [Lead](#1-lead-model)
  - [Sales Agent](#2-sales-agent-model)
  - [Comments](#3-comments-model)
  - [Tags](#4-tag-model)
- [API Reference](#-api-reference)
  - [Health Check](#health-check)
  - [Sales Agents Endpoints](#sales-agents-endpoints)
  - [Leads Endpoints](#leads-endpoints)
  - [Comments Endpoints](#comments-endpoints)
  - [Reports & Analytics Endpoints](#reports--analytics-endpoints)
- [Date Filtering Middleware](#-date-filtering-middleware)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Deployment (Vercel Serverless)](#-deployment-vercel-serverless)

---

## ⚡ Key Highlights

- **Serverless-Optimized Connection Pool**: MongoDB connection handling caches connections across serverless invocations (`connections[0].readyState`), preventing connection starvation.
- **Express 5 Ready**: Leverages native promise handling and modern HTTP routing.
- **Automated Schema Logic**: Mongoose pre-save and pre-update hooks automatically compute `priorityWeight` to support efficient, index-friendly priority sorting.
- **Advanced Aggregation Pipelines**: Built-in MongoDB aggregation pipelines deliver instant business metrics, conversion rates, and agent leaderboards.
- **Flexible Date Middleware**: Centralized query middleware for computing dynamic date intervals (`last-week`, `last-month`, `last-3-months`, `last-year`, and custom ranges).

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | 18+ (ES Modules) | Server runtime (`"type": "module"`) |
| **Express** | `^5.2.1` | Web framework and routing engine |
| **Mongoose** | `^9.7.4` | MongoDB Object Data Modeling (ODM) |
| **MongoDB** | 6.0+ / Atlas | NoSQL database |
| **date-fns** | `^4.4.0` | High-performance date calculations |
| **cors** | `^2.8.6` | Cross-Origin Resource Sharing control |
| **dotenv** | `^17.4.2` | Environment configuration management |
| **nodemon** | `^3.1.14` | Development auto-reload watcher |

---

## 📁 Project Architecture

```text
server/
├── api/
│   └── index.js               # Application entrypoint, middleware, and Vercel handler
├── db/
│   └── db.connect.js          # MongoDB connection initializer with connection reuse
├── models/
│   ├── comments.model.js      # Lead comment & author reference schema
│   ├── leads.model.js         # Lead schema with lifecycle status and priority hooks
│   ├── salesAgent.model.js    # Sales representative profile schema
│   └── tag.model.js           # Categorization tag schema
├── routes/
│   ├── agents.route.js        # Agents CRUD and search/pagination endpoints
│   ├── comments.route.js      # Comments retrieval and submission endpoints
│   ├── leads.route.js         # Lead CRUD, batch deletion, and complex filtering
│   └── reports.route.js       # Analytical aggregations and conversion calculations
├── utilis/
│   └── dateFilterMiddleware.js# Middleware parsing date bounds from query parameters
├── .env                       # Local environment variables
├── package.json               # Dependencies and scripts
└── vercel.json                # Vercel serverless rewrite configuration
```

---

## 🗄 Database Models & Schemas

### 1. Lead Model (`models/leads.model.js`)
Represents potential customer deals and sales inquiries.

| Field | Type | Description / Constraints |
| :--- | :--- | :--- |
| `name` | `String` | Required. Auto-capitalized on save. Indexed. |
| `company` | `String` | Required. Auto-capitalized on save. Indexed. |
| `email` | `String` | Required. Validated via regex. Indexed. |
| `avatar` | `String` | Profile image URL (default: default profile asset). |
| `source` | `String` | Enum: `['Website', 'Referral', 'Cold Call', 'Advertisement', 'Email', 'Other']`. |
| `salesAgent` | `ObjectId` | Reference to `SalesAgent`. Required. |
| `status` | `String` | Enum: `['New', 'Contacted', 'Qualified', 'Proposal', 'Closed']`. Default: `'New'`. |
| `tags` | `[String]` | Array of categorical tags. |
| `timeToClose` | `Number` | Estimated or actual days to close. Positive integer. |
| `priority` | `String` | Enum: `['High', 'Medium', 'Low']`. Default: `'Medium'`. |
| `priorityWeight` | `Number` | Computed automatically (`High: 1`, `Medium: 2`, `Low: 3`) via middleware hooks. |
| `closedAt` | `Date` | Timestamp stamped when status moves to `Closed`. |
| `timestamps` | `Boolean` | Automatic `createdAt` and `updatedAt`. |

### 2. Sales Agent Model (`models/salesAgent.model.js`)
Represents internal sales executives.

| Field | Type | Description / Constraints |
| :--- | :--- | :--- |
| `name` | `String` | Required. Representative's full name. |
| `email` | `String` | Required. Unique. Representative's email address. |
| `status` | `String` | Enum: `['ACTIVE', 'ONCALL', 'OFFLINE']`. Default: `'OFFLINE'`. |
| `createdAt` | `Date` | Timestamp of onboarding (default: `Date.now`). |

### 3. Comments Model (`models/comments.model.js`)
Enables activity logging and notes on leads.

| Field | Type | Description / Constraints |
| :--- | :--- | :--- |
| `leadId` | `ObjectId` | Reference to target `Lead`. Required. |
| `author` | `ObjectId` | Reference to `SalesAgent` who created the note. Required. |
| `commentText` | `String` | Note content. Required. |
| `createdAt` | `Date` | Timestamp of comment creation. |

### 4. Tag Model (`models/tag.model.js`)
Categorization labels for organizing leads.

| Field | Type | Description / Constraints |
| :--- | :--- | :--- |
| `name` | `String` | Tag label. Unique and required. |
| `createdAt` | `Date` | Creation timestamp. |

---

## 📡 API Reference

Base URL (Local): `http://localhost:3000`  
Base Route: `/api`

### Health Check
- **`GET /`**
  - **Response**: `{ "message": "This is anvaya server" }`

---

### Sales Agents Endpoints

#### `POST /api/agents`
Creates a new sales agent, or updates an existing agent if `agentId` is supplied.
- **Request Body**:
  ```json
  {
    "agentId": "optional_mongo_object_id",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Response**: `201 Created` or `200 OK` with confirmation message.

#### `GET /api/agents`
Retrieves a paginated list of sales representatives.
- **Query Parameters**:
  - `page` (number, default: `1`)
  - `limit` (number, default: `5`)
  - `search` (string) — Case-insensitive regex match on `name` or `email`
  - `status` (string) — Filter by `ACTIVE`, `ONCALL`, or `OFFLINE`
- **Response**:
  ```json
  {
    "agents": [ ... ],
    "totalAgents": 12,
    "totalPages": 3,
    "currentPage": 1
  }
  ```

#### `DELETE /api/agents/:id`
Deletes a sales agent by ID.
- **Response**: `{ "success": true, "message": "Agent deleted successfully" }`

---

### Leads Endpoints

#### `POST /api/leads`
Creates a new sales lead.
- **Request Body**:
  ```json
  {
    "name": "Sarah Jenkins",
    "company": "Apex Dynamics",
    "email": "sarah@apexdynamics.com",
    "avatar": "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
    "source": "Website",
    "salesAgent": "64f1a2b3c4d5e6f7a8b9c0d1",
    "status": "New",
    "tags": ["Inbound", "Enterprise"],
    "timeToClose": 14,
    "priority": "High"
  }
  ```
- **Response**: `200 OK` with created `lead` object.

#### `GET /api/leads`
Retrieves paginated leads with multi-facet filtering and sorting.
- **Query Parameters**:
  - `page` (number, default: `1`)
  - `limit` (number, default: `10`)
  - `search` (string) — Search matches against `name`, `company`, or `email`
  - `agent` (ObjectId) — Filter by assigned `salesAgent`
  - `status` (string) — Filter by lead status
  - `tags` (string or array) — Filter leads containing specific tag(s)
  - `source` (string) — Filter by lead acquisition channel
  - `priority` (`High` \| `Medium` \| `Low` \| `asc` \| `desc`) — Value filter or sort by priority weight
  - `timeToClose` (`asc` \| `desc`) — Sort order for estimated days to close
- **Response**:
  ```json
  {
    "leads": [ ... ],
    "totalLeads": 48,
    "totalPages": 5,
    "currentPage": 1
  }
  ```

#### `GET /api/leads/details/:id`
Returns a single lead by its MongoDB ObjectId, with populated `salesAgent` details.

#### `PUT /api/leads/:id`
Updates an existing lead. If `status` is set to `"Closed"`, `closedAt` is automatically set to the current timestamp.
- **Request Body**: Full lead fields payload.

#### `DELETE /api/leads`
Bulk deletes multiple leads in a single operation.
- **Request Body**:
  ```json
  {
    "leadIds": [
      "64f1a2b3c4d5e6f7a8b9c0d1",
      "64f1a2b3c4d5e6f7a8b9c0d2"
    ]
  }
  ```
- **Response**: `{ "success": true, "message": "2 leads deleted successfully." }`

---

### Comments Endpoints

#### `POST /api/leads/:id/comments`
Adds a new note/comment to a specific lead.
- **Request Body**:
  ```json
  {
    "author": "64f1a2b3c4d5e6f7a8b9c0d1",
    "commentText": "Client requested an updated contract proposal with quarterly milestones."
  }
  ```
- **Response**: `200 OK` with created `comment` object.

#### `GET /api/leads/:id/comments`
Fetches all comments for a given lead, sorted newest first (`createdAt: -1`), with populated `author` details.

---

### Reports & Analytics Endpoints

All report endpoints pass through the `dateFilter` middleware and support the date query parameters (`range`, `startDate`, `endDate`).

#### `GET /api/report/pipeline`
Calculates total leads currently in pipeline (`status != Closed`) versus closed leads (`status == Closed`) within the date window.
- **Response**:
  ```json
  {
    "totalLeadsInPipeline": 35,
    "totalLeadsClosed": 12
  }
  ```

#### `GET /api/report/leads-closed-by-agents`
Aggregates and counts closed deals per sales agent within the selected date window.
- **Response**:
  ```json
  [
    { "name": "Arjun Singh", "leadsClosed": 7 },
    { "name": "Neha Kapoor", "leadsClosed": 5 }
  ]
  ```

#### `GET /api/report/status-distribution`
Aggregates lead counts grouped by status within the selected date window.
- **Response**:
  ```json
  [
    { "status": "New", "leadCount": 18 },
    { "status": "Contacted", "leadCount": 12 },
    { "status": "Qualified", "leadCount": 9 },
    { "status": "Proposal", "leadCount": 6 },
    { "status": "Closed", "leadCount": 14 }
  ]
  ```

#### `GET /api/report/last-month-comparison`
Computes comparative month-over-month performance KPIs between the current month and previous month:
- **Metrics returned**:
  - `totalLeadsOfTheMonth` & `changeInLeads` (% change)
  - `totalLeadsClosedThisMonth` & `changeInClosedLeads` (% change)
  - `activeLeads` & `changeInActiveLeads` (% change)
  - `conversionRateThisMonth` & `changeInConversionRate`

---

## 🗓 Date Filtering Middleware

The date filter middleware ([`utilis/dateFilterMiddleware.js`](file:///d:/Major%20Projects/MP%202/server/utilis/dateFilterMiddleware.js)) calculates boundary timestamps and attaches `req.dateFilter` to incoming reporting requests.

### Supported Query Parameters:
- `range`:
  - `last-week` — Past 7 days
  - `last-month` — Past 30/31 days (default)
  - `last-3-months` — Past 90 days
  - `last-year` — Past 365 days
  - `custom` — Evaluates explicit `startDate` and `endDate` parameters
- `startDate`: ISO date string (used when `range=custom`)
- `endDate`: ISO date string (used when `range=custom`)

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
# MongoDB Connection String
MONGODB=mongodb+srv://<username>:<password>@cluster0.mongodb.net/anvaya?retryWrites=true&w=majority

# Port (Optional, defaults to 3000)
PORT=3000
```

> [!IMPORTANT]
> Never commit your production `.env` credentials to source control.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: A running local MongoDB daemon or MongoDB Atlas connection URI

### Installation
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` configuration file.

### Running the Server
- **Development Mode** (with hot-reload via Nodemon):
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```
The server will start and output:
```text
Server running on port 3000
Connected to database
```

---

## ☁️ Deployment (Vercel Serverless)

The server is architected to deploy seamlessly as a Vercel Serverless Function:
1. Entry file [`api/index.js`](file:///d:/Major%20Projects/MP%202/server/api/index.js) exports the Express application instance (`export default app`).
2. Configuration [`vercel.json`](file:///d:/Major%20Projects/MP%202/server/vercel.json) rewrites all inbound requests to `/api/index.js`:
   ```json
   {
     "version": 2,
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/api/index.js"
       }
     ]
   }
   ```
3. Add the `MONGODB` environment variable to your Vercel Project Settings under **Environment Variables**.
