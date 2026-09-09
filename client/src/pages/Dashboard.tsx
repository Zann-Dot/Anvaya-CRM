import {
   HiOutlineUserGroup,
   HiOutlineCollection,
   HiOutlineTrendingUp,
   HiOutlineCheckCircle,
   HiOutlineExclamation,
} from "react-icons/hi";
import StatsCard from "../components/dashboard/StatsCard";
import LeadsSection from "../components/dashboard/LeadsSection";
import { format } from "date-fns";
import { useDashboardReport } from "../hooks/useReports";

const STATUS_FILTERS = [
   "All",
   "New",
   "Contacted",
   "Qualified",
   "Proposal",
   "Closed",
] as const;

export default function Dashboard() {
   const { data: dr, isLoading, isError } = useDashboardReport();

   const stats = [
      {
         label: "Total Leads",
         value: dr?.totalLeadsOfTheMonth,
         change: dr?.changeInLeads,
         positive: dr && dr?.changeInLeads >= 0,
         icon: <HiOutlineCollection className="h-6 w-6" />,
         color: "bg-violet-500",
      },
      {
         label: "Active Leads",
         value: dr?.activeLeads,
         change: dr?.changeInActiveLeads,
         positive: dr && dr?.changeInActiveLeads >= 0,
         icon: <HiOutlineUserGroup className="h-6 w-6" />,
         color: "bg-blue-500",
      },
      {
         label: "Conversion Rate",
         value: `${dr?.conversionRateThisMonth ?? 0}%`,
         change: dr?.changeInConversionRate,
         positive: dr && dr?.changeInConversionRate >= 0,
         icon: <HiOutlineTrendingUp className="h-6 w-6" />,
         color: "bg-emerald-500",
      },
      {
         label: "Deals Closed",
         value: dr?.totalLeadsClosedThisMonth,
         change: dr?.changeInClosedLeads,
         positive: dr && dr?.changeInClosedLeads >= 0,
         icon: <HiOutlineCheckCircle className="h-6 w-6" />,
         color: "bg-amber-500",
      },
   ];

   return (
      <div className="space-y-6 p-6">
         <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-xl">
            <div className="absolute inset-0 opacity-20">
               <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
               <div className="absolute -bottom-10 left-20 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
            </div>
            <div className="relative flex items-center justify-between">
               <div>
                  <p className="text-sm font-medium text-violet-200">
                     {format(Date(), "EEEE, MMM dd, yyyy")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Good morning, Anay! 👋</h2>
                  <p className="mt-1 text-sm text-violet-200">
                     You have{" "}
                     <span className="font-semibold text-white">
                        {dr && dr?.activeLeads} new{" "}
                        {dr && dr?.activeLeads <= 1 ? "lead" : "leads"}
                     </span>{" "}
                     waiting for review.
                  </p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {isLoading ? (
               Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
                     <div
                        className={`absolute -top-6 -right-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}
                     />

                     <div className="flex flex-col justify-stretch gap-3">
                        <div className="animate-pulse w-1/2 bg-gray-200 dark:bg-gray-700 rounded-2xl py-2" />
                        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-2xl py-2" />
                     </div>

                     <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md}`}
                     >
                     </div>
                  </div>
               ))
            ) : isError ? (
               <div className="col-span-4">
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                     <div className="mb-3 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
                        <HiOutlineExclamation className="h-8 w-8 text-gray-400" />
                     </div>
                     <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        No report found
                     </p>
                  </div>
               </div>
            ) : (
               stats.map((s) => <StatsCard key={s.label} {...s} />)
            )}
         </div>

         <LeadsSection STATUS_FILTERS={STATUS_FILTERS} />
      </div>
   );
}
