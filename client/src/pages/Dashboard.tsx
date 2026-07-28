import {
   HiOutlineUserGroup,
   HiOutlineCollection,
   HiOutlineTrendingUp,
   HiOutlineCheckCircle,
} from "react-icons/hi";
import StatsCard from "../components/StatsCard";
import useMain from "../context/MainProvider";
import LeadsSection from "../components/LeadsSection";
import { format } from "date-fns";

const STATUS_FILTERS = [
   "All",
   "New",
   "Contacted",
   "Qualified",
   "Proposal",
   "Closed",
] as const;

export default function Dashboard() {
   const { dashboardReport } = useMain();

   const stats = [
      {
         label: "Total Leads",
         value: dashboardReport?.totalLeadsOfTheMonth,
         change: dashboardReport?.changeInLeads,
         positive: dashboardReport?.changeInLeads >= 0,
         icon: <HiOutlineCollection className="h-6 w-6" />,
         color: "bg-violet-500",
      },
      {
         label: "Active Leads",
         value: dashboardReport?.activeLeads,
         change: dashboardReport?.changeInActiveLeads,
         positive: dashboardReport?.changeInActiveLeads >= 0,
         icon: <HiOutlineUserGroup className="h-6 w-6" />,
         color: "bg-blue-500",
      },
      {
         label: "Conversion Rate",
         value: `${dashboardReport?.conversionRateThisMonth}%`,
         change: dashboardReport?.changeInConversionRate,
         positive: dashboardReport?.changeInConversionRate >= 0,
         icon: <HiOutlineTrendingUp className="h-6 w-6" />,
         color: "bg-emerald-500",
      },
      {
         label: "Deals Closed",
         value: dashboardReport?.totalLeadsClosedThisMonth,
         change: dashboardReport?.changeInClosedLeads,
         positive: dashboardReport?.changeInClosedLeads >= 0,
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
                     {format(Date(), "EEEEEEEEE, MMMMMMMMM dd, yyyy")}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">Good morning, Anay! 👋</h2>
                  <p className="mt-1 text-sm text-violet-200">
                     You have{" "}
                     <span className="font-semibold text-white">
                        {dashboardReport?.activeLeads} new{" "}
                        {dashboardReport?.activeLeads <= 1 ? "lead" : "leads"}
                     </span>{" "}
                     waiting for review.
                  </p>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
               <StatsCard key={s.label} {...s} />
            ))}
         </div>

         <LeadsSection STATUS_FILTERS={STATUS_FILTERS} />
      </div>
   );
}
