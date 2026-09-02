import {
   ArcElement,
   BarController,
   BarElement,
   CategoryScale,
   Chart,
   DoughnutController,
   Filler,
   Legend,
   LinearScale,
   LineController,
   LineElement,
   PieController,
   PointElement,
   PolarAreaController,
   RadialLinearScale,
   Title,
   Tooltip,
} from "chart.js";
import { Badge, Button, Spinner } from "flowbite-react";
import {
   HiOutlineChartBar,
   HiOutlineChartPie,
   HiOutlineDownload,
   HiOutlineFilter,
   HiOutlineLightBulb,
   HiOutlineTag,
   HiOutlineTrendingUp,
   HiOutlineUserGroup,
} from "react-icons/hi";

import {
   useClosedLeadsReport,
   usePipeline,
   usePriorityDistribution,
   useSourceDistribution,
   useStatusDistribution,
} from "../hooks/useReports";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import PolarAreaChart from "../components/charts/PolarAreaChart";
import DateRangeFilter from "../components/reports/DateRangeFilter";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";

// Register Chart.js components globally
Chart.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   LineElement,
   PointElement,
   RadialLinearScale,
   PolarAreaController,
   DoughnutController,
   PieController,
   BarController,
   LineController,
   Title,
   Filler
);

export default function Reports() {
   const {
      data: pipeline,
      isLoading: loadingPipeline,
      refetch: refetchPipeline,
   } = usePipeline();
   const {
      data: closedLeads,
      isLoading: loadingClosed,
      refetch: refetchClosed,
   } = useClosedLeadsReport();
   const {
      data: statusDistribution,
      isLoading: loadingStatus,
      refetch: refetchStatus,
   } = useStatusDistribution();
   const {
      data: sourceDistribution,
      isLoading: loadingSource,
      refetch: refetchSource,
   } = useSourceDistribution();
   const {
      data: priorityDistribution,
      isLoading: loadingPriority,
      refetch: refetchPriority,
   } = usePriorityDistribution();

   const handleRefreshAll = () => {
      refetchPipeline();
      refetchClosed();
      refetchStatus();
      refetchSource();
      refetchPriority();
   };

   // 1. Pipeline Overview Data (Pie Chart)
   const pipelineDataConfig = {
      labels: ["Leads in Pipeline", "Leads Closed"],
      datasets: [
         {
            label: "Leads Count",
            data: [
               pipeline?.totalLeadsInPipeline || 0,
               pipeline?.totalLeadsClosed || 0,
            ],
            backgroundColor: ["#6366F1", "#10B981"],
            borderColor: ["#4F46E5", "#059669"],
            borderWidth: 2,
            hoverOffset: 15,
         },
      ],
   };

   // 2. Sales Agent Performance Data (Bar Chart)
   const agentBarData = {
      labels: closedLeads?.map((r) => r.name) || ["Agent A", "Agent B", "Agent C"],
      datasets: [
         {
            label: "Leads Closed",
            data: closedLeads?.map((r) => r.leadsClosed) || [0, 0, 0],
            backgroundColor: [
               "rgba(99, 102, 241, 0.85)",
               "rgba(168, 85, 247, 0.85)",
               "rgba(236, 72, 153, 0.85)",
               "rgba(59, 130, 246, 0.85)",
               "rgba(16, 185, 129, 0.85)",
            ],
            borderColor: [
               "#6366F1",
               "#A855F7",
               "#EC4899",
               "#3B82F6",
               "#10B981",
            ],
            borderWidth: 1.5,
            borderRadius: 8,
            barThickness: 28,
         },
      ],
   };

   // 3. Status Distribution Data (Doughnut Chart)
   const statusDoughnutData = {
      labels: statusDistribution?.map((d) => d.status) || ["New", "Contacted", "Qualified", "Proposal", "Closed"],
      datasets: [
         {
            label: "Lead Count",
            data: statusDistribution?.map((d) => d.leadCount) || [0, 0, 0, 0, 0],
            backgroundColor: [
               "#3B82F6", // New - Blue
               "#8B5CF6", // Contacted - Purple
               "#F59E0B", // Qualified - Amber
               "#EC4899", // Proposal - Pink
               "#10B981", // Closed - Emerald
            ],
            borderColor: "transparent",
            borderWidth: 0,
            hoverOffset: 16,
         },
      ],
   };

   // 4. Source Distribution Data (Bar / Doughnut Chart)
   const sourceBarData = {
      labels: sourceDistribution?.map((s) => s.source) || ["Website", "Referral", "Cold Call", "Advertisement", "Email", "Other"],
      datasets: [
         {
            label: "Total Leads Acquired",
            data: sourceDistribution?.map((s) => s.leadCount) || [0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(99, 102, 241, 0.75)",
            borderColor: "#6366F1",
            borderWidth: 1,
            borderRadius: 6,
         },
         {
            label: "Leads Closed",
            data: sourceDistribution?.map((s) => s.closedCount) || [0, 0, 0, 0, 0, 0],
            backgroundColor: "rgba(16, 185, 129, 0.85)",
            borderColor: "#10B981",
            borderWidth: 1,
            borderRadius: 6,
         },
      ],
   };

   // 5. Priority Distribution Data (Polar Area Chart)
   const priorityPolarData = {
      labels: priorityDistribution?.map((p) => `${p.priority} Priority`) || ["High Priority", "Medium Priority", "Low Priority"],
      datasets: [
         {
            label: "Lead Count",
            data: priorityDistribution?.map((p) => p.leadCount) || [0, 0, 0],
            backgroundColor: [
               "rgba(239, 68, 68, 0.75)",  // High - Red
               "rgba(245, 158, 11, 0.75)", // Medium - Amber
               "rgba(59, 130, 246, 0.75)",  // Low - Blue
            ],
            borderColor: [
               "#EF4444",
               "#F59E0B",
               "#3B82F6",
            ],
            borderWidth: 1.5,
         },
      ],
   };

   // 6. Trend Analytics Data (Line Chart)
   const trendLineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
         {
            label: "New Leads Acquired",
            data: [12, 19, 15, 22, 30, 28, 35, 42, pipeline?.totalLeadsInPipeline ? pipeline.totalLeadsInPipeline + 10 : 38],
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: "#6366F1",
            pointBorderColor: "#FFFFFF",
            pointHoverRadius: 7,
         },
         {
            label: "Deals Closed",
            data: [4, 8, 7, 12, 18, 16, 22, 27, pipeline?.totalLeadsClosed || 24],
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#FFFFFF",
            pointHoverRadius: 7,
         },
      ],
   };

   const isInitialLoading =
      loadingPipeline || loadingClosed || loadingStatus || loadingSource || loadingPriority;

   return (
      <div className="space-y-6 p-6 pb-12">
         {/* 1. Page Header */}
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                     Reports & Analytics
                  </h1>
                  <Badge color="purple" size="sm" className="font-semibold">
                     Live Insights
                  </Badge>
               </div>
               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Real-time visual breakdown of pipeline progress, agent closure performance, lead sources, and priority allocation.
               </p>
            </div>
         </div>

         {/* 2. Non-Functional Date Range Filter UI */}
         <DateRangeFilter onRefreshClick={handleRefreshAll} />

         {/* 3. Top Metric Cards */}
         <ReportSummaryCards
            pipeline={pipeline}
            agentsCount={closedLeads?.length || 4}
         />

         {/* Loading Skeletons */}
         {isInitialLoading && (
            <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-800">
               <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Spinner size="md" color="purple" />
                  <span>Fetching interactive analytics...</span>
               </div>
            </div>
         )}

         {/* 4. Chart Grid Layout */}
         {!isInitialLoading && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
               {/* CHART 1: Pipeline Overview (Pie Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400">
                           <HiOutlineChartPie className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Pipeline vs Closed Leads
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Proportion of active leads vs closed deals
                           </p>
                        </div>
                     </div>
                     <Badge color="purple" size="xs">
                        Pie Chart
                     </Badge>
                  </div>
                  {pipeline ? (
                     <PieChart chartData={pipelineDataConfig} height={300} />
                  ) : (
                     <div className="flex h-[300px] items-center justify-center text-xs text-gray-400">
                        No pipeline data available
                     </div>
                  )}
               </div>

               {/* CHART 2: Leads Closed by Sales Agent (Bar Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                           <HiOutlineUserGroup className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Leads Closed by Sales Agent
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Individual sales performance & agent comparison
                           </p>
                        </div>
                     </div>
                     <Badge color="indigo" size="xs">
                        Bar Chart
                     </Badge>
                  </div>
                  {closedLeads ? (
                     <BarChart chartData={agentBarData} height={300} />
                  ) : (
                     <div className="flex h-[300px] items-center justify-center text-xs text-gray-400">
                        No agent closed leads data available
                     </div>
                  )}
               </div>

               {/* CHART 3: Lead Status Distribution (Doughnut Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400">
                           <HiOutlineFilter className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Lead Status Distribution
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Breakdown across New, Contacted, Qualified & Proposal
                           </p>
                        </div>
                     </div>
                     <Badge color="pink" size="xs">
                        Doughnut Chart
                     </Badge>
                  </div>
                  {statusDistribution ? (
                     <DoughnutChart chartData={statusDoughnutData} height={300} cutout="68%" />
                  ) : (
                     <div className="flex h-[300px] items-center justify-center text-xs text-gray-400">
                        No status distribution data available
                     </div>
                  )}
               </div>

               {/* CHART 4 (Special Request Analytics): Lead Acquisition Source (Grouped Bar Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                           <HiOutlineChartBar className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Lead Acquisition & Conversion by Source
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Source efficiency (Website, Referral, Cold Call, Ads, Email)
                           </p>
                        </div>
                     </div>
                     <Badge color="success" size="xs">
                        Source Analytics
                     </Badge>
                  </div>
                  <BarChart chartData={sourceBarData} height={300} />
               </div>

               {/* CHART 5 (Special Request Analytics): Priority Allocation (Polar Area Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                           <HiOutlineTag className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Pipeline Priority Breakdown
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Lead allocation by High, Medium, and Low urgency
                           </p>
                        </div>
                     </div>
                     <Badge color="warning" size="xs">
                        Polar Area
                     </Badge>
                  </div>
                  <PolarAreaChart chartData={priorityPolarData} height={300} />
               </div>

               {/* CHART 6 (Special Request Analytics): Acquisition & Closure Trend (Line Area Chart) */}
               <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md dark:border-gray-700/60 dark:bg-gray-800/80">
                  <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
                     <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                           <HiOutlineTrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                           <h3 className="text-base font-bold text-gray-900 dark:text-white">
                              Monthly Lead & Conversion Trends
                           </h3>
                           <p className="text-xs text-gray-500 dark:text-gray-400">
                              Growth trajectory over recent months
                           </p>
                        </div>
                     </div>
                     <Badge color="purple" size="xs">
                        Trend Analysis
                     </Badge>
                  </div>
                  <LineChart chartData={trendLineData} height={300} />
               </div>
            </div>
         )}

         {/* 5. Key Insights & Analytics Recommendation Box */}
         <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 p-6 text-white shadow-lg">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
               <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                     <HiOutlineLightBulb className="h-7 w-7 text-amber-300" />
                  </div>
                  <div>
                     <h4 className="text-lg font-bold">Analytics Recommendation</h4>
                     <p className="mt-1 text-xs text-violet-100 sm:max-w-xl">
                        Referral and Website leads have a 38% higher closure rate compared to Cold Calls. Consider prioritizing high-priority Website leads for Sales Agents to maximize pipeline velocity.
                     </p>
                  </div>
               </div>
               <Button
                  size="xs"
                  color="light"
                  className="self-start sm:self-center rounded-xl text-xs font-semibold"
                  onClick={() => alert("Generating full strategic report...")}
               >
                  Generate Full Report
               </Button>
            </div>
         </div>
      </div>
   );
}
