import { Select, TextInput } from "flowbite-react";
import {
  HiOutlineArrowLeft,
  HiOutlineFilter,
  HiOutlineSearch,
  HiOutlineSortAscending,
  HiOutlineUser,
  HiOutlineViewBoards,
  HiOutlineClock,
  HiOutlineFire,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import LeadsViewTabs from "../components/lead/LeadsViewTabs";
import StatusColumn, { StatusColumnConfig } from "../components/lead/StatusColumn";
import { DummyStatusLead } from "../components/lead/StatusLeadCard";

const STATUS_CONFIGS: StatusColumnConfig[] = [
  {
    status: "New",
    badgeColor: "blue",
    accentColor: "bg-blue-500",
    borderColor: "border-blue-200 dark:border-blue-800/60",
    dotColor: "bg-blue-500",
  },
  {
    status: "Contacted",
    badgeColor: "warning",
    accentColor: "bg-amber-500",
    borderColor: "border-amber-200 dark:border-amber-800/60",
    dotColor: "bg-amber-500",
  },
  {
    status: "Qualified",
    badgeColor: "purple",
    accentColor: "bg-violet-500",
    borderColor: "border-violet-200 dark:border-violet-800/60",
    dotColor: "bg-violet-500",
  },
  {
    status: "Proposal",
    badgeColor: "indigo",
    accentColor: "bg-indigo-500",
    borderColor: "border-indigo-200 dark:border-indigo-800/60",
    dotColor: "bg-indigo-500",
  },
  {
    status: "Closed",
    badgeColor: "success",
    accentColor: "bg-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-800/60",
    dotColor: "bg-emerald-500",
  },
];

// Rich dummy leads categorized by status
const DUMMY_LEADS_BY_STATUS: Record<string, DummyStatusLead[]> = {
  New: [
    {
      id: "dummy-1",
      name: "Acme Cloud Infrastructure",
      company: "Acme Corp",
      email: "contact@acmeweb.io",
      salesAgent: { name: "John Doe", email: "john@anvaya.crm" },
      priority: "High",
      timeToClose: 14,
      dealValue: "$24,500",
      tags: ["Enterprise", "Cloud"],
      createdDate: "2026-03-01",
    },
    {
      id: "dummy-2",
      name: "Nexora Health AI Platform",
      company: "Nexora Health Inc.",
      email: "billing@nexorahealth.com",
      salesAgent: { name: "Jane Smith", email: "jane@anvaya.crm" },
      priority: "Medium",
      timeToClose: 21,
      dealValue: "$18,000",
      tags: ["Healthcare", "AI"],
      createdDate: "2026-03-02",
    },
    {
      id: "dummy-3",
      name: "Starlight Media Outreach",
      company: "Starlight Media Group",
      email: "partnerships@starlight.co",
      salesAgent: { name: "Alex Rivera", email: "alex@anvaya.crm" },
      priority: "Low",
      timeToClose: 35,
      dealValue: "$8,500",
      tags: ["Media"],
      createdDate: "2026-03-04",
    },
  ],
  Contacted: [
    {
      id: "dummy-4",
      name: "HyperScale Logistics Hub",
      company: "HyperScale Global",
      email: "supply@hyperscale.net",
      salesAgent: { name: "John Doe", email: "john@anvaya.crm" },
      priority: "High",
      timeToClose: 10,
      dealValue: "$42,000",
      tags: ["Logistics", "SaaS"],
      createdDate: "2026-02-24",
    },
    {
      id: "dummy-5",
      name: "Veritas Cyber Defense",
      company: "Veritas Security",
      email: "secops@veritassecurity.io",
      salesAgent: { name: "Sarah Connor", email: "sarah@anvaya.crm" },
      priority: "Medium",
      timeToClose: 18,
      dealValue: "$15,200",
      tags: ["Security"],
      createdDate: "2026-02-26",
    },
  ],
  Qualified: [
    {
      id: "dummy-6",
      name: "Quantum Retail Analytics",
      company: "Quantum Commerce",
      email: "lead@quantumretail.com",
      salesAgent: { name: "Jane Smith", email: "jane@anvaya.crm" },
      priority: "High",
      timeToClose: 7,
      dealValue: "$55,000",
      tags: ["Retail", "Analytics"],
      createdDate: "2026-02-18",
    },
    {
      id: "dummy-7",
      name: "BluePeak Financial Suite",
      company: "BluePeak Capital",
      email: "fintech@bluepeak.org",
      salesAgent: { name: "Alex Rivera", email: "alex@anvaya.crm" },
      priority: "Medium",
      timeToClose: 12,
      dealValue: "$32,000",
      tags: ["Fintech"],
      createdDate: "2026-02-20",
    },
  ],
  Proposal: [
    {
      id: "dummy-8",
      name: "Solaris Green Energy ERP",
      company: "Solaris Energy Ltd.",
      email: "projects@solarisgreen.eu",
      salesAgent: { name: "Sarah Connor", email: "sarah@anvaya.crm" },
      priority: "High",
      timeToClose: 5,
      dealValue: "$78,000",
      tags: ["CleanTech", "ERP"],
      createdDate: "2026-02-10",
    },
    {
      id: "dummy-9",
      name: "OmniChannel Retail Sync",
      company: "OmniChannel Brands",
      email: "omni@channelbrands.com",
      salesAgent: { name: "John Doe", email: "john@anvaya.crm" },
      priority: "Low",
      timeToClose: 15,
      dealValue: "$12,400",
      tags: ["E-Commerce"],
      createdDate: "2026-02-12",
    },
  ],
  Closed: [
    {
      id: "dummy-10",
      name: "AeroDynamics Enterprise Fleet",
      company: "AeroDynamics Global",
      email: "fleet@aerodynamics.com",
      salesAgent: { name: "Jane Smith", email: "jane@anvaya.crm" },
      priority: "High",
      timeToClose: 0,
      dealValue: "$95,000",
      tags: ["Aerospace", "Won"],
      createdDate: "2026-01-28",
    },
    {
      id: "dummy-11",
      name: "Zenith Workspace Pro",
      company: "Zenith Software",
      email: "exec@zenithsoftware.co",
      salesAgent: { name: "Alex Rivera", email: "alex@anvaya.crm" },
      priority: "Medium",
      timeToClose: 0,
      dealValue: "$28,000",
      tags: ["SaaS", "Won"],
      createdDate: "2026-02-01",
    },
  ],
};

export default function LeadsByStatus() {
  const totalLeadsCount = Object.values(DUMMY_LEADS_BY_STATUS).reduce(
    (acc, list) => acc + list.length,
    0,
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      {/* Top Bar matching reference: Leads by Status title & Back to Dashboard */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-xs transition-colors hover:bg-gray-50 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              title="Back to Dashboard"
            >
              <HiOutlineArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Dashboard</span>
            </Link>

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              <HiOutlineViewBoards className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leads by Status
            </h1>
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              {totalLeadsCount} categorized
            </span>
          </div>
          <p className="mt-1 pl-1 text-sm text-gray-500 dark:text-gray-400">
            Categorized lead board with per-status filtering and closing time sorting.
          </p>
        </div>

        {/* View Switcher: Table View vs By Status */}
        <div className="flex items-center gap-3">
          <LeadsViewTabs />
        </div>
      </div>

      {/* Filter and Sort Toolbar (Flowbite UI components matching reference wireframe) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Search bar UI */}
          <div className="w-full lg:max-w-xs">
            <TextInput
              id="status-lead-search"
              type="search"
              icon={HiOutlineSearch}
              placeholder="Search leads by name, company..."
              className="w-full"
            />
          </div>

          {/* Filters & Sorting controls matching reference image */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by Sales Agent */}
            <div className="flex items-center gap-1.5">
              <HiOutlineUser className="h-4 w-4 shrink-0 text-gray-400" />
              <Select id="filter-sales-agent" className="w-44" defaultValue="all">
                <option value="all">Filters: All Agents</option>
                <option value="john">Sales Agent: John Doe</option>
                <option value="jane">Sales Agent: Jane Smith</option>
                <option value="alex">Sales Agent: Alex Rivera</option>
                <option value="sarah">Sales Agent: Sarah Connor</option>
              </Select>
            </div>

            {/* Filter by Priority */}
            <div className="flex items-center gap-1.5">
              <HiOutlineFire className="h-4 w-4 shrink-0 text-gray-400" />
              <Select id="filter-priority" className="w-36" defaultValue="all">
                <option value="all">Filters: Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </Select>
            </div>

            {/* Sort by Time to Close */}
            <div className="flex items-center gap-1.5">
              <HiOutlineClock className="h-4 w-4 shrink-0 text-gray-400" />
              <Select id="sort-time-to-close" className="w-48" defaultValue="all">
                <option value="all">Sort by: Time to Close</option>
                <option value="asc">Time to Close: Shortest</option>
                <option value="desc">Time to Close: Longest</option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board of Leads Categorized by Status */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-start gap-4 min-w-max">
          {STATUS_CONFIGS.map((colConfig) => (
            <StatusColumn
              key={colConfig.status}
              config={colConfig}
              leads={DUMMY_LEADS_BY_STATUS[colConfig.status] || []}
            />
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="flex flex-wrap items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs text-gray-500 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Status breakdown:</span>
          {STATUS_CONFIGS.map((cfg) => (
            <span key={cfg.status} className="inline-flex items-center gap-1 font-medium">
              <span className={`h-2 w-2 rounded-full ${cfg.dotColor}`} />
              {cfg.status}:{" "}
              <strong className="text-gray-900 dark:text-white">
                {DUMMY_LEADS_BY_STATUS[cfg.status]?.length || 0}
              </strong>
            </span>
          ))}
        </div>
        <p className="italic">
          Displaying categorized status view • Non-functional preview
        </p>
      </div>
    </div>
  );
}
