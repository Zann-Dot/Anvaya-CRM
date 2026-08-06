import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { Lead } from "../LeadCard";

interface FooterProps {
    leads?: NoInfer<Lead[]>;
}
export default function Footer({ leads }: FooterProps) {
    return (
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {leads?.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {leads?.length}
                </span>{" "}
                leads
            </p>

            <div className="flex items-center gap-1">
                <button
                    disabled
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-400 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                >
                    <HiOutlineChevronLeft className="h-3.5 w-3.5" />
                    Prev
                </button>
                <span className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
                    1
                </span>
                <button
                    disabled
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-400 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
                >
                    Next
                    <HiOutlineChevronRight className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
}
