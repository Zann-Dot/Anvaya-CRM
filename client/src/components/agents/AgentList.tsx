import {
  HiOutlineMail,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineUserGroup,
} from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import useMain from "../../context/MainProvider";
import { AgentResponse } from "../../hooks/useAgents";
import { UseMutateFunction } from "@tanstack/react-query";

interface AgentListProps {
  agentRes?: NoInfer<AgentResponse>;
  isAgentError: boolean;
  deleteAgent: UseMutateFunction<any, Error, string | undefined, unknown>;
}

export default function AgentList({
  deleteAgent,
  agentRes,
  isAgentError,
}: AgentListProps) {
  const { setNotificationActive, setNotificationState } = useMain();

  return (
    <div className="overflow-x-auto">
      {agentRes?.agents.length === 0 || isAgentError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
            <HiOutlineUserGroup className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            No agents found
          </p>
        </div>
      ) : (
        <Table hoverable>
          <TableHead className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHeadCell>Sales Agent</TableHeadCell>
              <TableHeadCell>Contact Information</TableHeadCell>

              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {agentRes?.agents?.map((agent) => (
              <TableRow
                key={agent._id}
                className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50"
              >
                <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {agent.name}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <HiOutlineMail className="h-4 w-4 shrink-0 text-violet-500" />
                      <a
                        href={`mailto:${agent.email}`}
                        onClick={(e) => e.preventDefault()}
                        className="hover:text-violet-600 hover:underline"
                      >
                        {agent.email}
                      </a>
                    </div>
                  </div>
                </TableCell>

                {/* <TableCell>{getStatusBadge(agent.status)}</TableCell> */}

                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNotificationState(true, true, agent._id);
                      }}
                      title="Edit Agent"
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-violet-600 dark:hover:bg-gray-800 dark:hover:text-violet-400"
                    >
                      <HiOutlinePencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title="Delete Agent"
                      onClick={() => {
                        deleteAgent(agent._id);
                        setNotificationActive(true);
                      }}
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-rose-600 dark:hover:bg-gray-800 dark:hover:text-rose-400"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
