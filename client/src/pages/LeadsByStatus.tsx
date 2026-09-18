import { Select, TextInput } from "flowbite-react";
import {
  HiOutlineSearch,
  HiOutlineUser,
  HiOutlineViewBoards,
  HiOutlineClock,
  HiOutlineFire,
} from "react-icons/hi";
import LeadsViewTabs from "../components/lead/LeadsViewTabs";
import LeadsFilterSidebar from "../components/lead/LeadsFilterSidebar";
import StatusColumn, {
  StatusColumnConfig,
} from "../components/lead/StatusColumn";
import { useLeads } from "../hooks/useLeads";
import useMain from "../context/MainProvider";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAgents } from "../hooks/useAgents";

export const STATUS_CONFIGS: StatusColumnConfig[] = [
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

export default function LeadsByStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { params } = useMain();
  const { data, isLoading, isFetching, isError } = useLeads(params.toString());
  const { data: agentRes } = useAgents();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const totalLeadsCount = data?.leads?.length;
  const isLeadsLoading = isLoading || isFetching;

  useEffect(() => {
    if (!searchParams.has("status") && !params.has("status"))
      params.set("status", "new");

    if (searchParams.toString() !== params.toString()) {
      params.set("limit", "8");
      setSearchParams(params, { replace: true });
    }
  }, [params, searchParams, setSearchParams]);

  return (
    <div className="mx-auto space-y-6 p-4 sm:p-6">
      <div className="flex max-lg:flex-col gap-4 flex-row lg:items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              <HiOutlineViewBoards className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leads by Status
            </h1>
            {!isLeadsLoading && (
              <span className="text-nowrap max-sm:hidden rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                {totalLeadsCount} categorized
              </span>
            )}
          </div>
          <p className="mt-1 pl-1 text-sm text-gray-500 dark:text-gray-400">
            Categorized lead board with per-status filtering and closing time
            sorting.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <LeadsViewTabs />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <LeadsFilterSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="flex-1 w-full min-w-0">
          <div className="pb-4">
            <div className="flex w-full flex-col gap-4">
              <StatusColumn
                STATUS_CONFIGS={STATUS_CONFIGS}
                leads={data?.leads}
                isLeadsLoading={isLeadsLoading}
                isError={isError}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:flex flex-wrap items-center justify-between hidden rounded-xl border border-gray-200 bg-white px-5 py-3 text-xs text-gray-500 shadow-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <span>Status breakdown:</span>
          {STATUS_CONFIGS.map((cfg) => (
            <span
              key={cfg.status}
              className="inline-flex items-center gap-1 font-medium"
            >
              <span className={`h-2 w-2 rounded-full ${cfg.dotColor}`} />
              {cfg.status}:{" "}
              <strong className="text-gray-900 dark:text-white">
                {data?.leads?.filter((l) => l.status === cfg.status).length}
              </strong>
            </span>
          ))}
        </div>
        <p className="italic">
          Displaying categorized status view
        </p>
      </div>
    </div>
  );
}
