import { Badge } from "flowbite-react";
import StatusLeadCard, { DummyStatusLead } from "./StatusLeadCard";

export interface StatusColumnConfig {
  status: string;
  badgeColor: "blue" | "warning" | "purple" | "indigo" | "success" | "gray";
  accentColor: string;
  borderColor: string;
  dotColor: string;
}

interface StatusColumnProps {
  config: StatusColumnConfig;
  leads: DummyStatusLead[];
}

export default function StatusColumn({ config, leads }: StatusColumnProps) {
  return (
    <div className="flex flex-col min-w-[300px] max-w-[340px] flex-1 rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 shadow-xs dark:border-gray-700/80 dark:bg-gray-800/50">
      {/* Column Header matching the wireframe `Status: [Name]` */}
      <div className="mb-3.5 flex items-center justify-between border-b border-gray-200/80 pb-3 dark:border-gray-700/70">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${config.dotColor}`} />
          <h3 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
            Status: {config.status}
          </h3>
        </div>
        <Badge color={config.badgeColor} size="xs" className="px-2 py-0.5 font-bold">
          {leads.length}
        </Badge>
      </div>

      {/* Leads list for this status */}
      <div className="flex flex-col gap-3 overflow-y-auto max-h-[calc(100vh-320px)] pr-0.5 custom-scrollbar">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
            No leads in {config.status}
          </div>
        ) : (
          leads.map((lead) => (
            <StatusLeadCard key={lead.id} lead={lead} status={config.status} />
          ))
        )}
      </div>
    </div>
  );
}
