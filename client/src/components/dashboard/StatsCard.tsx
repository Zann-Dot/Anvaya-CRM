type StatsCardProps =
   | {
      label: string;
      value: number | undefined;
      change: number | undefined;
      positive: boolean | undefined;
      icon: React.ReactNode;
      color: string;
   }
   | {
      label: string;
      value: string;
      change: number | undefined;
      positive: boolean | undefined;
      icon: React.ReactNode;
      color: string;
   };

export default function StatsCard({
   label,
   value,
   change,
   positive,
   icon,
   color,
}: StatsCardProps) {
   return (
      <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-gray-100 bg-white p-3.5 sm:p-5 shadow-xs transition-all duration-300 active:scale-[0.99] sm:hover:-translate-y-0.5 sm:hover:shadow-md dark:border-gray-700/80 dark:bg-gray-800">
         <div
            className={`absolute -top-6 -right-6 h-20 w-20 sm:h-24 sm:w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${color}`}
         />
         <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
               <p className="mb-0.5 sm:mb-1 truncate text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {label}
               </p>
               <p className="text-xl sm:text-2xl xl:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-white">
                  {value ?? 0}
               </p>
               <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1">
                  <span
                     className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold ${positive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                        }`}
                  >
                     <span>{positive ? "↑" : "↓"}</span>
                     <span>{Math.abs(change ?? 0)}%</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 whitespace-nowrap">
                     <span className="inline sm:hidden">vs mo</span>
                     <span className="hidden sm:inline">vs last month</span>
                  </span>
               </div>
            </div>

            <div
               className={`flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-sm sm:shadow-md [&>svg]:h-4.5 [&>svg]:w-4.5 sm:[&>svg]:h-6 sm:[&>svg]:w-6 ${color}`}
            >
               {icon}
            </div>
         </div>
      </div>
   );
}
