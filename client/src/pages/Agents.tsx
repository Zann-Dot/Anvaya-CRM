import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import {
  HiOutlineUserAdd,
  HiOutlineMail,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineFilter,
} from "react-icons/hi";
import SalesAgentModel from "../components/SalesAgentModel";
import { useAgents, useDeleteAgent } from "../hooks/useAgents";
import useNotification from "../hooks/useNotification";
import useMain from "../context/MainProvider";
import { useDebounce } from "../hooks/useDebounce";
import Footer from "../components/agents/Footer";
import AgentsSkeleton from "../components/agents/AgentsSkeleton";

export default function Agents() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [agentId, setAgentId] = useState<string | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");

  const { setNotificationActive, page } = useMain();
  const debouncedValue = useDebounce(search, 400);
  const {
    data: agentRes,
    isLoading,
    isFetching,
    isError: isAgentError
  } = useAgents(page, debouncedValue);

  const {
    mutate: deleteAgent,
    isError,
    isSuccess,
    isPending,
    error,
    data,
  } = useDeleteAgent();

  useNotification(isPending, isSuccess, isError, error, data);
  const isAgentLoading = isLoading || isFetching;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge color="success" className="w-fit font-medium">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </Badge>
        );
      case "On Call":
        return (
          <Badge color="warning" className="w-fit font-medium">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
            On Call
          </Badge>
        );
      case "Offline":
        return (
          <Badge color="gray" className="w-fit font-medium">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-gray-400" />
            Offline
          </Badge>
        );
      default:
        return <Badge color="indigo">{status}</Badge>;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
        {isAgentLoading ? (
          <div role="status" className="w-full animate-pulse space-y-4">
            <div className="w-1/2 rounded-lg bg-gray-200 py-3 dark:bg-gray-700"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20">
                <HiOutlineUserGroup className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Sales Agent Management
                  </h1>
                </div>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                  Manage your sales agent roster, view contact information, and
                  onboard new team members.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                {isAgentLoading ? (
                  <div role="status" className="w-full animate-pulse space-y-4">
                    <div className="w-1/2 rounded-lg bg-gray-200 py-2 dark:bg-gray-700"></div>
                  </div>
                ) : (
                  <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    <HiOutlineFilter className="h-4 w-4" /> Agent Status
                  </span>
                )}
              </div>
              <div className="space-y-1.5">
                {isAgentLoading ? (
                  <div role="status" className="w-full animate-pulse space-y-4">
                    <div className="w-1/2 rounded-lg bg-gray-200 py-2 dark:bg-gray-700"></div>
                    <div className="w-1/2 rounded-lg bg-gray-200 py-2 dark:bg-gray-700"></div>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setSelectedFilter("all")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedFilter === "all"
                        ? "bg-violet-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      <span>All Sales Agents</span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
                        {agentRes?.agents?.length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFilter("active")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedFilter === "active"
                        ? "bg-violet-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />{" "}
                        Active Agents
                      </span>
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {agentRes?.agents?.length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFilter("oncall")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedFilter === "oncall"
                        ? "bg-violet-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />{" "}
                        On Call
                      </span>
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        1
                      </span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-3">
          {isAgentLoading ? (
            <AgentsSkeleton />
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Sales Agent List
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Showing sales agents and their direct contact details
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-full sm:w-64">
                    <TextInput
                      id="search-agent"
                      type="search"
                      placeholder="Search by name or email..."
                      icon={HiOutlineSearch}
                      sizing="sm"
                      onChange={(e) => setSearch(e.target.value)}
                      value={search}
                    />
                  </div>

                  <Button
                    onClick={() => {
                      setShowAddModal(true);
                      setIsEdit(false);
                      setAgentId(undefined);
                    }}
                    className="cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700"
                    size="sm"
                  >
                    <HiOutlineUserAdd className="mr-2 h-4 w-4" />
                    Add New Agent
                  </Button>
                </div>
              </div>

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
                ) : (<Table hoverable>
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
                                setShowAddModal(true);
                                setIsEdit(true);
                                setAgentId(agent._id);
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

              <Footer />
            </div>
          )}
        </div>
      </div>

      <SalesAgentModel
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        isEdit={isEdit}
        agentId={agentId}
      />
    </div>
  );
}
