import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { LeadResponse } from "../../hooks/useLeads";

interface FooterProps {
    data?: NoInfer<LeadResponse>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    isPlaceholderData: boolean;
}

const DISABLED = "disabled:opacity-50 disabled:hover:text-gray-400 disabled:dark:hover:text-gray-500 disabled:dark:hover:bg-gray-800 disabled:cursor-default"

export default function Footer({
    data,
    page,
    setPage,
    isPlaceholderData,
}: FooterProps) {

    console.log(isPlaceholderData);

    return (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {data?.leads?.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {data?.totalLeads}
                </span>{" "}
                leads
            </p>

            <div className="flex items-center gap-1">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`${DISABLED} inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-900/20 dark:hover:text-gray-400`}
                >
                    <HiOutlineChevronLeft className="h-3.5 w-3.5" />
                    Prev
                </button>
                <span className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
                    {data?.currentPage}
                </span>
                <button
                    onClick={() => {
                        if (data && !isPlaceholderData && page < data?.totalPages)
                            setPage((prev) => prev + 1);
                    }}
                    disabled={isPlaceholderData || (data && page >= data?.totalPages)}
                    className={`${DISABLED} inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors duration-200 ease-in-out hover:bg-gray-50 hover:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-900/20 dark:hover:text-gray-400`}
                >
                    Next
                    <HiOutlineChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
