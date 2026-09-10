import { Select } from "flowbite-react";
import StatusLeadCard from "./StatusLeadCard";
import { Lead } from "../dashboard/LeadCard";
import useMain from "../../context/MainProvider";
import { Agent } from "../../hooks/useAgents";

export interface StatusColumnConfig {
  status: string;
  badgeColor: "blue" | "warning" | "purple" | "indigo" | "success" | "gray";
  accentColor: string;
  borderColor: string;
  dotColor: string;
}

interface StatusColumnProps {
  STATUS_CONFIGS?: StatusColumnConfig[];
  agents?: Agent[];
  leads?: Lead[];
  isLeadsLoading: boolean;
  isError: boolean;
}

export default function StatusColumn({
  leads,
  STATUS_CONFIGS,
  isLeadsLoading,
  isError,
  agents,
}: StatusColumnProps) {
  const { dispatch } = useMain();
  const isLeadsLoaded = isError || leads?.length === 0;

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-gray-50/70 p-3.5 shadow-xs dark:border-gray-700/80 dark:bg-gray-800/50">
      <div className="mb-3.5 flex items-center justify-between border-b border-gray-200/80 pb-3 dark:border-gray-700/70">
        <div className="flex items-center gap-2">
          {STATUS_CONFIGS && (
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
          )}

          {agents && (
            <Select
              id="select-agents"
              className="w-80"
              defaultValue="New"
              onChange={(e) =>
                dispatch({ type: "AGENT", value: e.target.value })
              }
            >
              {agents?.map((a) => (
                <option
                  key={a._id}
                  value={a._id}
                  className="flex items-center gap-2"
                >
                  {a.name}
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>

      <div className="custom-scrollbar flex max-h-[calc(100vh-320px)] flex-col gap-3 overflow-y-auto pt-1 pr-0.5">
        {isLeadsLoading ? (
          <div className="group relative rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700/70 dark:bg-gray-800">
            <div className="mb-2 w-1/4 animate-pulse rounded-2xl bg-gray-200 p-2 text-xs dark:bg-gray-700/40" />
            <h4 className="text-sm font-bold text-gray-900" />
            <p className="mb-3 truncate text-xs text-gray-400 dark:text-gray-500" />
            <div className="mb-3 flex animate-pulse items-center justify-between rounded-lg bg-gray-200 p-2 text-xs dark:bg-gray-700/40" />
            <div className="mb-3 flex animate-pulse items-center justify-between rounded-lg bg-gray-200 p-2 text-xs dark:bg-gray-700/40" />
          </div>
        ) : isLeadsLoaded ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 py-8 text-center text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
            No leads found
          </div>
        ) : (
          leads?.map((lead) => (
            <StatusLeadCard
              key={lead._id}
              lead={lead}
              status={"New"}
              STATUS_CONFIGS={STATUS_CONFIGS}
            />
          ))
        )}
      </div>
    </div>
  );
}
