import {
   HiOutlineUserGroup,
   HiOutlineCollection,
   HiOutlineTrendingUp,
   HiOutlineCheckCircle,
   HiOutlineExclamation,
   HiOutlinePlus,
   HiOutlineCalendar,
   HiOutlineChartPie,
} from "react-icons/hi";
import StatsCard from "../components/dashboard/StatsCard";
import LeadsSection from "../components/dashboard/LeadsSection";
import { format } from "date-fns";
import { useDashboardReport, usePipeline } from "../hooks/useReports";
import { Badge, Button, Progress } from "flowbite-react";
import { Link } from "react-router-dom";

const STATUS_FILTERS = [
   "All",
   "New",
   "Contacted",
   "Qualified",
   "Proposal",
   "Closed",
] as const;

export default function Dashboard() {
   const { data: dr, isLoading, isError, refetch } = useDashboardReport();
   const { data: pipeline } = usePipeline("");

   const currentHour = new Date().getHours();
   const greeting =
      currentHour < 12
         ? "Good morning"
         : currentHour < 17
            ? "Good afternoon"
            : "Good evening";

   const totalPipelineLeads = pipeline?.totalLeadsInPipeline ?? 0;

   const closeRate =
      totalPipelineLeads > 0
         ? Math.round(
            ((pipeline?.totalLeadsClosed ?? 0) / totalPipelineLeads) * 100,
         )
         : (dr?.conversionRateThisMonth ?? 0);

   const stats = [
      {
         label: "Total Leads",
         value: dr?.totalLeadsOfTheMonth,
         change: dr?.changeInLeads,
         positive: dr && dr?.changeInLeads >= 0,
         icon: <HiOutlineCollection className="h-5 w-5 sm:h-6 sm:w-6" />,
         color: "bg-violet-500",
      },
      {
         label: "Active Leads",
         value: dr?.activeLeads,
         change: dr?.changeInActiveLeads,
         positive: dr && dr?.changeInActiveLeads >= 0,
         icon: <HiOutlineUserGroup className="h-5 w-5 sm:h-6 sm:w-6" />,
         color: "bg-blue-500",
      },
      {
         label: "Conversion Rate",
         value: `${dr?.conversionRateThisMonth ?? 0}%`,
         change: dr?.changeInConversionRate,
         positive: dr && dr?.changeInConversionRate >= 0,
         icon: <HiOutlineTrendingUp className="h-5 w-5 sm:h-6 sm:w-6" />,
         color: "bg-emerald-500",
      },
      {
         label: "Deals Closed",
         value: dr?.totalLeadsClosedThisMonth,
         change: dr?.changeInClosedLeads,
         positive: dr && dr?.changeInClosedLeads >= 0,
         icon: <HiOutlineCheckCircle className="h-5 w-5 sm:h-6 sm:w-6" />,
         color: "bg-amber-500",
      },
   ];

   return (
      <div className="mx-auto w-full space-y-4 p-3.5 sm:space-y-6 sm:p-5 md:p-6">
         <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-4 text-white shadow-md sm:rounded-2xl sm:p-6 sm:shadow-xl">
            <div className="pointer-events-none absolute inset-0 opacity-20">
               <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/30 blur-3xl sm:h-48 sm:w-48" />
               <div className="absolute -bottom-10 left-10 h-28 w-28 rounded-full bg-white/20 blur-2xl sm:left-20 sm:h-36 sm:w-36" />
            </div>

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div className="space-y-1 sm:space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-violet-100 backdrop-blur-xs">
                     <HiOutlineCalendar className="h-3.5 w-3.5" />
                     <span>{format(new Date(), "EEEE, MMM dd, yyyy")}</span>
                  </div>

                  <h2 className="text-xl font-extrabold tracking-tight sm:text-2xl lg:text-3xl">
                     {greeting}, Anay! 👋
                  </h2>

                  <p className="max-w-xl text-xs text-violet-100/90 sm:text-sm">
                     You have{" "}
                     <span className="font-semibold text-white">
                        {dr?.activeLeads ?? 0}{" "}
                        {(dr?.activeLeads ?? 0) === 1 ? "lead" : "leads"}
                     </span>{" "}
                     currently active and waiting for review.
                  </p>
               </div>

               <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-2">
                  <Link
                     to="/reports"
                     className="inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xs transition-all hover:bg-white/25 active:scale-95"
                  >
                     <HiOutlineChartPie className="h-3.5 w-3.5" />
                     <span>Pipeline Analytics →</span>
                  </Link>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">
            {isLoading ? (
               Array.from({ length: 4 }, (_, i) => (
                  <div
                     key={i}
                     className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-5 dark:border-gray-700 dark:bg-gray-800"
                  >
                     <div className="flex items-start justify-between gap-2">
                        <div className="w-full space-y-2">
                           <div className="h-3 w-16 animate-pulse rounded-md bg-gray-200 sm:w-20 dark:bg-gray-700" />
                           <div className="h-6 w-12 animate-pulse rounded-md bg-gray-200 sm:h-8 sm:w-16 dark:bg-gray-700" />
                           <div className="h-3 w-20 animate-pulse rounded-md bg-gray-200 sm:w-28 dark:bg-gray-700" />
                        </div>
                        <div className="h-9 w-9 shrink-0 animate-pulse rounded-xl bg-gray-200 sm:h-12 sm:w-12 sm:rounded-2xl dark:bg-gray-700" />
                     </div>
                  </div>
               ))
            ) : isError ? (
               <div className="col-span-full">
                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-xs sm:rounded-2xl dark:border-gray-700 dark:bg-gray-800">
                     <div className="mb-3 rounded-2xl bg-rose-50 p-3 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400">
                        <HiOutlineExclamation className="h-7 w-7" />
                     </div>
                     <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        Unable to load dashboard metrics
                     </p>
                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Check your server connection or try refreshing the data
                     </p>
                     <Button
                        size="xs"
                        color="light"
                        onClick={() => refetch()}
                        className="mt-4 cursor-pointer"
                     >
                        Retry
                     </Button>
                  </div>
               </div>
            ) : (
               stats.map((s) => <StatsCard key={s.label} {...s} />)
            )}
         </div>

         {pipeline && (
            <div className="rounded-xl border border-gray-100 bg-white p-3.5 shadow-xs sm:rounded-2xl sm:p-4 dark:border-gray-700/80 dark:bg-gray-800">
               <div className="flex flex-col gap-2.5 pb-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                     <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                     <h4 className="text-xs font-bold text-gray-900 sm:text-sm dark:text-white">
                        Monthly Pipeline Health
                     </h4>
                     <Badge color="indigo" size="xs">
                        {closeRate}% Conversion
                     </Badge>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                     <span>
                        In Pipeline:{" "}
                        <strong className="text-gray-800 dark:text-gray-200">
                           {pipeline.totalLeadsInPipeline}
                        </strong>
                     </span>
                     <span>•</span>
                     <span>
                        Closed:{" "}
                        <strong className="text-emerald-600 dark:text-emerald-400">
                           {pipeline.totalLeadsClosed}
                        </strong>
                     </span>
                  </div>
               </div>

               <div className="mt-1">
                  <Progress
                     progress={closeRate}
                     color="purple"
                     size="sm"
                     className="w-full"
                  />
               </div>
            </div>
         )}

         <LeadsSection STATUS_FILTERS={STATUS_FILTERS} />
      </div>
   );
}
