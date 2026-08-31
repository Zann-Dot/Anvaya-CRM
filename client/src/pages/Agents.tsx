import { useEffect } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import {
  HiOutlineUserAdd,
  HiOutlineSearch,
  HiOutlineUserGroup,
  HiOutlineFilter,
} from "react-icons/hi";
import SalesAgentModel from "../components/SalesAgentModel";
import { useAgents, useDeleteAgent } from "../hooks/useAgents";
import useMain from "../context/MainProvider";
import Footer from "../components/agents/Footer";
import AgentsSkeleton from "../components/agents/AgentsSkeleton";
import AgentList from "../components/agents/AgentList";
import { useSearchParams } from "react-router-dom";
import useNotification from "../hooks/useNotification";

export default function Agents() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    setNotificationState,
    params,
    search,
    setSearch,
    selectedFilter,
    setSelectedFilter
  } = useMain();

  useEffect(() => {
    if (searchParams.toString() !== params.toString()) {
      params.set("limit", "5");
      setSearchParams(params, { replace: true });
    }
  }, [params, searchParams, setSearchParams]);

  const {
    data: agentRes,
    isLoading,
    isFetching,
    isError: isAgentError,
    isPlaceholderData,
  } = useAgents(params.toString());

  const isAgentLoading = isLoading || isFetching;

  const {
    mutate: deleteAgent,
    isError,
    isSuccess,
    isPending,
    error,
    data,
  } = useDeleteAgent();

  useNotification(isPending, isSuccess, isError, error, data);

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
                        {agentRes?.totalAgents}
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
                        {agentRes?.agents.filter(a => a.status.toLowerCase() === "active").length}
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
                        {agentRes?.agents.filter(a => a.status.toLowerCase() === "oncall").length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedFilter("offline")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedFilter === "offline"
                        ? "bg-violet-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-gray-400" />{" "}
                        Offline
                      </span>
                      <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {agentRes?.agents.filter(a => a.status.toLowerCase() === "offline").length}
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
                    onClick={() => setNotificationState(true, false)}
                    className="cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700"
                    size="sm"
                  >
                    <HiOutlineUserAdd className="mr-2 h-4 w-4" />
                    Add New Agent
                  </Button>
                </div>
              </div>

              <AgentList
                deleteAgent={deleteAgent}
                agentRes={agentRes}
                isAgentError={isAgentError}
              />
              <Footer
                agentRes={agentRes}
                isPlaceholderData={isPlaceholderData}
              />
            </div>
          )}
        </div>
      </div>

      <SalesAgentModel agentRes={agentRes} />
    </div>
  );
}
