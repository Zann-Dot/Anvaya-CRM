import {
    HiOutlineCollection,
    HiOutlineFilter,
    HiOutlinePlus,
    HiOutlineViewGrid,
    HiOutlineViewList,
} from "react-icons/hi";
import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import LeadCard, { Lead } from "./LeadCard";
import { useLeads } from "../hooks/useLeads";

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
    type FilterType = (typeof STATUS_FILTERS)[number];
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");
    const [activeFilter, setActiveFilter] = useState();

    const { data: leads, isLoading, isError } = useLeads();

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

    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <HiOutlineCollection className="h-5 w-5 text-violet-500" />
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                        Lead Management
                    </h3>
                    <span className="ml-1 rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                        {leads?.length}
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

            <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3 dark:border-gray-700">
                <HiOutlineFilter className="h-4 w-4 shrink-0 text-gray-400" />
                {STATUS_FILTERS.map((filter) => {
                    return (
                        <button
                            key={filter}

                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${filterBadgeColor[filter]
                                }`}
                        >
                            {filter}
                        </button>
                    );
                })}
            </div>

            <div
                className={`p-4 ${viewMode === "grid" ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "flex flex-col gap-3"}`}
            >
                {isLoading ? (
                    <div className="group flex items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-violet-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-700">
                        <div className="text-center">
                            <Spinner aria-label="Center-aligned spinner example" />
                        </div>
                    </div>
                ) : (leads?.length === 0 || isError) ? (
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
                    leads?.map((lead: Lead) => <LeadCard key={lead._id} lead={lead} />)
                )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-5 py-3 dark:border-gray-700">
                <p className="text-xs text-gray-400">
                    Showing {leads?.length} of {leads?.length} leads
                </p>
                <button className="text-xs font-medium text-violet-600 hover:text-violet-700 hover:underline dark:text-violet-400 dark:hover:text-violet-300">
                    View all leads →
                </button>
            </div>
        </div>
    );
}

{
    /* <span
                                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${isActive
                                        ? "bg-white/25 text-white"
                                        : "bg-black/10 text-inherit dark:bg-white/10"
                                        }`}
                                >
                                    {count}
                                </span> */
}
