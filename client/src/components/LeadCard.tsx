// import { Badge } from "flowbite-react";

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "New" | "Contacted" | "Qualified" | "Proposal" | "Closed";
  value: string;
  agent: string;
  date: string;
  avatar: string;
}

const statusConfig: Record<
  Lead["status"],
  { color: string; dot: string; badge: string }
> = {
  New: {
    color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
    dot: "bg-blue-500",
    badge: "blue",
  },
  Contacted: {
    color:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
    dot: "bg-amber-500",
    badge: "yellow",
  },
  Qualified: {
    color:
      "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
    dot: "bg-violet-500",
    badge: "purple",
  },
  Proposal: {
    color:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
    dot: "bg-orange-500",
    badge: "warning",
  },
  Closed: {
    color:
      "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    dot: "bg-green-500",
    badge: "success",
  },
};

interface LeadCardProps {
  lead: Lead;
}

export default function LeadCard({ lead }: LeadCardProps) {
  const cfg = statusConfig[lead.status];

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-violet-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-700">
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={lead.avatar}
          alt={lead.name}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
            {lead.name}
          </p>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${cfg.color}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {lead.status}
          </span>
        </div>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {lead.company}
        </p>
        <p className="mt-0.5 truncate text-xs text-gray-400 dark:text-gray-500">
          {lead.email}
        </p>
      </div>

      {/* Value & Agent */}
      <div className="hidden flex-col items-end gap-1 text-right sm:flex">
        <p className="text-sm font-bold text-gray-900 dark:text-white">
          {lead.value}
        </p>
        <p className="text-[11px] text-gray-400 dark:text-gray-500">
          {lead.agent}
        </p>
        <p className="text-[11px] text-gray-300 dark:text-gray-600">
          {lead.date}
        </p>
      </div>

      {/* Action Button */}
      <button className="ml-1 shrink-0 rounded-xl border border-gray-200 bg-gray-50 p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-violet-50 hover:border-violet-200 dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-violet-900/30">
        <svg
          className="h-4 w-4 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
