import { Badge, Button } from "flowbite-react";
import {
   HiOutlineUser,
   HiOutlineUserCircle,
   HiOutlineShare,
   HiOutlineTag,
   HiOutlineClock,
   HiOutlinePencil,
   HiOutlineFire,
   HiOutlineCheckCircle,
} from "react-icons/hi";
import { useParams } from "react-router-dom";
import { useLead } from "../hooks/useLeads";

export default function LeadManagement() {
   const { leadId } = useParams();
   const { data: lead } = useLead(leadId);
   return (
      <div className="mx-auto max-w-7xl space-y-6 p-6">
         <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-3">
               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-md">
                  <HiOutlineUser className="h-6 w-6" />
               </div>
               <div>
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-semibold tracking-wider text-violet-600 uppercase dark:text-violet-400">
                        Lead Management
                     </span>
                     <span className="text-gray-300 dark:text-gray-600">•</span>
                     <Badge color="purple" size="xs">
                        Enterprise Lead
                     </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                     Sarah Jenkins
                  </h1>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <Badge color="blue" size="sm" icon={HiOutlineCheckCircle}>
                  Status: New
               </Badge>
               <Badge color="failure" size="sm" icon={HiOutlineFire}>
                  Priority: High
               </Badge>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="space-y-6 lg:col-span-1">
               <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="space-y-3">
                     <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Quick Info
                     </p>
                     <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
                        <p className="text-[11px] text-gray-400">Company</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                           Acme Tech Solutions
                        </p>
                     </div>
                     <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
                        <p className="text-[11px] text-gray-400">Created Date</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                           July 28, 2026
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-6 lg:col-span-3">
               <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
                     <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Lead Details
                     </h2>
                     <Badge color="gray">ID: #LD-70291</Badge>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineUser className="h-4 w-4 text-violet-500" />
                           <span>Lead Name</span>
                        </div>
                        <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                           Sarah Jenkins
                        </p>
                     </div>

                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineUserCircle className="h-4 w-4 text-violet-500" />
                           <span>Sales Agent</span>
                        </div>
                        <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                           John Doe
                        </p>
                     </div>

                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineShare className="h-4 w-4 text-violet-500" />
                           <span>Lead Source</span>
                        </div>
                        <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                           Referral
                        </p>
                     </div>

                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineTag className="h-4 w-4 text-violet-500" />
                           <span>Lead Status</span>
                        </div>
                        <div className="mt-1.5">
                           <Badge color="blue" className="w-fit" size="sm">
                              New
                           </Badge>
                        </div>
                     </div>

                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineFire className="h-4 w-4 text-violet-500" />
                           <span>Priority</span>
                        </div>
                        <div className="mt-1.5">
                           <Badge color="failure" className="w-fit" size="sm">
                              High
                           </Badge>
                        </div>
                     </div>

                     <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-700/60 dark:bg-gray-900/40">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                           <HiOutlineClock className="h-4 w-4 text-violet-500" />
                           <span>Time to Close</span>
                        </div>
                        <p className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                           30 Days
                        </p>
                     </div>
                  </div>

                  <div className="mt-6 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700">
                     <Button color="purple" disabled>
                        <HiOutlinePencil className="mr-2 h-4 w-4" />
                        Edit Lead Details
                     </Button>
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}
