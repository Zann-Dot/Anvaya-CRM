import { Select, TextInput } from "flowbite-react";
import {
  HiOutlineSearch,
  HiOutlineViewBoards,
  HiOutlineClock,
  HiOutlineFire,
  HiOutlineFilter,
} from "react-icons/hi";
import LeadsViewTabs from "../components/lead/LeadsViewTabs";
import StatusColumn, {
  StatusColumnConfig,
} from "../components/lead/StatusColumn";
import { useLeads } from "../hooks/useLeads";
import useMain from "../context/MainProvider";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAgents } from "../hooks/useAgents";

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

export default function LeadsByAgents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { params, setSearch, dispatch } = useMain();
  const { data, isLoading, isFetching, isError } = useLeads(params.toString());
  const { data: agentRes } = useAgents();
  const totalLeadsCount = data?.leads?.length;
  const isLeadsLoading = isLoading || isFetching;
  const firstAgentMount = agentRes?.agents[0]._id;

  useEffect(() => {
    if (firstAgentMount && !searchParams.has("agent") && !params.has("agent"))
      params.set("agent", firstAgentMount);

    if (searchParams.toString() !== params.toString()) {
      params.set("limit", "8");
      setSearchParams(params, { replace: true });
    }
  }, [params, searchParams, setSearchParams, firstAgentMount]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
              <HiOutlineViewBoards className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leads by Agents
            </h1>
            {!isLeadsLoading && (
              <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
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

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-xs">
            <TextInput
              id="lead-search"
              type="search"
              icon={HiOutlineSearch}
              placeholder="Search leads by name, company or email…"
              className="w-full lg:max-w-xs"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <HiOutlineFilter className="h-4 w-4 shrink-0 text-gray-400" />
              <Select
                id="filter-status"
                className="w-40"
                onChange={(e) =>
                  dispatch({ type: "STATUS", value: e.target.value })
                }
              >
                <option value="all">Select all</option>
                {STATUS_CONFIGS.map((s) => (
                  <option key={s.status} value={s.status.toLowerCase()}>
                    {s.status}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              <HiOutlineFire className="h-4 w-4 shrink-0 text-gray-400" />
              <Select
                id="filter-priority"
                className="w-36"
                defaultValue="all"
                onChange={(e) =>
                  dispatch({ type: "PRIORITY", value: e.target.value })
                }
              >
                <option value="all">Filters: Priority</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </Select>
            </div>

            <div className="flex items-center gap-1.5">
              <HiOutlineClock className="h-4 w-4 shrink-0 text-gray-400" />
              <Select
                id="sort-by"
                className="w-48"
                onChange={(e) =>
                  dispatch({
                    type: "SORT",
                    value: e.target.value,
                    sort: e.target.options[e.target.selectedIndex].dataset.sort,
                  })
                }
              >
                <option value="all">Sort: Default</option>
                <option data-sort="timeToClose" value="desc">
                  Time to Close: Longest
                </option>
                <option data-sort="timeToClose" value="asc">
                  Time to Close: Shortest
                </option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-4">
        <div className="flex w-full flex-col gap-4">
          <StatusColumn
            agents={agentRes?.agents}
            leads={data?.leads}
            isLeadsLoading={isLeadsLoading}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
}
