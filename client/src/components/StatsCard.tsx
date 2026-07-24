interface StatsCardProps {
   label: string;
   value: string | number;
   change: string;
   positive: boolean;
   icon: React.ReactNode;
   color: string;
}

export default function StatsCard({
   label,
   value,
   change,
   positive,
   icon,
   color,
}: StatsCardProps) {
   return (
      <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">

         <div
            className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${color}`}
         />

         <div className="flex items-start justify-between">
            <div>
               <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {label}
               </p>
               <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {value}
               </p>
               <div className="mt-2 flex items-center gap-1">
                  <span
                     className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold ${positive
                           ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                           : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                  >
                     {positive ? "↑" : "↓"} {change}
                  </span>
                  <span className="text-[11px] text-gray-400">vs last month</span>
               </div>
            </div>

            <div
               className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-md ${color}`}
            >
               {icon}
            </div>
         </div>
      </div>
   );
}
