import { HiOutlineClock } from "react-icons/hi";
import {
   Avatar,
   Table,
   TableHead,
   TableHeadCell,
   TableBody,
   TableRow,
   TableCell,
} from "flowbite-react";
import { Lead } from "../LeadCard";
import { format } from "date-fns";

interface LeadsTableProps {
   LEADS: Lead[];
}

const STATUS_COLOR: Record<string, string> = {
   New: "bg-blue-50 text-blue-700 ring-1 ring-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-800",
   Contacted:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-800",
   Qualified:
      "bg-violet-50 text-violet-700 ring-1 ring-violet-200 dark:bg-violet-900/20 dark:text-violet-400 dark:ring-violet-800",
   Proposal:
      "bg-orange-50 text-orange-700 ring-1 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:ring-orange-800",
   Closed:
      "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:ring-emerald-800",
};

const STATUS_DOT: Record<string, string> = {
   New: "bg-blue-500",
   Contacted: "bg-amber-500",
   Qualified: "bg-violet-500",
   Proposal: "bg-orange-500",
   Closed: "bg-emerald-500",
};

const PRIORITY_COLOR: Record<string, string> = {
   High: "bg-rose-50 text-rose-700 ring-1 ring-rose-200 dark:bg-rose-900/20 dark:text-rose-400 dark:ring-rose-800",
   Medium:
      "bg-amber-50 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:ring-amber-800",
   Low: "bg-gray-50 text-gray-600 ring-1 ring-gray-200 dark:bg-gray-700/40 dark:text-gray-400 dark:ring-gray-600",
};

export default function LeadsTable({ LEADS }: LeadsTableProps) {
   return (
      <div className="overflow-x-auto">
         <Table hoverable>
            <TableHead className="bg-gray-50 text-xs tracking-wide text-gray-500 uppercase dark:bg-gray-700/50 dark:text-gray-400">
               <TableHeadCell className="w-10 px-4">
                  <input
                     type="checkbox"
                     className="h-4 w-4 rounded border-gray-300 text-violet-600 accent-violet-600"
                     readOnly
                  />
               </TableHeadCell>
               <TableHeadCell>Lead</TableHeadCell>
               <TableHeadCell>Status</TableHeadCell>
               <TableHeadCell>Sales Agent</TableHeadCell>
               <TableHeadCell>Priority</TableHeadCell>
               <TableHeadCell>Time to Close</TableHeadCell>
               <TableHeadCell>Tags</TableHeadCell>
               <TableHeadCell>Created</TableHeadCell>
               <TableHeadCell className="text-right">Actions</TableHeadCell>
            </TableHead>

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-700">
               {LEADS.map((lead) => {
                  const agentName = lead.salesAgent?.name ?? "Unassigned";
                  const agentInitial = agentName.charAt(0).toUpperCase();
                  const createdDate = lead.createdAt
                     ? format(new Date(lead.createdAt), "dd MMM yyyy")
                     : "—";

                  return (
                     <TableRow
                        key={lead._id}
                        className="bg-white transition-colors hover:bg-violet-50/40 dark:bg-gray-800 dark:hover:bg-gray-700/30"
                     >
                        {/* Checkbox */}
                        <TableCell className="px-4 py-3">
                           <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-violet-600 accent-violet-600"
                              readOnly
                           />
                        </TableCell>

                        <TableCell className="py-3">
                           <div className="flex items-center gap-3">
                              <Avatar
                                 img={lead.avatar}
                                 rounded
                                 size="sm"
                                 alt={lead.name}
                              />
                              <div className="min-w-0">
                                 <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                                    {lead.name}
                                 </p>
                                 <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                    {lead.company}
                                 </p>
                                 <p className="truncate text-[11px] text-gray-400 dark:text-gray-500">
                                    {lead.email}
                                 </p>
                              </div>
                           </div>
                        </TableCell>

                        <TableCell className="py-3">
                           <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_COLOR[lead.status] ?? ""}`}
                           >
                              <span
                                 className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[lead.status] ?? "bg-gray-400"}`}
                              />
                              {lead.status}
                           </span>
                        </TableCell>

                        <TableCell className="py-3">
                           <div className="flex items-center gap-2">
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                                 {agentInitial}
                              </div>
                              <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                                 {agentName}
                              </span>
                           </div>
                        </TableCell>

                        <TableCell className="py-3">
                           <span
                              className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${PRIORITY_COLOR[lead.priority] ?? ""}`}
                           >
                              {lead.priority}
                           </span>
                        </TableCell>

                        <TableCell className="py-3">
                           <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
                              <HiOutlineClock className="h-3.5 w-3.5 text-violet-400" />
                              {lead.timeToClose} days
                           </div>
                        </TableCell>

                        <TableCell className="py-3">
                           <div className="flex flex-wrap gap-1">
                              {lead.tags.slice(0, 2).map((tag) => (
                                 <span
                                    key={tag}
                                    className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                                 >
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </TableCell>

                        <TableCell className="py-3 text-xs whitespace-nowrap text-gray-500 dark:text-gray-400">
                           {createdDate}
                        </TableCell>

                        <TableCell className="py-3 text-right">
                           <button
                              type="button"
                              className="rounded-lg px-3 py-1 text-xs font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20"
                           >
                              View →
                           </button>
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}
