import {
    HiOutlineCollection,
    HiOutlineFilter,
    HiOutlinePlus,
    HiOutlineViewGrid,
    HiOutlineViewList,
} from "react-icons/hi";
import { useState } from "react";
import { Badge, Button, Spinner } from "flowbite-react";
import LeadCard from "./LeadCard";
import AddLeadModal from "../AddLeadModal";
import { useLeads } from "../../hooks/useLeads";
import { Link } from "react-router-dom";
import useMain from "../../context/MainProvider";

interface LeadsSectionProp {
    STATUS_FILTERS: readonly [
        "All",
        "New",
        "Contacted",
        "Qualified",
        "Proposal",
        "Closed",
    ];
}

export default function LeadsSection({ STATUS_FILTERS }: LeadsSectionProp) {
    const { setNotificationState } = useMain();
    type FilterType = (typeof STATUS_FILTERS)[number];
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [activeFilter, setActiveFilter] = useState<FilterType>("All");

    const params =
        activeFilter && activeFilter !== "All"
            ? `limit=4&status=${activeFilter}`
            : "limit=4";

    const { data, isLoading, isError, isFetching } = useLeads(params);

    const filterBadgeColor: Record<FilterType, string> = {
        All: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700/70 dark:text-gray-300 dark:hover:bg-gray-700",
        New: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50",
        Contacted:
            "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50",
        Qualified:
            "bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-900/30 dark:text-violet-400 dark:hover:bg-violet-900/50",
        Proposal:
            "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:hover:bg-orange-900/50",
        Closed:
            "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50",
    };

    const activeFilterStyle: Record<FilterType, string> = {
        All: "bg-gray-900 text-white shadow-xs dark:bg-gray-100 dark:text-gray-900",
        New: "bg-blue-600 text-white shadow-xs shadow-blue-500/25",
        Contacted: "bg-amber-500 text-white shadow-xs shadow-amber-500/25",
        Qualified: "bg-violet-600 text-white shadow-xs shadow-violet-500/25",
        Proposal: "bg-orange-500 text-white shadow-xs shadow-orange-500/25",
        Closed: "bg-emerald-600 text-white shadow-xs shadow-emerald-500/25",
    };

    return (
        <div className="rounded-xl sm:rounded-2xl border border-gray-100 bg-white shadow-xs dark:border-gray-700/80 dark:bg-gray-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 p-3.5 sm:p-5 dark:border-gray-700/80">
                <div className="flex items-center justify-between sm:justify-start gap-2.5">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400">
                            <HiOutlineCollection className="h-4.5 w-4.5" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                            Newly Added Leads
                        </h3>
                    </div>
                    {data?.totalLeads !== undefined && (
                        <Badge color="purple" size="xs" className="px-2 py-0.5 font-semibold">
                            {data.totalLeads} total
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2">
                    <div className="flex rounded-xl border border-gray-200 p-0.5 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/60">
                        <button
                            type="button"
                            aria-label="List view"
                            onClick={() => setViewMode("list")}
                            className={`rounded-lg p-1.5 transition-colors active:scale-95 ${viewMode === "list"
                                ? "bg-white text-violet-600 shadow-xs dark:bg-gray-700 dark:text-white"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <HiOutlineViewList className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            aria-label="Grid view"
                            onClick={() => setViewMode("grid")}
                            className={`rounded-lg p-1.5 transition-colors active:scale-95 ${viewMode === "grid"
                                ? "bg-white text-violet-600 shadow-xs dark:bg-gray-700 dark:text-white"
                                : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                }`}
                        >
                            <HiOutlineViewGrid className="h-4 w-4" />
                        </button>
                    </div>

                    <Button
                        size="xs"
                        onClick={() => setNotificationState(true, false)}
                        className="cursor-pointer border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-xs hover:from-violet-700 hover:to-indigo-700 focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-800"
                    >
                        <HiOutlinePlus className="mr-1 h-3.5 w-3.5" />
                        <span>Add Lead</span>
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto border-b border-gray-100 px-3 sm:px-5 py-2.5 sm:py-3 scrollbar-none dark:border-gray-700/80">
                <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0 pr-1">
                    <HiOutlineFilter className="h-3.5 w-3.5" />
                    <span className="hidden xs:inline">Filter:</span>
                </div>
                {STATUS_FILTERS.map((filter) => {
                    const isCurrent = activeFilter === filter;
                    return (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setActiveFilter(filter)}
                            className={`shrink-0 flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all duration-150 active:scale-95 ${isCurrent
                                ? activeFilterStyle[filter]
                                : filterBadgeColor[filter]
                                }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            <div
                className={`p-3 sm:p-4 ${viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4"
                    : "flex flex-col gap-2.5 sm:gap-3"
                    }`}
            >
                {isLoading || isFetching ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
                        <Spinner size="md" color="purple" aria-label="Loading leads" />
                        <span className="mt-2 text-xs text-gray-400">Loading leads...</span>
                    </div>
                ) : data?.leads?.length === 0 || isError ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
                        <div className="mb-2.5 rounded-2xl bg-gray-100 p-3.5 dark:bg-gray-700/60">
                            <HiOutlineCollection className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            No leads found
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                            {activeFilter !== "All"
                                ? `No leads in "${activeFilter}" stage`
                                : "Add your first lead to get started"}
                        </p>
                        {activeFilter !== "All" && (
                            <button
                                type="button"
                                onClick={() => setActiveFilter("All")}
                                className="mt-3 text-xs font-semibold text-violet-600 hover:underline dark:text-violet-400"
                            >
                                Reset filter
                            </button>
                        )}
                    </div>
                ) : (
                    data?.leads?.map((lead) => (
                        <LeadCard key={lead._id} lead={lead} viewMode={viewMode} />
                    ))
                )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-3.5 sm:px-5 py-3 dark:border-gray-700/80">
                <p className="text-xs text-gray-400">
                    Showing <span className="font-medium text-gray-600 dark:text-gray-300">{data?.leads?.length ?? 0}</span> of{" "}
                    <span className="font-medium text-gray-600 dark:text-gray-300">{data?.totalLeads ?? 0}</span>
                </p>
                <Link
                    to="/leads"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300 active:scale-95 transition-transform"
                >
                    <span>View all leads</span>
                    <span>→</span>
                </Link>
            </div>

            <AddLeadModal />
        </div>
    );
}
