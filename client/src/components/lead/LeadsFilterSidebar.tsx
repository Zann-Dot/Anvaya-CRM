import { Select } from "flowbite-react";
import {
  HiOutlineFilter,
  HiOutlineUser,
  HiOutlineTag,
  HiOutlineGlobe,
  HiOutlineSortAscending,
  HiOutlineX,
  HiOutlineRefresh,
  HiCheck,
} from "react-icons/hi";
import { useAgents } from "../../hooks/useAgents";
import useMain from "../../context/MainProvider";

const AVAILABLE_SOURCES = [
  "Website",
  "Referral",
  "Cold Call",
  "Advertisement",
  "Email",
  "Other",
];

const AVAILABLE_TAGS = [
  "High Value",
  "Follow-up",
  "Enterprise",
  "Inbound",
  "Urgent",
  "Hot Lead",
];

const STATUS_OPTIONS = [
  { label: "All Statuses", value: "all" },
  { label: "New", value: "New" },
  { label: "Contacted", value: "Contacted" },
  { label: "Qualified", value: "Qualified" },
  { label: "Proposal", value: "Proposal" },
  { label: "Closed", value: "Closed" },
];

interface LeadsFilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function LeadsFilterSidebar({
  isOpen = true,
  onClose,
}: LeadsFilterSidebarProps) {
  const { data: agentRes } = useAgents();
  const { filter, dispatch, setPage } = useMain();

  const isStatusActive = Boolean(filter.status && filter.status !== "all");
  const isAgentActive = Boolean(filter.agent && filter.agent !== "all");
  const isSourceActive = Boolean(filter.source && filter.source !== "all");
  const isTagActive = Boolean(filter.tags && filter.tags !== "all");
  const isSortActive = Boolean(filter.sort?.value && filter.sort.value !== "all");

  const activeCount =
    (isStatusActive ? 1 : 0) +
    (isAgentActive ? 1 : 0) +
    (isSourceActive ? 1 : 0) +
    (isTagActive ? 1 : 0) +
    (isSortActive ? 1 : 0);

  function handleReset() {
    dispatch({ type: "RESET" });
    setPage(1);
  }

  function handleTagClick(tag: string) {
    const nextVal = filter.tags === tag ? "" : tag;
    dispatch({ type: "TAGS", value: nextVal });
    setPage(1);
  }

  return (
    <aside
      className={`w-full lg:w-72 shrink-0 space-y-5 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-200 dark:border-gray-700/80 dark:bg-gray-800 ${isOpen ? "block" : "hidden lg:block"
        }`}
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700/80">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
            <HiOutlineFilter className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              Filter Leads
            </h2>
            {activeCount > 0 && (
              <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">
                {activeCount} filter{activeCount > 1 ? "s" : ""} active
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <HiOutlineRefresh className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:hidden dark:hover:bg-gray-700 dark:hover:text-gray-200"
              aria-label="Close filters"
            >
              <HiOutlineX className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label
            htmlFor="filter-sidebar-status"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Lead Status
          </label>
          <Select
            id="filter-sidebar-status"
            value={filter.status || "all"}
            onChange={(e) => {
              dispatch({ type: "STATUS", value: e.target.value });
              setPage(1);
            }}
            className="text-xs"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="filter-sidebar-agent"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            <HiOutlineUser className="h-3.5 w-3.5 text-gray-400" />
            Sales Agent
          </label>
          <Select
            id="filter-sidebar-agent"
            value={filter.agent || "all"}
            onChange={(e) => {
              dispatch({ type: "AGENT", value: e.target.value });
              setPage(1);
            }}
            className="text-xs"
          >
            <option value="all">All Agents</option>
            {agentRes?.agents?.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="filter-sidebar-source"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            <HiOutlineGlobe className="h-3.5 w-3.5 text-gray-400" />
            Lead Source
          </label>
          <Select
            id="filter-sidebar-source"
            value={filter.source || "all"}
            onChange={(e) => {
              dispatch({ type: "SOURCE", value: e.target.value });
              setPage(1);
            }}
            className="text-xs"
          >
            <option value="all">All Sources</option>
            {AVAILABLE_SOURCES.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <HiOutlineTag className="h-3.5 w-3.5 text-gray-400" />
              Tags
            </label>
            {filter.tags && (
              <button
                type="button"
                onClick={() => {
                  dispatch({ type: "TAGS", value: "" });
                  setPage(1);
                }}
                className="text-[11px] text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer"
              >
                Clear tag
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {AVAILABLE_TAGS.map((tag) => {
              const isSelected = filter.tags === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-150 cursor-pointer ${isSelected
                    ? "bg-violet-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200/80 hover:text-gray-900 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                    }`}
                >
                  {isSelected && <HiCheck className="h-3 w-3" />}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5 border-t border-gray-100 pt-3 dark:border-gray-700/80">
          <label
            htmlFor="filter-sidebar-sort"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300"
          >
            <HiOutlineSortAscending className="h-3.5 w-3.5 text-gray-400" />
            Sort By
          </label>
          <Select
            id="filter-sidebar-sort"
            value={
              filter.sort?.sortType && filter.sort?.value
                ? `${filter.sort.sortType}-${filter.sort.value}`
                : "all"
            }
            onChange={(e) => {
              const val = e.target.value;
              if (val === "all") {
                dispatch({ type: "SORT", value: "all", sort: "" });
              } else if (val === "priority-asc") {
                dispatch({ type: "SORT", value: "asc", sort: "priority" });
              } else if (val === "priority-desc") {
                dispatch({ type: "SORT", value: "desc", sort: "priority" });
              } else if (val === "timeToClose-desc") {
                dispatch({ type: "SORT", value: "desc", sort: "timeToClose" });
              } else if (val === "timeToClose-asc") {
                dispatch({ type: "SORT", value: "asc", sort: "timeToClose" });
              }
              setPage(1);
            }}
            className="text-xs"
          >
            <option value="all">Sort: Default</option>
            <option value="priority-asc">Priority: High → Low</option>
            <option value="priority-desc">Priority: Low → High</option>
            <option value="timeToClose-desc">Time to Close: Longest</option>
            <option value="timeToClose-asc">Time to Close: Shortest</option>
          </Select>
        </div>
      </div>
    </aside>
  );
}
