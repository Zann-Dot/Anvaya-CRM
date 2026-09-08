import { Badge } from "flowbite-react";
import { HiOutlineClock, HiOutlineUserCircle, HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Lead } from "../dashboard/LeadCard";

export interface DummyStatusLead {
  id: string;
  name: string;
  company: string;
  email: string;
  salesAgent: {
    name: string;
    email: string;
    avatar?: string;
  };
  priority: "High" | "Medium" | "Low";
  timeToClose: number;
  tags: string[];
  dealValue?: string;
  createdDate: string;
}

interface StatusLeadCardProps {
  lead: Lead;
  status: string;
}

const PRIORITY_BADGE_CONFIG: Record<
  "High" | "Medium" | "Low",
  { color: "failure" | "warning" | "gray"; label: string }
> = {
  High: { color: "failure", label: "High Priority" },
  Medium: { color: "warning", label: "Medium Priority" },
  Low: { color: "gray", label: "Low Priority" },
};

export default function StatusLeadCard({ lead }: StatusLeadCardProps) {
  const priorityConfig = PRIORITY_BADGE_CONFIG[lead.priority] || PRIORITY_BADGE_CONFIG.Low;

  return (
    <div className="group relative rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-md dark:border-gray-700/70 dark:bg-gray-800 dark:hover:border-violet-600/60">
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0 text-xs text-gray-500 dark:text-gray-400">
          <HiOutlineOfficeBuilding className="h-3.5 w-3.5 shrink-0 text-violet-500" />
          <span className="truncate font-medium">{lead.company}</span>
        </div>
        <Badge color={priorityConfig.color} size="xs" className="shrink-0 font-medium">
          {lead.priority}
        </Badge>
      </div>

      <h4 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
        {lead.name}
      </h4>
      <p className="text-xs text-gray-400 dark:text-gray-500 truncate mb-3">
        {lead.email}
      </p>

      <div className="mb-3 flex items-center justify-between rounded-lg bg-gray-50 p-2 text-xs dark:bg-gray-700/40">
        <div className="flex items-center gap-1.5 min-w-0">
          <HiOutlineUserCircle className="h-4 w-4 shrink-0 text-violet-500" />
          <div className="truncate">
            <span className="text-[11px] text-gray-400 dark:text-gray-400">Sales Agent: </span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              {lead.salesAgent.name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 dark:border-gray-700/60 text-xs">
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <HiOutlineClock className="h-3.5 w-3.5 text-violet-500" />
          <span>{lead.timeToClose}d to close</span>
        </div>

        <Link
          to={`/leads/${lead._id}`}
          className="inline-flex items-center gap-1 font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
        >
          View
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </div>
  );
}
