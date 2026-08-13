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


const INITIAL_AGENTS = [
  {
    id: "AGT-001",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@anvaya.com",
    phone: "+1 (555) 234-5678",
    role: "Senior Account Executive",
    region: "North America",
    status: "Active",
    dealsClosed: 28,
    revenue: "$340,000",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  },
  {
    id: "AGT-002",
    name: "John Doe",
    email: "john.doe@anvaya.com",
    phone: "+1 (555) 345-6789",
    role: "Enterprise Sales Lead",
    region: "Europe & UK",
    status: "Active",
    dealsClosed: 22,
    revenue: "$285,000",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
  },
  {
    id: "AGT-003",
    name: "Jane Smith",
    email: "jane.smith@anvaya.com",
    phone: "+1 (555) 456-7890",
    role: "Regional Sales Manager",
    region: "Asia Pacific",
    status: "On Call",
    dealsClosed: 35,
    revenue: "$420,000",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
  },
  {
    id: "AGT-004",
    name: "Michael Chen",
    email: "michael.chen@anvaya.com",
    phone: "+1 (555) 567-8901",
    role: "Inbound Sales Specialist",
    region: "North America",
    status: "Active",
    dealsClosed: 19,
    revenue: "$195,000",
    avatar:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
  },
  {
    id: "AGT-005",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@anvaya.com",
    phone: "+1 (555) 678-9012",
    role: "Sales Development Rep",
    region: "Latin America",
    status: "Offline",
    dealsClosed: 12,
    revenue: "$110,000",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  },
];

export default function Agents() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

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
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card className="border-gray-200 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <span className="flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  <HiOutlineFilter className="h-4 w-4" /> Agent Status
                </span>
              </div>
              <div className="space-y-1.5">
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
                    5
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
                    3
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
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> On
                    Call
                  </span>
                  <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    1
                  </span>
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4 lg:col-span-3">
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
                    type="text"
                    placeholder="Search by name or email..."
                    icon={HiOutlineSearch}
                    sizing="sm"
                    readOnly
                  />
                </div>

                <Button
                  onClick={() => setShowAddModal(true)}
                  className="bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:from-violet-700 hover:to-indigo-700"
                  size="sm"
                >
                  <HiOutlineUserAdd className="mr-2 h-4 w-4" />
                  Add New Agent
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table hoverable>
                <TableHead className="bg-gray-50 dark:bg-gray-800">
                  <TableHeadCell>Sales Agent</TableHeadCell>
                  <TableHeadCell>Contact Information</TableHeadCell>

                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">Actions</span>
                  </TableHeadCell>
                </TableHead>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {INITIAL_AGENTS.map((agent) => (
                    <TableRow
                      key={agent.id}
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
                            title="Edit Agent (UI only)"
                            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-violet-600 dark:hover:bg-gray-800 dark:hover:text-violet-400"
                          >
                            <HiOutlinePencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            title="Delete Agent (UI only)"
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
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 p-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <span>Showing 1-5 of 5 agents</span>
              <div className="flex items-center gap-1">
                <Button color="light" size="xs" disabled>
                  Previous
                </Button>
                <Button color="light" size="xs" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SalesAgentModel showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
    </div>
  );
}
