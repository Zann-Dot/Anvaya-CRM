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
import LEADS from "../utilis/Leads";

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
    value: "6",
    change: "8%",
    positive: false,
    icon: <HiOutlineCheckCircle className="h-6 w-6" />,
    color: "bg-amber-500",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6">
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
              <span className="font-semibold text-white">8 new leads</span>{" "}
              waiting for review.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatsCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}
