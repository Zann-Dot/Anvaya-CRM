import { Badge, Select } from "flowbite-react";
import StatusLeadCard, { DummyStatusLead } from "./StatusLeadCard";
import { Lead } from "../dashboard/LeadCard";
import useMain from "../../context/MainProvider";

export interface StatusColumnConfig {
  status: string;
  badgeColor: "blue" | "warning" | "purple" | "indigo" | "success" | "gray";
  accentColor: string;
  borderColor: string;
  dotColor: string;
}

interface StatusColumnProps {
  STATUS_CONFIGS: StatusColumnConfig[];
  leads?: Lead[];
}

export default function StatusColumn({
  leads,
  STATUS_CONFIGS,
}: StatusColumnProps) {
  const { dispatch } = useMain();

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 shadow-xs dark:border-gray-700/80 dark:bg-gray-800/50">
      <div className="mb-3.5 flex items-center justify-between border-b border-gray-200/80 pb-3 dark:border-gray-700/70">
        <div className="flex items-center gap-2">
          <Select
            id="select-status"
            className="w-80"
            defaultValue="New"
            onChange={(e) =>
              dispatch({ type: "STATUS", value: e.target.value })
            }
          >
            {STATUS_CONFIGS?.map((config) => (
              <option
                key={config.status}
                value={config.status}
                className="flex items-center gap-2"
              >
                {config.status}
              </option>
            ))}
          </Select>
        </div>

        <Badge
          color={STATUS_CONFIGS[0].badgeColor}
          size="xs"
          className="px-2 py-0.5 font-bold dark:bg-blue-800/20 dark:text-blue-600"
        >
          0
        </Badge>
      </div>

      <div className="custom-scrollbar flex max-h-[calc(100vh-320px)] flex-col gap-3 overflow-y-auto pt-1 pr-0.5">
        {leads?.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
            No leads in
          </div>
        ) : (
          leads?.map((lead) => (
            <StatusLeadCard key={lead._id} lead={lead} status={"New"} />
          ))
        )}
      </div>
    </div>
  );
}
