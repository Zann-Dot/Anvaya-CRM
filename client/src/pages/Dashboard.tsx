import { useState } from "react";
import { Button } from "flowbite-react";
import {
  HiOutlinePlus,
  HiOutlineUserGroup,
  HiOutlineCollection,
  HiOutlineTrendingUp,
  HiOutlineCheckCircle,
  HiOutlineFilter,
  HiOutlineViewGrid,
  HiOutlineViewList,
} from "react-icons/hi";
import StatsCard from "../components/StatsCard";
import LeadCard, { type Lead } from "../components/LeadCard";

const LEADS: Lead[] = [
  {
    id: "1",
    name: "Priya Mehta",
    company: "TechNova Pvt Ltd",
    email: "priya.mehta@technova.in",
    phone: "+91 98765 43210",
    status: "New",
    value: "₹4,20,000",
    agent: "Arjun Singh",
    date: "Jul 22, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Priya",
  },
  {
    id: "2",
    name: "Rahul Verma",
    company: "BlueSky Solutions",
    email: "rahul.v@bluesky.io",
    phone: "+91 87654 32109",
    status: "Contacted",
    value: "₹7,80,000",
    agent: "Neha Kapoor",
    date: "Jul 21, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul",
  },
  {
    id: "3",
    name: "Sneha Iyer",
    company: "Horizon Fintech",
    email: "sneha.iyer@horizonfin.com",
    phone: "+91 76543 21098",
    status: "Qualified",
    value: "₹12,50,000",
    agent: "Arjun Singh",
    date: "Jul 20, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha",
  },
  {
    id: "4",
    name: "Amit Desai",
    company: "GreenLeaf Exports",
    email: "amit.desai@greenleaf.co",
    phone: "+91 65432 10987",
    status: "Proposal",
    value: "₹9,30,000",
    agent: "Meera Joshi",
    date: "Jul 19, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Amit",
  },
  {
    id: "5",
    name: "Kavya Nair",
    company: "Sparkle Retail",
    email: "kavya.n@sparkleretail.com",
    phone: "+91 54321 09876",
    status: "Closed",
    value: "₹3,60,000",
    agent: "Rohan Sharma",
    date: "Jul 18, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Kavya",
  },
  {
    id: "6",
    name: "Vikram Patel",
    company: "Nexgen Logistics",
    email: "vikram.p@nexgenlog.in",
    phone: "+91 43210 98765",
    status: "New",
    value: "₹5,10,000",
    agent: "Neha Kapoor",
    date: "Jul 17, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram",
  },
  {
    id: "7",
    name: "Ananya Bose",
    company: "CloudPeak Technologies",
    email: "ananya.bose@cloudpeak.tech",
    phone: "+91 32109 87654",
    status: "Contacted",
    value: "₹6,70,000",
    agent: "Meera Joshi",
    date: "Jul 16, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Ananya",
  },
  {
    id: "8",
    name: "Siddharth Rao",
    company: "Meridian Healthcare",
    email: "siddharth.rao@meridian.co",
    phone: "+91 21098 76543",
    status: "Qualified",
    value: "₹15,00,000",
    agent: "Arjun Singh",
    date: "Jul 15, 2026",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Siddharth",
  },
];

const STATUS_FILTERS = [
  "All",
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Closed",
] as const;

type FilterType = (typeof STATUS_FILTERS)[number];

const filterBadgeColor: Record<FilterType, string> = {
  All: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Qualified:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Proposal:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  Closed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

const activeFilterStyle: Record<FilterType, string> = {
  All: "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900",
  New: "bg-blue-600 text-white",
  Contacted: "bg-amber-500 text-white",
  Qualified: "bg-violet-600 text-white",
  Proposal: "bg-orange-500 text-white",
  Closed: "bg-green-600 text-white",
};

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredLeads =
    activeFilter === "All"
      ? LEADS
      : LEADS.filter((l) => l.status === activeFilter);

  const statusCounts = STATUS_FILTERS.slice(1).reduce(
    (acc, s) => {
      acc[s] = LEADS.filter((l) => l.status === s).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const stats = [
    {
      label: "Total Leads",
      value: LEADS.length,
      change: "12%",
      positive: true,
      icon: <HiOutlineCollection className="h-6 w-6" />,
      color: "bg-violet-500",
    },
    {
      label: "Active Agents",
      value: 4,
      change: "5%",
      positive: true,
      icon: <HiOutlineUserGroup className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      label: "Conversion Rate",
      value: "23.5%",
      change: "3.2%",
      positive: true,
      icon: <HiOutlineTrendingUp className="h-6 w-6" />,
      color: "bg-emerald-500",
    },
    {
      label: "Deals Closed",
      value: statusCounts["Closed"],
      change: "8%",
      positive: false,
      icon: <HiOutlineCheckCircle className="h-6 w-6" />,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute -bottom-10 left-20 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        </div>
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-violet-200">
              Wednesday, July 23, 2026
            </p>
            <h2 className="mt-1 text-2xl font-bold">Good morning, Rohan! 👋</h2>
            <p className="mt-1 text-sm text-violet-200">
              You have{" "}
              <span className="font-semibold text-white">
                {statusCounts["New"]} new leads
              </span>{" "}
              waiting for review.
            </p>
          </div>
          <div className="hidden flex-col items-end gap-2 sm:flex">
            <div className="rounded-xl bg-white/20 px-4 py-2 text-center backdrop-blur-sm">
              <p className="text-xs text-violet-200">Pipeline Value</p>
              <p className="text-xl font-bold">₹64,20,000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      {/* Leads Section */}
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
          <div className="flex items-center gap-2">
            <HiOutlineCollection className="h-5 w-5 text-violet-500" />
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Lead Management
            </h3>
            <span className="ml-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
              {LEADS.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Toggle */}
            <div className="flex rounded-xl border border-gray-200 p-1 dark:border-gray-700">
              <button
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-1.5 transition-colors ${viewMode === "list"
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
              >
                <HiOutlineViewList className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-1.5 transition-colors ${viewMode === "grid"
                    ? "bg-violet-600 text-white"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
              >
                <HiOutlineViewGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Add Lead Button */}
            <Button
              size="sm"
              className="border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700 focus:ring-violet-300"
            >
              <HiOutlinePlus className="mr-1.5 h-4 w-4" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3 dark:border-gray-700">
          <HiOutlineFilter className="h-4 w-4 shrink-0 text-gray-400" />
          {STATUS_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            const count =
              filter === "All" ? LEADS.length : statusCounts[filter];
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${isActive
                    ? activeFilterStyle[filter]
                    : filterBadgeColor[filter]
                  }`}
              >
                {filter}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive
                      ? "bg-white/25 text-white"
                      : "bg-black/10 text-inherit dark:bg-white/10"
                    }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Leads List */}
        <div
          className={`p-4 ${viewMode === "grid" ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}`}
        >
          {filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
                <HiOutlineCollection className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                No leads found
              </p>
              <p className="text-xs text-gray-400">
                Try changing the filter or add a new lead
              </p>
            </div>
          ) : (
            filteredLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-gray-700">
          <p className="text-xs text-gray-400">
            Showing {filteredLeads.length} of {LEADS.length} leads
          </p>
          <button className="text-xs font-medium text-violet-600 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">
            View all leads →
          </button>
        </div>
      </div>

      {/* Bottom Grid: Pipeline + Agents */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Pipeline Overview */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Pipeline Overview
            </h3>
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              This Month
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                stage: "New Leads",
                count: statusCounts["New"],
                widthPct: 30,
                color: "bg-blue-500",
              },
              {
                stage: "Contacted",
                count: statusCounts["Contacted"],
                widthPct: 50,
                color: "bg-amber-500",
              },
              {
                stage: "Qualified",
                count: statusCounts["Qualified"],
                widthPct: 65,
                color: "bg-violet-500",
              },
              {
                stage: "Proposal Sent",
                count: statusCounts["Proposal"],
                widthPct: 20,
                color: "bg-orange-500",
              },
              {
                stage: "Closed Won",
                count: statusCounts["Closed"],
                widthPct: 12.5,
                color: "bg-green-500",
              },
            ].map(({ stage, count, widthPct, color }) => (
              <div key={stage}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {stage}
                  </span>
                  <span className="text-xs font-bold text-gray-900 dark:text-white">
                    {count}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Agents */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Top Agents
            </h3>
            <button className="text-xs font-medium text-violet-600 hover:underline dark:text-violet-400">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {[
              {
                name: "Arjun Singh",
                leads: 3,
                deals: "₹31,70,000",
                pct: 85,
                rank: 1,
                seed: "Arjun",
              },
              {
                name: "Neha Kapoor",
                leads: 2,
                deals: "₹14,50,000",
                pct: 70,
                rank: 2,
                seed: "Neha",
              },
              {
                name: "Meera Joshi",
                leads: 2,
                deals: "₹16,00,000",
                pct: 65,
                rank: 3,
                seed: "Meera",
              },
              {
                name: "Rohan Sharma",
                leads: 1,
                deals: "₹3,60,000",
                pct: 40,
                rank: 4,
                seed: "Rohan",
              },
            ].map(({ name, leads, deals, pct, rank, seed }) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${rank === 1
                      ? "bg-amber-100 text-amber-600"
                      : rank === 2
                        ? "bg-gray-100 text-gray-600"
                        : "bg-orange-50 text-orange-600"
                    }`}
                >
                  {rank}
                </span>
                <img
                  src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`}
                  alt={name}
                  className="h-9 w-9 shrink-0 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    {deals}
                  </p>
                  <p className="text-[10px] text-gray-400">{leads} leads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
