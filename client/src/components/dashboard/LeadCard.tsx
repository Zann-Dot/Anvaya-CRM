import { format } from "date-fns"
import { Link } from "react-router-dom";

export interface Lead {
   readonly _id: string;
   name: string;
   company: string;
   email: string;
   tags: string[];
   status: "New" | "Contacted" | "Qualified" | "Proposal" | "Closed";
   priority: "High" | "Medium" | "Low";
   source: "Website" | "Referral" | "Cold Call" | "Advertisement" | "Email" | "Other";
   timeToClose: number;
   salesAgent: {
      name: string;
      email: string;
      _id: string;
      createdAt: string
   };
   createdAt: string;
   updatedAt: string;
   avatar: string;
   closedAt: string;
}

const statusConfig: Record<
   Lead["status"],
   { color: string; dot: string; badge: string }
> = {
   New: {
      color: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
      dot: "bg-blue-500",
      badge: "blue",
   },
   Contacted: {
      color:
         "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
      dot: "bg-amber-500",
      badge: "yellow",
   },
   Qualified: {
      color:
         "bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
      dot: "bg-violet-500",
      badge: "purple",
   },
   Proposal: {
      color:
         "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400",
      dot: "bg-orange-500",
      badge: "warning",
   },
   Closed: {
      color:
         "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
      dot: "bg-green-500",
      badge: "success",
   },
};

interface LeadCardProps {
   lead: Lead;
   viewMode?: "grid" | "list";
}

export default function LeadCard({ lead, viewMode = "list" }: LeadCardProps) {
   const cfg = statusConfig[lead.status] ?? statusConfig.New;
   const formattedDate = lead.createdAt
      ? format(new Date(lead.createdAt), "dd MMM yyyy")
      : "";
   const shortDate = lead.createdAt
      ? format(new Date(lead.createdAt), "dd MMM")
      : "";

   if (viewMode === "grid") {
      return (
         <Link
            to={`/leads/${lead._id}`}
            className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-4 shadow-xs transition-all duration-200 active:scale-[0.99] hover:border-violet-200 hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800 dark:hover:border-violet-700"
         >
            <div>
               <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                     <img
                        src={lead.avatar || "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"}
                        alt={lead.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
                     />
                     <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                           {lead.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                           {lead.company}
                        </p>
                     </div>
                  </div>
                  <span
                     className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${cfg.color}`}
                  >
                     <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                     {lead.status}
                  </span>
               </div>

               <p className="mt-3 truncate text-xs text-gray-500 dark:text-gray-400">
                  {lead.email}
               </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-500 dark:border-gray-700/60 dark:text-gray-400">
               <span className="truncate max-w-35 font-medium">
                  {lead.salesAgent?.name || "Unassigned"}
               </span>
               <span className="shrink-0 text-gray-400 dark:text-gray-500">
                  {formattedDate}
               </span>
            </div>
         </Link>
      );
   }

   return (
      <Link
         to={`/leads/${lead._id}`}
         className="group flex items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-xs transition-all duration-200 active:scale-[0.99] hover:border-violet-200 hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800 dark:hover:border-violet-700"
      >
         <div className="relative shrink-0">
            <img
               src={lead.avatar || "https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"}
               alt={lead.name}
               className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700"
            />
         </div>

         <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
               <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  {lead.name}
               </p>
               <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${cfg.color}`}
               >
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                  {lead.status}
               </span>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
               <p className="truncate text-xs text-gray-600 dark:text-gray-400">
                  {lead.company}
               </p>
               <span className="hidden xs:inline text-xs text-gray-300 dark:text-gray-600">•</span>
               <p className="hidden xs:block truncate text-xs text-gray-400 dark:text-gray-500">
                  {lead.email}
               </p>
            </div>

            <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500 sm:hidden dark:text-gray-400">
               {lead.salesAgent?.name && (
                  <span className="truncate max-w-30 font-medium text-gray-600 dark:text-gray-300">
                     {lead.salesAgent.name}
                  </span>
               )}
               {lead.salesAgent?.name && <span>•</span>}
               <span className="text-gray-400">{shortDate}</span>
            </div>
         </div>

         <div className="hidden flex-col items-end gap-1 text-right sm:flex shrink-0">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
               {lead.salesAgent?.name || "Unassigned"}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
               {formattedDate}
            </p>
         </div>

         <div className="shrink-0 rounded-xl border border-gray-100 bg-gray-50/80 p-1.5 sm:p-2 text-gray-400 opacity-60 transition-all group-hover:opacity-100 group-hover:bg-violet-50 group-hover:text-violet-600 dark:border-gray-700 dark:bg-gray-700/60 dark:group-hover:bg-violet-900/30 dark:group-hover:text-violet-400">
            <svg
               className="h-3.5 w-3.5 sm:h-4 sm:w-4"
               fill="none"
               stroke="currentColor"
               viewBox="0 0 24 24"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
               />
            </svg>
         </div>
      </Link>
   );
}
