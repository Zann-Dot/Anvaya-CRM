import { TextInput } from "flowbite-react";
import {
    HiOutlineFilter,
    HiOutlineSearch,
    HiOutlineX,
    HiOutlineRefresh,
} from "react-icons/hi";
import { useAgents } from "../../hooks/useAgents";
import useMain from "../../context/MainProvider";

interface FilterLeadProps {
    isSidebarOpen?: boolean;
    onToggleSidebar?: () => void;
}

export default function FilterLead({
    isSidebarOpen = true,
    onToggleSidebar,
}: FilterLeadProps) {
    const { data: agentRes } = useAgents();
    const { search, setSearch, filter, dispatch, setPage } = useMain();

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

    const selectedAgent = agentRes?.agents?.find((a) => a._id === filter.agent);

    const getSortLabel = () => {
        if (!filter.sort?.value || filter.sort.value === "all") return "";
        if (filter.sort.sortType === "priority") {
            return filter.sort.value === "asc"
                ? "Priority: High → Low"
                : "Priority: Low → High";
        }
        if (filter.sort.sortType === "timeToClose") {
            return filter.sort.value === "desc"
                ? "Time to Close: Longest"
                : "Time to Close: Shortest";
        }
        return filter.sort.sortType;
    };

    function handleReset() {
        dispatch({ type: "RESET" });
        setPage(1);
    }

    return (
        <div className="border-b border-gray-100 p-4 dark:border-gray-700">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-md">
                    <TextInput
                        id="lead-search"
                        type="search"
                        icon={HiOutlineSearch}
                        placeholder="Search leads by name, company or email…"
                        className="w-full"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    {activeCount > 0 && (
                        <button
                            type="button"
                            onClick={handleReset}
                            className="flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors cursor-pointer"
                        >
                            <HiOutlineRefresh className="h-3.5 w-3.5" />
                            <span>Clear filters</span>
                        </button>
                    )}

                    {onToggleSidebar && (
                        <button
                            type="button"
                            onClick={onToggleSidebar}
                            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer ${isSidebarOpen
                                    ? "border-violet-300 bg-violet-50 text-violet-700 dark:border-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
                                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                }`}
                        >
                            <HiOutlineFilter className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                            <span>Filters</span>
                            {activeCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
                                    {activeCount}
                                </span>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {activeCount > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-gray-50 dark:border-gray-700/60">
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                        Active:
                    </span>

                    {isStatusActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                            <span>Status: {filter.status}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "STATUS", value: "" });
                                    setPage(1);
                                }}
                                className="hover:text-violet-900 dark:hover:text-white cursor-pointer"
                                title="Remove status filter"
                            >
                                <HiOutlineX className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {isAgentActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            <span>Agent: {selectedAgent?.name || "Selected"}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "AGENT", value: "" });
                                    setPage(1);
                                }}
                                className="hover:text-blue-900 dark:hover:text-white cursor-pointer"
                                title="Remove agent filter"
                            >
                                <HiOutlineX className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {isSourceActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <span>Source: {filter.source}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "SOURCE", value: "" });
                                    setPage(1);
                                }}
                                className="hover:text-emerald-900 dark:hover:text-white cursor-pointer"
                                title="Remove source filter"
                            >
                                <HiOutlineX className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {isTagActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                            <span>Tag: {filter.tags}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "TAGS", value: "" });
                                    setPage(1);
                                }}
                                className="hover:text-amber-950 dark:hover:text-white cursor-pointer"
                                title="Remove tag filter"
                            >
                                <HiOutlineX className="h-3 w-3" />
                            </button>
                        </span>
                    )}

                    {isSortActive && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            <span>Sort: {getSortLabel()}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    dispatch({ type: "SORT", value: "all", sort: "" });
                                    setPage(1);
                                }}
                                className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
                                title="Reset sort"
                            >
                                <HiOutlineX className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
